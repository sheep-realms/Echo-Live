class EmojiHako {
    constructor() {
        this.init();
    }

    init() {
        this.register(echoLiveSystem.registry.getRegistryArray('emoji'));
    }

    register(data) {
        if (typeof data != 'object') return;
        if (!Array.isArray(data)) data = [data];

        data.forEach(e => {
            let emojiPack = {
                meta: {
                    name:           'missingno',
                    namespace:      'missingno',
                    title:          $t('ui.missingno.no_name'),
                    author:         $t('ui.missingno.no_author'),
                    ...e?.meta
                },
                path: {
                    i18n:           '',
                    images:         `res/emoji/${ e?.name ? e.name : 'missingno' }/`,
                    ...e?.path
                },
                image: {
                    isEmoji:        e?.image?.isEmoji != undefined ? e.image.isEmoji : false,
                    rendering:      e?.image?.rendering ? e.image.rendering : 'auto',
                    review_size:    e?.image?.review_size ? e.image.review_size : 'middle',
                    show_title:     e?.image?.show_title != undefined ? e.image.show_title : true,
                    margin: {
                        left:       '0.5em',
                        right:      '0.5em',
                        ...e?.image?.margin
                    },
                    size: {
                        width: {
                            value:  '1em',
                            max:    'unset',
                            min:    'unset'
                        },
                        height: {
                            value:  '1em',
                            max:    'unset',
                            min:    'unset'
                        },
                        ...e?.image?.size
                    }
                },
                content: []
            }

            e.content.forEach(e2 => {
                if (e2?.type == 'group') {
                    emojiPack.content.push({
                        type:   'group',
                        title:  $t('ui.missingno.no_name'),
                        ...e2
                    });
                } else {
                    if (typeof e2 == 'object') {
                        emojiPack.content.push({
                            type:   'emoji',
                            name:   'missingno',
                            title:  $t('ui.missingno.no_name'),
                            path:   'missingno.png',
                            ...e2
                        });
                    } else if (typeof e2 == 'string' && emojiPack.image.isEmoji) {
                        emojiPack.content.push(e2);
                    }
                }
            });
            
            echoLiveSystem.registry.setRegistryValue('emoji', emojiPack.meta.name, emojiPack);
            echoLiveSystem.registry.setRegistryValue('emoji_namespace', emojiPack.meta.namespace, emojiPack.meta.name);
        });

        return echoLiveSystem.registry.getRegistryArray('emoji');
    }

    getEmojiPack(namespace = '', name = undefined) {
        if (typeof namespace != 'string') return;
        if (namespace === '' && name == undefined) {
            return echoLiveSystem.registry.getRegistryArray('emoji');
        }

        let mp;
        echoLiveSystem.registry.registryRedirect('emoji_namespace', 'emoji', namespace, value => {
            mp = value;
        });

        if (mp == undefined) {
            mp = echoLiveSystem.registry.getRegistryValue('emoji', namespace);
        }

        if (mp == undefined && name != undefined) {
            mp = echoLiveSystem.registry.getRegistryValue('emoji', name);
        }

        if (mp == undefined) return;

        return JSON.parse(JSON.stringify(mp));
    }

    getEmoji(key = '', isOriginal = false) {
        if (typeof key != 'string') return;
        let keys        = key.split(':');
        const emojiName = keys.pop();
        const ns        = keys.join(':');
        if (ns === '') return;

        const mp = this.getEmojiPack(ns);

        let emoji = mp.content.find((e) => {
            return e.name == emojiName && (e?.type == 'emoji' || e?.type == undefined);
        });

        emoji = JSON.parse(JSON.stringify(emoji));

        if (isOriginal) return emoji;

        emoji.image = {
            rendering: 'auto',
            ...mp?.image,
            ...emoji?.image,
            margin: {
                ...mp?.image?.margin,
                ...emoji?.image?.margin
            },
            size: {
                width: {
                    ...mp?.image?.size?.width,
                    ...emoji?.image?.size?.width
                },
                height: {
                    ...mp?.image?.size?.height,
                    ...emoji?.image?.size?.height
                }
            }
        };

        emoji.path          = mp.path.images + emoji.path;
        emoji.title_i18n    = mp.path.i18n + 'emoji.' + emoji.title_i18n;

        return emoji;
    }
}

let emojiHako = new EmojiHako();