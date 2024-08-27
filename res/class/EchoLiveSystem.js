class EchoLiveSystem {
    constructor() {
        this.mixer = undefined;
        this.registry = new EchoLiveRegistry();
    }
}



class EchoLiveRegistry {
    constructor() {
        this.registry = new Map();
        this.initialized = false;
        this.event = {
            setRegistryValue: []
        };
        this.lastTriggerID = 0;

        this.createRegistry('root');
    }

    /**
     * 初始化
     */
    init(data = []) {
        if (this.initialized) return;
        // 用注册表注册注册表
        this.loadRegistry('root', 'name', data);
        data.forEach(e => this.createRegistry(e.name));
        this.initialized = true;
    }

    // 注册表数量
    get registryCount() {
        return this.registry.size;
    }

    // 注册表项数量
    get itemCount() {
        let count = 0;
        this.registry.forEach(e => count += e.size);
        return count;
    }

    /**
     * 深度合并对象
     * @param {Object} target 目标对象
     * @param {Object} source 来源对象
     * @returns {Object} 合并结果
     */
    static __deepMerge(target, source) {
        target = JSON.parse(JSON.stringify(target));
        for (let key in source) {
            if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
                Object.assign(source[key], EchoLiveRegistry.__deepMerge(target[key], source[key]));
            } else if (Array.isArray(source[key]) && key in target) {
                target[key] = target[key].concat(source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    /**
     * 绑定设置注册表值触发
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @param {Function} action 方法
     * @returns {Number} 触发器 ID
     */
    onSetRegistryValue(table, key = '*', action = () => {}) {
        if (table.search(':') === -1) table = 'echolive:' + table;
        const id = this.lastTriggerID++
        this.event.setRegistryValue.push({
            id: id,
            table: table,
            key: key,
            action: action
        });
        return id;
    }

    /**
     * 激活触发
     * @param {String} event 事件名
     * @param {String} table 注册表名
     * @param {String} key 注册表值
     * @param {Object} data 附加数据
     */
    trigger(event, table, key, data = {}) {
        if (this.event[event] === undefined) return;
        if (table.search(':') === -1) table = 'echolive:' + table;
        this.event[event].filter(e => e.table === table && (e.key === key || e.key === '*')).forEach(e => e.action(data));
    }

    /**
     * 清除触发器
     * @param {String} event 事件名
     * @param {Number} id 触发器 ID
     */
    killTrigger(event, id) {
        if (this.event[event] === undefined) return;
        const index = this.event[event].findIndex(e => e.id = id);
        this.event[event].splice(index, 1);
    }

    /**
     * 获取注册表
     * @param {String} key 注册表名
     * @returns {Map} 注册表
     */
    getRegistry(key) {
        if (typeof key !== 'string') return;
        if (key.search(':') === -1) key = 'echolive:' + key;
        let reg = this.registry.get(key);
        if (reg !== undefined && reg instanceof Map) return reg;
        return;
    }

    /**
     * 创建注册表
     * @param {String} key 注册表名
     * @returns {Map} 注册表
     */
    createRegistry(key) {
        if (key.search(':') === -1) key = 'echolive:' + key;
        if (this.registry.get(key) !== undefined) return;
        return this.registry.set(key, new Map());
    }

    /**
     * 获取注册表数组
     * @param {String} key 注册表名
     * @returns {Array} 注册表数组
     */
    getRegistryArray(key) {
        let array = [];
        this.forEach(key, e => {
            array.push(e);
        });
        return array;
    }

    /**
     * 获取注册表单位
     * @param {String} key 注册表名
     * @returns {EchoLiveRegistryUnit} 注册表单位
     */
    getRegistryUnit(key) {
        let reg = this.getRegistry(key);
        if (reg === undefined) return;
        return new EchoLiveRegistryUnit(this, key);
    }

    /**
     * 获取注册表内容尺寸
     * @param {String} key 注册表名
     * @returns {Number} 注册表内容尺寸
     */
    getRegistrySize(key) {
        let reg = this.getRegistry(key);
        if (reg === undefined) return;
        return reg.size;
    }

    /**
     * 获取注册表值
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @returns {*} 注册表值
     */
    getRegistryValue(table, key) {
        let reg = this.getRegistry(table);
        if (reg === undefined) return;
        let value = reg.get(key);
        if (typeof value === 'object') return JSON.parse(JSON.stringify(reg.get(key)));
        return reg.get(key);
    }

    /**
     * 设置注册表值
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @param {*} value 注册表值
     * @param {Data} data 附加数据
     * @param {Boolean} data.fill 强制覆盖
     * @returns {*} 合并后的注册表值
     */
    setRegistryValue(table, key, value, data = {}) {
        if (key === undefined) return;
        if (table.search(':') === -1) table = 'echolive:' + table;
        let reg = this.getRegistry(table);
        if (reg === undefined) return;

        data = {
            fill: false,
            trigger_disable: false
        }

        if (typeof value === 'object') value = JSON.parse(JSON.stringify(value));
        const defaultData = this.getRegistryValue('root', table)?.default_data;

        const __setReg = v2 => {
            if (typeof defaultData === 'object' && typeof v2 === 'object' && !Array.isArray(v2)) {
                v2 = EchoLiveRegistry.__deepMerge(defaultData, v2)
            }
            reg.set(key, v2);
            if (!data.trigger_disable) this.trigger('setRegistryValue', table, key, { value: v2 });
        }

        let v = reg.get(key);
        if (!data.fill && typeof v === 'object' && !Array.isArray(v) && typeof value === 'object' && !Array.isArray(value)) {
            v = EchoLiveRegistry.__deepMerge(v, value);
            __setReg(v);
            return v;
        } else if (!data.fill && Array.isArray(v)) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (!v.includes(e)) v.push(e);
                });
            } else {
                if (!v.includes(e)) v.push(e);
            }
            __setReg(v);
            return v;
        } else {
            __setReg(value);
            return value;
        }
    }

    /**
     * 导入注册表
     * @param {String} table 注册表名
     * @param {String|Function} getKey 注册表键
     * @param {Array|Object} data 数据表
     * @returns {Map} 注册表
     */
    loadRegistry(table, getKey, data = []) {
        let reg = this.getRegistry(table);
        if (reg === undefined) return;
        if (typeof data !== 'object') return;
        if (!Array.isArray(data)) data = [data];
        data.forEach(e => {
            let key;
            if (typeof getKey === 'function') {
                key = getKey(e);
            } else {
                key = e[getKey];
            }
            this.setRegistryValue(table, key, e);
        });
        return this.getRegistry(table);
    }

    /**
     * 设置本地化注册表值
     * @param {Object} langData 本地化键值组
     * @returns {*} 注册值
     */
    setLanguageRegistryValue(langData = {}) {
        if (langData?.lang === undefined || langData.lang?.code_iso_639_3 === undefined || langData.lang?.code_ietf === undefined) return;
        return this.setRegistryValue('language', langData.lang.code_iso_639_3, langData);
    }

    /**
     * 注册表重定向
     * @param {String} table 源注册表名
     * @param {String} table2 目标注册表名
     * @param {String} key 源注册表键
     * @param {Function} success 成功回调
     * @param {Function} fail 失败回调
     * @returns {*} 回调返回值
     */
    registryRedirect(table, table2, key, success = () => {}, fail = () => {}) {
        let value = this.getRegistryValue(table, key);
        if (value === undefined || (typeof value !== 'string' && typeof value !== 'number')) return fail(value);
        let regValue = this.getRegistryValue(table2, value);
        if (value === undefined) return fail(value);
        return success(regValue, value);
    }

    /**
     * 遍历注册表
     * @param {String} table 注册表名
     * @param {Function} action 方法
     */
    forEach(table, action = () => {}) {
        let reg = this.getRegistry(table);
        if (reg === undefined) return;
        reg.forEach(action);
    }

    /**
     * 遍历注册表获取数组
     * @param {String} table 注册表名
     * @param {Function} action 方法
     * @returns {Array} 数组
     */
    forEachGetArray(table, action = () => {}) {
        let array = [];
        this.forEach(table, (value, key, map) => {
            array.push(action(value, key, map));
        });
        return array;
    }
}

class EchoLiveRegistryUnit {
    /**
     * Echo-Live 注册表单位
     * @param {EchoLiveRegistry} registry 注册表类
     * @param {String} name 注册表名
     */
    constructor(registry, name) {
        this.registry = registry;
        this.name = name;
    }

    get size() {
        return this.registry.getRegistrySize(this.name);
    }

    get() {
        return this.registry.getRegistry(this.name);
    }

    getArray() {
        return this.registry.getRegistryArray(this.name);
    }

    getValue(key) {
        return this.registry.getRegistryValue(this.name, key);
    }

    setValue(key, value) {
        return this.registry.setRegistryValue(this.name, key, value);
    }
}



let echoLiveSystem = new EchoLiveSystem();