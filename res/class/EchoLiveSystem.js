class EchoLiveSystem {
    constructor() {
        this.mixer = undefined;
        this.registry = new EchoLiveRegistry();
    }
}



class EchoLiveRegistry {
    constructor() {
        this.registry = {
            emoji: new Map(),
            emoji_namespace: new Map(),
            language: new Map(),
            live_theme: new Map(),
            palette: new Map(),
            print_effect: new Map(),
            sound: new Map(),
            timing_function: new Map()
        };
        
    }

    /**
     * 深度合并对象
     * @param {Object} target 目标对象
     * @param {Object} source 来源对象
     * @returns {Object} 合并结果
     */
    __deepMerge(target, source) {
        for (let key in source) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], deepMerge(target[key], source[key]));
            }
        }
        Object.assign(target || {}, source);
        return target;
    }

    /**
     * 获取注册表
     * @param {String} key 注册表名
     * @returns {Map} 注册表
     */
    getRegistry(key) {
        if (this.registry[key] !== undefined && this.registry[key] instanceof Map) return this.registry[key];
        return;
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
     * @param {Boolean} fill 强制覆盖
     * @returns {*} 合并后的注册表值
     */
    setRegistryValue(table, key, value, fill = false) {
        let reg = this.getRegistry(table);
        if (reg === undefined) return;
        if (typeof value === 'object') value = JSON.parse(JSON.stringify(value));
        let v = reg.get(key);
        if (!fill && typeof v === 'object' && !Array.isArray(v) && typeof value === 'object' && !Array.isArray(value)) {
            v = this.__deepMerge(v, value)
            reg.set(key, v);
            return v;
        } else if (!fill && Array.isArray(v)) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (!v.includes(e)) v.push(e);
                });
            } else {
                if (!v.includes(e)) v.push(e);
            }
            reg.set(key, v);
            return v;
        } else {
            reg.set(key, value);
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