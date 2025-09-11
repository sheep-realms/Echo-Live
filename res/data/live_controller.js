echoLiveSystem.registry.loadRegistry('live_controller', e => e.meta.name, [
    {
        meta: {
            name: 'neo_icon',
            title: {
                text: '图标',
                translate: 'neo_icon.title'
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
            name: 'all_icon',
            title: {
                text: '全量图标',
                translate: 'all_icon.title'
            }
        },
        content: [
            {
                type: 'icon',
                value: 'material:lock'
            }, {
                type: 'icon',
                value: 'material:wrench'
            },
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
                value: 'material:microphone'
            }, {
                type: 'icon',
                value: 'material:message-star'
            }, {
                type: 'icon',
                value: 'material:close'
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
                translate: 'classic.title'
            }
        },
        content: [
            'SAVE', 'LOAD', 'Q.SAVE', 'Q.LOAD', '⭰', '⯬', '🡄', '🡆', '⯮', '⭲', 'HISTORY',
            {
                type: 'html',
                value: `<span style="font-family: 'Microsoft YaHei';">╳</span>`
            }
        ]
    },
    {
        meta: {
            name: 'word',
            title: {
                text: 'Word 文档',
                translate: 'word.title'
            }
        },
        content: [
            {
                type: 'text',
                value: { text: '文件', translate: 'file' }
            }, {
                type: 'text',
                value: { text: '开始', translate: 'start' }
            }, {
                type: 'text',
                value: { text: '插入', translate: 'insert' }
            }, {
                type: 'text',
                value: { text: '绘图', translate: 'graphics' }
            }, {
                type: 'text',
                value: { text: '设计', translate: 'design' }
            }, {
                type: 'text',
                value: { text: '布局', translate: 'layout' }
            }, {
                type: 'text',
                value: { text: '引用', translate: 'cite' }
            }, {
                type: 'text',
                value: { text: '邮件', translate: 'email' }
            }, {
                type: 'text',
                value: { text: '审阅', translate: 'review' }
            }, {
                type: 'text',
                value: { text: '视图', translate: 'view' }
            }, {
                type: 'text',
                value: { text: '帮助', translate: 'help' }
            }
        ]
    }, {
        meta: {
            name: 'draw',
            title: {
                text: '画图',
                translate: 'draw.title'
            }
        },
        content: [
            {
                type: 'icon',
                value: 'material:hand-back-right'
            }, {
                type: 'icon',
                value: 'material:magnify'
            }, {
                type: 'icon',
                value: 'material:select'
            }, {
                type: 'icon',
                value: 'material:magic-staff'
            }, {
                type: 'icon',
                value: 'material:arrow-all'
            }, {
                type: 'icon',
                value: 'material:pencil'
            }, {
                type: 'icon',
                value: 'material:brush'
            }, {
                type: 'icon',
                value: 'material:grease-pencil'
            }, {
                type: 'icon',
                value: 'material:eyedropper'
            }, {
                type: 'icon',
                value: 'material:eraser'
            }, {
                type: 'icon',
                value: 'material:fountain-pen-tip'
            }, {
                type: 'icon',
                value: 'material:pail'
            }, {
                type: 'icon',
                value: 'material:drawing'
            }, {
                type: 'icon',
                value: 'material:gradient-vertical'
            }, {
                type: 'icon',
                value: 'material:format-text'
            }, {
                type: 'icon',
                value: 'material:ruler'
            }, {
                type: 'icon',
                value: 'material:palette'
            }
        ]
    }
]);