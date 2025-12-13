/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


// 警告：这是一坨屎山

// 为了防止再出现逆天的建立在bug上运行的程序加入了严格模式
"use strict";

let sysNotice = new SystemNotice();

let unknownErrorListenerDown = false;
window.addEventListener("error", (e) => {
    if (unknownErrorListenerDown) return;
    sysNotice.sendTHasTitle('notice.unknown_error', {}, 'fatal');
    unknownErrorListenerDown = true;
    setTimeout(() => {
        unknownErrorListenerDown = false;
    }, 10000)
});

let localStorageManager = new LocalStorageManager();

let uniWindow = new UniverseWindow();

let textList = [
    {text: ''}
];

checkboxEvent = {
    "ptext-chk-use-formatting-code": ptextChkUseFormattingCodeChange
};

let history = [];
let historyMinimum = 0;
let historyClearConfirm = false;

let selectedImageData = [];
let selectedImageDataBottomIndex = -1;

let hasError = false;

let logScrollButInvisible = false;

let initDevicePixelRatio = window.devicePixelRatio;
let devicePixelRatioChanged = 0;
let inOBS = false;

setDefaultValue('#config-output-before', config.editor.form.output_before);
setDefaultValue('#config-output-after', config.editor.form.output_after);
setDefaultValue('#ptext-ipt-quote-before', config.editor.form.quote_before);
setDefaultValue('#ptext-ipt-quote-after', config.editor.form.quote_after);
$('#ptext-character, #rtext-character').val(config.editor.form.username);
setCheckboxDefaultValue('#config-output-use-before', config.editor.form.ontput_before_enable);
setCheckboxDefaultValue('#config-output-use-after', config.editor.form.ontput_after_enable);

if (!config.editor.function.tabpage_config_enable) $('#tabpage-nav-config').addClass('hide');
if (!config.editor.function.tabpage_output_enable) $('#tabpage-nav-output').addClass('hide');

if (!config.echolive.image.allow_data_url_and_relative_url) {
    $('#popups-image-nav .tabpage-nav-item[data-pageid="file"]').addClass('hide');
    $('#popups-image-nav .tabpage-nav-item[data-pageid="url"]').click();
    $('#popups-image-images-list').addClass('disable-not-absolute');
}



let commander = new Commander();
let logMessager = new Messager();
logMessager.on('message', function(message, type = 'info', isInput = false) {
    editorLog('[Commander] ' + ( isInput ? '&lt; ' : '&gt; ' ) + EchoLiveTools.safeHTML(message), type);
});
commander.link.localStorageManager = localStorageManager;
commander.link.messager = logMessager;
commander.link.systemNotice = sysNotice;
commander.link.window = uniWindow;
let commanderFnMode = false;

let elb;

// 彩蛋
let clientTargetButNoClient = false;

$(document).ready(function() {

    translator.ready(() => {
        echoLiveEditor.emojiHako = new EmojiHako();

        $('#ptext-editor .editor-bottom-bar .length').text($t('editor.form.text_length', { n: 0 }));

        $('.tabpage-panel[data-pageid="ptext"] .editor-controller').append(EditorForm.editorController('ptext-content'));

        popupsCreate(Popups.palettePopups(echoLiveEditor.getPalettes()), '#popups-palette');
        $('#popups-palette .palette-page').eq(0).removeClass('hide');
        if (config.editor.color_picker.contrast_enable) $('#popups-palette').addClass('color-contrast-enable');
        $('#popups-palette .popups-palette-color-contrast .diff-dashboard').css('--bg-color', config.editor.color_picker.contrast_background_color)
        paletteColorContrastCheck('#000000');

        popupsCreate(Popups.emojiPopups(echoLiveEditor.getEmoji()), '#popups-emoji');
        $('#popups-emoji .emoji-page').eq(0).removeClass('hide');

        popupsCreate(Popups.imagePopups(), '#popups-image');

        try {
            selectedImageData = localStorageManager.getItem('images_cache');
            if (!Array.isArray(selectedImageData)) selectedImageData = [];
            $('#popups-image-images-list').html(Popups.imagesContent(selectedImageData));
        } catch (_) {
            
        }

        if (config.echo.print_speed !== 30) {
            $('.echo-editor-form-input-tip').text($t('editor.form.description.print_speed_custom', { value: config.echo.print_speed }));
        }

        if (config.echolive.broadcast.enable) {
            $('#ptext-btn-submit').addClass('fh-ghost');
            $('#ptext-btn-send, #output-btn-send, #checkbox-sent-clear').removeClass('hide');
            $('#ptext-content, #output-content').attr('title', $t('editor.tip.hot_key_textarea_quick_send'));

            if (config.editor.function.client_state_panel_enable) {
                $('.echo-live-client-state').removeClass('hide');
            }

            if (config.editor.function.client_state_panel_enable || config.advanced.editor.forced_display_split_message) {
                $('#collapse-split-message').removeClass('hide');
            }

            // 输出 - 内容 - 快捷键
            $('#output-content').keydown(function(e) {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    if (
                        (!config.accessibility.send_on_enter && e.ctrlKey)
                        || (config.accessibility.send_on_enter && !e.ctrlKey)
                    ) {
                        $('#output-btn-send').click();
                        effectClick('#output-btn-send');
                    } else if (config.accessibility.send_on_enter) {
                        e.preventDefault();
                        insertNewline(this);
                    }
                }
            })

            $('.echo-live-client-state-content').html(EditorClientState.statePanel([]));

            elb = new EchoLiveBroadcastServer(config.echolive.broadcast.channel, config);
            elb.on('clientsChange', clientsChange);
            elb.on('message', getMessage);
            elb.on('error', getError);
            elb.on('noClient', noClient);
            elb.on('nameDuplicate', nameDuplicate);
            elb.on('websocketConnectOpen', websocketConnectOpen);
            elb.on('websocketConnectClose', websocketConnectClose);
            elb.on('websocketConnectError', websocketConnectError);
            elb.on('websocketMessageError', websocketMessageError);

            commander.link.broadcast = elb;

            checkNowDate();
            editorLogT('editor.log.broadcast_launch.done', { channel: config.echolive.broadcast.channel });
            editorLog('User Agent: ' + navigator.userAgent, 'dbug');

            if (config.editor.websocket.enable) {
                editorLogT('editor.log.broadcast_launch.user_agent_check_websocket', {}, 'done');
            } else if (navigator.userAgent.toLowerCase().search(/ obs\//) !== -1) {
                editorLogT('editor.log.broadcast_launch.user_agent_check', {}, 'done');
                inOBS = true;
            } else {
                editorLogT('editor.log.broadcast_launch.user_agent_error', {}, 'tips');
            }
        } else {
            checkNowDate();
            editorLogT('editor.log.broadcast_launch.disable');
        }

        if (window?.documentPictureInPicture === undefined) {
            $('#ptext-box-open-document-pip').text($t('pip.not_support'));
        } else if (EchoLiveTools.getUrlParam('pip') !== null) {
            $('#ptext-box-open-document-pip').text($t('pip.in_pip'));
        } else {
            $('#ptext-btn-open-document-pip').prop('disabled', false);
        }
    });

    loadEditorFormStorage();
});

