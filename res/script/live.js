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

function messageOutput(text = '', hasHTML = false) {
    if (text === '') return;
    if (text === '<br>') hasHTML = true;
    let textDOM = hasHTML ? text : `<span class="echo-chr ${inTypewriteEnd ? 'echo-typewrite-enter' : ''}">${EchoLiveTools.safeHTML(text, false, { amp: false })}</span>`;
    let exsel = inRuby ? ' ruby' : '';
    if (inTypewriteEnd) {
        inTypewriteEnd = false;
        $('.echo-output .echo-text-typewrite' + exsel).html(textDOM);
        $('.echo-output .echo-text-typewrite' + exsel).removeClass('echo-text-typewrite');
    } else if (groupIndex === 0) {
        $('.echo-output' + exsel).append(textDOM);
    } else {
        $(`.echo-output span[data-group="${groupIndex}"]` + exsel).append(textDOM);
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

echo.on('next', function(msg) {
    messageActions = {
        printEnd: undefined
    };

    echolive.username = EchoLiveTools.getMessageUsername(echolive.username, msg);
    if(config.echolive.broadcast.enable) echolive.broadcast.echoPrinting(echolive.username, EchoLiveTools.getMessagePlainText(msg));

    $('#echo-live').attr('class', '');

    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('ready', echo.messageList.length);

    let str = EchoLiveTools.getMessagePlainText(msg.message);
    messageLenB = new TextEncoder().encode(str).length;

    // 判断文字书写方向
    $('.echo-output').removeClass('echo-text-rlo');
    if (str.trim().search(/[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u07C0-\u07FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/) === 0) {
        $('.echo-output').addClass('echo-text-rlo');
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
            EchoLiveTools.generateCharRegex(config.echolive.speech_synthesis.ignored_characters)
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

echo.on('print', function(chr) {
    if (chr === '\n') {
        first = false;
        chr = '<br>'
    }

    messageOutput(chr);

    if (config.echolive.print_audio.enable && chr !== '' && chr !== undefined) {
        echolive.playPrintSound();
    }
    
    if (first && chr !== undefined) {
        first = false;
        $('.echo-output').attr('data-before', chr);
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
    first = true;
    echolive.resetPrintSound();
    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('play', echo.messageList.length);
});

echo.on('printEnd', function() {
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

    if (messageActions.printEnd === 'next') {
        messageActions.printEnd = undefined;
        echo.next();
    }
});

echo.on('groupStart', function(e) {
    groupIndex = e.groupNow;
    let d = EchoLiveTools.messageStyleGenerator(e.data);
    $('.echo-output').append(`<span data-group="${groupIndex}" class="${d.class}" style="${d.style}"></span>`);
});

echo.on('groupEnd', function(e) {
    groupIndex = e.groupNow;
});

echo.on('typewriteEnd', function() {
    inTypewriteEnd = true;
    // $('.echo-output .echo-text-typewrite').remove();
});

echo.on('rubyStart', function() {
    messageOutput('<ruby></ruby>', true);
    inRuby = true;
})

echo.on('rubyEnd', function(e) {
    messageOutput(`<rt>${e}</rt>`, true);
    inRuby = false;
})

echo.on('customEvent', function(e) {
    $('#echo-live').addClass('event-' + e);
});

echo.on('customData', function(e) {
    if (e?.username !== undefined) setUsername(e.username);
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
    if (e?.action !== undefined && e?.action?.printEnd !== undefined) {
        messageActions.printEnd = e.action.printEnd;
    }
    if (e?.character !== undefined) {
        echolive.broadcast.sendAvatar(e.character);
    }
});

echo.on('customSequence', function(e) {
    if (e.type === 'emoji') {
        let emojiData = emojiHako.getEmoji(e.value);
        if (emojiData !== undefined) {
            let emojiDOM = `<img
                src="${ emojiData.path }"
                style="
                    display: inline-block;
                    width: ${ emojiData.image.size.width.value };
                    height: ${ emojiData.image.size.height.value };
                    max-width: ${ emojiData.image.size.width.max };
                    max-height: ${ emojiData.image.size.height.max };
                    min-width: ${ emojiData.image.size.width.min };
                    min-height: ${ emojiData.image.size.height.min };
                    margin-left: ${ emojiData.image.margin.left };
                    margin-right: ${ emojiData.image.margin.right };
                    margin-inline-start: ${ emojiData.image.margin.start };
                    margin-inline-end: ${ emojiData.image.margin.end };
                    image-rendering: ${ emojiData.image.rendering };
                "
            >`;
            if (groupIndex === 0) {
                $('.echo-output').append(emojiDOM);
            } else {
                $(`.echo-output span[data-group="${groupIndex}"]`).append(emojiDOM);
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
        if (groupIndex === 0) {
            $('.echo-output').append(imageDom);
        } else {
            $(`.echo-output span[data-group="${groupIndex}"]`).append(imageDom);
        }
    } else {
        return;
    }

    if (config.echolive.print_audio.enable) echolive.playPrintSound();
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
        $('.typing-message-content').text($t(`typing.${ typingLabel }.no_username`));
    }
});

$(document).on('click', function() {
    if (echo.messageList.length > 0) {
        if (echo.state !== 'stop') {
            echo.stop();
        }
        groupIndex = 0;
        echo.next();
    }
});

// $('#echo-live .name').text(data.username);
// echo.sendList(data.messages);
