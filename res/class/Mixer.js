/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class Mixer {
    constructor() {
        this.lastSoundName = undefined;
        this.lastSoundPickIndex = -1;
        this.clampOscillator = false;
        this.playingSounds = new Map();
        this.lastSoundPlayAt = new Map();
    }

    _addPlayingSound(name) {
        let count = this.playingSounds.get(name);
        if (typeof count !== 'number') count = 0;

        return this.playingSounds.set(name, ++count);
    }

    _removePlayingSound(name) {
        let count = this.playingSounds.get(name);
        if (typeof count !== 'number') return;

        return this.playingSounds.set(name, Math.max(0, --count));
    }

    _checkSoundInPlaying(name) {
        let count = this.playingSounds.get(name);
        if (typeof count !== 'number' || count <= 0) return false;
        return true;
    }

    _updateSoundPlayAt(name) {
        return this.lastSoundPlayAt.set(name, Date.now());
    }

    _getSoundPlayAt(name) {
        let time = this.lastSoundPlayAt.get(name);
        if (typeof time !== 'number') return 0;
        return time;
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

        let outputVolume    = volume    ?? obj?.volume  ?? 1;
        let outputRate      = rate      ?? obj?.rate    ?? 1;

        if (obj.pick_strategy === 'sequential_clamp' && this.clampOscillator) {
            outputVolume = outputVolume * (obj?.oscillator?.volume_multiplier ?? 1);
            outputRate = outputRate * (obj?.oscillator?.rate_multiplier ?? 1);
        }

        let a;
        this.lastSoundName = name;
        if (Array.isArray(obj.path)) {
            let i = this._pickSound(obj);
            a = new Audio(obj.path[i]);
        } else {
            a = new Audio(obj.path);
        }

        a.volume        = outputVolume;
        a.playbackRate  = outputRate;
        
        a.onplay = () => {
            this._addPlayingSound(name);
            this._updateSoundPlayAt(name);
        }

        a.onended = () => {
            this._removePlayingSound(name);
        }

        if (this._getSoundPlayAt(name) + obj.safe_duration <= Date.now()) a.play();
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

    /**
     * 重置抽取和振荡器
     */
    resetPickIndex() {
        this.lastSoundPickIndex = -1;
        this.clampOscillator = false;
    }

    _pickSound(soundObject) {
        const name = soundObject.name;
        const length = soundObject.path.length;
        if (typeof length !== 'number') throw Error(`Sound "${name}" cannot pick`);
        const strategy = soundObject.pick_strategy ?? 'random';
        const allowDuplicate = soundObject.allow_duplicate ?? false;
        let index = this.lastSoundPickIndex;

        switch (strategy) {
            case 'random':
                let r = Math.floor(Math.random() * length);
                if (!allowDuplicate && this.lastSoundName === name && this.lastSoundPickIndex === r) r = (r + 1) % length;
                index = r;
                break;

            case 'sequential_clamp':
                if (index < -1) index = -1;
                index++;
                if (index >= length) {
                    index = length - 1;
                    this.clampOscillator = !this.clampOscillator;
                }
                break;
        
            default:
                break;
        }

        this.lastSoundPickIndex = index;
        return index;
    }
}

let mixer = new Mixer();
echoLiveSystem.mixer = mixer;