let echo = new Echo();
let echolive = new EchoLive(echo, config);
echolive.theme = extensionManager.theme;
echolive.setTheme(config.echolive.live_theme);

let data;

let printSeCd = 33;
let printSe = true;

let gruopIndex = 0;

let first = false;

let inTypewriteEnd = false;

echo.on('next', function(msg) {
    $('#echo-live').attr('class', '');
    let str = EchoLiveTools.getMessagePlainText(msg.message);

    // 判断文字书写方向
    $('.echo-output').removeClass('echo-text-rlo');
    if (str.trim().search(/[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFE70-\uFEFF]/) == 0) {
        $('.echo-output').addClass('echo-text-rlo');
    }

    if (config.echolive.next_audio_enable) {
        mixer.play(config.echolive.next_audio_name, config.echolive.next_audio_volume, config.echolive.next_audio_rate);
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

    if (config.echolive.print_audio_enable && chr != '' && chr != undefined && printSe) {
        mixer.play(config.echolive.print_audio_name, config.echolive.print_audio_volume, config.echolive.print_audio_rate);
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
});

echo.on('printEnd', function() {
    // 整理字符串
    // $('.echo-output').html($('.echo-output').html());
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