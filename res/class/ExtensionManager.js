/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class ExtensionManager {
    constructor(path = '') {
        this.path = path;
        echoLiveSystem.setupModule('extension_manager', this);
    }

    load(data = {}) {
        if (data?.meta === undefined || data?.meta?.name === undefined) return;

        // 注册扩展
        echoLiveSystem.registry.setRegistryValue('extension', data.meta.name, data);

        if (!data?.register_hook) return;
        
        // 载入注册表
        const root = `${data.meta.name}:root`;
        if (data.register_hook.now) {
            echoLiveSystem.registry.extensionLoadRegistry(
                root,
                data.register_hook.now,
                {
                    hook: 'now'
                }
            );
        }
        if (data.register_hook.loaded) {
            echoLiveSystem.registry.extensionLoadRegistry(
                root,
                data.register_hook.loaded,
                {
                    hook: 'loaded'
                }
            );
        }
    }

    launch(extList = []) {
        extList.forEach(e => {
            let s = document.createElement("script");
            s.src = `${this.path}extensions/${e}/main.js`;
            document.head.appendChild(s);
        });
    }
}