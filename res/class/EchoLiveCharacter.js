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

    /**
     * 设置形象
     * @param {Object} data 数据
     * @param {Boolean} data.custom 不使用预制形象
     * @param {Object} data.avatar 形象数据
     * @param {String} data.avatar.name 形象名称
     * @param {String} data.avatar.action 动作名称
     * @param {Object} data.image 图像数据
     * @param {String} data.image.url URL
     * @param {String} data.image.position 位置
     * @param {String} data.image.size 尺寸
     * @param {String} data.image.repeat 重复填充方式
     * @param {Object} data.effect 切换动效
     * @param {String} data.effect.name 动效名称
     * @param {String} data.effect.duration 动效用时
     * @param {String} data.effect.scale 动效规模乘数
     * @param {String} data.effect.timingFunction 动效时间曲线
     */
    setAvatar(data) {
        data = {
            custom: false,
            ...data,
            image: {
                url: undefined,
                position: undefined,
                size: undefined,
                repeat: undefined,
                ...data?.image
            },
            effect: {
                name: undefined,
                duration: undefined,
                scale: undefined,
                timingFunction: undefined,
                ...data?.effect
            }
        };
        if (!data.custom) {
            data = {
                ...data,
                avatar: {
                    name: undefined,
                    action: undefined,
                    ...data?.avatar
                }
            };
        }

        this.setImage(data.image.url);
        this.updateLayer(data.effect);
    }

    setImage(url) {
        if (this.lastImage !== undefined) this.event.imageChange(this.lastImage, 'before');
        this.event.imageChange(url, 'main');
        this.lastImage = url;
    }

    updateLayer(effect) {
        effect = {
            name: undefined,
            speed: undefined,
            scale: undefined,
            timingFunction: undefined,
            ...effect
        };
        this.event.layerUpdate(effect);
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