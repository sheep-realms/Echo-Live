class EchoLive {
    constructor(echo, config) {
        this.echo = echo;
        this.config = config;
        this.data = undefined;
        this.broadcast = undefined;
        this.timer = {
            messagesPolling: 0
        };

        if (this.config.echo.print_speed != undefined) {
            this.echo.printSpeed = this.config.echo.print_speed;
            this.echo.printSpeedStart = this.config.echo.print_speed;
            this.echo.printSpeedChange = this.config.echo.print_speed;
        }

        if (this.config.echolive.broadcast_enable) {
            this.broadcast = new EchoLiveBroadcast(this);
        } else if (this.config.echolive.messages_polling_enable) {
            this.start();
        }
    }

    send(data = {}) {
        if (typeof this.data === 'object' && JSON.stringify(data) === JSON.stringify(this.data)) return;
        this.data = data;
        $('#echo-live .name').text(data.username);
        echo.sendList(JSON.parse(JSON.stringify(data.messages)));
    }

    reload() {
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
}