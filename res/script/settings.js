"use strict";

let sysNotice = new SystemNotice();

window.addEventListener("error", (e) => {
    sysNotice.sendThasTitle('notice.unknow_error', {}, 'fatal');
});

let configFileBuffer = '';
let configFileFiltered = '';
let configFileWritableFileHandle = undefined;
let configBuffer = {};

let lastColorScheme = config.global.color_scheme;

let bodyClassCache = '';

const settingsNav = [
    {
        id: 'global',
        icon: 'earth'
    }, {
        id: 'echo',
        icon: 'codeBracesBox'
    }, {
        id: 'echolive',
        icon: 'messageText'
    }, {
        id: 'editor',
        icon: 'pencilCircle'
    }, {
        id: 'history',
        icon: 'history'
    }, {
        id: 'accessible',
        icon: 'wheelchairAccessibility'
    }, {
        id: 'advanced',
        icon: 'cog'
    }, {
        id: 'about',
        icon: 'information',
        isCustom: true
    }
];

const aboutLinks = [
    {
        name: 'about_echolive',
        isGroupTitle: true
    }, {
        name: 'github',
        href: 'https://github.com/sheep-realms/Echo-Live',
        icon: 'github'
    }, {
        name: 'copyright',
        href: 'https://github.com/sheep-realms/Echo-Live/blob/master/copyright.md',
        icon: 'copyright'
    }, {
        name: 'license',
        href: 'https://www.gnu.org/licenses/gpl-3.0.html',
        icon: 'license'
    }, {
        name: 'security',
        href: 'https://github.com/sheep-realms/Echo-Live/security/policy',
        icon: 'security'
    }, {
        name: 'user_guide',
        isGroupTitle: true
    }, {
        name: 'document',
        href: 'https://sheep-realms.github.io/Echo-Live-Doc/',
        icon: 'helpBox'
    }, {
        name: 'accessibility',
        href: 'https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/',
        icon: 'wheelchairAccessibility'
    }, {
        name: 'releases',
        href: 'https://github.com/sheep-realms/Echo-Live/releases',
        icon: 'sourceCommit'
    }, {
        name: 'feedback',
        href: 'https://github.com/sheep-realms/Echo-Live/issues',
        icon: 'chatAlert'
    }, {
        name: 'bug_tracker',
        href: 'https://github.com/users/sheep-realms/projects/3/views/1',
        icon: 'bug'
    }, {
        name: 'security_advisory_new',
        href: 'https://github.com/sheep-realms/Echo-Live/security/advisories/new',
        icon: 'alarmLight'
    }, {
        name: 'community',
        isGroupTitle: true
    }, {
        name: 'social_media',
        href: 'https://github.com/sheep-realms/Echo-Live/blob/master/social-media.md',
        icon: 'forum'
    }
];

let settingsManager = new SettingsManager(db_config_define);
settingsManager.importConfig(config);

let domContentLoadedTime = 0;

const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        domContentLoadedTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
        $('.settings-about-footer-var-5').text(domContentLoadedTime);
    });
});

observer.observe({ type: "navigation", buffered: true });

try {
    speechSynthesis.getVoices();
} catch (error) {}

let easterEggDrop = false;
let logoClick = 0;




function getSettingsItemValue(name, isDefault = false) {
    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type'),
        types = type.split('.'),
        value;

    if (types[0] != 'special') {
        if (!isDefault) {
            value = $sel.find('.settings-value').eq(0).val();
        } else {
            if (type === 'string.multiline') {
                value = String(decodeURIComponent($sel.find('.settings-value').eq(0).data('default')));
            } else {
                value = String($sel.find('.settings-value').eq(0).data('default'));
            }
        }

        switch (types[0]) {
            case 'number':
                value = Number(value);
                break;

            case 'boolean':
                if (types[1] == 'bit') {
                    value = Number(value);
                    break;
                }
                value = value == 'true' ? true : false;
                break;
        
            default:
                break;
        }
    } else {
        switch (type.split('.')[1]) {
            case 'all_or_array_string':
                value = $sel.find('.settings-switch-value').eq(0).val();
                if (isDefault) value = String($sel.find('.settings-switch-value').eq(0).data('default'));
                if (value != 'true') {
                    if (isDefault) {
                        try {
                            value = decodeURIComponent($sel.find('.settings-value-list').eq(0).data('default')).split('\n');
                        } catch (error) {
                            console.log(value);
                            debugger
                        }
                        
                    } else {
                        value = $sel.find('.settings-value-list').eq(0).val().split('\n')
                                    .filter(str => str.trim() !== '')
                                    .map(str => str.trim());
                    }
                } else {
                    value = 'all';
                }
                break;
        
            default:
                break;
        }
    }

    return value;
}

