/* ============================================================
 * Echo
 * Github: https://github.com/sheep-realms/Echo
 * License: GNU General Public License 3.0
 * ============================================================
 */
class Echo {
    constructor($sel = '', track = 'main') {
        this.track              = track;
        this.subTrack           = track === 'main' ? new Map() : undefined;
        this.message            = '';
        this.messageBuffer      = [];
        this.messageList        = [];
        this.dbChrBuffer        = '';
        this.timer              = 0;
        this.groupCount         = 0;
        this.groupStack         = [];
        this.printSpeed         = 30;
        this.printSpeedStart    = 30;
        this.printSpeedChange   = 30;
        this.state              = 'stop';
        this.typewrite          = 'none';
        this.ruby               = false;
        this.destroyed          = false;
        this.filter             = {
            HTMLFormat: true
        };
        this.event              = {
            backspace:          () => {},
            clear:              () => {},
            customData:         ( data, track = 'main' ) => {},
            customEvent:        ( event, track = 'main' ) => {},
            customSequence:     ( sequence, track = 'main' ) => {},
            groupEnd:           ( event = { groupId: -1, groupNow: -1 }, track = 'main' ) => {},
            groupStart:         ( event = { groupId: -1, groupNow: -1, data: null }, track = 'main' ) => {},
            next:               ( message, data ) => {},
            print:              ( char = '', track = 'main' ) => {},
            printEnd:           ( track = 'main') => {},
            printStart:         () => {},
            rubyEnd:            ( ruby = '', track = 'main' ) => {},
            rubyStart:          ( ruby = '', track = 'main' ) => {},
            send:               () => {},
            sendList:           () => {},
            skip:               ( char = '', track = 'main' ) => {},
            stop:               () => {},
            typewriteEnd:       ( track = 'main' ) => {}
        };
        this.skipOnePrintLoopChar = /[\u2014-\u2015\u2018-\u2019\u201c-\u201d\u2e80-\u9fff\uac00-\ud7ff\uf900-\ufaff\ufe10-\ufe1f\ufe30-\ufe4f\uff01-\uff60\uffe0-\uffe7\u{17000}-\u{1b2ff}\u{20000}-\u{2fa1f}\u{30000}-\u{323af}]/u;

        if ($sel != '') {
            this.rd($sel);
        }
    }

    get isMainTrack() {
        return this.track === 'main';
    }

