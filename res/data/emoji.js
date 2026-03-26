echoLiveSystem.registry.loadRegistry('emoji', e => e.meta.name, [
    {
        meta: {
            name: 'emoji',
            namespace: 'emoji',
            title: {
                text: 'Emoji',
                translate: 'emoji.title'
            },
            author: ''
        },
        path: {
            translate: 'emoji.',
            images: ''
        },
        image: {
            is_emoji: true,
            show_title: false
        },
        content: [
            { type: 'group', title: { translate: 'emotion' } },
            '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🙂',
            '🙃', '😉', '😍', '🥰', '😘', '😋', '😝', '🤪',
            '🤨', '🤓', '😎', '🥳', '😏', '😒', '😞', '🙁',
            '😣', '😫', '🥺', '😢', '😭', '😡', '🤬', '😳',
            '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
            '🤔', '🤭', '😶', '😐', '😬', '🙄', '😮', '😲',
            '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮',
            '😷', '🤕', '🤑', '😈', '👿', '🤡', '👻', '💀',

            { type: 'group', title: { translate: 'gesture' } },
            '👍', '👎', '👌', '👊', '✊', '🤛', '🤜', '🖕',
            '🤝', '👏', '🙌', '🤲', '👐', '✋', '🤚', '✌',
            '👈', '👉', '👆', '👇', '🤞', '👋', '🖐', '🤙',
            '🙏', '💪', '✍', '🤟', '🤘',

            { type: 'group', title: { translate: 'animal' } },
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
            '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐒',
            '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇',
            '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌',
            '🐞', '🐜', '🦟', '🦗', '🐢', '🐍', '🦎', '🐙', 
            '🦑', '🦐', '🦀', '🐠', '🐟', '🐬', '🐋', '🦈',

            { type: 'group', title: { translate: 'nature' } },
            '🔥', '⚡', '⭐', '🌟', '✨', '💥', '🌈', '🌏',
            '💧', '⛄', '🌲', '🌴', '🎄', '🍀', '🍄', '🌷',
            '💐', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌙',

            { type: 'group', title: { translate: 'food' } },
            '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇',
            '🍓', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅',
            '🍆', '🥒', '🌽', '🥕', '🥔', '🍠', '🍞', '🥖',
            '🧀', '🥚', '🍳', '🥓', '🥩', '🍗', '🍖', '🦴',
            '🌭', '🍔', '🍟', '🍕', '🥪', '🍝', '🍜', '🍲',
            '🍛', '🍣','🍱', '🥟', '🍤', '🍙', '🍚', '🍘',
            '🍥', '🥠', '🥮', '🍢', '🍧', '🍨', '🍦', '🥧',
            '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿',
            '🍩', '🍪', '🍯', '🥛', '🍼', '☕', '🍺', '🍻',
            '🥂', '🍸', '🍹', '🍾', '🥄', '🍴', '🥢', '🧂'
        ]
    }, {
        meta: {
            name: 'sheep-realms:pixel-head',
            namespace: 'sp',
            title: {
                text: '绵羊的像素头像',
                translate: 'sheep_realms.pixel_head.title'
            },
            author: {
                name: 'Sheep-realms',
                url: 'https://github.com/sheep-realms'
            },
            license: {
                name: 'CC BY-NC-SA 4.0',
                url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
            }
        },
        path: {
            translate: 'sheep_realms.pixel_head.',
            images: 'res/image/emoji/sheep-realms/pixel-head/'
        },
        image: {
            margin: {
                start: '0.35rem',
                end: '0.35rem'
            },
            rendering: 'pixelated',
            review_size: 'small',
            size: {
                width: {
                    value: '1.35em',
                    max: 'unset',
                    min: 'unset'
                },
                height: {
                    value: '1.35em',
                    max: 'unset',
                    min: 'unset'
                }
            }
        },
        content: [
            {
                name: 'default',
                title: { translate: 'default' },
                path: '000_default.png'
            }, {
                name: 'fear',
                title: { translate: 'fear' },
                path: '001_fear.png'
            }, {
                name: 'happy',
                title: { translate: 'happy' },
                path: '002_happy.png'
            }, {
                name: 'cry',
                title: { translate: 'cry' },
                path: '003_cry.png'
            }, {
                name: 'heart',
                title: { translate: 'heart' },
                path: '004_heart.png'
            }, {
                name: 'shock',
                title: { translate: 'shock' },
                path: '005_shock.png'
            }, {
                name: 'doubt',
                title: { translate: 'doubt' },
                path: '006_doubt.png'
            }, {
                name: 'close_eyes',
                title: { translate: 'close_eyes' },
                path: '007_close_eyes.png'
            }, {
                name: 'sleep',
                title: { translate: 'sleep' },
                path: '008_sleep.png'
            }, {
                name: 'no',
                title: { translate: 'no' },
                path: '009_no.png'
            }, {
                name: 'yes',
                title: { translate: 'yes' },
                path: '010_yes.png'
            }, {
                name: 'loading',
                title: { translate: 'loading' },
                path: '011_loading.png'
            }, {
                name: 'hehe',
                title: { translate: 'hehe' },
                path: '012_hehe.png'
            }, {
                name: 'missingno',
                title: { translate: 'missingno' },
                path: '013_missingno.png'
            }, {
                name: 'angry',
                title: { translate: 'angry' },
                path: '014_angry.png'
            }, {
                name: 'sunglasses',
                title: { translate: 'sunglasses' },
                path: '015_sunglasses.png'
            }, {
                name: 'elec',
                title: { translate: 'elec' },
                path: '016_elec.png'
            }, {
                name: 'elec2',
                title: { translate: 'elec2' },
                path: '017_elec2.png'
            }, {
                name: 'shy',
                title: { translate: 'shy' },
                path: '018_shy.png'
            }, {
                name: 'sex',
                title: { translate: 'sex' },
                path: '019_sex.png'
            }, {
                name: 'chaos',
                title: { translate: 'chaos' },
                path: '020_chaos.png'
            }, {
                name: 'respirator',
                title: { translate: 'respirator' },
                path: '021_respirator.png'
            }, {
                name: 'water',
                title: { translate: 'water' },
                path: '023_water.png'
            }, {
                name: 'waterfall',
                title: { translate: 'waterfall' },
                path: '024_waterfall.png'
            }, {
                name: 'vomit',
                title: { translate: 'vomit' },
                path: '025_vomit.png'
            }, {
                name: 'watermelon',
                title: { translate: 'watermelon' },
                path: '026_watermelon.png'
            }, {
                name: 'click',
                title: { translate: 'click' },
                path: '031_click.png'
            }, {
                name: 'pot_me',
                title: { translate: 'pot_me' },
                path: '032_pot_me.png'
            }, {
                name: 'box_gear',
                title: { translate: 'box_gear' },
                path: '033_box_gear.png'
            }, {
                name: 'pants',
                title: { translate: 'pants' },
                path: '034_pants.png'
            }, {
                name: 'black_stripe',
                title: { translate: 'black_stripe' },
                path: '038_black_stripe.png'
            }, {
                name: 'waterfall_start',
                title: { translate: 'waterfall_start' },
                path: '039_waterfall_start.png'
            }, {
                name: 'waterfall_end',
                title: { translate: 'waterfall_end' },
                path: '040_waterfall_end.png'
            }, {
                name: 'hammer',
                title: { translate: 'hammer' },
                path: '041_hammer.png'
            }, {
                name: 'bathe',
                title: { translate: 'bathe' },
                path: '042_bathe.png'
            }, {
                name: 'unwelcome',
                title: { translate: 'unwelcome' },
                path: '043_unwelcome.png'
            }, {
                name: 'stone',
                title: { translate: 'stone' },
                path: '044_stone.png'
            }, {
                name: 'magnifier',
                title: { translate: 'magnifier' },
                path: '045_magnifier.png'
            }, {
                name: 'ciallo',
                title: { translate: 'ciallo' },
                path: '046_ciallo.png'
            }, {
                name: 'glowing_glasses',
                title: { translate: 'glowing_glasses' },
                path: '047_glowing_glasses.png'
            }, {
                name: 'wall',
                title: { translate: 'wall' },
                path: '050_wall.png'
            }, {
                name: 'phone',
                title: { translate: 'phone' },
                path: '051_phone.png'
            }, {
                name: 'exciting',
                title: { translate: 'exciting' },
                path: '052_exciting.png'
            }, {
                name: 'doubt_reverse',
                title: { translate: 'doubt_reverse' },
                path: '053_doubt_reverse.png'
            }, {
                name: 'transparent',
                title: { translate: 'transparent' },
                path: '054_transparent.png'
            }, {
                name: 'objection',
                title: { translate: 'objection' },
                path: '055_objection.png'
            }, {
                name: 'pistol',
                title: { translate: 'pistol' },
                path: '056_pistol.png'
            }, {
                name: 'tnt',
                title: { translate: 'tnt' },
                path: '057_tnt.png'
            }, {
                name: 'haaaa',
                title: { translate: 'haaaa' },
                path: '058_haaaa.png'
            }, {
                name: 'very_angry',
                title: { translate: 'very_angry' },
                path: '059_very_angry.png'
            }, {
                name: 'sailor_suit',
                title: { translate: 'sailor_suit' },
                path: '060_sailor_suit.png'
            }
        ]
    }, {
        meta: {
            name: 'sheep-realms:other',
            namespace: 'so',
            title: {
                text: '绵羊的大表情',
                translate: 'sheep_realms.other.title'
            },
            author: {
                name: 'Sheep-realms',
                url: 'https://github.com/sheep-realms'
            },
            license: {
                name: 'CC BY-NC-SA 4.0',
                url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
            }
        },
        path: {
            translate: 'sheep_realms.other.',
            images: 'res/image/emoji/sheep-realms/other/'
        },
        image: {
            margin: {
                start: '0.35rem',
                end: '0.35rem'
            },
            review_size: 'large',
            size: {
                width: {
                    value: '4em',
                    max: 'unset',
                    min: 'unset'
                },
                height: {
                    value: '4em',
                    max: 'unset',
                    min: 'unset'
                }
            }
        },
        content: [
            {
                name: 'ahwu',
                title: { translate: 'ahwu' },
                path: 'ahwu.png'
            }, {
                name: 'ze',
                title: { translate: 'ze' },
                path: 'ze.png'
            }, {
                name: 'dame',
                title: { translate: 'dame' },
                path: 'dame.png'
            }, {
                name: 'sofa',
                title: { translate: 'sofa' },
                path: 'sofa.png'
            }, {
                name: 'eating',
                title: { translate: 'eating_potato_chips' },
                path: 'eating_potato_chips.png'
            }, {
                name: 'orz',
                title: { translate: 'orz' },
                path: 'orz.png'
            }, {
                name: 'danger',
                title: { translate: 'danger' },
                path: 'danger.png'
            }, {
                name: 'nani',
                title: { translate: 'nani' },
                path: 'nani.png'
            }, {
                name: 'haaaa',
                title: { translate: 'haaaa' },
                path: 'haaaa.png'
            }, {
                name: 'be_careful_of_sheep',
                title: { translate: 'be_careful_of_sheep' },
                path: 'be_careful_of_sheep.png'
            }, {
                name: 'please_wear_sailor_suit',
                title: { translate: 'please_wear_sailor_suit' },
                path: 'please_wear_sailor_suit.png'
            }, {
                name: 'shame',
                title: { translate: 'shame' },
                path: 'shame.png'
            }
        ]
    }
]);