function setSettingsItemValue(name, value, isDefault = false) {
    const bt = [
        'state-off',
        'state-on'
    ];

    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type');
    
    if (type.split('.')[0] != 'special') {
        $sel.find('.settings-value').eq(0).val(value);
        if (isDefault) {
            if (type === 'string.multiline') {
                $sel.find('.settings-value').eq(0).data('default', encodeURIComponent(value));
            } else {
                $sel.find('.settings-value').eq(0).data('default', value);
            }
        }

        switch (type.split('.')[0]) {
            case 'boolean':
                $sel.find('.settings-switch').removeClass('state-off state-on');
                $sel.find('.settings-switch').addClass(bt[Number(value)]);
                break;
        
            default:
                break;
        }
    } else {
        switch (type.split('.')[1]) {
            case 'all_or_array_string':
                if (value === 'all') {
                    $sel.find('.settings-switch-value').eq(0).val('true');
                    $sel.find('.settings-switch').removeClass('state-off state-on');
                    $sel.find('.settings-switch').addClass('state-on');
                    $sel.find('.settings-switch-value').eq(0).val('true');
                    if (isDefault) $sel.find('.settings-switch-value').eq(0).data('default', true);
                    $sel.find('.content').addClass('hide');
                } else if (Array.isArray(value)) {
                    $sel.find('.settings-switch').removeClass('state-off state-on');
                    $sel.find('.settings-switch').addClass('state-off');
                    $sel.find('.settings-switch-value').eq(0).val('false');
                    $sel.find('.settings-value-list').eq(0).val(
                        value.filter(str => str.trim() !== '').map(str => str.trim()).join('\n')
                    );
                    if (isDefault) {
                        $sel.find('.settings-switch-value').eq(0).data('default', false);
                        $sel.find('.settings-value-list').eq(0).data(
                            'default',
                            encodeURIComponent(value.filter(str => str.trim() !== '').map(str => str.trim()).join('\n'))
                        );
                    }
                    $sel.find('.content').removeClass('hide');
                }
                break;
        
            default:
                break;
        }
    }
}

function configConditionTest(name) {
    let cd = settingsManager.findConfigDefine(name);
    if (!Array.isArray(cd?.conditions)) return true;

    for (let i = 0; i < cd.conditions.length; i++) {
        const e = cd.conditions[i];
        const ev = getSettingsItemValue(e.name);
        if (ev == undefined) continue;
        if (ev !== e.value) {
            return false;
        }
    }
    return true;
}

function checkConfigCondition(name = '') {
    let ccd = settingsManager.filterConfigDefineByCondition(name);
    if (ccd.length <= 0) return;

    ccd.forEach(element => {
        if (configConditionTest(element.name)) {
            $(`.settings-item[data-id="${ element.name }"]`).removeClass('settings-item-condition-test-fail');
        } else {
            $(`.settings-item[data-id="${ element.name }"]`).addClass('settings-item-condition-test-fail');
        }
    });
}






function showFileCheckDialog(content) {
    $('#settings-file-check-dialog').html(content);
    $('.btn-default').focus();
    $('#settings-file-input-box').addClass('hide');
}

function showFileCheckDialogWarn(key) {
    showFileCheckDialog(SettingsFileChecker.dialogWarn(
        $t('settings.config_input.' + key + '.title'),
        $t('settings.config_input.' + key + '.description')
    ));
}

function showFileCheckDialogError(key) {
    showFileCheckDialog(SettingsFileChecker.dialogError(
        $t('settings.config_input.' + key + '.title'),
        $t('settings.config_input.' + key + '.description')
    ));
}

function closeFileCheckDialog(clearFill = false) {
    $('#settings-file-input-box').removeClass('hide');
    $('#settings-file-input-box').focus();
    $('#settings-file-check-dialog').text('');

    if (clearFill) {
        closeFileChecker();
        dropFile = dropFileReader = dropData = configFileBuffer = configFileFiltered = configBuffer = undefined;
    }
}

