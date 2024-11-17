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
     * 获取形象内容数据
     * @param {String|Object} avatar 形象名称或形象数据
     * @param {'action'|'scene'} type 数据类型
     * @param {String|undefined} name 内容名称
     * @returns {Object|undefined} 内容数据
     */
    getAvatarContent(avatar, type, name) {
        if (type !== 'action' && type !== 'scene') return;
        const avatarData = typeof avatar === 'object' ? avatar : this.getAvatar(avatar);
        if (avatarData === undefined) return;
        if (name === undefined) {
            if (avatarData.default_value[type]?.idle === undefined) return;
            name = avatarData.default_value[type].idle;
        }

        if (!Array.isArray(avatarData[type])) return;
        let r = avatarData[type].find(e => e.name === name);
        if (r === undefined) {
            if (this.config.character.avatar[type] !== '' && this.config.character.avatar[type] !== undefined) {
                r = avatarData.action.find(e => e.name === this.config.character.avatar[type]);
            } else if (avatarData.default_value[type]?.unknown !== undefined) {
                r = avatarData.action.find(e => e.name === avatarData.default_value[type].unknown);
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
            const actionData = this.getAvatarContent(avatarData, 'action', data.avatar.action);
            if (actionData === undefined) return;
            const sceneData = this.getAvatarContent(avatarData, 'scene', data.avatar.scene);

            data.image.url = actionData.custom_i18n === true ? actionData.path : (avatarData.path?.images + actionData.path);
            if (sceneData !== undefined) {
                data.image.position = sceneData.position    ?? data.image.position;
                data.image.size     = sceneData.size        ?? data.image.size;
                data.image.repeat   = sceneData.repeat      ?? data.image.repeat;
            }
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