class Mixer {
    constructor() {}

    find(name) {
        return echoLiveSystem.registry.getRegistryValue('sound', name);
    }

    play(name, volume = undefined, rate = undefined) {
        let obj = this.find(name);
        if (obj == undefined) return undefined;

        let a;
        if (Array.isArray(obj.path)) {
            let r = Math.round(Math.random() * obj.path.length - 1);
            a = new Audio(obj.path[r]);
        } else {
            a = new Audio(obj.path);
        }

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
echoLiveSystem.mixer = mixer;