function showFileChecker(file, type) {
    const types = {
        error: 'error',
        exception: 'warn',
        future: 'warn',
        loaded: 'ok',
        update: 'warn'
    };
    $('#settings-file-check-box').html(SettingsFileChecker.fill(file, types[type], $t('file.checker.state.' + type)));
}

function closeFileChecker() {
    $('#settings-file-check-box').html(SettingsFileChecker.empty());
}

function configChangeShowController() {
    $('.settings-controller-bottom').removeClass('disabled');
    $('.settings-controller-bottom button').removeAttr('disabled');
}

function configSaveCloseController() {
    $('.settings-controller-bottom').addClass('disabled');
    $('.settings-controller-bottom button').attr('disabled', 'disabled');
}

function configChangeCheck() {
    let $sel = $('.settings-item.change');
    if ($sel.length > 0) {
        configChangeShowController();
    } else {
        configSaveCloseController();
    }
}

function configUndoAll() {
    let $sel = $('.settings-item.change');
    for (let i = 0; i < $sel.length; i++) {
        let id = $sel.eq(i).data('id');
        let dv = getSettingsItemValue(id, true);
        setSettingsItemValue(id, dv);
    }
    $sel.removeClass('change');
    $('body').attr('class', bodyClassCache);
    configSaveCloseController();
    checkConfigCondition();
}

function configSaveAll(effect = false) {
    let $sel = $('.settings-item.change');
    for (let i = 0; i < $sel.length; i++) {
        let id = $sel.eq(i).data('id');
        let value = getSettingsItemValue(id);
        settingsManager.setConfig(id, value);
        setSettingsItemValue(id, value, true);
    }
    $sel.removeClass('change');
    configSaveCloseController();
    configOutput(true);
    if (effect) effectFlicker('#tabpage-nav-export');

    setTimeout(function() {
        let colorScheme = settingsManager.getConfig('global.color_scheme');
        if (colorScheme != lastColorScheme) {
            lastColorScheme = colorScheme;
            EchoLiveTools.updateView(function() {
                $('html').removeClass('prefers-color-scheme-auto prefers-color-scheme-light prefers-color-scheme-dark');
                $('html').addClass('prefers-color-scheme-' + colorScheme);
            });
        }
        bodyClassCache = $('body').attr('class') ?? '';
    }, 800)
}

function configOutput(setUnsave = false) {
    $('#edit-config-output').val('const config = ' + JSON.stringify(settingsManager.config, null, 4));
    outputTabUnsavePoint(setUnsave);
}

async function saveConfigFile(content, fileName = 'config.js', saveAs = false) {
    const opts = {
        suggestedName: fileName,
        types: [
            {
                description: $t('file.picker.config'),
                accept: {
                    'text/javascript': ['.js', '.mjs']
                }
            }
        ],
        excludeAcceptAllOption: true,
    };

    try {
        if (saveAs || configFileWritableFileHandle == undefined) configFileWritableFileHandle = await window.showSaveFilePicker(opts);
        const writable = await configFileWritableFileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        outputTabUnsavePoint(false);
        sysNotice.sendT('notice.config_saved', {}, 'success', {
            icon: 'contentSave'
        });
    } catch (error) {
        sysNotice.sendT('notice.config_saving_fail', {}, 'error', {
            icon: 'contentSaveAlert'
        });
    }
}

function configExport(fileName = 'config.js', saveAs = false) {
    let content = $('#edit-config-output').val();

    // 如果支持 showSaveFilePicker 则使用，否则使用传统下载方式
    if (window.showSaveFilePicker != undefined) return saveConfigFile(content, fileName, saveAs);

    let blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });

    let downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.innerHTML = '';

    if ('download' in downloadLink) {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        window.open('data:text/javascript;charset=utf-8,' + encodeURIComponent(content));
    }

    outputTabUnsavePoint(false);
}

function outputTabUnsavePoint(state = true) {
    if (state) return $('#export-unsave').removeClass('hide');
    $('#export-unsave').addClass('hide');
}





