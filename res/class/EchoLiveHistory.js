class EchoLiveHistory {
    constructor(config) {
        this.config         = config;
        this.broadcast      = undefined;
        this.uuid           = EchoLiveTools.getUUID();
        this.hidden         = false;
        this.prevMessage    = {};
        this.theme          = [];
        this.event          = {
            latestHistoryDisplayChange:     function() {},
            clearHistory:                   function() {},
            newHistory:                     function() {},
            shutdown:                       function() {},
            themeScriptLoad:                function() {},
            themeScriptUnload:              function() {},
        };

        this.init();
    }

    /**
     * 主题脚本是否启用
     */
    get themeScriptEnable() {
        if (this.config.history.style.history_theme_script_enable && this.config.global.theme_script_enable) return true;
        return false;
    }
    
    /**
     * 初始化
     */
    init() {
        this.theme = echoLiveSystem.registry.getRegistryArray('live_theme');

        if (this.config.echolive.sleep.enable) {
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    this.hidden = false;
                } else {
                    this.hidden = true;
                }
            });
        }

        if (this.config.echolive.broadcast.enable) {
            this.broadcast = new EchoLiveBroadcastHistory(this.config.echolive.broadcast.channel, this, this.config);
            window.addEventListener("error", (e) => {
                const msg       = e.error       !== null ? e.error.stack : e.message;
                const filename  = e.filename    !== ''   ? e.filename    : 'null';
                this.broadcast.error(msg, filename, e.lineno, e.colno);
            });
            this.broadcast.on('shutdown', reason => this.shutdown(reason));
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
            this.config.history.message.remove_continuous_duplicate
            && typeof data === 'object'
            && JSON.stringify(data) === JSON.stringify(this.prevMessage)
        ) return;
        this.prevMessage = data;
        this.changeLatestHistoryDisplay(false);
        this.event.newHistory(data);
    }

    /**
     * 清空历史记录
     */
    clear() {
        this.event.clearHistory();
    }

    /**
     * 更改最新历史记录的显示状态
     * @param {Boolean} display 是否显示
     */
    changeLatestHistoryDisplay(display = false) {
        this.event.latestHistoryDisplayChange(display);
    }

    /**
     * 修改主题样式地址
     * @param {String} url 样式文件地址
     */
    setThemeStyleUrl(url) {
        if ($('#echo-live-theme').attr('href') === url) return url;
        $('#echo-live-theme').attr('href', url);
        return url;
    }

    /**
     * 查找主题
     * @param {String} name 主题ID
     * @returns {Object} 主题数据
     */
    findTheme(name) {
        return this.theme.find((e) => e.name === name);
    }

    /**
     * 设置主题
     * @param {String} name 主题ID
     * @returns {String} 主题入口样式文件URL
     */
    setTheme(name) {
        const theme = this.findTheme(name);
        if (theme === undefined) return;

        this.event.themeScriptUnload()
        this.event.themeScriptLoad      = function() {};
        this.event.themeScriptUnload    = function() {};
        $('script.echo-live-theme-script').remove();

        this.setThemeStyleUrl(theme.style);

        if (this.themeScriptEnable && typeof theme.script == 'object') {
            theme.script.forEach(e => {
                let s   = document.createElement("script");
                s.src   = e;
                s.class = 'echo-live-theme-script';
                document.head.appendChild(s);
            });
        }

        this.event.themeScriptLoad();

        return theme.style;
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