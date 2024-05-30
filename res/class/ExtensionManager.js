/**
 * 针对一个特定页面的插件钩子，用于安装和卸载插件的脚本和样式。
 * 
 * 标准格式如下：
 * 
 * ```json
 * {
 *     "styles": [
 *         "style.css"
 *     ],
 *     "scripts": [
 *         "script.js"
 *     ]
 * }
 * ```
 */
class AddonHook {
    /**
     * `AddonHook` 的构造方法。
     * 
     * @param {{ styles: string[] | undefined, scripts: string[] | undefined }} meta 扩展钩子的元数据
     * @param {string} root 扩展的根目录
     */
    constructor(meta, root) {
        this.root = root;

        this.styles = meta.styles ?? [];
        this.scripts = meta.scripts ?? [];

        this.loadedElements = [];
    }

    /**
     * 在当前页面加载插件钩子。
     */
    load() {
        this.styles.forEach(s => this._loadStyle(s));
        this.scripts.forEach(s => this._loadScript(s));
    }

    /**
     * 卸载当前页面的插件钩子。（不能保证有效）
     */
    unload() {
        this.loadedElements.forEach(e => e.remove());
        this.loadedElements = [];
    }

    _loadStyle(url) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = this.root + url;

        document.head.appendChild(link);
        this.loadedElements.push(link);
        return link;
    }

    _loadScript(url) {
        const script = document.createElement("script");
        script.src = this.root + url;

        document.body.appendChild(script);
        this.loadedElements.push(script);
        return script;
    }

    /**
     * 为方便格式化 `LocalStorage` 中的 `Extension` 列表而创建的方法。
     * @returns 用于 `JSON.stringfy` 的 `object`
     */
    toObject() {
        return {
            "styles": this.styles,
            "scripts": this.scripts
        }
    }
}


/**
 * 插件。
 * 
 * 标准格式如下：
 * 
 * ```json
 * {
 *     "name": "addon-name",
 *     "title": "插件名称",
 *     "description": "这是一个插件的描述",
 *     "live": ...,// 在 live 页面挂载的插件钩子
 *     "editor": ...,// 在 editor 页面挂载的插件钩子
 *     "history": ...,// 在 history 页面挂载的插件钩子
 *     "settings": ...,// 在 settings 页面挂载的插件钩子
 *     "requirements": "namespace:addon-name"
 * }
 * ```
 */
class Addon {
    constructor(meta, root) {
        this.root = root;

        if (meta?.name == undefined) {
            throw Error();
        }

        this.name = meta.name;
        this.title = meta.title ?? meta.name;
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

    toObject() {
        return {
            "name": this.name,
            "title": this.title,
            "description": this.description,
            "live": this.liveHook.toObject(),
            "editor": this.editorHook.toObject(),
            "history": this.historyHook.toObject(),
            "settings": this.settingsHook.toObject(),
            "requirements": this.requirements
        }
    }
}


/**
 * 主题。
 * 
 * 标准格式如下：
 * 
 * ```json
 * {
 *     "name": "theme-name",
 *     "title": "主题名字",
 *     "description": "这是一个主题的描述",
 *     "style": "style.css",
 * }
 * ```
 */
class Theme {
    constructor(meta) {
        if (meta?.name == undefined) throw Error("主题初始化时出现了错误，因为该主题缺少了名称");

        this.name = meta.name;
        this.title = meta.title ?? meta.name;
        this.description = meta.description ?? "";
        this.style = meta.style ?? "res/style/live-theme/vanilla.css";  // Fallback
    }

    toObject() {
        return {
            "name": this.name,
            "title": this.title,
            "description": this.description,
            "style": this.style
        }
    }
}


/**
 * 扩展包。
 * 
 * 标准格式如下：
 * 
 * ```json
 * {
 *     "meta": {
 *         "namespace": "extension-namespace",
 *         "author": "Extension Author",
 *         "version": "0.0.1",
 *         "url": "..."    // 可以留空
 *     },
 *     "addons": [ ... ],
 *     "themes": [ ... ]
 * }
 * ```
 */
class Extension {
    constructor(data) {
        this.addons = [];
        this.themes = [];

        if (data?.meta == undefined) throw Error();
        if (data.meta?.namespace == undefined) throw Error();

        this.namespace = data.meta.namespace;
        this.author = data.meta.author ?? "";
        this.version = data.meta.version ?? "";
        this.url = data.meta.url ?? "";

        data?.addons?.forEach?.(addon => {
            if (typeof addon != 'object') return;
            if (addon.name == undefined) return;

            var root;

            if (this.namespace == "echo-live") {
                root = "res/";
            } else {
                root = "packs/" + this.namespace + "/";
            }

            this.addons.push(new Addon(addon, root));
        });

        data?.themes?.forEach?.(theme => {
            if (typeof theme != 'object') return;
            if (theme.name == undefined) return;
            if (theme.style == undefined) return;

            this.themes.push(new Theme(theme));
        });
    }
}


class ExtensionManager {
    constructor() {
        this.mixer = undefined;
        this.extensions = [];
    }

    load(data = {}) {
        if (data?.meta == undefined) return;
        if (data.meta?.namespace == undefined) return;

        var extension = new Extension(data);
        this.extensions.push(extension);

        return extension;
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
}