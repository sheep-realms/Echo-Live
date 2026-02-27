echoLiveSystem.registry.loadRegistry('sound', 'name', [
    {
        name: 'typewriter',
        safe_duration: 20,
        path: 'res/audio/print/typewriter.ogg'
    }, {
        name: 'typewriter_loop',
        safe_duration: 20,
        path: [
            'res/audio/print/typewriter/typewriter.ogg',
            'res/audio/print/typewriter/typewriter01.ogg',
            'res/audio/print/typewriter/typewriter02.ogg',
            'res/audio/print/typewriter/typewriter03.ogg',
            'res/audio/print/typewriter/typewriter04.ogg',
            'res/audio/print/typewriter/typewriter05.ogg',
            'res/audio/print/typewriter/typewriter06.ogg',
            'res/audio/print/typewriter/typewriter07.ogg',
            'res/audio/print/typewriter/typewriter08.ogg',
            'res/audio/print/typewriter/typewriter09.ogg'
        ]
    }, {
        name: 'pencil',
        safe_duration: 20,
        path: [
            'res/audio/print/pencil/pencil01.ogg',
            'res/audio/print/pencil/pencil02.ogg',
            'res/audio/print/pencil/pencil03.ogg',
            'res/audio/print/pencil/pencil04.ogg',
            'res/audio/print/pencil/pencil05.ogg',
            'res/audio/print/pencil/pencil06.ogg',
            'res/audio/print/pencil/pencil07.ogg',
            'res/audio/print/pencil/pencil08.ogg',
            'res/audio/print/pencil/pencil09.ogg',
            'res/audio/print/pencil/pencil10.ogg',
            'res/audio/print/pencil/pencil11.ogg',
            'res/audio/print/pencil/pencil12.ogg'
        ]
    }, {
        name: 'enhancer',
        safe_duration: 20,
        pick_strategy: 'sequential_clamp',
        oscillator: {
            volume_multiplier: 0.6,
            rate_multiplier: 1
        },
        path: [
            'res/audio/print/enhancer/enhancer_01.ogg',
            'res/audio/print/enhancer/enhancer_02.ogg',
            'res/audio/print/enhancer/enhancer_03.ogg',
            'res/audio/print/enhancer/enhancer_04.ogg',
            'res/audio/print/enhancer/enhancer_05.ogg',
            'res/audio/print/enhancer/enhancer_06.ogg',
            'res/audio/print/enhancer/enhancer_07.ogg',
            'res/audio/print/enhancer/enhancer_08.ogg',
            'res/audio/print/enhancer/enhancer_09.ogg',
            'res/audio/print/enhancer/enhancer_10.ogg',
            'res/audio/print/enhancer/enhancer_11.ogg',
            'res/audio/print/enhancer/enhancer_12.ogg',
            'res/audio/print/enhancer/enhancer_13.ogg',
            'res/audio/print/enhancer/enhancer_14.ogg',
            'res/audio/print/enhancer/enhancer_15.ogg',
            'res/audio/print/enhancer/enhancer_16.ogg',
            'res/audio/print/enhancer/enhancer_17.ogg',
            'res/audio/print/enhancer/enhancer_18.ogg',
            'res/audio/print/enhancer/enhancer_19.ogg',
            'res/audio/print/enhancer/enhancer_20.ogg',
            'res/audio/print/enhancer/enhancer_21.ogg',
            'res/audio/print/enhancer/enhancer_22.ogg'
        ]
    }, {
        name: 'sys001',
        safe_duration: 20,
        path: 'res/audio/print/sys001.ogg'
    }, {
        name: 'sys002',
        safe_duration: 20,
        path: 'res/audio/print/sys002.ogg'
    }, {
        name: 'sys003',
        safe_duration: 20,
        path: 'res/audio/print/sys003.ogg'
    }, {
        name: 'enter',
        safe_duration: 250,
        type: 'next',
        path: 'res/audio/next/enter.ogg'
    }, {
        name: 'paper',
        safe_duration: 250,
        type: 'next',
        path: 'res/audio/next/paper.ogg'
    }
]);