let echo = new Echo();
let echolive = new EchoLive(echo, config);

let data;

let printSeCd = 33;
let printSe = true;

let gruopIndex = 0;

let first = false;

echo.on('next', function() {
    $('#echo-live').attr('class', '');
    if (config.echolive.next_audio_enable) {
        mixer.play(config.echolive.next_audio_name, config.echolive.next_audio_volume, config.echolive.next_audio_rate);
    }
});

echo.on('print', function(chr) {
    if (gruopIndex == 0) {
        $('.echo-output').append(chr);
    } else {
        $(`.echo-output span[data-group="${gruopIndex}"]`).append(chr);
    }

    if (config.echolive.print_audio_enable && chr != '' && printSe) {
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
    $('.echo-output').html($('.echo-output').html());
});

echo.on('groupStart', function(e) {
    gruopIndex = e.groupNow;
    let d = msgStyleGenerator(e.data);
    $('.echo-output').append(`<span data-group="${gruopIndex}" class="${d.class}" style="${d.style}"></span>`);
});

echo.on('groupEnd', function(e) {
    gruopIndex = e.groupNow;
});

function msgStyleGenerator(data) {
    let cls = '';
    if (data?.class) {
        cls = data.class + ' ';
    }
    let style = '';
    if (data?.typewrite) cls += 'echo-text-typewrite '
    if (data?.style) {
        if (data.style?.color) style += `color: ${data.style.color}; --echo-span-color: ${data.style.color}; `;
        if (data.style?.bold) cls += 'echo-text-bold '
        if (data.style?.italic) cls += 'echo-text-italic '
        if (data.style?.underline) cls += 'echo-text-underline '
        if (data.style?.rock) cls += 'echo-text-rock-' + data.style.rock + ' '
        if (data.style?.style) style += data.style.style;
    }

    return {
        class: cls,
        style: style
    }
}

echo.on('typewriteEnd', function() {
    $('.echo-output .echo-text-typewrite').remove();
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