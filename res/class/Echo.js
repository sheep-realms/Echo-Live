/* ============================================================
 * Echo
 * Github: https://github.com/sheep-realms/Echo
 * License: GNU General Public License 3.0
 * ============================================================
 */
class Echo {
    constructor($sel = '') {
        this.message = '';
        this.messageBuffer = [];
        this.messageList = [];
        this.dbChrBuffer = '';
        this.timer = 0;
        this.groupCount = 0;
        this.groupStack = [];
        this.printSpeed = 30;
        this.printSpeedStart = 30;
        this.printSpeedChange = 30;
        this.state = 'stop';
        this.typewrite = 'none';
        this.filter = {
            HTMLFormat: true
        };
        this.event = {
            backspace: function() {},
            clear: function() {},
            customData: function() {},
            customEvent: function() {},
            groupEnd: function() {},
            groupStart: function() {},
            next: function() {},
            print: function() {},
            printEnd: function() {},
            printStart: function() {},
            send: function() {},
            sendList: function() {},
            skip: function() {},
            stop: function() {},
            typewriteEnd: function() {}
        };

        if ($sel != '') {
            this.rd($sel);
        }
    }

    rd($sel) {
        if (typeof jQuery != 'undefined') { 
            this.on('print', function(chr = '') {
                $($sel).append(chr);
            });
            this.on('clear', function() {
                $($sel).text('');
            });
            this.on('printEnd', function() {
                $($sel).html($($sel).html());
            });
        } else { 
            console.error('[Echo] Rapid Deployment Error: jQuery is not loaded.');
        }
    }

    backspace() {
        // 触发退格事件
        this.event.backspace();
    }

    clear() {
        this.message = '';
        this.messageBuffer = [];
        this.timer = 0;
        // 触发清空事件
        this.event.clear();
    }

    groupEnd(obj = {}) {
        let i = this.groupStack.shift();
        let n = this.groupStack[0];
        if (n == undefined) n = 0;
        let e = {
            groupId: i,
            groupNow: n
        }
        
        if (obj?.typewrite != undefined) {
            this.typewrite = 'ready';
        }
        if (this.printSpeedChange != this.printSpeedStart) this.speed();
        this.event.groupEnd(e);
        return e;
    }

    groupStart(obj) {
        this.groupCount++;
        this.groupStack.pop(this.groupCount);
        let e = {
            groupId: this.groupCount,
            groupNow: this.groupCount,
            data: obj
        }
        if (obj?.typewrite) {
            this.typewrite = 'input';
        }
        if (obj?.printSpeed) {
            this.speed(obj.printSpeed);
        }
        if (obj?.event) {
            this.event.customEvent(obj.event);
        }
        if (obj?.data) {
            this.event.customData(obj?.data);
        }
        this.event.groupStart(e);
        return e;
    }

    messageSerialize(msg) {
        if (typeof msg == 'string') {
            return [...msg];
        } else if (typeof msg == 'object' && msg != null) {
            let dataBefore = {
                action: 'group_start',
                class: msg?.class,
                style: msg?.style,
                typewrite: msg?.typewrite,
                printSpeed: msg?.speed,
                event: msg?.event,
                data: msg?.data
            };

            let dataAfter = {
                action: 'group_end',
                typewrite: msg?.typewrite
            };

            let dataContent, data;
            if (msg?.typewrite == undefined) {
                dataContent = [...msg.text];
            } else {
                dataContent = [...msg.typewrite];
            }

            data = [dataBefore, ...dataContent, dataAfter];

            if (msg?.typewrite != undefined) {
                data = [...data, msg.text];
            }

            if (msg?.pause) {
                let before = ' '.repeat(msg.pause).split(' ');
                before.shift();
                data = [...data, ...before];
            }
            
            return data;
        }
    }

