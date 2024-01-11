// 字段列表构造器
class EditorTextList {
    constructor() {}

    /**
     * 项目
     * @param {Number} index 索引编号
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getItem(index, value) {
        return `
        <div class="editor-text-list-item" data-index="${index}">
            <span class="index">${index + 1}.</span>
            <span class="text">${value.text}</span>
            <span class="btn">
                <button class="fh-button fh-small" data-index="${index}">编辑</button>
                <button class="fh-button fh-small fh-danger" data-index="${index}">删除</button>
            </span>
        </div>`;
    }

    /**
     * 列表
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getList(value) {
        let dom = '';
        for (let i = 0; i < value.length; i++) {
            dom += this.getItem(i, value[i]);
        }
        return dom;
    }
}

// 表单构造器
class EditorForm {
    constructor() {}

    /**
     * 提示
     * @param {String} label 标签名称
     * @returns {String} DOM
     */
    static tip(label) {
        return `<div class="abuser-from-checkbox-list"><span class="abuser-from-input-tip">${label}</span></div>`
    }

    /**
     * 表单项目
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} content 内容
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static item(id, label, content, tip = '') {
        return `<div class="abuser-from-row"><label for="${id}">${label}</label>${content}</div>${tip != '' ? FormConstructor.tip(tip) : ''}`;
    }

    /**
     * 输入框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @param {String} type 类型
     * @returns {String} DOM
     */
    static input(id, label, def, tip = '', type = 'text') {
        return FormConstructor.item(
            id,
            label,
            `<input type="${type}" name="${id}" id="${id}" class=" abuser-form-item" value="${def}" data-default="${def}">`,
            tip
        );
    }

    /**
     * 数字输入框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static inputNum(id, label, def, tip = '') {
        return FormConstructor.input(id, label, def, tip, 'number');
    }

    /**
     * 复选框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static checkbox(id, label, def, tip = '') {
        return FormConstructor.item(
            id,
            '',
            `<button role="checkbox" aria-selected="${def}" class="checkbox ${def == 1 ? 'selected' : ''}">
                <span class="icon"></span>
                <span class="text">${label}</span>
                <input type="hidden" name="${id}" id="${id}" value="${def}" data-default="${def}">
            </button>`,
            tip
        );
    }
}

// 客户端状态仪表构造器
class EditorClientState {
    constructor() {}

    static block(type, title = '') {
        return `<div class="echo-live-client-state-block state-${type}" title="${title}"></div>`
    }

    static clientBlock(client) {
        if (client.hidden) {
            return EditorClientState.block('sleep', '休眠');
        } else {
            return EditorClientState.block('active', '激活');
        }
    }

    static clientList(clients) {
        if (clients.length == 0) return EditorClientState.block('none');
        let dom = '';
        clients.forEach(e => {
            dom += EditorClientState.clientBlock(e);
        });
        return dom;
    }

    static statePanel(clients) {
        return `<div class="echo-live-client-state-panel">${EditorClientState.clientList(clients)}</div>`;
    }
}

class HistoryMessage {
    constructor() {}

    static sentBy(time) {
        return `（于 ${time} 再次发送）`;
    }

    static item(message, username, time, length, index) {
        return `<div class="history-message-item">
            <div class="content">
                <div class="username">${username}</div>
                <div class="message">${message}</div>
                ${ length > 1 ? `<div class="length">... 等 ${length} 条消息</div>` : ''}
                <div class="time">
                    <span class="created">${time}</span>
                    <span class="sent hide">${HistoryMessage.sentBy(time)}</span>
                </div>
            </div>
            <div class="action">
                <button class="history-message-item-btn-edit fh-button fh-ghost fh-icon-button" data-index="${index}">
                    ${Icon.pencil()}
                    <span>编辑</span>
                </button>
                <button class="history-message-item-btn-send fh-button fh-ghost fh-icon-button" data-index="${index}">
                    ${Icon.send()}
                    <span>发送</span>
                </button>
            </div>
        </div>`;
    }
}