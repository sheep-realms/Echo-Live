echoLiveSystem.registry.loadRegistry('font_weight', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'inherit',
    }, {
        value: 'normal',
    }, {
        value: 'bold',
    }, {
        value: '100',
    }, {
        value: '200',
    }, {
        value: '300',
    }, {
        value: '350',
    }, {
        value: '400',
    }, {
        value: '500',
    }, {
        value: '600',
    }, {
        value: '700',
    }, {
        value: '800',
    }, {
        value: '900',
    }, {
        value: '950',
    }
]);