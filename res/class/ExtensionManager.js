class ExtensionManager {
    constructor() {
        this.mixer = undefined;
        this.theme = [];
    }

    load(data = {}) {
        if (data?.meta == undefined) return;

        if (data?.addon != undefined) {
            if (typeof data.addon?.audio == 'object' && this.mixer != undefined) {
                data.addon.audio.forEach(e => {
                    e.name = data.meta.namespace + ':' + e.name;
                    e.path = `extensions/${data.meta.namespace}/${e.path}`;
                    this.mixer.audioDB.push(e);
                });
            }

            // 出现了！新的屎山代码！
            if (typeof data.addon?.theme == 'object') {
                data.addon.theme.forEach(e => {
                    e.name = data.meta.namespace + ':' + e.name;
                    e.style = `extensions/${data.meta.namespace}/${e2}`;
                    let script = [];
                    e.script.forEach(e2 => {
                        script.push(`extensions/${data.meta.namespace}/${e2}`);
                    });
                    e.script = script;
                    this.theme.push(e);
                });
            }
        }
    }

    launch(extList = []) {
        extList.forEach(e => {
            let s = document.createElement("script");
            s.src = `extensions/${e}/pack.js`;
            document.head.appendChild(s);
        });
    }

    /**
     * 导入默认主题
     * @param {Array} data 主题列表
     */
    importDefaultTheme(data) {
        this.theme.unshift(...data);
    }
}