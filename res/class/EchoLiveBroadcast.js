class EchoLiveBroadcast {
    constructor(echolive = undefined, channel = 'sheep-realms:echolive') {
        this.echolive = echolive;
        this.uuid = undefined;
        this.broadcast = new BroadcastChannel(channel);
        this.websocket = undefined;
        this.isServer = true;
        this.clients = [];
        this.timer = {
            noClient: -1
        }
        this.event = {
            clientsChange: function() {},
            message: function() {},
            noClient: function() {}
        };

        let that = this;
        if (this.echolive != undefined) {
            this.isServer = false;
            this.uuid = this.echolive.uuid;

            window.onunload = function() {
                that.close();
            };

            if (this.echolive.config.echolive.websocket_enable) {
                this.websocket = new WebSocket(this.echolive.config.echolive.websocket_url);

                this.websocket.addEventListener('open', (e) => {
                    this.sendHello('@__server');
                });

                this.websocket.addEventListener('message', (e) => {
                    this.getData(JSON.parse(e.data));
                });

                this.websocket.addEventListener('close', (e) => {
                    this.websocket = undefined;
                });
            }

            this.sendHello();
        }

        this.broadcast.onmessage = function(e) {
            that.getData(e.data);
        };

        if (this.isServer) {
            this.uuid = EchoLiveTools.getUUID();
            this.ping();
        }
    }

    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    sendData(data = {}, type = 'message_data', target = undefined) {
        let d = {
            action: type,
            target: target,
            data: data
        };

        this.broadcast.postMessage(d);
        if (this.websocket != undefined) {
            try {
                this.websocket.send(JSON.stringify(d));
            } catch (error) {
                
            }
        }
        return d;
    }

    sendHello(target = undefined) {
        if (this.isServer) return;
        return this.sendData({
            uuid: this.uuid,
            hidden: this.echolive.hidden
        }, 'hello', target);
    }

    ping() {
        if (!this.isServer) return;
        let that = this;
        this.timer.noClient = setTimeout(function() {
            that.event.noClient();
        }, 5000)

        return this.sendData({
            uuid: this.uuid
        }, 'ping');
    }

    sendNext(target = undefined) {
        return this.sendData({}, 'echo_next', target);
    }

    pageHidden(target = undefined) {
        if (this.isServer) return;
        return this.sendData({
            uuid: this.uuid
        }, 'page_hidden', target);
    }

    pageVisible(target = undefined) {
        if (this.isServer) return;
        return this.sendData({
            uuid: this.uuid
        }, 'page_visible', target);
    }

    close() {
        if (this.isServer) return;
        this.sendData({
            uuid: this.uuid
        }, 'close');
        return this.broadcast.close();
    }

    addClient(uuid, hidden = false) {
        if (!this.isServer) return;
        let i = this.clients.findIndex(function(e) {
            return e.uuid == uuid;
        });
        if (i != -1) return;
        clearTimeout(this.timer.noClient);

        let r = this.clients.push({
            uuid: uuid,
            hidden: hidden
        });
        this.event.clientsChange(this.clients);
        return r; 
    }

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

    setClientHidden(uuid, value) {
        if (!this.isServer) return;
        let i = this.clients.findIndex(function(e) {
            return e.uuid == uuid;
        });
        if (i == -1) return;
        let r = this.clients[i].hidden = value;
        this.event.clientsChange(this.clients);
        return r;
    }

    sendThemeStyleUrl(url) {
        if (!this.isServer) return;
        return this.sendData({
            url: url
        }, 'set_theme_style_url');
    }

    sendTheme(name) {
        if (!this.isServer) return;
        return this.sendData({
            name: name
        }, 'set_theme');
    }

    setThemeStyleUrl(url) {
        if (this.isServer) return;
        if (!this.experimentalAPICheck('set_theme_style_url')) return;
        return this.echolive.setThemeStyleUrl(url);
    }

    setTheme(name) {
        if (this.isServer) return;
        return this.echolive.setTheme(name);
    }

    getData(data) {
        if (typeof data != 'object') return;
        this.event.message(data);
        // console.log(data);

        if (data.target != undefined && data.target != this.uuid) return;

        switch (data.action) {
            case 'message_data':
                if (!this.isServer) this.echolive.send(data.data);
                break;

            case 'hello':
                this.addClient(data.data.uuid, data.data?.hidden);
                break;

            case 'ping':
                this.sendHello(data.data?.uuid);
                break;

            case 'close':
                this.removeClient(data.data.uuid);
                break;

            case 'echo_next':
                if (!this.isServer) this.echolive.next();
                break;

            case 'page_hidden':
                this.setClientHidden(data.data.uuid, true);
                break;

            case 'page_visible':
                this.setClientHidden(data.data.uuid, false);
                break;

            case 'set_theme_style_url':
                this.setThemeStyleUrl(data.data.url);
                break;

            case 'set_theme':
                this.setTheme(data.data.name);
                break;
        
            default:
                break;
        }
    }

    experimentalAPICheck(apiName) {
        if (!this.echolive.config.echolive.experimental_api_enable) {
            // TODO: 在这里抛出异常
        }

        return this.echolive.config.echolive.experimental_api_enable;
    }
}