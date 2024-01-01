class EchoLiveTools {
    constructor() {}

    static messageStyleGenerator(data) {
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

    static getMessagePlainText(message) {
        if (typeof message == 'string') return message;
        if (typeof message == 'object' && !Array.isArray(message)) return message?.text;
        if (!Array.isArray(message)) return;

        let str = '';
        message.forEach(e => {
            str += e.text;
        });

        return str;
    }

    static getMessageSendLog(message, username = '') {
        if (typeof message != 'string') message = EchoLiveTools.getMessagePlainText(message);
        if (message == '') message = '<i>[空消息]</i>';
        if (username == '') username = '<i>[未指定说话人]</i>';

        return `<${username}> ${message}`;
    }
}