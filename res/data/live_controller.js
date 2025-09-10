echoLiveSystem.registry.loadRegistry('live_controller', e => e.meta.name, [
    {
        meta: {
            name: 'neo_icon',
            title: {
                text: '图标',
                translate: 'neo_icon'
            }
        },
        content: [
            'SAVE', 'LOAD', 'Q.SAVE', 'Q.LOAD',
            {
                type: 'icon',
                value: 'material:cog'
            }, {
                type: 'icon',
                value: 'material:skip-backward'
            }, {
                type: 'icon',
                value: 'material:rewind'
            }, {
                type: 'icon',
                value: 'material:chevron-left'
            }, {
                type: 'icon',
                value: 'material:chevron-right'
            }, {
                type: 'icon',
                value: 'material:fast-forward'
            }, {
                type: 'icon',
                value: 'material:skip-forward'
            }, {
                type: 'icon',
                value: 'material:history'
            }, {
                type: 'icon',
                value: 'material:exit-to-app'
            }
        ]
    },
    {
        meta: {
            name: 'classic',
            title: {
                text: '旧版纯文本',
                translate: 'classic'
            }
        },
        content: [
            'SAVE', 'LOAD', 'Q.SAVE', 'Q.LOAD', '⭰', '⯬', '🡄', '🡆', '⯮', '⭲', 'HISTORY',
            {
                type: 'html',
                value: `<span style="font-family: 'Microsoft YaHei';">╳</span>`
            }
        ]
    }
]);