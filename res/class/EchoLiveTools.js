class EchoLiveTools {
    constructor() {}

    /**
     * 生成 UUID
     * @returns {String} UUID
     */
    static getUUID() {
        let timestamp = new Date().getTime();
        let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let random = Math.random() * 16;
            if (timestamp > 0) {
                random = (timestamp + random) % 16 | 0;
                timestamp = Math.floor(timestamp / 16);
            } else {
                random = (perforNow + random) % 16 | 0;
                perforNow = Math.floor(perforNow / 16);
            }
            return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
        });
    }

    /**
     * 解析段落格式样式
     * @param {Object} data 单一段落格式
     * @returns {Object} 类与样式
     */
    static messageStyleGenerator(data) {
        let cls = '';
        if (data?.class) {
            cls = data.class + ' ';
        }
        let style = '';
        if (data?.typewrite) cls += 'echo-text-typewrite '
        if (data?.style) {
            if (data.style?.color) style += `color: ${data.style.color}; --echo-span-color: ${data.style.color}; `;
            if (data.style?.bold && data.style?.weight == undefined) cls += 'echo-text-bold '
            if (data.style?.italic) cls += 'echo-text-italic '
            if (data.style?.underline) cls += 'echo-text-underline '
            if (data.style?.strikethrough) cls += 'echo-text-strikethrough '
            if (data.style?.size) cls += 'echo-text-size-' + data.style.size + ' '
            if (data.style?.weight) cls += 'echo-text-weight-' + data.style.weight + ' '
            if (data.style?.stretch) cls += 'echo-text-stretch-' + data.style.stretch + ' '
            if (data.style?.rock) cls += 'echo-text-rock-' + data.style.rock + ' '
            if (data.style?.style) style += data.style.style;
        }

        return {
            class: cls,
            style: style
        }
    }

    /**
     * 获取段落格式纯文本内容
     * @param {String|Object|Array<Object>} message 段落格式
     * @returns {String} 纯文本内容
     */
    static getMessagePlainText(message) {
        if (typeof message == 'string') return message;
        if (typeof message == 'object' && !Array.isArray(message)) return message?.text;
        if (!Array.isArray(message)) return;

        let str = '';
        message.forEach(e => {
            if (typeof e == 'string') {
                str += e;
            } else {
                str += e.text;
            }
        });

        return str;
    }

    /**
     * 获取发送消息时的日志格式
     * @param {String|Object|Array<Object>} message 段落格式
     * @param {String} username 说话人
     * @returns {String} 日志输出格式
     */
    static getMessageSendLog(message, username = '') {
        if (typeof message != 'string') message = EchoLiveTools.getMessagePlainText(message);
        if (message == '') message = '<i>[空消息]</i>';
        if (username == '') username = '<i>[未指定说话人]</i>';

        return `<${username}> ${message}`;
    }

    /**
     * 快速格式化代码转换成段落格式
     * @param {String} text 文本
     * @returns {String|Object|Array<Object>} 段落格式
     */
    static formattingCodeToMessage(text) {
        let message = [];

        function msgPush(msg = '', style = undefined) {
            msg = msg.replace(/{{{sheep-realms:at}}}/g, '@');
            if (style == undefined) return message.push(msg);
            return message.push({
                text: msg,
                style: style
            });
        }

        let replaced = text;
        replaced = replaced.replace(/\\@/g, '{{{sheep-realms:at}}}');
        replaced = replaced.replace(/@(\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\]|.?)/g, '{{{sheep-realms:split}}}@$1{{{sheep-realms:format}}}');

        let arrayMsg = replaced.split('{{{sheep-realms:split}}}');

        for (let i = 0; i < arrayMsg.length; i++) {
            arrayMsg[i] = arrayMsg[i].split('{{{sheep-realms:format}}}');
        }

        let styleCache = {};

        for (let i = 0; i < arrayMsg.length; i++) {
            const e = arrayMsg[i];
            if (e.length < 2) {
                if (e[0] != '') msgPush(e[0]);
                continue;
            }

            let style = {};
            switch (e[0]) {
                case '@b':
                    style.bold = true
                    break;

                case '@i':
                    style.italic = true
                    break;

                case '@u':
                    style.underline = true
                    break;

                case '@s':
                    style.strikethrough = true
                    break;

                case '@r':
                    styleCache = {};
                    if (e[1] != '') msgPush(e[1]);
                    continue;
            
                default:
                    if (e[0].search(/^@\[.*\]$/g) != -1) {
                        style.color = e[0].substring(2, e[0].length - 1);
                        break;
                    } else {
                        msgPush(e[0] + e[1]);
                        continue;
                    }
            }
            styleCache = {...styleCache, ...style};

            if (e[1] != '') {
                style = {...styleCache, ...style};
                msgPush(e[1], style);
            }
        }

        if (message.length == 1) return message[0];
        return message;
    }
}