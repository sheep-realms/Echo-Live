class EchoLiveBroadcast {
    /**
     * Echo-Live 广播
     * @param {String} channel 频道名称
     * @param {Object} config 配置
     */
    constructor(channel = EchoLiveBroadcast.DEFAULT_CHANNEL, config = undefined) {
        this.uuid       = undefined;
        this.type       = EchoLiveBroadcast.TYPE_UNKNOWN;
        this.custom     = {
            name:       undefined,
            color:      undefined,
            data:       {}
        };
        this.broadcast  = new BroadcastChannel(channel);
        this.websocket  = undefined;
        this.targeted   = false;
        this.config     = config;
        this.isServer   = false;
        this.timer      = {};
        this.event      = {
            message:        function() {},
            error:          function() {},
            validMessage:   function() {}
        };
        this.listenCallbackDepth    = 0;
        this.listenCallback         = [];
        this.listenCallbackListener = [];

        this.init();
    }

    static {
        EchoLiveTools.defineObjectPropertyReadOnly(EchoLiveBroadcast, {
            API_NAME_BROADCAST_CLOSE:       'broadcast_close',
            API_NAME_CLOSE:                 'close',
            API_NAME_ECHO_NEXT:             'echo_next',
            API_NAME_ECHO_PRINTING:         'echo_printing',
            API_NAME_ECHO_STATE_UPDATE:     'echo_state_update',
            API_NAME_ERROR:                 'error',
            API_NAME_ERROR_UNKNOWN:         'error_unknown',
            API_NAME_HELLO:                 'hello',
            API_NAME_HISTORY_CLEAR:         'history_clear',
            API_NAME_LIVE_DISPLAY_UPDATE:   'live_display_update',
            API_NAME_MESSAGE_DATA:          'message_data',
            API_NAME_PAGE_HIDDEN:           'page_hidden',
            API_NAME_PAGE_VISIBLE:          'page_visible',
            API_NAME_PING:                  'ping',
            API_NAME_SET_LIVE_DISPLAY:      'set_live_display',
            API_NAME_SET_THEME:             'set_theme',
            API_NAME_SET_THEME_STYLE_URL:   'set_theme_style_url',
            API_NAME_SHUTDOWN:              'shutdown',
            API_NAME_WEBSOCKET_CLOSE:       'websocket_close',

            DEFAULT_CHANNEL: 'sheep-realms:echolive',

            TARGET_SERVER:              '@__server',
            TARGET_WEBSOCKET_SERVER:    '@__ws_server',

            TYPE_CLIENT:    'client',
            TYPE_HISTORY:   'history',
            TYPE_PORTAL:    'live',
            TYPE_SERVER:    'server',
            TYPE_UNKNOWN:   'unknown'
        });
    }

    // 是否有自定义识别信息
    get hasCustom() {
        return this.custom.name !== undefined || this.custom.color !== undefined || JSON.stringify(this.custom.data) !== '{}';
    }

    /**
     * 广播初始化
     */
    init() {
        this.listen();
    }

    /**
     * 开始侦听
     */
    listen() {
        this.broadcast.onmessage = (e) => {
            this.getData(e.data);
        };
    }

    /**
     * 设置侦听回调函数
     * @param {Number} depth 调用深度
     * @param {Function} action 回调函数
     * @param {Object} listener 监听对象
     * @returns
     */
    setListenCallback(depth = 0, listener = this, action = function() {}) {
        this.listenCallbackListener[depth] = listener;
        return this.listenCallback[depth] = action;
    }

    /**
     * 运行侦听回调函数
     * @param {Object} data 数据
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    runListenCallback(data, listener = this) {
        let func = this.listenCallback[++this.listenCallbackDepth];
        if (func === undefined) return;
        func(data, this.listenCallbackListener[listener.depth]);
    }

    /**
     * 绑定事件
     * @param {String} eventName 事件名称
     * @param {Function} action 函数
     * @returns {Function} 绑定的函数
     */
    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    /**
     * 获取自身识别名
     * @returns {String} 识别名
     */
    getName() {
        if (this.custom.name === undefined || this.custom.name === '') return this.uuid;
        return this.custom.name;
    }

    /**
     * 设置自身识别名
     * @param {String} value 识别名
     * @returns {String|undefined} 已设置的识别名
     */
    setName(value) {
        if (typeof value != 'string' || value === '') return;
        if (value.startsWith('__')) return;
        this.custom.name = value;
        return this.custom.name;
    }

    /**
     * 发送数据
     * @param {Object} data 数据
     * @param {String} action 动作类型
     * @param {String} target 目标
     * @returns {Object} 发送的数据
     */
    sendData(data = {}, action = EchoLiveBroadcast.API_NAME_MESSAGE_DATA, target = undefined) {
        let d = {
            action: action,
            target: target,
            from: {
                name:       this.getName(),
                uuid:       this.uuid,
                type:       this.type,
                timestamp:  new Date().getTime()
            },
            data:   data
        };

        if (this.isServer && target === undefined) {
            let r = this.clients.filter(e => e.target !== 'none');
            if (r.length > 0) {
                d.target = [];
                r.forEach(e => {
                    d.target.push(
                        e.name === e.uuid
                        ? `${
                            e.target === 'not' ? '-' : ''
                        }${ e.uuid }`
                        : `${
                            e.target === 'not' ? '-' : ''
                        }@${ e.name }`
                    );
                });
                if (d.target.length === 1) d.target = d.target[0];
            }
        }

        this.broadcast.postMessage(d);
        if (this.websocket !== undefined) {
            try {
                this.websocket.send(JSON.stringify(d));
            } catch (error) {
                // TODO：在这里抛出异常
            }
        }
        return d;
    }

    checkTargetIsSelf(target, isTargeted = false) {
        if (!Array.isArray(target)) target = [target];
        let globalHasNOT = false;
        let globalHasOther = false;
        for (let i = 0; i < target.length; i++) {
            let e = target[i];
            let isNOT = false;
            let inPublic = false;
            if (typeof e === 'string' && e.startsWith('-')) {
                isNOT = true;
                globalHasNOT = true;
                e = e.substring(1);
            }
            if (e === undefined || e === null) {
                if (target.length > 1) {
                    continue;
                } else {
                    return isTargeted ? false : true;
                }
            } else if (typeof e === 'string' && e.startsWith('@')) {
                if (e.startsWith('__', 1)) {
                    if (!this.targetTypeCheck(e.substring(3))) {
                        inPublic = true;
                        globalHasOther = !isNOT || globalHasOther;
                        continue;
                    }
                } else if (e.substring(1) !== this.custom.name) {
                    globalHasOther = !isNOT || globalHasOther;
                    continue;
                }
            } else if (e !== undefined && e !== this.uuid) {
                globalHasOther = !isNOT || globalHasOther;
                continue;
            }
            if (inPublic && isTargeted) continue;
            return true && !isNOT;
        }
        if (isTargeted) return false;
        if (globalHasNOT) return !globalHasOther;
        return false;
    }

    /**
     * 接收数据
     * @param {Object} data 数据
     */
    getData(data) {
        if (typeof data != 'object') return;
        this.listenCallbackDepth = 0;
        if (data?.from?.uuid === this.uuid) return;

        this.event.message(data);
        if (
            !this.checkTargetIsSelf(
                data.target,
                data.action === EchoLiveBroadcast.API_NAME_PING && !this.isServer ? false : this.targeted
            )
        ) return;
        this.event.validMessage(data);

        if (data.action === EchoLiveBroadcast.API_NAME_ERROR) this.event.error(data);

        this.runListenCallback(data);
    }

    /**
     * 发送错误报告
     * @param {String} name 错误类型
     * @param {Object} data 附加数据
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendError(name = '', data = {}, target = undefined) {
        return this.sendData({
            name: name,
            ...data
        }, EchoLiveBroadcast.API_NAME_ERROR, target);
    }

    /**
     * 目标类型检查
     * @param {String} type 终端类型
     * @returns {Boolean} 结果
     */
    targetTypeCheck(type) {
        return false;
    }

    /**
     * 检查是否启用了实验性 API
     * @param {String} apiName API 名称，仅用于抛出异常
     * @returns {Boolean} 结果
     */
    experimentalAPICheck(apiName) {
        if (!this.config.echolive.broadcast.experimental_api_enable) {
            // TODO: 在这里抛出异常
        }

        return this.config.echolive.broadcast.experimental_api_enable;
    }
}



