"use strict";

let echo = new Echo();
if (config.echo.html_format_enable != true) echo.filter.HTMLFormat = false;
let echolive = new EchoLive(echo, config);
echolive.theme = extensionManager.theme;
let urlTheme = EchoLiveTools.getUrlParam('theme');
echolive.setTheme(urlTheme || config.echolive.style.live_theme || config.global.theme);

let data;

let printSeCd = 33;
let printSe = true;

let gruopIndex = 0;

let first = false;

let inTypewriteEnd = false;




let voices = [];
let voiceIndex = -1;
let utterance;

if (config.echolive.speech_synthesis.enable) {
    try {
        voices = speechSynthesis.getVoices();
    } catch (error) {}

    if (config.echolive.speech_synthesis.voice != '') voiceIndex = voices.findIndex(e => e.name == config.echolive.speech_synthesis.voice);
}




echo.on('next', function(msg) {
    echolive.username = EchoLiveTools.getMessageUsername(echolive.username, msg);
    echolive.broadcast.echoPrinting(echolive.username, EchoLiveTools.getMessagePlainText(msg));

    $('#echo-live').attr('class', '');

    echolive.broadcast.echoStateUpdate('ready', echo.messageList.length);

    let str = EchoLiveTools.getMessagePlainText(msg.message);

    // 判断文字书写方向
    $('.echo-output').removeClass('echo-text-rlo');
    if (str.trim().search(/[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFE70-\uFEFF]/) == 0) {
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

        if (voiceIndex != -1) utterance.voice = voices[voiceIndex];
        utterance.pitch = config.echolive.speech_synthesis.pitch;
        utterance.rate = config.echolive.speech_synthesis.rate;

        setTimeout(function() {
            speechSynthesis.speak(utterance);
        }, config.echolive.speech_synthesis.delay);
    }
});

echo.on('print', function(chr) {
    if (chr == '\n') {
        first = false;
        chr = '<br>'
    }

    if (inTypewriteEnd) {
        inTypewriteEnd = false;
        $('.echo-output .echo-text-typewrite').text(chr);
        $('.echo-output .echo-text-typewrite').removeClass('echo-text-typewrite');
    } else if (gruopIndex == 0) {
        $('.echo-output').append(chr);
    } else {
        $(`.echo-output span[data-group="${gruopIndex}"]`).append(chr);
    }

    if (config.echolive.print_audio.enable && chr != '' && chr != undefined && printSe) {
        mixer.play(config.echolive.print_audio.name, config.echolive.print_audio.volume, config.echolive.print_audio.rate);
        // 打印音效稳定器
        printSe = false;
        setTimeout(function() {
            printSe = true;
        }, printSeCd);
    }
    
    if (first && chr != undefined) {
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
    printSeCd = echo.printSpeedChange + 3;
    first = true;
    echolive.broadcast.echoStateUpdate('play', echo.messageList.length);
});

echo.on('printEnd', function() {
    // 整理字符串
    // $('.echo-output').html($('.echo-output').html());
    echolive.broadcast.echoStateUpdate('stop', echo.messageList.length);
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

echo.on('customEvent', function(e) {
    $('#echo-live').addClass('event-' + e);
});

echo.on('customData', function(e) {
    if (e?.username) $('#echo-live .name').text(e.username);
    if (e?.emoji) {
        echo.insertSequence({
            type: 'emoji',
            value: e.emoji
        }, 1);
    }
    // if (e?.image != undefined) {
    //     echo.insertSequence({
    //         type: 'image',
    //         image: e.image
    //     }, 1);
    // }
});

echo.on('customSequence', function(e) {
    if (e.type == 'emoji') {
        let emojiData = emojiHako.getEmoji(e.value);
        if (emojiData != undefined) {
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
            if (gruopIndex == 0) {
                $('.echo-output').append(emojiDOM);
            } else {
                $(`.echo-output span[data-group="${gruopIndex}"]`).append(emojiDOM);
            }
        }

        if (config.echolive.print_audio.enable && printSe) {
            mixer.play(config.echolive.print_audio.name, config.echolive.print_audio.volume, config.echolive.print_audio.rate);
            // 打印音效稳定器
            printSe = false;
            setTimeout(function() {
                printSe = true;
            }, printSeCd);
        }
    }
});

echolive.on('shutdown', function(reason) {
    $('#echo-live .name').text($t( 'echolive.system_message' ));

    if (reason != undefined && reason != '') {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown_reason', { reason: reason } ));
    } else {
        $('#echo-live .echo-output').text($t( 'echolive.shutdown' ));
    }
});

$(document).on('click', function() {
    if (echo.messageList.length > 0) {
        if (echo.state != 'stop') {
            echo.stop();
        }
        gruopIndex = 0;
        echo.next();
    }
});

// $('#echo-live .name').text(data.username);
// echo.sendList(data.messages);