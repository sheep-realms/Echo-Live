/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class Translator {
    constructor(lang='zho-Hans', langIndex = {}) {
        this.lang = lang;
        this.langMain = undefined;
        this.i18n = {};
        this.langIndex = langIndex;
        this.initialized = false;
        this.loaded = false;
        this.event = {
            ready: []
        };
    }

    /**
     * 初始化
     * @param {String} path 脚本根路径
     */
    init(path = '') {
        if (this.initialized) return;
        const mainLang          = echoLiveSystem.registry.getRegistryValue('system', 'main_language');
        const langIndex         = echoLiveSystem.registry.getRegistryArray('language_index');
        this.langIndex          = langIndex;
        this.langMain           = mainLang;
        const mainLangData      = langIndex.filter(e => e.code === mainLang)[0];
        const selectedLangData  = langIndex.filter(e => e.code === this.lang)[0];
        this.initialized        = true;
        echoLiveSystem.registry.onSetRegistryValue('language', '*', data => {
            this.load(data.value);
        });
        this.loadScript(path, mainLangData.url);
        if (this.lang !== mainLang) this.loadScript(path, selectedLangData.url);
    }

    /**
     * 绑定事件
     * @param {String} eventName 事件名称
     * @param {Function} action 函数
     * @returns {Function} 函数
     */
    on(eventName, action = function() {}) {
        if (typeof action != 'function') return;
        return this.event[eventName].push(action) - 1;
    }

    trigger(eventName, ...data) {
        this.event[eventName].forEach(e => e(...data));
    }

    ready(action = function() {}) {
        if (this.loaded) {
            action();
        } else {
            this.on('ready', action);
        }
    }

    loadScript(path = '', url = '') {
        // let element = document.getElementById('translator-init');
        // element.insertAdjacentHTML('afterend', `<script src="${ path }lang/${ url }"></script>`);
        let s   = document.createElement("script");
                s.src   = `${ path }lang/${ url }`;
                s.async = false;
                document.head.appendChild(s);
    }

    output(key, variable={}, backText = undefined, __inPlanB = false) {
        if (!this.loaded) {
            throw new Error(`Localization data not loaded for key: "${key}"`);
        }
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
        if (this.i18n[this.lang] === undefined) this.lang = this.langMain;
        if (this.i18n[this.lang] === undefined) return key;

        // 提取翻译文本
        let keys = key.split('.');
        let objI18n = !__inPlanB ? this.i18n[this.lang] : this.i18n[this.langMain];
        for (const k of keys) {
            if (objI18n[k] === undefined) {
                if (!__inPlanB && this.lang !== this.langMain) return this.output(key, variable, backText, true);
                return backText ?? key;
            }
            objI18n = objI18n[k];
        }
        let t = objI18n;

        // 校验数据
        if (typeof t != 'string') {
            if (!__inPlanB && this.lang !== this.langMain) return this.output(key, variable, backText, true);
            return backText ?? key;
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
            ts[i] = ts[i].trim().replace(/\\\|/g, '|');
        }
        let n = variable?.n ? variable.n : 0;
        if (ts.length === 1) {
            return t.replace(/\\\|/g, '|');
        } else if (ts.length === 2) {
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

    outputByTextComponent(text, data = {}) {
        if (typeof text === 'string') return text;

        text = {
            text: undefined,
            translate: undefined,
            with: {
                ...text?.with
            },
            ...text
        };

        data = {
            before: '',
            ...data
        };

        const translateKey = data.before + text.translate;
        

        let output = text.text;
        if (text.translate !== undefined) {
            output = this.output(translateKey, text.with);
            if (output === translateKey && text.text !== undefined) output = text.text;
        }

        return output;
    }

    load(i18nList) {
        this.i18n[i18nList.lang.code_iso_639_3] = i18nList;
        if (!this.loaded && i18nList.lang.code_iso_639_3 === this.lang) {
            this.loaded = true;
            this.trigger('ready');
            $('html').attr('lang', $t('lang.code_ietf'));
        }
    }
}