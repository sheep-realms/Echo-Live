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
            action_i18n: 'echo_otone.action.',
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
        ]
    }
]);