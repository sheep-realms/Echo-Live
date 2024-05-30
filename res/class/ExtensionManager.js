class AddonHook {
    constructor(meta, root) {
        this.root = root;

        this.styles = (meta.styles ?? []).map(s => root + "/" + s);
        this.scripts = (meta.scripts ?? []).map(s => root + "/" + s);

        this.loadedElements = [];
    }

    load() {
        this.styles.forEach(s => this.loadStyle(s));
        this.scripts.forEach(s => this.loadScript(s));
    }

    unload() {
        this.loadedElements.forEach(e => e.remove());
        this.loadedElements = [];
    }

    loadStyle(url) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;

        document.head.appendChild(link);
        this.loadedElements.push(link);
        return link;
    }

    loadScript(url) {
        const script = document.createElement("script");
        script.src = url;

        document.body.appendChild(script);
        this.loadedElements.push(script);
        return script;
    }
}


class Addon {
    constructor(meta, root) {
        this.root = root;

        if (meta?.name == undefined) {
            throw Error();
        }

        this.name = meta.name;
        this.title = meta.title ?? "";
        this.description = meta.description ?? "";

        this.requirements = meta.requirements ?? [];

        this.editorHook = new AddonHook(meta.editor ?? {}, root);
        this.liveHook = new AddonHook(meta.live ?? {}, root);
        this.settingsHook = new AddonHook(meta.settingsHook ?? {}, root);
        this.historyHook = new AddonHook(meta.history ?? {}, root);

        this.globalHook = new AddonHook(meta.addonHook ?? {}, root);
    }

    enable() {
        this.globalHook.load();
        this.hookOfThisPage().load();
    }

    disable() {
        this.globalHook.unload();
        this.hookOfThisPage().unload();
    }

    hookOfThisPage() {
        if (window.location.href.indexOf("history.html") != -1) {
            return this.historyHook;
        }
        
        if (window.location.href.indexOf("editor.html") != -1) {
            return this.editorHook;
        }
        
        if (window.location.href.indexOf("settings.html") != -1) {
            return this.settingsHook;
        }
        
        if (window.location.href.indexOf("live.html") != -1) {
            return this.liveHook;
        }
    }
}


class ExtensionManager {
    constructor() {
        this.mixer = undefined;
        this.theme = [];
        this.addons = [];
    }

    load(data = {}) {
        if (data?.meta == undefined) return;

        if (data?.addons != undefined && Array.isArray(data.addons)) {
            data.addons.forEach(
                addon => {
                    if (typeof addon == 'object') {
                        try {
                            this.addons.push(new Addon(addon));
                        } catch (e) {
                            console.warn(e);
                        }
                    }
                }
            );
        }

        if (data?.themes != undefined && Array.isArray(data.themes)) {
            data.themes.forEach(theme => {
                if (data.themes?.name == undefined || data.themes?.style == undefined) return;

                this.theme.push(theme);
            });
        }
    }

    loadLocalStorage() {
        var localStorageManager = new LocalStorageManager();
        var extensions = localStorageManager.getItem("extensions");

        if (!Array.isArray(extensions)) {
            localStorageManager.setItem("extensions", []);
            return;
        }

        extensions.forEach(extension => {
            this.load(extension);
        });
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