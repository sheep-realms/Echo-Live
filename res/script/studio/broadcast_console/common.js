/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */

"use strict";

let chatSession = new ChatSession();
let sysNotice = new SystemNotice();

let elb;

$(document).ready(function() {
    translator.ready(() => {
        $('#chat-wrapper').html(ChatUI.chatView('chat-view', $('#chat-wrapper').html()));
        elb = new EchoLiveBroadcastServer(config.echolive.broadcast.channel, config);
        elb.on('message', getMessage);
    });
});

function getMessage(data) {
    switch (data.action) {
        case 'message_data':
            loadMessage(data);
            break;
            
        case 'hello':
            // TODO
            break;

        case 'ping':
            // TODO
            break;

        default:
            break;
    }
}

function loadMessage(message) {
    const data = chatSession.addMessage(message);
    console.log(data);
    if (data.canMerge) $(`#chat-view .chat-message-item[data-index="${ data.lastIndex }"]`).addClass('merge-after');
    EchoLiveTools.withAutoScroll('#chat-view', (_, done) => {
        $('#chat-view').append(ChatUI.messageItem(data));
        done();
    })
}