echoLiveSystem.registry.loadRegistry('avatar', e => {
    return e.meta.name;
}, [
    {
        meta: {
            name: 'echo_otone',
            title: 'Echo 追音',
            title_i18n: 'echo_otone.name',
            author: 'Sheep-realms'
        },
        path: {
            action_i18n: 'common.action.',
            images: 'res/image/avatar/echo_otone/'
        },
        default_action: {
            idle: 'idle',
            unknown: 'missingno'
        },
        action: [
            {
                name: 'idle',
                title_i18n: 'idle',
                path: 'idle.png'
            }, {
                name: 'missingno',
                title_i18n: 'missingno',
                path: 'missingno.png'
            }, {
                name: 'screaming',
                title_i18n: 'screaming',
                path: 'screaming.png'
            }, {
                name: 'shaded',
                title_i18n: 'shaded',
                path: 'shaded.png'
            }
        ],
        scene: [
            {
                name: 'face',
                title_i18n: 'face',
                position: 'center top',
                size: '115vh'
            }, {
                name: 'bust',
                title_i18n: 'bust',
                position: 'center top',
                size: '86vh'
            }, {
                name: 'knee',
                title_i18n: 'knee',
                position: 'center top',
                size: '65vh'
            }, {
                name: 'heel',
                title_i18n: 'heel',
                position: 'center top',
                size: '50vh'
            }, {
                name: 'full',
                title_i18n: 'full',
                position: 'center center',
                size: 'contain'
            }, {
                name: 'long',
                title_i18n: 'long',
                position: 'center center',
                size: '35vh'
            }
        ]
    }
]);