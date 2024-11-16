echoLiveSystem.registry.init([
    {
        name: 'avatar',
        unique_key: 'meta.name',
        default_data: {
            meta: {
                name: 'missingno',
                title: 'missingno',
                title_i18n: '',
                author: 'missingno'
            },
            path: {
                i18n: '',
                images: ''
            },
            default_action: {
                idle: undefined,
                unknown: undefined
            },
            action: []
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