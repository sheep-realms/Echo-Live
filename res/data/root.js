echoLiveSystem.registry.init([
    {
        name: 'avatar',
        unique_key: 'meta.name',
        sync: true,
        src: 'avatar.js',
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
        sync: true,
        src: 'avatar_switch_effect.js',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'border_style',
        unique_key: 'name',
        src: 'border_style.js',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'editor_controller',
        unique_key: 'name',
        src: 'editor_controller.js',
        default_data: {
            name: undefined,
            type: 'item',
            title: 'missingno',
            icon: undefined,
            shortcut: {},
            action: {
                type: 'none',
                value: undefined
            }
        }
    }, {
        name: 'editor_controller_method',
        is_function: true,
        src: 'editor_controller_method.js'
    }, {
        name: 'emoji',
        unique_key: 'meta.name',
        sync: true,
        src: 'emoji.js',
        default_data: {}
    }, {
        name: 'emoji_namespace'
    }, {
        name: 'extension',
        unique_key: 'name',
        sync: true,
        default_data: {
            title: 'missingno',
            description: '',
            namespace: undefined,
            author: undefined,
            license: undefined
        }
    }, {
        name: 'font_weight',
        unique_key: 'name',
        src: 'font_weight.js',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'icon',
        unique_key: 'name',
        src: 'icon.js',
        default_data: {
            name: 'missingno',
            content: ''
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
        name: 'live_controller',
        unique_key: 'meta.name',
        src: 'live_controller.js',
        default_data: {
            meta: {
                name: 'missingno',
                title: 'missingno'
            },
            content: []
        }
    }, {
        name: 'live_theme',
        unique_key: 'name',
        src: 'live_theme.js',
        default_data: {
            name: undefined,
            title: 'missingno',
            description: '',
            style: undefined,
            script: undefined,
            variant: []
        }
    }, {
        name: 'message_filter',
        is_function: true,
        src: 'message_filter.js'
    }, {
        name: 'palette',
        unique_key: 'meta.name',
        src: 'palette.js',
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
        sync: true,
        src: 'print_effect.js',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'script',
        unique_key: 'name',
        src: 'script.js',
        default_data: {
            name: undefined,
            domain: undefined,
            async: false,
            defer: false,
            insert_body: false,
            dependencies: undefined,
            src: ''
        }
    }, {
        name: 'settings_data',
        src: [
            'settings_about_link.js',
            'settings_navigation.js'
        ]
    }, {
        name: 'slot_settings_wrapper_after',
        is_function: true,
        src: 'slot_settings_wrapper_after.js'
    }, {
        name: 'slot_settings_wrapper_before',
        is_function: true,
        src: 'slot_settings_wrapper_before.js'
    }, {
        name: 'sound',
        unique_key: 'name',
        sync: true,
        src: 'sound.js',
        default_data: {
            name: undefined,
            path: undefined,
            type: 'print',
            safe_duration: 0,
            pick_strategy: 'random',
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
        name: 'statistic',
        unique_key: 'name',
        sync: true,
        src: 'statistic.js',
        default_data: {
            name: undefined,
            type: 'number',
            default: 0,
            unit: undefined,
            source: 'custom'
        }
    }, {
        name: 'statistic_method',
        is_function: true,
        src: 'statistic_method.js'
    }, {
        name: 'text_style',
        unique_key: 'name',
        sync: true,
        src: 'text_style.js',
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
        sync: true,
        src: 'timing_function.js',
        default_data: {
            name: undefined,
            value: undefined
        }
    }
]);