/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

let echo = new Echo();
if (config.echo.html_format_enable !== true) echo.filter.HTMLFormat = false;
let echolive = new EchoLive(echo, config);
const urlTheme = EchoLiveTools.getUrlParam('theme');
const urlThemeVariant = EchoLiveTools.getUrlParam('theme-variant');
const urlZoom = EchoLiveTools.getUrlParam('zoom');
echolive.setTheme(urlTheme || config.echolive.style.live_theme || config.global.theme);
echolive.setThemeVariant(urlThemeVariant || config.echolive.style.live_theme_variant || config.global.theme_variant || '');

$('html').css('--animation-speed-display-hidden', config.echolive.display.hidden_time + 'ms');
$('html').css('--animation-speed-display-show', config.echolive.display.show_time + 'ms');
$('html').css('--char-effect-name', config.echolive.print_effect.name);
$('html').css('--char-effect-speed', config.echolive.print_effect.duration + 'ms');
$('html').css('--char-effect-scale', config.echolive.print_effect.scale);
$('html').css('--char-effect-timing-function', config.echolive.print_effect.timing_function);
$('html').css('font-weight', config.global.live_font_weight);
$('html').css('--echo-live-mini-size-coefficient', config.advanced.obs_api.echolive_mini_size_coefficient || 0.5926);
if (config.echolive.layout.username_text_align_right) $('html').addClass('username-text-align-right');
if (!config.echolive.layout.diplay_controller) $('html').addClass('controller-hidden');
if (urlZoom) $('html').css('--zoom', urlZoom);

if (config.echolive.print_audio.enable) {
    mixer.preload(config.echolive.print_audio.name);
}
if (config.echolive.next_audio.enable) {
    if (config.echolive.next_audio.enable && config.echolive.print_audio.name === config.echolive.next_audio.name) {
    } else {
        mixer.preload(config.echolive.next_audio.name);
    }
}

let data;

let echoTrack = {}

let groupIndex = 0;

let first = false;

let inTypewriteEnd = false;

let messageActions = {
    printEnd: undefined
};

let inRuby = false;


let messageLenB = 0;




let voices = [];
let voiceIndex = -1;
let utterance;

let emojiHako;

let typingLabelData;
let typingLabel = config.echolive.typing.label;

if (config.echolive.speech_synthesis.enable) {
    try {
        voices = speechSynthesis.getVoices();
    } catch (_) {}

    if (config.echolive.speech_synthesis.voice !== '') voiceIndex = voices.findIndex(e => e.name === config.echolive.speech_synthesis.voice);
}

function resetEchoTrack(subTrackCount) {
    echoTrack = {
        main: {
            first: false,
            groupIndex: 0,
            inRuby: false,
            inTypewriteEnd: false
        }
    };

    $('.echo-output').append('<div class="echo-track" data-name="main"></div>');

    for (let i = 0; i < subTrackCount; i++) {
        echoTrack[`sub_${i}`] = {
            first: false,
            groupIndex: 0,
            inRuby: false,
            inTypewriteEnd: false
        };
        $('.echo-output').append(`<div class="echo-track" data-name="sub_${i}"></div>`);
    }
}

function messageOutput(text = '', hasHTML = false, track = 'main') {
    if (text === '') return;
    if (text === '<br>') hasHTML = true;
    let textDOM = hasHTML ? text : `<span class="echo-chr ${echoTrack[track].inTypewriteEnd ? 'echo-typewrite-enter' : ''}">${EchoLiveTools.safeHTML(text, false, { amp: false })}</span>`;
    let exsel = echoTrack[track].inRuby ? ' ruby' : '';
    if (echoTrack[track].inTypewriteEnd) {
        echoTrack[track].inTypewriteEnd = false;
        $(`.echo-output .echo-track[data-name="${track}"] .echo-text-typewrite` + exsel).html(textDOM);
        $(`.echo-output .echo-track[data-name="${track}"] .echo-text-typewrite` + exsel).removeClass('echo-text-typewrite');
    } else if (echoTrack[track].groupIndex === 0) {
        $(`.echo-output .echo-track[data-name="${track}"]` + exsel).append(textDOM);
    } else {
        $(`.echo-output .echo-track[data-name="${track}"] span[data-group="${echoTrack[track].groupIndex}"]` + exsel).append(textDOM);
    }
}

