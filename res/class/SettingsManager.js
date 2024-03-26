class SettingsManager {
    constructor(configDefine = []) {
        this.configDefine = configDefine;
    }

    getConfigDefine(prefix = '') {
        if (prefix == '') return this.configDefine;
        return this.configDefine.filter((e) => {
            return e.name.search(new RegExp(prefix + '\\.')) == 0 && e.created >= 0;
        });
    }

    findIndexConfig(name) {
        return this.configDefine.findIndex((e) => {
            return e.name == name;
        });
    }

    setIndexConfig(index, value) {
        this.configDefine[index] = value;
    }
}