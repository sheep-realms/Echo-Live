class ExtensionManager {
    constructor() {
        this.mixer = undefined;
    }

    load(data = {}) {
        if (data?.meta == undefined) return;

        if (data?.addon != undefined) {
            if (typeof data.addon?.audio == 'object') {
                data.addon.audio.forEach(e => {
                    e.name = data.meta.namespace + ':' + e.name;
                    e.path = `extensions/${data.meta.namespace}/${e.path}`;
                    this.mixer.audioDB.push(e);
                });
            }
        }
    }

    launch(extList = []) {
        extList.forEach(e => {
            let s = document.createElement("script");
            s.src = `extensions/${e}/pack.js`;
            document.head.appendChild(s);
        });
    }
}