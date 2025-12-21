/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class LocalStorageManager {
    constructor(name = 'echolive') {
        this.name = name;
        this.maxLength = 1500000;
        this.idbAvailable = 'indexedDB' in window;
        this.dbName = `${name}-db`;
        this.cacheStoreName = '__cache__';

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        const s = localStorage.getItem(this.name);
        if (s === null || s.length > this.maxLength) {
            localStorage.setItem(this.name, '{}');
            this.setItem('data_version', 2);
            return;
        }

        const sp = JSON.parse(s);
        if (sp?.data_version === 1) {
            this.setItem('data_version', 2);
            this.removeItem('updater');
            // if (Array.isArray(sp?.images_cache)) this.setCache('editor_images', sp.images_cache);
            // this.removeItem('images_cache');
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
            if (json.length > this.maxLength) {
                throw new Error('Local storage max length exceeding');
            }
        } catch (_) {
            return;
        }
        localStorage.setItem(this.name, json);
        return data;
    }

    /**
     * 删除存储项
     * @param {String} key 键名
     */
    removeItem(key) {
        let data = this.getItem();
        if (typeof data != 'object') return;
        delete data[key];
        let json;
        try {
            json = JSON.stringify(data);
        } catch (_) {
            return;
        }
        localStorage.setItem(this.name, json);
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

    /**
     * 打开 IndexedDB
     * @param {Array<String>} storeNames 存储桶名称列表
     * @private
     */
    _openDB(storeNames = []) {
        if (!this.idbAvailable) {
            this._openDB = () => {};
            throw Error('IndexedDB Unavailable');
        }
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName);

            req.onerror = () => reject(req.error);

            req.onsuccess = () => {
                const db = req.result;

                const missingStores = storeNames.filter(
                    name => !db.objectStoreNames.contains(name)
                );

                if (!db.objectStoreNames.contains(this.cacheStoreName)) {
                    missingStores.push(this.cacheStoreName);
                }

                if (missingStores.length === 0) {
                    resolve(db);
                    return;
                }

                const newVersion = db.version + 1;
                db.close();

                const upgradeReq = indexedDB.open(this.dbName, newVersion);

                upgradeReq.onerror = () => reject(upgradeReq.error);

                upgradeReq.onupgradeneeded = () => {
                    const upgradeDB = upgradeReq.result;

                    for (const name of missingStores) {
                        if (name === this.cacheStoreName) {
                            if (!upgradeDB.objectStoreNames.contains(name)) {
                                upgradeDB.createObjectStore(name, {
                                    keyPath: 'key'
                                });
                            }
                        } else {
                            if (!upgradeDB.objectStoreNames.contains(name)) {
                                upgradeDB.createObjectStore(name, {
                                    keyPath: 'id',
                                    autoIncrement: true
                                });
                            }
                        }
                    }
                };

                upgradeReq.onsuccess = () => {
                    resolve(upgradeReq.result);
                };
            };
        });
    }

    /**
     * 新增增量数据
     * @param {String} store 存储桶名称
     * @param {*} payload 数据
     * @param {Object} extra 扩展字段
     * @returns {Promise<Number>} 新记录 ID
     */
    async addIncrement(store, payload, extra = {}) {
        const db = await this._openDB([store]);
        const tx = db.transaction(store, 'readwrite');
        const s = tx.objectStore(store);

        return new Promise((resolve, reject) => {
            const req = s.add({
                ...extra,
                payload,
                created_at: Date.now(),
                update_at: Date.now()
            });
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    /**
     * 按 ID 读取增量数据
     * @param {String} store 存储桶名称
     * @param {Number} id 存储桶名称
     */
    async getIncrement(store, id) {
        const db = await this._openDB([store]);
        const tx = db.transaction(store, 'readonly');
        const s = tx.objectStore(store);

        return new Promise((resolve, reject) => {
            const req = s.get(id);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
    }

    /**
     * 获取全部增量数据
     * @param {String} store 存储桶名称
     * @returns {Promise<Array>} 所有数据
     */
    async getAllIncrements(store) {
        const db = await this._openDB([store]);
        const tx = db.transaction(store, 'readonly');
        const s = tx.objectStore(store);

        return new Promise((resolve, reject) => {
            const req = s.getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => reject(req.error);
        });
    }

    /**
     * 删除增量数据
     * @param {String} store 存储桶名称
     * @param {Number} id ID
     * @returns
     */
    async removeIncrement(store, id) {
        const db = await this._openDB([store]);
        const tx = db.transaction(store, 'readwrite');
        tx.objectStore(store).delete(id);
        return tx.complete;
    }

    /**
     * 写入缓存
     * @param {String} key 键名
     * @param {*} value 缓存数据
     */
    async setCache(key, value) {
        const db = await this._openDB();
        const tx = db.transaction(this.cacheStoreName, 'readwrite');
        const store = tx.objectStore(this.cacheStoreName);

        store.put({
            key,
            value,
            updated_at: Date.now()
        });

        return tx.complete;
    }

    /**
     * 读取缓存
     * @param {String} key 键名
     * @param {*} value 缓存数据
     */
    async getCache(key) {
        const db = await this._openDB();
        const tx = db.transaction(this.cacheStoreName, 'readonly');
        const store = tx.objectStore(this.cacheStoreName);

        return new Promise((resolve, reject) => {
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result?.value ?? null);
            req.onerror = () => reject(req.error);
        });
    }

    /**
     * 删除缓存
     * @param {String} key 键名
     */
    async removeCache(key) {
        const db = await this._openDB();
        const tx = db.transaction(this.cacheStoreName, 'readwrite');
        tx.objectStore(this.cacheStoreName).delete(key);
        return tx.complete;
    }
}