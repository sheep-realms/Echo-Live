echoLiveSystem.registry.loadRegistry('avatar_switch_effect', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'fade-in'
    }
]);