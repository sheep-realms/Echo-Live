class EchoLiveEditor {
    constructor(config) {
        this.palette    = [];
        this.emojiHako  = undefined;
        this.config     = config;
    }

    addPalette(data) {
        let pi = this.findPaletteIndex(data.meta.name);
        if (pi === -1) return this.palette.push(data);
        return this.palette[pi] = {
            ...this.palette[pi],
            ...data
        }
    }

    pushPalette(array = []) {
        array.forEach(p => {
            this.addPalette(p);
        });
        return;
    }

    findPalette(name) {
        return this.palette.find(e => e.meta.name == name);
    }

    findPaletteIndex(name) {
        return this.palette.findIndex(e => e.meta.name == name);
    }

    getPalettes() {
        let palettes = this.config.editor.color_picker.palette;
        if (typeof palettes === 'string' && palettes === 'all') return this.palette;
        if (!Array.isArray(palettes)) return this.palette;

        let output = [];
        palettes.forEach(e => {
            let p = this.findPalette(e);
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