$(document).ready(function() {
    $('#echo-settings-nav').html(SettingsPanel.nav(settingsNav));

    // 载入数据

    let datalistLang = [];

    lang_index.index.forEach(e => {
        datalistLang.push({
            value: e.code,
            title: e.title
        });
    });

    let i = settingsManager.findIndexConfigDefine('global.language');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;

    datalistLang = [];

    mixer.audioDB.forEach((e) => {
        datalistLang.push({
            value: e.name
        });
    });

    i = settingsManager.findIndexConfigDefine('echolive.print_audio.name');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;
    i = settingsManager.findIndexConfigDefine('echolive.next_audio.name');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;
    
    i = settingsManager.findIndexConfigDefine('echolive.speech_synthesis.voice');
    let voices = [];
    try {
        voices = speechSynthesis.getVoices();
    } catch (error) {}
    let voiceName = [];
    for (let i = 0; i < voices.length; i++) {
        if (i >= 64) break;
        const e = voices[i];
        voiceName.push({
            value: e.name
        });
    }
    settingsManager.configDefine[i].attribute.datalist = voiceName;

    datalistLang = [
        { value: 'auto', title: $t('config.global.color_scheme._value.auto') },
        { value: 'light', title: $t('config.global.color_scheme._value.light') },
        { value: 'dark', title: $t('config.global.color_scheme._value.dark') }
    ];

    i = settingsManager.findIndexConfigDefine('global.color_scheme');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;

    // 生成页面

    settingsNav.forEach((e) => {
        if (!e?.isCustom) {
            let def = settingsManager.getConfigDefine(e.id);
            let dom = '';
            dom = SettingsPanel.setItems(def);
            $('.settings-pages').append(SettingsPanel.page(e.id, dom));
        }
    });

    $('.settings-item[data-id="echolive.speech_synthesis.voice"] .value').append(EditorForm.buttonGhost(
        $t('ui.audition'),
        {
            id: 'btn-speech-voice-audition',
            icon: Icon.accountVoice()
        }
    ));

    if (config.data_version < db_config_version) {
        settingsManager.updateConfig(db_config_version);
    }

    configLoad();

    aboutLinks.forEach(e => {
        if (e?.isGroupTitle) {
            $('.settings-about-content').append(SettingsPanel.linkBarGroupTitle($t('config.about.' + e.name)));
        } else {
            $('.settings-about-content').append(SettingsPanel.linkBar(
                $t('config.about.' + e.name),
                e.href,
                e?.icon
            ));
        }
    });

    $('.settings-nav-item').eq(0).click();

    $('#settings-file-check-box').html(SettingsFileChecker.default());

    
    $('.settings-page[data-pageid="echo"]').prepend(SettingsPanel.msgBox(
        $t('settings.msgbox.echo.title'),
        $t('settings.msgbox.echo.description')
    ));
    $('.settings-page[data-pageid="accessible"]').prepend(
        SettingsPanel.msgBoxBlack(
            $t('config.about.accessibility'),
            $t('settings.msgbox.accessibility'),
            'wheelchairAccessibility'
        ) +
        `<div class="review-color-card" aria-label="${ $t('settings.label.accessibility_color_card') }">
            <div class="general"><div class="fg">${ $t('settings.functional_color.general') }</div><div class="bg"></div></div>
            <div class="safe"><div class="fg">${ $t('settings.functional_color.safe') }</div><div class="bg"></div></div>
            <div class="warn"><div class="fg">${ $t('settings.functional_color.warn') }</div><div class="bg"></div></div>
            <div class="danger"><div class="fg">${ $t('settings.functional_color.danger') }</div><div class="bg"></div></div>
        </div>`
    );
    $('.settings-page[data-pageid="advanced"]').prepend(SettingsPanel.msgBoxWarn(
        '',
        $t('settings.msgbox.advanced_settings')
    ));

    let ua = navigator.userAgent.toLowerCase();
    if (ua.search(/ chrome\//) == -1) {
        showFileCheckDialog(SettingsFileChecker.dialogUseChrome());
    } else if (ua.search(/ obs\//) != -1) {
        showFileCheckDialogWarn('in_obs');
    }

    bodyClassCache = $('body').attr('class') ?? '';

    $(window).resize();

    // 调试信息

    let nowTime = new Date();

    $('.settings-about-footer-var-1').text(navigator.userAgent);
    $('.settings-about-footer-var-2').text(navigator.language);
    $('.settings-about-footer-var-3').text(config.global.language);
    $('.settings-about-footer-var-4').text(nowTime.getTime());
    $('.settings-about-footer-var-6').text(config.data_version);
});





let inFileDorp = false;
let inFileDorpTimer = 0;
let inFileDorpLongTime = false;
let dragleaveCount = 0;

let dropFile, dropFileReader, dropData;

const configFilePickerOpts = {
    types: [
        {
            description: $t('file.picker.config'),
            accept: {
                'text/javascript': ['.js', '.mjs'],
                'application/json': ['.json']
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

$(document).on('click', '#settings-file-input-box', function(e) {
    filePicker();
});

function configLoad() {
    if ($('.settings-item.change').length > 0) configUndoAll();
    $(`.settings-item`).removeClass('settings-item-update');

    settingsManager.getConfigDefine().forEach((e) => {
        let value = settingsManager.getConfig(e.name);
        if (value != undefined && (typeof value != 'object' || Array.isArray(value))) {
            setSettingsItemValue(e.name, settingsManager.getConfig(e.name), true);
        }
    });

    if (settingsManager.getConfig('editor.color_picker.palette') === 'all') {
        $('#editor-color_picker-palette-list').val([
            'material',
            'tailwindcss',
            'ant_design',
            'minecraft'
        ].join('\n'));
    }

    if (settingsManager.getConfig('editor.emoji_picker.emoji') === 'all') {
        $('#editor-emoji_picker-emoji-list').val([
            'emoji',
            'sheep-realms:pixel-head',
            'sheep-realms:other'
        ].join('\n'));
    }

    configOutput();
    checkConfigCondition();
}

async function filePicker() {
    try {
        let [handle] = await window.showOpenFilePicker(configFilePickerOpts);
        let fileData = await handle.getFile();
        checkConfigFile([fileData]);
    } catch (error) {
        // console.log(error);
    }
}

function checkConfigFile(fileList) {
    if (fileList.length !== 1) {
        showFileCheckDialogError('many_file');
        return;
    }

    if (fileList[0].type === '') {
        showFileCheckDialogError('type_error');
        return;
    }

    dropFile = fileList[0];
    dropFileReader = new FileReader();

    dropFileReader.onload = function(e2) {
        const content = e2.target.result;

        // Firefox 认为 JS 是应用程序而不是文本
        if (
            dropFile.type != 'text/javascript' &&
            dropFile.type != 'application/x-javascript' &&
            dropFile.type != 'application/json'
        ) {
            showFileCheckDialogError('type_error');
            return;
        }

        configFileBuffer = content;
        try {
            configFileFiltered = /\{.*\}/gms.exec(configFileBuffer)[0];
        } catch (error) {
            showFileChecker(dropFile, 'error');
            showFileCheckDialogError('no_json');
            return;
        }

        try {
            dropData = JSON.parse(configFileFiltered);
            importConfigCheck();
        } catch (error) {
            showFileChecker(dropFile, 'exception');
            showFileCheckDialog(SettingsFileChecker.dialogJSONParseFail());
            return;
        }
    };

    dropFileReader.readAsText(dropFile);
}

function importConfigCheck() {
    closeFileCheckDialog();
    showFileChecker(dropFile, 'loaded');
    settingsManager.importConfig(dropData);
    $('#tabpage-nav-edit, #tabpage-nav-export').addClass('disabled');
    $('#tabpage-nav-import').click();

    let dataVer = settingsManager.getConfig('data_version');
    if (dataVer == undefined) {
        showFileChecker(dropFile, 'update');
        showFileCheckDialog(SettingsFileChecker.dialogUpdateConfigFromUnknowVersion());
    } else if (dataVer < db_config_version) {
        showFileChecker(dropFile, 'update');
        showFileCheckDialog(SettingsFileChecker.dialogUpdateConfig());
    } else if (dataVer > db_config_version) {
        showFileChecker(dropFile, 'future');
        showFileCheckDialog(SettingsFileChecker.dialogConfigFromFuture());
    } else {
        configLoad();
        $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
        effectFlicker('#tabpage-nav-edit');
    }
}

$(document).on('dragover', '#settings-file-input-box', function(e) {
    e.preventDefault();
    if (!inFileDorp) {
        inFileDorp = true;
        $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_now'));
        $('#settings-file-input-box').addClass('dragover');
        inFileDorpTimer = setTimeout(function() {
            inFileDorpLongTime = true;
            $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_long_time'));
        }, 3000);
    }
});

$(document).on('dragleave', '#settings-file-input-box', function(e) {
    e.preventDefault();
    inFileDorp = false;
    clearTimeout(inFileDorpTimer);
    inFileDorpTimer = 0;
    $('#settings-file-input-box').removeClass('dragover');
    if (inFileDorpLongTime) {
        dragleaveCount++;
        if (dragleaveCount >= 5) {
            $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_cancel_many'));
            if (!easterEggDrop) {
                easterEggDrop = true;
                sysNotice.sendT('notice.drop_file_cancel_many', {}, 'trophy');
            }
        } else {
            $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_cancel'));
        }
    } else {
        $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.please_drop_file'));
    }
    inFileDorpLongTime = false;
});

$(document).on('drop', '#settings-file-input-box', function(e) {
    e.preventDefault()
    inFileDorp = false;
    inFileDorpLongTime = false;
    clearTimeout(inFileDorpTimer);
    $('#settings-file-input-box .file-drop-box-message').text($t('file.droper.please_drop_file'));
    $('#settings-file-input-box').removeClass('dragover');

    const fileList = e.originalEvent.dataTransfer.files;

    checkConfigFile(fileList);
});

$(document).on('click', '#btn-flie-check-dialog-unsafe-load', function() {
    try {
        eval('dropData = ' + configFileFiltered);
        importConfigCheck();
    } catch (error) {
        showFileChecker(dropFile, 'error');
        showFileCheckDialogError('unsafe_load_fail');
    }
});

$(document).on('click', '#btn-flie-check-dialog-cancel', function() {
    closeFileCheckDialog(true);
});

$(document).on('click', '#btn-flie-check-dialog-cancel-rollback', function() {
    settingsManager.rollbackConfig();
    closeFileCheckDialog(true);
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
});

$(document).on('click', '#btn-flie-check-dialog-goto-chrome', function() {
    window.open('https://www.google.cn/chrome/index.html', '_blank');
});

$(document).on('click', '#btn-flie-check-dialog-update-config', function() {
    const oldConfigVersion = settingsManager.getConfig('data_version');
    settingsManager.updateConfig(db_config_version);
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');

    $(`.settings-item`).removeClass('settings-item-update');
    const cd = settingsManager.getConfigDefine('', oldConfigVersion + 1, db_config_version);
    cd.forEach(e => {
        if (e.type != 'object') {
            $(`.settings-item[data-id="${ e.name }"]`).addClass('settings-item-update');
        }
    });

    effectFlicker('#tabpage-nav-edit');
});

$(document).on('click', '#btn-flie-check-dialog-update-config-from-unknow-version', function() {
    settingsManager.updateConfigFromUnknowVersion(db_config_version);
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
    effectFlicker('#tabpage-nav-edit');
});

$(document).on('click', '#btn-flie-check-dialog-config-from-future', function() {
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
    effectFlicker('#tabpage-nav-edit');
});






$(document).on('click', '.settings-nav-item', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $(`.settings-page`).addClass('hide');
    $(`.settings-page[data-pageid="${pageid}"]`).removeClass('hide');
    $(window).scrollTop(0);
});

$(document).on('click', '.settings-switch', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const defaultValue = $(this).children('.settings-switch-value').data('default');
    const defaultValueTrue = getSettingsItemValue(name, true);
    const t = [
        ['off', false, 0],
        ['on',  true,  1]
    ];
    let next = 0;
    let isBit = $(this).data('is-bit');
    if (isBit == undefined) isBit = 0;
    if ($(this).hasClass('state-off')) next = 1;
    let value = t[next][1 + isBit];

    $(this).children('.settings-switch-value').val(value);
    $(this).removeClass('state-off state-on');
    $(this).addClass('state-' + t[next][0]);
    $(this).children('.btn-' + t[next][0]).focus();

    if ($parent.data('type') == 'special.all_or_array_string') {
        // debugger
        if (next == 1) {
            $parent.find('.content').addClass('hide');
        } else {
            $parent.find('.content').removeClass('hide');
        }
    }

    if (Array.isArray(defaultValueTrue)) {
        let v1 = getSettingsItemValue(name);
        let v2 = defaultValueTrue;
        if (Array.isArray(v1)) v1 = v1.join('\n');
        if (Array.isArray(v2)) v2 = v2.join('\n');
        if (v1 != v2) {
            $parent.addClass('change');
        } else {
            $parent.removeClass('change');
        }
    } else if (value != defaultValue) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }

    configChangeCheck();

    setTimeout(function() {
        checkConfigCondition(name);
    }, 10);
});




$(document).on('change', '.settings-item.settings-type-number .settings-value', function() {
    let value = Number($(this).val()),
        max = Number($(this).attr('max')),
        min = Number($(this).attr('min'));

    if ($(this).val() === '') {
        if (min != undefined) {
            $(this).val(min);
        } else {
            $(this).val(0);
        }
    }
    if (max != undefined && value > max) $(this).val(max);
    if (min != undefined && value < min) $(this).val(min);
});

$(document).on('input', '.settings-item .settings-value', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const value = getSettingsItemValue(name);
    const defaultValue = getSettingsItemValue(name, true);
    if (value != defaultValue) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }
    configChangeCheck();
});

$(document).on('input', '.settings-item[data-type="special.all_or_array_string"] textarea', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const value = $(this).val();
    const defaultValue = decodeURIComponent($(this).data('default'));
    const defaultValueTrue = getSettingsItemValue(name, true);
    if (value != defaultValue || !Array.isArray(defaultValueTrue)) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }
    configChangeCheck();
});




