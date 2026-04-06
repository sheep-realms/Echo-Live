echoLiveSystem.registry.loadRegistry('script', 'name', [
    {
        name: 'echolive_class:commander',
        src: 'res/class/Commander.js'
    },
    {
        name: 'echolive_class:data_filter',
        src: 'res/class/DataFilter.js'
    },
    {
        name: 'echolive_class:echo',
        domain: 'echolive.portal',
        src: 'res/class/Echo.js'
    },
    {
        name: 'echolive_class:editor',
        domain: 'background.editor',
        dependencies: [
            'echolive_class:emoji_hako'
        ],
        src: 'res/class/EchoLiveEditor.js'
    },
    {
        name: 'echolive_class:broadcast',
        domain: 'echolive',
        dependencies: [
            'echolive_class:tools'
        ],
        src: 'res/class/EchoLiveBroadcast.js'
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
            'background.editor',
            'echolive.portal',
            'echolive.history'
        ],
        dependencies: [
            'registry:emoji'
        ],
        src: 'res/class/EmojiHako.js'
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
        name: 'echolive_class:tools',
        src: 'res/class/EchoLiveTools.js'
    },
    {
        name: 'echolive_class:slot_installer',
        src: 'res/class/SlotInstaller.js'
    },
    {
        name: 'echolive_class:system_notice',
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/class/SystemNotice.js'
    },
    {
        name: 'echolive_class:universe_window',
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/class/UniverseWindow.js'
    },
    {
        name: 'echolive_script:editor_common',
        domain: 'background',
        defer: true,
        insert_body: true,
        dependencies: [
            'echolive_class:fhui'
        ],
        src: 'res/script/editor-common.js'
    },
    {
        name: 'echolive_script:i18n',
        domain: 'background',
        defer: true,
        insert_body: true,
        src: 'res/script/i18n.js'
    }
]);