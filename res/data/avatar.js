echoLiveSystem.registry.loadRegistry('avatar', e => {
    return e.meta.name;
}, [
    {
        meta: {
            name: 'echo_otone',
            title: {
                text: 'Echo 追音',
                translate: 'echo_otone.name'
            },
            description: {
                translate: 'echo_otone.description'
            },
            author: [
                {
                    name: 'Sheep-realms',
                    url: 'https://github.com/sheep-realms'
                }
            ],
            license: {
                name: {
                    text: 'Echo-Live 虚拟形象 “Echo 追音” 授权协议',
                    translate: 'echo_otone.license'
                },
                url: 'docs/License-Echo-Otone.txt'
            }
        },
        path: {
            action_translate: 'common.action.',
            scene_translate: 'common.scene.',
            image: 'res/image/avatar/echo_otone/'
        },
        default_value: {
            action: {
                idle: 'idle',
                unknown: 'missingno'
            },
            scene: {
                idle: 'full',
                unknown: 'full'
            }
        },
        preview: {
            action: 'idle',
            scene: {
                position: 'center top',
                size: '100%'
            }
        },
        action: [
            {
                name: 'idle',
                title: { translate: 'idle' },
                path: 'idle.png'
            }, {
                name: 'missingno',
                title: { translate: 'missingno' },
                path: 'missingno.png'
            }, {
                name: 'screaming',
                title: { translate: 'screaming' },
                path: 'screaming.png'
            }, {
                name: 'shaded',
                title: { translate: 'shaded' },
                path: 'shaded.png'
            }
        ],
        scene: [
            {
                name: 'face_cu',
                title: { translate: 'face_cu' },
                position: 'center top -15vh',
                size: '160vh'
            }, {
                name: 'face',
                title: { translate: 'face' },
                position: 'center top',
                size: '115vh'
            }, {
                name: 'bust',
                title: { translate: 'bust' },
                position: 'center top',
                size: '86vh'
            }, {
                name: 'knee',
                title: { translate: 'knee' },
                position: 'center top',
                size: '65vh'
            }, {
                name: 'heel',
                title: { translate: 'heel' },
                position: 'center top',
                size: '50vh'
            }, {
                name: 'full',
                title: { translate: 'full' },
                position: 'center center',
                size: 'contain'
            }, {
                name: 'long',
                title: { translate: 'long' },
                position: 'center center',
                size: '35vh'
            }
        ]
    }
]);