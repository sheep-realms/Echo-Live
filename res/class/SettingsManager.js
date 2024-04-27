class SettingsManager {
    constructor(configDefine = []) {
        this.configDefine = configDefine;
        this.config = {};
        this.configBackup = {};
    }

    getConfigDefine(prefix = '', verMin = 0, verMax = 100000) {
        if (prefix == '') return this.configDefine.filter((e) => {
            return e.created >= verMin && e.created <= verMax;
        });;
        return this.configDefine.filter((e) => {
            return e.name.search(new RegExp(prefix + '\\.')) == 0 && e.created >= verMin && e.created <= verMax;
        });
    }

    findIndexConfigDefine(name) {
        return this.configDefine.findIndex((e) => {
            return e.name == name;
        });
    }

    setIndexConfigDefine(index, value) {
        this.configDefine[index] = value;
    }

    getConfig(key) {
        let keys = key.split('.');
        let objConfig = this.config;
        for (const k of keys) {
            if (objConfig[k] == undefined) {
                return undefined;
            }
            objConfig = objConfig[k];
        }

        return objConfig;
    }

    setConfig(key, value, onlyUndefined = false) {
        const keys = key.split('.');
        let nestedObj = this.config;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!nestedObj[keys[i]]) {
                nestedObj[keys[i]] = {};
            }
            nestedObj = nestedObj[keys[i]];
        }

        if (onlyUndefined && nestedObj[keys[keys.length - 1]] != undefined) return nestedObj[keys[keys.length - 1]];
        nestedObj[keys[keys.length - 1]] = value;
    }

    deleteConfig(key) {
        const keys = key.split('.');
        let current = this.config;
    
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) {
                return;
            }
            current = current[key];
        }
    
        delete current[keys[keys.length - 1]];
    }

    importConfig(value) {
        if (typeof value != 'object') return;
        this.configBackup = this.config;
        return this.config = value;
    }

    rollbackConfig() {
        return this.config = this.configBackup;
    }

    /**
     * 升级配置
     * @param {Number} ver 目标版本号
     * @returns {Object} 升级后的配置
     */
    updateConfig(ver) {
        if (this.config.data_version >= ver) return;

        while (this.config.data_version < ver) {
            this.config.data_version++;
            let cd = this.getConfigDefine('', this.config.data_version, this.config.data_version);

            cd.forEach(e => {
                this.setConfig(e.name, e.default);
                if (typeof e?.from == 'string') {
                    let v = this.getConfig(e.from);
                    if (v != undefined) {
                        this.setConfig(e.name, v);
                        this.deleteConfig(e.from);
                    }
                }
            });
        }
        
        return this.config;
    }

    /**
     * 从未知的版本升级配置
     * @param {Number} ver 目标版本号
     * @returns {Object} 升级后的配置
     */
    updateConfigFromUnknowVersion(ver) {
        this.config.data_version = ver;

        let cd = this.getConfigDefine('', 0, ver);

        cd.forEach(e => {
            this.setConfig(e.name, e.default, true);
        });

        return this.config
    }
}