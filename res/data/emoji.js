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
            offset: '0.125em',
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
            offset: '0.125em',
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
    }, {
        meta: {
            name: 'material:icon',
            namespace: 'mdi',
            title: {
                text: 'Material Design Icons',
                translate: 'material.icon.title'
            },
            author: [
                {
                    name: 'Google',
                    url: 'https://m3.material.io/styles/icons'
                }, {
                    name: {
                        text: 'Pictogrammers 社区贡献者',
                        translate: 'emoji.material.icon.author.pictogrammers'
                    },
                    url: 'https://pictogrammers.com/docs/contribute/contributors/#community-contributors'
                }
            ],
            license: {
                name: 'Apache License 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0'
            }
        },
        path: {
            translate: 'material.icon.',
            images: 'res/image/emoji/sheep-realms/pixel-head/'
        },
        image: {
            margin: {
                start: '0.35rem',
                end: '0.35rem'
            },
            rendering: 'pixelated',
            review_size: 'small',
            offset: '0.125em',
            scale: 1.25,
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
            { type: 'group', title: { translate: 'emoticon' } },
            {
                name: 'emoticon',
                title: { translate: 'emoticon' },
                icon: 'material:emoticon'
            }, {
                name: 'emoticon-frown',
                title: { translate: 'emoticon_frown' },
                icon: 'material:emoticon-frown'
            }, {
                name: 'emoticon-happy',
                title: { translate: 'emoticon_happy' },
                icon: 'material:emoticon-happy'
            }, {
                name: 'emoticon-neutral',
                title: { translate: 'emoticon_neutral' },
                icon: 'material:emoticon-neutral'
            }, {
                name: 'emoticon-sad',
                title: { translate: 'emoticon_sad' },
                icon: 'material:emoticon-sad'
            }, {
                name: 'emoticon-excited',
                title: { translate: 'emoticon_excited' },
                icon: 'material:emoticon-excited'
            }, {
                name: 'emoticon-lol',
                title: { translate: 'emoticon_lol' },
                icon: 'material:emoticon-lol'
            }, {
                name: 'emoticon-cool',
                title: { translate: 'emoticon_cool' },
                icon: 'material:emoticon-cool'
            }, {
                name: 'emoticon-confused',
                title: { translate: 'emoticon_confused' },
                icon: 'material:emoticon-confused'
            }, {
                name: 'emoticon-cry',
                title: { translate: 'emoticon_cry' },
                icon: 'material:emoticon-cry'
            }, {
                name: 'emoticon-angry',
                title: { translate: 'emoticon_angry' },
                icon: 'material:emoticon-angry'
            }, {
                name: 'emoticon-dead',
                title: { translate: 'emoticon_dead' },
                icon: 'material:emoticon-dead'
            }, {
                name: 'emoticon-devil',
                title: { translate: 'emoticon_devil' },
                icon: 'material:emoticon-devil'
            }, {
                name: 'emoticon-kiss',
                title: { translate: 'emoticon_kiss' },
                icon: 'material:emoticon-kiss'
            }, {
                name: 'emoticon-tongue',
                title: { translate: 'emoticon_tongue' },
                icon: 'material:emoticon-tongue'
            }, {
                name: 'emoticon-wink',
                title: { translate: 'emoticon_wink' },
                icon: 'material:emoticon-wink'
            },

            { type: 'group', title: { translate: 'gesture' } },
            {
                name: 'thumb-up',
                title: { translate: 'thumb_up' },
                icon: 'material:thumb-up'
            }, {
                name: 'thumb-down',
                title: { translate: 'thumb_down' },
                icon: 'material:thumb-down'
            }, {
                name: 'hand-okay',
                title: { translate: 'hand_okay' },
                icon: 'material:hand-okay'
            }, {
                name: 'hand-peace',
                title: { translate: 'hand_peace' },
                icon: 'material:hand-peace'
            }, {
                name: 'hand-wave',
                title: { translate: 'hand_wave' },
                icon: 'material:hand-wave'
            }, {
                name: 'handshake',
                title: { translate: 'handshake' },
                icon: 'material:handshake'
            }, {
                name: 'hand-clap',
                title: { translate: 'hand_clap' },
                icon: 'material:hand-clap'
            }, {
                name: 'hands-pray',
                title: { translate: 'hands_pray' },
                icon: 'material:hands-pray'
            }, {
                name: 'hand-water',
                title: { translate: 'hand_water' },
                icon: 'material:hand-water'
            }, {
                name: 'hand-wash',
                title: { translate: 'hand_wash' },
                icon: 'material:hand-wash'
            }, {
                name: 'hand-front-left',
                title: { translate: 'hand_front_left' },
                icon: 'material:hand-front-left'
            }, {
                name: 'hand-front-right',
                title: { translate: 'hand_front_right' },
                icon: 'material:hand-front-right'
            }, {
                name: 'hand-pointing-up',
                title: { translate: 'hand_pointing_up' },
                icon: 'material:hand-pointing-up'
            }, {
                name: 'hand-pointing-down',
                title: { translate: 'hand_pointing_down' },
                icon: 'material:hand-pointing-down'
            }, {
                name: 'hand-pointing-left',
                title: { translate: 'hand_pointing_left' },
                icon: 'material:hand-pointing-left'
            }, {
                name: 'hand-pointing-right',
                title: { translate: 'hand_pointing_right' },
                icon: 'material:hand-pointing-right'
            },
            
            { type: 'group', title: { translate: 'symbol' } },
            {
                name: 'check',
                title: { translate: 'check' },
                icon: 'material:check'
            }, {
                name: 'close',
                title: { translate: 'close' },
                icon: 'material:close'
            }, {
                name: 'cancel',
                title: { translate: 'cancel' },
                icon: 'material:cancel'
            }, {
                name: 'heart',
                title: { translate: 'heart' },
                icon: 'material:heart'
            }, {
                name: 'heart-broken',
                title: { translate: 'heart_broken' },
                icon: 'material:heart-broken'
            }, {
                name: 'creation',
                title: { translate: 'creation' },
                icon: 'material:creation'
            }, {
                name: 'alert',
                title: { translate: 'alert' },
                icon: 'material:alert'
            }, {
                name: 'chat-processing',
                title: { translate: 'chat-processing' },
                icon: 'material:chat-processing'
            }, {
                name: 'refresh',
                title: { translate: 'refresh' },
                icon: 'material:refresh'
            }, {
                name: 'play',
                title: { translate: 'play' },
                icon: 'material:play'
            }, {
                name: 'pause',
                title: { translate: 'pause' },
                icon: 'material:pause'
            }, {
                name: 'stop',
                title: { translate: 'stop' },
                icon: 'material:stop'
            }, {
                name: 'arrow-up',
                title: { translate: 'arrow_up' },
                icon: 'material:arrow-up'
            }, {
                name: 'arrow-down',
                title: { translate: 'arrow_down' },
                icon: 'material:arrow-down'
            }, {
                name: 'arrow-left',
                title: { translate: 'arrow_left' },
                icon: 'material:arrow-left'
            }, {
                name: 'arrow-right',
                title: { translate: 'arrow_right' },
                icon: 'material:arrow-right'
            },

            { type: 'group', title: { translate: 'animal' } },
            {
                name: 'paw',
                title: { translate: 'paw' },
                icon: 'material:paw'
            }, {
                name: 'cat',
                title: { translate: 'cat' },
                icon: 'material:cat'
            }, {
                name: 'dog',
                title: { translate: 'dog' },
                icon: 'material:dog'
            }, {
                name: 'rabbit',
                title: { translate: 'rabbit' },
                icon: 'material:rabbit'
            }, {
                name: 'tortoise',
                title: { translate: 'tortoise' },
                icon: 'material:tortoise'
            }, {
                name: 'pig-variant',
                title: { translate: 'pig_variant' },
                icon: 'material:pig-variant'
            }, {
                name: 'sheep',
                title: { translate: 'sheep' },
                icon: 'material:sheep'
            }, {
                name: 'cow',
                title: { translate: 'cow' },
                icon: 'material:cow'
            }, {
                name: 'duck',
                title: { translate: 'duck' },
                icon: 'material:duck'
            }, {
                name: 'horse',
                title: { translate: 'horse' },
                icon: 'material:horse'
            }, {
                name: 'elephant',
                title: { translate: 'elephant' },
                icon: 'material:elephant'
            }, {
                name: 'fish',
                title: { translate: 'fish' },
                icon: 'material:fish'
            }, {
                name: 'dolphin',
                title: { translate: 'dolphin' },
                icon: 'material:dolphin'
            }, {
                name: 'jellyfish',
                title: { translate: 'jellyfish' },
                icon: 'material:jellyfish'
            }, {
                name: 'rodent',
                title: { translate: 'rodent' },
                icon: 'material:rodent'
            }, {
                name: 'snake',
                title: { translate: 'snake' },
                icon: 'material:snake'
            },

            { type: 'group', title: { translate: 'nature' } },
            {
                name: 'earth',
                title: { translate: 'earth' },
                icon: 'material:earth'
            }, {
                name: 'white-balance-sunny',
                title: { translate: 'white_balance_sunny' },
                icon: 'material:white-balance-sunny'
            }, {
                name: 'weather-night',
                title: { translate: 'weather_night' },
                icon: 'material:weather-night'
            }, {
                name: 'cloud',
                title: { translate: 'cloud' },
                icon: 'material:cloud'
            }, {
                name: 'water',
                title: { translate: 'water' },
                icon: 'material:water'
            }, {
                name: 'fire',
                title: { translate: 'fire' },
                icon: 'material:fire'
            }, {
                name: 'lightning-bolt',
                title: { translate: 'lightning_bolt' },
                icon: 'material:lightning-bolt'
            }, {
                name: 'weather-windy',
                title: { translate: 'weather_windy' },
                icon: 'material:weather-windy'
            }, {
                name: 'seed',
                title: { translate: 'seed' },
                icon: 'material:seed'
            }, {
                name: 'leaf',
                title: { translate: 'leaf' },
                icon: 'material:leaf'
            }, {
                name: 'sprout',
                title: { translate: 'sprout' },
                icon: 'material:sprout'
            }, {
                name: 'pine-tree',
                title: { translate: 'pine_tree' },
                icon: 'material:pine-tree'
            }, {
                name: 'forest',
                title: { translate: 'forest' },
                icon: 'material:forest'
            }, {
                name: 'grass',
                title: { translate: 'grass' },
                icon: 'material:grass'
            }, {
                name: 'flower',
                title: { translate: 'flower' },
                icon: 'material:flower'
            }, {
                name: 'mushroom',
                title: { translate: 'mushroom' },
                icon: 'material:mushroom'
            }, {
                name: 'cactus',
                title: { translate: 'cactus' },
                icon: 'material:cactus'
            }, {
                name: 'terrain',
                title: { translate: 'terrain' },
                icon: 'material:terrain'
            }, {
                name: 'weather-pouring',
                title: { translate: 'weather_pouring' },
                icon: 'material:weather-pouring'
            }, {
                name: 'snowflake',
                title: { translate: 'snowflake' },
                icon: 'material:snowflake'
            }, {
                name: 'tsunami',
                title: { translate: 'tsunami' },
                icon: 'material:tsunami'
            }, {
                name: 'volcano',
                title: { translate: 'volcano' },
                icon: 'material:volcano'
            }, {
                name: 'weather-hurricane',
                title: { translate: 'weather_hurricane' },
                icon: 'material:weather-hurricane'
            }, {
                name: 'weather-tornado',
                title: { translate: 'weather_tornado' },
                icon: 'material:weather-tornado'
            },

            { type: 'group', title: { translate: 'food' } },
            {
                name: 'baguette',
                title: { translate: 'baguette' },
                icon: 'material:baguette'
            }, {
                name: 'candy',
                title: { translate: 'candy' },
                icon: 'material:candy'
            }, {
                name: 'cake',
                title: { translate: 'cake' },
                icon: 'material:cake'
            }, {
                name: 'cookie',
                title: { translate: 'cookie' },
                icon: 'material:cookie'
            }, {
                name: 'egg-fried',
                title: { translate: 'egg_fried' },
                icon: 'material:egg-fried'
            }, {
                name: 'food-drumstick',
                title: { translate: 'food_drumstick' },
                icon: 'material:food-drumstick'
            }, {
                name: 'hamburger',
                title: { translate: 'hamburger' },
                icon: 'material:hamburger'
            }, {
                name: 'food',
                title: { translate: 'food' },
                icon: 'material:food'
            }, {
                name: 'french-fries',
                title: { translate: 'french_fries' },
                icon: 'material:french-fries'
            }, {
                name: 'food-hot-dog',
                title: { translate: 'food_hot_dog' },
                icon: 'material:food-hot-dog'
            }, {
                name: 'food-steak',
                title: { translate: 'food_steak' },
                icon: 'material:food-steak'
            }, {
                name: 'pizza',
                title: { translate: 'pizza' },
                icon: 'material:pizza'
            }, {
                name: 'food-apple',
                title: { translate: 'food_apple' },
                icon: 'material:food-apple'
            }, {
                name: 'fruit-watermelon',
                title: { translate: 'fruit_watermelon' },
                icon: 'material:fruit-watermelon'
            }, {
                name: 'fruit-citrus',
                title: { translate: 'fruit_citrus' },
                icon: 'material:fruit-citrus'
            }, {
                name: 'fruit-pineapple',
                title: { translate: 'fruit_pineapple' },
                icon: 'material:fruit-pineapple'
            }, {
                name: 'beer',
                title: { translate: 'beer' },
                icon: 'material:beer'
            }, {
                name: 'bottle-soda-classic',
                title: { translate: 'bottle_soda_classic' },
                icon: 'material:bottle-soda-classic'
            }, {
                name: 'coffee',
                title: { translate: 'coffee' },
                icon: 'material:coffee'
            }, {
                name: 'tea',
                title: { translate: 'tea' },
                icon: 'material:tea'
            }, {
                name: 'glass-mug-variant',
                title: { translate: 'glass_mug_variant' },
                icon: 'material:glass-mug-variant'
            }, {
                name: 'glass-cocktail',
                title: { translate: 'glass_cocktail' },
                icon: 'material:glass-cocktail'
            }, {
                name: 'ice-cream',
                title: { translate: 'ice_cream' },
                icon: 'material:ice-cream'
            }, {
                name: 'pot-steam',
                title: { translate: 'pot_steam' },
                icon: 'material:pot-steam'
            }, 

            { type: 'group', title: { translate: 'item' } },
            {
                name: 'brush',
                title: { translate: 'brush' },
                icon: 'material:brush'
            }, {
                name: 'format-paint',
                title: { translate: 'format_paint' },
                icon: 'material:format-paint'
            }, {
                name: 'palette',
                title: { translate: 'palette' },
                icon: 'material:palette'
            }, {
                name: 'spray',
                title: { translate: 'spray' },
                icon: 'material:spray'
            }, {
                name: 'magnify',
                title: { translate: 'magnify' },
                icon: 'material:magnify'
            }, {
                name: 'send',
                title: { translate: 'send' },
                icon: 'material:send'
            }, {
                name: 'cog',
                title: { translate: 'cog' },
                icon: 'material:cog'
            }, {
                name: 'content-save',
                title: { translate: 'content_save' },
                icon: 'material:content-save'
            }, {
                name: 'delete',
                title: { translate: 'delete' },
                icon: 'material:delete'
            }, {
                name: 'flag',
                title: { translate: 'flag' },
                icon: 'material:flag'
            }, {
                name: 'microphone',
                title: { translate: 'microphone' },
                icon: 'material:microphone'
            }, {
                name: 'piano',
                title: { translate: 'piano' },
                icon: 'material:piano'
            }, {
                name: 'bell',
                title: { translate: 'bell' },
                icon: 'material:bell'
            }, {
                name: 'wheelchair-accessibility',
                title: { translate: 'wheelchair_accessibility' },
                icon: 'material:wheelchair-accessibility'
            }, {
                name: 'test-tube',
                title: { translate: 'test_tube' },
                icon: 'material:test-tube'
            }, {
                name: 'volume-high',
                title: { translate: 'volume_high' },
                icon: 'material:volume-high'
            }
        ]
    }
]);