class EchoLiveBroadcastServer extends EchoLiveBroadcast {
    /**
     * Echo-Live 广播服务器
     * @param {String} channel 频道名称
     * @param {Object} config 配置
     * @param {Object} initData 初始化数据
     * @param {Boolean} initData.noPing 不发送 ping 消息
     */
    constructor(channel = EchoLiveBroadcast.DEFAULT_CHANNEL, config = undefined, initData = {}) {
        super(channel, config);
        this.type       = EchoLiveBroadcast.TYPE_SERVER;
        this.isServer   = true;
        this.websocket                  = undefined;
        this.websocketReconnectCount    = 0;
        this.websocketClosed            = false;
        this.clients    = [];
        this.timer      = {
            noClient:   -1
        }
        this.stateFlag  = {
            noClientChecked: false
        };
        this.event      = {
            ...this.event,
            clientsChange:          function() {},
            nameDuplicate:          function() {},
            noClient:               function() {},
            websocketConnectClose:  function() {},
            websocketConnectOpen:   function() {},
            websocketConnectError:  function() {},
            websocketMessageError:  function() {},
        };
        this.depth      = 1;

        this.initServer(initData);
    }

    /**
     * 服务端初始化
     */
    initServer(data = {}) {
        data = {
            noPing: false,
            ...data
        };
        
        this.setListenCallback(1, this, this.getDataServer);

        this.uuid = EchoLiveTools.getUUID();
        if (!data.noPing) this.ping();

        if (this.config.editor.websocket.enable) {
            this.websocketConnect();
        }
    }

