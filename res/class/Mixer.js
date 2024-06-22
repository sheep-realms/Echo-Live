class Mixer {
    constructor() {}

    play(name, volume = undefined, rate = undefined) {
        let obj = extensionManager.getAudioByName(name);
        if (obj == undefined) return undefined;

        let a = new Audio(obj.choose());

        if (volume != undefined) {
            a.volume = volume
        } else if (obj?.volume != undefined) {
            a.volume = obj.volume
        } else {
            a.volume = 1;
        };

        if (rate != undefined) {
            a.playbackRate = rate
        } else if (obj?.rate != undefined) {
            a.playbackRate = obj.rate
        } else {
            a.playbackRate = 1;
        };
        
        a.onended = function () {delete this};
        a.play();
    }
}

let mixer = new Mixer();