    next() {
        if (this.messageList == undefined) return;
        let msg = this.messageList.shift();
        if (msg == undefined) return;
        // 触发打印下一条消息事件
        this.event.next(msg);
        return this.send(msg.message, msg?.data);
    }

    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    print(that = this) {
        if (that.state == 'ready') {
            that.state = 'play';
            // 触发打印开始事件
            that.event.printStart();
        }

        let a;
        if (that.dbChrBuffer != '') {
            a = that.dbChrBuffer;
            that.dbChrBuffer = '';
        } else {
            if (typeof that.messageBuffer[0] == 'string') {
                a = that.messageBuffer.shift();
                // 中日韩字符和辅助平面字符跳过一回合
                if ((a.search(/[\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]/) != -1 || a.codePointAt(0) >= 0x10000) && that.typewrite == 'none') {
                    that.dbChrBuffer = a;
                    return;
                }
            }
        }

        if (that.typewrite == 'ready') {
            that.typewrite = 'none';
            that.event.typewriteEnd();
        } else if (that.typewrite == 'input' && a == "'" && that.messageBuffer[0] != undefined) {
            a += that.messageBuffer.shift();
        }

        // 触发打印事件
        if (typeof a == 'string' && that.filter.HTMLFormat) {
            a = a.replace(/ /g, '&ensp;');
            a = a.replace(/</g, '&lt;');
            a = a.replace(/>/g, '&gt;');
        }
        that.event.print(a);

        if (typeof that.messageBuffer[0] == 'object') {
            let obj = that.messageBuffer.shift();
            if (obj.action == 'group_start') {
                that.groupStart(obj);
            } else if (obj.action == 'group_end') {
                that.groupEnd(obj);
            }
        }

        if (that.messageBuffer.length == 0 && that.dbChrBuffer == '') {
            clearInterval(that.timer);
            that.state = 'last';
        }

        if (that.state == 'last') {
            // 触发打印结束事件
            that.event.printEnd();
            that.state = 'stop';
        }

        return a;
    }

    send(text, data = {}) {
        this.clear();
        // 触发发送事件
        this.event.send();
        this.message = text;
        if (typeof this.message == 'string') {
            this.messageBuffer = [...text];
        } else if (typeof this.message == 'object' && this.message != null) {
            if (Array.isArray(this.message)) {
                this.message.forEach(e => {
                    this.messageBuffer = [...this.messageBuffer, ...this.messageSerialize(e)]
                });
            } else {
                this.messageBuffer = this.messageSerialize(this.message);
            }
        }

        if (data?.printSpeed) {
            this.printSpeedStart = data.printSpeed;
            this.printSpeedChange = data.printSpeed;
        } else {
            this.printSpeedStart = this.printSpeed;
            this.printSpeedChange = this.printSpeed;
        }
        if (data?.customData) this.event.customData(data.customData);
        this.timer = setInterval(this.print, this.printSpeedStart, this);
        this.state = 'ready';
        return this.message;
    }

    sendList(messageList) {
        if (!Array.isArray(messageList)) return;
        this.messageList = messageList;
        this.event.sendList();
        return this.next();
    }

    skip() {
        clearInterval(this.timer);
        let txt = this.dbChrBuffer + this.messageBuffer.join('');
        this.messageBuffer = [];
        // 触发跳过事件
        this.event.skip(txt);
        // 触发打印事件
        this.event.print(txt);
        // 触发打印结束事件
        this.event.printEnd();
        this.state = 'stop';
        return txt;
    }

    speed(value = undefined) {
        if (this.state == 'stop') return;
        if (value != undefined) {
            this.printSpeedChange = value;
        } else {
            this.printSpeedChange = this.printSpeedStart;
        }
        clearInterval(this.timer);
        this.timer = setInterval(this.print, this.printSpeedChange, this);
        return this.printSpeedChange;
    }

    stop() {
        clearInterval(this.timer);
        this.state = 'stop';
        this.messageBuffer = [];
        this.dbChrBuffer = '';
        this.groupCount = 0;
        this.groupStack = [];
    }

    typewriteEnd() {
        // 触发打字结束事件
        this.event.typewriteEnd();
    }
}