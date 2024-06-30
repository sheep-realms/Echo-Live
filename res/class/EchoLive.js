class EchoLive {
    constructor(echo, config) {
        this.echo           = echo;
        this.config         = config;
        this.data           = undefined;
        this.broadcast      = undefined;
        this.uuid           = EchoLiveTools.getUUID();
        this.custom         = {
            name:   undefined,
            color:  undefined,
            data:   {}
        };
        this.hidden         = false;
        this.idle           = false;
        this.antiFlood      = false;
        this.theme          = [];
        this.username       = '';
        this.timer          = {
            displayHiddenWait:  EchoLive.NOT_ACTIVE_TIMER,
            messagesPolling:    EchoLive.NOT_ACTIVE_TIMER
        };
        this.event          = {
            displayHidden:      function() {},
            displayHiddenNow:   function() {},
            displayShow:        function() {},
            shutdown:           function() {},
            themeScriptLoad:    function() {},
            themeScriptUnload:  function() {}
        };
        this.task           = [];
        this.taskNow        = {};
        this.taskRunning    = false;
        this.taskLastID     = 0;
        this.debug          = {
            taskLog: false
        };

        this.init();
    }

    static {
        EchoLiveTools.defineObjectPropertyReadOnly(EchoLive, {
            NOT_ACTIVE_TIMER:   -1,
            NOW_TASK_ID:        -1,
            INVALID_TASK_ID:    -2
        });
    }

    /**
     * 主题脚本是否启用
     */
    get themeScriptEnable() {
        if (this.config.echolive.style.live_theme_script_enable && this.config.global.theme_script_enable) return true;
        return false;
    }

    /**
     * 初始化
     */
    init() {
        let urlName     = EchoLiveTools.getUrlParam('name');
        let urlColor    = EchoLiveTools.getUrlParam('color');
        if (urlName != null && urlName.search(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i) == -1) {
            this.custom.name = urlName.replace(/</g, '').replace(/>/g, '');
        }
        if (urlColor != null) this.custom.color = urlColor;
        
        window.addEventListener("error", (e) => {
            const msg       = e.error != null ? e.error.stack : e.message;
            const filename  = e.filename != '' ? e.filename : 'null';
            this.broadcast.error(msg, filename, e.lineno, e.colno);
        });
        // window.onerror = (message, source, line, col, error) => {
        //     this.broadcast.error(message, source, line, col);
        // };

        if (this.config.echolive.sleep.enable) {
            this.checkVisibility();
            document.addEventListener("visibilitychange", () => {
                this.checkVisibility();
            });
        }

        if (this.config.echo.print_speed != undefined) {
            this.echo.printSpeed        = this.config.echo.print_speed;
            this.echo.printSpeedStart   = this.config.echo.print_speed;
            this.echo.printSpeedChange  = this.config.echo.print_speed;
        }

        if (this.config.echolive.broadcast.enable) {
            this.broadcast = new EchoLiveBroadcastPortal(this.config.echolive.broadcast.channel, this, this.config);
            this.broadcast.on('shutdown', reason => this.shutdown(reason));
        } else if (this.config.echolive.messages_polling.enable) {
            this.start();
        }

        if (this.config.echolive.display.auto) this.setDisplayHiddenWaitTimer();
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
     * 检查对话框可见性
     */
    checkVisibility() {
        if (document.visibilityState === "visible") {
            this.hidden = false;
            if (this.broadcast != undefined) this.broadcast.pageVisible();
            if (this.timer.messagesPolling != EchoLive.NOT_ACTIVE_TIMER) {
                this.antiFlood = true;
                this.start();
            }
        } else {
            this.hidden = true;
            if (this.broadcast != undefined) this.broadcast.pageHidden();
            if (this.timer.messagesPolling != EchoLive.NOT_ACTIVE_TIMER) this.stop();
            if (this.echo.state != 'stop' && this.config.echolive.sleep.enable && this.config.echolive.sleep.during_printing_stop_print) {
                this.echo.stop();
                this.broadcast.echoStateUpdate('stop', this.echo.messageList.length);
            }
            if (this.config.echolive.display.auto) {
                this.clearDisplayHiddenWaitTimer();
                this.displayHiddenNow();
            }
        }
    }

    /**
     * 添加任务
     * @param {String} taskName 任务名称
     * @param {Object} taskData 任务数据
     * @param {Boolean} runNow 是否立即运行
     * @returns {Object} 任务信息
     */
    addTask(taskName = '', taskData = {}, runNow = true) {
        if (typeof taskName != 'string' || typeof taskData != 'object') return;

        let data = {
            id:     this.taskLastID++,
            name:   taskName,
            data:   taskData
        };
        let i = this.task.push(data);

        if (this.debug.taskLog) console.log(`[+] ADD TASK: ${taskName} (ID: ${data.id})`);

        // 烂活，得改
        if (taskName == 'display_show' && this.taskNow?.name == 'display_hidden') this.killTask();
        if (runNow && !this.taskRunning) this.runTask();

        return {
            index:  i,
            task:   data
        }
    }

    /**
     * 添加任务队列
     * @param {Array} taskList 任务列表
     */
    addTaskList(taskList = []) {
        if (!Array.isArray(taskList)) return;

        taskList.forEach(e => {
            if (typeof e == 'string') {
                this.addTask(e, {}, false);
            } else if (typeof e == 'object') {
                this.addTask(e?.name, e?.data, false);
            }
        });

        this.runTask();
    }

    /**
     * 运行任务
     */
    runTask() {
        if (this.taskRunning || this.task.length == 0) return;
        this.taskNow        = this.task.shift();
        this.taskRunning    = true;
        if (this.debug.taskLog) console.log(`[>] RUN TASK: ${this.taskNow.name} (ID: ${this.taskNow.id})`);

        switch (this.taskNow.name) {
            case 'display_hidden':
                this.displayHidden(this.taskNow.id);
                return;

            case 'display_show':
                this.displayShow(this.taskNow.id);
                return;

            case 'next':
                this.next();
                break;

            case 'send':
                this.send(this.taskNow.data);
                break;
        
            default:
                break;
        }

        this.endTask();
    }

    /**
     * 结束当前任务，尝试运行下一个任务
     * @param {Number} taskID 任务ID
     */
    endTask(taskID = EchoLive.NOW_TASK_ID) {
        this.killTask(taskID);
        if (this.task.length > 0) setTimeout(() => {
            this.runTask();
        }, 0);
    }

    /**
     * 清除任务
     * @param {Number} taskID 任务ID
     * @param {Boolean} force 是否强制清除
     */
    killTask(taskID = EchoLive.NOW_TASK_ID, force = false) {
        // 无效参数
        if (taskID <= EchoLive.INVALID_TASK_ID) return;

        // 检查所指定的任务ID与当前任务是否不匹配
        if (taskID != EchoLive.NOW_TASK_ID && taskID != this.taskNow.id) {
            // 不是强制执行则退出
            if (!force) return;

            // 查找任务列表中对应的任务并删除
            let i = this.task.findIndex(e => e?.id == taskID);
            if (i == EchoLive.NOW_TASK_ID) return;
            if (this.debug.taskLog) console.log(`[-] KILL TASK: ${this.task[i].name} (ID: ${taskID})`);
            this.task.splice(i, 1);
            return;
        }

        // 清除当前任务
        if (this.debug.taskLog) console.log(`[-] END TASK: ${this.taskNow.name} (ID: ${taskID})`);
        this.taskNow        = {};
        this.taskRunning    = false;
    }

    /**
     * 清空任务
     */
    clearTask() {
        this.killTask();
        this.task = [];
        if (this.debug.taskLog) console.log('[X] TASK CLEAR');
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
            this.data       = data;
            this.antiFlood  = false;
            return;
        }
        if (typeof this.data === 'object' && JSON.stringify(data) === JSON.stringify(this.data)) return;

        if (this.echo.state != 'stop') this.echo.stop();
        if (this.idle) {
            this.addTaskList([
                'display_show',
                {
                    name: 'send',
                    data: data
                }
            ]);
            return;
        }

        if (this.config.echolive.display.auto) this.clearDisplayHiddenWaitTimer();

        this.data = data;
        if (typeof data?.username === 'string') {
            this.username = data.username;
            $('#echo-live .name').html(data.username.replace(/ /g, '&ensp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        }
        if (Array.isArray(data?.messages)) this.echo.sendList(JSON.parse(JSON.stringify(data.messages)));
    }

    /**
     * 下一条对话
     */
    next() {
        if (this.hidden) return;
        if (this.echo.state != 'stop') this.echo.stop();
        if (this.idle) {
            this.addTaskList([
                'display_show',
                'next'
            ]);
            return;
        }
        if (this.config.echolive.display.auto) this.clearDisplayHiddenWaitTimer();
        this.echo.next();
    }

    /**
     * 重新加载
     */
    reload() {
        if (this.hidden) return;
        $('#start-script').remove();
        let s   = document.createElement('script');
        s.src   = `start.js`;
        s.id    = 'start-script';
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
        return this.theme.find((e) => e.name == name);
    }

    /**
     * 设置主题
     * @param {String} name 主题ID
     * @returns {String} 主题入口样式文件URL
     */
    setTheme(name) {
        const theme = this.findTheme(name);
        if (theme == undefined) return;

        this.event.themeScriptUnload();
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
     * 显示对话框
     * @param {Number} taskID 任务ID
     */
    displayShow(taskID = EchoLive.INVALID_TASK_ID) {
        if (!this.idle) return this.endTask(taskID);
        this.idle = false;
        this.event.displayShow(() => {
            this.endTask(taskID);
        });
    }

    /**
     * 隐藏对话框
     * @param {Number} taskID 任务ID
     */
    displayHidden(taskID = EchoLive.INVALID_TASK_ID) {
        if (this.idle) return this.endTask(taskID);
        this.idle = true;
        this.event.displayHidden(() => {
            this.endTask(taskID);
        });
    }

    /**
     * 立即隐藏对话框
     * @param {Number} taskID 任务ID
     */
    displayHiddenNow() {
        this.idle = true;
        this.event.displayHiddenNow();
    }

    clearDisplayHiddenWaitTimer() {
        clearTimeout(this.timer.displayHiddenWait);
    }

    setDisplayHiddenWaitTimer(time = 0) {
        this.clearDisplayHiddenWaitTimer();
        this.timer.displayHiddenWait = setTimeout(() => {
            this.addTask('display_hidden');
        }, Math.max(this.config.echolive.display.hidden_wait_time, time));
    }

    /**
     * 立即关闭
     * @param {String} reason 理由
     */
    shutdown(reason = undefined) {
        this.echo.stop();
        this.broadcast = undefined;
        this.timer.messagesPolling = EchoLive.NOT_ACTIVE_TIMER;
        this.clearDisplayHiddenWaitTimer();
        this.event.shutdown(reason);
    }
}