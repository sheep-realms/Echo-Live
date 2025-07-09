/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

if (config.history.layout.message_list_reverse) $('html').addClass('echo-live-history-message-list-reverse');
if (config.history.layout.message_item_reverse) $('html').addClass('echo-live-history-message-item-reverse');
if (!config.history.layout.display_username) $('html').addClass('echo-live-history-disable-username');
if (!config.history.layout.display_time) $('html').addClass('echo-live-history-disable-time');
if (config.history.message.latest_message_hide) $('html').addClass('echo-live-history-latest-message-hide');
$('html').css('font-weight', config.global.live_font_weight);

let echoLiveHistory = new EchoLiveHistory(config);
let urlTheme = EchoLiveTools.getUrlParam('theme');
echoLiveHistory.setTheme(urlTheme || config.history.style.history_theme || config.global.theme);

echoLiveHistory.on('newHistory', function(e) {
    sendHistory(e.username, e.message);
});

echoLiveHistory.on('clearHistory', function() {
    $('#echo-live-history-message-list').text('');
});

echoLiveHistory.on('shutdown', function(reason) {
    $('html').removeClass('echo-live-history-latest-message-hide');

    if (reason != undefined && reason != '') {
        sendHistory($t( 'echolive.system_message' ), $t( 'echolive.shutdown_reason', { reason: reason } ));
    } else {
        sendHistory($t( 'echolive.system_message' ), $t( 'echolive.shutdown' ));
    }
});

echoLiveHistory.on('latestHistoryDisplayChange', function(e) {
    if (e) {
        $('html').addClass('echo-live-history-latest-message-show');
        if (config.history.message_list_reverse) {
            $('#echo-live-history-message-list').scrollTop(-4503599627370496);
        } else {
            $('#echo-live-history-message-list').scrollTop(4503599627370496);
        }
    } else {
        $('html').removeClass('echo-live-history-latest-message-show');
    }
});

function sendHistory(username = '', message = '') {
    if (username == '' || username == undefined) username = $t('message_preview.empty_username');
    if (message == '' || message == undefined) message = $t('message_preview.empty_message');

    username = username.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&ensp;');
    message = EchoLiveTools.getMessagePlainText(message);

    $('#echo-live-history-message-list').append(
        `<div class="history-message-item">
            <div class="username"><div class="content">${EchoLiveTools.safeHTML(username)}</div></div>
            <div class="message"><div class="content echo-output" data-before="${message.substring(0, 1).replace(/"/g, '&quot;')}">${EchoLiveTools.safeHTML(message)}</div></div>
            <div class="time"><div class="content">${EchoLiveTools.formatDate(undefined, 'time_common')}</div></div>
        </div>`
    );

    if (config.history.message_list_reverse) {
        $('#echo-live-history-message-list').scrollTop(-4503599627370496);
    } else {
        $('#echo-live-history-message-list').scrollTop(4503599627370496);
    }
}