class SystemNotice {
    constructor(sel = '#fh-notice') {
        this.sel = sel;
        this.lastnNoticeIndex = 0;
    }

    /**
     * 发送通知
     * @param {String} message 通知内容
     * @param {String} title 通知标题
     * @param {'alert'|'error'|'experimental'|'fatal'|'info'|'success'|'warn'} type 通知类型
     * @param {Object} data 附加数据
     * @param {Boolean} data.animation 是否使用动画
     * @param {String} data.icon 图标名称
     */
    send(message = '', title = '', type = 'info', data = {}) {
        const index = this.lastnNoticeIndex++;
        data = {
            ...data,
            animation: !config.accessible.animation_disable && ( data?.animation ?? true ),
            index: index
        };

        $(this.sel).prepend(FHUINotice.notice(message, title, type, data));

        let messageLenB = new TextEncoder().encode(message + title).length;
        let waitTime = Math.max(7000, messageLenB * 1000 * 0.15 + 500);

        setTimeout(() => {
            const $sel = $(`${ this.sel } .fh-notice-item[data-index=${ index }]`)
            if (config.accessible.animation_disable) {
                $sel.remove();
                return;
            }
            $sel.addClass('fh-notice-ani-out');
        }, waitTime)
    }
}