$(document).on('click', '#edit-btn-undo', configUndoAll);

$(document).on('click', '#edit-btn-save', function() {
    configSaveAll(true);
});

$(document).on('click', '#edit-btn-save-output', function() {
    configSaveAll();
    configExport('config.js');
});

$(document).on('click', '#edit-btn-output', function() {
    configOutput();
    sysNotice.sendT('notice.config_re_output', {}, 'success');
});

$(document).on('click', '#edit-btn-file-save-as', function() {
    configExport('config.js', true);
});

$(document).on('click', '#edit-btn-file-save', function() {
    configExport('config.js');
});




$(document).on('click', '.settings-group-collapse-title', function() {
    const parent = $(this).parent();
    if (parent.hasClass('state-close')) {
        parent.removeClass('state-close');
        parent.addClass('state-open');
    } else {
        parent.removeClass('state-open');
        parent.addClass('state-close');
    }
});



$(document).keydown(function(e) {
    if (e.keyCode == 83 && e.ctrlKey) {
        e.preventDefault();
    }

    if (
        $('#tabpage-nav-edit[aria-selected="true"]').length > 0 &&
        $('.settings-controller-bottom:not(.disabled)').length > 0 &&
        e.keyCode == 83 && e.ctrlKey
    ) {
        configSaveAll(true);
        configExport('config.js');
    }
});




