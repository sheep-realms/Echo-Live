/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class ExtensionManager {
    constructor() {
        this.mixer = undefined;
        this.theme = [];
    }

    load(data = {}) {
        if (data?.meta === undefined || data?.meta?.name === undefined) return;

        echoLiveSystem.registry.setRegistryValue('extension', data.meta.name, data.meta);

        if (!Array.isArray(data?.registry)) return;
        
        const root = `${data.meta.name}:root`;
        data.register.forEach(e => {
            if (e.registry === root && !echoLiveSystem.registry.hasRegistry(root)) {
                echoLiveSystem.registry.createRootRegistry(data.meta, e.value);
            } else {
                for (const key in e.value) {
                    if (Object.prototype.hasOwnProperty.call(e.value, key)) {
                        const e2 = e.value[key];
                        echoLiveSystem.registry.setRegistryValue(e.registry, key, e2);
                    }
                }
            }
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