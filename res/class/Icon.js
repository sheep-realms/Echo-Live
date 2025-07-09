class Icon {
    constructor() {}

    /**
     * 获取图标
     * @param {String} name 图标名称
     * @returns {String} 图标内容
     */
    static getIcon(name) {
        name = EchoLiveData.filter('namespace_id', 'pad_namespace', name, { namespace: 'material' });
        const icon = echoLiveSystem.registry.getRegistryValue('icon', name);
        if (icon !== undefined) {
            return icon?.content;
        } else {
            return '';
        }
    }
}