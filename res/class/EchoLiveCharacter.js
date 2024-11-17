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
     * 获取形象数据
     * @param {String} name 形象名称
     * @returns {Object|undefined} 形象数据
     */
    getAvatar(name) {
        if (name === undefined) return;
        return echoLiveSystem.registry.getRegistryValue('avatar', name);
    }

    /**
     * 获取形象动作数据
     * @param {String} avatarName 形象名称
     * @param {String} actionName 动作名称
     * @returns {Object|undefined} 动作数据
     */
    getAvatarAction(avatarName, actionName) {
        const avatarData = this.getAvatar(avatarName);
        if (avatarData === undefined) return;
        if (actionName === undefined) {
            if (avatarData.default_action?.idle === undefined) return;
            actionName = avatarData.default_action.idle;
        }

        let r = avatarData.action.find(e => e.name === actionName);
        if (r === undefined) {
            if (this.config.character.avatar.action !== '' && this.config.character.avatar.action !== undefined) {
                r = avatarData.action.find(e => e.name === this.config.character.avatar.action);
            } else if (avatarData.default_action?.unknown !== undefined) {
                r = avatarData.action.find(e => e.name === avatarData.default_action.unknown);
            }
        }
        return r;
    }

    /**
     * 设置形象
     * @param {Object} data 数据
     * @param {Boolean} data.custom 不使用预制形象
     * @param {Object} data.avatar 形象数据
     * @param {String} data.avatar.name 形象名称
     * @param {String} data.avatar.action 动作名称
     * @param {Object} data.image 图片数据
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

            const avatarData = this.getAvatar(data.avatar.name);
            if (avatarData === undefined || avatarData.action.length === 0) return;
            const actionData = this.getAvatarAction(data.avatar.name, data.avatar.action);
            if (actionData === undefined) return;

            data.image.url = actionData.custom_i18n === true ? actionData.path : (avatarData.path?.images + actionData.path);
        }

        this.setImage(data.image);
        this.updateLayer(data.effect);
    }

    /**
     * 设置图片
     * @param {Object} image 图片数据
     * @param {String} image.url URL
     * @param {String} image.position 位置
     * @param {String} image.size 尺寸
     * @param {String} image.repeat 重复填充方式
     */
    setImage(image) {
        image = {
            url: undefined,
            position: undefined,
            size: undefined,
            repeat: undefined,
            ...image
        }
        if (this.lastImage !== undefined) this.event.imageChange(this.lastImage, 'before');
        this.event.imageChange(image, 'main');
        this.lastImage = image;
    }

    /**
     * 更新图层
     * @param {Object} effect 动效数据
     * @param {String} effect.name 动效名称
     * @param {String} effect.duration 动效用时
     * @param {String} effect.scale 动效规模乘数
     * @param {String} effect.timingFunction 动效时间曲线
     */
    updateLayer(effect) {
        effect = {
            name: undefined,
            duration: undefined,
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