$(window).resize(function() {
    const tabHeight = $('#echo-editor-nav').height();
    $('.settings-nav').css('top', `${tabHeight + 17}px`);
    $('body').css('--settings-group-title-stickt-top', `${tabHeight + 1}px`);

    // $('.settings-group-collapse').each(function() {
    //     const e = $(this).parents('.settings-group').eq(0).find('.settings-group-title').eq(0);
    // });
});

$(document).on('click', '.settings-item[data-id="accessible.high_contrast"] .settings-switch button', function() {
    setTimeout(function() {
        let value = getSettingsItemValue('accessible.high_contrast');
        if (value) {
            $('body').addClass('accessible-high-contrast');
        } else {
            $('body').removeClass('accessible-high-contrast');
        }
    }, 12);
});

$(document).on('click', '.settings-item[data-id="accessible.drotanopia_and_deuteranopia"] .settings-switch button', function() {
    setTimeout(function() {
        let value = getSettingsItemValue('accessible.drotanopia_and_deuteranopia');
        if (value) {
            $('body').addClass('accessible-drotanopia-and-deuteranopia');
        } else {
            $('body').removeClass('accessible-drotanopia-and-deuteranopia');
        }
    }, 12);
});

$(document).on('click', '.settings-item[data-id="accessible.link_underline"] .settings-switch button', function() {
    setTimeout(function() {
        let value = getSettingsItemValue('accessible.link_underline');
        if (value) {
            $('body').addClass('accessible-link-underline');
        } else {
            $('body').removeClass('accessible-link-underline');
        }
    }, 12);
});

