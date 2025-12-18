/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class StatisticManager {
    constructor(localStorageManager) {
        this.localStorageManager = localStorageManager;

        this.init();
    }

    init() {
        let s = this.localStorageManager.getItem('statistic');
        if (s === undefined) {
            this.localStorageManager.setItem('statistic', {
                meta: {
                    project_name: 'echolive',
                    data_version: 1,
                    first_created_at: Date.now(),
                    last_modified_at: Date.now()
                },
                scope: {}
            });
        }
    }

    /**
     * 更新统计信息最后修改时间
     * @param {Object} data 统计信息
     * @private
     */
    _updateLastModifiedAt(data) {
        data.meta.last_modified_at = Date.now();
    }

    /**
     * 按地址查找数据
     * @param {Object} data 数据
     * @param {String} path 地址
     * @private
     */
    _getByPath(data, path) {
        if (data === null || typeof data !== 'object') return null;

        const segments = path.split('.');

        let current = data;

        for (let i = 0; i < segments.length; i++) {
            const key = segments[i];

            if (current === null || typeof current !== 'object') return null;
            if (Array.isArray(current)) return null;
            if (!Object.prototype.hasOwnProperty.call(current, key)) return null;

            current = current[key];
        }

        return current;
    }

    /**
     * 按地址写入数据
     * @param {Object} data 数据
     * @param {String} path 地址
     * @param {*} value 值
     * @private
     */
    _setByPath(data, path, value) {
        if (data === null || typeof data !== 'object') {
            return false;
        }

        const segments = path.split('.');
        let current = data;

        for (let i = 0; i < segments.length; i++) {
            const key = segments[i];
            const isLast = i === segments.length - 1;

            if (current === null || typeof current !== 'object') return false;
            if (Array.isArray(current)) return false;

            if (isLast) {
                current[key] = value;
                return true;
            }

            if (!Object.prototype.hasOwnProperty.call(current, key)) {
                current[key] = {};
            } else if (
                current[key] === null ||
                typeof current[key] !== 'object' ||
                Array.isArray(current[key])
            ) {
                return false;
            }

            current = current[key];
        }

        return false;
    }

    /**
     * 获取统计信息
     * @param {String} key 统计项目
     * @returns {*} 统计信息
     */
    getStatsItem(key) {
        const data = this.localStorageManager.getItem('statistic');
        return this._getByPath(data.scope, key);
    }

    /**
     * 写入统计信息
     * @param {String} key 统计项目
     * @param {*} value 统计信息
     * @returns {*} 统计信息
     */
    setStatsItem(key, value) {
        let data = this.localStorageManager.getItem('statistic');
        if (this._setByPath(data.scope, key, value)) {
            this._updateLastModifiedAt(data);
            this.localStorageManager.setItem('statistic', data);
            return value;
        } else {
            return null;
        }
    }

    /**
     * 设置统计时间
     * @param {String} key 统计项目
     * @param {undefined|Number|String|Date} value 日期时间
     * @returns {*} 返回值
     */
    setStatsItemTime(key, value) {
        let date = value;
        if (date === undefined) {
            date = Date.now();
        } else if (typeof date === 'number') {
            // 什么也不用做
        } else if (date instanceof Date) {
            date = date.now();
        } else if (typeof date === 'string') {
            date = new Date(date).now();
        } else {
            return null;
        }
        return this.setStatsItem(key, date);
    }

    /**
     * 增加统计数值
     * @param {String} key 统计项目
     * @param {Number} value 增加的值
     * @returns {Number|NaN|null} 返回值
     */
    addStatsItemValue(key, value = 1) {
        let v = this.getStatsItem(key);
        if (v === undefined || v === null) v = 0;
        if (typeof v !== 'number') return NaN;
        v += value;
        return this.setStatsItem(key, v);
    }

    /**
     * 批量增加统计数值
     * @param {String} keys 统计项目列表
     * @param {Number} value 增加的值
     * @returns {Object<Number|NaN|null>} 返回值
     */
    addStatsItemValues(keys = [], value = 1) {
        let r = {};
        keys.forEach(e => {
            r[e] = this.addStatsItemValue(e, value);
        });
        return r;
    }
}