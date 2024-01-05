extensionManager.load({
    // 扩展元数据
    meta: {
        // 命名空间，与文件夹名称一致
        namespace: 'example'
    },
    // 扩展所添加的额外内容
    addon: {
        // 音频列表
        audio: [
            {
                // 音频名称
                name: 'sonar',
                // 音频路径
                path: 'audio/sonar.ogg'
            }
        ]
    }
});