$(document).on('click', '.settings-item[data-id="accessible.animation_disable"] .settings-switch button', function() {
    setTimeout(function() {
        let value = getSettingsItemValue('accessible.animation_disable');
        if (value) {
            $('body').addClass('accessible-animation-disable');
        } else {
            $('body').removeClass('accessible-animation-disable');
        }
    }, 12);
});




$(document).on('click', '#btn-speech-voice-audition', function() {
    speechSynthesis.cancel();

    // 试音用，不要本地化
    const auditionText = {
        en: [
            'The only way to do great work is to love what you do.',
            'Success is not final, failure is not fatal: It is the courage to continue that counts.',
            "Believe you can and you're halfway there.",
            'If you want it, then you will have to take it.',
            'Never gonna give you up, never gonna let you down, never gonna run around and desert you.',
            'Establishing battlefield control, stand by.',
            'The appropriately named Apocalypse Tank is war in a can. It can attack any ground or air targets and be expected to be the last unit standing.'
        ],
        ja: [
            '日々私たちが過ごしている日常は、実は、奇跡の連続なのかもしれない。',
            'そうだ。俺たちが今まで積み上げてきたもんは全部無駄じゃなかった。これからも俺たちが立ち止まらないかぎり道は続く。',
            'この中に宇宙人、未来人、異世界人、超能力者がいたら、あたしのところに来なさい。以上！',
            '黒より黒く、闇より暗き漆黒に、我が深紅の混淆を望みたもう。覚醒のとき来たれり、無謬の境界に落ちし理、無行の歪みとなりて。現出せよ！エクスプロージョン！',
            'フィクションにリアリティを求める奴のほうがどうかしていると思うが。',
            '人間讃歌は勇気の讃歌ッ！人間のすばらしさは勇気のすばらしさ！',
            'ドクター、終わってない仕事がたくさんありますから、まだ休んじゃだめですよ。',
            '司令官、ロシア風チョコ、あげる。どこがロシア風かって？それは...内緒だ。'
        ],
        zh: [
            '我们所经历的每个平凡的日常，也许就是连续发生的奇迹。',
            '很可怕吗？是的，很可怕。',
            '这个加上这个，能不能站着把钱挣了？',
            '这屋子太暗，须在这里开一个窗，大家一定是不允许的。但是如果你主张拆掉屋顶，他们就来调和，愿意开窗了。',
            '道路千万条，安全第一条。行车不规范，亲人两航泪。',
            '失去人性，失去很多；失去兽性，失去一切。',
            '给阿姨倒一杯卡布奇诺，开始你的炸弹秀。',
            '你吼辣么大声干什么嘛！',
            '这是一款可用于无声系虚拟主播直播的仿视觉小说对话框OBS插件。',
            '在虚构的故事当中寻求真实感的人脑袋一定有问题。',
            '一项研究表明，虚拟主播看多了容易引起乘法口诀模块受损。'
        ]
    };

    let voices = speechSynthesis.getVoices();
    let configVoice = getSettingsItemValue('echolive.speech_synthesis.voice');
    let configPitch = getSettingsItemValue('echolive.speech_synthesis.pitch');
    let configRate = getSettingsItemValue('echolive.speech_synthesis.rate');
    let voiceIndex = voices.findIndex(e => e.name == configVoice);
    let defaultVoice = voices.find(e => e.default);
    let defaultVoiceLang = 'en';
    let voiceLang = 'en';

    if (defaultVoice != undefined) voiceLang = defaultVoiceLang = defaultVoice.lang.split('-')[0];

    if (voiceIndex != -1) {
        voiceLang = voices[voiceIndex].lang.split('-')[0];
        if (auditionText[voiceLang] == undefined) voiceLang = 'en';
    }

    let speechText = auditionText[voiceLang][Math.floor(Math.random() * auditionText[voiceLang].length)];
    // console.log(speechText);
    let utterance = new SpeechSynthesisUtterance(speechText);

    if (voiceIndex != -1) utterance.voice = voices[voiceIndex];
    utterance.pitch = configPitch;
    utterance.rate = configRate;

    speechSynthesis.speak(utterance);
});

$(document).on('click', '.settings-about-banner img', function() {
    if (logoClick >= 0 && logoClick < 4) {
        logoClick++
    } else if (logoClick >= 4) {
        logoClick = -1;
        sysNotice.send('???', '', 'info', {
            icon: 'help'
        });
    }
});