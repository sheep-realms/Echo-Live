echoLiveSystem.registry.loadRegistry('editor_controller', 'name', [
    {
        name: 'bold',
        title: { translate: 'bold' },
        icon: 'material:format-bold',
        shortcut: {
            keys: 'KeyB',
            description: 'Ctrl+B'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@b'
            }
        }
    }, {
        name: 'italic',
        title: { translate: 'italic' },
        icon: 'material:format-italic',
        shortcut: {
            keys: 'KeyI',
            description: 'Ctrl+I'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@i'
            }
        }
    }, {
        name: 'underline',
        title: { translate: 'underline' },
        icon: 'material:format-underline',
        shortcut: {
            keys: 'KeyU',
            description: 'Ctrl+U'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@u'
            }
        }
    }, {
        name: 'strikethrough',
        title: { translate: 'strikethrough' },
        icon: 'material:format-strikethrough-variant',
        shortcut: {
            keys: 'KeyD',
            description: 'Ctrl+D'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@s'
            }
        }
    }, {
        name: 'color',
        title: { translate: 'color' },
        icon: 'material:palette',
        shortcut: {
            keys: 'Shift+KeyC',
            description: 'Ctrl+Shift+C'
        },
        action: {
            type: 'show_popups',
            value: {
                id: 'popups-palette',
                focus: '#popups-palette-select'
            }
        }
    }, {
        name: 'emoji',
        title: { translate: 'emoji' },
        icon: 'material:emoticon-happy',
        shortcut: {
            keys: 'KeyE',
            description: 'Ctrl+E'
        },
        action: {
            type: 'show_popups',
            value: {
                id: 'popups-emoji',
                focus: '#popups-emoji-select'
            }
        }
    }, {
        name: 'image',
        title: { translate: 'image' },
        icon: 'material:image',
        shortcut: {
            keys: 'Shift+KeyI',
            description: 'Ctrl+Shift+I'
        },
        action: {
            type: 'show_popups',
            value: {
                id: 'popups-image',
                focus: '#popups-image-nav .tabpage-nav-item[aria-selected="true"]'
            }
        }
    }, {
        name: 'font_size_increase',
        title: { translate: 'font_size_increase' },
        icon: 'material:format-font-size-increase',
        shortcut: {
            keys: 'ArrowUp',
            description: 'Ctrl+↑'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@+',
                forceRepeatBefore: true
            }
        }
    }, {
        name: 'font_size_decrease',
        title: { translate: 'font_size_decrease' },
        icon: 'material:format-font-size-decrease',
        shortcut: {
            keys: 'ArrowDown',
            description: 'Ctrl+↓'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@-',
                forceRepeatBefore: true
            }
        }
    }, {
        name: 'clear',
        title: { translate: 'clear' },
        icon: 'material:format-clear',
        shortcut: {
            keys: 'Shift+Space',
            description: 'Ctrl+Shift+Space'
        },
        action: {
            type: 'insert_text_at_cursor',
            value: {
                before: '@r',
                after: '',
                firstClear: true,
                selectedTextFilter: 'echolive:format_clear_text_filter'
            }
        }
    }, {
        name: 'disabled_save',
        type: 'hidden',
        shortcut: {
            keys: 'KeyS'
        },
        action: {
            type: 'none'
        }
    }
]);