echoLiveSystem.registry.loadRegistry('border_style', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'solid',
    }, {
        value: 'dashed',
    }, {
        value: 'dotted',
    }, {
        value: 'double',
    }, {
        value: 'groove',
    }, {
        value: 'ridge',
    }, {
        value: 'inset',
    }, {
        value: 'outset',
    }
]);