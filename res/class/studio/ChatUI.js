class ChatUI {
    constructor() {}

    static chatView(id, content = '', attributes) {
        return FHUI.element(
            'ul',
            {
                ...attributes,
                class: [
                    'fh-chat-ui-view'
                ],
                id
            },
            content
        );
    }

    static messageItem(chatData = {}) {
        let expandClass = [];
        if (chatData.canMerge) expandClass = ['merge-before']
        return FHUI.element(
            'li',
            {
                class: [
                    'chat-message-item',
                    ...expandClass
                ],
                data: {
                    index: chatData.data.index
                },
                aria: {
                    posinset: chatData.data.index + 1,
                    setsize: -1
                }
            },
            ChatUI.messageItemAvatar(chatData) + ChatUI.messageItemBody(chatData)
        )
    }

    static messageItemAvatar(chatData = {}) {
        return FHUI.element(
            'div',
            {
                class: 'avatar',
                aria: {
                    hidden: true
                }
            },
            FHUI.element(
                'div',
                {
                    class: 'avatar-icon'
                },
                Icon.getIcon(chatData.data.payload?.from?.expand?.icon, 'material:account')
            )
        );
    }

    static messageItemBody(chatData = {}) {
        return FHUI.element(
            'div',
            {
                class: 'chat-message-item-body'
            },
            ChatUI.messageItemUsername(chatData) +
            ChatUI.messageItemContent(chatData) +
            ChatUI.messageItemFrom(chatData)
        );
    }

    static messageItemUsername(chatData = {}) {
        let username = chatData.data.payload?.data?.username;
        if (username === '') username = $t( 'message_preview.empty_username' );
        return FHUI.element(
            'div',
            {
                class: 'username'
            },
            FHUI.element(
                'div',
                {
                    class: 'username-content'
                },
                EchoLiveTools.safeHTML(username)
            )
        );
    }

    static messageItemContent(chatData = {}) {
        let messageContent = EchoLiveTools.getMessagePlainText(chatData.data.payload.data?.messages[0]?.message);
        if (messageContent === '') messageContent = $t( 'message_preview.empty_message' );
        return FHUI.element(
            'div',
            {
                class: 'content'
            },
            FHUI.element(
                'div',
                {
                    class: 'message'
                },
                FHUI.element(
                    'div',
                    {
                        class: 'message-content'
                    },
                    EchoLiveTools.safeHTML(messageContent)
                )
            ) + FHUI.element(
                'div',
                {
                    class: 'time'
                },
                FHUI.element(
                    'div',
                    {
                        class: 'time-content'
                    },
                    EchoLiveTools.formatDate(chatData.data.created_at, 'time_non_sec')
                )
            )
        );
    }

    static messageItemFrom(chatData = {}) {
        let content = chatData.data.payload.from.uuid;
        if (chatData.data.payload.from.name !== chatData.data.payload.from.uuid) {
            content += ' · ' + chatData.data.payload.from.name;
        }
        return FHUI.element(
            'div',
            {
                class: 'from',
                aria: {
                    hidden: true
                }
            },
            EchoLiveTools.safeHTML(content)
        );
    }
}