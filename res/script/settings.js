"use strict";

let configFileBuffer = '';
let configFileFiltered = '';
let configBuffer = {};

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




function getSettingsItemValue(name, isDefault = false) {
    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type'),
        types = type.split('.'),
        value;

    if (types[0] != 'special') {
        if (!isDefault) {
            value = $sel.find('.settings-value').eq(0).val();
        } else {
            value = $sel.find('.settings-value').eq(0).data('default');
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
        if (isDefault) $sel.find('.settings-value').eq(0).data('default', value);

        switch (type) {
            case 'boolean':
                $sel.find('.settings-switch').removeClass('state-off state-on');
                $sel.find('.settings-switch').addClass(bt[Number(value)]);
                break;
        
            default:
                break;
        }
    }
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

    i = settingsManager.findIndexConfigDefine('echolive.print_audio_name');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;
    i = settingsManager.findIndexConfigDefine('echolive.next_audio_name');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;

    // 生成页面

    settingsNav.forEach((e) => {
        if (!e?.isCustom) {
            let def = settingsManager.getConfigDefine(e.id);
            let dom = '';
            dom = SettingsPanel.setItems(def);
            $('.settings-content').append(SettingsPanel.page(e.id, dom));
        }
    });

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

    let ua = navigator.userAgent.toLowerCase()
    if (ua.search(/ chrome\//) == -1) {
        $('#settings-file-check-dialog').html(SettingsFileChecker.dialogUseChrome());
        $('.btn-default').focus();
        $('#settings-file-input-box').addClass('hide');
    } else if (ua.search(/ obs\//) != -1) {
        $('#settings-file-check-dialog').html(SettingsFileChecker.dialogWarn(
            $t('settings.config_input.in_obs.title'),
            $t('settings.config_input.in_obs.description')
        ));
        $('.btn-default').focus();
        $('#settings-file-input-box').addClass('hide');
    }

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
                "text/javascript": ['.js', '.mjs'],
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
    settingsManager.getConfigDefine().forEach((e) => {
        let value = settingsManager.getConfig(e.name);
        if (value != undefined && typeof value != 'object') {
            setSettingsItemValue(e.name, settingsManager.getConfig(e.name), true);
        }
    });
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
    if (fileList.length !== 1 || fileList[0].type === '') {
        $('#settings-file-check-dialog').html(
            SettingsFileChecker.dialogError(
                $t('settings.config_input.many_file.title'),
                $t('settings.config_input.many_file.description')
            )
        );
        $('.btn-default').focus();
        return;
    }

    dropFile = fileList[0];
    dropFileReader = new FileReader();

    dropFileReader.onload = function(e2) {
        const content = e2.target.result;

        // Firefox 认为 JS 是应用程序而不是文本
        if (dropFile.type != 'text/javascript' && dropFile.type != 'application/x-javascript') {
            $('#settings-file-check-dialog').html(
                SettingsFileChecker.dialogError(
                    $t('settings.config_input.type_error.title'),
                    $t('settings.config_input.type_error.description')
                )
            );
            $('.btn-default').focus();
            return;
        }

        configFileBuffer = content;
        try {
            configFileFiltered = /\{.*\}/gms.exec(configFileBuffer)[0];
        } catch (error) {
            $('#settings-file-check-box').html(SettingsFileChecker.fill(dropFile, 'error', '错误'));
            return;
        }

        try {
            dropData = JSON.parse(configFileFiltered);
            $('#settings-file-check-box').html(SettingsFileChecker.fill(dropFile, 'ok', '已载入'));
            $('#settings-file-input-box').focus();
            settingsManager.importConfig(dropData);
            configLoad();
        } catch (error) {
            $('#settings-file-check-box').html(SettingsFileChecker.fill(dropFile, 'warn', '异常'));
            $('#settings-file-check-dialog').html(SettingsFileChecker.dialogJSONParseFail());
            $('.btn-default').focus();
            $('#settings-file-input-box').addClass('hide');
            return;
        }
    };

    dropFileReader.readAsText(dropFile);
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
        $('#settings-file-check-box').html(SettingsFileChecker.fill(dropFile, 'ok', '已载入'));
        $('#settings-file-input-box').removeClass('hide');
        $('#settings-file-input-box').focus();
        $('#settings-file-check-dialog').text('');
        settingsManager.importConfig(dropData);
        configLoad();
    } catch (error) {
        $('#settings-file-check-box').html(SettingsFileChecker.fill(dropFile, 'error', '错误'));
        $('#settings-file-check-dialog').html(
            SettingsFileChecker.dialogError(
                $t('settings.config_input.unsafe_load_fail.title'),
                $t('settings.config_input.unsafe_load_fail.description')
            )
        );
        $('.btn-default').focus();
    }
});

$(document).on('click', '#btn-flie-check-dialog-cancel', function() {
    $('#settings-file-input-box').removeClass('hide');
    $('#settings-file-input-box').focus();
    $('#settings-file-check-dialog').text('');
    $('#settings-file-check-box').html(SettingsFileChecker.empty());
    dropFile = dropFileReader = dropData = configFileBuffer = configFileFiltered = configBuffer = undefined;
});

$(document).on('click', '#btn-flie-check-dialog-goto-chrome', function() {
    window.open('https://www.google.cn/chrome/index.html', '_blank');
});





$(document).on('click', '.settings-nav-item', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $(`.settings-page`).addClass('hide');
    $(`.settings-page[data-pageid="${pageid}"]`).removeClass('hide');
});

$(document).on('click', '.settings-switch', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const defaultValue = $(this).children('.settings-value').data('default');
    const t = [
        ['off', false, 0],
        ['on',  true,  1]
    ];
    let next = 0;
    let isBit = $(this).data('is-bit');
    if ($(this).hasClass('state-off')) next = 1;
    let value = t[next][1 + isBit];

    $(this).children('.settings-value').val(value);
    $(this).removeClass('state-off state-on');
    $(this).addClass('state-' + t[next][0]);
    $(this).children('.btn-' + t[next][0]).focus();

    if (value != defaultValue) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }
});




$(document).on('change', '.settings-item.settings-type-number .settings-value', function() {
    let value = Number($(this).val()),
        max = Number($(this).attr('max')),
        min = Number($(this).attr('min'));

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
});