class Icon {
    constructor() {}

    /**
     * 获取图标
     * @param {String} name 图标名称
     * @param {String} backup 备选图标名称
     * @returns {String} 图标内容
     */
    static getIcon(name, backup) {
        const _getBackup = () => {
            if (backup !== undefined) {
                return Icon.getIcon(backup);
            } else {
                return '';
            }
        };
        if (name === undefined) return _getBackup();
        name = EchoLiveData.filter('namespace_id', 'pad_namespace', name, { namespace: 'material' });
        const icon = echoLiveSystem.registry.getRegistryValue('icon', name);
        if (icon !== undefined) {
            return icon?.content;
        } else {
            return _getBackup();
        }
    }
}