class LocalStorageManager {
    constructor(name = 'echolive') {
        this.name = name;

    }

    save(data = {'data_version': 1}) {
        localStorage.setItem(this.name, JSON.stringify(data));

        return data;
    }

    data() {
        const s = localStorage.getItem(this.name);
        if (s == null) {
            return this.save();
        }

        try {
            return JSON.parse(s);
        } catch {
            return this.save();
        }
    }

    clear() {
        localStorage.removeItem(this.name);
    }

    getItem(key) {
        if (key == undefined) return this.data();
        return this.data()[key];
    }

    setItem(key, value) {
        let data = this.data();
        data[key] = value;
        this.save(data);
    }
}