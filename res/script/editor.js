// 警告：这是一坨屎山

let textList = [
    {text: ''}
];

let timer = {
    clickEffect: -1
}

setDefaultValue('#config-output-before', config.editor.output_before);
setDefaultValue('#config-output-after', config.editor.output_after);
$('#ptext-character, #rtext-character').val(config.editor.username_init);
setCheckboxDefaultValue('#config-output-use-before', config.editor.ontput_before_enable);
setCheckboxDefaultValue('#config-output-use-after', config.editor.ontput_after_enable);

if (!config.editor.tabpage_config_enable) $('#tabpage-nav-config').addClass('hide');
if (!config.editor.tabpage_output_enable) $('#tabpage-nav-output').addClass('hide');

if (config.accessible.high_contrast)  $('body').addClass('accessible-high-contrast');
if (config.accessible.drotanopia_and_deuteranopia) $('body').addClass('accessible-drotanopia-and-deuteranopia');

let elb;

if (config.echo.print_speed != 30) {
    $('#ptext-ipt-print-speed, #rtext-ipt-print-speed').val(config.echo.print_speed);
    $('.print-speed-config').text(config.echo.print_speed);
    $('.print-speed-change').removeClass('hide');
}

if (config.echolive.broadcast_enable) {
    $('#ptext-btn-submit').addClass('fh-ghost');
    $('#ptext-btn-send, #output-btn-send').removeClass('hide');
    $('#ptext-content').attr('title', '当焦点在此文本框中时，可用按下 Ctrl + Enter 快速发送');

    if (config.editor.client_state_panel_enable) {
        $('.echo-live-client-state').removeClass('hide');
    }

    // 纯文本 - 内容 - 快捷键
    $('#ptext-content').keydown(function(e) {
        if (e.keyCode == 13 && e.ctrlKey) {
            $('.fh-effect-click').removeClass('fh-effect-click');
            clearTimeout(timer.clickEffect)

            $('#ptext-btn-send').click();

            $('#ptext-btn-send').addClass('fh-effect-click');
            timer.clickEffect = setTimeout(function () {
                $('#ptext-btn-send').removeClass('fh-effect-click');
            }, 1000);
        }
    })

    $('.echo-live-client-state-content').html(EditorClientState.statePanel([]));

    elb = new EchoLiveBroadcast(undefined, config.echolive.broadcast_channel);
    elb.on('clientsChange', clientsChange);
    elb.on('message', getMessage);
    elb.on('noClient', noClient);

    checkNowDate();
    editorLog('广播模式已开启：' + config.echolive.broadcast_channel);
    editorLog('User Agent: ' + navigator.userAgent, 'dbug');
    if (navigator.userAgent.toLowerCase().search(/ obs\//) != -1) {
        editorLog('编辑器已正确安装在 OBS 中！', 'done');
    } else {
        editorLog('您似乎并未正确在 OBS 中安装此编辑器，详见：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/', 'tips');
    }
} else {
    checkNowDate();
    editorLog('未开启广播模式，无日志显示。');
}

function getTime() {
    let d = new Date();
    return `${d.getFullYear()}-${afterZero(d.getMonth() + 1)}-${afterZero(d.getDate())} ${afterZero(d.getHours())}:${afterZero(d.getMinutes())}:${afterZero(d.getSeconds())}`;
}

function afterZero(value) {
    if (value >= 10) {
        return `${value}`;
    } else {
        return `0${value}`;
    }
}


let logMsgMark = 0;

function editorLog(message = '', type = 'info') {
    const typename = {
        'dbug': '调试：',
        'tips': '提示：',
        'info': '信息：',
        'warn': '警告：',
        'erro': '错误：',
        'done': '完成：',
    };
    $('#editor-log').append(`<div class="log-item log-type-${type}" ${type == 'dbug' ? 'aria-hidden="false"' : ''}><span class="time" aria-hidden="false">${getTime()}</span> <span class="type" aria-label="${typename[type]}">[${type.toUpperCase()}]</span> <span class="message">${message}</span></div>`);
    $('#editor-log').scrollTop($('#editor-log').height());

    if ((type == 'warn' || type == 'erro') && $('#tabpage-nav-log').attr('aria-selected') == 'false') {
        logMsgMark++;
        $('#log-message-mark').text(logMsgMark);
        $('#log-message-mark').removeClass('hide');
    }
}

$('#tabpage-nav-log').click(function() {
    logMsgMark = 0;
    $('#log-message-mark').addClass('hide');
});

function clientsChange (e) {
    $('.echo-live-client-state-content').html(EditorClientState.statePanel(e));
}

function getMessage(data) {
    switch (data.action) {
        case 'message_data':
            editorLog('收到来自其他服务端的消息数据。');
            break;
            
        case 'hello':
            if (data.target == undefined || data.target == elb.uuid) {
                let helloMsg1 = data.data.hidden ? '已休眠，' : '';
                editorLog(`Echo-Live 进入广播频道，${helloMsg1}UUID：${data.data.uuid}`);
            } else if (data.target == '@__server') {
                editorLog(`Echo-Live 已向服务器发送 HELLO 消息。`);
            }
            break;

        case 'ping':
            editorLog('有其他服务端加入频道，UUID：' + data.data?.uuid);
            break;

        case 'close':
            editorLog('Echo-Live 离开广播频道，UUID：' + data.data.uuid);
            break;

        case 'echo_next':
            editorLog('收到来自其他服务端的指令：打印下一条消息。');
            break;

        case 'page_hidden':
            editorLog('Echo-Live 因不可见已休眠，UUID：' + data.data.uuid);
            break;

        case 'page_visible':
            editorLog('Echo-Live 已唤醒，UUID：' + data.data.uuid);
            break;
    
        default:
            break;
    }
}

function noClient() {
    editorLog('没有 Echo-Live 客户端响应，请检查您是否正确打开或安装了 live.html。如果您的操作正确，则可能是因为所有 Echo-Live 源均处于不可见状态。', 'warn');
}



// 标签页切换
$('.tabpage-nav .tabpage-nav-item').click(function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $('.tabpage-panel').addClass('hide');
    $(`.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hide');
});

// 纯文本重置
$('#ptext-btn-clear').click(function() {
    $('#ptext-content').val('');
    // $('#ptext-ipt-print-speed').val('30');
    let $sel = $('.tabpage-panel[data-pageid="ptext"] input.reset');
    for (let i = 0; i < $sel.length; i++) {
        $sel.eq(i).val($sel.eq(i).data('default'));
    }
    $('#ptext-content').focus();
});

// 富文本重置
$('#rtext-btn-text-clear').click(rtextTextClear);

// 富文本保存段落
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

// 输出清空
$('#output-btn-clear').click(function() {
    $('#output-content').val('');
    $('#output-content').focus();
});

// 纯文本数据整理
function ptextSubmit() {
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
            ...{printSpeed: Number($('#ptext-ipt-print-speed').val())}
        };
    }

    return d;
}

// 纯文本提交
$('#ptext-btn-submit').click(function() {
    let d = ptextSubmit();

    $('#output-content').val(getOutputBefore() + formatJson(d) + getOutputAfter());
    $('#tabpage-nav-output').click();
    $('#output-content').focus();
    $('#output-content').select();
});

// 纯文本发送
$('#ptext-btn-send').click(function() {
    let d = ptextSubmit();

    elb.sendData(d);

    editorLog(`已发送纯文本消息：<${d?.username != '' ? d?.username : '<i>[未指定说话人]</i>'}> ${d.messages[0]?.message != '' ? d.messages[0]?.message : '<i>[空消息]</i>'}`);
});

// 输出页发送
$('#output-btn-send').click(function() {
    let before      = getOutputBefore(),
        after       = getOutputAfter(),
        centent     = $('#output-content').val(),
        beforeCheck = centent.substring(0, before.length) == before,
        afterCheck  = centent.substring(centent.length - after.length, centent.length) == after
        newCentent  = '';
    
    if (centent.length == 0) return editorLog('未输入内容，未发送任何消息。', 'erro');
    
    if (beforeCheck && afterCheck) {
        newCentent = centent.substring(before.length, centent.length - after.length);
    } else {
        newCentent = centent;
    }

    try {
        elb.sendData(JSON.parse(newCentent));
        editorLog('已发送自定义消息。');
    } catch (error) {
        editorLog('发送的消息格式存在错误。详见帮助文档：https://sheep-realms.github.io/Echo-Live-Doc/message/', 'erro');
    }
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

function getOutputAfter() {
    let v = $('#config-output-use-after').val();
    if (v == 1) {
        return $('#config-output-after').val();
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

function setDefaultValue($sel, value) {
    $($sel).data('default', value);
    $($sel).val(value);
}

function setCheckboxDefaultValue($sel, value) {
    $($sel).val(value);
    if (value == 1) {
        $($sel).parents('.checkbox').attr('aria-selected', 'true');
        $($sel).parents('.checkbox').addClass('selected');
    } else {
        $($sel).parents('.checkbox').attr('aria-selected', 'false');
        $($sel).parents('.checkbox').removeClass('selected');
    }
}




// 彩蛋
function getDateNumber() {
    let d = new Date();
    return `${afterZero(d.getMonth() + 1)}${afterZero(d.getDate())}`;
}

function checkNowDate() {
    let d = new Date();
    let dn = getDateNumber();
    let msg = {
        '0101': `${d.getFullYear()} 年来了！感谢您一直以来对 Echo-Live 的支持！`,
        '0721': 'Ciallo～(∠·ω< )⌒★',
        '0914': '2023 年的今天，Echo Live 诞生了！',
        '1231': '哇哦，今年只剩下最后一天了，您要和我一起跨年吗？'
    }

    if (msg[dn] != undefined) {
        editorLog(msg[dn], 'tips');
    }
}