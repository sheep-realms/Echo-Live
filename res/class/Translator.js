class Translator {
    constructor(lang='zho-Hans', langIndex = {}) {
        this.lang = lang;
        this.langMain = undefined;
        this.i18n = {};
        this.langIndex = langIndex;
        this.initialized = false;
        this.loaded = false;
    }

    init(path = '') {
        if (this.initialized) return;
        const mainLang = echoLiveSystem.registry.getRegistryValue('system', 'main_language');
        const langIndex = echoLiveSystem.registry.getRegistryArray('language_index');
        this.langIndex = langIndex;
        this.langMain = mainLang;
        const mainLangData = langIndex.filter(e => e.code == mainLang)[0];
        const selectedLangData = langIndex.filter(e => e.code == this.lang)[0];
        this.initialized = true;
        echoLiveSystem.registry.onSetRegistryValue('language', '*', data => {
            this.load(data.value);
        });
        this.loadScript(path, mainLangData.url);
        if (this.lang !== mainLang) this.loadScript(path, selectedLangData.url);
    }

    loadScript(path = '', url = '') {
        // let element = document.getElementById('translator-init');
        // element.insertAdjacentHTML('afterend', `<script src="${ path }lang/${ url }"></script>`);
        let s   = document.createElement("script");
                s.src   = `${ path }lang/${ url }`;
                s.async = false;
                document.head.appendChild(s);
    }

    output(key, variable={}, __inPlanB = false) {
        function __extractVariableNames(inputString) {
            const regI18nVar = /\{\s*@([A-Za-z0-9_\.]+)\s*\}/g;
            const matches = [];
            let match;
            
            while ((match = regI18nVar.exec(inputString)) !== null) {
                matches.push(match[1]);
            }
            
            return matches;
        }

        // 配置排错
        if (this.i18n[this.lang] == undefined) this.lang = this.langMain;

        // 提取翻译文本
        let keys = key.split('.');
        let objI18n = !__inPlanB ? this.i18n[this.lang] : this.i18n[this.langMain];
        for (const k of keys) {
            if (objI18n[k] == undefined) {
                if (!__inPlanB && this.lang != this.langMain) return this.output(key, variable, true);
                return key;
            }
            objI18n = objI18n[k];
        }
        let t = objI18n;

        // 校验数据
        if (typeof t != 'string') {
            if (!__inPlanB && this.lang != this.langMain) return this.output(key, variable, true);
            return key;
        }

        // 本地化变量赋值
        const i18nVarList = __extractVariableNames(t);
        if (i18nVarList.length > 0) {
            let i18nVarValue = [];
            i18nVarList.forEach(e => {
                i18nVarValue.push({
                    key: e,
                    value: this.output(e)
                });
            });

            i18nVarValue.forEach(e => {
                let p = new RegExp('\\{\\s*@' + e.key.replace(/\./g, '\\.') + '\\s*\\}', 'g');
                t = t.replace(p, e.value);
            });
        }

        // 常规变量赋值
        for (const v in variable) {
            let p = new RegExp('\\{\\s*'+v+'\\s*\\}', 'g');
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
        if (!this.loaded && i18nList.lang.code_iso_639_3 === this.lang) {
            this.loaded = true;
            $('html').attr('lang', $t('lang.code_ietf'));
        }
    }
}