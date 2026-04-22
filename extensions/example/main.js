extensionManager.load({
    meta: {
        title: 'example',
        name: 'example'
    },
    register_hook: {
        loaded: [
            {
                registry: 'echolive:sound',
                value: {
                    'example:sonar': {
                        title: {
                            text: '声纳',
                            translate: 'example_sonar'
                        },
                        name: 'example:sonar',
                        safe_duration: 250,
                        type: 'next',
                        path: 'audio/sonar.ogg'
                    }
                }
            }
        ]
    }
});