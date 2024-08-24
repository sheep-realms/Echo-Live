class EchoLiveEditor {
    constructor(config) {
        this.emojiHako  = undefined;
        this.config     = config;
    }

    registryPalette(data = []) {
        if (typeof data !== 'object') return;
        if (!Array.isArray(data)) data = [data];
        data.forEach(e => {
            echoLiveSystem.registry.setRegistryValue('palette', e.meta.name, e);
        });
    }

    getPalettes() {
        let palettes = this.config.editor.color_picker.palette;
        if (typeof palettes === 'string' && palettes === 'all') return echoLiveSystem.registry.getRegistryArray('palette');
        if (!Array.isArray(palettes)) return echoLiveSystem.registry.getRegistryArray('palette');

        let output = [];
        palettes.forEach(e => {
            let p = echoLiveSystem.registry.getRegistryValue('palette', e);
            if (p != undefined) output.push(p);
        });

        return output;
    }

    getEmoji() {
        if (!(this.emojiHako instanceof EmojiHako)) return [];
        const emojiConfig = this.config.editor.emoji_picker.emoji;
        if (typeof emojiConfig === 'string' && emojiConfig === 'all') return this.emojiHako.getEmojiPack();
        if (!Array.isArray(emojiConfig)) return this.emojiHako.getEmojiPack();

        let output = [];
        emojiConfig.forEach(e => {
            let emojiPack = this.emojiHako.getEmojiPack(e);
            if (emojiPack != undefined) output.push(emojiPack);
        });

        return output;
    }
}

let echoLiveEditor = new EchoLiveEditor(config);