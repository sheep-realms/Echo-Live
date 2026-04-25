extensionManager.load({
    meta: {
        title: {
            text: '示例扩展',
            translate: 'example.title'
        },
        name: 'example',
        schema_version: [2, 0, 1],
        extension_version: '1.0.0',
        description: {
            text: '本扩展是一个导入自定义音效的简单演示。',
            translate: 'example.description'
        },
        author: {
            name: 'Sheep-realms',
            url: 'https://github.com/sheep-realms'
        },
        license: {
            name: 'GPL-3.0 license',
            url: 'https://www.gnu.org/licenses/gpl-3.0.html'
        }
    },
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
});