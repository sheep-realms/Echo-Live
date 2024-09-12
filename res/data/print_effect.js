echoLiveSystem.registry.loadRegistry('print_effect', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'fade-in'
    }, {
        value: 'move-in-up'
    }, {
        value: 'move-in-down'
    }, {
        value: 'zoom-in-inside',
        hidden: true
    }, {
        value: 'zoom-in-outside',
        hidden: true
    }, {
        value: 'blur-in'
    }
]);