    __readWebsocketMessage(message) {
        try {
            this.getData(JSON.parse(message));
        } catch (error) {
            this.event.websocketMessageError();
        }
    }

    get websocketUrl() {
        if (!this.config.editor.websocket.auto_url) return this.config.editor.websocket.url;
        if (location.protocol !== 'http:' && location.protocol !== 'https:') return this.config.editor.websocket.url;
        return 'ws://' + location.host;
    }

    /**
     * 连接 WebSocket 服务器
     */
    websocketConnect() {
        this.websocketClosed    = false;
        this.websocket          = new WebSocket(this.websocketUrl);

        this.websocket.addEventListener('open', (e) => {
            this.websocket.addEventListener('close', (e) => {
                this.websocket = undefined;
                this.websocketReconnect();
            });

            this.websocketReconnectCount = 0;
            this.event.websocketConnectOpen({
                url: this.websocketUrl,
                uuid: this.uuid
            });
            this.ping();
        });

        this.websocket.addEventListener('message', (e) => {
            if (e.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.__readWebsocketMessage(reader.result);
                };
                reader.readAsText(e.data);
            } else {
                this.__readWebsocketMessage(e.data);
            }
        });

        this.websocket.addEventListener('error', (e) => {
            this.websocket = undefined;
            this.websocketReconnect();
        });

