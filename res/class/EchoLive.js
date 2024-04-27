class EchoLive {
    constructor(echo, config) {
        this.echo = echo;
        this.config = config;
        this.data = undefined;
        this.broadcast = undefined;
        this.uuid = EchoLiveTools.getUUID();
        this.custom = {
            name: undefined,
            color: undefined,
            data: {}
        };
        this.hidden = false;
        this.antiFlood = false;
        this.theme = [];
        this.username = '';
        this.timer = {
            messagesPolling: -1
        };
        this.event = {
            themeScriptLoad: function() {},
            themeScriptUnload: function() {},
        };

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        let urlName = EchoLiveTools.getUrlParam('name');
        let urlColor = EchoLiveTools.getUrlParam('color');
        if (urlName != null) this.custom.name = urlName.replace(/</g, '').replace(/>/g, '');
        if (urlColor != null) this.custom.color = urlColor;
        
        window.addEventListener("error", (e) => {
            const msg = e.error != null ? e.error.stack : e.message;
            const filename = e.filename != '' ? e.filename : 'null';
            this.broadcast.error(msg, filename, e.lineno, e.colno);
        });
        // window.onerror = (message, source, line, col, error) => {
        //     this.broadcast.error(message, source, line, col);
        // };

        // 嵌套有点多了，这不好，要改
        if (this.config.echolive.sleep.enable) {
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
                    if (this.echo.state != 'stop' && this.config.echolive.sleep.enable && this.config.echolive.sleep.during_printing_stop_print) {
                        this.echo.stop();
                        this.broadcast.echoStateUpdate('stop', this.echo.messageList.length);
                    }
                }
            });
        }

        if (this.config.echo.print_speed != undefined) {
            this.echo.printSpeed = this.config.echo.print_speed;
            this.echo.printSpeedStart = this.config.echo.print_speed;
            this.echo.printSpeedChange = this.config.echo.print_speed;
        }

        if (this.config.echolive.broadcast.enable) {
            this.broadcast = new EchoLiveBroadcastPortal(this.config.echolive.broadcast.channel, this, this.config);
        } else if (this.config.echolive.messages_polling.enable) {
            this.start();
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
     * 发送消息
     * @param {Object} data 消息格式
     * @param {String} data.username 说话人
     * @param {Array<Object>} data.messages 消息队列
     */
    send(data = {}) {
        if (this.hidden) return;
        if (typeof data != 'object') return;
        if (this.antiFlood) {
            this.data = data;
            this.antiFlood = false;
            return;
        }
        if (typeof this.data === 'object' && JSON.stringify(data) === JSON.stringify(this.data)) return;
        if (this.echo.state != 'stop') this.echo.stop();
        this.data = data;
        if (typeof data?.username === 'string') {
            this.username = data.username;
            $('#echo-live .name').text(data.username);
        }
        if (Array.isArray(data?.messages)) this.echo.sendList(JSON.parse(JSON.stringify(data.messages)));
    }

    /**
     * 下一条对话
     */
    next() {
        if (this.hidden) return;
        if (this.echo.state != 'stop') this.echo.stop();
        this.echo.next();
    }

    /**
     * 重新加载
     */
    reload() {
        if (this.hidden) return;
        $('#start-script').remove();
        let s = document.createElement('script');
        s.src = `start.js`;
        s.id = 'start-script';
        document.body.appendChild(s);
    }

    /**
     * 开始轮询
     */
    start() {
        let that = this;
        this.timer.messagesPolling = setInterval(function() {
            that.reload();
        }, this.config.echolive.messages_polling.tick);
    }

    /**
     * 停止轮询
     */
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

        if ((this.config.echolive.style.live_theme_script_enable && this.config.global.theme_script_enable) && typeof theme.script == 'object') {
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