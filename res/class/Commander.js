class Commander {
    constructor() {
        this.link = {
            broadcast: undefined,
            localStorageManager: undefined,
            messager: undefined,
            systemNotice: undefined,
            window: undefined
        };
        this.value = {};
        this.commands = [
            {
                name: 'clearlocalstorage',
                parameters: [],
                inFunctionDisable: true
            }, {
                name: 'next',
                parameters: [
                    {
                        type: 'any'
                    }
                ]
            }, {
                name: 'ping',
                parameters: [
                    {
                        type: 'any'
                    }
                ]
            }, {
                name: 'say',
                parameters: [
                    {
                        type: 'text',
                        required: true
                    }
                ]
            }, {
                name: 'shutdown',
                parameters: [
                    {
                        type: 'text'
                    }
                ]
            }, {
                name: 'theme',
                parameters: [
                    {
                        type: 'any',
                        required: true
                    }, {
                        type: 'any'
                    }
                ]
            }, {
                name: 'var',
                parameters: [
                    {
                        type: 'key',
                        required: true
                    }, {
                        type: 'select',
                        value: ['=', '+', '-', '*', '/', '/^', '/_', '//', '%', '^^', '++', '--', '&+', '^', '&', '|', '>>', '<<', '>>>', 'del', 'get', 'max', 'min', 'typeof', 'return']
                    }, {
                        type: 'text'
                    }
                ]
            }, {
                name: 'varg',
                parameters: [
                    {
                        type: 'key',
                        required: true
                    }, {
                        type: 'select',
                        value: ['=', '+', '-', '*', '/', '/^', '/_', '//', '%', '^^', '++', '--', '&+', '^', '&', '|', '>>', '<<', '>>>', 'del', 'get', 'max', 'min', 'typeof', 'return']
                    }, {
                        type: 'text'
                    }
                ]
            }
        ];
        this.variable = {
            global: {}
        };
        this.stack = 'global';
    }

    init() {
        
    }

    run(command = '', inFn = false) {
        let cmds = command.split(' ');

        // 查找命令
        let targetCmd = this.commands.find(function(e) {
            return e.name == cmds[0];
        });
        // 未找到命令
        if (targetCmd == undefined) {
            return;
        }

        if (inFn && targetCmd?.inFunctionDisable) return StateMessage.getFail('in_function_disable');

        cmds.shift();

        let pcobj = this.__parameterConstructor(targetCmd, cmds);

        if (pcobj.state != 'success') {
            return pcobj;
        }

        cmds = pcobj.data.parameters;

        let r = this[targetCmd.name](...cmds);

        return r;
    }

    consoleRun(command = '') {
        if (typeof command != 'string' || command == '') return;

        let r = this.run(command);

        if (command.split(' ')[0] != 'say') this.link.messager.send(command, 'info', true);

        if (r?.message == undefined) return r;
        let msg = $t(
            r.message.key,
            r.message.variable
        );
        if (r.state == 'success') {
            this.link.messager.send(msg);
        } else {
            this.link.messager.sendError(msg);
        }

        return r;
    }

    fn(commands = []) {
        if (typeof commands == 'string') {
            commands = commands.split('\n');
        }

        let success = 0,
            fail = 0,
            count = 0,
            failLog = [],
            uuid = EchoLiveTools.getUUID();

        this.__setStack(uuid);

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].substring(0, 2) === '//' || commands[i].trim() === '') continue;
            let r = this.run(commands[i], true);
            if (r.state == 'success') {
                success++;
            } else {
                fail++;
                failLog.push({
                    line: i + 1,
                    reason: r.failReason
                });
            }
            count++;
        }

        this.__clearStack();

        return {
            state: {
                count: count,
                success: success,
                fail: fail
            },
            log: {
                fail: failLog
            },
            uuid: uuid
        };
    }

    __parameterConstructor(targetCmd, inputCmds = []) {
        let newCmd = [];
        for (let i = 0; i < targetCmd.parameters.length; i++) {
            let par = targetCmd.parameters[i];

            if (inputCmds[0] == undefined || inputCmds[0] == '') {
                if (par.required) {
                    return this.__messageConstructor(
                        'common',
                        StateMessage.getFail('missing_parameter')
                    );
                } else {
                    break;
                }
            }

            if (inputCmds[0].search(/^@[a-zA-Z_]\w{0,63}$/) != -1) {
                inputCmds[0] = this.__getVar(inputCmds[0].substring(1));
            }

            let p, pcheck;
            switch (par.type) {
                case 'text':
                    newCmd.push(inputCmds.join(' '));
                    inputCmds = [];
                    break;
                
                case 'number':
                    p = Number(inputCmds.shift());
                    pcheck = this.__parameterCheckNumber(p, par);
                    if (pcheck.state != 'success') return pcheck;
                    newCmd.push(p);
                    break;

                case 'json':
                    p = inputCmds.join(' ');
                    inputCmds = [];
                    let pjson;
                    try {
                        pjson = JSON.parse(p);
                    } catch (error) {
                        return this.__messageConstructor(
                            'common',
                            StateMessage.getFail('invalid_json')
                        );
                    }
                    newCmd.push(pjson);
                    break;

                case 'value':
                    p = inputCmds.shift();
                    pcheck = this.__parameterCheckValueList(par.value, p);
                    if (pcheck.state != 'success') return pcheck;
                    newCmd.push(p);
                    break;

                case 'key':
                    p = inputCmds.shift();
                    pcheck = this.__parameterCheckKey(p);
                    if (pcheck.state != 'success') return pcheck;
                    newCmd.push(p);
                    break;

                case 'select':
                    p = inputCmds.shift();
                    pcheck = this.__parameterOption(par.value, p);
                    if (pcheck.state != 'success') return pcheck;
                    newCmd.push(p);
                    break;

                case 'any':
                    newCmd.push(inputCmds.shift());
                    break;
            
                default:
                    newCmd.push(inputCmds.shift());
                    break;
            }
        }
        return StateMessage.getSuccess(
            {
                parameters: newCmd
            }
        );
    }

    __parameterCheckNumber(value, parameter) {
        if (Number.isNaN(value)) {
            return this.__messageConstructor(
                'common',
                StateMessage.getFail('invalid_number')
            );
        }

        if (parameter?.value != undefined) {
            if (parameter.value?.max != undefined) {
                if (value > parameter.value.max) {
                    return this.__messageConstructor(
                        'common',
                        StateMessage.getFail('exceed_maximum_value'),
                        { n: value, max: parameter.value.max }
                    );
                }
            }

            if (parameter.value?.min != undefined) {
                if (value < parameter.value.min) {
                    return this.__messageConstructor(
                        'common',
                        StateMessage.getFail('exceed_minimum_value'),
                        { n: value, min: parameter.value.min }
                    );
                }
            }
        }

        return StateMessage.getSuccess();
    }

    __parameterCheckValueList(type, value) {
        let i = this.value[type].indexOf(value);
        
        if (i == -1) {
            return this.__messageConstructor(
                'common',
                StateMessage.getFail('invalid_' + type),
                { value: value }
            );
        };

        return StateMessage.getSuccess();
    }

    __parameterCheckKey(value) {
        if (value.search(/^[a-zA-Z_]\w{0,63}$/) == 0) {
            return StateMessage.getSuccess();
        } else {
            return this.__messageConstructor(
                'common',
                StateMessage.getFail('invalid_key_name'),
                { name: value }
            );
        }
    }

    __parameterOption(options, value) {
        if (options.indexOf(value) != -1) {
            return StateMessage.getSuccess();
        } else {
            return this.__messageConstructor(
                'common',
                StateMessage.getFail('unknow_option'),
                { name: value }
            );
        }
    }

    __messageConstructor(command, rt, variable = {}, after = undefined) {
        if (rt.state == 'success') {
            rt.message = {
                key: `command.${command}.success${ after ? '.' + after : ''}`,
                variable: variable
            };
        } else {
            rt.message = {
                key: `command.${command}.fail.${ after ? after : rt.failReason}`,
                variable: variable
            };
        }
        return rt;
    }

    __setStack(key) {
        if (key == 'global') return;
        this.variable[key] = {};
        this.stack = key;
    }

    __clearStack() {
        if (this.stack == 'global') return;
        delete this.variable[this.stack];
        this.stack = 'global';
    }

    __getVar(name, stack = this.stack) {
        let v = this.variable[stack][name];
        if (v == undefined) v = this.variable['global'][name];
        return v;
    }

    __setVar(name, value = undefined, stack = this.stack) {
        if (Number.isNaN(Number(value)) != true) value = Number(value);
        this.variable[stack][name] = value;
    }

    __delVar(name, stack = this.stack) {
        delete this.variable[stack][name];
    }

    __getBroadcastTarget(target) {
        if (target == undefined || typeof target != 'string') return;
        if (target.search(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i) != -1) return target;
        return '@' + target;
    }

    __broadcastMessageConstructor(action, target = undefined) {
        if (target != undefined) {
            return this.__messageConstructor('common', StateMessage.getSuccess(), { action: action, name: target }, 'broadcast_target');
        } else {
            return this.__messageConstructor('common', StateMessage.getSuccess(), { action: action }, 'broadcast_everyone');
        }
    }

    clearlocalstorage() {
        this.link.window.messageWindow(
            $t('window.clear_local_storage.message'),
            $t('window.clear_local_storage.title'),
            {
                autoFocusButton: 'cancel',
                controller: ['cancel', 'confirm'],
                icon: 'alert',
                maskClosable: true
            },
            (value, unit) => {
                if (value == 'confirm') {
                    this.link.localStorageManager.clear();
                    this.link.systemNotice.sendT('notice.local_storage_cleared', {}, 'success');
                }
                unit.close();
            }
        );
        return this.__messageConstructor('clearlocalstorage', StateMessage.getSuccess());
    }

    next(target) {
        if (this.link.broadcast == undefined) return this.__messageConstructor('common', StateMessage.getFail('not_broadcast'));
        target = this.__getBroadcastTarget(target);
        this.link.broadcast.sendNext(target);

        return this.__broadcastMessageConstructor('echo_next', target);
    }

    ping(target) {
        if (this.link.broadcast == undefined) return this.__messageConstructor('common', StateMessage.getFail('not_broadcast'));
        target = this.__getBroadcastTarget(target);
        this.link.broadcast.ping(target);

        return this.__broadcastMessageConstructor('ping', target);
    }

    say(message) {
        this.link.messager.send('[SAY] ' + message);
        return StateMessage.getSuccess();
    }

    shutdown(reason) {
        if (this.link.broadcast == undefined) return this.__messageConstructor('common', StateMessage.getFail('not_broadcast'));
        this.link.broadcast.sendShutdown(reason);

        return this.__broadcastMessageConstructor('shutdown');
    }

    theme(name, target) {
        if (this.link.broadcast == undefined) return this.__messageConstructor('common', StateMessage.getFail('not_broadcast'));
        this.link.broadcast.sendTheme(name, target);

        return this.__broadcastMessageConstructor('set_theme', target);
    }

    var(name, action = undefined, value = undefined, stack = this.stack) {
        if (Number.isNaN(Number(value)) != true) value = Number(value);

        if (action == 'get') {
            let v1 = this.__getVar(name, stack);
            return this.__messageConstructor(
                'var',
                StateMessage.getSuccess(
                    {
                        stack: stack,
                        name: name,
                        value: v1
                    }
                ),
                {
                    stack: stack,
                    name: name,
                    value: v1
                },
                'get'
            );
        }

        if (action == '=' || action == undefined) {
            this.__setVar(name, value, stack);
            let v1 = this.__getVar(name, stack);
            return this.__messageConstructor(
                'var',
                StateMessage.getSuccess(
                    {
                        stack: stack,
                        name: name,
                        value: v1
                    }
                ),
                {
                    stack: stack,
                    name: name,
                    value: v1
                },
                'set'
            );
        }

        if (action == 'return') {
            this.__setVar(name, this.run(value).value, stack);
            let v1 = this.__getVar(name, stack);
            return this.__messageConstructor(
                'var',
                StateMessage.getSuccess(
                    {
                        stack: stack,
                        name: name,
                        value: v1
                    }
                ),
                {
                    stack: stack,
                    name: name,
                    value: v1
                },
                'set'
            );
        }

        if (this.__getVar(name, stack) == undefined && action != 'typeof') {
            return this.__messageConstructor(
                'var',
                StateMessage.getFail('var_undefined'),
                { stack: stack, name: name }
            );
        }

        let v = this.__getVar(name, stack);

        switch (action) {
            case '+'     : this.__setVar(name, v +   value,               stack); break;
            case '-'     : this.__setVar(name, v -   value,               stack); break;
            case '*'     : this.__setVar(name, v *   value,               stack); break;
            case '/'     : this.__setVar(name, v /   value,               stack); break;
            case '/^'    : this.__setVar(name, Math.ceil (v / value),     stack); break;
            case '/_'    : this.__setVar(name, Math.floor(v / value),     stack); break;
            case '//'    : this.__setVar(name, Math.round(v / value),     stack); break;
            case '%'     : this.__setVar(name, v %   value,               stack); break;
            case '^^'    : this.__setVar(name, Math.pow  (v , value),     stack); break;
            case '++'    : this.__setVar(name, v + 1,                     stack); break;
            case '--'    : this.__setVar(name, v - 1,                     stack); break;
            case '&+'    : this.__setVar(name, String(v) + String(value), stack); break;
            case '^'     : this.__setVar(name, v ^   value,               stack); break;
            case '|'     : this.__setVar(name, v |   value,               stack); break;
            case '&'     : this.__setVar(name, v &   value,               stack); break;
            case '<<'    : this.__setVar(name, v <<  value,               stack); break;
            case '>>'    : this.__setVar(name, v >>  value,               stack); break;
            case '>>>'   : this.__setVar(name, v >>> value,               stack); break;
            case 'max'   : this.__setVar(name, Math.max(v, value),        stack); break;
            case 'min'   : this.__setVar(name, Math.min(v, value),        stack); break;
            case 'typeof': this.__setVar(name, typeof value,              stack); break;

            case 'del':
                this.__delVar(name, stack);
                return this.__messageConstructor(
                    'var',
                    StateMessage.getSuccess(
                        {
                            name: name
                        }
                    ),
                    {
                        stack: stack,
                        name: name
                    },
                    'del'
                );
        
            default:
                break;
        }

        v = this.__getVar(name, stack);

        return this.__messageConstructor(
            'var',
            StateMessage.getSuccess(
                {
                    stack: stack,
                    name: name,
                    value: v
                }
            ),
            {
                stack: stack,
                name: name,
                value: v
            },
            'set'
        );
    }

    varg(name, action = undefined, value = undefined, stack = 'global') {
        return this.var(name, action, value, stack);
    }
}




class StateMessage {
    constructor() {}

    static getSuccess(data = {}, value = 0) {
        return {
            state: 'success',
            value: value,
            data: data
        };
    }

    static getFail(failReason, data = {}, value = -1) {
        return {
            state: 'fail',
            value: value,
            failReason: failReason,
            data: data
        };
    }
}



class Messager {
    constructor() {
        this.event = {
            message: function() {}
        };
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

    send(message = '', type = 'info', isInput = false) {
        this.event.message(message, type, isInput);
    }

    sendError(message = '') {
        this.event.message(message, 'erro');
    }
}