window.addEventListener("beforeunload", () => {
    localStorageManager.setItem('editor_form_storage', {
        plan_text: {
            character: $('#ptext-character').val(),
            content: $('#ptext-content').val(),
            use_formatting_code: $('#ptext-chk-use-formatting-code').val(),
            startup_parameter: $('#ptext-chk-more').val(),
            print_speed: $('#ptext-ipt-print-speed').val(),
            quote: $('#ptext-chk-quote').val(),
            quote_before: $('#ptext-ipt-quote-before').val(),
            quote_after: $('#ptext-ipt-quote-after').val(),
            split_message: $('#ptext-chk-split-message').val(),
            sent_clear: $('#ptext-chk-sent-clear').val(),
            sent_clear_content: $('#ptext-sent-clear-content').val()
        }
    });
});

function loadEditorFormStorage() {
    const editorFormStorage = localStorageManager.getItem('editor_form_storage');
    if (typeof editorFormStorage !== 'object') return;

    const input = [
        ['character',           'ptext-character'],
        ['content',             'ptext-content'],
        ['print_speed',         'ptext-ipt-print-speed'],
        ['quote_before',        'ptext-ipt-quote-before'],
        ['quote_after',         'ptext-ipt-quote-after'],
        ['sent_clear_content',  'ptext-sent-clear-content']
    ]
    const checkbox = [
        ['use_formatting_code', 'ptext-chk-use-formatting-code'],
        ['startup_parameter',   'ptext-chk-more'],
        ['quote',               'ptext-chk-quote'],
        ['split_message',       'ptext-chk-split-message'],
        ['sent_clear',          'ptext-chk-sent-clear']
    ];

    input.forEach(e => {
        const value = editorFormStorage?.plan_text[e[0]];
        if (value !== undefined) $('#' + e[1]).val(value);
    });

    checkbox.forEach(e => {
        const value = editorFormStorage?.plan_text[e[0]];
        if (value == 1) {
            $('#' + e[1]).parents('.checkbox').eq(0).trigger('click');
        }
    });

    if (editorFormStorage?.plan_text?.split_message == 1) {
        $('#collapse-split-message').removeClass('hide');
    }
}


let logMsgMark = 0;

function editorLog(message = '', type = 'info') {
    $('#editor-log').append(`<div class="log-item log-type-${type}" ${type === 'dbug' ? 'aria-hidden="true"' : ''}><span class="time" aria-hidden="true">${EchoLiveTools.formatDate(undefined, 'date_time_common')}</span> <span class="type" aria-label="${ $t('editor.log.accessibility.type.' + type) }">[${type.toUpperCase()}]</span> <span class="message" ${type === 'erro' || type === 'warn' ? ' role="alert"' : ''}>${message}</span></div>`);
    $('#editor-log').scrollTop(4503599627370496);

    if ($('#tabpage-nav-log[aria-selected="true"]').length <= 0) {
        logScrollButInvisible = true;
    }

    // 防止日志过多
    let $logitems = $('#editor-log .log-item');
    if (config.editor.function.log_line_maximum >= 0 && $logitems.length > config.editor.function.log_line_maximum) {
        $(`#editor-log .log-item:lt(${$logitems.length - config.editor.function.log_line_maximum})`).remove();
    }

    // 通知重要消息
    if ((type === 'warn' || type === 'erro') && $('#tabpage-nav-log').attr('aria-selected') == 'false') {
        logMsgMark++;
        $('#log-message-mark').text(logMsgMark);
        $('#log-message-mark').removeClass('hide');
    }
}

