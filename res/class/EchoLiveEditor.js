class EchoLiveEditor {
    constructor() {
        this.palette = [];
    }

    addPalette(data) {
        return this.palette.push(data);
    }

    pushPalette(array = []) {
        this.palette = [...this.palette, ...array];
        return;
    }
}

let echoLiveEditor = new EchoLiveEditor();