    get hasSubTrack() {
        return this.isMainTrack && this.subTrack.size > 0;
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
        
        if (obj?.ruby != undefined) {
            this.ruby = false;
            this.event.rubyEnd(obj.ruby);
        }
        if (obj?.typewrite != undefined) {
            this.typewrite = 'ready';
        }
        if (this.printSpeedChange != this.printSpeedStart) this.speed();
        this.event.groupEnd(e, this.track);
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
            this.event.customEvent(obj.event, this.track);
        }
        if (obj?.data) {
            this.event.customData(obj?.data, this.track);
        }
        this.event.groupStart(e, this.track);
        if (obj?.ruby != undefined) {
            this.ruby = true;
            this.event.rubyStart(obj.ruby, this.track);
        }
        return e;
    }

    insertSequence(data = {}, afterSpace = 0, beforeSpace = 0) {
        const obj = {
            ...data,
            action: 'custom_sequence'
        }
        if (afterSpace > 0) this.messageBuffer.unshift(...Array(afterSpace).fill(''));
        this.messageBuffer.unshift(obj);
        if (beforeSpace > 0) this.messageBuffer.unshift(...Array(beforeSpace).fill(''));
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
                ruby: msg?.ruby,
                printSpeed: msg?.speed,
                event: msg?.event,
                data: msg?.data
            };

            let dataAfter = {
                action: 'group_end',
                typewrite: msg?.typewrite,
                ruby: msg?.ruby
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
                let before = Array(msg.pause).fill('');
                data = [...data, ...before];
            }
            
            return data;
        }
    }

    next() {
        if (this.destroyed) return;
        if (this.messageList == undefined) return;
        let msg = this.messageList.shift();
        if (msg == undefined) return;
        let subTrackCount = 0;
        if (Array.isArray(msg.track)) subTrackCount = msg.track.length;

        const r = this.send(msg.message, msg?.data);
        // 触发打印下一条消息事件
        this.event.next(msg, {
            subTrackCount: subTrackCount
        });

        // 子轨道
        if (subTrackCount > 0) {
            msg.track.forEach((e, i) => {
                const subTrack = this.createSubTrack(`sub_${i}`);
                subTrack.send(e?.message, e?.data);
            });
        }
        return r;
    }

    on(eventName, action = function() {}) {
        if (this.destroyed) return;
        if (typeof action != 'function') return;
        return this.event[eventName] = action;
    }

    print() {
        if (this.destroyed) return;

        if (this.state == 'ready') {
            this.state = 'play';
            // 触发打印开始事件
            this.event.printStart();
        }

        let a;
        if (this.dbChrBuffer != '') {
            a = this.dbChrBuffer;
            this.dbChrBuffer = '';
        } else {
            if (typeof this.messageBuffer[0] == 'string') {
                a = this.messageBuffer.shift();
                // 中日韩字符及其他汉字文化圈字符跳过一回合
                if ((a.search(this.skipOnePrintLoopChar) != -1) && this.typewrite == 'none') {
                    this.dbChrBuffer = a;
                    return;
                }
            } else if (typeof this.messageBuffer[0] == 'object' && this.messageBuffer[0]?.action == 'custom_sequence') {
                this.event.customSequence(this.messageBuffer.shift(), this.track);
            }
        }

        if (this.typewrite === 'ready') {
            this.typewrite = 'none';
            this.event.typewriteEnd(this.track);
        } else if (
            this.typewrite === 'input'
            && a === "'"
            && typeof this.messageBuffer[0] === 'string'
        ) {
            a += this.messageBuffer.shift();
        }

        if (this.messageBuffer[0] === '\u200b') {
            a += this.messageBuffer.shift();
        }

        // 触发打印事件
        if (typeof a == 'string' && this.filter.HTMLFormat) {
            a = a.replace(/ /g, '&ensp;');
            a = a.replace(/</g, '&lt;');
            a = a.replace(/>/g, '&gt;');
        }
        this.event.print(a, this.track);

        const __checkMessageBufferNext = () => {
            if (typeof this.messageBuffer[0] == 'object' && this.messageBuffer[0]?.action != 'custom_sequence') {
                let obj = this.messageBuffer.shift();
                if (obj.action == 'group_start') {
                    this.groupStart(obj, this.track);
                } else if (obj.action == 'group_end') {
                    this.groupEnd(obj, this.track);
                }
                __checkMessageBufferNext();
            }
        }

        __checkMessageBufferNext();

        if (this.messageBuffer.length == 0 && this.dbChrBuffer == '') {
            clearInterval(this.timer);
            this.state = 'last';
        }

        if (this.state === 'last') {
            if (this.hasSubTrack) {
                this.state = 'wait_subtrack';
            } else {
                // 触发打印结束事件
                this.event.printEnd(this.track);
                this.state = 'stop';
            }
        }

        return a;
    }

    send(text, data = {}) {
        if (this.destroyed) return;
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
        if (data?.customData) this.event.customData(data.customData, this.track);
        this.timer = setInterval(() => {
            this.print(this)
        }, this.printSpeedStart);
        this.state = 'ready';
        return this.message;
    }

    sendList(messageList) {
        if (this.destroyed) return;
        if (!Array.isArray(messageList)) return;
        this.messageList = messageList;
        this.event.sendList();
        return this.next();
    }

    skip() {
        if (this.destroyed) return;
        clearInterval(this.timer);
        let txt = this.dbChrBuffer + this.messageBuffer.join('');
        this.messageBuffer = [];
        // 触发跳过事件
        this.event.skip(txt, this.track);
        // 触发打印事件
        this.event.print(txt, this.track);
        // 触发打印结束事件
        this.event.printEnd(this.track);
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
        this.timer = setInterval(() => {
            this.print()
        }, this.printSpeedChange);
        return this.printSpeedChange;
    }

    stop() {
        clearInterval(this.timer);
        this.state = 'stop';
        this.messageBuffer = [];
        this.dbChrBuffer = '';
        this.groupCount = 0;
        this.groupStack = [];
        if (this.hasSubTrack) this.clearSubTrack();
        this.event.stop();
    }

    typewriteEnd() {
        // 触发打字结束事件
        this.event.typewriteEnd(this.track);
    }

    createSubTrack(name) {
        if (this.track !== 'main') return;
        const newSubTrack = new Echo('', name);
        const events = [
            'customData',
            'customEvent',
            'customSequence',
            'groupEnd',
            'groupStart',
            'print',
            'rubyEnd',
            'rubyStart',
            'skip',
            'typewriteEnd'
        ];
        events.forEach(e => {
            newSubTrack.on(e, this.event[e]);
        });
        newSubTrack.on('printEnd', () => {
            this.destroySubTrack(name);
        });
        this.subTrack.set(name, newSubTrack);
        return newSubTrack;
    }

    destroySubTrack(name) {
        const subTrack = this.subTrack.get(name);
        if (subTrack === undefined) return;
        subTrack.destroy();
        this.subTrack.delete(name);

        if (!this.hasSubTrack && this.state === 'wait_subtrack') {
            // 触发打印结束事件
            this.event.printEnd(this.track);
            this.state = 'stop';
        }
    }

    clearSubTrack() {
        this.subTrack.forEach(e => {
            e.destroy();
        });
        this.subTrack.clear();
    }

    destroy() {
        if (this.state !== 'stop') this.stop();
        
        this.destroyed = true;

        for (const key in this.event) {
            if (!Object.hasOwn(this.event, key)) continue;
            this.event[key] = () => {};
        }
    }
}

window.Echo = Echo;