function editorLogT(key, data = {}, type = 'info') {
    let msg = $t(key, data);
    editorLog(msg, type);
}

$('#tabpage-nav-log').click(function() {
    if (logScrollButInvisible) {
        logScrollButInvisible = false;
        setTimeout(function() {
            $('#editor-log').scrollTop(4503599627370496);
        }, 20);
    }
});

$('#tabpage-nav-log').click(function() {
    logMsgMark = 0;
    $('#log-message-mark').addClass('hide');
});

function clientsChange(e) {
    $('.echo-live-client-state-content').html(EditorClientState.statePanel(e));
}

function getMessage(data) {
    switch (data.action) {
        case 'message_data':
            let messageDataText = EchoLiveTools.getMessageSendLog(data.data.messages[0].message, data.data.username);
            let messageDataTextArray = [...messageDataText];
            if (messageDataTextArray.length > 128) {
                messageDataText = messageDataTextArray.splice(0, 128).join('');
                messageDataText += '...'
            }
            editorLogT('editor.log.broadcast.message_data_third', {
                message: messageDataText
            });
            break;
            
        case 'hello':
            if (data.target === undefined || data.target === elb.uuid) {
                let helloMsg1 = data.data.hidden ? '_hidden' : '';
                let helloMsg2 = data.target === elb.uuid ? '_reply' : '';
                editorLogT(
                    'editor.log.broadcast.hello' + helloMsg2 + helloMsg1,
                    {
                        client: $t('broadcast.client.type.' + data.from?.type),
                        name: data.from?.name
                    }
                );
            } else if (data.target === '@__server') {
                editorLogT(
                    'editor.log.broadcast.hello_to_server',
                    {
                        client: $t('broadcast.client.type.' + data.from?.type),
                        name: data.from?.name
                    }
                );
            }
            break;

        case 'ping':
            editorLogT(
                'editor.log.broadcast.ping_server',
                {
                    name: data.from.name
                }
            );
            break;

        case 'echo_next':
        case 'websocket_close':
            editorLogT('editor.log.broadcast.' + data.action);
            break;

        case 'close':
        case 'page_hidden':
        case 'page_visible':
            editorLogT(
                'editor.log.broadcast.' + data.action,
                {
                    client: $t('broadcast.client.type.' + data.from?.type),
                    name: data.from?.name
                }
            );
            break;

        case 'set_theme_style_url':
            editorLogT(
                'editor.log.broadcast.set_theme_style_url',
                {
                    url: data.data.url
                }
            );
            break;

        case 'set_theme':
            editorLogT(
                    'editor.log.broadcast.set_theme',
                    {
                        name: data.data.name
                    }
            );
            break;

        case 'error_unknown':
            editorLogT(
                'editor.log.error.unknown_error_in_client',
                {
                    client: $t('broadcast.client.type.' + data.from.type),
                    msg: data.data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ {2}/g, '&nbsp; ').replace(/\n/g, '<br>'),
                    source: EchoLiveTools.safeHTML(data.data.source),
                    line: data.data.line,
                    col: data.data.col,
                    name: data.from.name
                },
                'erro'
            );
            if (!hasError) {
                hasError = true;
                editorLogT('editor.log.tip.unknown_error', {}, 'tips');
            }
            break;

        case 'shutdown':
            editorLogT(
                'editor.log.broadcast.shutdown' + (data.data?.reason !== undefined ? '_reason' : ''),
                data.data?.reason !== undefined ? { reason: data.data?.reason } : {}
            );
            break

        default:
            break;
    }
}

function getError(data) {
    switch (data.data.name) {
        case 'websocket_error':
            if (data.data.tryReconnect) {
                editorLogT(
                    'editor.log.error.websocket_error',
                    {
                        client: $t('broadcast.client.type.' + data?.from?.type),
                        url: data.data.url,
                        n: data.data.reconnectCount,
                        name: data.from.name
                    },
                    'erro'
                );
            } else {
                editorLogT(
                    'editor.log.error.websocket_error_retry_failed',
                    {
                        client: $t('broadcast.client.type.' + data?.from?.type),
                        url: data.data.url,
                        name: data.from.name
                    },
                    'erro'
                );
            }
            break;

        case 'websocket_message_error':
            editorLogT(
                'editor.log.error.websocket_message_error',
                {
                    client: $t('broadcast.client.type.live'),
                    name: data.from.name
                },
                'erro'
            );
            break;
    
        default:
            break;
    }
}

