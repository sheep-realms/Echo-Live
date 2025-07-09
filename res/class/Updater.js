/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class Updater {
    constructor() {
        this.version = APP_META.version;
        this.localStorageManager = undefined;
        this.debug = {
            notRateLimit: true
        };
    }

    static {
        EchoLiveTools.defineObjectPropertyReadOnly(Updater, {
            GITHUB_OWNER:       'sheep-realms',
            GITHUB_REPO:        'Echo-Live',
            GITHUB_API_DOMAIN:  'api.github.com',
            GITHUB_API_VERSION: '2022-11-28'
        });

        EchoLiveTools.defineObjectPropertyReadOnly(Updater, {
            GITHUB_REST_API_REPOS_PREFIX: `https://${Updater.GITHUB_API_DOMAIN}/repos/${Updater.GITHUB_OWNER}/${Updater.GITHUB_REPO}`
        });

        EchoLiveTools.defineObjectPropertyReadOnly(Updater, {
            GITHUB_REST_API_REPOS_RELEASES:         `${Updater.GITHUB_REST_API_REPOS_PREFIX}/releases`,
            GITHUB_REST_API_REPOS_RELEASES_LATEST:  `${Updater.GITHUB_REST_API_REPOS_PREFIX}/releases/latest`,
        });
    }

    getData(url, callback = () => {}, onerror = () => {}) {
        console.log('start');
        fetch(url, {
            headers: {
                'X-GitHub-Api-Version': Updater.GITHUB_API_VERSION
            }
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            onerror(error);
        });
    }

    updateCheck(callback = () => {}) {
        let lsData = this.getLocalStorageData();
        if (!this.debug.notRateLimit && lsData.lastUpdateCheck + 180000 > new Date().getTime()) return;

        this.getData(
            Updater.GITHUB_REST_API_REPOS_RELEASES,
            data => {
                this.updateCheckCallback(data, callback);
            },
            error => {
                callback({
                    state: 'error',
                    error: error
                });
            }
        );
    }

    updateCheckCallback(data = [], callback = () => {}) {
        if (!Array.isArray(data)) return;
        let notPreReleases = data.filter(e => {
            // 不要相信别人的东西
            if (e?.prerelease === undefined) return true;
            return !e.prerelease;
        });
        if (notPreReleases.length === 0) return;

        let lsData = this.getLocalStorageData();
        lsData.lastUpdateCheck = new Date().getTime();
        lsData.latestReleasesData = notPreReleases[0];

        if (this.compareVersions(notPreReleases[0]?.tag_name) === 1) {
            lsData.hasNewReleases = true;
            lsData.newReleasesTag = notPreReleases[0]?.tag_name;
        } else {
            lsData.hasNewReleases = false;
            lsData.newReleasesTag = '';
        }

        this.setLocalStorageData(lsData);

        callback({
            state: 'success',
            data: {
                hasNewReleases: lsData?.hasNewReleases,
                newReleasesTag: lsData?.newReleasesTag,
                releases: notPreReleases[0]
            }
        });
    }

    initLocalStorageData() {
        let data = {
            lastUpdateCheck: 0,
            hasNewReleases: false,
            newReleasesTag: '',
            latestReleasesData: {}
        };
        this.setLocalStorageData(data);
        return data;
    }

    getLocalStorageData() {
        let data = this.localStorageManager.getItem('updater');
        if (data === undefined) data = this.initLocalStorageData();
        return data;
    }

    setLocalStorageData(data) {
        this.localStorageManager.setItem('updater', data);
    }

    /**
     * 比较两个版本号
     * @param {string} version 比较版本
     * @returns {number} 1：新版，0：相同，-1：旧版，-2：格式不匹配
     */
    compareVersions(version) {
        if (version === this.version) return 0;
        if (!/^\d+(\.\d+)*$/.test(version)) return -2;

        const v1Parts = version.split('.').map(Number);
        const v2Parts = this.version.split('.').map(Number);

        const maxLength = Math.max(v1Parts.length, v2Parts.length);

        for (let i = 0; i < maxLength; i++) {
            const v1Part = v1Parts[i] || 0;
            const v2Part = v2Parts[i] || 0;

            if (v1Part > v2Part) {
                return 1;
            } else if (v1Part < v2Part) {
                return -1;
            }
        }

        return 0;
    }
}