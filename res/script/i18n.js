$(document).ready(function() {
    let $i18n = $('*[data-i18n]');
    for (let i = 0; i < $i18n.length; i++) {
        const e = $i18n.eq(i);
        const key = e.data('i18n');
        e.text($t(key));
    }
    $i18n = $('*[data-i18n-title]');
    for (let i = 0; i < $i18n.length; i++) {
        const e = $i18n.eq(i);
        const key = e.data('i18n-title');
        e.attr('title', $t(key));
    }
    $i18n = $('*[data-i18n-aria-label]');
    for (let i = 0; i < $i18n.length; i++) {
        const e = $i18n.eq(i);
        const key = e.data('i18n-aria-label');
        e.attr('aria-label', $t(key));
    }
});