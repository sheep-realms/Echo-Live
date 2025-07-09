/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

function pageLoadedI18n() {
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
    $i18n = $('*[data-i18n-placeholder]');
    for (let i = 0; i < $i18n.length; i++) {
        const e = $i18n.eq(i);
        const key = e.data('i18n-placeholder');
        e.attr('placeholder', $t(key));
    }
}

$(document).ready(function() {
        translator.ready(pageLoadedI18n);
});