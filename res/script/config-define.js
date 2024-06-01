const db_config_version = 5;

const db_config_define = [
    {
        name: 'global',
        type: 'object',
        created: 2
    }, {
        name: 'global.language',
        type: 'string',
        default: 'zho-Hans',
        created: 2,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.theme',
        type: 'string',
        default: 'vanilla',
        created: 3,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.theme_script_enable',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'global.color_scheme',
        type: 'string',
        default: 'auto',
        created: 3,
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
        type: 'number',
        default: 30,
        created: 1,
        attribute: {
            min: 4
        }
    }, {
        name: 'echo.html_format_enable',
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
        type: 'object',
        created: 4
    }, {
        name: 'echolive.style.live_theme',
        type: 'string',
        default: '',
        from: 'echolive.live_theme',
        created: 4
    }, {
        name: 'echolive.style.live_theme_script_enable',
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
        name: 'echolive.broadcast',
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
        name: 'echolive.display',
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
        attribute: {
            min: 0,
            step: 100
        }
    }, {
        name: 'echolive.display.show_time',
        type: 'number',
        default: 500,
        created: 5,
        attribute: {
            min: 0,
            step: 100
        }
    }, {
        name: 'echolive.speech_synthesis',
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
            datalist: []
        },
        conditions: [
            {
                name: 'echolive.speech_synthesis.enable',
                value: true
            }
        ]
    }, {
        name: 'echolive.speech_synthesis.pitch',
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
        type: 'number',
        default: 0,
        created: 4,
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
        name: 'echolive.print_effect_name',
        type: 'string',
        default: 'none',
        created: -1
    }, {
        name: 'echolive.print_effect_duration',
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
        type: 'string',
        default: '「',
        created: 4
    }, {
        name: 'editor.form.quote_after',
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
        name: 'editor.color_picker',
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
        type: 'object',
        created: 4
    }, {
        name: 'history.style.history_theme',
        type: 'string',
        default: '',
        from: 'history.history_theme',
        created: 4
    }, {
        name: 'history.style.history_theme_script_enable',
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
        type: 'object',
        created: 4
    }, {
        name: 'history.layout.message_list_reverse',
        type: 'boolean',
        default: false,
        from: 'history.message_list_reverse',
        created: 4
    }, {
        name: 'history.layout.message_item_reverse',
        type: 'boolean',
        default: false,
        from: 'history.message_item_reverse',
        created: 4
    }, {
        name: 'history.layout.display_username',
        type: 'boolean',
        default: true,
        from: 'history.display_username',
        created: 4
    }, {
        name: 'history.layout.display_time',
        type: 'boolean',
        default: true,
        from: 'history.display_time',
        created: 4
    }, {
        name: 'history.message',
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
    },



    {
        name: 'accessible',
        type: 'object',
        created: 1
    }, {
        name: 'accessible.high_contrast',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'accessible.high_contrast_outline_color',
        type: 'string',
        default: '#00E9FF',
        created: 2,
        conditions: [
            {
                name: 'accessible.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessible.high_contrast_outline_size',
        type: 'string',
        default: '2px',
        created: 2,
        conditions: [
            {
                name: 'accessible.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessible.high_contrast_outline_style',
        type: 'string',
        default: 'solid',
        created: 2,
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
                name: 'accessible.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessible.drotanopia_and_deuteranopia',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'accessible.link_underline',
        type: 'boolean',
        default: false,
        created: 4
    }, {
        name: 'accessible.animation_disable',
        type: 'boolean',
        default: false,
        created: 4
    }, {
        name: 'accessible.power_saving_mode',
        type: 'boolean',
        default: false,
        created: 4
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
    },



    {
        name: 'selector',
        type: 'object',
        created: -1
    }, {
        name: 'character',
        type: 'object',
        created: -1
    }
];