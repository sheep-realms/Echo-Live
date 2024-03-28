class SettingsManager {
    constructor(configDefine = []) {
        this.configDefine = configDefine;
        this.config = {};
    }

    getConfigDefine(prefix = '') {
        if (prefix == '') return this.configDefine.filter((e) => {
            return e.created >= 0;
        });;
        return this.configDefine.filter((e) => {
            return e.name.search(new RegExp(prefix + '\\.')) == 0 && e.created >= 0;
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

    setConfig(key, value) {
        const keys = key.split('.');
        let nestedObj = this.config;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!nestedObj[keys[i]]) {
                nestedObj[keys[i]] = {};
            }
            nestedObj = nestedObj[keys[i]];
        }

        nestedObj[keys[keys.length - 1]] = value;
    }

    importConfig(value) {
        if (typeof value != 'object') return;
        return this.config = value;
    }
}