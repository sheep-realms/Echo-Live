/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class StatisticManager {
    constructor(localStorageManager) {
        this.localStorageManager = localStorageManager;
        this.event = {
            exportStatistic: () => {}
        };

        this.init();
    }

    init() {
        let s = this.localStorageManager.getItem('statistic');
        if (s === undefined) {
            s = {
                meta: {
                    project_name: 'echolive',
                    data_version: 1,
                    first_created_at: Date.now(),
                    last_modified_at: Date.now()
                },
                scope: {}
            }
            this.localStorageManager.setItem('statistic', s);
        } else if (new Date(s.meta.last_modified_at).getFullYear() < new Date().getFullYear()) {
            this.generateSnapshot('statistical_cycle_end');
            this._updateLastModifiedAt(s);
            this.localStorageManager.setItem('statistic', s);
        }

        const statisticDays = Math.max(
            StatisticManager._diffDays(s.meta.first_created_at, Date.now()) + 1,
            1
        );
        this.setStatsItem('overview.statistic_days', statisticDays);

        const statsInfo = echoLiveSystem.registry.getRegistryArray('statistic');
        const dailyIncrement = statsInfo.filter(e => e.source === 'daily_increment' && e.type === 'number');
        dailyIncrement.forEach(e => {
            const date = this.getStatsItem(e.reference);
            const value = this.getStatsItem(e.name);
            let diff = StatisticManager._diffDays(date, Date.now());
            if (diff > 0 && value < statisticDays) {
                this.addStatsItemValue(e.name);
            }
        });
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
    static _getByPath(data, path) {
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
    static _setByPath(data, path, value) {
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
     * 日期比较
     * @param {number} A 目标时间戳
     * @param {number} B 比较时间戳
     * @returns {number} 天数
     */
    static _diffDays(A, B) {
        const OFFSET = 4 * 60 * 60 * 1000;

        function getBusinessDateIndex(ts) {
            const d = new Date(ts - OFFSET);
            const y = d.getFullYear();
            const m = d.getMonth();
            const day = d.getDate();

            return Date.UTC(y, m, day) / 86400000;
        }

        return getBusinessDateIndex(B) - getBusinessDateIndex(A);
    }

    /**
     * 获取统计信息
     * @param {String} key 统计项目
     * @returns {*} 统计信息
     */
    getStatsItem(key) {
        const data = this.localStorageManager.getItem('statistic');
        const value = StatisticManager._getByPath(data.scope, key);
        if (value !== null) {
            return value;
        } else {
            const defaultValue = echoLiveSystem.registry.getRegistryValue('statistic', key)?.default;
            if (defaultValue !== undefined) {
                return defaultValue;
            } else {
                return null
            }
        }
    }

    /**
     * 写入统计信息
     * @param {String} key 统计项目
     * @param {*} value 统计信息
     * @returns {*} 统计信息
     */
    setStatsItem(key, value) {
        let data = this.localStorageManager.getItem('statistic');
        if (StatisticManager._setByPath(data.scope, key, value)) {
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
            date = date.getTime();
        } else if (typeof date === 'string') {
            let d = new Date(date)
            date = d.getTime();
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

    /**
     * 更新统计最大值
     * @param {String} key 统计项目
     * @param {*} value 值
     * @returns {Number|NaN|null} 返回值
     */
    updateStatsItemMaxValue(key, value) {
        let v = this.getStatsItem(key);
        if (v === undefined || v === null) return null;
        if (typeof v !== 'number' || typeof value !== 'number') return NaN;
        if (value > v) {
            return this.setStatsItem(key, value);
        } else {
            return v;
        }
    }

    exportStatistic() {
        this.event.exportStatistic();
        let data = {};
        let loadedKey = [];

        const _getStatsValue = key => {
            if (loadedKey.includes(key)) return StatisticManager._getByPath(data, key);
            loadedKey.push(key);

            const statsItem = echoLiveSystem.registry.getRegistryValue('statistic', key);
            let value;
            if (statsItem.source === 'method') {
                let method = echoLiveSystem.registry.getRegistryValue('statistic_method', key);
                if (typeof method !== 'function') {
                    value = statsItem.default || 0;
                    StatisticManager._setByPath(data, key, value);
                    return value;
                }
                value = method({
                    getValue: _getStatsValue,
                    getValues: _getStatsValues
                }) || 0;
                StatisticManager._setByPath(data, key, value);
                return value;
            } else {
                value = this.getStatsItem(key) || statsItem.default || 0
                StatisticManager._setByPath(data, key, value);
                return value;
            }
        };
        const _getStatsValues = (keys) => {
            if (!Array.isArray(keys)) keys = [keys];
            let r = [];
            keys.forEach(key => {
                r.push(_getStatsValue(key));
            });
            return r;
        };

        echoLiveSystem.registry.forEach('statistic', (_, key) => {
            if (!loadedKey.includes(key)) _getStatsValue(key);
        });
        const { meta } = this.localStorageManager.getItem('statistic');
        return {
            meta,
            scope: data
        };
    }

    /**
     * 创建快照
     * @param {'manual_dispatch'|'statistical_cycle_end'} createdBy 
     * @returns {Promise<Number>} 新记录 ID
     */
    generateSnapshot(createdBy = 'manual_dispatch') {
        const data = this.exportStatistic();
        const snapshot = {
            meta: {
                created_by: createdBy,
                created_at: Date.now()
            },
            content: data
        };
        return this.localStorageManager.addIncrement('statistic_snapshot', snapshot);
    }

    async rollbackStatisticFormSnapshot(id) {
        const data = await this.localStorageManager.getIncrement('statistic_snapshot', id);
        if (typeof data.payload !== 'object' || typeof data.payload?.content !== 'object') {
            return new Promise((resolve, reject) => reject());
        }
        this.localStorageManager.setItem('statistic', data.payload.content);
        return new Promise((resolve, reject) => resolve());
    }
}


class SessionMaxMetric {
    constructor(parent) {
        this.parent = parent;
        this.statisticData = {};
    }

    commit() {
        for (const key in this.statisticData) {
            if (!Object.hasOwn(this.statisticData, key)) continue;
            const e = this.statisticData[key];
            this.parent.updateStatsItemMaxValue(key, e);
        }
    }

    /**
     * 增加统计数值
     * @param {String} key 统计项目
     * @param {Number} value 增加的值
     * @returns {Number|NaN} 返回值
     */
    addValue(key, value = 1) {
        let v = this.statisticData[key];
        if (v === undefined) v = 0;
        if (typeof v !== 'number') return NaN;
        v += value;
        this.parent.updateStatsItemMaxValue(key, v);
        return this.statisticData[key] = v;
    }

    /**
     * 批量增加统计数值
     * @param {String} keys 统计项目列表
     * @param {Number} value 增加的值
     * @returns {Object<Number|NaN>} 返回值
     */
    addValues(keys = [], value = 1) {
        let r = {};
        keys.forEach(e => {
            r[e] = this.addStatsItemValue(e, value);
        });
        return r;
    }
}


class StatisticReportFactory {
    constructor() {}

    static statsItem(value, statsInfo) {
        return `<dl><dt>${ $t('statistic.' + statsInfo.name) }</dt><dd>${ StatisticReportFactory.statsValue(value, statsInfo) }</dd></dl>`;
    }

    static statsValue(value, statsInfo) {
        let str = '';

        if (statsInfo?.type === 'timestamp') {
            if (value > 0) {
                str = EchoLiveTools.formatDate(value, 'date_time_pad_zero');
            } else {
                str = $t('statistic_info.empty_timestamp')
            }
            return str;
        } else if (statsInfo?.unit === 'long_sec') {
            let longSecFormat = EchoLiveTools.formatDuration(value);
            let n = 0;
            if (longSecFormat.d > 0) {
                n = 2;
            } else if (longSecFormat.h > 0) {
                n = 1
            } else if (longSecFormat.m === 0) {
                return value + ' ' + $t('unit.sec');
            }
            return `<span title="${ value }">${$t('unit.long_sec', { n, ...longSecFormat })}</span>`;
        } else if (statsInfo?.unit === 'rate') {
            return `<span title="${ value }">${parseFloat((value * 100).toFixed(2)) + ' ' + $t('unit.rate')}</span>`;
        } else {
            return `<span title="${ value }">${$tn(value, {
                unit: statsInfo?.unit !== undefined ? $t('unit.' + statsInfo.unit) : ''
            })}</span>`;
        }
    }

    static statsList(data) {
        let dom = '';
        echoLiveSystem.registry.forEach('statistic', (info, key) => {
            let value = StatisticManager._getByPath(data.scope, key);
            dom += StatisticReportFactory.statsItem(value, info);
        });
        return dom;
    }

    static statsTable(data) {
        return `<div class="statistic-table">
            ${ StatisticReportFactory.statsList(data) }
            <div class="statistic-footer">
                ${ $t(
                    'statistic_info.footer_description',
                    {
                        created_at: EchoLiveTools.formatDate(data.meta.first_created_at),
                        modified_at: EchoLiveTools.formatDate(data.meta.last_modified_at)
                    }
                ) }
            </div>
        </div>`
    }
}