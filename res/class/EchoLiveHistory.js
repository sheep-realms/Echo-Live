class EchoLiveHistory {
    constructor(config) {
        this.config = config;
        this.broadcast = undefined;
        this.uuid = EchoLiveTools.getUUID();
        this.hidden = false;
        this.prevMessage = {};
        this.theme = [];
        this.event = {
            newHistory: function() {},
            themeScriptLoad: function() {},
            themeScriptUnload: function() {},
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

    /**
     * 修改主题样式地址
     * @param {String} url 样式文件地址
     */
    setThemeStyleUrl(url) {
        if ($('#echo-live-theme').attr('href') == url) return url;
        $('#echo-live-theme').attr('href', url);
        return url;
    }

    /**
     * 查找主题
     * @param {String} name 主题ID
     * @returns {Object} 主题数据
     */
    findTheme(name) {
        return this.theme.find((e) => {
            return e.name == name;
        })
    }

    /**
     * 设置主题
     * @param {String} name 主题ID
     * @returns {String} 主题入口样式文件URL
     */
    setTheme(name) {
        const theme = this.findTheme(name);
        if (theme == undefined) return;

        this.event.themeScriptUnload()
        this.event.themeScriptLoad = function() {};
        this.event.themeScriptUnload = function() {};
        $('script.echo-live-theme-script').remove();

        this.setThemeStyleUrl(theme.style);

        if ((this.config.history.history_theme_script_enable && this.config.global.theme_script_enable) && typeof theme.script == 'object') {
            theme.script.forEach(e => {
                let s = document.createElement("script");
                s.src = e;
                s.class = 'echo-live-theme-script';
                document.head.appendChild(s);
            });
        }

        this.event.themeScriptLoad();

        return theme.style;
    }
}