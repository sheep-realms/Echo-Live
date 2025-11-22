const db_config_version = 14;

const db_config_define = [
    {
        name: 'global',
        type: 'object',
        created: 2
    }, {
        name: 'global.language',
        icon: 'material:translate',
        type: 'string',
        default: 'zho-Hans',
        created: 2,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.theme',
        icon: 'material:format-paint',
        type: 'string',
        default: 'vanilla',
        created: 3,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.theme_variant',
        icon: 'material:brush',
        type: 'string',
        default: '',
        created: 12,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.theme_script_enable',
        icon: 'material:script-text',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'global.color_scheme',
        icon: 'material:theme-light-dark',
        type: 'string',
        default: 'auto',
        created: 3,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.touchscreen_layout',
        icon: 'material:gesture-tap-button',
        type: 'boolean',
        default: false,
        created: 9
    }, {
        name: 'global.controller_layout_reverse',
        icon: 'material:swap-horizontal',
        type: 'boolean',
        default: false,
        created: 6
    }, {
        name: 'global.thin_scrollbar',
        icon: 'material:glass-stange',
        type: 'boolean',
        default: false,
        created: 9
    }, {
        name: 'global.live_font_weight',
        icon: 'material:format-bold',
        type: 'string',
        default: 'inherit',
        created: 11,
        attribute: {
            datalist: []
        }
    },
    


    {
        name: 'echo',
        type: 'object',
        created: 1
    }, {
        name: 'echo.print_speed',
        icon: 'material:play-speed',
        type: 'number',
        default: 30,
        created: 1,
        unit: 'ms',
        attribute: {
            min: 4
        }
    }, {
        name: 'echo.html_format_enable',
        icon: 'material:xml',
        type: 'boolean',
        default: true,
        created: 3
    },
    


    {
        name: 'echolive',
        type: 'object',
        created: 1
    }, {
        name: 'echolive.style',
        icon: 'material:format-paint',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.style.live_theme',
        icon: 'material:format-paint',
        type: 'string',
        default: '',
        from: 'echolive.live_theme',
        created: 4,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echolive.style.live_theme_variant',
        icon: 'material:brush',
        type: 'string',
        default: '',
        created: 12,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echolive.style.live_theme_script_enable',
        icon: 'material:script-text',
        type: 'boolean',
        default: false,
        from: 'echolive.live_theme_script_enable',
        created: 4,
        conditions: [
            {
                name: 'global.theme_script_enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.layout',
        icon: 'material:view-grid',
        type: 'object',
        created: 9
    }, {
        name: 'echolive.layout.username_text_align_right',
        type: 'boolean',
        default: false,
        created: 9
    }, {
        name: 'echolive.layout.diplay_controller',
        type: 'boolean',
        default: true,
        created: 9
    }, {
        name: 'echolive.layout.controller',
        type: 'string',
        default: 'neo_icon',
        created: 13,
        conditions: [
            {
                name: 'echolive.layout.diplay_controller',
                value: true
            }
        ],
        attribute: {
            datalist: []
        }
    }, {
        name: 'echolive.broadcast',
        icon: 'material:broadcast',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.broadcast.enable',
        type: 'boolean',
        default: true,
        from: 'echolive.broadcast_enable',
        created: 4
    }, {
        name: 'echolive.broadcast.channel',
        icon: 'material:broadcast',
        type: 'string',
        default: 'sheep-realms:echolive',
        from: 'echolive.broadcast_channel',
        created: 4,
        attribute: {
            datalist: [
                {
                    value: 'sheep-realms:echolive'
                }
            ]
        },
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.broadcast.websocket_enable',
        icon: 'material:connection',
        type: 'boolean',
        default: false,
        from: 'echolive.websocket_enable',
        created: 4,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.broadcast.websocket_url',
        icon: 'material:link-variant',
        type: 'string',
        default: 'ws://127.0.0.1:3000',
        from: 'echolive.websocket_url',
        created: 4,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'echolive.broadcast.websocket_enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.broadcast.websocket_reconnect_limit',
        icon: 'material:reload',
        type: 'number',
        default: 5,
        from: 'echolive.websocket_reconnect_limit',
        created: 4,
        attribute: {
            min: 0
        },
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'echolive.broadcast.websocket_enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.broadcast.experimental_api_enable',
        icon: 'material:test-tube',
        type: 'boolean',
        default: false,
        from: 'echolive.experimental_api_enable',
        created: 4,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.messages_polling',
        icon: 'material:reload',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.messages_polling.enable',
        type: 'boolean',
        default: true,
        from: 'echolive.messages_polling_enable',
        created: 4,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: false
            }
        ]
    }, {
        name: 'echolive.messages_polling.tick',
        type: 'number',
        default: 250,
        from: 'echolive.messages_polling_tick',
        created: 4,
        unit: 'ms',
        attribute: {
            min: 4
        },
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: false
            }, {
                name: 'echolive.messages_polling.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.sleep',
        icon: 'material:sleep',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.sleep.enable',
        type: 'boolean',
        default: true,
        from: 'echolive.sleep_enable',
        created: 4
    }, {
        name: 'echolive.sleep.during_printing_stop_print',
        type: 'boolean',
        default: true,
        from: 'echolive.sleep_during_printing_stop_print',
        created: 4,
        conditions: [
            {
                name: 'echolive.sleep.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.print_audio',
        icon: 'material:waveform',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.print_audio.enable',
        type: 'boolean',
        default: false,
        from: 'echolive.print_audio_enable',
        created: 4
    }, {
        name: 'echolive.print_audio.name',
        icon: 'material:waveform',
        type: 'string',
        default: 'typewriter_loop',
        from: 'echolive.print_audio_name',
        created: 4,
        attribute: {
            datalist: []
        },
        conditions: [
            {
                name: 'echolive.print_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.print_audio.volume',
        icon: 'material:volume-high',
        type: 'number',
        default: 0.5,
        from: 'echolive.print_audio_volume',
        created: 4,
        attribute: {
            max: 1,
            min: 0,
            step: 0.1
        },
        conditions: [
            {
                name: 'echolive.print_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.print_audio.rate',
        icon: 'material:play-speed',
        type: 'number',
        default: 1,
        from: 'echolive.print_audio_rate',
        created: 4,
        attribute: {
            min: 0,
            step: 0.25
        },
        conditions: [
            {
                name: 'echolive.print_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.next_audio',
        icon: 'material:waveform',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.next_audio.enable',
        type: 'boolean',
        default: false,
        from: 'echolive.next_audio_enable',
        created: 4
    }, {
        name: 'echolive.next_audio.name',
        icon: 'material:waveform',
        type: 'string',
        default: 'enter',
        from: 'echolive.next_audio_name',
        created: 4,
        attribute: {
            datalist: []
        },
        conditions: [
            {
                name: 'echolive.next_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.next_audio.volume',
        icon: 'material:volume-high',
        type: 'number',
        default: 0.5,
        from: 'echolive.next_audio_volume',
        created: 4,
        attribute: {
            max: 1,
            min: 0,
            step: 0.1
        },
        conditions: [
            {
                name: 'echolive.next_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.next_audio.rate',
        icon: 'material:play-speed',
        type: 'number',
        default: 1,
        from: 'echolive.next_audio_rate',
        created: 4,
        attribute: {
            min: 0,
            step: 0.25
        },
        conditions: [
            {
                name: 'echolive.next_audio.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.print_effect',
        icon: 'material:creation',
        type: 'object',
        created: 7
    }, {
        name: 'echolive.print_effect.name',
        type: 'string',
        default: 'none',
        created: 7,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echolive.print_effect.duration',
        icon: 'material:timer-outline',
        type: 'number',
        default: 250,
        created: 7,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 250
        }
    }, {
        name: 'echolive.print_effect.scale',
        icon: 'material:sine-wave',
        type: 'number',
        default: 1,
        created: 7,
        attribute: {
            min: 0,
            step: 0.25
        }
    }, {
        name: 'echolive.print_effect.timing_function',
        icon: 'material:chart-bell-curve-cumulative',
        type: 'string',
        default: 'ease-out',
        created: 7,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echolive.display',
        icon: 'material:creation',
        type: 'object',
        created: 5
    }, {
        name: 'echolive.display.auto',
        type: 'boolean',
        default: false,
        created: 5
    }, {
        name: 'echolive.display.hidden_wait_time',
        type: 'number',
        default: 20000,
        created: 5,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 1000
        },
        conditions: [
            {
                name: 'echolive.display.auto',
                value: true
            }
        ]
    }, {
        name: 'echolive.display.long_text_compensation_rate',
        type: 'number',
        default: 0.15,
        created: 5,
        attribute: {
            min: 0,
            step: 0.05
        },
        conditions: [
            {
                name: 'echolive.display.auto',
                value: true
            }
        ]
    }, {
        name: 'echolive.display.hidden_time',
        type: 'number',
        default: 1000,
        created: 5,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 100
        }
    }, {
        name: 'echolive.display.show_time',
        type: 'number',
        default: 500,
        created: 5,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 100
        }
    }, {
        name: 'echolive.speech_synthesis',
        icon: 'material:account-voice',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.speech_synthesis.enable',
        type: 'boolean',
        default: false,
        created: 4
    }, {
        name: 'echolive.speech_synthesis.voice',
        type: 'string',
        default: '',
        created: 4,
        attribute: {
            datalist: [],
            option_width: '450px'
        },
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.pitch',
        icon: 'material:piano',
        type: 'number',
        default: 1,
        created: 4,
        attribute: {
            min: 0,
            step: 0.25
        },
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.rate',
        icon: 'material:play-speed',
        type: 'number',
        default: 1,
        created: 4,
        attribute: {
            min: 0,
            step: 0.25
        },
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.delay',
        icon: 'material:timer-sand',
        type: 'number',
        default: 0,
        created: 4,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 100
        },
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.speech_emoji',
        type: 'boolean',
        default: false,
        created: 4,
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.ignored_characters',
        type: 'string.multiline',
        default: '',
        created: 4,
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.image',
        icon: 'material:image',
        type: 'object',
        created: 4
    }, {
        name: 'echolive.image.enable',
        type: 'boolean',
        default: true,
        created: 4
    }, {
        name: 'echolive.image.allow_data_url_and_relative_url',
        type: 'boolean',
        default: true,
        created: 4,
        conditions: [
            {
                name: 'echolive.image.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.image.default_max_size',
        type: 'number',
        default: 3,
        created: 4,
        attribute: {
            min: 0
        },
        conditions: [
            {
                name: 'echolive.image.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.filter',
        icon: 'material:filter',
        type: 'object',
        created: 14
    }, {
        name: 'echolive.filter.enable',
        type: 'boolean',
        default: true,
        created: 14
    }, {
        name: 'echolive.filter.duplicate_chinese_mood_symbol_slice_enable',
        type: 'boolean',
        default: true,
        created: 14
    }, {
        name: 'echolive.next_effect_name',
        type: 'string',
        default: 'none',
        created: -1
    }, {
        name: 'echolive.next_effect_duration',
        type: 'number',
        default: 0,
        created: -1
    }, {
        name: 'echolive.print_start_effect_name',
        type: 'string',
        default: 'none',
        created: -1
    }, {
        name: 'echolive.print_start_effect_duration',
        type: 'number',
        default: 0,
        created: -1
    }, {
        name: 'echolive.print_end_effect_name',
        type: 'string',
        default: 'none',
        created: -1
    }, {
        name: 'echolive.print_end_effect_duration',
        type: 'number',
        default: 0,
        created: -1
    },
    


    {
        name: 'editor',
        type: 'object',
        created: 1
    }, {
        name: 'editor.function',
        icon: 'material:cogs',
        type: 'object',
        created: 4
    }, {
        name: 'editor.function.tabpage_config_enable',
        type: 'boolean',
        default: true,
        from: 'editor.tabpage_config_enable',
        created: 4
    }, {
        name: 'editor.function.tabpage_output_enable',
        type: 'boolean',
        default: true,
        from: 'editor.tabpage_output_enable',
        created: 4
    }, {
        name: 'editor.function.client_state_panel_enable',
        type: 'boolean',
        default: false,
        from: 'editor.client_state_panel_enable',
        created: 4,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.function.history_resend_bubble',
        type: 'boolean',
        default: false,
        from: 'editor.history_resend_bubble',
        created: 4
    }, {
        name: 'editor.function.history_maximum',
        type: 'number',
        default: 128,
        from: 'editor.history_maximum',
        created: 4,
        attribute: {
            min: -1
        }
    }, {
        name: 'editor.function.log_line_maximum',
        type: 'number',
        default: 512,
        from: 'editor.log_line_maximum',
        created: 4,
        attribute: {
            min: -1
        }
    }, {
        name: 'editor.function.images_cache_maximum',
        type: 'number',
        default: 64,
        created: 4,
        attribute: {
            min: -1
        }
    }, {
        name: 'editor.form',
        icon: 'material:form-textbox',
        type: 'object',
        created: 4
    }, {
        name: 'editor.form.username',
        type: 'string',
        default: '',
        from: 'editor.username_init',
        created: 4
    }, {
        name: 'editor.form.quote_before',
        icon: 'material:format-quote-open',
        type: 'string',
        default: '「',
        created: 4
    }, {
        name: 'editor.form.quote_after',
        icon: 'material:format-quote-close',
        type: 'string',
        default: '」',
        created: 4
    }, {
        name: 'editor.form.ontput_before_enable',
        type: 'boolean.bit',
        default: 0,
        from: 'editor.ontput_before_enable',
        created: 4
    }, {
        name: 'editor.form.output_before',
        type: 'string',
        default: 'echolive.send(',
        from: 'editor.output_before',
        created: 4,
        conditions: [
            {
                name: 'editor.form.ontput_before_enable',
                value: 1
            }
        ]
    }, {
        name: 'editor.form.ontput_after_enable',
        type: 'boolean.bit',
        default: 0,
        from: 'editor.ontput_after_enable',
        created: 4
    }, {
        name: 'editor.form.output_after',
        type: 'string',
        default: ');',
        from: 'editor.output_after',
        created: 4,
        conditions: [
            {
                name: 'editor.form.ontput_after_enable',
                value: 1
            }
        ]
    }, {
        name: 'editor.websocket',
        icon: 'material:connection',
        type: 'object',
        created: 10
    }, {
        name: 'editor.websocket.enable',
        type: 'boolean',
        default: false,
        created: 10,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.websocket.url',
        icon: 'material:link-variant',
        type: 'string',
        default: 'ws://127.0.0.1:3000',
        created: 10,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'editor.websocket.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.websocket.auto_url',
        icon: 'material:transit-connection-variant',
        type: 'boolean',
        default: true,
        created: 10,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'editor.websocket.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.websocket.reconnect_limit',
        icon: 'material:reload',
        type: 'number',
        default: 5,
        created: 10,
        attribute: {
            min: 0
        },
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'editor.websocket.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.websocket.disable_broadcast',
        icon: 'material:broadcast-off',
        type: 'boolean',
        default: false,
        created: 11,
        conditions: [
            {
                name: 'echolive.broadcast.enable',
                value: true
            }, {
                name: 'editor.websocket.enable',
                value: true
            }
        ]
    }, {
        name: 'editor.color_picker',
        icon: 'material:palette',
        type: 'object',
        created: 4
    }, {
        name: 'editor.color_picker.palette',
        type: 'special.all_or_array_string',
        default: 'all',
        from: 'editor.palette',
        created: 4
    }, {
        name: 'editor.color_picker.contrast_enable',
        type: 'boolean',
        default: false,
        from: 'editor.palette_color_contrast_enable',
        created: 4
    }, {
        name: 'editor.color_picker.contrast_background_color',
        type: 'string',
        default: '#ffffff',
        from: 'editor.palette_color_contrast_background_color',
        created: 4,
        conditions: [
            {
                name: 'editor.color_picker.contrast_enable',
                value: true
            }
        ]
    }, {
        name: 'editor.color_picker.contrast_threshold',
        type: 'number',
        default: 3.8,
        from: 'editor.palette_color_contrast_threshold',
        created: 4,
        attribute: {
            max: 21,
            min: 0,
            step: 0.1
        },
        conditions: [
            {
                name: 'editor.color_picker.contrast_enable',
                value: true
            }
        ]
    }, {
        name: 'editor.emoji_picker',
        icon: 'material:emoticon-happy',
        type: 'object',
        created: 4
    }, {
        name: 'editor.emoji_picker.emoji',
        type: 'special.all_or_array_string',
        default: 'all',
        created: 4
    },



    {
        name: 'history',
        type: 'object',
        created: 2
    }, {
        name: 'history.style',
        icon: 'material:format-paint',
        type: 'object',
        created: 4
    }, {
        name: 'history.style.history_theme',
        icon: 'material:format-paint',
        type: 'string',
        default: '',
        from: 'history.history_theme',
        created: 4,
        attribute: {
            datalist: []
        }
    }, {
        name: 'history.style.history_theme_variant',
        icon: 'material:brush',
        type: 'string',
        default: '',
        created: 12,
        attribute: {
            datalist: []
        }
    }, {
        name: 'history.style.history_theme_script_enable',
        icon: 'material:script-text',
        type: 'boolean',
        default: false,
        from: 'history.history_theme_script_enable',
        created: 4,
        conditions: [
            {
                name: 'global.theme_script_enable',
                value: true
            }
        ]
    }, {
        name: 'history.layout',
        icon: 'material:view-grid',
        type: 'object',
        created: 4
    }, {
        name: 'history.layout.message_list_reverse',
        icon: 'material:sort-clock-descending-outline',
        type: 'boolean',
        default: false,
        from: 'history.message_list_reverse',
        created: 4
    }, {
        name: 'history.layout.message_item_reverse',
        icon: 'material:swap-horizontal',
        type: 'boolean',
        default: false,
        from: 'history.message_item_reverse',
        created: 4
    }, {
        name: 'history.layout.display_username',
        icon: 'material:tag-outline',
        type: 'boolean',
        default: true,
        from: 'history.display_username',
        created: 4
    }, {
        name: 'history.layout.display_time',
        icon: 'material:clock-outline',
        type: 'boolean',
        default: true,
        from: 'history.display_time',
        created: 4
    }, {
        name: 'history.message',
        icon: 'material:message-text',
        type: 'object',
        created: 4
    }, {
        name: 'history.message.remove_continuous_duplicate',
        type: 'boolean',
        default: true,
        from: 'history.remove_continuous_duplicate',
        created: 4
    }, {
        name: 'history.message.latest_message_hide',
        type: 'boolean',
        default: true,
        from: 'history.latest_message_hide',
        created: 4
    }, {
        name: 'history.message.live_display_hidden_latest_message_show',
        type: 'boolean',
        default: true,
        created: 7,
        conditions: [
            {
                name: 'history.message.latest_message_hide',
                value: true
            }
        ]
    },



    {
        name: 'character',
        type: 'object',
        created: 11
    }, {
        name: 'character.avatar',
        icon: 'material:human',
        type: 'object',
        created: 11
    }, {
        name: 'character.avatar.name',
        type: 'string',
        default: 'echo_otone',
        created: 11,
        attribute: {
            datalist: []
        }
    }, {
        name: 'character.avatar.action',
        type: 'string',
        default: '',
        created: 11,
        attribute: {
            datalist: []
        }
    }, {
        name: 'character.avatar.scene',
        type: 'string',
        default: '',
        created: 11,
        attribute: {
            datalist: []
        }
    }, {
        name: 'character.avatar_switch_effect',
        icon: 'material:creation',
        type: 'object',
        created: 11
    }, {
        name: 'character.avatar_switch_effect.name',
        type: 'string',
        default: 'fade-in',
        created: 11,
        attribute: {
            datalist: []
        }
    }, {
        name: 'character.avatar_switch_effect.duration',
        icon: 'material:timer-outline',
        type: 'number',
        default: 250,
        created: 11,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 250
        }
    }, {
        name: 'character.avatar_switch_effect.scale',
        icon: 'material:sine-wave',
        type: 'number',
        default: 1,
        created: 11,
        attribute: {
            min: 0,
            step: 0.25
        }
    }, {
        name: 'character.avatar_switch_effect.timing_function',
        icon: 'material:chart-bell-curve-cumulative',
        type: 'string',
        default: 'ease-out',
        created: 11,
        attribute: {
            datalist: []
        }
    },



    {
        name: 'accessibility',
        type: 'object',
        created: 10
    }, {
        name: 'accessibility.font_size',
        icon: 'material:format-size',
        type: 'special.fontsize',
        default: 16,
        from: 'accessible.font_size',
        created: 10
    }, {
        name: 'accessibility.use_short_language_iso_code',
        icon: 'material:translate',
        type: 'boolean',
        default: false,
        created: 14
    }, {
        name: 'accessibility.unlock_page_width',
        icon: 'material:arrow-horizontal-lock',
        type: 'boolean',
        default: false,
        from: 'accessible.unlock_page_width',
        created: 10
    }, {
        name: 'accessibility.high_contrast',
        icon: 'material:contrast-box',
        type: 'boolean',
        type: 'boolean',
        default: false,
        from: 'accessible.high_contrast',
        created: 10
    }, {
        name: 'accessibility.high_contrast_outline_color',
        icon: 'material:border-all-variant',
        type: 'string',
        default: '#00E9FF',
        from: 'accessible.high_contrast_outline_color',
        created: 10,
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.high_contrast_outline_size',
        icon: 'material:format-line-weight',
        type: 'string',
        default: '2px',
        from: 'accessible.high_contrast_outline_size',
        created: 10,
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.high_contrast_outline_style',
        icon: 'material:border-style',
        type: 'string',
        default: 'solid',
        from: 'accessible.high_contrast_outline_style',
        created: 10,
        attribute: {
            datalist: [
                {
                    value: 'solid'
                }, {
                    value: 'dotted'
                }, {
                    value: 'dashed'
                }, {
                    value: 'double'
                }
            ]
        },
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.protanopia_and_deuteranopia',
        icon: 'material:looks',
        type: 'boolean',
        default: false,
        from: 'accessible.drotanopia_and_deuteranopia',
        created: 10
    }, {
        name: 'accessibility.link_underline',
        icon: 'material:format-underline',
        type: 'boolean',
        default: false,
        from: 'accessible.link_underline',
        created: 10
    }, {
        name: 'accessibility.animation_disable',
        icon: 'material:animation-play',
        type: 'boolean',
        default: false,
        from: 'accessible.animation_disable',
        created: 10
    }, {
        name: 'accessibility.power_saving_mode',
        icon: 'material:memory',
        type: 'boolean',
        default: false,
        from: 'accessible.power_saving_mode',
        created: 10
    }, {
        name: 'accessibility.send_on_enter',
        icon: 'material:keyboard-return',
        type: 'boolean',
        default: false,
        created: 14
    },



    {
        name: 'advanced',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.broadcast',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.broadcast.allow_name_duplicate',
        type: 'boolean',
        default: false,
        created: 2
    }, {
        name: 'advanced.broadcast.allow_send_duplicate_message',
        type: 'boolean',
        default: false,
        created: 8
    }, {
        name: 'advanced.broadcast.websocket_heartbeat_backoff_scale',
        type: 'number',
        default: 1,
        created: 11,
        attribute: {
            min: 0
        }
    }, {
        name: 'advanced.broadcast.websocket_heartbeat_duration',
        type: 'number',
        default: 20000,
        created: 11,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 250
        }
    }, {
        name: 'advanced.editor',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.editor.forced_display_split_message',
        type: 'boolean',
        default: false,
        created: 4
    }, {
        name: 'advanced.editor.history_minimum_breaker_threshold',
        type: 'number',
        default: 128,
        created: 1,
        attribute: {
            min: -1
        }
    }, {
        name: 'advanced.settings',
        type: 'object',
        created: 6
    }, {
        name: 'advanced.settings.display_config_key',
        type: 'boolean',
        default: false,
        created: 6
    }, {
        name: 'advanced.settings.display_hidden_option',
        type: 'boolean',
        default: false,
        created: 8
    }, {
        name: 'advanced.settings.speech_synthesis_voices_maximum',
        type: 'number',
        default: 64,
        created: 6,
        attribute: {
            min: -1
        }
    }, {
        name: 'advanced.performance',
        type: 'object',
        created: 10
    }, {
        name: 'advanced.performance.foreach_text_style_by_message_data',
        type: 'boolean',
        default: false,
        created: 10
    }, {
        name: 'advanced.performance.row_search_threshold',
        type: 'number',
        default: 1,
        created: 10,
        attribute: {
            min: 0
        }
    }, {
        name: 'advanced.device',
        type: 'object',
        created: 10
    }, {
        name: 'advanced.device.enable',
        type: 'boolean',
        default: true,
        created: 10
    }, {
        name: 'advanced.obs_api',
        type: 'object',
        created: 12
    }, {
        name: 'advanced.obs_api.allow_scene_name_set_attribute',
        type: 'boolean',
        default: true,
        created: 12
    }, {
        name: 'advanced.obs_api.echolive_mini_size_coefficient',
        type: 'number',
        default: 0.5926,
        created: 12
    }, 



    {
        name: 'selector',
        type: 'object',
        created: -1
    },
    
    
    
    {
        name: 'echolive.print_effect_name',
        type: 'string',
        default: 'none',
        created: -1,
        deleted: 7
    }, {
        name: 'echolive.print_effect_duration',
        type: 'number',
        default: 0,
        created: -1,
        deleted: 7
    }, {
        name: 'accessible',
        type: 'object',
        default: 0,
        created: 1,
        deleted: 10
    }
];