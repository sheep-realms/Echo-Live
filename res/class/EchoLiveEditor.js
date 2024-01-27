class EchoLiveEditor {
    constructor(config) {
        this.palette = [];
        this.config = config;
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
        return this.palette.find(function(e) {
            return e.meta.name == name;
        });
    }

    findPaletteIndex(name) {
        return this.palette.findIndex(function(e) {
            return e.meta.name == name;
        });
    }

    getPalettes() {
        let palettes = this.config.editor.palette;
        if (typeof palettes === 'string' && palettes === 'all') return this.palette;
        if (!Array.isArray(palettes)) return this.palette;

        let output = [];
        palettes.forEach(e => {
            let p = this.findPalette(e);
            if (p != undefined) output.push(p);
        });

        return output;
    }
}

let echoLiveEditor = new EchoLiveEditor(config);