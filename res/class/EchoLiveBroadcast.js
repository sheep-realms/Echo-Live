class EchoLiveBroadcast {
    constructor(echolive = undefined, channel = 'sheep-realms:echolive') {
        this.echolive = echolive;
        this.broadcast = new BroadcastChannel(channel);

        if (this.echolive != undefined) {
            let that = this;
            this.broadcast.onmessage = function(e) {
                that.getData(e.data);
            };
        }
    }

    sendData(data) {
        this.broadcast.postMessage({
            action: 'message_data',
            data: data
        });
    }

    getData(data) {
        switch (data.action) {
            case 'message_data':
                this.echolive.send(data.data);
                break;
        
            default:
                break;
        }
    }
}