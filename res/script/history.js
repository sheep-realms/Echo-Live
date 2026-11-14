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
const urlTheme = EchoLiveTools.getUrlParam('theme');
const urlThemeVariant = EchoLiveTools.getUrlParam('theme-variant');
const urlZoom = EchoLiveTools.getUrlParam('zoom');
echoLiveHistory.setTheme(urlTheme || config.history.style.history_theme || config.global.theme);
echoLiveHistory.setThemeVariant(urlThemeVariant || config.history.style.history_theme_variant || config.global.theme_variant || '');
if (urlZoom) $('html').css('--zoom', urlZoom);

let emojiHako;

$(document).ready(function() {
    translator.ready(() => {
        emojiHako = new EmojiHako();
    })
});

echoLiveHistory.on('new_history', function(e) {
    if (config.history.text_style.enable) {
        sendHistory(e.username, e.original_message);
    } else {
        sendHistory(e.username, e.message);
    }
});

echoLiveHistory.on('clear_history', function() {
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

echoLiveHistory.on('latest_history_display_change', function(e) {
    if (e) {
        $('html').addClass('echo-live-history-latest-message-show');
        if (config.history.layout.message_list_reverse) {
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
    
    let allowStyle = [];
    if (config.history.text_style.allow_basic_style) allowStyle.push('bold', 'italic', 'underline', 'strikethrough', 'weight', 'sub', 'super');
    if (config.history.text_style.allow_color) allowStyle.push('color');
    if (config.history.text_style.allow_background_color) allowStyle.push('backgroundColor');
    if (config.history.text_style.allow_font_size) allowStyle.push('size');

    if (config.history.text_style.enable) {
        message = EchoLiveTools.getMessageRichText(message, allowStyle, {
            allow_class: false,
            allow_typewrite: false
        });
    } else {
        EchoLiveTools.getMessagePlainText(message, true);
    }
    

    $('#echo-live-history-message-list').append(
        `<div class="history-message-item">
            <div class="username"><div class="content">${EchoLiveTools.safeHTML(username)}</div></div>
            <div class="message"><div class="content echo-output" data-before="${message.substring(0, 1).replace(/"/g, '&quot;')}">${message}</div></div>
            <div class="time"><div class="content">${EchoLiveTools.formatDate(undefined, 'time_common')}</div></div>
        </div>`
    );

    if (config.history.layout.message_list_reverse) {
        $('#echo-live-history-message-list').scrollTop(-4503599627370496);
    } else {
        $('#echo-live-history-message-list').scrollTop(4503599627370496);
    }
}