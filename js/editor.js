let textList = [
    {text: ''}
];



$('.tabpage-nav .tabpage-nav-item').click(function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $('.tabpage-panel').addClass('hide');
    $(`.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hide');
});

$('#ptext-btn-clear').click(function() {
    $('#ptext-content').val('');
    // $('#ptext-ipt-print-speed').val('30');
    let $sel = $('.tabpage-panel[data-pageid="ptext"] input.reset');
    for (let i = 0; i < $sel.length; i++) {
        $sel.eq(i).val($sel.eq(i).data('default'));
    }
    $('#ptext-content').focus();
});

$('#rtext-btn-text-clear').click(rtextTextClear);

$('#rtext-btn-text-save').click(function() {
    let index = $('#editor-text-index-now').val();
    let message = {
        text: $('#rtext-text').val()
    };
    textList[index] = message;
    editorTextListUpdate();  
});

$('#editor-text-list-add').click(function() {
    rtextTextClear();
    let i = textList.push({text: ''});
    editorTextListUpdate();
    $('#editor-text-index-now').val(i - 1);
    $('.editor-text-index-now').text(i);
});

$('#rtext-btn-clear').click(function() {
    $('#rtext-text').val('');
    $('#rtext-style').val('');
    let $sel = $('.tabpage-panel[data-pageid="rtext"] input.reset');
    for (let i = 0; i < $sel.length; i++) {
        $sel.eq(i).val($sel.eq(i).data('default'));
    }
    textList = [
        {text: ''}
    ];
    editorTextListUpdate();
    $('#editor-text-index-now').val(0);
    $('.editor-text-index-now').text(1);
    $('#rtext-text').focus();
});

$('#output-btn-clear').click(function() {
    $('#output-content').val('');
    $('#output-content').focus();
});

$('#ptext-btn-submit').click(function() {
    let txt = $('#ptext-content').val();
    let username = $('#ptext-character').val();

    if ($('#ptext-chk-quote').val() == 1) {
        txt = $('#ptext-ipt-quote-before').val() + txt + $('#ptext-ipt-quote-after').val();
    }

    let d = {
        username: username,
        messages: [
            {
                message: txt
            }
        ]
    }

    if ($('#ptext-chk-more').val() == 1) {
        d.messages[0].data = {
            ...d.messages[0].data,
            ...{printSpeed: $('#ptext-ipt-print-speed').val()}
        };
    }

    

    $('#output-content').val(getOutputBefore() + formatJson(d));
    $('#tabpage-nav-output').click();
    $('#output-content').focus();
    $('#output-content').select();
});

$('.checkbox').click(function() {
    let v = $(this).children('input').val();
    if (v == 0) {
        $(this).children('input').val(1);
        $(this).addClass('selected');
        $(this).attr('aria-selected', 'true');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').removeClass('hide');
        }
    } else {
        $(this).children('input').val(0);
        $(this).removeClass('selected');
        $(this).attr('aria-selected', 'false');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').addClass('hide');
        }
    }
});


function editorTextListUpdate() {
    $('.editor-text-list-content').html(EditorTextList.getList(textList));  
}

function rtextTextClear() {
    $('#rtext-text').val('');
    $('#rtext-style').val('');
    let $sel = $('.tabpage-panel[data-pageid="rtext"] .editor-text-item input.reset');
    for (let i = 0; i < $sel.length; i++) {
        $sel.eq(i).val($sel.eq(i).data('default'));
    }
    $('#rtext-text').focus();
}

function getOutputBefore() {
    let v = $('#config-output-use-before').val();
    if (v == 1) {
        return $('#config-output-before').val();
    } else {
        return '';
    }
}

function formatJson(json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ': ');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
                indent = 0,
                padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    }
    );
    return formatted.replace(/^\s+|\s+$/g,'');
};