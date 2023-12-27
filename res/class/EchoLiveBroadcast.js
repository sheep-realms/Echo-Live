class EchoLiveBroadcast {
    constructor(echolive = undefined, channel = 'sheep-realms:echolive') {
        this.echolive = echolive;
        this.uuid = undefined;
        this.broadcast = new BroadcastChannel(channel);
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

            this.sendHello();
        }

        this.broadcast.onmessage = function(e) {
            that.getData(e.data);
        };

        if (this.isServer) {
            this.uuid = this.getUUID();
            this.ping();
        }
    }

    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    sendData(data = {}, type = 'message_data', target = undefined) {
        return this.broadcast.postMessage({
            action: type,
            target: target,
            data: data
        });
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

    getData(data) {
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
        
            default:
                break;
        }
    }

    // 这是一个重复的方法，需要封装一下
    getUUID() {
        let timestamp = new Date().getTime();
        let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let random = Math.random() * 16;
            if (timestamp > 0) {
                random = (timestamp + random) % 16 | 0;
                timestamp = Math.floor(timestamp / 16);
            } else {
                random = (perforNow + random) % 16 | 0;
                perforNow = Math.floor(perforNow / 16);
            }
            return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
        });
    };
}