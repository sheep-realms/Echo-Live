class EchoLiveHistory {
    constructor(config) {
        this.config = config;
        this.broadcast = undefined;
        this.uuid = EchoLiveTools.getUUID();
        this.hidden = false;
        this.prevMessage = {};
        this.event = {
            newHistory: function() {}
        };

        this.init();
    }
    
    /**
     * 初始化
     */
    init() {
        window.addEventListener("error", (e) => {
            const msg = e.error != null ? e.error.stack : e.message;
            const filename = e.filename != '' ? e.filename : 'null';
            this.broadcast.error(msg, filename, e.lineno, e.colno);
        });

        if (this.config.echolive.sleep_enable) {
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    this.hidden = false;
                } else {
                    this.hidden = true;
                }
            });
        }

        if (this.config.echolive.broadcast_enable) {
            this.broadcast = new EchoLiveBroadcastHistory(this.config.echolive.broadcast_channel, this, this.config);
        }
    }

    /**
     * 绑定事件
     * @param {String} eventName 事件名称
     * @param {Function} action 函数
     * @returns {Function} 函数
     */
    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    /**
     * 发送历史记录
     * @param {Object} data Echo-Live 返回的打印消息
     */
    send(data) {
        if (
            this.config.history.remove_continuous_duplicate
            && typeof data === 'object'
            && JSON.stringify(data) === JSON.stringify(this.prevMessage)
        ) return;
        this.prevMessage = data;
        this.event.newHistory(data);
    }
}