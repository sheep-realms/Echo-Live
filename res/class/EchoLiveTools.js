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
                random      = (timestamp + random) % 16 | 0;
                timestamp   = Math.floor(timestamp / 16);
            } else {
                random      = (perforNow + random) % 16 | 0;
                perforNow   = Math.floor(perforNow / 16);
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
            if (data.style?.color)              style   += `color: ${data.style.color}; --echo-span-color: ${data.style.color}; `;
            if (data.style?.backgroundColor)    style   += `background-color: ${data.style.backgroundColor}; `;
            if (data.style?.bold && data.style?.weight == undefined) 
                                                cls     += 'echo-text-bold ';
            if (data.style?.italic)             cls     += 'echo-text-italic ';
            if (data.style?.underline)          cls     += 'echo-text-underline ';
            if (data.style?.strikethrough)      cls     += 'echo-text-strikethrough ';
            if (data.style?.size)               cls     += 'echo-text-size-'            + data.style.size           + ' ';
            if (data.style?.weight)             cls     += 'echo-text-weight-'          + data.style.weight         + ' ';
            if (data.style?.stretch)            cls     += 'echo-text-stretch-'         + data.style.stretch        + ' ';
            if (data.style?.letterSpacing)      cls     += 'echo-text-letter-spacing-'  + data.style.letterSpacing  + ' ';
            if (data.style?.emphasis)           cls     += 'echo-text-emphasis';
            if (data.style?.rock)               cls     += 'echo-text-rock-'            + data.style.rock           + ' ';
            if (data.style?.style)              style   += data.style.style;
        }

        return {
            class: cls,
            style: style
        }
    }

    /**
     * 获取段落格式纯文本内容
     * @param {String|Object|Array<Object>} message 段落格式
     * @param {Boolean} HTMLFilter 是否启用 HTML 过滤器
     * @param {Boolean} noEmoji 是否禁用表情符号
     * @param {RegExp} regFilter 过滤正则表达式
     * @returns {String} 纯文本内容
     */
    static getMessagePlainText(message, HTMLFilter = false, noEmoji = false, regFilter = undefined) {
        let str = '';

        if (typeof message == 'object' && message?.message != undefined) message = message.message;
        if (typeof message == 'string') {
            str = message;
            if (HTMLFilter) str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/  /g, '&nbsp; ').replace(/\n/g, '<br>');
            if (noEmoji)    str = str.replace(/\p{Emoji}/gu, '');
            if (regFilter instanceof RegExp) str = str.replace(regFilter, '');
            return str;
        }
        if (typeof message == 'object' && !Array.isArray(message)) message = [message];
        if (!Array.isArray(message)) return;

        message.forEach(e => {
            if (typeof e == 'string') {
                str += e;
            } else {
                if (e?.data?.image != undefined) {
                    str += ` [${ $t('file.picker.image') }] `;
                }
                if (e?.data?.emoji != undefined && !noEmoji) {
                    try {
                        typeof emojiHako;
                        let emoji = emojiHako.getEmoji(e.data.emoji);
                        str += ` [${ $t( 'emoji.' + emoji?.title_i18n ) }] `;
                    } catch (error) {
                        str += ` [${ e.data.emoji }] `;
                    }
                }
                str += e.text;
            }
        });

        if (HTMLFilter) str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/  /g, '&nbsp; ').replace(/\n/g, '<br>');
        if (noEmoji)    str = str.replace(/\p{Emoji}/gu, '');
        if (regFilter instanceof RegExp) str = str.replace(regFilter, '');

        return str;
    }

    /**
     * 获取段落格式最终呈现的用户名
     * @param {String} username 初始用户名
     * @param {String|Object|Array<Object>} message 段落格式
     * @param {Boolean} HTMLFilter 是否启用 HTML 过滤器
     * @returns {String} 说话人
     */
    static getMessageUsername(username, message, HTMLFilter = false) {
        let u   = username;
        let u2  = message?.data?.customData?.username;
        if (typeof u2 == 'string') u = u2;

        if (Array.isArray(message.message)) {
            for (let i = message.message.length - 1; i >= 0; i--) {
                const e = message.message[i];
                u2      = e?.data?.username;
                if (typeof u2 == 'string') break;
            }
        } else {
            u2 = message?.message?.data?.username;
        }

        if (typeof u2 == 'string') u = u2;

        if (HTMLFilter) u.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/  /g, '&nbsp; ');

        return u;
    }

    /**
     * 获取发送消息时的日志格式
     * @param {String|Object|Array<Object>} message 段落格式
     * @param {String} username 说话人
     * @returns {String} 日志输出格式
     */
    static getMessageSendLog(message, username = '') {
        username = EchoLiveTools.safeHTML(username);
        if (typeof message != 'string') message = EchoLiveTools.safeHTML(EchoLiveTools.getMessagePlainText(message));
        if (message     == '') message  = `<i>${ $t( 'message_preview.empty_message' ) }</i>`;
        if (username    == '') username = `<i>${ $t( 'message_preview.empty_username' ) }</i>`;

        return `<${ username }> ${ message }`;
    }

    /**
     * 快速格式化代码转换成段落格式
     * @param {String} text 文本
     * @param {Object} data 附加数据
     * @param {Object} data.images 图片列表
     * @returns {String|Object|Array<Object>} 段落格式
     */
    static formattingCodeToMessage(text, data = {}) {
        let message = [];
        data        = JSON.parse(JSON.stringify(data));

        const fontSizeValue = [
            'extra-small',
            'small',
            'middle',
            'large',
            'extra-large'
        ];
        let fontSizeFindIndex;

        function msgPush(msg = '', style = undefined, data = undefined) {
            msg = msg.replace(/{{{sheep-realms:at}}}/g, '@');
            if (style == undefined) return message.push(msg);
            let output = {
                text: msg
            };
            if (style   != undefined && Object.keys(style).length != 0) output.style    = style;
            if (data    != undefined)                                   output.data     = data;
            return message.push(output);
        }

        let replaced = text;
        replaced = replaced.replace(/\\@/g, '{{{sheep-realms:at}}}');
        replaced = replaced.replace(
            /@(\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\]|\{.*?\}|.?)/g,
            '{{{sheep-realms:split}}}@$1{{{sheep-realms:format}}}'
        );

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

            let style       = {};
            let imageKey    = '';
            let imageObj    = {};
            switch (e[0]) {
                case '@b':
                    style.bold = true;
                    break;

                case '@i':
                    style.italic = true;
                    break;

                case '@u':
                    style.underline = true;
                    break;

                case '@s':
                    style.strikethrough = true;
                    break;

                case '@+':
                    style.size = 'large';
                    if (styleCache?.size != undefined) {
                        fontSizeFindIndex   = fontSizeValue.indexOf(styleCache?.size);
                        fontSizeFindIndex   = Math.min(fontSizeFindIndex + 1, fontSizeValue.length - 1);
                        style.size          = fontSizeValue[fontSizeFindIndex];
                    }
                    break;

                case '@-':
                    style.size = 'small';
                    if (styleCache?.size != undefined) {
                        fontSizeFindIndex   = fontSizeValue.indexOf(styleCache?.size);
                        fontSizeFindIndex   = Math.max(fontSizeFindIndex - 1, 0);
                        style.size          = fontSizeValue[fontSizeFindIndex];
                    }
                    break;

                case '@r':
                    styleCache = {};
                    if (e[1] != '') msgPush(e[1]);
                    continue;
            
                default:
                    if (e[0].search(/^@\[.*\]$/g) != -1) {
                        style.color = e[0].substring(2, e[0].length - 1);
                        break;
                    } else if (e[0].search(/^@\{.*\}$/g) != -1) {
                        imageKey = e[0].substring(2, e[0].length - 1);

                        
                        if (imageKey.split(':')[0] === 'sys') {
                            // 插入图片
                            if (imageKey.split(':')[1] === 'img' && data?.images != undefined) {
                                imageObj = data.images[imageKey.split(':')[2]];
                                delete imageObj?.isAbsolute;
                                delete imageObj?.isPixelated;
                                msgPush(
                                    e[1],
                                    styleCache,
                                    {
                                        image: data.images[imageKey.split(':')[2]]
                                    }
                                );
                            }
                        } else {
                            // 插入表情包
                            msgPush(
                                e[1],
                                styleCache,
                                {
                                    emoji: imageKey
                                }
                            );
                        }
                        continue;
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

    /**
     * 获取 URL 地址参数
     * @param {String} name 参数名称
     * @returns {String|null} 参数值
     */
    static getUrlParam(name) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    /**
     * 获取易读的文件大小信息
     * @param {Number} bytes Byte
     * @returns {String} 易读的文件大小信息
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
    
        const k     = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i     = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 格式化日期时间
     * @param {String|Number} value 日期时间值
     * @param {String} formatKey 格式化键名
     * @returns {String} 格式化后的日期时间
     */
    static formatDate(value = undefined, formatKey = 'data_time_common') {
        let data = EchoLiveTools.formatDateToObject(value);
        
        return $t('localization.' + formatKey, data);
    }

    /**
     * 格式化日期时间为 Object
     * @param {String|Number} value 日期时间值
     * @returns  {Object} 日期时间数据
     */
    static formatDateToObject(value = undefined) {
        let date = value != undefined ? new Date(value) : new Date();
        const padZero = (num, pad = 2) => num.toString().padStart(pad, '0');
    
        const y = date.getFullYear();
        const M = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const ms = date.getMilliseconds();
        const utcz = date.getTimezoneOffset() / 60
        const utc = utcz < 0 ? utcz * -1 : utcz * 1
        const h12 = (h % 12) || 12;
        let utcs = '';
        if (utc != 0) {
            utcs = ( utc > 0 ? '+' : '-' ) + utc
        }
    
        return {
            y: y,
            M: M,
            d: d,
            h: h,
            h12: h12,
            m: m,
            s: s,
            ms: ms,
            MM: padZero(M),
            dd: padZero(d),
            hh: padZero(h),
            hh12: padZero(h12),
            mm: padZero(m),
            ss: padZero(s),
            mms: padZero(ms, 3),
            utc: utc,
            utcs: utcs,
            isAM: h < 12,
            isPM: h >= 12,
            AMorPM: h < 12 ? 'am' : 'pm'
        };
    }

    /**
     * 安全输出 HTML
     * @param {String} text 文本
     * @param {Boolean} inAttribute 在属性值中
     * @returns {String} 过滤后的文本
     */
    static safeHTML(text, inAttribute = false) {
        if (typeof text != 'string') return text;
        let txt = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (inAttribute) txt = text.replace(/"/g, '&quot;');
        return txt;
    }

    /**
     * 使用 ViewTransition API 更新视图
     * @param {Function} action 过程
     */
    static updateView(action = function() {}) {
        if (!document.startViewTransition) {
            action();
            return;
        }
        document.startViewTransition(() => action());
    }

    /**
     * 根据字符串生成匹配字符串内任意字符的正则表达式
     * @param {String} str 字符串
     * @returns {RegExp} 正则表达式
     */
    static generateCharRegex(str) {
        str = str.replace(/\s/gm, '');
        const escapedStr    = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexStr      = '[' + escapedStr + ']';
        return new RegExp(regexStr, 'g');
    }

    /**
     * 生成 driver.js 引导数据
     * @param {Object} data 附加数据
     * @param {Array<Object>} step 步骤数据
     * @returns {Object} 引导数据
     */
    static generateDriverData(data = {}, steps = []) {
        return {
            animate:        !config.accessible.animation_disable,
            showProgress:   true,
            progressText:   $t('help.popover.progress'),
            nextBtnText:    $t('help.popover.next'),
            prevBtnText:    $t('help.popover.prev'),
            doneBtnText:    $t('help.popover.done'),
            showButtons:    [
                'next',
                'close'
            ],
            ...data,
            steps:          steps
        }
    }

    /**
     * 生成 driver.js 引导步骤
     * @param {String} key 翻译键
     * @param {Number} step 总步骤数
     * @param {Array<Object>} elementData 目标元素数据
     * @param {Array<Object>} popoverData 附加数据
     * @returns {Array<Object>} 步骤数据
     */
    static generateDriverSteps(key = '', step = 1, elementData = [], popoverData = []) {
        let steps = [];
        for (let i = 1; i <= step; i++) {
            steps.push({
                element: elementData[i] ? elementData[i] : undefined,
                popover: {
                    title:          $t(`help.step.${key}.s${i}.title`),
                    description:    $t(`help.step.${key}.s${i}.description`),
                    side:           'bottom',
                    align:          'start',
                    ...popoverData[i]
                }
            });
        }
        return steps;
    }

    /**
     * 定义对象只读属性
     * @param {Object} obj 目标对象
     * @param {Object} data 属性数据
     */
    static defineObjectPropertyReadOnly(obj, data = {}) {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const e = data[key];
                Object.defineProperty(obj, key, {
                    value:      e,
                    writable:   false
                });
            }
        }
    }
}