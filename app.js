const APP_META = {
    name: 'Echo-Live',
    version: '1.6.1',
    isBeta: true
};

if (typeof window !== 'undefined') {
    window.APP_META = APP_META;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_META };
}