function setUsername(name = '') {
    $('#echo-live .name').html(name.replace(/ /g, '&ensp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
}




$(document).ready(function() {
    translator.ready(() => {
        emojiHako = new EmojiHako();
        if (config.echolive.layout.diplay_controller) echolive.setController(config.echolive.layout.controller || '');

        typingLabelData = echoLiveSystem.registry.getRegistryValue('typing_label', config.echolive.typing.label);
        if (typingLabelData === undefined) {
            typingLabelData = echoLiveSystem.registry.getRegistryValue('typing_label', 'typing');
        }
        $('.typing-icon').html(Icon.getIcon(typingLabelData.icon));
    })
});

echo.on('next', function(msg, option) {
    const { subTrackCount } = option;
    resetEchoTrack(subTrackCount);
    messageLenB = 0;

    messageActions = {
        printEnd: undefined
    };

    echolive.username = EchoLiveTools.getMessageUsername(echolive.username, msg);
    if(config.echolive.broadcast.enable) echolive.broadcast.echoPrinting(echolive.username, EchoLiveTools.getMessagePlainText(msg));

    $('#echo-live').attr('class', '');

    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('ready', echo.messageList.length);

    let trackMessage = {
        main: EchoLiveTools.getMessagePlainText(msg.message)
    };
    let trackMessageLenB = {
        main: new TextEncoder().encode(trackMessage.main).length
    };
    messageLenB = trackMessageLenB.main;

    if (Array.isArray(msg.track)) {
        msg.track.forEach((e, i) => {
            if (e !== undefined) {
                const text = EchoLiveTools.getMessagePlainText(e);
                const b = new TextEncoder().encode(text).length;
                trackMessage[`sub_${i}`] = text;
                trackMessageLenB[`sub_${i}`] = b;
                messageLenB = Math.max(messageLenB, b);
            }
        });
    }

    // 判断文字书写方向
    $('.echo-output').removeClass('echo-text-rlo');     // 旧代码，以防万一还是留着
    for (const key in trackMessage) {
        if (!Object.hasOwn(trackMessage, key)) continue;
        const element = trackMessage[key];
        if (element.trim().search(/[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u07C0-\u07FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/) === 0) {
            $(`.echo-output .echo-track[data-name="${key}"]`).addClass('echo-text-rlo');
        }
    }

    mixer.resetPickIndex();
    if (config.echolive.next_audio.enable) {
        mixer.play(config.echolive.next_audio.name, config.echolive.next_audio.volume, config.echolive.next_audio.rate);
    }

    if (config.echolive.speech_synthesis.enable) {
        speechSynthesis.cancel();
        
        let speechText = EchoLiveTools.getMessagePlainText(
            msg.message,
            false,
            !config.echolive.speech_synthesis.speech_emoji,
            EchoLiveTools.generateCharRegex(config.echolive.speech_synthesis.ignored_characters),
            config.echolive.speech_synthesis.speech_subtrack ? msg.track : undefined
        );
        
        utterance = new SpeechSynthesisUtterance(speechText);

        if (voiceIndex !== -1) utterance.voice = voices[voiceIndex];
        utterance.pitch = config.echolive.speech_synthesis.pitch;
        utterance.rate = config.echolive.speech_synthesis.rate;

        setTimeout(function() {
            speechSynthesis.speak(utterance);
        }, config.echolive.speech_synthesis.delay);
    }
});

echo.on('print', function(chr, track = 'main') {
    if (chr === '\n') {
        echoTrack[track].first = false;
        chr = '<br>'
    }

    messageOutput(chr, false, track);

    if (config.echolive.print_audio.enable && chr !== '' && chr !== undefined) {
        echolive.playPrintSound(track);
    }

    if (echoTrack[track].first && chr !== undefined) {
        echoTrack[track].first = false;
        if (track === 'main') $('.echo-output').attr('data-before', chr);
        $(`.echo-output .echo-track[data-name="${track}"]`).attr('data-before', chr);
    }
});

echo.on('clear', function() {
    $('.echo-output').html('');
});

echo.on('skip', function() {
    $('.echo-output').html('');
});

echo.on('printStart', function() {
    performance.clearMarks();
    performance.clearMeasures();
    performance.mark('printStart');

    for (const key in echoTrack) {
        if (!Object.hasOwn(echoTrack, key)) continue;
        const element = echoTrack[key];
        element.first = true;
    }

    echolive.resetPrintSound();
    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('play', echo.messageList.length);
});

echo.on('printEnd', function(track = 'main') {
    // 整理字符串
    // $('.echo-output').html($('.echo-output').html());
    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('stop', echo.messageList.length);

    performance.mark('printEnd');
    performance.measure('printTime', 'printStart', 'printEnd');
    mixer.resetPickIndex();
    let duration = 0;
    try {
        const measure = performance.getEntriesByName('printTime')[0];
        duration = measure.duration;
    } catch (_) {
        duration = 0;
    }
    if (config.echolive.display.auto) {
        echolive.setDisplayHiddenWaitTimer(messageLenB * 1000 * config.echolive.display.long_text_compensation_rate - duration);
    }

    if (messageActions.printEnd === 'next' && track === 'main') {
        messageActions.printEnd = undefined;
        echo.next();
    }
});

echo.on('groupStart', function(e, track = 'main') {
    echoTrack[track].groupIndex = e.groupNow;
    let d = EchoLiveTools.messageStyleGenerator(e.data);
    $(`.echo-output .echo-track[data-name="${track}"]`).append(`<span data-group="${echoTrack[track].groupIndex}" class="${d.class}" style="${d.style}"></span>`);
});

echo.on('groupEnd', function(e, track = 'main') {
    echoTrack[track].groupIndex = e.groupNow;
});

echo.on('typewriteEnd', function(track = 'main') {
    echoTrack[track].inTypewriteEnd = true;
    // $('.echo-output .echo-text-typewrite').remove();
});

echo.on('rubyStart', function(_, track = 'main') {
    messageOutput('<ruby></ruby>', true, track);
    echoTrack[track].inRuby = true;
})

echo.on('rubyEnd', function(e, track = 'main') {
    messageOutput(`<rt>${e}</rt>`, true, track);
    echoTrack[track].inRuby = false;
})

echo.on('customEvent', function(e, track = 'main') {
    if (track === 'main') $('#echo-live').addClass('event-' + e);
});

echo.on('customData', function(e, track = 'main') {
    if (e?.username !== undefined && track === 'main') setUsername(e.username);
    if (e?.emoji) {
        echo.insertSequence({
            type: 'emoji',
            value: e.emoji
        }, 1);
    }
    if (e?.image !== undefined && config.echolive.image.enable) {
        if (!config.echolive.image.allow_data_url_and_relative_url && e.image?.url.search(/^(http:\/\/|https:\/\/|file:\/\/\/)/) === -1) return;
        echo.insertSequence({
            type: 'image',
            image: e.image
        }, 1);
    }
    if (e?.action !== undefined && track === 'main' && e?.action?.printEnd !== undefined) {
        messageActions.printEnd = e.action.printEnd;
    }
    if (e?.character !== undefined && track === 'main') {
        echolive.broadcast.sendAvatar(e.character);
    }
});

function cerateEmojiElement(data) {
    const style = `style="
        ${ typeof data.icon === 'string' ? '' : 'display: inline-block;' }
        width: ${ data.image.size.width.value };
        height: ${ data.image.size.height.value };
        max-width: ${ data.image.size.width.max };
        max-height: ${ data.image.size.height.max };
        min-width: ${ data.image.size.width.min };
        min-height: ${ data.image.size.height.min };
        margin-left: ${ data.image.margin.left };
        margin-right: ${ data.image.margin.right };
        margin-inline-start: ${ data.image.margin.start };
        margin-inline-end: ${ data.image.margin.end };
        image-rendering: ${ data.image.rendering };
        position: relative;
        inset-block-start: ${ data.image.offset };
        ${ data.image.scale !== 1 ? `transform: scale(${ data.image.scale });` : '' }
    "`;

    if (typeof data.icon === 'string') {
        return `<span
            class="echo-emoji-icon"
            ${ style }
        >
            ${ Icon.getIcon(data.icon) }
        </span>`;
    } else if (typeof data.path === 'string') {
        return `<img
            class="echo-emoji-image"
            src="${ data.path }"
            ${ style }
        >`;
    } else {
        return '';
    }
}

echo.on('customSequence', function(e, track = 'main') {
    if (e.type === 'emoji') {
        let emojiData = emojiHako.getEmoji(e.value);
        if (emojiData !== undefined) {
            let emojiDOM = cerateEmojiElement(emojiData);
            if (echoTrack[track].groupIndex === 0) {
                $(`.echo-output .echo-track[data-name="${track}"]`).append(emojiDOM);
            } else {
                $(`.echo-output .echo-track[data-name="${track}"] span[data-group="${echoTrack[track].groupIndex}"]`).append(emojiDOM);
            }
        }
    } else if (e.type === 'image' && config.echolive.image.enable) {
        if (!config.echolive.image.allow_data_url_and_relative_url && e.image?.url.search(/^(http:\/\/|https:\/\/|file:\/\/\/)/) === -1) return;
        let imageDom = `<img
            src="${ e.image?.url }"
            style="
                display: inline-block;
                width: ${ e.image?.size?.width?.value || 'auto' };
                height: ${ e.image?.size?.height?.value || 'auto' };
                max-width: ${ e.image?.size?.width?.max || `min(${ config.echolive.image.default_max_size }em, 100%)` };
                max-height: ${ e.image?.size?.height?.max || `min(${ config.echolive.image.default_max_size }em, 100%)` };
                min-width: ${ e.image?.size?.width?.min || 'unset' };
                min-height: ${ e.image?.size?.height?.min || 'unset' };
                margin-left: ${ e.image?.margin?.left || '0.5em' };
                margin-right: ${ e.image?.margin?.right || '0.5em' };
                image-rendering: ${ e.image?.rendering || 'auto' };
            "
        >`;
        if (echoTrack[track].groupIndex === 0) {
            $(`.echo-output .echo-track[data-name="${track}"]`).append(imageDom);
        } else {
            $(`.echo-output .echo-track[data-name="${track}"] span[data-group="${echoTrack[track].groupIndex}"]`).append(imageDom);
        }
    } else {
        return;
    }

    if (config.echolive.print_audio.enable) echolive.playPrintSound(track);
});

echolive.on('play_sound', function(name, volume, rate, type) {
    mixer.play(name, volume, rate, type);
});

echolive.on('shutdown', function(reason) {
    setUsername($t( 'echolive.system_message' ));

    if (reason !== undefined && reason !== '') {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown_reason', { reason: reason } ));
    } else {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown' ));
    }
});

echolive.on('display_show', function(callback) {
    $('#echo-live, body').removeClass('display-hidden');
    setTimeout(() => {
        callback();
    }, config.echolive.display.show_time);
});

echolive.on('display_hidden', function(callback) {
    $('#echo-live, body').addClass('display-hidden');
    setTimeout(() => {
        callback();
    }, config.echolive.display.hidden_time);
});

echolive.on('display_hidden_now', function() {
    $('#echo-live, body').addClass('display-hidden');
});

echolive.on('controller_load', function(controller) {
    const $sel = $('#echo-live .controller');
    $sel.html('');
    controller.content.forEach(e => {
        if (typeof e !== 'object') {
            $sel.append(`<span>${e}</span>`);
        } else if (e?.type === 'text') {
            $sel.append(`<span>${ $tc( e.value, { before: 'live_controller.' + controller.meta.name + '.item.' } ) }</span>`);
        } else if (e?.type === 'html') {
            $sel.append(e.value);
        } else if (e?.type === 'icon') {
            $sel.append(Icon.getIcon(e.value));
        } else if (e?.type === 'flex') {
            $sel.append(`<span class="flex-space"></span>`);
        }
    });
});

echolive.on('typing_state_change', function(state) {
    if (state === 'show') {
        $('.controller').removeClass('hidden hide show open');
        $('.controller').addClass('hide');
        setTimeout(() => {
            $('.controller').removeClass('hide');
            $('.controller').addClass('hidden');
            $('.typing-message').removeClass('hidden hide show open');
            $('.typing-message').addClass('show');
        }, 150);
        setTimeout(() => {
            $('.typing-message').removeClass('show');
            $('.typing-message').addClass('open');
        }, 300);
    } else if (state === 'hide') {
        $('.typing-message').removeClass('hidden hide show open');
        $('.typing-message').addClass('hide');
        setTimeout(() => {
            $('.typing-message').removeClass('hide');
            $('.typing-message').addClass('hidden');
            $('.controller').removeClass('hidden hide show open');
            $('.controller').addClass('show');
        }, 150);
        setTimeout(() => {
            $('.controller').removeClass('show');
            $('.controller').addClass('open');
        }, 300);
    }
});

echolive.on('typing_users_change', function(count, users = []) {
    if (count === 0) return;
    const maxUserNameLength = config.echolive.typing.max_username_length;

    const noName = $t('typing.no_name');
    function _getUserName(name) {
        if (typeof name !== 'string') {
            return noName;
        } else if (name.trim().length === 0) {
            return noName;
        } else {
            if (maxUserNameLength > 0 && name.length > maxUserNameLength) {
                return name.substring(0, maxUserNameLength) + $t('localization.ellipsis', {}, '…');
            }
            return name;
        }
    }

    if (config.echolive.typing.username_enable) {
        const data = {
            user: _getUserName(users[0]),
            user2: _getUserName(users[1]),
            n: count
        };

        if (count === 1) {
            $('.typing-message-content').text($t(`typing.label.${ typingLabel }.user_1`, data));
        } else if (count === 2) {
            $('.typing-message-content').text($t(`typing.label.${ typingLabel }.user_2`, data));
        } else if (count > 2) {
            $('.typing-message-content').text($t(`typing.label.${ typingLabel }.user_multi`, data));
        }
    } else {
        $('.typing-message-content').text($t(`typing.label.${ typingLabel }.no_username`));
    }
});

$(document).on('click', function() {
    if (echo.messageList.length > 0) {
        if (echo.state !== 'stop') {
            echo.stop();
        }
        echoTrack.main.groupIndex = 0;
        echo.next();
    }
});

// $('#echo-live .name').text(data.username);
// echo.sendList(data.messages);
