class EchoLive {
    constructor(echo, config) {
        this.echo = echo;
        this.config = config;
        this.data = undefined;
        this.broadcast = undefined;
        this.uuid = EchoLiveTools.getUUID();
        this.hidden = false;
        this.antiFlood = false;
        this.theme = [];
        this.timer = {
            messagesPolling: -1
        };
        this.event = {
            themeScriptLoad: function() {},
            themeScriptUnload: function() {},
        };

        this.init();
    }

    init() {
        // 嵌套有点多了，这不好，要改
        if (this.config.echolive.sleep_enable) {
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    this.hidden = false;
                    if (this.broadcast != undefined) this.broadcast.pageVisible();
                    if (this.timer.messagesPolling != -1) {
                        this.antiFlood = true;
                        this.start();
                    }
                } else {
                    this.hidden = true;
                    if (this.broadcast != undefined) this.broadcast.pageHidden();
                    if (this.timer.messagesPolling != -1) this.stop();
                }
            });
        }

        if (this.config.echo.print_speed != undefined) {
            this.echo.printSpeed = this.config.echo.print_speed;
            this.echo.printSpeedStart = this.config.echo.print_speed;
            this.echo.printSpeedChange = this.config.echo.print_speed;
        }

        if (this.config.echolive.broadcast_enable) {
            this.broadcast = new EchoLiveBroadcast(this, this.config.echolive.broadcast_channel);
        } else if (this.config.echolive.messages_polling_enable) {
            this.start();
        }
    }

    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    /**
     * 发送消息
     * @param {Object} data 消息格式
     */
    send(data = {}) {
        if (this.hidden) return;
        if (this.antiFlood) {
            this.data = data;
            this.antiFlood = false;
            return;
        }
        if (typeof this.data === 'object' && JSON.stringify(data) === JSON.stringify(this.data)) return;
        if (this.echo.state != 'stop') this.echo.stop();
        this.data = data;
        $('#echo-live .name').text(data.username);
        this.echo.sendList(JSON.parse(JSON.stringify(data.messages)));
    }

    /**
     * 下一条对话
     */
    next() {
        if (this.hidden) return;
        this.echo.next();
    }

    reload() {
        if (this.hidden) return;
        $('#start-script').remove();
        let s = document.createElement('script');
        s.src = `start.js`;
        s.id = 'start-script';
        document.body.appendChild(s);
    }

    start() {
        let that = this;
        this.timer.messagesPolling = setInterval(function() {
            that.reload();
        }, this.config.echolive.messages_polling_tick);
    }

    stop() {
        clearInterval(this.timer.messagesPolling);
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

        if (this.config.echolive.live_theme_script_enable && typeof theme.script == 'object') {
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