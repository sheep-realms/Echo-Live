/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class EchoLiveSystem {
    constructor() {
        this.mixer      = undefined;
        this.registry   = new EchoLiveRegistry();
        this.device     = new EchoLiveLocalDeviceManager();
        this.hook       = new EchoLiveHook();
        this.obs        = new EchoLiveOBSMiddleware();
        this.config     = config;

        this.hook.trigger('system_init', {
            unit: this
        });
    }

    static async getHash(content) {
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    experimentalFlagCheck(name = '') {
        if (this.config?.experimental_flag === undefined) return false;
        if (typeof this.config.experimental_flag[name] !== 'boolean') return false;
        return this.config.experimental_flag[name];
    }
}

class EchoLiveData {
    constructor() {}

    static dataType = {
        namespace_id: {
            type: 'string',
            regexp: /^[^:]+(:[^:]+)+$/,
            filter: {
                pad_namespace:  (v, unit, data) => unit.check() ? v : ( data?.namespace ? data.namespace : 'echolive' ) + ':' + v,
                get_namespace:  (v, unit)       => unit.check() ? v.split(':')[0] : '',
                get_id:         (v, unit)       => unit.check() ? v.split(':').slice(1).join(':') : v
            }
        }
    };

    static check(type, value) {
        if (EchoLiveData.dataType[type] === undefined) return false;
        if (typeof value !== EchoLiveData.dataType[type].type) return false;
        return EchoLiveData.dataType[type].regexp.test(value);
    }

    static filter(type, filterName, value, data = {}, strictMode = false) {
        if (
            EchoLiveData.dataType[type] === undefined
            || typeof value !== EchoLiveData.dataType[type].type
            || EchoLiveData.dataType[type].filter === undefined
            || typeof EchoLiveData.dataType[type].filter[filterName] !== 'function'
        ) return strictMode ? undefined : value;
        return EchoLiveData.dataType[type].filter[filterName](value, new EchoLiveDataUnit(type, value, filterName), data);
    }
}

class EchoLiveDataUnit {
    constructor(type, value, filterName) {
        this.type = type;
        this.value = value;
        this.filterName = filterName;
    }

    check(value = this.value) {
        return EchoLiveData.check(this.type, value);
    }

    filter(filter, value = this.value, data = {}, strictMode = false) {
        if (filter === this.filterName) return;
        return EchoLiveData.check(this.type, filter, value, data, strictMode);
    }
}

class EchoLiveRegistry {
    constructor() {
        this.registry = new Map();
        this.registryHashCache = new Map();
        this.syncRegistryHashCache = undefined;
        this.isFunctionRegistryCache = {};
        this.initialized = false;
        this.event = {
            loadedRegistry: [],
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
            if (
                source[key] instanceof Object &&
                !Array.isArray(source[key]) &&
                key in target &&
                target[key] instanceof Object &&
                !Array.isArray(target[key]) 
            ) {
                target[key] = EchoLiveRegistry.__deepMerge(target[key], source[key]);
            } else if (Array.isArray(source[key]) && key in target && Array.isArray(target[key])) {
                target[key] = target[key].concat(source[key]);
            } else if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
        return target;
    }

    onLoadedRegistry(table = '*', action = () => {}) {
        if (table !== '*') table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
        const id = this.lastTriggerID++;
        this.event.loadedRegistry.push({
            id: id,
            table: table,
            action: action
        });
        return id;
    }

    /**
     * 绑定设置注册表值触发
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @param {Function} action 方法
     * @returns {Number} 触发器 ID
     */
    onSetRegistryValue(table, key = '*', action = () => {}) {
        table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
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
        if (event === 'loadedRegistry') {
            if (table !== '*') table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
            this.event[event]
                .filter(e => e.table === table || e.table === '*')
                .forEach(
                    e => e.action(table, data)
                );
            return;
        }
        table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
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
     * 是否有指定注册表
     * @param {String} key 注册表名
     * @returns {Boolean} 结果
     */
    hasRegistry(key) {
        if (typeof key !== 'string') return;
        key = EchoLiveData.filter('namespace_id', 'pad_namespace', key);
        let reg = this.registry.get(key);
        return reg !== undefined;
    }

    /**
     * 获取注册表
     * @param {String} key 注册表名
     * @returns {Map|undefined} 注册表
     */
    getRegistry(key) {
        if (typeof key !== 'string') return;
        key = EchoLiveData.filter('namespace_id', 'pad_namespace', key);
        let reg = this.registry.get(key);
        if (reg !== undefined && reg instanceof Map) return reg;
        return undefined;
    }

    /**
     * 获取注册表键值对
     * @param {String} key 注册表名
     * @returns {Object|undefined} 注册表键值对
     */
    getRegistryKeysAndValues(key) {
        let reg = this.getRegistry(key);
        if (reg === undefined) return;
        const keys = Array.from(reg.keys());
        const values = Array.from(reg.values());
        return { keys, values };
    }

    /**
     * 获取所有同步注册表名
     * @returns {Array<String>} 所有同步注册表名
     */
    getAllSyncRegistry() {
        let keys = [];
        this.getRegistry('root').forEach((v, k) => {
            if (v.sync && !v.is_function) keys.push(k);
        });
        return keys;
    }

    /**
     * 获取注册表哈希值
     * @param {String} key 注册表名
     * @returns {String|undefined} 注册表哈希值
     */
    async getRegistryHash(key) {
        if (this.registryHashCache.has(key)) return this.registryHashCache.get(key);
        let reg = this.getRegistry(key);
        if (reg === undefined) return;
        const json = JSON.stringify(this.getRegistryKeysAndValues(key));
        const hash = await EchoLiveSystem.getHash(json).then(h => {
            this.registryHashCache.set(key, h);
            return h;
        });
        return hash;
    }

    /**
     * 获取同步注册表哈希值
     * @returns {Object} 同步注册表哈希值
     */
    async getSyncRegistryHash() {
        if (this.syncRegistryHashCache !== undefined) return this.syncRegistryHashCache;
        const keys = this.getAllSyncRegistry();
        const hash = await Promise.all(keys.map(e => this.getRegistryHash(e)));
        const totalHash = await EchoLiveSystem.getHash(hash.join(''));;
        this.syncRegistryHashCache = totalHash;
        return {
            hash: totalHash,
            registry: { keys, hash }
        };
    }

    /**
     * 创建注册表
     * @param {String} key 注册表名
     * @returns {Map|undefined} 注册表
     */
    createRegistry(key) {
        key = EchoLiveData.filter('namespace_id', 'pad_namespace', key);
        if (!EchoLiveData.check('namespace_id', key)) return;
        if (this.registry.get(key) !== undefined) return;
        this.registryHashCache.delete(key);
        return this.registry.set(key, new Map());
    }

    /**
     * 创建根注册表
     * @param {String} namespace 命名空间
     * @param {Object} map 注册表内容
     */
    createRootRegistry(namespace, map = {}) {
        this.createRegistry(`${namespace}:root`);
        this.registryHashCache.delete(`${namespace}:root`);

        for (const key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                const e = map[key];
                this.setRegistryValue(`${namespace}:root`, key, e);
                this.createRegistry(key);
            }
        }
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
        if (typeof value === 'object') return JSON.parse(JSON.stringify(value));
        return reg.get(key);
    }

    /**
     * 分页查询数据表值
     * @param {String} key 注册表名
     * @param {Number} page 页数
     * @param {Number} count 每页条目数
     * @returns {Array} 注册表值数组
     */
    getRegistryValueForPage(key, page = 1, count = 20) {
        let reg = this.getRegistry(key);
        if (reg === undefined) return;
        const values = Array.from(reg.values());
        const start = (page - 1) * count;
        const end = start + count;
        return {
            total: values.length,
            totalPage: Math.ceil(values.length / count),
            page: page,
            count: count,
            values: values.slice(start, end)
        };
    }

    /**
     * 在所有命名空间中获取注册表值
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @returns {Array<*>} 注册表值数组
     */
    getAllNamespaceRegistryValue(table, key) {
        let array = [];
        this.registry.forEach((v, k) => {
            let name = EchoLiveData.filter('namespace_id', 'get_id', k);
            if (name === table) {
                let v2;
                if (key !== undefined) {
                    v2 = this.getRegistryValue(k, key);
                    if (v2 !== undefined) array.push(v2);
                } else {
                    v2 = this.getRegistryArray(k);
                    array.push(...v2);
                }
            }
        });
        return array;
    }

    /**
     * 获取注册表默认值
     * @param {String} table 注册表名
     * @returns {*} 默认值
     */
    getRegistryDefaultValue(table) {
        const id = EchoLiveData.filter('namespace_id', 'get_id', table);
        let data = this.getRegistryValue(
            `${ EchoLiveData.filter('namespace_id', 'get_namespace', table) }:root`,
            id
        );
        while (typeof data?.inherit === 'string') {
            if (!EchoLiveData.check('namespace_id', data.inherit)) break;
            data = this.getRegistryValue(`${
                EchoLiveData.filter('namespace_id', 'get_namespace', data.inherit)
            }:root`, EchoLiveData.filter('namespace_id', 'get_id', data.inherit));
        }
        return data?.default_data;
    }

    /**
     * 是否为函数注册表
     * @param {String} table 注册表名
     * @returns {Boolean} 值
     */
    isFunctionRegistry(table) {
        const identifier = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
        const id = EchoLiveData.filter('namespace_id', 'get_id', identifier);
        const namespace = EchoLiveData.filter('namespace_id', 'get_namespace', identifier);

        if (this.isFunctionRegistryCache[identifier] !== undefined) return this.isFunctionRegistryCache[identifier];
        let data = this.getRegistryValue(
            `${ namespace }:root`,
            id
        );
        this.isFunctionRegistryCache[identifier] = data?.is_function ? true : false;
        return this.isFunctionRegistryCache[identifier];
    }

    /**
     * 设置注册表值
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @param {*} value 注册表值
     * @param {Object} data 附加数据
     * @param {Boolean} data.fill 强制覆盖
     * @param {Boolean} data.trigger_disable 禁用触发
     * @returns {*} 合并后的注册表值
     */
    setRegistryValue(table, key, value, data = {}) {
        if (key === undefined) return;
        if (typeof value === 'function') return this.setFunctionRegistryValue(table, key, value, data);
        table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
        let reg = this.getRegistry(table);
        if (reg === undefined) return;

        data = {
            fill: false,
            trigger_disable: false,
            ...data
        }

        this.registryHashCache.delete(table);

        if (typeof value === 'object') value = JSON.parse(JSON.stringify(value));
        const defaultData = this.getRegistryDefaultValue(table);

        const __setReg = v2 => {
            if (typeof defaultData === 'object' && typeof v2 === 'object' && !Array.isArray(v2)) {
                v2 = EchoLiveRegistry.__deepMerge(defaultData, v2)
            }
            reg.set(key, v2);
            if (!data.trigger_disable) this.trigger('setRegistryValue', table, key, { value: v2 });
            return v2;
        }

        let v = reg.get(key);
        if (!data.fill && typeof v === 'object' && !Array.isArray(v) && typeof value === 'object' && !Array.isArray(value)) {
            v = EchoLiveRegistry.__deepMerge(v, value);
            return __setReg(v);
        } else if (!data.fill && Array.isArray(v)) {
            if (Array.isArray(value)) {
                value.forEach(e => {
                    if (!v.includes(e)) v.push(e);
                });
            } else {
                if (!v.includes(e)) v.push(e);
            }
            return __setReg(v);
        } else {
            return __setReg(value);
        }
    }

    /**
     * 设置函数注册表值
     * @param {String} table 注册表名
     * @param {String} key 注册表键
     * @param {*} value 注册表值
     * @param {Object} data 附加数据
     * @param {Boolean} data.trigger_disable 禁用触发
     * @returns {*} 合并后的注册表值
     */
    setFunctionRegistryValue(table, key, value, data = {}) {
        if (key === undefined) return;
        if (typeof value !== 'function') return;
        if (!this.isFunctionRegistry(table)) return;
        table = EchoLiveData.filter('namespace_id', 'pad_namespace', table);
        let reg = this.getRegistry(table);
        if (reg === undefined) return;

        data = {
            trigger_disable: false,
            ...data
        }

        reg.set(key, value);
        if (!data.trigger_disable) this.trigger('setRegistryValue', table, key, { value: value });

        return value;
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
        const isFunReg = this.isFunctionRegistry(table);
        this.registryHashCache.delete(table);
        if (!Array.isArray(data)) data = [data];
        data.forEach(e => {
            let key;
            if (typeof getKey === 'function') {
                key = getKey(e);
            } else {
                key = e[getKey];
            }

            if (isFunReg) {
                this.setRegistryValue(table, key, e.value);
            } else {
                this.setRegistryValue(table, key, e);
            }
        });
        this.trigger('loadedRegistry', table, undefined, { value: data });
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
     * @param {Function} callback 回调
     * @returns {*} 回调返回值
     */
    registryRedirect(table, table2, key, callback = () => {}) {
        let value = this.getRegistryValue(table, key);
        if (value === undefined || (typeof value !== 'string' && typeof value !== 'number')) return callback(false, undefined, value);
        let regValue = this.getRegistryValue(table2, value);
        if (value === undefined) return callback(false, undefined, value);
        return callback(true, regValue, value);
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

class EchoLiveLocalDeviceManager {
    constructor() {
        this.enable = config.advanced.device.enable;
        this.vibrateMethod = {
            success: 30,
            error: [30, 50, 30],
            switch_on: [20, 100, 60],
            switch_off: [60, 100, 20]
        }
    }

    /**
     * 设备震动
     * @param {Array<Number>} data 震动参数
     */
    vibrate(data = []) {
        if (!this.enable) return;
        if (typeof navigator.vibrate !== 'function') return;
        try {
            return navigator.vibrate(data);
        } catch (_) {
            this.vibrate = () => {};
        }
    }

    /**
     * 设备震动（自动设定）
     * @param {'success'|'error'|'switch_on'|'switch_off'} name 震动方法
     */
    vibrateAuto(name) {
        if (!this.enable) return;
        if (this.vibrateMethod[name] === undefined) return;
        this.vibrate(this.vibrateMethod[name]);
    }
}

class EchoLiveOBSMiddleware {
    constructor() {
        this.enable = config.advanced?.obs_api?.allow_scene_name_set_attribute ?? true;
        this.initialized = false;
        this.obs = undefined;
        this.controlLevel = 0;

        this.init();
    }

    init() {
        try {
            this.obs = window.obsstudio;
            if (this.obs !== undefined) {
                this.obs.getControlLevel(level => this.controlLevel = level);
                this.initialized = true;
            }
        } catch (_) {}
    }

    __getData(method = '', callback = () => {}) {
        if (!this.enable || !this.initialized) return;
        this.obs[method]?.(callback);
    }

    getStatus(callback = () => {}) {
        this.__getData('getStatus', callback);
    }

    getScenes(callback = () => {}) {
        if (this.controlLevel < 2) return;
        this.__getData('getScenes', callback);
    }

    getCurrentScene(callback = () => {}) {
        if (this.controlLevel < 2) return;
        this.__getData('getCurrentScene', callback);
    }

    __parseKeyValuePairs(input) {
        if (typeof input !== 'string') return;
        const match = input.match(/\[([^\[\]]*)\](?!.*\[[^\[\]]*\])/);
        if (!match) return [];

        const content = match[1];
        const map = new Map();

        content
            .split(',')
            .map(pair => pair.trim())
            .filter(pair => pair.length > 0)
            .forEach(pair => {
                let key, value;
                if (pair.includes('=')) {
                    [key, value] = pair.split('=').map(s => s.trim());
                } else {
                    key = value = pair.trim();
                }
                map.set(key, value);
            });
        
        return Array.from(map.entries()).map(([key, value]) => ({ key, value }));
    }

    getCurrentSceneKeyValuePairs(callback = () => {}) {
        if (!this.enable || !this.initialized) return;
        this.getCurrentScene(scene => {
            callback(this.__parseKeyValuePairs(scene?.name));
        });
    }

    setAttributeFormSceneData(value) {
        if (value === undefined && (!this.enable || !this.initialized)) return;

        function __clearAttr() {
            let $root = $('html');
            let attrs = $root[0].attributes;
            let toRemove = [];

            for (let i = 0; i < attrs.length; i++) {
                let attr = attrs[i];
                if (attr && attr.name && attr.name.startsWith('user-custom-')) {
                    toRemove.push(attr.name);
                }
            }

            toRemove.forEach(function (name) {
                $root.removeAttr(name);
            });
        }

        function __setAttr(kv) {
            if (kv.length > 0) __clearAttr();
            kv.forEach(e => {
                try {
                    $('html').attr('user-custom-' + e.key, e.value);
                } catch (error) {
                    // if (error.name === 'InvalidCharacterError') {}
                }
            });
        }

        if (value !== undefined) {
            __setAttr(value);
            return;
        }

        this.getCurrentSceneKeyValuePairs(pairs => {
            __setAttr(pairs);
        });
    }

    syncAttributeFormSceneData() {
        if (!this.enable || !this.initialized) return;
        this.setAttributeFormSceneData();
        this.getCurrentScene(e => {
            $('html').css('--obs-scene-width', e.width + 'px');
            $('html').css('--obs-scene-height', e.height + 'px');
        });

        window.addEventListener('obsSceneChanged', e => {
            this.setAttributeFormSceneData(
                this.__parseKeyValuePairs(e.detail.name)
            );
            $('html').css('--obs-scene-width', e.detail.width + 'px');
            $('html').css('--obs-scene-height', e.detail.height + 'px');
        })
    }
}



class EchoLiveHook {
    constructor() {
        this.hooks = [];
        this.lastHookID = -1;
        this.debug = {
            log_trigger: false
        };
    }

    /**
     * 创建 Hook
     * @param {String} name 事件名称
     * @param {Function} method 方法
     * @returns {EchoLiveHookUnit} Hook Unit
     */
    create(name, method = () => {}) {
        this.hooks.push({
            name: name,
            id: ++this.lastHookID,
            method: method
        });
        return new EchoLiveHookUnit(this.lastHookID, name);
    }

    /**
     * 查找 Hook
     * @param {Number} id Hook ID
     * @returns {Object} Hook 数据
     */
    find(id) {
        return this.hooks.find(e => e.id === id);
    }

    /**
     * 查找 Hook 索引
     * @param {Number} id Hook ID
     * @returns {Number} Hook 索引
     */
    findIndex(id) {
        return this.hooks.findIndex(e => e.id === id);
    }

    /**
     * 查找 Hook 在事件中的索引
     * @param {String} name 事件名称
     * @param {Number} id Hook ID
     * @returns {Number} Hook 索引
     */
    findIndexByName(name, id) {
        return this.filter(name).findIndex(e => e.id === id);
    }

    /**
     * 过滤 Hook
     * @param {String} name 事件名称
     * @returns {Object} Hook 数据
     */
    filter(name) {
        return this.hooks.filter(e => e.name === name);
    }

    /**
     * 移除 Hook
     * @param {Number} id Hook ID
     */
    remove(id) {
        const index = this.findIndex(id);
        if (index === -1) return;
        this.hooks.splice(index, 1);
    }

    /**
     * 清空 Hook
     * @param {String|undefined} name 事件名称
     */
    clear(name) {
        if (name === undefined) {
            this.hooks = [];
        }

        this.hooks = this.hooks.filter(e => e.name !== e.name);
    }

    /**
     * 触发 Hook
     * @param {String} name 事件名称
     * @param {*} data 数据 
     */
    trigger(name, data) {
        if (this.debug.log_trigger) console.log('Hook: ' + name, data);

        let r = this.filter(name);
        r.forEach(e => {
            e.method({
                ...data,
                hook: new EchoLiveHookUnit(e.id, e.name)
            });
        });
    }
}



class EchoLiveHookUnit {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    get parent() {
        return echoLiveSystem.hook;
    }

    get index() {
        return this.parent.findIndex(this.id);
    }

    get indexByName() {
        return this.parent.findIndexByName(this.name, this.id);
    }

    remove() {
        this.parent.remove(this.id);
    }
}

// class EchoLiveLog {
//     constructor() {
//         this.logs = [];
//     }

//     /**
//      * 添加日志
//      * @param {'debug'|'info'|'warn'|'error'} type 日志类型
//      * @param {String} key 日志键名
//      * @param {*} data 日志数据
//      */
//     log(type, key, data) {
//         this.logs.push({
//             time: new Date().getTime(),
//             type: type,
//             key: key,
//             data: data
//         });
//     }

//     debug(key, data) {
//         return this.log('debug', key, data);
//     }

//     info(key, data) {
//         return this.log('info', key, data);
//     }

//     warn(key, data) {
//         return this.log('warn', key, data);
//     }

//     error(key, data) {
//         return this.log('error', key, data);
//     }
// }



let echoLiveSystem = new EchoLiveSystem();