let echo = new Echo();

let gruopIndex = 0;

let first = false;

echo.on('print', function(chr) {
    if (gruopIndex == 0) {
        $('.echo-output').append(chr);
    } else {
        $(`.echo-output span[data-group="${gruopIndex}"]`).append(chr);
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

$(document).on('click', function() {
    if (echo.messageList.length > 0) {
        echo.skip();
        echo.next();
    }
});

$('#echo-live .name').text(data.username);
echo.sendList(data.messages);