        return this.websocket;
    }

    /**
     * 重新连接 WebSocket 服务器
     */
    websocketReconnect() {
        if (this.websocketClosed) return;

        if (this.websocketReconnectCount >= this.config.editor.websocket.reconnect_limit) {
            this.event.websocketConnectError({
                url:            this.websocketUrl,
                tryReconnect:   false,
                reconnectCount: this.websocketReconnectCount
            });
            return;
        }

        this.websocketReconnectCount++;

        this.event.websocketConnectError({
            url:            this.websocketUrl,
            tryReconnect:   true,
            reconnectCount: this.websocketReconnectCount
        });
        
        this.websocketConnect();
    }

    /**
     * 关闭 WebSocket 连接
     */
    websocketClose() {
        if (this.websocket === undefined) return;
        this.event.websocketConnectClose({
            url: this.websocketUrl,
        });
        this.websocketClosed    = true;
        this.websocket.close();
        this.websocket          = undefined;
    }

    /**
     * 发送 ping 消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    ping(target = undefined) {
        let that = this;
        if (!this.stateFlag.noClientChecked) {
            this.timer.noClient = setTimeout(function() {
                that.event.noClient();
            }, 5000);
            this.stateFlag.noClientChecked = true;
        }

        return this.sendData({}, EchoLiveBroadcast.API_NAME_PING, target);
    }

    /**
     * 发送命令：播放下一条消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendNext(target = undefined) {
        return this.sendData({}, EchoLiveBroadcast.API_NAME_ECHO_NEXT, target);
    }

    /**
     * 设置客户端休眠状态
     * @param {String} uuid UUID 
     * @param {Boolean} value 是否休眠中
     * @returns {Boolean} 结果
     */
    setClientHidden(uuid, value) {
        let i = this.clients.findIndex(function(e) {
            return e.uuid === uuid;
        });
        if (i === -1) return;
        let r = this.clients[i].hidden = value;
        this.event.clientsChange(this.clients);
        return r;
    }

    /**
     * 设置对话框客户端 Echo 状态
     * @param {String} uuid UUID 
     * @param {String} echoState Echo 状态 
     * @param {String} messagesCount 剩余消息数 
     * @returns {Boolean} 结果
     */
    setEchoState(uuid, echoState = 'stop', messagesCount = 0) {
        let i = this.clients.findIndex(function(e) {
            return e.uuid === uuid;
        });
        if (i === -1) return;
        let r = this.clients[i] = {
            ...this.clients[i],
            echoState:      echoState,
            messagesCount:  messagesCount
        };
        this.event.clientsChange(this.clients);
        return r;
    }

    /**
     * 发送命令：设置对话框显示状态
     * @param {Boolean} display 显示状态
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendLiveDisplay(display, target = undefined) {
        return this.sendData({
            display: display
        }, EchoLiveBroadcast.API_NAME_SET_LIVE_DISPLAY, target);
    }

    /**
     * 发送命令：清空历史记录
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendHistoryClear(target = undefined) {
        return this.sendData({}, EchoLiveBroadcast.API_NAME_HISTORY_CLEAR, target);
    }

    /**
     * 发送命令：设置主题样式文件 URL
     * @param {String} url URL
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendThemeStyleUrl(url, target = undefined) {
        return this.sendData({
            url: url
        }, EchoLiveBroadcast.API_NAME_SET_THEME_STYLE_URL, target);
    }

    /**
     * 发送命令：设置主题
     * @param {String} name 主题名称
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendTheme(name, target = undefined) {
        return this.sendData({
            name: name
        }, EchoLiveBroadcast.API_NAME_SET_THEME, target);
    }

    /**
     * 发送命令：关闭广播连接
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendBroadcastClose(target = undefined) {
        return this.sendData({}, EchoLiveBroadcast.API_NAME_BROADCAST_CLOSE, target);
    }

    /**
     * 发送命令：关闭 Websocket 连接
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendWebsocketClose(target = undefined) {
        return this.sendData({}, EchoLiveBroadcast.API_NAME_WEBSOCKET_CLOSE, target);
    }

    /**
     * 发送命令：立即关闭
     * @param {String} reason 理由
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendShutdown(reason = undefined, target = undefined) {
        return this.sendData({
            reason: reason
        }, EchoLiveBroadcast.API_NAME_SHUTDOWN, target);
    }

    /**
     * 新增客户端
     * @param {Object} data 客户端数据
     * @param {String} data.uuid UUID
     * @param {String} data.name 识别名
     * @param {String} data.type 客户端类型
     * @param {Boolean} data.hidden 是否休眠中
     * @param {Boolean} data.targeted 是否仅接收定向广播
     * @returns {Object} 登记的数据
     */
    addClient(data) {
        data = {
            uuid: undefined,
            name: undefined,
            type: 'client',
            hidden: false,
            targeted: false,
            ...data,
            target: 'none'
        }
        if (data.uuid === undefined) return;
        if (data.name === undefined) data.name = data.uuid;

        let i = this.clients.findIndex(function(e) {
            return e.uuid === data.uuid;
        });
        if (i !== -1) return;
        clearTimeout(this.timer.noClient);

        let f = this.clients.filter(function(e) {
            return e.name === data.name || e.uuid === data.name;
        });

        if (
            !this.config.advanced.broadcast.allow_name_duplicate
            && !this.config.editor.websocket.enable
            && f.length > 0
        ) {
            this.event.nameDuplicate(data.name, data.uuid);
            return this.sendBroadcastClose(data.uuid);
        }

        if (data.type === 'live') data = {
            ...data,
            echoState:      'stop',
            messagesCount:  0
        };

        this.clients.push(data);
        this.event.clientsChange(this.clients);
        return data; 
    }

    /**
     * 移除客户端
     * @param {String} uuid UUID
     * @returns {Object} 登记的数据
     */
    removeClient(uuid) {
        if (!this.isServer) return;
        let i = this.clients.findIndex(function(e) {
            return e.uuid === uuid;
        });
        if (i === -1) return;
        let r = this.clients.splice(i, 1);
        this.event.clientsChange(this.clients);
        return r;
    }

    /**
     * 设置投递客户端
     * @param {String} name 客户端识别名
     * @param {'none'|'yes'|'not'} value 状态
     * @returns {Object} 客户端数据
     */
    setClientTarget(name, value = true) {
        if (!this.isServer) return;
        if (typeof value === 'boolean') {
            if (value) {
                value = 'yes';
            } else {
                value = 'none';
            }
        }
        if (typeof value !== 'string') return;
        let i = this.clients.findIndex(function(e) {
            return e.name === name;
        });
        if (i === -1) return;
        this.clients[i].target = value;
        this.event.clientsChange(this.clients);
        return this.clients[i];
    }

    /**
     * 目标类型检查
     * @param {String} type 终端类型
     * @returns {Boolean} 结果
     */
    targetTypeCheck(type) {
        return type === EchoLiveBroadcast.TYPE_SERVER;
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataServer(data, listener = this) {
        switch (data.action) {
            case EchoLiveBroadcast.API_NAME_HELLO:
                listener.addClient({...data.from, ...data.data});
                break;

            case EchoLiveBroadcast.API_NAME_ECHO_STATE_UPDATE:
                listener.setEchoState(data.from?.uuid, data.data?.state, data.data?.messagesCount);
                break;

            case EchoLiveBroadcast.API_NAME_CLOSE:
                listener.removeClient(data.from?.uuid);
                break;

            case EchoLiveBroadcast.API_NAME_PAGE_HIDDEN:
                listener.setClientHidden(data.from?.uuid, true);
                break;

            case EchoLiveBroadcast.API_NAME_PAGE_VISIBLE:
                listener.setClientHidden(data.from?.uuid, false);
                break;
        
            default:
                listener.runListenCallback(data, listener);
                break;
        }
    }
}



