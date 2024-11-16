const config = {
    "data_version": 11,
    "global": {
        "language": "zho-Hans",
        "theme": "vanilla",
        "theme_script_enable": false,
        "color_scheme": "auto",
        "touchscreen_layout": false,
        "controller_layout_reverse": false,
        "thin_scrollbar": false
    },
    "echo": {
        "print_speed": 30,
        "html_format_enable": true
    },
    "echolive": {
        "style": {
            "live_theme": "",
            "live_theme_script_enable": false
        },
        "layout": {
            "username_text_align_right": false,
            "diplay_controller": true
        },
        "broadcast": {
            "enable": true,
            "channel": "sheep-realms:echolive",
            "websocket_enable": false,
            "websocket_url": "ws://127.0.0.1:3000",
            "websocket_reconnect_limit": 5,
            "experimental_api_enable": false
        },
        "messages_polling": {
            "enable": true,
            "tick": 250
        },
        "sleep": {
            "enable": true,
            "during_printing_stop_print": true
        },
        "print_audio": {
            "enable": false,
            "name": "typewriter_loop",
            "volume": 0.5,
            "rate": 1
        },
        "next_audio": {
            "enable": false,
            "name": "enter",
            "volume": 0.5,
            "rate": 1
        },
        "print_effect": {
            "name": "none",
            "duration": 250,
            "scale": 1,
            "timing_function": "ease-out"
        },
        "display": {
            "auto": false,
            "hidden_wait_time": 20000,
            "long_text_compensation_rate": 0.15,
            "hidden_time": 1000,
            "show_time": 500
        },
        "speech_synthesis": {
            "enable": false,
            "voice": "",
            "pitch": 1,
            "rate": 1,
            "delay": 0,
            "speech_emoji": false,
            "ignored_characters": ""
        },
        "image": {
            "enable": true,
            "allow_data_url_and_relative_url": true,
            "default_max_size": 3
        },
        "next_effect_name": "none",
        "next_effect_duration": 0,
        "print_start_effect_name": "none",
        "print_start_effect_duration": 0,
        "print_end_effect_name": "none",
        "print_end_effect_duration": 0
    },
    "editor": {
        "function": {
            "tabpage_config_enable": true,
            "tabpage_output_enable": true,
            "client_state_panel_enable": false,
            "history_resend_bubble": false,
            "history_maximum": 128,
            "log_line_maximum": 512,
            "images_cache_maximum": 64
        },
        "form": {
            "username": "",
            "quote_before": "「",
            "quote_after": "」",
            "ontput_before_enable": 0,
            "output_before": "echolive.send(",
            "ontput_after_enable": 0,
            "output_after": ");"
        },
        "websocket": {
            "enable": false,
            "url": "ws://127.0.0.1:3000",
            "auto_url": true,
            "reconnect_limit": 5
        },
        "color_picker": {
            "palette": "all",
            "contrast_enable": false,
            "contrast_background_color": "#ffffff",
            "contrast_threshold": 3.8
        },
        "emoji_picker": {
            "emoji": "all"
        }
    },
    "history": {
        "style": {
            "history_theme": "",
            "history_theme_script_enable": false
        },
        "layout": {
            "message_list_reverse": false,
            "message_item_reverse": false,
            "display_username": true,
            "display_time": true
        },
        "message": {
            "remove_continuous_duplicate": true,
            "latest_message_hide": true,
            "live_display_hidden_latest_message_show": true
        }
    },
    "character": {
        "avatar": {
            "name": "echo_otone",
            "action": ""
        },
        "avatar_switch_effect": {
            "name": "none",
            "duration": 250,
            "scale": 1,
            "timing_function": "ease-out"
        }
    },
    "accessibility": {
        "font_size": 16,
        "unlock_page_width": false,
        "high_contrast": false,
        "high_contrast_outline_color": "#00E9FF",
        "high_contrast_outline_size": "2px",
        "high_contrast_outline_style": "solid",
        "protanopia_and_deuteranopia": false,
        "link_underline": false,
        "animation_disable": false,
        "power_saving_mode": false
    },
    "advanced": {
        "broadcast": {
            "allow_name_duplicate": false,
            "allow_send_duplicate_message": false
        },
        "editor": {
            "forced_display_split_message": false,
            "history_minimum_breaker_threshold": 128
        },
        "settings": {
            "display_config_key": false,
            "display_hidden_option": false,
            "speech_synthesis_voices_maximum": 64
        },
        "performance": {
            "foreach_text_style_by_message_data": false,
            "row_search_threshold": 1
        },
        "device": {
            "enable": true
        }
    },
    "selector": {}
}