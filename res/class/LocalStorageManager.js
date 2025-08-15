/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class LocalStorageManager {
    constructor(name = 'echolive') {
        this.name = name;

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        const s = localStorage.getItem(this.name);
        if (s == null) {
            localStorage.setItem(this.name, '{}');
            this.setItem('data_version', 1);
        }
    }

    /**
     * 清空存储
     */
    clear() {
        localStorage.removeItem(this.name);
    }

    /**
     * 获取存储项
     * @param {String} key 键名
     * @returns {*} 值
     */
    getItem(key) {
        const s = localStorage.getItem(this.name);
        if (s == null) return;
        let data;
        try {
            data = JSON.parse(s);
        } catch (_) {
            return;
        }

        if (key === undefined) return data;

        return data[key];
    }

    /**
     * 写入存储项
     * @param {String} key 键名
     * @param {*} value 值
     * @returns {*} 存储内容
     */
    setItem(key, value) {
        let data = this.getItem();
        if (typeof data != 'object') return;
        data[key] = value;
        let json;
        try {
            json = JSON.stringify(data);
        } catch (_) {
            return;
        }
        localStorage.setItem(this.name, json);
        return data;
    }

    getTutorialFlag(key) {
        let data = this.getItem('tutorial');
        data ??= {};
        return data[key] !== undefined ? data[key] : false;
    }

    setTutorialFlag(key, value = true) {
        if (typeof value !== 'boolean') return;
        let data = this.getItem('tutorial');
        data ??= {};
        data[key] = value;
        this.setItem('tutorial', data);
        return value;
    }
}