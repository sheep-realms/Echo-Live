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
    }
];

let settingsManager = new SettingsManager(db_config_define);

$(document).ready(function() {
    $('#echo-settings-nav').html(SettingsPanel.nav(settingsNav));

    let datalistLang = [];

    lang_index.index.forEach(e => {
        datalistLang.push({
            value: e.code,
            title: e.title
        });
    });

    let i = settingsManager.findIndexConfig('global.language');
    settingsManager.configDefine[i].attribute.datalist = datalistLang;

    settingsNav.forEach(e => {
        let def = settingsManager.getConfigDefine(e.id);
        let dom = '';
        dom = SettingsPanel.setItems(def);
        $('.settings-content').append(SettingsPanel.page(e.id, dom));
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