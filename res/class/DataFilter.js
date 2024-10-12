class DataFilter {
    /**
     * 数据过滤器
     * @description 请注意将高开销条件后置
     * @param {String} filterText 检索语句
     * @param {Object|DataFilterConditions} conditions 条件列表
     * @param {Array<Object>} data 检索数据
     * @param {Function} dataUpdater 数据更新过程
     */
    constructor(filterText = '', conditions = [], data = [], dataUpdater = undefined) {
        this.filterText = filterText;
        this.data = data;
        this.dataUpdater = dataUpdater;
        this.conditions = conditions;
        this.keywords = [];
        this.filterMethod = 'auto';
        this.updateRequired = true;

        if (!(this.conditions instanceof DataFilterConditions)) {
            this.conditions = new DataFilterConditions(conditions);
        }
    }

    static {
        EchoLiveTools.defineObjectPropertyReadOnly(DataFilter, {
            REGEXP_CONDITION: /(\S+):(\s*)("(?:[^"\\]|\\.)*"|\((?:[^()"\\]|"[^"]*"|\\.)*\)|(\S+))/g,
            REGEXP_HAS_SPACE_KEYWORD: /"[^"\\]*(?:\\.[^"\\]*)*"/g,
            REGEXP_SPACE: /\s+/g,
            REGEXP_QUOTATION_MARK: /\\"/g,
            REGEXP_TIME: /^(?:[0-9]|1\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/
        });
    }

    /**
     * 比较数组权重
     * @param {Array<Number>} a 数组
     * @param {Array<Number>} b 数组
     * @returns {Number} -1 ~ 1
     */
    static compareArrays(a, b) {
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            if (a[i] > b[i]) {
                return 1;  // A > B
            } else if (a[i] < b[i]) {
                return -1;   // A < B
            }
        }

        if (a.length > b.length) {
            return 1;      // A更长且前面都相等，则A > B
        } else if (a.length < b.length) {
            return -1;       // B更长且前面都相等，则A < B
        }
        
        return 0;
    }

    /**
     * 是否有数据更新器
     */
    get hasDataUpdater() {
        if (typeof this.dataUpdater === 'function') return true;
        return false;
    }

    /**
     * 检索数据
     * @param {String} filterText 检索语句
     * @returns {Array<*>} 结果
     */
    filter(filterText = this.filterText) {
        if (this.updateRequired) {
            this.updateRequired = false;
            if (this.hasDataUpdater) {
                this.data = this.dataUpdater(this.data);
            }
        }

        function __getHasSpaceKeyword(text) {
            return text.substring(1, text.length - 1).replace(DataFilter.REGEXP_QUOTATION_MARK, '"');
        }

        function __getArrayKeyword(text) {
            text = text.substring(1, text.length - 1);
            let arr = text.split(',');
            arr.forEach((e, i) => {
                arr[i] = e.trim()
                if (arr[i].startsWith('"') && arr[i].endsWith('"')) {
                    arr[i] = __getHasSpaceKeyword(arr[i]);
                }
            });
            return arr;
        }

        let conditions = filterText.match(DataFilter.REGEXP_CONDITION);
        let hasSpaceKeywords = filterText.match(DataFilter.REGEXP_HAS_SPACE_KEYWORD);
        filterText = filterText.replace(DataFilter.REGEXP_CONDITION, '');
        filterText = filterText.replace(DataFilter.REGEXP_HAS_SPACE_KEYWORD, '');
        filterText = filterText.replace(DataFilter.REGEXP_SPACE, ' ');
        let keywords = filterText.trim().split(' ');
        
        if (hasSpaceKeywords === null) hasSpaceKeywords = [];
        hasSpaceKeywords.forEach((e, i) => {
            hasSpaceKeywords[i] = __getHasSpaceKeyword(e);
        });
        
        if (hasSpaceKeywords !== null) {
            keywords = [...hasSpaceKeywords, ...keywords];
        }

        let conditionSplit = [];
        let search = [];
        let conditionLength = 0;

        if (conditions === null) conditions = [];
        if (conditions.length > 0) {
            let txt;
            conditions.forEach(e => {
                txt = e.split(':');
                txt.forEach((e, i) => txt[i] = e.trim());
                conditionSplit.push(txt);
            });

            conditionSplit.forEach((e, i) => {
                e.forEach((e2, i2) => {
                    if (e2.startsWith('"') && e2.endsWith('"')) {
                        conditionSplit[i][i2] = __getHasSpaceKeyword(e2);
                    }
                });
            });

            conditionSplit.forEach((e, i) => {
                if (e[1].startsWith('(') && e[1].endsWith(')')) {
                    conditionSplit[i][1] = __getArrayKeyword(e[1]);
                }
            });
            
            conditionSplit.forEach(e => {
                search.push({
                    name: e[0],
                    value: e[1]
                });
                if (Array.isArray(e[1])) {
                    conditionLength += e[1].length
                } else {
                    conditionLength++;
                }
            });
        }

        let r;

        if (this.filterMethod === 'row' || (this.filterMethod === 'auto' && this.data.length / conditionLength <= 1)) {
            r = this.data.filter(e => {
                return this.conditions.check(search, keywords, e);
            });
        } else {
            r = this.data;
            this.conditions.forEachConditions(e => {
                if (e.name === 'main' && keywords.length > 0) {
                    let value;
                    r = r.filter(e2 => {
                        value = this.conditions.mappingOfValue(e, e2);
                        if (this.conditions.search(value, keywords)) {
                            e2.__index = this.conditions.searchIndexOf(value, keywords)
                            return true;
                        };
                        return false;
                    });
                } else if (this.conditions.checkSearchByName(e.name, search)) {
                    r = r.filter(e2 => {
                        return this.conditions.checkForConditionByName(e.name, search, e2);
                    });
                }
            });
        }

        if (r.length == 0) return r;
        r.sort((a, b) => DataFilter.compareArrays(a.__index, b.__index));

        return r;
    }
}

