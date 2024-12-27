/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class Mixer {
    constructor() {
        this.lastSoundName = undefined;
        this.lastSoundRandomIndex = 0;
    }

    /**
     * 查找音效数据
     * @param {String} name 音效名称
     * @returns {Object} 音效数据
     */
    find(name) {
        return echoLiveSystem.registry.getRegistryValue('sound', name);
    }

    /**
     * 播放音效
     * @param {String} name 音效名称
     * @param {Number} volume 音量
     * @param {Number} rate 播放速度
     */
    play(name, volume = undefined, rate = undefined) {
        let obj = this.find(name);
        if (obj === undefined) return undefined;

        let a;
        this.lastSoundName = name;
        if (Array.isArray(obj.path)) {
            let r = Math.floor(Math.random() * obj.path.length);
            if (!obj.allow_duplicate && this.lastSoundName === name && this.lastSoundRandomIndex === r) r = (r + 1) % obj.path.length;
            this.lastSoundRandomIndex = r;
            a = new Audio(obj.path[r]);
        } else {
            this.lastSoundRandomIndex = -1;
            a = new Audio(obj.path);
        }

        if (volume !== undefined) {
            a.volume = volume
        } else if (obj?.volume !== undefined) {
            a.volume = obj.volume
        } else {
            a.volume = 1;
        };

        if (rate !== undefined) {
            a.playbackRate = rate
        } else if (obj?.rate !== undefined) {
            a.playbackRate = obj.rate
        } else {
            a.playbackRate = 1;
        };
        
        a.onended = function () {delete this};
        a.play();
    }

    /**
     * 预载音效
     * @param {String} name 音效名称
     */
    preload(name) {
        let obj = this.find(name);
        if (obj === undefined) return undefined;

        if (!Array.isArray(obj.path)) obj.path = [obj.path];

        let a;
        obj.path.forEach(e => {
            a = new Audio(e);
            a.volume = 0;
            a.play();
        });
    }
}

let mixer = new Mixer();
echoLiveSystem.mixer = mixer;