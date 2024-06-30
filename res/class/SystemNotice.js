class SystemNotice {
    constructor(sel = '#fh-notice') {
        this.sel = sel;
        this.lastnNoticeIndex = 0;
    }

    /**
     * 发送通知
     * @param {String} message 通知内容
     * @param {String} title 通知标题
     * @param {'alert'|'error'|'experimental'|'fatal'|'info'|'success'|'tips'|'trophy'|'warn'} type 通知类型
     * @param {Object} data 附加数据
     * @param {Boolean} data.animation 是否使用动画
     * @param {String} data.icon 图标名称
     * @param {String} data.id 通知 ID
     * @param {Number} data.waitTime 停留时间
     * @param {String} data.width 宽度
     */
    send(message = '', title = '', type = 'info', data = {}) {
        const index = this.lastnNoticeIndex++;
        data = {
            id:         undefined,
            waitTime:   undefined,
            width:      undefined,
            ...data,
            animation:  !config.accessible.animation_disable && !$('body').hasClass('accessible-animation-disable') && ( data?.animation ?? true ),
            index:      index
        };

        if (data.id != undefined && $(`${ this.sel } .fh-notice-item[data-id="${ data.id }"]`).length > 0) {
            this.killById(data.id, true);
        }

        $(this.sel).prepend(FHUINotice.notice(message, title, type, data));

        let messageLenB = new TextEncoder().encode((message + title).replace(/<\/?[\w\s="':;.-]*>/g, '')).length;
        let waitTime    = Math.max(5000, messageLenB * 1000 * 0.15 + 500);
        if (data?.waitTime != undefined) waitTime = data.waitTime;

        if (waitTime < 0) return;
        setTimeout(() => {
            this.killByIndex(index);
        }, waitTime);
    }

    /**
     * 基于翻译键发送无标题通知
     * @param {String} key 翻译键
     * @param {Object} vars 翻译变量
     * @param {'alert'|'error'|'experimental'|'fatal'|'info'|'success'|'tips'|'trophy'|'warn'} type 通知类型
     * @param {Object} data 附加数据
     * @param {Boolean} data.animation 是否使用动画
     * @param {String} data.icon 图标名称
     * @param {String} data.id 通知 ID
     * @param {Number} data.waitTime 停留时间
     * @param {String} data.width 宽度
     */
    sendT(key = '', vars = {}, type = 'info', data = {}) {
        data = {
            id: key,
            ...data
        }
        return this.send($t(key, vars), '', type, data);
    }

    /**
     * 基于翻译键发送有标题通知
     * @param {String} key 翻译键
     * @param {Object} vars 翻译变量
     * @param {'alert'|'error'|'experimental'|'fatal'|'info'|'success'|'tips'|'trophy'|'warn'} type 通知类型
     * @param {Object} data 附加数据
     * @param {Boolean} data.animation 是否使用动画
     * @param {String} data.icon 图标名称
     * @param {String} data.id 通知 ID
     * @param {Number} data.waitTime 停留时间
     * @param {String} data.width 宽度
     * @param {String} title 自定义标题翻译键
     * @param {String} titleVars 标题翻译变量
     */
    sendThasTitle(key = '', vars = {}, type = 'info', data = {}, title = '', titleVars = {}) {
        data = {
            id: key,
            ...data
        }
        let titleKey = title == '' ? key + '.title' : title;
        return this.send($t(key + '.message', vars), $t(titleKey, titleVars), type, data);
    }

    kill(sel, now = false) {
        const $sel = $(`${ this.sel } .fh-notice-item${ sel }`)
        if (now || config.accessible.animation_disable || $('body').hasClass('accessible-animation-disable')) {
            $sel.remove();
            return;
        }
        $sel.addClass('fh-notice-ani-out');
    }

    killByIndex(index, now = false) {
        if (index == undefined) return;
        this.kill(`[data-index="${ index }"]`, now);
    }

    killById(id, now = false) {
        if (id == undefined) return;
        this.kill(`[data-id="${ id }"]`, now);
    }
}