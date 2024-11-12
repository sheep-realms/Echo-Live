class EchoLiveCharacter {
    constructor(config) {
        this.config         = config;
        this.broadcast      = undefined;
        this.uuid           = EchoLiveTools.getUUID();
        this.hidden         = false;
        this.lastImage      = undefined;
        this.event          = {
            layerUpdate:    function() {},
            imageChange:    function() {}
        };

        this.init();
    }
    
    /**
     * 初始化
     */
    init() {
        if (this.config.echolive.sleep.enable) {
            document.addEventListener("visibilitychange", () => {
                this.hidden = document.visibilityState !== "visible";
            });
        }

        if (this.config.echolive.broadcast.enable) {
            this.broadcast = new EchoLiveBroadcastCharacter(this.config.echolive.broadcast.channel, this, this.config);
            window.addEventListener("error", (e) => {
                const msg       = e.error       !== null ? e.error.stack : e.message;
                const filename  = e.filename    !== ''   ? e.filename    : 'null';
                this.broadcast.error(msg, filename, e.lineno, e.colno);
            });
            this.broadcast.on('shutdown', reason => this.shutdown(reason));
        }

        echoLiveSystem.hook.trigger('echolive_character_init', {
            unit: this
        });
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

    setImage(url) {
        if (this.lastImage !== undefined) this.event.imageChange(this.lastImage, 'before');
        this.event.imageChange(url, 'main');
        this.lastImage = url;
        this.updateLayer();
    }

    updateLayer() {
        this.event.layerUpdate();
    }

    /**
     * 立即关闭
     * @param {String} reason 理由
     */
    shutdown(reason = undefined) {
        this.broadcast = undefined;
        this.event.shutdown(reason);
    }
}