class EchoLiveBroadcastClient extends EchoLiveBroadcast {
    /**
     * Echo-Live 广播客户端
     * @param {String} channel 频道名称
     * @param {'live'|'history'} clientType 客户端类型
     * @param {Object} config 配置
     */
    constructor(channel = EchoLiveBroadcast.DEFAULT_CHANNEL, clientType = EchoLiveBroadcast.TYPE_CLIENT, config = undefined) {
        super(channel, config);
        this.type       = clientType;
        this.isServer   = false;
        this.websocket                  = undefined;
        this.websocketReconnectCount    = 0;
        this.websocketClosed            = false;
        this.timer      = {};
        this.stateFlag  = {
            onWindowClose: false
        };
        this.event      = {
            ...this.event,
            shutdown:       function() {},
            websocketClose: function() {}
        };
        this.depth      = 1;

        this.initClient();
    }

    /**
     * 客户端初始化
     */
    initClient() {
        this.setListenCallback(1, this, this.getDataClient);

        window.onbeforeunload = () => {
            this.stateFlag.onWindowClose - true;
            this.close();
        };

        if (this.config.echolive.broadcast.websocket_enable) {
            this.websocketConnect();
        }
    }

    __readWebsocketMessage(message) {
        try {
            this.getData(JSON.parse(message));
        } catch (error) {
            this.sendError('websocket_message_error');
        }
    }

    /**
     * 连接 WebSocket 服务器
     */
    websocketConnect() {
        this.websocketClosed    = false;
        this.websocket          = new WebSocket(this.config.echolive.broadcast.websocket_url);

        this.websocket.addEventListener('open', (e) => {
            this.websocket.addEventListener('close', (e) => {
                this.websocket = undefined;
                this.event.websocketClose(e);
                this.websocketReconnect();
            });

            this.websocketReconnectCount = 0;
            this.sendHello();
        });

        this.websocket.addEventListener('message', (e) => {
            if (e.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.__readWebsocketMessage(reader.result);
                };
                reader.readAsText(e.data);
            } else {
                this.__readWebsocketMessage(e.data);
            }
        });

        this.websocket.addEventListener('error', (e) => {
            this.websocket = undefined;
            this.websocketReconnect();
        });

