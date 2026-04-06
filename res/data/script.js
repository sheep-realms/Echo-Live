echoLiveSystem.registry.loadRegistry('script', 'name', [
    {
        name: 'echolive_class:commander',
        src: 'res/class/Commander.js'
    },
    {
        name: 'echolive_class:data_filter',
        domain: [
            'background.settings'
        ],
        src: 'res/class/DataFilter.js'
    },
    {
        name: 'echolive_class:echo',
        domain: 'echolive.portal',
        src: 'res/class/Echo.js'
    },
    {
        name: 'echolive_class:echolive',
        domain: 'echolive.portal',
        dependencies: [
            'echolive_class:echo',
            'echolive_class:echolive_broadcast'
        ],
        src: 'res/class/EchoLive.js'
    },
    {
        name: 'echolive_class:echolive_broadcast',
        domain: 'echolive',
        src: 'res/class/EchoLiveBroadcast.js'
    },
    {
        name: 'echolive_class:echolive_character',
        domain: 'echolive.character',
        dependencies: [
            'echolive_class:echolive_broadcast'
        ],
        src: 'res/class/EchoLiveCharacter.js'
    },
    {
        name: 'echolive_class:echolive_history',
        domain: 'echolive.history',
        dependencies: [
            'echolive_class:echolive_broadcast'
        ],
        src: 'res/class/EchoLiveHistory.js'
    },
    {
        name: 'echolive_class:editor',
        domain: 'background.editor',
        dependencies: [
            'echolive_class:echolive_broadcast',
            'echolive_class:emoji_hako'
        ],
        src: 'res/class/EchoLiveEditor.js'
    },
    {
        name: 'echolive_class:editor_constructor',
        domain: 'background',
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/class/EditorConstructor.js'
    },
    {
        name: 'echolive_class:emoji_hako',
        domain: [
            'background.dev.registoy',
            'background.editor',
            'echolive.portal'
        ],
        dependencies: [
            'registry:emoji'
        ],
        src: 'res/class/EmojiHako.js'
    },
    {
        name: 'echolive_class:extension_manager',
        src: 'res/class/ExtensionManager.js'
    },
    {
        name: 'echolive_class:fhui',
        domain: 'background',
        src: 'res/class/FHUI.js'
    },
    {
        name: 'echolive_class:icon',
        domain: [
            'background',
            'echolive.portal'
        ],
        dependencies: [
            'registry:icon'
        ],
        src: 'res/class/Icon.js'
    },
    {
        name: 'echolive_class:local_storage_manager',
        domain: [
            'background.editor',
            'background.settings'
        ],
        src: 'res/class/LocalStorageManager.js'
    },
    {
        name: 'echolive_class:mixer',
        domain: [
            'background.settings',
            'echolive.portal'
        ],
        dependencies: [
            'registry:sound'
        ],
        src: 'res/class/Mixer.js'
    },
    {
        name: 'echolive_class:settings_manager',
        domain: 'background.settings',
        src: 'res/class/SettingsManager.js'
    },
    {
        name: 'echolive_class:shortcut_manager',
        domain: 'background.editor',
        src: 'res/class/ShortcutManager.js'
    },
    {
        name: 'echolive_class:statistic_manager',
        domain: 'background.editor',
        dependencies: [
            'registry:statistic',
            'registry:statistic_method'
        ],
        src: 'res/class/StatisticManager.js'
    },
    {
        name: 'echolive_class:slot_installer',
        domain: 'background',
        src: 'res/class/SlotInstaller.js'
    },
    {
        name: 'echolive_class:translator',
        src: 'res/class/Translator.js'
    },
    {
        name: 'echolive_class:system_notice',
        domain: 'background',
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/class/SystemNotice.js'
    },
    {
        name: 'echolive_class:universe_window',
        domain: 'background',
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/class/UniverseWindow.js'
    },
    {
        name: 'echolive_class:updater',
        domain: [
            'background.editor',
            'background.settgins'
        ],
        src: 'res/class/Updater.js'
    },
    {
        name: 'echolive_script:character',
        domain: 'echolive.character',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_class:echolive_character',
            'echolive_script:live_pre'
        ],
        src: 'res/script/character.js'
    },
    {
        name: 'echolive_script:editor',
        domain: 'background.editor',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_class:commander',
            'echolive_class:echolive_broadcast',
            'echolive_class:editor',
            'echolive_class:editor_constructor',
            'echolive_class:emoji_hako',
            'echolive_class:local_storage_manager',
            'echolive_class:shortcut_manager',
            'echolive_class:statistic_manager',
            'echolive_class:system_notice',
            'echolive_class:universe_window',
            'echolive_class:updater',
            'echolive_script:editor_common',
            'registry:editor_controller',
            'registry:editor_controller_method',
            'registry:palette'
        ],
        src: 'res/script/editor.js'
    },
    {
        name: 'echolive_script:editor_common',
        domain: 'background',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_class:fhui',
            'echolive_class:icon',
            'echolive_class:slot_installer',
            'echolive_script:i18n'
        ],
        src: 'res/script/editor-common.js'
    },
    {
        name: 'echolive_script:editor_file_picker',
        domain: 'background.editor',
        defer: true,
        insert_body: true,
        src: 'res/script/editor-file-picker.js'
    },
    {
        name: 'echolive_script:help/editor',
        domain: 'background.editor',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_script:editor'
        ],
        src: 'res/script/help/editor-help.js'
    },
    {
        name: 'echolive_script:help/settings',
        domain: 'background.settings',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_script:settings'
        ],
        src: 'res/script/help/settings-help.js'
    },
    {
        name: 'echolive_script:history',
        domain: 'echolive.history',
        dependencies: [
            'echolive_class:echolive_history',
            'echolive_script:live_pre'
        ],
        src: 'res/script/history.js'
    },
    {
        name: 'echolive_script:i18n',
        domain: [
            'background',
            'echolive'
        ],
        defer: true,
        insert_body: true,
        src: 'res/script/i18n.js'
    },
    {
        name: 'echolive_script:live',
        domain: 'echolive.portal',
        dependencies: [
            'echolive_class:echolive',
            'echolive_class:emoji_hako',
            'echolive_script:live_pre'
        ],
        src: 'res/script/live.js'
    },
    {
        name: 'echolive_script:live_pre',
        domain: 'echolive',
        dependencies: [
            'echolive_class:extension_manager'
        ],
        src: 'res/script/live-pre.js'
    },
    {
        name: 'echolive_script:settings',
        domain: 'background.settings',
        defer: true,
        dependencies: [
            'echolive_class:data_filter',
            'echolive_class:echolive_character',
            'echolive_class:editor_constructor',
            'echolive_class:local_storage_manager',
            'echolive_class:mixer',
            'echolive_class:settings_manager',
            'echolive_class:system_notice',
            'echolive_class:universe_window',
            'echolive_class:updater',
            'echolive_script:editor_common',
            'registry:avatar',
            'registry:avatar_switch_effect',
            'registry:border_style',
            'registry:font_weight',
            'registry:emoji',
            'registry:live_controller',
            'registry:live_theme',
            'registry:palette',
            'registry:print_effect',
            'registry:slot_settings_wrapper_after',
            'registry:slot_settings_wrapper_before',
            'registry:settings_data',
            'registry:timing_function'
        ],
        src: 'res/script/settings.js'
    },
]);