const config = {
    "data_version": 3,
    "global": {
        "language": "zho-Hans",
        "theme": "vanilla",
        "theme_script_enable": false,
        "color_scheme": "auto"
    },
    "echo": {
        "print_speed": 30,
        "html_format_enable": true
    },
    "echolive": {
        "live_theme": "",
        "live_theme_script_enable": false,
        "broadcast_enable": true,
        "broadcast_channel": "sheep-realms:echolive",
        "websocket_enable": false,
        "websocket_url": "ws://127.0.0.1:3000",
        "websocket_reconnect_limit": 5,
        "experimental_api_enable": false,
        "messages_polling_enable": true,
        "messages_polling_tick": 250,
        "sleep_enable": true,
        "sleep_during_printing_stop_print": true,
        "print_audio_enable": false,
        "print_audio_name": "typewriter_loop",
        "print_audio_volume": 0.5,
        "print_audio_rate": 1,
        "next_audio_enable": false,
        "next_audio_name": "enter",
        "next_audio_volume": 0.5,
        "next_audio_rate": 1,
        "next_effect_name": "none",
        "next_effect_duration": 0,
        "print_effect_name": "none",
        "print_effect_duration": 0,
        "print_start_effect_name": "none",
        "print_start_effect_duration": 0,
        "print_end_effect_name": "none",
        "print_end_effect_duration": 0
    },
    "editor": {
        "tabpage_config_enable": true,
        "tabpage_output_enable": true,
        "client_state_panel_enable": false,
        "username_init": "",
        "output_before": "echolive.send(",
        "ontput_before_enable": 1,
        "output_after": ");",
        "ontput_after_enable": 1,
        "history_resend_bubble": false,
        "history_maximum": 128,
        "log_line_maximum": 512,
        "palette": "all",
        "palette_color_contrast_enable": false,
        "palette_color_contrast_background_color": "#ffffff",
        "palette_color_contrast_threshold": 3.8
    },
    "history": {
        "history_theme": "",
        "history_theme_script_enable": false,
        "message_list_reverse": false,
        "message_item_reverse": false,
        "display_username": true,
        "display_time": true,
        "remove_continuous_duplicate": true,
        "latest_message_hide": true
    },
    "accessible": {
        "high_contrast": false,
        "high_contrast_outline_color": "#00E9FF",
        "high_contrast_outline_size": "2px",
        "high_contrast_outline_style": "solid",
        "drotanopia_and_deuteranopia": false
    },
    "advanced": {
        "broadcast": {
            "allow_name_duplicate": false
        },
        "editor": {
            "history_minimum_breaker_threshold": 128
        }
    },
    "selector": {},
    "character": {}
}