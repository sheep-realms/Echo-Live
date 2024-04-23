emojiHako.load([
    {
        meta: {
            name: 'sheep-realms:pixel-head',
            namespace: 'sp',
            title: '绵羊的像素头像',
            title_i18n: 'sheep_realms.pixel_head.title',
            author: 'Sheep-realms'
        },
        path: {
            i18n: 'sheep_realms.pixel_head.emoji.',
            images: 'res/image/emoji/sheep-realms/pixel-head/'
        },
        image: {
            margin: {
                left: '0.5rem',
                right: '0.5rem'
            },
            rendering: 'pixelated',
            size: {
                width: {
                    value: '1em',
                    max: 'unset',
                    min: 'unset'
                },
                height: {
                    value: '1em',
                    max: 'unset',
                    min: 'unset'
                }
            }
        },
        content: [
            {
                name: 'default',
                title: '注视',
                title_i18n: 'default',
                path: '000_default.png'
            }, {
                name: 'fear',
                title: '害怕',
                title_i18n: 'fear',
                path: '001_fear.png'
            }, {
                name: 'happy',
                title: '开心',
                title_i18n: 'happy',
                path: '002_happy.png'
            }
        ]
    }
]);