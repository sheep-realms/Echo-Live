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
let urlTheme = EchoLiveTools.getUrlParam('theme');
echolive.setTheme(urlTheme || config.echolive.style.live_theme || config.global.theme);

$('html').css('--animation-speed-display-hidden', config.echolive.display.hidden_time + 'ms');
$('html').css('--animation-speed-display-show', config.echolive.display.show_time + 'ms');
$('html').css('--char-effect-name', config.echolive.print_effect.name);
$('html').css('--char-effect-speed', config.echolive.print_effect.duration + 'ms');
$('html').css('--char-effect-scale', config.echolive.print_effect.scale);
$('html').css('--char-effect-timing-function', config.echolive.print_effect.timing_function);
$('html').css('font-weight', config.global.live_font_weight);
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

let printSeCd = 33;
let printSe = true;

let gruopIndex = 0;

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

if (config.echolive.speech_synthesis.enable) {
    try {
        voices = speechSynthesis.getVoices();
    } catch (_) {}

    if (config.echolive.speech_synthesis.voice !== '') voiceIndex = voices.findIndex(e => e.name === config.echolive.speech_synthesis.voice);
}

function messageOutput(text = '', hasHTML = false) {
    if (text === '') return;
    if (text === '<br>') hasHTML = true;
    let textDOM = hasHTML ? text : `<span class="echo-chr ${inTypewriteEnd ? 'echo-typewrite-enter' : ''}">${EchoLiveTools.safeHTML(text)}</span>`;
    let exsel = inRuby ? ' ruby' : '';
    if (inTypewriteEnd) {
        inTypewriteEnd = false;
        $('.echo-output .echo-text-typewrite' + exsel).html(textDOM);
        $('.echo-output .echo-text-typewrite' + exsel).removeClass('echo-text-typewrite');
    } else if (gruopIndex === 0) {
        $('.echo-output' + exsel).append(textDOM);
    } else {
        $(`.echo-output span[data-group="${gruopIndex}"]` + exsel).append(textDOM);
    }
}

function setUsername(name = '') {
    $('#echo-live .name').html(name.replace(/ /g, '&ensp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
}




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

    if (config.echolive.print_audio.enable && chr !== '' && chr !== undefined && printSe) {
        mixer.play(config.echolive.print_audio.name, config.echolive.print_audio.volume, config.echolive.print_audio.rate);
        // 打印音效稳定器
        printSe = false;
        setTimeout(function() {
            printSe = true;
        }, printSeCd);
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
    printSeCd = echo.printSpeedChange + 3;
    first = true;
    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('play', echo.messageList.length);
});

echo.on('printEnd', function() {
    // 整理字符串
    // $('.echo-output').html($('.echo-output').html());
    if(config.echolive.broadcast.enable) echolive.broadcast.echoStateUpdate('stop', echo.messageList.length);

    performance.mark('printEnd');
    performance.measure('printTime', 'printStart', 'printEnd');
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
    gruopIndex = e.groupNow;
    let d = EchoLiveTools.messageStyleGenerator(e.data);
    $('.echo-output').append(`<span data-group="${gruopIndex}" class="${d.class}" style="${d.style}"></span>`);
});

echo.on('groupEnd', function(e) {
    gruopIndex = e.groupNow;
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
                    image-rendering: ${ emojiData.image.rendering };
                "
            >`;
            if (gruopIndex === 0) {
                $('.echo-output').append(emojiDOM);
            } else {
                $(`.echo-output span[data-group="${gruopIndex}"]`).append(emojiDOM);
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
        if (gruopIndex === 0) {
            $('.echo-output').append(imageDom);
        } else {
            $(`.echo-output span[data-group="${gruopIndex}"]`).append(imageDom);
        }
    } else {
        return;
    }

    if (config.echolive.print_audio.enable && printSe) {
        mixer.play(config.echolive.print_audio.name, config.echolive.print_audio.volume, config.echolive.print_audio.rate);
        // 打印音效稳定器
        printSe = false;
        setTimeout(function() {
            printSe = true;
        }, printSeCd);
    }
});

echolive.on('shutdown', function(reason) {
    setUsername($t( 'echolive.system_message' ));

    if (reason !== undefined && reason !== '') {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown_reason', { reason: reason } ));
    } else {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown' ));
    }
});

echolive.on('displayShow', function(callback) {
    $('#echo-live, body').removeClass('display-hidden');
    setTimeout(() => {
        callback();
    }, config.echolive.display.show_time);
});

echolive.on('displayHidden', function(callback) {
    $('#echo-live, body').addClass('display-hidden');
    setTimeout(() => {
        callback();
    }, config.echolive.display.hidden_time);
});

echolive.on('displayHiddenNow', function() {
    $('#echo-live, body').addClass('display-hidden');
});

$(document).on('click', function() {
    if (echo.messageList.length > 0) {
        if (echo.state !== 'stop') {
            echo.stop();
        }
        gruopIndex = 0;
        echo.next();
    }
});

// $('#echo-live .name').text(data.username);
// echo.sendList(data.messages);