        return this.websocket;
    }

    /**
     * 重新连接 WebSocket 服务器
     */
    websocketReconnect() {
        if (this.websocketClosed) return;

        if (this.websocketReconnectCount >= this.config.echolive.broadcast.websocket_reconnect_limit) {
            this.sendError('websocket_error', {
                url:            this.config.echolive.broadcast.websocket_url,
                tryReconnect:   false,
                reconnectCount: this.websocketReconnectCount
            });
            return;
        }

        this.websocketReconnectCount++;

        this.sendError('websocket_error', {
            url:            this.config.echolive.broadcast.websocket_url,
            tryReconnect:   true,
            reconnectCount: this.websocketReconnectCount
        });
        
        this.websocketConnect();
    }

    /**
     * 关闭 WebSocket 连接
     */
    websocketClose() {
        if (this.websocket === undefined) return;
        this.websocketClosed    = true;
        this.websocket.close();
        this.websocket          = undefined;
    }

    /**
     * 发送 HELLO 消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendHello(target = undefined) {
        return this.sendData({
            hidden: this.echolive.hidden,
            targeted: this.targeted
        }, EchoLiveBroadcast.API_NAME_HELLO, target);
    }

    /**
     * 发送消息：已休眠
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    pageHidden(target = undefined) {
        if (this.stateFlag.onWindowClose) return;
        return this.sendData({}, EchoLiveBroadcast.API_NAME_PAGE_HIDDEN, target);
    }

    /**
     * 发送消息：已激活
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    pageVisible(target = undefined) {
        if (this.stateFlag.onWindowClose) return;
        return this.sendData({}, EchoLiveBroadcast.API_NAME_PAGE_VISIBLE, target);
    }

    /**
     * 发送消息：关闭广播连接
     * @returns {Object} 发送的消息
     */
    close() {
        this.sendData({}, EchoLiveBroadcast.API_NAME_CLOSE);
        return this.broadcast.close();
    }

    /**
     * 发送错误报告
     * @param {String} message 错误消息
     * @param {String} source 源文件名
     * @param {Number} line 行号
     * @param {Number} col 列号
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    error(message, source, line, col, target = undefined) {
        return this.sendData({
            name:       this.getName(),
            message:    message,
            source:     source,
            line:       line,
            col:        col
        }, EchoLiveBroadcast.API_NAME_ERROR_UNKNOWN, target);
    }

    /**
     * 目标类型检查
     * @param {String} type 终端类型
     * @returns {Boolean} 结果
     */
    targetTypeCheck(type) {
        return !(type !== EchoLiveBroadcast.TYPE_CLIENT && type !== this.type);
    }

    /**
     * 立即关闭
     * @param {String} reason 理由
     */
    shutdown(reason = undefined) {
        this.close();
        this.websocketClose();
        this.broadcast.close();
        this.broadcast = undefined;
        this.event.shutdown(reason);
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataClient(data, listener = this) {
        switch (data.action) {
            case EchoLiveBroadcast.API_NAME_PING:
                listener.sendHello(data.from?.uuid);
                break;

            case EchoLiveBroadcast.API_NAME_BROADCAST_CLOSE:
                listener.close();
                break;

            case EchoLiveBroadcast.API_NAME_WEBSOCKET_CLOSE:
                listener.websocketClose();
                break;

            case EchoLiveBroadcast.API_NAME_SHUTDOWN:
                listener.shutdown(data.data?.reason);
                break;
        
            default:
                listener.runListenCallback(data, listener);
                break;
        }
    }
}



class EchoLiveBroadcastPortal extends EchoLiveBroadcastClient {
    /**
     * Echo-Live 广播客户端：对话框
     * @param {String} channel 频道名称
     * @param {EchoLive} echolive Echo-Live 实例
     * @param {Object} config 配置
     */
    constructor(channel = EchoLiveBroadcast.DEFAULT_CHANNEL, echolive = undefined, config = undefined) {
        super(channel, EchoLiveBroadcast.TYPE_PORTAL, config);
        this.echolive   = echolive;
        this.uuid       = this.echolive.uuid;
        this.isServer   = false;
        this.targeted   = echolive.targeted;
        this.timer      = {};
        // this.event = {};
        this.depth      = 2;

        this.initPortal();
    }

    /**
     * 对话框客户端初始化
     */
    initPortal() {
        if (this.config === undefined) this.config = this.echolive.config;

        if (this.echolive.custom.name !== undefined) this.setName(this.echolive.custom.name);

        this.setListenCallback(2, this, this.getDataPortal);

        this.sendHello();
    }

    /**
     * 设置主题样式文件 URL
     * @param {String} url URL
     * @returns {String} 设置的 URL
     */
    setThemeStyleUrl(url) {
        if (this.isServer) return;
        if (!this.experimentalAPICheck(EchoLiveBroadcast.API_NAME_SET_THEME_STYLE_URL)) return;
        return this.echolive.setThemeStyleUrl(url);
    }

