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
        title: '关于 Echo-Live',
        isGroupTitle: true
    }, {
        title: 'GitHub 项目仓库',
        href: 'https://github.com/sheep-realms/Echo-Live',
        icon: 'github'
    }, {
        title: '授权协议与声明',
        href: 'https://github.com/sheep-realms/Echo-Live/blob/master/copyright.md',
        icon: 'copyright'
    }, {
        title: '开源许可证',
        href: 'https://www.gnu.org/licenses/gpl-3.0.html',
        icon: 'license'
    }, {
        title: '安全政策',
        href: 'https://github.com/sheep-realms/Echo-Live/security/policy',
        icon: 'security'
    }, {
        title: '用户指南',
        isGroupTitle: true
    }, {
        title: '帮助文档',
        href: 'https://sheep-realms.github.io/Echo-Live-Doc/',
        icon: 'helpBox'
    }, {
        title: '无障碍使用指南',
        href: 'https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/',
        icon: 'wheelchairAccessibility'
    }, {
        title: '版本列表',
        href: 'https://github.com/sheep-realms/Echo-Live/releases',
        icon: 'sourceCommit'
    }, {
        title: '建议反馈',
        href: 'https://github.com/sheep-realms/Echo-Live/issues',
        icon: 'chatAlert'
    }, {
        title: '漏洞追踪',
        href: 'https://github.com/users/sheep-realms/projects/3/views/1',
        icon: 'bug'
    }, {
        title: '报告安全漏洞',
        href: 'https://github.com/sheep-realms/Echo-Live/security/advisories/new',
        icon: 'alarmLight'
    }, {
        title: '社区服务',
        isGroupTitle: true
    }, {
        title: '社交媒体',
        href: 'https://github.com/sheep-realms/Echo-Live/blob/master/social-media.md',
        icon: 'forum'
    }
];

let settingsManager = new SettingsManager(db_config_define);
settingsManager.config = config;

let domContentLoadedTime = 0;

const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        domContentLoadedTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
        $('.settings-about-footer-var-5').text(domContentLoadedTime);
    });
});

observer.observe({ type: "navigation", buffered: true });




function getSettingsItemValue(name) {
    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type'),
        types = type.split('.'),
        value;

    if (types[0] != 'special') {
        value = $sel.find('.settings-value').eq(0).val();

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

function setSettingsItemValue(name, value) {
    const bt = [
        'state-off',
        'state-on'
    ];

    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type');
    
    if (type.split('.')[0] != 'special') {
        $sel.find('.settings-value').eq(0).val(value);

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

    settingsManager.getConfigDefine().forEach((e) => {
        let value = settingsManager.getConfig(e.name);
        if (value != undefined && typeof value != 'object') {
            setSettingsItemValue(e.name, settingsManager.getConfig(e.name));
        }
    });

    aboutLinks.forEach(e => {
        if (e?.isGroupTitle) {
            $('.settings-about-content').append(SettingsPanel.linkBarGroupTitle(e.title));
        } else {
            $('.settings-about-content').append(SettingsPanel.linkBar(e.title, e.href, e?.icon));
        }
    });

    $('.settings-nav-item').eq(0).click();

    // 调试信息

    let nowTime = new Date();

    $('.settings-about-footer-var-1').text(navigator.userAgent);
    $('.settings-about-footer-var-2').text(navigator.language);
    $('.settings-about-footer-var-3').text(config.global.language);
    $('.settings-about-footer-var-4').text(nowTime.getTime());
    $('.settings-about-footer-var-6').text(config.data_version);
});





let inFileDorp = false;
let inFileDorpTick = 0;
let inFileDorpLongTime = false;

$(document).on('dragover', '#setting-file-input-box', function(e) {
    e.preventDefault();
    inFileDorpTick++;
    if (!inFileDorp) {
        inFileDorp = true;
        $('#setting-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_now'));
    }
    if (inFileDorpTick >= 50) {
        $('#setting-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_long_time'));
        inFileDorpTick = -100000000;
        inFileDorpLongTime = true;
    }
});

$(document).on('dragleave', '#setting-file-input-box', function(e) {
    e.preventDefault();
    inFileDorp = false;
    inFileDorpTick = 0;
    if (inFileDorpLongTime) {
        $('#setting-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_cancel'));
    } else {
        $('#setting-file-input-box .file-drop-box-message').text($t('file.droper.please_drop_file'));
    }
    inFileDorpLongTime = false;
});

$(document).on('drop', '#setting-file-input-box', function(e) {
    e.preventDefault();
    inFileDorp = false;
    inFileDorpTick = 0;
    inFileDorpLongTime = false;
    $('#setting-file-input-box .file-drop-box-message').text($t('file.droper.please_drop_file'));

    const fileList = e.originalEvent.dataTransfer.files;

    if (fileList.length !== 1 || fileList[0].type === '') {
        alert('只能拖入一个文件且不能是文件夹！');
        return;
    }

    const file = fileList[0];
    const reader = new FileReader();

    reader.onload = function(e2) {
        const content = e2.target.result;
        console.log(file);
        if (file.type != 'text/javascript') {
            alert('文件类型错误！');
            return;
        }
        configFileBuffer = content;
        configFileFiltered = /\{.*\}/gms.exec(configFileBuffer)[0];

        let data;

        try {
            data = JSON.parse(configFileFiltered);
        } catch (error) {
            if (confirm('无法安全读取，是否尝试以不安全的方式读取？')) {
                try {
                    eval('data = ' + configFileFiltered);
                } catch (error) {
                    // TODO ...
                }
            }
        }

        console.log(data);
    };

    reader.readAsText(file);
});





$(document).on('click', '.settings-nav-item', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $(`.settings-page`).addClass('hide');
    $(`.settings-page[data-pageid="${pageid}"]`).removeClass('hide');
});

$(document).on('click', '.settings-switch', function() {
    const t = [
        ['off', false, 0],
        ['on',  true,  1]
    ];
    let next = 0;
    let isBit = $(this).data('is-bit');
    if ($(this).hasClass('state-off')) next = 1;
    $(this).children('.settings-value').val(t[next][1 + isBit]);
    $(this).removeClass('state-off state-on');
    $(this).addClass('state-' + t[next][0]);
    $(this).children('.btn-' + t[next][0]).focus();
});




$(document).on('change', '.settings-item.settings-type-number .settings-value', function() {
    let value = Number($(this).val()),
        max = Number($(this).attr('max')),
        min = Number($(this).attr('min'));

    if (max != undefined && value > max) $(this).val(max);
    if (min != undefined && value < min) $(this).val(min);
});