class EchoLiveBroadcast {
    /**
     * Echo-Live 广播
     * @param {String} channel 频道名称
     * @param {Object} config 配置
     */
    constructor(channel = 'sheep-realms:echolive', config = undefined) {
        this.uuid = undefined;
        this.type = 'unknow';
        this.broadcast = new BroadcastChannel(channel);
        this.websocket = undefined;
        this.config = config;
        this.isServer = false;
        this.timer = {};
        this.event = {
            message: function() {},
            error: function() {}
        };
        this.listenCallbackDepth = 0;
        this.listenCallback = [];
        this.listenCallbackListener = [];

        this.init();
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
     */
    runListenCallback(data, listener = this) {
        let func = this.listenCallback[++this.listenCallbackDepth];
        if (func == undefined) return;
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
     * 发送数据
     * @param {Object} data 数据
     * @param {String} action 动作类型
     * @param {String} target 目标
     * @returns {Object} 发送的数据
     */
    sendData(data = {}, action = 'message_data', target = undefined) {
        let d = {
            action: action,
            target: target,
            type: this.type,
            data: data
        };

        this.broadcast.postMessage(d);
        if (target === '@__server' && this.websocket != undefined) {
            try {
                this.websocket.send(JSON.stringify(d));
            } catch (error) {
                // TODO：在这里抛出异常
            }
        }
        return d;
    }

    /**
     * 接收数据
     * @param {Object} data 数据
     */
    getData(data) {
        if (typeof data != 'object') return;
        this.listenCallbackDepth = 0;
        this.event.message(data);
        // console.log(data);

        if (data.target != undefined && data.target != this.uuid) return;

        if (data.action == 'error') this.event.error(data);

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
            uuid: this.uuid,
            ...data
        }, 'error', target);
    }

    /**
     * 检查是否启用了实验性 API
     * @param {String} apiName API 名称，仅用于抛出异常
     * @returns 
     */
    experimentalAPICheck(apiName) {
        if (!this.echolive.config.echolive.experimental_api_enable) {
            // TODO: 在这里抛出异常
        }

        return this.echolive.config.echolive.experimental_api_enable;
    }
}



class EchoLiveBroadcastServer extends EchoLiveBroadcast {
    /**
     * Echo-Live 广播服务器
     * @param {String} channel 频道名称
     * @param {Object} config 配置
     */
    constructor(channel = 'sheep-realms:echolive', config = undefined) {
        super(channel, config);
        this.type = 'server';
        this.isServer = true;
        this.clients = [];
        this.timer = {
            noClient: -1
        }
        this.event = {
            ...this.event,
            clientsChange: function() {},
            noClient: function() {}
        };
        this.depth = 1;

        this.initServer();
    }

    /**
     * 服务端初始化
     */
    initServer() {
        this.setListenCallback(1, this, this.getDataServer);

        this.uuid = EchoLiveTools.getUUID();
        this.ping();
    }

    /**
     * 发送 ping 消息
     * @returns {Object} 发送的消息
     */
    ping() {
        let that = this;
        this.timer.noClient = setTimeout(function() {
            that.event.noClient();
        }, 5000)

        return this.sendData({
            uuid: this.uuid
        }, 'ping');
    }

