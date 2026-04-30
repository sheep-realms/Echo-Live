extensionManager.load({
    // 扩展元数据
    meta: {
        // 扩展标题，支持本地化文本组件
        title: {
            text: '示例扩展',
            translate: 'title'
        },
        // 扩展识别名，应与文件夹名称一致
        name: 'example',
        // 扩展所使用的注册数据格式版本
        schema_version: [2, 0, 2],
        // 扩展自身版本号
        extension_version: '1.0.0',
        // 图标（可选）
        // icon: 'material:puzzle',
        // 封面，将会覆盖图标（可选）
        cover: 'cover.png',
        // 特性开关
        // flag: {},
        // 描述，支持本地化文本组件
        description: {
            text: '本扩展是一个导入自定义音效的简单演示。',
            translate: 'description'
        },
        // 项目地址（可选）
        project_url: 'https://github.com/sheep-realms/Echo-Live',
        // 作者，参考元数据组件（可选）
        author: {
            name: 'Sheep-realms',
            url: 'https://github.com/sheep-realms'
        },
        // 授权协议，参考元数据组件（可选）
        license: {
            name: 'GPL-3.0 license',
            url: 'https://www.gnu.org/licenses/gpl-3.0.html'
        }
    },
    // 注册表 Hook
    register_hook: {
        loaded: [
            {
                registry: 'echolive:sound',
                value: {
                    'example:sonar': {
                        title: {
                            text: '声纳',
                            translate: 'example_sonar'
                        },
                        name: 'example:sonar',
                        safe_duration: 250,
                        type: 'next',
                        path: 'extensions/example/audio/sonar.ogg'
                    }
                }
            }
        ]
    },
    // 本地化补丁
    localization_patch: {
        'zho-Hans': {
            extension: {
                example: {
                    title: '示例扩展',
                    description: '本扩展是一个导入自定义音效的简单演示。'
                }
            },
            sound: {
                example_sonar: '声纳'
            }
        },
        'zho-Hant-TW': {
            extension: {
                example: {
                    title: '示例擴充套件',
                    description: '本擴充套件是一個匯入自定義音效的簡單演示。'
                }
            },
            sound: {
                example_sonar: '聲納'
            }
        },
        'zho-Hant-HK': {
            extension: {
                example: {
                    title: '示例擴展',
                    description: '本擴展是一個導入自定義音效的簡單演示。'
                }
            },
            sound: {
                example_sonar: '聲納'
            }
        }
    }
}).then(() => {
    // Extension loaded ...
    // 当扩展成功载入后，将会运行此过程
});