    /**
     * 设置主题
     * @param {String} name 主题名称
     * @returns {String} 设置的主题
     */
    setTheme(name) {
        if (this.isServer) return;
        return this.echolive.setTheme(name);
    }

    /**
     * Echo 状态更新广播
     * @param {'ready'|'play'|'stop'} state 状态名称
     * @param {String} target 发送目标
     * @param {Number} messagesCount 剩余消息数
     * @returns {Object} 发送的消息
     */
    echoStateUpdate(state, messagesCount = 0, target = undefined) {
        return this.sendData({
            state:          state,
            messagesCount:  messagesCount
        }, EchoLiveBroadcast.API_NAME_ECHO_STATE_UPDATE, target);
    }

    /**
     * 显示状态更新广播
     * @param {Boolean} display 显示状态
     * @param {String} target 发送目标
     */
    displayUpdate(display, target = undefined) {
        return this.sendData({
            display: display
        }, EchoLiveBroadcast.API_NAME_LIVE_DISPLAY_UPDATE, target);
    }

    /**
     * Echo 打印内容广播
     * @param {String} username 
     * @param {String|Object|Array} message 
     * @param {String} target 发送的消息
     * @returns 
     */
    echoPrinting(username, message, target = undefined) {
        return this.sendData({
            username:   username,
            message:    message
        }, EchoLiveBroadcast.API_NAME_ECHO_PRINTING, target);
    }

    /**
     * 设置显示状态
     * @param {Boolean} display 显示状态
     */
    setDisplay(display) {
        if (display) return this.echolive.addTask('display_show');
        return this.echolive.addTask('display_hidden');
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataPortal(data, listener = this) {
        switch (data.action) {
            case EchoLiveBroadcast.API_NAME_MESSAGE_DATA:
                listener.echolive.send(data.data);
                break;

            case EchoLiveBroadcast.API_NAME_ECHO_NEXT:
                listener.echolive.next();
                break;

            case EchoLiveBroadcast.API_NAME_SET_LIVE_DISPLAY:
                listener.setDisplay(data.data?.display);
                break;

            case EchoLiveBroadcast.API_NAME_SET_THEME_STYLE_URL:
                listener.setThemeStyleUrl(data.data?.url);
                break;

            case EchoLiveBroadcast.API_NAME_SET_THEME:
                listener.setTheme(data.data?.name);
                break;
        
            default:
                break;
        }
    }
}



class EchoLiveBroadcastHistory extends EchoLiveBroadcastClient {
    /**
     * Echo-Live 广播客户端：对话框
     * @param {String} channel 频道名称
     * @param {EchoLiveHistory} echoLiveHistory Echo-Live 历史记录实例
     * @param {Object} config 配置
     */
    constructor(channel = EchoLiveBroadcast.DEFAULT_CHANNEL, echoLiveHistory = undefined, config = {}) {
        super(channel, EchoLiveBroadcast.TYPE_HISTORY, config);
        this.echoLiveHistory = echoLiveHistory;
        this.uuid       = this.echoLiveHistory.uuid;
        this.isServer   = false;
        this.timer      = {};
        // this.event = {};
        this.event      = {
            ...this.event,
            newHistory: function() {}
        };
        this.depth      = 2;

        this.initHistory();
    }

    /**
     * 历史记录客户端初始化
     */
    initHistory() {
        if (this.config === undefined) this.config = this.echoLiveHistory.config;

        this.setListenCallback(2, this, this.getDataHistory);

        this.sendHello();
    }

    /**
     * 发送 HELLO 消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendHello(target = undefined) {
        return this.sendData({
            hidden: undefined
        }, EchoLiveBroadcast.API_NAME_HELLO, target);
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataHistory(data, listener = this) {
        switch (data.action) {
            case EchoLiveBroadcast.API_NAME_ECHO_PRINTING:
                listener.echoLiveHistory.send({
                    username:   data.data?.username,
                    message:    data.data?.message
                });
                break;

            case EchoLiveBroadcast.API_NAME_HISTORY_CLEAR:
                listener.echoLiveHistory.clear();
                break;

            case EchoLiveBroadcast.API_NAME_LIVE_DISPLAY_UPDATE:
                if (
                    listener.config.history.message.live_display_hidden_latest_message_show &&
                    !data.data?.display
                ) listener.echoLiveHistory.changeLatestHistoryDisplay(true);
                break;
        
            default:
                break;
        }
    }
}