    /**
     * 发送命令：播放下一条消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendNext(target = undefined) {
        return this.sendData({}, 'echo_next', target);
    }

    /**
     * 设置客户端休眠状态
     * @param {String} uuid UUID 
     * @param {Boolean} value 是否休眠中
     * @returns {Boolean} 结果
     */
    setClientHidden(uuid, value) {
        let i = this.clients.findIndex(function(e) {
            return e.uuid == uuid;
        });
        if (i == -1) return;
        let r = this.clients[i].hidden = value;
        this.event.clientsChange(this.clients);
        return r;
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
        }, 'set_theme_style_url', target);
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
        }, 'set_theme', target);
    }

    /**
     * 发送命令：关闭 Websocket 连接
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendWebsocketClose(target = undefined) {
        return this.sendData({}, 'websocket_close', target);
    }

    /**
     * 新增客户端
     * @param {String} uuid UUID
     * @param {String} type 客户端类型
     * @param {Boolean} hidden 是否休眠中
     * @returns {Object} 登记的数据
     */
    addClient(uuid, type = undefined, hidden = false) {
        if (!this.isServer) return;
        let i = this.clients.findIndex(function(e) {
            return e.uuid == uuid;
        });
        if (i != -1) return;
        clearTimeout(this.timer.noClient);

        let r = this.clients.push({
            uuid: uuid,
            type: type ? type : 'client',
            hidden: hidden
        });
        this.event.clientsChange(this.clients);
        return r; 
    }

    /**
     * 移除客户端
     * @param {String} uuid UUID
     * @returns {Object} 登记的数据
     */
    removeClient(uuid) {
        if (!this.isServer) return;
        let i = this.clients.findIndex(function(e) {
            return e.uuid == uuid;
        });
        if (i == -1) return;
        let r = this.clients.splice(i, 1);
        this.event.clientsChange(this.clients);
        return r;
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataServer(data, listener = this) {
        switch (data.action) {
            case 'hello':
                listener.addClient(data.data.uuid, data.type, data.data?.hidden);
                break;

            case 'close':
                listener.removeClient(data.data.uuid);
                break;

            case 'page_hidden':
                listener.setClientHidden(data.data.uuid, true);
                break;

            case 'page_visible':
                listener.setClientHidden(data.data.uuid, false);
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
    constructor(channel = 'sheep-realms:echolive', clientType = 'client', config = undefined) {
        super(channel, config);
        this.type = clientType;
        this.isServer = false;
        this.websocket = undefined;
        this.websocketReconnectCount = 0;
        this.websocketClosed = false;
        this.timer = {};
        this.event = {
            ...this.event,
            websocketClose: function() {}
        };
        this.depth = 1;

        this.initClient();
    }

    /**
     * 客户端初始化
     */
    initClient() {
        this.setListenCallback(1, this, this.getDataClient);

        window.onunload = () => {
            this.close();
        };

        if (this.config.echolive.websocket_enable) {
            this.websocketConnect();
        }
    }

    /**
     * 连接 WebSocket 服务器
     */
    websocketConnect() {
        this.websocketClosed = false;
        this.websocket = new WebSocket(this.config.echolive.websocket_url);

        this.websocket.addEventListener('open', (e) => {
            this.websocket.addEventListener('close', (e) => {
                this.websocket = undefined;
                this.event.websocketClose(e);
                this.websocketReconnect();
            });

            this.websocketReconnectCount = 0;
            this.sendHello('@__server');
        });

        this.websocket.addEventListener('message', (e) => {
            try {
                this.getData(JSON.parse(e.data));
            } catch (error) {
                this.sendError('websocket_message_error');
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

        if (this.websocketReconnectCount >= this.config.echolive.websocket_reconnect_limit) {
            this.sendError('websocket_error', {
                url: this.config.echolive.websocket_url,
                tryReconnect: false,
                reconnectCount: this.websocketReconnectCount
            });
            return;
        }

        this.websocketReconnectCount++;

        this.sendError('websocket_error', {
            url: this.config.echolive.websocket_url,
            tryReconnect: true,
            reconnectCount: this.websocketReconnectCount
        });
        
        this.websocketConnect();
    }

    /**
     * 关闭 WebSocket 连接
     */
    websocketClose() {
        if (this.websocket == undefined) return;
        this.websocketClosed = true;
        this.websocket.close();
        this.websocket = undefined;
    }

    /**
     * 发送 HELLO 消息
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    sendHello(target = undefined) {
        return this.sendData({
            uuid: this.uuid,
            hidden: this.echolive.hidden
        }, 'hello', target);
    }

    /**
     * 发送消息：已休眠
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    pageHidden(target = undefined) {
        return this.sendData({
            uuid: this.uuid
        }, 'page_hidden', target);
    }

    /**
     * 发送消息：已激活
     * @param {String} target 发送目标
     * @returns {Object} 发送的消息
     */
    pageVisible(target = undefined) {
        return this.sendData({
            uuid: this.uuid
        }, 'page_visible', target);
    }

    /**
     * 发送消息：关闭广播连接
     * @returns {Object} 发送的消息
     */
    close() {
        this.sendData({
            uuid: this.uuid
        }, 'close');
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
            uuid: this.uuid,
            message: message,
            source: source,
            line: line,
            col: col
        }, 'error', target);
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataClient(data, listener = this) {
        switch (data.action) {
            case 'ping':
                listener.sendHello(data.data?.uuid);
                break;

            case 'websocket_close':
                listener.websocketClose();
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
    constructor(channel = 'sheep-realms:echolive', echolive = undefined, config = undefined) {
        super(channel, 'live', config);
        this.echolive = echolive;
        this.uuid = this.echolive.uuid;
        this.isServer = false;
        this.timer = {};
        // this.event = {};
        this.depth = 2;

        this.initPortal();
    }

    /**
     * 对话框客户端初始化
     */
    initPortal() {
        if (this.config == undefined) this.config = this.echolive.config;

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
        if (!this.experimentalAPICheck('set_theme_style_url')) return;
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
            uuid: this.uuid,
            state: state,
            messagesCount: messagesCount
        }, 'echo_state_update', target);
    }

    /**
     * 处理侦听获取的数据
     * @param {Object} data 数据内容
     * @param {EchoLiveBroadcast} listener 监听对象
     */
    getDataPortal(data, listener = this) {
        switch (data.action) {
            case 'message_data':
                listener.echolive.send(data.data);
                break;

            case 'echo_next':
                listener.echolive.next();
                break;

            case 'set_theme_style_url':
                listener.setThemeStyleUrl(data.data.url);
                break;

            case 'set_theme':
                listener.setTheme(data.data.name);
                break;
        
            default:
                listener.runListenCallback(data, listener);
                break;
        }
    }
}



class EchoLiveBroadcastHistory extends EchoLiveBroadcastClient {
    /**
     * Echo-Live 广播客户端：对话框
     * @param {String} channel 频道名称
     * @param {*} echoLiveHistory Echo-Live 历史记录实例
     * @param {Object} config 配置
     */
    constructor(channel = 'sheep-realms:echolive', echoLiveHistory = undefined, config = {}) {
        super(channel, 'history', config);
        this.echoLiveHistory = echoLiveHistory;
        this.isServer = false;
        this.timer = {};
        // this.event = {};
        this.depth = 2;
    }
}