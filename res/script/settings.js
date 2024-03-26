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

let settingsManager = new SettingsManager(db_config_define);
settingsManager.config = config;




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
    
    $('.settings-nav-item').eq(0).click();
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