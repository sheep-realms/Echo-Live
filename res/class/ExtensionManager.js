/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class ExtensionManager {
    constructor(path = '') {
        this.schemaVersion = [2, 0, 2];
        this.path = path;
        this.launchingExtension = new Set();
        this.extensionLaunchTimeoutTimer = undefined;

        echoLiveSystem.setupModule('extension_manager', this);
    }

    load(data = {}) {
        if (!this._loadDataCheck(data)) return Promise.reject();

        this._oldSchemaVersionCheck(data);

        // 注册扩展
        if (data.meta?.flag?.my_data_is_too_large) {
            echoLiveSystem.registry.setRegistryValue('extension', data.meta.name, {
                meta: data.meta
            });
        } else {
            echoLiveSystem.registry.setRegistryValue('extension', data.meta.name, data);
        }

        // 注入本地化补丁
        if (data.localization_patch) {
            echoLiveSystem.lookup('translator')?.patch(data.localization_patch);
        }
        
        // 载入注册表
        if (data?.register_hook) {
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
        
        return Promise.resolve();
    }

    launch(extList = []) {
        extList.forEach(e => {
            this.launchingExtension.add(e);
            let s = document.createElement('script');
            s.src = `${this.path}extensions/${e}/main.js`;

            // 错误处理
            s.onerror = () => {
                console.error(`[ExtensionManager] Load extension failed: '${ e }'`)
                this.launchingExtension.delete(e);
                echoLiveSystem.lookupAsync('toast').then(toast => {
                    toast.sendT('notice.extension_launch_failed', { name: e }, 'fatal', {
                        waitTime: 10000
                    });
                });
            }

            document.head.appendChild(s);
        });

        // 载入超时
        this.extensionLaunchTimeoutTimer = setTimeout(() => {
            clearTimeout(this.extensionLaunchTimeoutTimer);
            if (this.launchingExtension.size === 0) return;
            let timeoutExtList = [];
            this.launchingExtension.forEach(value => timeoutExtList.push(value));
            console.error(`[ExtensionManager] Critical Error: expected extensions failed to load or register within the timeout. Unresolved extensions: ${ timeoutExtList.join(', ') }.`);
            echoLiveSystem.lookupAsync('toast').then(toast => {
                toast.sendTHasTitle('notice.extension_launch_timeout', { list: timeoutExtList.join(', ') }, 'fatal', {
                    waitTime: -1
                });
            });
        }, 30000)
    }

    _loadDataCheck(data = {}) {
        // 元数据格式检查
        if (
            data?.meta === undefined
            || typeof data.meta?.name !== 'string'
            || data.meta.name === ''
            || data.meta.name === 'missingno'
        ) {
            console.error(`[ExtensionManager] Invalid extension detected: '${ data?.meta?.name }'. Please check extension registration data.`);
            if (data?.meta?.name === 'missingno') {
                echoLiveSystem.lookupAsync('toast').then(toast => {
                    toast.sendT('notice.extension_name_missingno', {}, 'warn');
                });
            }
            return false;
        }

        this.launchingExtension.delete(data.meta.name);

        // 名称长度检查（常见文件系统文件名长度上限）
        if (data.meta.name.length > 255) {
            console.error(`[ExtensionManager] Invalid extension detected: The name '${ data.meta.name.substring(0, 32) }' is too long.`);
            echoLiveSystem.lookupAsync('toast').then(toast => {
                toast.sendT('notice.extension_name_too_long', { prefix: data.meta.name.substring(0, 32) }, 'fatal');
            });
            return false;
        }

        // 名称格式检查
        if (!/^[a-zA-Z0-9._-]*$/.test(data.meta.name)) {
            console.error(`[ExtensionManager] Invalid extension detected: The name '${ data.meta.name }' contains characters that are not allowed.`);
            echoLiveSystem.lookupAsync('toast').then(toast => {
                toast.sendT('notice.extension_name_invalid', { name: data.meta.name }, 'fatal');
            });
            return false;
        }

        // 格式版本检查
        if (!Array.isArray(data.meta?.schema_version)) {
            console.error(`[ExtensionManager] Invalid extension detected: '${ data.meta.name }'. Please check schema_version.`);
            return false;
        }

        // 版本检查
        if (
            data.meta.schema_version[0] !== this.schemaVersion[0]
            || data.meta.schema_version[1] > this.schemaVersion[1]
        ) {
            console.warn(`[ExtensionManager] Invalid schema_version for extension '${ data.meta.name }': '${ data.meta.schema_version.join('.') }' is not supported.`);
            return false;
        }

        return true;
    }

    _oldSchemaVersionCheck(data = {}) {
        if (data.meta.schema_version[1] < this.schemaVersion[1]) {
            console.warn(`[ExtensionManager] Extension '${ data.meta.name }' is using an older schema_version '${ data.meta.schema_version.join('.') }' and may be deprecated or partially incompatible.`)
        }
    }
}