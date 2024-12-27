/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class SystemNotice {
    constructor(sel = '#fh-notice') {
        this.sel = sel;
        this.lastNoticeIndex = 0;
        this.noticeList = {};

        this.init();
    }

    /**
     * 初始化事件绑定
     */
    init() {
        let that = this;
        // 关闭通知
        $(document).on('click', '.fh-notice-item-btn-close', function(e) {
            if (e.shiftKey) {
                if (config.accessibility.animation_disable || $('html').hasClass('accessibility-animation-disable')) return $('.fh-notice-item').remove();
                $('.fh-notice-item:not(.fh-notice-ani-in)').addClass('fh-notice-ani-out');
                return;
            }
            const $item = $(this).parents('.fh-notice-item').eq(0);
            if (config.accessibility.animation_disable || $('html').hasClass('accessibility-animation-disable')) return $item.remove();
            $item.addClass('fh-notice-ani-out');
            that.runCallback($item.data('index'), null);
        });

        // 点击通知
        $(document).on('click', '.fh-notice-item', function() {
            that.runCallback($(this).data('index'), 'click');
        });

        // 通知入场动画结束
        $(document).on('animationend', '.fh-notice-item.fh-notice-ani-in', function() {
            $(this).removeClass('fh-notice-ani-in');
        });

        // 通知退场动画结束
        $(document).on('animationend', '.fh-notice-item.fh-notice-ani-out', function() {
            $(this).remove();
        });
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
     * @param {Function} callback 回调函数
     */
    send(message = '', title = '', type = 'info', data = {}, callback = undefined) {
        const index = this.lastNoticeIndex++;
        data = {
            id:         undefined,
            waitTime:   undefined,
            width:      undefined,
            ...data,
            animation:  !config.accessibility.animation_disable && !$('html').hasClass('accessibility-animation-disable') && ( data?.animation ?? true ),
            index:      index,
            hasClick:   typeof callback === 'function'
        };

        if (data.id !== undefined && $(`${ this.sel } .fh-notice-item[data-id="${ data.id }"]`).length > 0) {
            this.killById(data.id, true);
        }

        $(this.sel).prepend(FHUINotice.notice(message, title, type, data));

        let messageLenB = new TextEncoder().encode((message + title).replace(/<\/?[\w\s="':;.-]*>/g, '')).length;
        let waitTime    = Math.max(5000, messageLenB * 1000 * 0.15 + 500);
        if (data?.waitTime !== undefined) waitTime = data.waitTime;

        let timer;
        if (waitTime >= 0) {
            timer = setTimeout(() => {
                this.closeByIndex(index);
            }, waitTime)
        }
        
        this.addNotice(index, data, callback, timer);
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
     * @param {Function} callback 回调函数
     */
    sendT(key = '', vars = {}, type = 'info', data = {}, callback = undefined) {
        data = {
            id: key,
            ...data
        }
        return this.send($t(key, vars), '', type, data, callback);
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
     * @param {Function} callback 回调函数
     */
    sendTHasTitle(key = '', vars = {}, type = 'info', data = {}, title = '', titleVars = {}, callback = undefined) {
        data = {
            id: key,
            ...data
        }
        let titleKey = title === '' ? key + '.title' : title;
        return this.send($t(key + '.message', vars), $t(titleKey, titleVars), type, data, callback);
    }

    /**
     * 添加通知数据
     * @param {Number} index 索引
     * @param {Object} data 数据
     * @param {Function} callback 回调
     * @param {Number} timer 定时器 ID
     * @returns 
     */
    addNotice(index, data, callback = () => {}, timer) {
        this.noticeList[index] = {
            id: data?.id,
            data: data,
            callback: callback,
            timer: timer,
            unit: new SystemNoticeUnit(this, index)
        };
        return this.noticeList[index];
    }

    /**
     * 清除通知
     * @param {String} sel 选择器
     * @param {Boolean} now 是否立即关闭
     */
    kill(sel, now = false) {
        const $sel = $(`${ this.sel } .fh-notice-item${ sel }`)
        if (now || config.accessibility.animation_disable || $('html').hasClass('accessibility-animation-disable')) {
            $sel.remove();
            return;
        }
        $sel.addClass('fh-notice-ani-out');
    }

    /**
     * 根据索引清除通知
     * @param {Number} index 索引
     * @param {Boolean} now 是否立即关闭
     */
    killByIndex(index, now = false) {
        if (index === undefined) return;
        this.kill(`[data-index="${ index }"]`, now);
        this.removeByIndex(index);
    }

    /**
     * 根据 ID 清除通知
     * @param {String} id ID
     * @param {Boolean} now 是否立即关闭
     */
    killById(id, now = false) {
        if (id === undefined) return;
        this.kill(`[data-id="${ id }"]`, now);

        for (const key in this.noticeList) {
            if (Object.prototype.hasOwnProperty.call(this.noticeList, key)) {
                const e = this.noticeList[key];
                if (e.id === id) this.removeByIndex(key);
            }
        }
    }

    /**
     * 根据索引移除通知数据
     * @param {Number} index 索引
     */
    removeByIndex(index) {
        if (index === undefined) return;
        if (typeof this.noticeList[index]?.timer === 'number') clearTimeout(this.noticeList[index].timer);
        delete this.noticeList[index];
    }

    /**
     * 关闭通知并触发回调
     * @param {Number} index 索引
     */
    closeByIndex(index) {
        this.runCallback(index, null);
        this.killByIndex(index);
    }

    /**
     * 设置标题
     * @param {Number} index 索引
     * @param {String} title 标题
     */
    setTitle(index, title = '') {
        if (index === undefined) return;
        $(`${ this.sel } .fh-notice-item[data-index="${ index }"] .fh-notice-item-content-message .title`).html(title);
    }

    /**
     * 设置通知内容
     * @param {Number} index 索引
     * @param {String} message 内容
     */
    setMessage(index, message = '') {
        if (index === undefined) return;
        $(`${ this.sel } .fh-notice-item[data-index="${ index }"] .fh-notice-item-content-message .message`).html(message);
    }

    /**
     * 运行回调函数
     * @param {Number} index 索引编号
     * @param {String} value 返回值
     */
    runCallback(index, value) {
        this.noticeList[index]?.callback(
            value,
            this.noticeList[index].unit
        );
    }
}


class SystemNoticeUnit {
    constructor(parent, index) {
        this.parent = parent;
        this.index = index;
    }

    /**
     * 清除
     */
    kill() {
        return this.parent.killByIndex(this.index, true);
    }

    /**
     * 关闭
     */
    close() {
        return this.parent.killByIndex(this.index, false);
    }

    /**
     * 设置标题
     * @param {String} title 标题
     */
    setTitle(title = '') {
        return this.parent.setTitle(this.index, title);
    }

    /**
     * 设置通知内容
     * @param {String} message 内容
     */
    setMessage(message = '') {
        return this.parent.setMessage(this.index, message);
    }
}