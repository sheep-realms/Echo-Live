const lang_zho_Hant_HK = {
    lang: {
        code_iso_639_3: "zho-Hant-HK",
        code_ietf: "zh-Hans-HK",
        title: "繁體中文（香港特別行政區）"
    },
    ui: {
        confirm: "確認",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "保存",
        save_as: "另存為",
        staging: "暫存",
        close: "關閉",
        off: "關閉",
        on: "開啟",
        disable: "禁用",
        enable: "啟用",
        enable_all: "全部啟用",
        edit: "編輯",
        send: "發送",
        reset: "重置",
        clear: "清空",
        delete: "刪除",
        undo: "撤銷",
        input: "輸入",
        output: "輸出",
        import: "導入",
        export: "導出",
        re_export: "重新導出",
        more_info: "了解詳情",
        add: "添加",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移",
        audition: "試聽",
        missingno: {
            no_author: "未署名",
            no_name: "未命名"
        }
    },
    broadcast: {
        client: {
            type: {
                client: "未知客戶端",
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
                unknow: "未知終端"
            }
        }
    },
    command: {
        common: {
            fail: {
                exceed_maximum_value: "邏輯錯誤：'{n}' 太大了，最大只能為 {max}",
                exceed_minimum_value: "邏輯錯誤：'{n}' 太小了，最小只能為 {min}",
                invalid_json: "語法錯誤：無效的 JSON",
                invalid_key_name: "語法錯誤：'{name}' 不是一個有效的鍵名",
                invalid_number: "語法錯誤：無效的數字",
                missing_parameter: "語法錯誤：缺少必要參數",
                unknow_option: "語法錯誤：不存在名為 '{name}' 的選項",
                not_broadcast: "運行失敗：廣播未啟動"
            },
            success: {
                broadcast_everyone: "已廣播 {action} 消息",
                broadcast_target: "已發送 {action} 消息至 {name}"
            }
        },
        var: {
            success: {
                del: "已刪除 {stack} 堆中變量 {name}",
                get: "{stack} 堆中變量 {name} 的值為 {value}",
                set: "已設置 {stack} 堆中變量 {name} 的值為 {value}"
            },
            fail: {
                var_undefined: "{stack} 堆中變量 {name} 未定義"
            }
        }
    },
    config: {
        data_version: {
            _title: "數據版本",
            _description: "配置文件的數據版本。"
        },
        global: {
            _title: "全局",
            _description: "一些影響全局的設置",
            language: {
                _title: "顯示語言",
                _description: "後台頁面的顯示語言。"
            },
            theme: {
                _title: "全局主題",
                _description: "控制對話框、歷史記錄等面向觀眾展示的界面主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>幫助文檔</a>。"
            },
            theme_script_enable: {
                _title: "啟用全局主題腳本",
                _description: "一些高級效果可能需要啟用主題腳本才能正常使用。目前所有預製主題均不包含腳本。<br>腳本中可以執行任意代碼，請謹慎安裝需要您啟用腳本的第三方主題。"
            },
            color_scheme: {
                _title: "後台配色方案",
                _description: "控制後台界面的配色。可用的方案有 auto（跟隨系統）、light（淺色）和 dark（深色）。",
                _value: {
                    auto: "跟隨系統",
                    dark: "深色",
                    light: "淺色"
                }
            }
        },
        echo: {
            _title: "Echo",
            _description: "Echo 相關配置",
            print_speed: {
                _title: "打印速度",
                _description: "每個字符打印循環的延遲時間（毫秒），最小值為 4。"
            },
            html_format_enable: {
                _title: "啟用 HTML 過濾器",
                _description: "啟用此過濾器後，HTML 語義元素會被轉義，可以顯示多個連續空格。關閉此過濾器有腳本注入風險。"
            }
        },
        echolive: {
            _title: "Echo-Live",
            _description: "Echo-Live 相關配置",
            style: {
                _title: "主題樣式",
                _description: "設置對話框的樣式",
                live_theme: {
                    _title: "對話框主題",
                    _description: "留空則使用全局主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>幫助文檔</a>。"
                },
                live_theme_script_enable: {
                    _title: "啟用對話框主題腳本",
                    _description: "此配置項需要啟用全局主題腳本才能生效。"
                },
            },
            broadcast: {
                _title: "廣播",
                _description: "Echo-Live 的基本工作模式",
                enable: {
                    _title: "啟用廣播",
                    _description: "可通過編輯器直接發送消息，啟用此項將禁用消息輪詢。"
                },
                channel: {
                    _title: "廣播頻道",
                    _description: "如果您不知道這是甚麼請不要動它。"
                },
                websocket_enable: {
                    _title: "啟用 WebSocket",
                    _description: "如果沒人要求您這麼做，請不要動它。<br>廣播模式下啟用 WebSocket 可連接至伺服器以從第三方軟件獲取消息。<br>可從伺服器接收的消息和廣播消息一致，發送的消息須使用類似於 JSON.stringify 的方法序列化。<br>詳見<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>幫助文檔</a>。"
                },
                websocket_url: {
                    _title: "WebSocket 連接地址",
                    _description: "提供 WebSocket 連接的伺服器地址，使用 ws:// 協議頭。"
                },
                websocket_reconnect_limit: {
                    _title: "WebSocket 最大重連嘗試次數",
                    _description: "連接關閉和連接失敗將會嘗試重連，一旦超過重連嘗試次數限制將不再嘗試重連。"
                },
                experimental_api_enable: {
                    _title: "啟用實驗性 API",
                    _description: "實驗性 API 包含了一些危險操作，實現一些特殊功能可能是必要的，但如果使用不當可能會造成嚴重後果。<br>請開發者注意，如果您提供的產品需要啟用此實驗性 API，請務必說明您不得不這麼做的原因。<br>請用戶注意，如果您使用的第三方軟件要求您啟用實驗性 API 而未說明理由，非常不推薦您照做。"
                }
            },
            messages_polling: {
                _title: "消息輪詢",
                _description: "早期版本中廣播系統的替代",
                enable: {
                    _title: "啟用消息輪詢",
                    _description: "定時監聽 start.js 的內容更改而無需手動刷新，關閉則使用舊版手動操作。<br>啟用廣播將禁用此功能。"
                },
                tick: {
                    _title: "消息輪詢間隔",
                    _description: "單位：毫秒。值越小響應越快，性能消耗越高。"
                },
            },
            sleep: {
                _title: "休眠機制",
                _description: "頁面不可見時使對話框休眠",
                enable: {
                    _title: "啟用休眠機制",
                    _description: "當頁面不可見時休眠以防止計時器失效所引發的災難性演出。<br>特別強調：如果您不了解這是甚麼，請不要關閉它。<br>- 如果您只是想方便在瀏覽器中預覽而臨時關閉它，請一定不要忘記打開。"
                },
                during_printing_stop_print: {
                    _title: "在打印期間休眠立即停止打印",
                    _description: "防止計時器失效導致打印過程阻塞。"
                },
            },
            print_audio: {
                _title: "打字音效",
                _description: "在每次輸出字符時播放音效",
                enable: {
                    _title: "啟用打字音效",
                    _description: ""
                },
                name: {
                    _title: "音效名稱",
                    _description: "可用的音效名稱請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>幫助文檔</a>。"
                },
                volume: {
                    _title: "音效音量",
                    _description: "1 為最大。"
                },
                rate: {
                    _title: "音效播放速度",
                    _description: "1 為原速。"
                }
            },
            next_audio: {
                _title: "新對話入場音效",
                _description: "在每條消息開始打印時播放音效",
                enable: {
                    _title: "啟用新對話入場音效",
                    _description: ""
                },
                name: {
                    _title: "音效名稱",
                    _description: "可用的音效名稱請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>幫助文檔</a>。"
                },
                volume: {
                    _title: "音效音量",
                    _description: "1 為最大。"
                },
                rate: {
                    _title: "音效播放速度",
                    _description: "1 為原速。"
                }
            },
            display: {
                _title: "隱去與顯現動畫",
                _description: "調整對話框的隱去與顯現動畫的參數",
                auto: {
                    _title: "閒置時自動隱去",
                    _description: "啟用後，對話框會在保持沒有任何動作一段時間後自動隱去。"
                },
                hidden_wait_time: {
                    _title: "閒置等候時間",
                    _description: "進入閒置狀態的最小等候時間，單位毫秒（1 秒 = 1000 毫秒）。"
                },
                long_text_compensation_rate: {
                    _title: "長文本等候時間補償率",
                    _description: "當消息文本過長時會額外補償一些等候時間，設為 0 則禁用。"
                },
                hidden_time: {
                    _title: "隱去動畫用時",
                    _description: "對話框隱去所需時間，單位毫秒。"
                },
                show_time: {
                    _title: "顯現動畫用時",
                    _description: "對話框顯現所需時間，單位毫秒。"
                }
            },
            speech_synthesis: {
                _title: "講述人",
                _description: "使用系統語音合成接口讀出消息內容",
                enable: {
                    _title: "啟用講述人",
                    _description: ""
                },
                voice: {
                    _title: "語音資源",
                    _description: "在這裏選擇可用的語音資源，留空則使用系統默認值。<br>在內容為空的情況下，點擊文本框即可列出所有可用的值。部分瀏覽器可能需要多點一次。<br>請注意：不同的瀏覽器會出現不同的值，一些瀏覽器會提供獨有的語音資源，例如 Chrome 的 Google 合成語音，這些語音資源不能在 OBS 中使用。語音資源能否正確使用最終取決於前台頁面所在的瀏覽器環境。<br>當所選擇的值不可用時，將使用系統默認值。"
                },
                pitch: {
                    _title: "音高",
                    _description: "1 為基準音高。"
                },
                rate: {
                    _title: "語速",
                    _description: "1 為基準速度。"
                },
                delay: {
                    _title: "延遲",
                    _description: "在消息發出後延遲讀出，單位為毫秒，1000 毫秒為 1 秒。"
                },
                speech_emoji: {
                    _title: "讀出表情符號",
                    _description: "啟用後講述人將會讀出消息中的 emoji 符號和表情圖片的描述。<br>其他特殊符號不受影響。"
                },
                ignored_characters: {
                    _title: "忽略的字符",
                    _description: "指定一些字符不會被講述人讀出。"
                }
            },
            image: {
                _title: "圖片",
                _description: "對話框消息中顯示的圖片",
                enable: {
                    _title: "啟用圖片",
                    _description: "啟用後可以在消息中插入圖片。"
                },
                allow_data_url_and_relative_url: {
                    _title: "允許 Data URL 和相對地址",
                    _description: "允許使用 Data URL 格式傳輸圖片和使用相對地址。<br>禁用將無法在編輯器中通過導入文件設定圖片，且只能使用 http(s):// 和 file:/// 協議頭的地址。<br>特別提醒：不要導入大得離譜的圖片！"
                },
                default_max_size: {
                    _title: "默認最大圖片尺寸",
                    _description: "控制圖片在對話框中的默認最大尺寸。單位：em（相對於字符尺寸的長度單位）。"
                }
            }
        },
        editor: {
            _title: "編輯器",
            _description: "編輯器相關配置",
            function: {
                _title: "功能",
                _description: "編輯器中的功能",
                tabpage_config_enable: {
                    _title: "顯示配置標籤頁",
                    _description: "編輯器中的配置標籤頁用於控制輸出內容格式，僅編寫代碼時有用。"
                },
                tabpage_output_enable: {
                    _title: "顯示輸出標籤頁",
                    _description: "編輯器生成的代碼會在此標籤頁導出。輸出標籤頁在廣播模式下還可以發送自定義消息。"
                },
                client_state_panel_enable: {
                    _title: "顯示對話框狀態儀錶板",
                    _description: "儀錶板可以顯示所有對話框的狀態，綠色為啟動，紅色為休眠，灰色則表示沒有對話框加入頻道。<br>如果您添加了多個對話框，建議您啟用此項。<br>如果您是紅綠色盲，請在無障礙設置中啟用紅綠色盲。<br>- 啟用後，藍色填充為啟動，藍色邊框為休眠。"
                },
                history_resend_bubble: {
                    _title: "歷史消息再發送時上浮",
                    _description: "歷史消息再次發送時使歷史記錄回到頂部"
                },
                history_maximum: {
                    _title: "歷史消息數量上限",
                    _description: "設為 -1 則不設上限。"
                },
                log_line_maximum: {
                    _title: "日誌行數上限",
                    _description: "設為 -1 則不設上限。"
                },
                images_cache_maximum: {
                    _title: "自定義消息圖片緩存數上限",
                    _description: "設為 -1 則不設上限。"
                }
            },
            form: {
                _title: "表單預填充",
                _description: "編輯器初始化時表單的默認填充內容",
                username: {
                    _title: "初始說話人",
                    _description: "編輯器啟動後在說話人輸入框中默認填充的內容。"
                },
                quote_before: {
                    _title: "引用符號（開頭）",
                    _description: ""
                },
                quote_after: {
                    _title: "引用符號（結尾）",
                    _description: ""
                },
                ontput_before_enable: {
                    _title: "啟用在輸出內容前插入內容",
                    _description: ""
                },
                output_before: {
                    _title: "在輸出內容前插入的內容",
                    _description: "用於生成可執行的消息發送命令。"
                },
                ontput_after_enable: {
                    _title: "啟用在輸出內容後插入內容",
                    _description: ""
                },
                output_after: {
                    _title: "在輸出內容後插入的內容",
                    _description: "用於生成可執行的消息發送命令。"
                }
            },
            color_picker: {
                _title: "拾色器",
                _description: "拾色器相關配置",
                palette: {
                    _title: "啟用的色板",
                    _description: "拾色器中有多種色板可供挑選。<br>預製的色板有 material、tailwindcss、ant_design 和 minecraft。<br>若要挑選啟用的色板或調整排序，請反選 “全部啟用”，並在下方文本框中輸入色板名稱，一&#65279;行一&#65279;個。",
                    all_selected: "全部啟用"
                },
                contrast_enable: {
                    _title: "啟用 WCAG 顏色對比度測試",
                    _description: "在拾色器中顯示顏色對比面板和 WCAG 顏色對比度測試結果。"
                },
                contrast_background_color: {
                    _title: "WCAG 顏色對比度測試面板參考背景色",
                    _description: "僅支持十六進制顏色碼。<br>請注意：背景色的 Alpha 通道會被忽略。<br>- 如果您的對話框背景顏色是半透明或全透明將無法正確計算對比度，請您自行採集混合後的背景顏色。"
                },
                contrast_threshold: {
                    _title: "WCAG 顏色對比度測試面板對比度參考閾值",
                    _description: "對比度低於此值視為測試失敗。"
                }
            },
            emoji_picker: {
                _title: "表情選擇器",
                _description: "表情選擇器相關配置",
                emoji: {
                    _title: "啟用的表情包",
                    _description: "表情選擇器中預製了一些表情包。<br>預製的表情包有 emoji、sheep-realms:pixel-head 和 sheep-realms:other。<br>若要挑選啟用的表情包或調整排序，請反選 “全部啟用”，並在下方文本框中輸入表情包名稱，一&#65279;行一&#65279;個。",
                    all_selected: "全部啟用"
                }
            }
        },
        history: {
            _title: "歷史記錄",
            _description: "面向觀眾展示的歷史記錄",
            style: {
                _title: "主題樣式",
                _description: "設置歷史記錄的樣式",
                history_theme: {
                    _title: "歷史記錄主題",
                    _description: "留空則使用全局主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>幫助文檔</a>。"
                },
                history_theme_script_enable: {
                    _title: "啟用歷史記錄主題腳本",
                    _description: "此配置項需要啟用全局主題腳本才能生效。"
                }
            },
            layout: {
                _title: "佈局",
                _description: "歷史記錄的內容佈局",
                message_list_reverse: {
                    _title: "歷史記錄倒序排列",
                    _description: "歷史記錄按照發送時間由新到舊排列。"
                },
                message_item_reverse: {
                    _title: "歷史記錄佈局左右翻轉",
                    _description: "翻轉後的排列從左到右依次是：發送時間、消息內容、說話人。"
                },
                display_username: {
                    _title: "顯示說話人",
                    _description: "在歷史記錄中顯示說話人。"
                },
                display_time: {
                    _title: "顯示發送時間",
                    _description: "在歷史記錄中顯示發送時間。"
                }
            },
            message: {
                _title: "消息",
                _description: "歷史記錄的消息處理邏輯",
                remove_continuous_duplicate: {
                    _title: "去除連續的重複消息",
                    _description: "如果場景中有多個對話框同時接收消息，啟用此項可避免重複記錄歷史消息。"
                },
                latest_message_hide: {
                    _title: "隱藏最新的歷史記錄",
                    _description: "對話框在開始打印消息時會立即發送消息到歷史記錄中，啟用此項可避免最新消息立即顯示在歷史記錄中。"
                }
            }
        },
        accessible: {
            _title: "無障礙",
            _description: "無障礙相關配置",
            high_contrast: {
                _title: "啟用高對比度",
                _description: "提高後台頁面的對比度，並對焦點元素顯示高亮邊框。"
            },
            high_contrast_outline_color: {
                _title: "焦點高亮邊框顏色",
                _description: "焦點元素將會顯示一個醒目邊框。此配置可更改其顏色。"
            },
            high_contrast_outline_size: {
                _title: "焦點高亮邊框尺寸",
                _description: "焦點元素邊框的寬度。"
            },
            high_contrast_outline_style: {
                _title: "焦點高亮邊框樣式",
                _description: "焦點元素邊框的樣式，可以是 solid、dotted、dashed 或 double。"
            },
            drotanopia_and_deuteranopia: {
                _title: "紅綠色盲",
                _description: "綠色（安全）功能色會以藍色（通用）代替，以便和功能差異較大的黃色（警告）和紅色（危險）作出區分。"
            },
            link_underline: {
                _title: "總是顯示鏈接下劃線",
                _description: "為鏈接添加下劃線使其更醒目。"
            },
            animation_disable: {
                _title: "禁用動畫",
                _description: "禁用所有動畫和過渡效果。"
            },
            power_saving_mode: {
                _title: "禁用高開銷效果",
                _description: "禁用後台頁面所有高性能消耗的畫面效果。"
            }
        },
        advanced: {
            _title: "高級設定",
            _description: "一些複雜的設置",
            _warn: "警告：除非您知道您在幹甚麼，否則請不要動這裏的設置。",
            broadcast: {
                _title: "廣播",
                _description: "廣播的高級設定",
                allow_name_duplicate: {
                    _title: "允許識別名重複",
                    _description: "允許終端識別名出現重複，這可能會引發意料之外的情況。"
                }
            },
            editor: {
                _title: "編輯器",
                _description: "編輯器的高級設定",
                forced_display_split_message: {
                    _title: "強制顯示“{ @editor.form.label.split_message }”選項",
                    _description: "即使沒有開啟對話框狀態儀錶板也顯示此選項。"
                },
                history_minimum_breaker_threshold: {
                    _title: "歷史記錄底部游標熔斷閾值",
                    _description: "設為 -1 可禁用此機制。"
                }
            }
        },
        about: {
            _title: "關於",
            _description: "軟件資訊",
            about_echolive: "關於 Echo-Live",
            accessibility: "無障礙使用指南",
            bug_tracker: "漏洞追蹤",
            community: "社區服務",
            copyright: "授權協議與聲明",
            document: "幫助文檔",
            feedback: "建議反饋",
            github: "GitHub 項目倉庫",
            license: "開源許可證",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "報告安全漏洞",
            social_media: "社交媒體",
            user_guide: "用戶指南"
        }
    },
    echolive: {
        system_message: "系統消息",
        shutdown: "Echo-Live 因收到 shutdown 命令已停止運行，需要重新啟動請刷新此頁面。",
        shutdown_reason: "Echo-Live 因收到 shutdown 命令已停止運行，原因為“{reason}”，需要重新啟動請刷新此頁面。"
    },
    editor: {
        client_state: {
            active: "啟動",
            none: "未加入",
            sleep: "休眠"
        },
        client_state_panel: {
            tip: "客戶端狀態：{client}，Echo 狀態：{echo}。",
            tip_more_messages: "客戶端狀態：{client}，Echo 狀態：{echo}。點擊此處可打印下一條消息。"
        },
        echo_state: {
            play: "打印中",
            ready: "就緒",
            stop: "停止"
        },
        form: {
            text_length: "{n} 字符",
            aria_label: {
                commander: "控制台",
                content_plain_text: "純文本內容編輯框",
                log_box: "這裏是日誌列表，如果您聽到了這句話，請注意，這裏的閱讀體驗可能會很差。",
                output_content: "輸出內容編輯框"
            },
            description: {
                formatting_code_example_1: "@b - 粗體，@i - 斜體，@u - 下劃線，@s - 刪除線，@r - 清除格式",
                formatting_code_example_2: "示例：這裏沒有格式。@b這裏有粗體。@i這裏有粗體和斜體。@r這裏沒有格式。@[#66ccff]這是藍色。",
                formatting_code_example_3: "點此閱讀關於快速格式化代碼的指南",
                output_after: "在輸出內容之後插入尾部內容",
                output_before: "在輸出內容之前插入頭部內容",
                print_speed: "每個打印循環的延遲時間（毫秒），默認為 30。數字越大，耗時越長。中日韓字符延遲 × 2。",
                print_speed_custom: "每個打印循環的延遲時間（毫秒），默認為 30，您的默認配置為 {value}。數字越大，耗時越長。中日韓字符延遲 × 2。",
                quote: "自動在每一句話開頭和結尾添加引用符號，Echo Live 會為一些引用符號自動縮進。",
                split_message_example_1: "每一行視為一條消息，組成消息隊列，可以依次打印。",
                split_message_example_2: "當開啟對話框狀態儀錶板時，可以點擊對應的對話框按鈕打印下一條消息。",
                open_settings: "打開配置文件編輯器"
            },
            label: {
                character: "說話人",
                content: "內容",
                live_client_state: "對話框狀態",
                output_after: "尾部內容",
                output_before: "頭部內容",
                output_content: "輸出內容",
                print_speed: "打印速度",
                quote: "引用符號",
                quote_after: "結尾",
                quote_before: "開頭",
                split_message: "多行文本分割為消息隊列",
                startup_parameter: "啟動參數",
                use_formatting_code: "使用快速格式化代碼"
            }
        },
        format: {
            bold: "粗體",
            clear: "清除格式",
            color: "文本顏色",
            emoji: "表情",
            font_size_decrease: "減小字號",
            font_size_increase: "增大字號",
            image: "插入圖片",
            italic: "斜體",
            underline: "下劃線",
            strikethrough: "刪除線"
        },
        history: {
            clear: "清空歷史記錄",
            clear_confirm: "確認清空",
            messages_more: "... 等 {n} 條消息",
            resent_at: "（於 {time} 再次發送）"
        },
        image_popups: {
            button: {
                delete_all_images: "删除所有图片"
            },
            label: {
                image_margin: "外邊距",
                image_rendering: "重採樣",
                image_size_max: "最大圖片尺寸",
                image_size_min: "最小圖片尺寸",
                set_image_parameter: "設置圖片屬性"
            },
            option: {
                image_rendering: {
                    auto: "自動",
                    pixelated: "最鄰近"
                }
            },
            tabpage: {
                file: {
                    title: "導入文件",
                    description: "直接導入圖片文件"
                },
                url: {
                    title: "導入地址",
                    description: "導入 URL 地址"
                },
                images: {
                    title: "圖庫",
                    description: "已緩存的圖片"
                }
            }
        },
        log: {
            index: "日誌",
            welcome: "歡迎使用 Echo-Live！如需查閱幫助文檔，請見：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessible: {
                type: {
                    dbug: "調試：",
                    done: "完成：",
                    erro: "錯誤：",
                    info: "資訊：",
                    tips: "提示：",
                    warn: "警告："
                }
            },
            broadcast: {
                close: "{client} 離開廣播頻道，識別名：{name}",
                echo_next: "收到來自其他服務端的命令：打印下一條消息。",
                echo_next_from_self_to_target: "已命令 {name} 打印下一條消息。",
                hello: "{client} 進入廣播頻道，識別名：{name}",
                hello_hidden: "{client} 進入廣播頻道，已休眠，識別名：{name}",
                hello_reply: "{client} 響應了廣播，識別名：{name}",
                hello_reply_hidden: "{client} 響應了廣播，已休眠，識別名：{name}",
                hello_to_server: "{client} 已向 Websocket 伺服器發送 HELLO 消息，識別名：{name}",
                message_data_third: "收到來自其他服務端的消息數據。",
                page_hidden: "{client} 因不可見已休眠，識別名：{name}",
                page_visible: "{client} 已喚醒，識別名：{name}",
                ping_server: "有其他服務端加入頻道，識別名：{name}",
                set_theme_style_url: "收到來自其他服務端的命令：設置主題樣式文件 URL 為 {url}",
                set_theme: "收到來自其他服務端的命令：設置主題為 {name}",
                shutdown: "收到來自其他服務端的命令：立即停止。",
                shutdown_reason: "收到來自其他服務端的命令：立即停止。原因為：${reason}",
                websocket_close: "收到來自其他服務端的命令：關閉 Websocket 連接。此命令將阻止 {client} 嘗試重連。"
            },
            broadcast_launch: {
                disable: "未開啟廣播模式，無日誌顯示。",
                done: "廣播模式已開啟：{channel}",
                user_agent_check: "編輯器已正確安裝在 OBS 中！",
                user_agent_error: "您似乎並未正確在 OBS 中安裝此編輯器，詳見：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/",
            },
            error: {
                name_duplicate: "識別名 {name} 發生衝突，{uuid} 已被踢出廣播頻道。如果您有使用重複識別名的需要，請將配置項 advanced.broadcast.allow_name_duplicate 設為 true。",
                websocket_error: "{client} Websocket 連接 {url} 出錯，進行第 {n} 次重連，識別名：{name}",
                websocket_error_retry_failed: "{client} Websocket 連接 {url} 出錯，重連次數超出限制，識別名：{name}",
                websocket_message_error: "{client} Websocket 接收到的消息解析出錯，識別名：{name}",
                unknown_error_in_client: "{client} 發生未捕獲的錯誤：<br>{msg}<br>來源：{source}<br>行列：{line}:{col}<br>識別名：{name}",
                unknown_error_in_editor: "編輯器發生未捕獲的錯誤：{msg}<br>來源：{source}<br>行列：{line}:{col}"
            },
            message: {
                empty: "未輸入內容，未發送任何消息。",
                empty_data: "消息內容無有效數據，未發送任何消息。",
                empty_messages: "發送的消息中沒有消息隊列，這是一個錯誤的消息格式。雖然這麼操作似乎不會引發嚴重問題，但不建議這麼操作。",
                illegal: "發送的消息格式存在錯誤。詳見幫助文檔：https://sheep-realms.github.io/Echo-Live-Doc/message/",
                resent: "已再次發送歷史消息。",
                sent: "已發送純文本消息：{msg}",
                sent_custom: "已發送自定義消息：{msg}",
                sent_custom_multi: "已發送 {n} 條自定義消息，首條消息為：{msg}"
            },
            tip: {
                unknown_error: "看來您可能遇到了一些問題。如果您確實覺得有甚麼不對路，請複製此日誌內容反饋給開發者，並詳細描述復現過程。"
            },
            warn: {
                no_client: "沒有客戶端響應，請檢查您是否正確打開或安裝了 Echo-Live。如果您的操作正確，則可能是因為 OBS 中所有源均處於不可見狀態。"
            }
        },
        palette: {
            index: "拾色器",
            empty: "我操？！你在幹甚麼？我放在這裏那麼大一個調色板呢？還好我技高一籌給你兜住了！",
            select: "色板庫",
            accessible: {
                tip: "需要無障礙使用幫助嗎？"
            },
            diff_dashboard: {
                index: "對比度測試面板",
                background_color: "背景色",
                foreground_color: "前景色",
                result: {
                    contrast: "對比度參考閾值",
                    wcag_aa: "WCAG AA",
                    wcag_aaa: "WCAG AAA"
                },
                state: {
                    ok: "{name} 測試通過",
                    fail: "{name} 測試失敗"
                }
            },
            label: {
                title_after: "{title} - {after}",
                common: {
                    after: {
                        deep: "深色",
                        default: "默認",
                        light: "淺色",
                        lighter: "更淺",
                        lightest: "最淺",
                        middle: "適中"
                    },
                    color: {
                        amber: "琥珀色 | 琥珀色 {value}",
                        aqua: "水藍色 | 水藍色 {value}",
                        cyan: "青色 | 青色 {value}",
                        black: "黑色 | 黑色 {value}",
                        blue: "藍色 | 藍色 {value}",
                        blue_gray: "藍灰色 | 藍灰色 {value}",
                        brown: "棕色 | 棕色 {value}",
                        deep_aqua: "暗水藍色 | 暗水藍色 {value}",
                        deep_blue: "深藍色 | 深藍色 {value}",
                        deep_gray: "深灰色 | 深灰色 {value}",
                        deep_green: "深綠色 | 深綠色 {value}",
                        deep_orange: "暗橙色 | 暗橙色 {value}",
                        deep_purple: "深紫色 | 深紫色 {value}",
                        deep_red: "深紅色 | 深紅色 {value}",
                        deep_yellow: "深黃色 | 深黃色 {value}",
                        gold: "金色 | 金色 {value}",
                        gray: "灰色 | 灰色 {value}",
                        green: "綠色 | 綠色 {value}",
                        light_aqua: "亮水藍色 | 亮水藍色 {value}",
                        light_blue: "淡藍色 | 淡藍色 {value}",
                        light_gray: "淡灰色 | 淡灰色 {value}",
                        light_green: "淡綠色 | 淡綠色 {value}",
                        light_purple: "淡紫色 | 淡紫色 {value}",
                        light_orange: "亮橙色 | 亮橙色 {value}",
                        light_red: "淡紅色 | 淡紅色 {value}",
                        light_yellow: "淡黃色 | 淡黃色 {value}",
                        lime: "黃綠色 | 黃綠色 {value}",
                        indigo: "靛藍色 | 靛藍色 {value}",
                        magenta: "紫紅色 | 紫紅色 {value}",
                        orange: "橙色 | 橙色 {value}",
                        pink: "粉紅色 | 粉紅色 {value}",
                        purple: "紫色 | 紫色 {value}",
                        red: "紅色 | 紅色 {value}",
                        silver: "銀色 | 銀色 {value}",
                        sky: "天藍色 | 天藍色 {value}",
                        teal: "藍綠色 | 藍綠色 {value}",
                        white: "白色 | 白色 {value}",
                        violet: "藍紫色 | 藍紫色 {value}",
                        yellow: "黃色 | 黃色 {value}"
                    },
                    functional_color: {
                        danger: "危險 | 危險 {value}",
                        error: "錯誤 | 錯誤 {value}",
                        general: "通用 | 通用 {value}",
                        link: "鏈接 | 鏈接 {value}",
                        safe: "安全 | 安全 {value}",
                        success: "成功 | 成功 {value}",
                        warning: "警告 | 警告 {value}",
                    },
                    group: {
                        functional_color: "功能色",
                        neutral_color: "中性色"
                    }
                },
                ant_design: {
                    title: "Ant Design",
                    color: {
                        blue: "拂曉藍 {value}",
                        cyan: "明青 {value}",
                        geek_blue: "極客藍 {value}",
                        gold: "金盞花 {value}",
                        green: "極光綠 {value}",
                        lime: "青檸 {value}",
                        magenta: "洋紅 {value}",
                        orange: "日暮 {value}",
                        purple: "醬紫 {value}",
                        red: "薄暮 {value}",
                        volcano: "火山 {value}",
                        yellow: "日出 {value}"
                    },
                    group: {
                        blue: "Daybreak Blue / 拂曉藍",
                        cyan: "Cyan / 明青",
                        geek_blue: "Geek Blue / 極客藍",
                        gold: "Calendula Gold / 金盞花",
                        green: "Polar Green / 極光綠",
                        lime: "Lime / 青檸",
                        magenta: "Magenta / 法式洋紅",
                        orange: "Sunset Orange / 日暮",
                        purple: "Golden Purple / 醬紫",
                        red: "Dust Red / 薄暮",
                        volcano: "Volcano / 火山",
                        yellow: "Sunrise Yellow / 日出"
                    }
                },
                material: {
                    title: "Material Design"
                },
                minecraft: {
                    title: "Minecraft"
                },
                tailwindcss: {
                    title: "Tailwind CSS",
                    color: {
                        emerald: "綠寶石色 {value}",
                        neutral: "中性色",
                        rose: "玫瑰色 {value}",
                        slate: "暗藍灰色",
                        stone: "石頭",
                        zinc: "金屬"
                    },
                    group: {
                        weight: "深度 {value}"
                    }
                }
            }
        },
        tabpage: {
            broadcast: {
                title: "廣播",
                description: "廣播控制 [alt+6]"
            },
            config: {
                title: "配置",
                description: "編輯配置 [alt+2]"
            },
            editor: {
                title: "編輯器",
                description: "文本編輯器 [alt+1]"
            },
            history: {
                title: "歷史記錄",
                description: "已發送消息的列表"
            },
            log: {
                title: "日誌",
                description: "運行日誌 [alt+4]"
            },
            output: {
                title: "輸出",
                description: "輸出代碼 [alt+3]"
            },
            output_content: {
                title: "輸出內容",
                description: "編輯導出代碼和發送消息"
            }
        },
        tip: {
            hot_key_textarea_quick_send: "當焦點在此文本框中時，可以按下 Ctrl + Enter 快速發送"
        }
    },
    emoji: {
        emoji: {
            title: 'Emoji',
            group: {
                animal: "動物",
                emotion: "情感",
                food: "食物",
                gesture: "手勢",
                nature: "森羅萬象"
            }
        },
        sheep_realms: {
            other: {
                title: "綿羊的大表情",
                emoji: {
                    ahwu: "啊嗚",
                    dame: "禁止",
                    danger: "危",
                    eating_potato_chips: "吃薯片",
                    nani: "問號",
                    orz: "累趴",
                    sofa: "大佬躺姿",
                    ze: "不爽"
                }
            },
            pixel_head: {
                title: "綿羊的像素頭像",
                emoji: {
                    angry: "生氣",
                    bathe: "洗澡",
                    black_stripe: "不願透露姓名的綿羊女士",
                    box_gear: "盒精裝備",
                    chaos: "混亂",
                    ciallo: "Ciallo~",
                    click: "戳一下",
                    close_eyes: "閉眼",
                    cry: "哭了",
                    default: "注視",
                    doubt: "疑問",
                    elec: "觸電",
                    elec2: "發電",
                    exciting: "興奮",
                    fear: "害怕",
                    glowing_glasses: "眼鏡發光",
                    hammer: "錘一下",
                    happy: "開心",
                    heart: "愛心",
                    hehe: "流汗",
                    loading: "加載",
                    magnifier: "放大鏡",
                    missingno: "查無此羊",
                    no: "不行",
                    pants: "藍白胖次",
                    phone: "打電話",
                    pot_me: "鐵鍋燉自己",
                    respirator: "口罩",
                    sex: "發情",
                    shock: "警覺",
                    shy: "害羞",
                    sleep: "睡覺",
                    stone: "石化",
                    sunglasses: "墨鏡",
                    unwelcome: "頭套",
                    vomit: "嘔吐",
                    wall: "偷看",
                    water: "澆水",
                    waterfall: "瀑布",
                    waterfall_end: "接水",
                    waterfall_start: "口若懸河",
                    watermelon: "吃瓜",
                    yes: "可以"
                }
            }
        }
    },
    file: {
        name: "文件名",
        last_modified_date: "最後修改時間",
        size: "文件大小",
        checker: {
            default_file_loaded: "默認路徑中的配置文件已載入",
            empry: "未載入文件",
            state: {
                error: "錯誤",
                exception: "異常",
                future: "新版",
                loaded: "已載入",
                update: "舊版"
            }
        },
        droper: {
            title: "文件選擇器",
            drop_file_cancel: "不放算了，哼！",
            drop_file_cancel_many: "一位用戶反覆拖拽文件，這是他的程序發生的變化",
            drop_file_long_time: "你怎麼還不放手？",
            drop_file_now: "鬆開鼠標拖放文件",
            please_click: "點擊此處選擇文件",
            please_drop_file: "在這裏拖放文件或點擊此處選擇文件",
            please_drop_file_keyboard: "當焦點在此處時，您也可以按下 Enter 或空格鍵選擇文件",
            dialog: {
                many_file: {
                    title: "太多了",
                    description: "處理不了那麼多文件，請一個一個來。"
                },
                selected: {
                    title: "已選擇文件",
                    description: "文件名：{name}",
                    import_image: "插入圖片"
                },
                type_error: {
                    title: "文件類型錯誤",
                    description: "這似乎並不是我們想要的文件。"
                },
                use_chrome: {
                    title: "建議您使用最新版 Chrome 瀏覽器",
                    description: "此頁面使用了一些最新技術，您的瀏覽器可能無法支持部分功能。<br>當然您也可以試試 Edge 瀏覽器。",
                    goto: "獲取 Chrome"
                }
            }
        },
        picker: {
            config: "配置文件",
            image: "圖片"
        }
    },
    message_preview: {
        empty_message: "[空消息]",
        empty_username: "[未指定說話人]",
        undefined_message: "[未定義消息]"
    },
    page_title: {
        editor: "Echo Live 編輯器",
        history: "Echo Live 歷史記錄",
        live: "Echo Live",
        settings: "Echo Live 配置文件編輯器"
    },
    settings: {
        unknow_config_type: "暫不支持修改此配置",
        config_input: {
            config_from_future: {
                title: "配置文件來自未來版本",
                description: "此配置文件來自於未來的 Echo-Live，您也許有哪裏搞錯了。<br>繼續加載可能會產生意料之外的問題。",
                load: "繼續加載"
            },
            json_parse_fail: {
                title: "無法安全讀取配置文件",
                description: "這可能是因為配置文件為早期版本，或是配置文件內容損壞。<br>如果您確定配置文件沒有問題，並且沒有被植入惡意代碼的可能，可以嘗試 “不安全讀取”。",
                unsafe_load: "不安全讀取"
            },
            in_obs: {
                title: "不要在 OBS 中打開此頁面",
                description: "這會產生一些意料之外的問題，並且您完全沒有必要將這個頁面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "處理不了那麼多文件，請一個一個來。"
            },
            no_json: {
                title: "找不到配置數據",
                description: "無法在此文件中找到配置數據。"
            },
            type_error: {
                title: "文件類型錯誤",
                description: "這似乎並不是配置文件。"
            },
            unsafe_load_fail: {
                title: "無法讀取配置文件",
                description: "看來您的配置文件確實有問題，請檢查您的配置文件。"
            },
            update_config: {
                title: "配置文件需要更新",
                description: "此配置文件來自於舊版的 Echo-Live，需要更新才能使用。",
                update: "更新"
            },
            update_config_from_unknow_version: {
                title: "未知的配置文件版本",
                description: "此配置文件沒有版本號，可能來自於 1.2.7 之前的版本。<br>您可以強制升級此配置文件，但並不能保證其正常運作，不建議您繼續使用此配置文件。",
                update: "強制更新"
            }
        },
        functional_color: {
            danger: "危險",
            general: "通用",
            safe: "安全",
            special: "特殊",
            warn: "警告"
        },
        label: {
            accessibility_color_card: "參考色卡",
            config_changed: "配置已更改",
            config_output: "導出配置內容"
        },
        msgbox: {
            accessibility: "Echo-Live 所有後台頁面均支持鍵盤訪問。<br>更多有關無障礙使用的幫助請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>幫助文檔</a>。",
            advanced_settings: "不要隨意更改這裏的配置，除非您知道您在做甚麼。",
            echo: {
                title: "關於 Echo",
                description: "Echo 是 Echo-Live 的內核，提供了文本滾動輸出功能。<br>它是一個工具庫，任何人都可以使用 Echo 創建自己的文本展示項目。<br>如果您有興趣了解 Echo，請見其 <a href='https://github.com/sheep-realms/Echo' target='_blank'>GitHub 倉庫</a>。"
            }
        },
        tabpage: {
            edit: {
                title: "編輯",
                description: "編輯配置文件 [alt+2]"
            },
            export: {
                title: "導出",
                description: "導出配置文件 [alt+3]"
            },
            import: {
                title: "導入",
                description: "導入配置文件 [alt+1]"
            }
        }
    }
};