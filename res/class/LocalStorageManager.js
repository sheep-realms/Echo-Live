class LocalStorageManager {
    constructor(name = 'echolive') {
        this.name = name;

        this.init();
    }

    init() {
        const s = localStorage.getItem(this.name);
        if (s == null) {
            localStorage.setItem(this.name, '{}');
            this.setItem('data_version', 1);
        }
    }

    clear() {
        localStorage.removeItem(this.name);
    }

    getItem(key) {
        const s = localStorage.getItem(this.name);
        if (s == null) return;
        let data;
        try {
            data = JSON.parse(s);
        } catch (error) {
            return;
        }

        if (key === undefined) return data;

        return data[key];
    }

    setItem(key, value) {
        let data = this.getItem();
        if (typeof data != 'object') return;
        data[key] = value;
        let json;
        try {
            json = JSON.stringify(data);
        } catch (error) {
            return;
        }
        localStorage.setItem(this.name, json);
        return data;
    }
}