echoLiveSystem.registry.init([
    {
        name: 'avatar',
        unique_key: 'meta.name',
        default_data: {
            meta: {
                name: 'missingno',
                title: 'missingno',
                description: undefined,
                author: undefined,
                license: undefined
            },
            path: {
                action_translate: 'common.action.',
                scene_translate: 'common.scene.',
                image: ''
            },
            default_value: {
                action: {
                    idle: undefined,
                    unknown: undefined
                },
                scene: {
                    idle: undefined,
                    unknown: undefined
                }
            },
            preview: {
                action: undefined,
                scene: {
                    position: undefined,
                    size: undefined,
                    repeat: undefined
                }
            },
            action: [],
            scene: []
        }
    }, {
        name: 'avatar_switch_effect',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'border_style',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'emoji',
        unique_key: 'meta.name',
        default_data: {}
    }, {
        name: 'emoji_namespace'
    }, {
        name: 'extension',
        unique_key: 'name',
        default_data: {
            title: 'missingno',
            description: '',
            namespace: undefined,
            author: undefined,
            license: undefined
        }
    }, {
        name: 'language',
        unique_key: 'lang.code_iso_639_3',
        default_data: {
            lang: {
                code_iso_639_3: 'zho-Hans',
                code_ietf: 'zh-Hans',
                title: 'missingno'
            }
        }
    }, {
        name: 'language_index',
        unique_key: 'code',
        default_data: {
            code: 'zho-Hans',
            code_ietf: 'zh-Hans',
            title: 'missingno',
            url: 'missingno.js'
        }
    }, {
        name: 'live_theme',
        unique_key: 'name',
        default_data: {
            name: undefined,
            title: 'missingno',
            description: '',
            style: undefined,
            script: undefined
        }
    }, {
        name: 'palette',
        unique_key: 'meta.name',
        default_data: {
            meta: {
                name: undefined,
                title: 'missingno',
                i18n: undefined
            },
            colors: []
        }
    }, {
        name: 'print_effect',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'script',
        unique_key: 'name',
        default_data: {
            name: undefined,
            path: undefined,
            page: 'all'
        }
    }, {
        name: 'settings_data'
    }, {
        name: 'sound',
        unique_key: 'name',
        default_data: {
            name: undefined,
            path: undefined,
            type: 'print',
            allow_duplicate: false
        }
    }, {
        name: 'stylesheet',
        unique_key: 'name',
        default_data: {
            name: undefined,
            path: undefined,
            page: 'all'
        }
    }, {
        name: 'system'
    }, {
        name: 'text_style',
        unique_key: 'name',
        default_data: {
            name: undefined,
            is_style: false,
            custom_style: false,
            class: undefined,
            style: undefined
        }
    }, {
        name: 'timing_function',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }
]);