function noClient() {
    editorLogT('editor.log.warn.no_client', {}, 'warn');
}

function nameDuplicate(name, uuid) {
    editorLogT('editor.log.error.name_duplicate', { name: name, uuid: uuid}, 'erro');
}

function websocketConnectOpen(data) {
    editorLogT('editor.log.broadcast.editor_websocket_connect_open', data);
}

function websocketConnectClose(data) {
    editorLogT('editor.log.broadcast.editor_websocket_connect_close', data, 'erro');
}

function websocketConnectError(data) {
    let key = 'editor.log.broadcast.editor_websocket_connect_error';
    if (!data.tryReconnect) key = 'editor.log.broadcast.editor_websocket_connect_error_retry_failed';
    editorLogT(key, {
        url: data.url,
        n: data.reconnectCount
    }, 'erro');
}

function websocketMessageError() {
    editorLogT('editor.log.broadcast.editor_websocket_message_error', {}, 'erro');
}

// 纯文本重置
$('#ptext-btn-clear').click(function() {
    $('#ptext-content').val('');
    // $('#ptext-ipt-print-speed').val('30');
    let $sel = $('.tabpage-panel[data-pageid="ptext"] input.reset');
    for (let i = 0; i < $sel.length; i++) {
        $sel.eq(i).val($sel.eq(i).data('default'));
    }
    $('#ptext-content').trigger('input');
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

    function __messagePackage(text) {
        if ($('#ptext-chk-use-formatting-code').val() == 1) {
            text = EchoLiveTools.formattingCodeToMessage(text, {
                images: selectedImageData
            });
        }
    
        if ($('#ptext-chk-quote').val() == 1) {
            let before = $('#ptext-ipt-quote-before').val(),
                after  = $('#ptext-ipt-quote-after').val();
    
            if (typeof text == 'string' || typeof text == 'number') {
                text = before + text + after;
            } else {
                if (Array.isArray(text)) {
                    text = [before, ...text, after];
                } else if (typeof text == 'object') {
                    text = [before, text, after];
                } else {
                    throw 'Message Packaging Exception'
                }
            }
        }

        return text;
    }

    let d;

    if ($('#ptext-chk-split-message').val() == 1) {
        let msgs = [];
        const txt2 = txt.split('\n');
        txt2.forEach(e => {
            const txt3 = __messagePackage(e);
            msgs.push({
                message: txt3
            });
        });
        d = {
            username: username,
            messages: msgs
        }
    } else {
        txt = __messagePackage(txt);
        d = {
            username: username,
            messages: [
                {
                    message: txt
                }
            ]
        }
    }

    if ($('#ptext-chk-more').val() == 1) {
        let printSpeedValue = Number($('#ptext-ipt-print-speed').val());
        if (Number.isNaN(printSpeedValue)) printSpeedValue = config.echo.print_speed;
        if (printSpeedValue < 4) printSpeedValue = config.echo.print_speed;
        d.messages.forEach(e => {
            e.data = {
                ...d.messages[0].data,
                ...{printSpeed: printSpeedValue}
            };
        });
    }

    return d;
}

// 纯文本提交
$('#ptext-btn-submit').click(function() {
    let d = ptextSubmit();

    $('#output-content').val(getOutputBefore() + JSON.stringify(d, null, 4) + getOutputAfter());
    $('#tabpage-nav-output, #tabpage-nav-output-content').click();
    $('#output-content').focus();
    $('#output-content').select();
});

// 纯文本发送
$('#ptext-btn-send').click(function() {
    let d = ptextSubmit();

    elb.sendData(d);
    sendHistoryMessage(d);

    let text = EchoLiveTools.getMessageSendLog(d.messages[0].message, d.username);
    let textArray = [...text];
    if (textArray.length > 128) {
        text = textArray.splice(0, 128).join('');
        text += '...'
    }

    editorLogT(
        'editor.log.message.sent',
        {
            msg: text
        }
    );

    if($('#ptext-chk-sent-clear').val() == 1) {
        $('#ptext-content').val('');
        const template = String($('#ptext-sent-clear-content').val() || '');
        const content = template.replace(/{{\|}}/g, '');
        let cursor = template.search('{{|}}');
        if (cursor < 0) cursor = content.length;
        $('#ptext-content').val(content);
        $('#ptext-content').focus();
        $('#ptext-content').get(0).setSelectionRange(cursor, cursor);
    } else {
        $('#ptext-content').focus();
    }

    echoLiveSystem.device.vibrateAuto('success');
});

// 输出页发送
$('#output-btn-send').click(function() {
    let before      = getOutputBefore(),
        after       = getOutputAfter(),
        centent     = $('#output-content').val(),
        beforeCheck = centent.substring(0, before.length) == before,
        afterCheck  = centent.substring(centent.length - after.length, centent.length) == after,
        newCentent  = '';
    
    if (centent.length == 0) {
        editorLogT('editor.log.message.empty', {}, 'erro');
        echoLiveSystem.device.vibrateAuto('error');
        return;
    }
    
    newCentent = centent;

    if (beforeCheck) newCentent = newCentent.substring(before.length)
    if (afterCheck) newCentent = newCentent.substring(0, newCentent.length - after.length);
    

    let msg;

    try {
        msg = JSON.parse(newCentent);
        if (msg?.messages == undefined && msg?.username == undefined) {
            editorLogT('editor.log.message.empty_data', {}, 'erro');
            echoLiveSystem.device.vibrateAuto('error');
            return;
        }
        elb.sendData(msg);
        echoLiveSystem.device.vibrateAuto('success');
    } catch (_) {
        if (centent === '/cmd') {
            if ($('#commander-input-panel').hasClass('hide')) {
                $('#commander-input-panel').removeClass('hide');
                $('#commander-input').focus();
            } else {
                $('#commander-input-panel').addClass('hide');
                $('#commander-input').blur();
            }
        } else {
            editorLogT('editor.log.message.illegal', {}, 'erro');
            echoLiveSystem.device.vibrateAuto('error');
        }
        return;
    }

    if (msg.messages == undefined) {
        editorLogT('editor.log.message.empty_messages', {}, 'warn');
        echoLiveSystem.device.vibrateAuto('error');
        return;
    }

    if (!Array.isArray(msg.messages) || msg.messages.length < 1) return;

    if (msg.messages.length > 1) {
        editorLogT('editor.log.message.sent_custom_multi', { msg: EchoLiveTools.getMessageSendLog(msg.messages[0].message, msg.username), n: msg.messages.length });
    } else {
        editorLogT('editor.log.message.sent_custom', { msg: EchoLiveTools.getMessageSendLog(msg.messages[0].message, msg.username) });
    }

    sendHistoryMessage(msg);
});



function ptextChkUseFormattingCodeChange(e) {
    if (e == 1) {
        $('.tabpage-panel[data-pageid="ptext"] .editor-controller').removeClass('disabled');
    } else {
        $('.tabpage-panel[data-pageid="ptext"] .editor-controller').addClass('disabled');
    }
}


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




function sendHistoryMessage(data) {
    let username = data.username;
    let message = $t('message_preview.undefined_message');
    if (Array.isArray(data.messages) && data.messages.length > 0) {
        message = EchoLiveTools.getMessagePlainText(data.messages[0].message)
    }
    let time = EchoLiveTools.formatDate();
    if (message == '') message = $t('message_preview.empty_message');
    if (username == undefined || username == '') username = $t('message_preview.empty_username');

    let l = history.push({
        data: data,
        time: time
    });
    $('#history-message-list').prepend(HistoryMessage.item(message, username, time, data.messages.length, l - 1));

    // 防止历史记录过多
    if (config.editor.function.history_maximum >= 0 && history.length > config.editor.function.history_maximum) {
        history.fill(undefined, historyMinimum, history.length - config.editor.function.history_maximum);
        historyMinimum = history.length - config.editor.function.history_maximum;
        $(`#history-message-list .history-message-item:gt(${config.editor.function.history_maximum - 1})`).remove();
    }

    // 防止底部游标过高
    if (config.advanced.editor.history_minimum_breaker_threshold >= 0 && historyMinimum >= config.advanced.editor.history_minimum_breaker_threshold) {
        history = history.splice(historyMinimum);
        let $list = $('#history-message-list .history-message-item');
        for (let i = 0; i < $list.length; i++) {
            const e = $list.eq(i);
            let di = e.find('button').data('index');
            e.find('button').data('index', di - historyMinimum);
        }
        historyMinimum = 0;
    }
}


// 编辑器控制器点击
$(document).on('click', '.editor-format-btn', function() {
    let editorID = $(this).data('editorid'),
        value = $(this).data('value');
    
    const format = {
        bold:               '@b',
        italic:             '@i',
        underline:          '@u',
        strikethrough:      '@s',
        font_size_increase: '@+',
        font_size_decrease: '@-',
        clear:              '@r'
    };

    let forceRepeatBefore = false;

    if (value == 'font_size_increase' || value == 'font_size_decrease') forceRepeatBefore = true;
    
    if (value == 'clear') {
        insertTextAtCursor(editorID, format.clear, '', false, false, false, true, function(e) {
            return e.replace(/(?<!\\)@(\[#[0-9a-fA-F]{3,8}\]|\{.*?\}|\S)/g, '');
        });
    } else if (value == 'color') {
        popupsDisplay('#popups-palette');
        popupsMoveToElement('#popups-palette', '.editor-controller button[data-value="color"]');
        $('#popups-palette-select').focus();
    } else if (value == 'emoji') {
        popupsDisplay('#popups-emoji');
        popupsMoveToElement('#popups-emoji', '.editor-controller button[data-value="emoji"]');
        $('#popups-emoji-select').focus();
    } else if (value == 'image') {
        popupsDisplay('#popups-image');
        popupsMoveToElement('#popups-image', '.editor-controller button[data-value="image"]');
        $('#popups-image-nav .tabpage-nav-item[aria-selected="true"]').focus();
    } else {
        insertTextAtCursor(editorID, format[value], format.clear, false, forceRepeatBefore);
    }
});

// 拾色器色块点击
$(document).on('click', '#popups-palette .color-box:not(.color-box-custom-class)', function() {
    let value = $(this).data('value');
    insertTextAtCursor('ptext-content', `@[${ value }]`, '@r');
    popupsDisplay('#popups-palette', false);
});

$(document).on('click', '#popups-palette .color-box-custom-class', function() {
    let value = $(this).data('value');
    insertTextAtCursor('ptext-content', `@<${ value }>`, '@r');
    popupsDisplay('#popups-palette', false);
});

// 表情包点击
$(document).on('click', '#popups-emoji .emoji-box', function(event) {
    let value = $(this).data('value');
    let str = `@{${ value }}`;
    if ($(this).hasClass('is-true-emoji')) str = value;
    // TODO: 这个问题暂时搞不定
    insertTextAtCursorForObject({
        id: 'ptext-content',
        text: str,
        forceRepeatBefore: true
    });
    popupsDisplay('#popups-emoji', false);
});

// 纯文本编辑器字数统计
$(document).on('input', '#ptext-content', function() {
    let length  = [...$(this).val()].length;

    $('#ptext-editor .editor-bottom-bar .length').text($t('editor.form.text_length', { n: length }));
});
$(document).on('change', '#ptext-content', function() {
    let length  = [...$(this).val()].length;

    $('#ptext-editor .editor-bottom-bar .length').text($t('editor.form.text_length', { n: length }));
});

// 历史记录编辑
$(document).on('click', '.history-message-item-btn-edit', function() {
    let i = $(this).data('index');

    $('#output-content').val(JSON.stringify(history[i].data, null, 4));
    $('#tabpage-nav-output, #tabpage-nav-output-content').click();
    $('#output-content').focus();
    $('#output-content').select();
});

// 历史记录发送
$(document).on('click', '.history-message-item-btn-send', function() {
    let i = $(this).data('index');
    let $item = $(this).parents('.history-message-item').eq(0);

    $item.find('.sent').text(HistoryMessage.sentAt(EchoLiveTools.formatDate()));
    $item.find('.sent').removeClass('hide');

    if (config.editor.function.history_resend_bubble) $('#history-message-list').prepend($item);
    
    elb.sendData(history[i].data);
    echoLiveSystem.device.vibrateAuto('success');
    editorLogT('editor.log.message.resent');
});

// 历史页清空
$(document).on('click', '#history-btn-clear', function() {
    if (historyClearConfirm) {
        historyClearConfirm = false;
        history = [];
        historyMinimum = 0;
        $('#history-message-list').html('');
        $('#history-editor-controller').html(
            FHUIComponentButton.button(
                $t('editor.history.clear'),
                {
                    id: 'history-btn-clear',
                    type: 'ghost',
                    color: 'danger',
                    size: 'big',
                    icon: 'material:delete',
                }
            )
        );
        $('#history-btn-clear').focus();
    } else {
        historyClearConfirm = true;
        $('#history-editor-controller').html(
            FHUIComponentButton.button(
                $t('ui.cancel'),
                {
                    id: 'history-btn-clear-cancel',
                    size: 'big',
                    icon: 'material:close',
                }
            ) +
            FHUIComponentButton.button(
                $t('editor.history.clear_confirm'),
                {
                    id: 'history-btn-clear',
                    color: 'danger',
                    size: 'big',
                    icon: 'material:check',
                }
            )
        );
        $('#history-btn-clear-cancel').focus();
    }
});

// 历史页取消清空
$(document).on('click', '#history-btn-clear-cancel', function() {
    historyClearConfirm = false;
    $('#history-editor-controller').html(
        FHUIComponentButton.button(
            $t('editor.history.clear'),
            {
                id: 'history-btn-clear',
                type: 'ghost',
                color: 'danger',
                size: 'big',
                icon: 'material:delete',
            }
        )
    );
    $('#history-btn-clear').focus();
});

// 仪表盘点击
$(document).on('click', '.echo-live-client-state-block', function(event) {
    const name = $(this).data('name');
    if (name == '') return;
    const r = elb.clients.filter((e) => {
        return e.name == name;
    })[0];
    if (r.messagesCount > 0 && !r.hidden) {
        if (name.search(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i) == 0) {
            elb.sendNext(name);
        } else {
            elb.sendNext('@' + name);
        }
        editorLogT('editor.log.broadcast.echo_next_from_self_to_target', { name: name });
        echoLiveSystem.device.vibrateAuto('success');
    }
});

// 仪表盘右键
$(document).on('contextmenu', '.echo-live-client-state-block', function(event) {
    event.preventDefault();
    const name = $(this).data('name');
    const target = $(this).data('target');
    if (name === '') {
        if (!clientTargetButNoClient) {
            sysNotice.sendT('notice.client_target_but_no_client', {}, 'trophy');
            clientTargetButNoClient = true;
        }
        return;
    }

    const next = {
        'none': 'yes',
        'yes': 'not',
        'not': 'none'
    }
    let value = next[target];
    if (value === undefined) value = 'none';
    elb.setClientTarget(name, value);
    editorLogT('editor.log.message.target.' + value, { name: name });
    if (value === 'none') {
        echoLiveSystem.device.vibrateAuto('switch_off');
    } else {
        echoLiveSystem.device.vibrateAuto('switch_on');
    }
});

$('#ptext-character').keydown(function(e) {
    if (e.code === 'Enter') {
        e.preventDefault();
        $('#ptext-content').focus();
        $('#ptext-content').select();
    }
});

// 纯文本 - 内容 - 快捷键
$('#ptext-content').keydown(function(e) {
    // console.log(e.code);
    if (e.code === 'Enter') {
        if (
            (!config.accessibility.send_on_enter && e.ctrlKey)
            || (config.accessibility.send_on_enter && !e.ctrlKey)
        ) {
            e.preventDefault();
            if (!config.echolive.broadcast.enable) return;
            $('#ptext-btn-send').click();
            effectClick('#ptext-btn-send');
            if ($('#workspace-editor-base').hasClass('webscreen')) {
                $('.webscreen-message-sent-effect').addClass('show');
            }
        } else if (config.accessibility.send_on_enter) {
            e.preventDefault();
            insertNewline(this);
        }
    } else if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
    } else if (e.ctrlKey) {
        let code = {
            'KeyB':         'bold',
            'KeyI':         'italic',
            'KeyU':         'underline',
            'KeyD':         'strikethrough',
            'KeyC':         'color',
            'KeyE':         'emoji',
            'ArrowUp':      'font_size_increase',
            'ArrowDown':    'font_size_decrease',
            'Space':        'clear'
        };
        if (code[e.code] === undefined) return;
        if (e.code === 'Space' && !e.shiftKey) return;
        if (e.code === 'KeyC' && !e.shiftKey) return;
        if (e.code == 'KeyI' && e.shiftKey) {
            e.preventDefault();
            $(`#ptext-editor .editor-controller:not(.disabled) button[data-value="image"]`).click();
            return;
        }

        e.preventDefault();
        $(`#ptext-editor .editor-controller:not(.disabled) button[data-value="${code[e.code]}"]`).click();
    }
})

$('#ptext-btn-open-document-pip').click(async function() {
    $('#ptext-btn-open-document-pip').prop('disabled', true);

    // 打开 PiP 窗口
    const pipWindow = await documentPictureInPicture.requestWindow({
        width: 500,
        height: 600
    });

    pipWindow.document.documentElement.style.margin = "0";
    pipWindow.document.documentElement.style.padding = "0";
    pipWindow.document.body.style.margin = "0";
    pipWindow.document.body.style.padding = "0";
    pipWindow.document.body.style.overflow = "hidden";

    const iframe = pipWindow.document.createElement('iframe');
    iframe.src = location.href.split('?')[0] + '?pip=1';
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    pipWindow.document.body.appendChild(iframe);

    // 可以在 PiP 窗口关闭时执行一些回调
    pipWindow.addEventListener("unload", () => {
        $('#ptext-btn-open-document-pip').prop('disabled', false);
    });
});

$(document).on('animationend', '.webscreen-message-sent-effect', function() {
    $(this).removeClass('show');
});




let commanderInit = false;

$(document).keydown(function(e) {
    if (e.code === 'Slash' && e.ctrlKey) {
        if ($('#commander-input-panel').hasClass('hide')) {
            $('#commander-input-panel').removeClass('hide');
            $('#commander-input').focus();
            if (!commanderInit) {
                commanderInit = true;
                sysNotice.sendT('notice.commander_tips', {}, 'tips', {}, (e, unit) => {
                    if (e !== 'click') return;
                    window.open('https://sheep-realms.github.io/Echo-Live-Doc/dev/command/', '_blank');
                    unit.close();
                });
            }
        } else {
            $('#commander-input-panel').addClass('hide');
            $('#commander-input').blur();
        }
    }
});

function commanderRun() {
    let cmd = $('#commander-input').val();
    let r;
    let commanderFnModeChange = false;
    if ((commanderFnMode && cmd === '//') || (!commanderFnMode && cmd.substring(0, 2) === '//')) {
        commanderFnMode = !commanderFnMode;
        commanderFnModeChange = true;
    }

    if (commanderFnModeChange) {
        if (commanderFnMode) {
            $('#commander-input-panel').addClass('function-mode');
            cmd = cmd.split('\n');
            if (cmd.length <= 1) return $('#commander-input').val('');
        } else {
            $('#commander-input-panel').removeClass('function-mode');
            return $('#commander-input').val('');
        }
    }

    if (!commanderFnMode) {
        commander.consoleRun(cmd);
    } else {
        r = commander.fn(cmd);
        logMessager.send($t(
            r.state.fail > 0 ? 'command.common.success.function_has_fail' : 'command.common.success.function',
            {
                n: r.state.count,
                success: r.state.success,
                fail: r.state.fail
            }
        ));
        if (r.state.fail > 0) {
            r.log.fail.forEach(e => {
                logMessager.send($t(
                    'command.common.success.function_fail_item',
                    {
                        line: e.line,
                        reason: e.reason
                    }
                ));
            });
        }
    }
    $('#commander-input').val('');
}

function commanderEnter() {
    insertTextAtCursor('commander-input', '\n', '', false, true, false, false, () => '');
}

$('#commander-input').keydown(function(e) {
    if (e.code === 'Enter') {
        e.preventDefault();
        if (commanderFnMode ? !e.ctrlKey : e.ctrlKey) {
            commanderEnter();
        } else {
            commanderRun();
        }
    } else if (e.code === 'Escape') {
        e.preventDefault();
        $('#commander-input-panel').addClass('hide');
        $('#commander-input').blur();
        $('#commander-input').val('');
    }
    commanderInputHeightCheck();
});

$(document).on('input', '#commander-input', commanderInputHeightCheck);

function commanderInputHeightCheck() {
    $('#commander-input-panel').css('height', 'inherit');
    $('#commander-input').css('height', 'auto');
    const scrollHeight = $('#commander-input').prop('scrollHeight');
    $('#commander-input').css('height', scrollHeight + 'px');
    $('#commander-input-panel').css('height', scrollHeight + 'px');
}

$(document).on('click', '#link-open-settings', function(e) {
    if (inOBS) {
        e.preventDefault();
        sysNotice.sendT('notice.open_settings_in_obs');
    }
});

function insertNewline(el) {
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const value = el.value;
    el.value            = value.substring(0, start) + "\n" + value.substring(end);
    el.selectionStart   = el.selectionEnd = start + 1;
    const div   = document.createElement("div");
    const style = getComputedStyle(el);

    [
        "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordWrap",
        "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderTopWidth", "borderBottomWidth",
        "boxSizing", "lineHeight", "whiteSpace"
    ].forEach(k => div.style[k] = style[k]);

    div.style.position      = "absolute";
    div.style.visibility    = "hidden";
    div.style.whiteSpace    = "pre-wrap";
    div.style.width         = style.width;
    div.style.height        = "auto";

    const before = el.value.substring(0, el.selectionStart);
    const after = el.value.substring(el.selectionStart);

    div.textContent         = before;
    const marker            = document.createElement("span");
    marker.textContent      = "●";
    div.appendChild(marker);
    const rest              = document.createTextNode(after);
    div.appendChild(rest);
    document.body.appendChild(div);
    const markerTop         = marker.offsetTop;
    const targetScrollTop   = markerTop - 4;
    el.scrollTop            = targetScrollTop;
    document.body.removeChild(div);
}




// 彩蛋
function getDateNumber() {
    let d = new Date();
    return `${String(d.getMonth() + 1).padStart(2, 0)}${String(d.getDate()).padStart(2, 0)}`;
}

function checkNowDate() {
    let d = new Date();
    let dn = getDateNumber();
    editorLogT('editor.log.welcome', {}, 'tips');
    editorLog(`Language: ${ $t('lang.title') } (ISO 639-3: ${ $t('lang.code_iso_639_3') }, IETF: ${ $t('lang.code_ietf') })`, 'dbug');
    let msg = {
        '0101': `${d.getFullYear()} 年来了！感谢您一直以来对 Echo-Live 的支持！`,
        '0229': '你知道吗：今年是闰年。',
        '0401': [
            '想给你的消息加点料吗？不如试试这个：https://sheep-realms.github.io/Abuser/',
            '近日电信诈骗频发，提高反诈意识你我在行动。邀您阅读反诈指南：https://sheep-realms.github.io/Anti-Fraud-Guidelines/'
        ],
        '0721': 'Ciallo～(∠·ω< )⌒★',
        '0914': '2023 年的今天，Echo Live 诞生了！',
        '1231': '哇哦，今年只剩下最后一天了，您要和我一起跨年吗？'
    }

    if (msg[dn] != undefined) {
        if (Array.isArray(msg[dn])) {
            editorLog(msg[dn][Math.floor(Math.random() * msg[dn].length)], 'tips');
        } else {
            editorLog(msg[dn], 'tips');
        }
    }
}



$(window).resize(function() {
    if (inOBS && devicePixelRatioChanged === 0 && initDevicePixelRatio != window.devicePixelRatio) {
        devicePixelRatioChanged = 1;
        sysNotice.sendT('notice.browser_zoom', {}, 'tips');
    } else if (devicePixelRatioChanged === 1 && initDevicePixelRatio == window.devicePixelRatio) {
        devicePixelRatioChanged = -1;
        sysNotice.sendTHasTitle('notice.browser_zoom_reset', {}, 'trophy');
    }
});

// let keyboardOpen = false;

// function adjustForKeyboard() {
//     const keyboardOffset = window.innerHeight - window.visualViewport.height * window.visualViewport.scale;
//     if (!keyboardOpen && keyboardOffset > 128) {
//         keyboardOpen = true;
//         sysNotice.send('keyboard_open');
//     } else if (keyboardOpen && keyboardOffset <= 128 - 8) {
//         keyboardOpen = false;
//         sysNotice.send('keyboard_close');
//     }
// }

// window.visualViewport.addEventListener('resize', adjustForKeyboard);