emojiHako.load([
    {
        meta: {
            name: 'emoji',
            namespace: 'emoji',
            title: 'Emoji',
            title_i18n: 'emoji.title',
            author: ''
        },
        path: {
            i18n: 'emoji.',
            images: ''
        },
        image: {
            isEmoji: true,
            show_title: false
        },
        content: [
            { type: 'group', title_i18n: 'emotion' },
            '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🙂',
            '🙃', '😉', '😍', '🥰', '😘', '😋', '😝', '🤪',
            '🤨', '🤓', '😎', '🥳', '😏', '😒', '😞', '🙁',
            '😣', '😫', '🥺', '😢', '😭', '😡', '🤬', '😳',
            '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
            '🤔', '🤭', '😶', '😐', '😬', '🙄', '😮', '😲',
            '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮',
            '😷', '🤕', '🤑', '😈', '👿', '🤡', '👻', '💀',

            { type: 'group', title_i18n: 'gesture' },
            '👍', '👎', '👌', '👊', '✊', '🤛', '🤜', '🖕',
            '🤝', '👏', '🙌', '🤲', '👐', '✋', '🤚', '✌',
            '👈', '👉', '👆', '👇', '🤞', '👋', '🖐', '🤙',
            '🙏', '💪', '✍', '🤟', '🤘',

            { type: 'group', title_i18n: 'animal' },
            '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
            '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐒',
            '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇',
            '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌',
            '🐞', '🐜', '🦟', '🦗', '🐢', '🐍', '🦎', '🐙', 
            '🦑', '🦐', '🦀', '🐠', '🐟', '🐬', '🐋', '🦈',

            { type: 'group', title_i18n: 'nature' },
            '🔥', '⚡', '⭐', '🌟', '✨', '💥', '🌈', '🌏',
            '💧', '⛄', '🌲', '🌴', '🎄', '🍀', '🍄', '🌷',
            '💐', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌙',

            { type: 'group', title_i18n: 'food' },
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
            title: '绵羊的像素头像',
            title_i18n: 'sheep_realms.pixel_head.title',
            author: 'Sheep-realms'
        },
        path: {
            i18n: 'sheep_realms.pixel_head.',
            images: 'res/image/emoji/sheep-realms/pixel-head/'
        },
        image: {
            margin: {
                left: '0.5rem',
                right: '0.5rem'
            },
            rendering: 'pixelated',
            review_size: 'small',
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
                title_i18n: 'default',
                path: '000_default.png'
            }, {
                name: 'fear',
                title_i18n: 'fear',
                path: '001_fear.png'
            }, {
                name: 'happy',
                title_i18n: 'happy',
                path: '002_happy.png'
            }, {
                name: 'cry',
                title_i18n: 'cry',
                path: '003_cry.png'
            }, {
                name: 'heart',
                title_i18n: 'heart',
                path: '004_heart.png'
            }, {
                name: 'shock',
                title_i18n: 'shock',
                path: '005_shock.png'
            }, {
                name: 'doubt',
                title_i18n: 'doubt',
                path: '006_doubt.png'
            }, {
                name: 'close_eyes',
                title_i18n: 'close_eyes',
                path: '007_close_eyes.png'
            }, {
                name: 'sleep',
                title_i18n: 'sleep',
                path: '008_sleep.png'
            }, {
                name: 'no',
                title_i18n: 'no',
                path: '009_no.png'
            }, {
                name: 'yes',
                title_i18n: 'yes',
                path: '010_yes.png'
            }, {
                name: 'loading',
                title_i18n: 'loading',
                path: '011_loading.png'
            }, {
                name: 'hehe',
                title_i18n: 'hehe',
                path: '012_hehe.png'
            }, {
                name: 'missingno',
                title_i18n: 'missingno',
                path: '013_missingno.png'
            }, {
                name: 'angry',
                title_i18n: 'angry',
                path: '014_angry.png'
            }, {
                name: 'sunglasses',
                title_i18n: 'sunglasses',
                path: '015_sunglasses.png'
            }, {
                name: 'elec',
                title_i18n: 'elec',
                path: '016_elec.png'
            }, {
                name: 'elec2',
                title_i18n: 'elec2',
                path: '017_elec2.png'
            }, {
                name: 'shy',
                title_i18n: 'shy',
                path: '018_shy.png'
            }, {
                name: 'sex',
                title_i18n: 'sex',
                path: '019_sex.png'
            }, {
                name: 'chaos',
                title_i18n: 'chaos',
                path: '020_chaos.png'
            }, {
                name: 'respirator',
                title_i18n: 'respirator',
                path: '021_respirator.png'
            }, {
                name: 'water',
                title_i18n: 'water',
                path: '023_water.png'
            }, {
                name: 'waterfall',
                title_i18n: 'waterfall',
                path: '024_waterfall.png'
            }, {
                name: 'vomit',
                title_i18n: 'vomit',
                path: '025_vomit.png'
            }, {
                name: 'watermelon',
                title_i18n: 'watermelon',
                path: '026_watermelon.png'
            }, {
                name: 'click',
                title_i18n: 'click',
                path: '031_click.png'
            }, {
                name: 'pot_me',
                title_i18n: 'pot_me',
                path: '032_pot_me.png'
            }, {
                name: 'box_gear',
                title_i18n: 'box_gear',
                path: '033_box_gear.png'
            }, {
                name: 'pants',
                title_i18n: 'pants',
                path: '034_pants.png'
            }, {
                name: 'black_stripe',
                title_i18n: 'black_stripe',
                path: '038_black_stripe.png'
            }, {
                name: 'waterfall_start',
                title_i18n: 'waterfall_start',
                path: '039_waterfall_start.png'
            }, {
                name: 'waterfall_end',
                title_i18n: 'waterfall_end',
                path: '040_waterfall_end.png'
            }, {
                name: 'hammer',
                title_i18n: 'hammer',
                path: '041_hammer.png'
            }, {
                name: 'bathe',
                title_i18n: 'bathe',
                path: '042_bathe.png'
            }, {
                name: 'unwelcome',
                title_i18n: 'unwelcome',
                path: '043_unwelcome.png'
            }, {
                name: 'stone',
                title_i18n: 'stone',
                path: '044_stone.png'
            }, {
                name: 'magnifier',
                title_i18n: 'magnifier',
                path: '045_magnifier.png'
            }, {
                name: 'ciallo',
                title_i18n: 'ciallo',
                path: '046_ciallo.png'
            }, {
                name: 'glowing_glasses',
                title_i18n: 'glowing_glasses',
                path: '047_glowing_glasses.png'
            }, {
                name: 'wall',
                title_i18n: 'wall',
                path: '050_wall.png'
            }, {
                name: 'phone',
                title_i18n: 'phone',
                path: '051_phone.png'
            }, {
                name: 'exciting',
                title_i18n: 'exciting',
                path: '052_exciting.png'
            }
        ]
    }, {
        meta: {
            name: 'sheep-realms:other',
            namespace: 'so',
            title: '绵羊的大表情',
            title_i18n: 'sheep_realms.other.title',
            author: 'Sheep-realms'
        },
        path: {
            i18n: 'sheep_realms.other.',
            images: 'res/image/emoji/sheep-realms/other/'
        },
        image: {
            margin: {
                left: '0.5rem',
                right: '0.5rem'
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
                title_i18n: 'ahwu',
                path: 'ahwu.png'
            }, {
                name: 'ze',
                title_i18n: 'ze',
                path: 'ze.png'
            }, {
                name: 'dame',
                title_i18n: 'dame',
                path: 'dame.png'
            }, {
                name: 'sofa',
                title_i18n: 'sofa',
                path: 'sofa.png'
            }, {
                name: 'eating',
                title_i18n: 'eating_potato_chips',
                path: 'eating_potato_chips.png'
            }, {
                name: 'orz',
                title_i18n: 'orz',
                path: 'orz.png'
            }, {
                name: 'danger',
                title_i18n: 'danger',
                path: 'danger.png'
            }, {
                name: 'nani',
                title_i18n: 'nani',
                path: 'nani.png'
            }
        ]
    }
]);