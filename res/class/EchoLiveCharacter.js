class EchoLiveCharacter {
    constructor(config) {
        this.config = config;
        this.character = {};
        this.characterList = [];
        this.selectedCharacter = '';
        this.broadcast = undefined;
        this.hidden = false;

        this.init();
    }

    init() {
        this.broadcast = new EchoLiveCharacterBroadcast(this, this.config.echolive.broadcast_channel);
    }

    importCharacter(obj) {
        this.characterList.push(obj);
    }

    importCharacters(arr = []) {
        arr.forEach(e => {
            this.importCharacter(e);
        });
    }

    selectCharacter(name) {
        const c = this.characterList.find((e) => {
            return e.name == name;
        });
        if (c == undefined) return;
        this.character = c;
        this.selectedCharacter = name;
        return c;
    }

    animationDataToStyle(data) {
        let str = '';
        if (data?.duration != undefined) str += `--transition-duration: ${data?.duration}s;`;
        return str;
    }

    async setCharacterImage(src, data) {
        let transition = document.startViewTransition(() => {
            $('#character-img').attr('src', src);
            $('html').attr('style', this.animationDataToStyle(data));
        });

        try {
            await transition.finished;
        } finally {
            $('html').attr('style', '');
        }
    }

    setAction(name, data) {
        let a = this.character.actions.find((e) => {
            return e.name == name;
        });
        if (a == undefined) a = this.character.defaultAction;

        this.setCharacterImage(this.character.path + a.path, data);
    }
}