class DataFilterConditions {
    /**
     * 条件列表
     * @param {Array<Object>} conditions 条件数据
     */
    constructor(conditions = []) {
        this.conditions = conditions;
        
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.conditions.forEach((e, i) => {
            this.conditions[i] = {
                name: 'missingno',
                type: 'string',
                map: {
                    value: '',
                    search: ''
                },
                ...e
            };
        });
    }

    forEachConditions(action) {
        this.conditions.forEach(action);
    }

    /**
     * 查找条件
     * @param {String} name 条件名称
     * @returns {Object} 条件数据
     */
    findCondition(name) {
        let r = this.conditions.filter(e => e.name === name);
        if (r.length == 0) return;
        return r[0];
    }

    /**
     * 映射
     * @param {'value'|'search'} type 类型
     * @param {Object} condition 条件数据
     * @param {Object} item 检索数据
     * @returns {*} 数据
     */
    mapping(type = 'value', condition = {}, item = {}) {
        if (typeof condition?.map[type] === 'string' || (type === 'value' && Array.isArray(condition.map.value))) {
            if (type === 'search') {
                let r = item.filter(e => e.name === condition.map.search);
                if (r.length == 0) return;
                return r;
            } else {
                if (Array.isArray(condition.map.value)) {
                    let vl = [];
                    condition.map.value.forEach(e => {
                        vl.push(item[e]);
                    });
                    return vl;
                } else {
                    return item[condition.map.value];
                }
                
            }
        } else if (typeof condition?.map[type] === 'function') {
            return condition.map[type](item);
        }
        return;
    }

    mappingByName(type = 'value', name, item = {}) {
        let r = this.findCondition(name);
        if (r === undefined) return;
        return this.mapping(type, r, item);
    }

    mappingOfValue(condition = {}, item = {}) {
        return this.mapping('value', condition, item);
    }

    mappingOfValueByName(condition = {}, item = {}) {
        return this.mappingByName('value', condition, item);
    }

    mappingOfSearch(condition = {}, item = {}) {
        return this.mapping('search', condition, item);
    }

    mappingOfSearchByName(condition = {}, item = {}) {
        return this.mappingByName('search', condition, item);
    }

    /**
     * 条件检查
     * @param {Array<Object>} search 检索条件列表
     * @param {Array} keywords 关键词
     * @param {Object} item 检索数据
     * @returns {Boolean} 结果
     */
    check(search, keywords = [], item) {
        if (search.length == 0) {
            let mainCondition = this.findCondition('main');
            return this.search(this.mappingOfValue(mainCondition, item), keywords);
        }

        let r = true;
        for (let i = 0; i < this.conditions.length; i++) {
            const e = this.conditions[i];
            if (e.name === 'main' && keywords.length > 0) {
                let value = this.mappingOfValue(e, item);
                r = this.search(value, keywords);
                if (r) item.__index = this.searchIndexOf(value, keywords);
            } else {
                r = this.checkForCondition(e, search, item);
            }
            if (!r) return false;
        }
        return r;
    }

