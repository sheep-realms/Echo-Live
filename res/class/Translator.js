class Translator {
    constructor(lang='zho-Hans', langIndex = {}) {
        this.lang = lang;
        this.langMain = langIndex.main;
        this.i18n = {};
        this.langIndex = langIndex;
    }

    output(key, variable={}, __inPlanB = false) {
        // 配置排错
        if (this.i18n[this.lang] == undefined) this.lang = this.langMain;

        // 提取翻译文本
        let keys = key.split('.');
        let objI18n = !__inPlanB ? this.i18n[this.lang] : this.i18n[this.langMain];
        for (const k of keys) {
            if (objI18n[k] == undefined) {
                if (!__inPlanB) return this.output(key, variable, true);
                return key;
            }
            objI18n = objI18n[k];
        }
        let t = objI18n;

        // 校验数据
        if (typeof t != 'string') {
            if (!__inPlanB) return this.output(key, variable, true);
            return key;
        }

        // 赋值
        for (const v in variable) {
            let p = new RegExp('\{\s*'+v+'\s*\}', 'g');
            t = t.replace(p, variable[v]);
        }

        // 复数判断
        let ts = t.split(/(?<!\\)\|/);
        for(let i = 0; i < ts.length; i++) {
            ts[i] = ts[i].trim();
        }
        let n = variable?.n ? variable.n : 0;
        if (ts.length == 1) {
            return t;
        } else if (ts.length == 2) {
            if (n <= 1) {
                return ts[0];
            } else {
                return ts[1];
            }
        } else if (ts.length > 2) {
            if (n + 1 > ts.length) n = ts.length - 1;
            if (n < 0) n = 0;
            return ts[n];
        }

        return t;
    }

    load(i18nList) {
        this.i18n[i18nList.lang.code_iso_639_3] = i18nList;
    }
}