    /**
     * 检查单一条件
     * @param {Object} condition 条件数据
     * @param {Array<Object>} searchData 检索条件
     * @param {Object} item 检索数据
     * @returns {Boolean} 结果
     */
    checkForCondition(condition, searchData, item) {
        const search = this.mappingOfSearch(condition, searchData);
        if (search === undefined) return true;
        const value = this.mappingOfValue(condition, item);
        if (value === undefined) return true;

        function __checkNumberRange(search, value) {
            value = Number(value);
            if (String(search).search('..') != -1) {
                let min = search.split('..')[0];
                let max = search.split('..')[1];
                min = Number(min === '' ? -Infinity : min);
                max = Number(max === '' ? Infinity : max);
                return value >= min && value <= max
            } else {
                return Number(search) === value;
            }
        }

        function __checkDateRange(search, value) {
            value = __fixDate(value);
            value = new Date(value);
            if (Number.isNaN(value.getTime())) return false;

            if (String(search).search('..') != -1) {
                let min = search.split('..')[0];
                let max = search.split('..')[1];
                min === '' ? min = new Date(0) : min = new Date(min);
                max === '' ? max = new Date(9.99999e14) : max = new Date(max);
                if (typeof min !== 'object') min = new Date(min);
                if (typeof max !== 'object') max = new Date(max);
                return value.getTime() >= min.getTime() && value.getTime() <= max.getTime()
            } else {
                return search.getTime() === value.getTime();
            }
        }

        function __fixDate(text) {
            if (DataFilter.REGEXP_TIME.test(text)) {
                let date = EchoLiveTools.formatDateToObject();
                text = `${date.y}/${date.M}/${date.d} ${text}`
            }
            return text;
        }

        function __checkAllCondition(action) {
            let r = true;
            for (let i = 0; i < search.length; i++) {
                const e = search[i].value;
                if (Array.isArray(e)) {
                    for (let j = 0; j < e.length; j++) {
                        const e2 = e[j];
                        r = action(e2, value);
                        if (r) break;
                    }
                } else {
                    r = action(e, value);
                }
                if (!r) return false;
            }
            return r;
        }

        if (condition.type === 'string') {
            return __checkAllCondition((s, v) => s === v);
        } else if (condition.type === 'number') {
            return __checkAllCondition(__checkNumberRange);
        } else if (condition.type === 'date') {
            return __checkAllCondition(__checkDateRange);
        }
        return true;
    }

    checkSearchByName(name, searchData) {
        const search = this.mappingOfSearch(this.findCondition(name), searchData);
        if (search === undefined) return false;
        return true;
    }

    checkForConditionByName(name, searchData, item) {
        return this.checkForCondition(this.findCondition(name), searchData, item);
    }

    /**
     * 关键词搜索检查
     * @param {String|Array<String>} text 待查询字符串
     * @param {Array<String>} keywords 关键词列表
     * @returns {Boolean} 结果
     */
    search(text, keywords) {
        if (!Array.isArray(text)) text = [text];

        text.forEach((e, i) => {
            text[i] = String(e);
        });

        for (let i = 0; i < keywords.length; i++) {
            const e = keywords[i];
            let r = false;
            for (let j = 0; j < text.length; j++) {
                const e2 = text[j];
                r = r || e2.search(e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) >= 0;
            }
            if (!r) return false;
        }
        return true;
    }

    /**
     * 关键词权重查询
     * @param {String|Array<String>} text 待查询字符串
     * @param {Array<String>} keywords 关键词列表
     * @returns {Array<Number>} 结果
     */
    searchIndexOf(text, keywords) {
        if (!Array.isArray(text)) text = [text];

        text.forEach((e, i) => {
            text[i] = String(e);
        });
        
        let r = [];
        for (let i = 0; i < text.length; i++) {
            const e = text[i];
            r[i] = [];
            for (let j = 0; j < keywords.length; j++) {
                const e2 = keywords[j];
                r[i][j] = e.search(e2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                if (r[i][j] < 0) r[i][j] = Infinity;
            }
            r[i] = Math.min(...r[i]);
        }
        return r;
    }
}





// const testData = [
//     { id: 0, username: 'sheep', type: 'open', message: 'test 1', message2: 'echo' },
//     { id: 1, username: 'sheep', type: 'closed', message: 'test 22 apple', message2: 'echo' },
//     { id: 2, username: 'echo', type: 'open', message: 'test 1 apple', message2: 'echo' },
//     { id: 3, username: 'echo', type: 'closed', message: 'test 2', message2: 'echo' },
//     { id: 4, username: 'test', type: 'open', message: 'test 1', message2: 'echo' },
//     { id: 5, username: 'test', type: 'closed', message: 'test 22 apple', message2: 'echo' },
//     { id: 6, username: 'echo', type: 'open', message: 'echo', message2: 'test apple' }
// ];

// let df = new DataFilter('', [
//     {
//         name: 'name',
//         type: 'string',
//         map: {
//             value: 'username',
//             search: 'name'
//         }
//     }, {
//         name: 'id',
//         type: 'number',
//         map: {
//             value: 'id',
//             search: 'id'
//         }
//     }, {
//         name: 'type',
//         type: 'string',
//         map: {
//             value: 'type',
//             search: 'type'
//         }
//     }, {
//         name: 'main',
//         type: 'string',
//         map: {
//             value: [
//                 'message',
//                 'message2'
//             ]
//         }
//     }
// ], testData);