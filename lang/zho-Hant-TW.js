const lang_zho_Hant_TW = {
    lang: {
        code_iso_639_3: "zho-Hant-TW",
        code_ietf: "zh-Hant-TW",
        title: "繁體中文（臺灣地區）"
    },
    localization: {
        bracket: "（{text}）",
        comma: "，",
        date_common: "{y}-{MM}-{dd}",
        date_time_common: "{y}-{MM}-{dd} {hh}:{mm}:{ss}",
        date: "{y} 年 {M} 月 {d} 日",
        date_pad_zero: "{y} 年 {MM} 月 {dd} 日",
        date_time: "{y} 年 {M} 月 {d} 日 {h}:{mm}:{ss}",
        date_time_pad_zero: "{y} 年 {MM} 月 {dd} 日 {hh}:{mm}:{ss}",
        time_common: "{hh}:{mm}:{ss}",
    },
    ui: {
        confirm: "確定",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "儲存",
        save_as: "另存新檔",
        staging: "暫存",
        close: "關閉",
        off: "關閉",
        on: "開啟",
        disable: "停用",
        enable: "啟用",
        enable_all: "全部啟用",
        edit: "編輯",
        send: "傳送",
        reset: "重置",
        clear: "清空",
        delete: "刪除",
        undo: "撤銷",
        input: "輸入",
        output: "輸出",
        import: "匯入",
        export: "匯出",
        re_export: "重新匯出",
        more_info: "瞭解詳情",
        add: "新增",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移",
        audition: "試聽",
        download: "下載",
        search: "搜尋",
        empty: "（空）",
        default: "預設",
        missingno: {
            no_author: "未署名",
            no_name: "未命名"
        }
    },
    unit: {
        char: "字",
        count: "次",
        day: "天",
        long_sec: "{m} 分鐘 {s} 秒 | {h} 小時 {m} 分鐘 {s} 秒 | {d} 天 {h} 小時 {m} 分鐘 {s} 秒",
        ms: "毫秒",
        rate: "%",
        sec: "秒"
    },
    avatar: {
        common: {
            action: {
                angry: "憤怒",
                awkward: "尷尬",
                cry: "哭",
                doubt: "疑惑",
                laugh: "笑",
                idle: "閒置",
                missingno: "動作丟失",
                panic: "驚恐",
                screaming: "大叫",
                shaded: "黑臉",
                shy: "害羞",
                smile: "微笑"
            },
            scene: {
                bust: "半身",
                face: "頭像",
                face_cu: "臉部特寫",
                full: "全身",
                heel: "足上",
                knee: "膝上",
                long: "遠景"
            }
        },
        echo_otone: {
            name: "Echo 追音",
            description: "Echo 追音（<span lang='ja'>エコー追音</span>）是一位活潑可愛的少女，樂於傾聽各種聲音，解讀各種文字，幫助人們建立溝通的橋樑，並以自己喜歡的方式傳播自己的所見所聞。",
            license: "Echo-Live 虛擬形象 “Echo 追音” 授權協議"
        }
    },
    border_style: {
        none: "無",
        solid: "實線",
        dashed: "虛線",
        dotted: "點線",
        double: "雙實線",
        groove: "凹槽",
        ridge: "凸脊",
        inset: "嵌入",
        outset: "突出"
    },
    broadcast: {
        client: {
            type: {
                character: "Echo Live Character",
                client: "未知客戶端",
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
                unknown: "未知終端"
            }
        }
    },
    character: {
        avatar_switch_effect: {
            none: "無",
            fade_in: "淡入"
        }
    },
    command: {
        common: {
            fail: {
                exceed_maximum_value: "邏輯錯誤：'{n}' 太大了，最大隻能為 {max}",
                exceed_minimum_value: "邏輯錯誤：'{n}' 太小了，最小隻能為 {min}",
                invalid_json: "語法錯誤：無效的 JSON",
                invalid_key_name: "語法錯誤：'{name}' 不是一個有效的鍵名",
                invalid_number: "語法錯誤：無效的數字",
                missing_parameter: "語法錯誤：缺少必要引數",
                unknown_option: "語法錯誤：不存在名為 '{name}' 的選項",
                not_broadcast: "執行失敗：廣播未啟動"
            },
            label: {
                function_mode: "函式模式"
            },
            success: {
                broadcast_everyone: "已廣播 {action} 訊息",
                broadcast_target: "已傳送 {action} 訊息至 {name}",
                function: "已執行函式中的 {n} 條命令",
                function_fail_item: "- 第 {line} 行：{reason}",
                function_has_fail: "已執行函式中的 {n} 條命令，失敗 {fail} 條，失敗原因為："
            }
        },
        clearlocalstorage: {
            success: "請在彈出對話方塊中確認清除本地儲存資料"
        },
        getlang: {
            success: {
                code: "當前語言的 ISO 639-3 代碼為：{ @lang.code_iso_639_3 }",
                ietf: "當前語言的 IETF 代碼為：{ @lang.code_ietf }",
                name: "當前語言的名稱為：{ @lang.title }"
            }
        },
        var: {
            success: {
                del: "已刪除 {stack} 堆中變數 {name}",
                get: "{stack} 堆中變數 {name} 的值為 {value}",
                set: "已設定 {stack} 堆中變數 {name} 的值為 {value}"
            },
            fail: {
                var_undefined: "{stack} 堆中變數 {name} 未定義"
            }
        }
    },
    config: {
        data_version: {
            _title: "資料版本",
            _description: "配置檔案的資料版本。"
        },
        search: {
            _title: "搜尋",
            _description: "搜尋所有配置項",
            label: {
                search: "搜尋配置項"
            },
            aria_label: {
                result: "搜尋結果{index}：{title}",
                result_has_group: "搜尋結果{index}：{group}，{title}"
            }
        },
        global: {
            _title: "全域",
            _description: "一些影響全域的設定",
            language: {
                _title: "介面語言",
                _description: "後臺頁面的介面語言。"
            },
            theme: {
                _title: "全域主題",
                _description: "控制對話方塊、歷史記錄等面向觀眾展示的介面主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。<br>為了主題樣式的表現正常，請在 OBS 選中對話方塊（包括歷史記錄在內的其他前臺頁面），右鍵，在彈出選單中找到 “混合方式”，選擇 “關閉 sRGB”。"
            },
            theme_variant: {
                _title: "全域主題變體",
                _description: "一些主題具有多種樣式變體，如更換配色方案、調整不透明度等。留空則使用預設樣式。<br>您還可以使用場景屬性實現在不同的場景中使用不同的樣式，詳見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/#scene-attribute' target='_blank'>說明文件</a>。"
            },
            theme_script_enable: {
                _title: "啟用全域主題指令碼",
                _description: "一些高階效果可能需要啟用主題指令碼才能正常使用。目前所有預製主題均不包含指令碼。<br>指令碼中可以執行任意程式，請謹慎安裝需要您啟用指令碼的第三方主題。"
            },
            color_scheme: {
                _title: "後臺配色方案",
                _description: "控制後臺介面的配色。",
                _value: {
                    auto: "跟隨系統",
                    dark: "深色",
                    light: "淺色"
                }
            },
            touchscreen_layout: {
                _title: "啟用觸屏佈局",
                _description: "使用更大尺寸的佈局以方便觸屏操作。"
            },
            controller_layout_reverse: {
                _title: "反轉控制器按鈕佈局",
                _description: "根據閱讀方向將重要按鈕放置於最先被閱讀的位置。"
            },
            thin_scrollbar: {
                _title: "啟用細捲軸",
                _description: "使用較細的捲軸替換預設捲軸。"
            },
            live_font_weight: {
                _title: "前臺預設字重",
                _description: "前臺頁面的預設字重，可被主題的樣式設定或訊息格式覆蓋。"
            }
        },
        echo: {
            _title: "Echo",
            _description: "Echo 相關配置",
            print_speed: {
                _title: "列印速度",
                _description: "每個字元列印迴圈的延遲時間（毫秒），最小值為 4。"
            },
            html_format_enable: {
                _title: "啟用 HTML 過濾器",
                _description: "啟用此過濾器後，HTML 語義元素會被轉義，可以顯示多個連續空格。關閉此過濾器有指令碼注入風險。"
            }
        },
        echolive: {
            _title: "Echo-Live",
            _description: "Echo-Live 相關配置",
            style: {
                _title: "主題樣式",
                _description: "設定對話方塊的樣式",
                live_theme: {
                    _title: "對話方塊主題",
                    _description: "留空則使用全域主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。"
                },
                live_theme_variant: {
                    _title: "對話方塊主題變體",
                    _description: "留空則使用全域主題變體。"
                },
                live_theme_script_enable: {
                    _title: "啟用對話方塊主題指令碼",
                    _description: "此配置項需要啟用全域主題指令碼才能生效。"
                }
            },
            layout: {
                _title: "佈局",
                _description: "對話方塊的內容佈局",
                username_text_align_right: {
                    _title: "說話人靠右對齊",
                    _description: "將說話人一欄靠向對話方塊右側。"
                },
                diplay_controller: {
                    _title: "顯示控制欄",
                    _description: "顯示對話方塊底部的 “SAVE”、“LOAD” 等模擬按鈕。"
                },
                controller: {
                    _title: "控制欄內容",
                    _description: "控制欄中的模擬按鈕，可以由文字和圖示組成。"
                }
            },
            broadcast: {
                _title: "廣播",
                _description: "Echo-Live 的基本工作模式",
                enable: {
                    _title: "啟用廣播",
                    _description: "可透過編輯器直接傳送訊息，啟用此項將停用訊息輪詢。"
                },
                channel: {
                    _title: "廣播頻道",
                    _description: "如果您不知道這是什麼請不要動它。"
                },
                websocket_enable: {
                    _title: "啟用 WebSocket",
                    _description: "如果沒人要求您這麼做，請不要動它。<br>廣播模式下啟用 WebSocket 可連線至伺服器以從第三方軟體獲取訊息。<br>可從伺服器接收的訊息和廣播訊息一致，傳送的訊息須使用類似於 JSON.stringify 的方法序列化。<br>詳見<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>說明文件</a>。"
                },
                websocket_url: {
                    _title: "WebSocket 連線地址",
                    _description: "提供 WebSocket 連線的伺服器地址，使用 ws:// 或 wss:// 協議頭。"
                },
                websocket_reconnect_limit: {
                    _title: "WebSocket 最大重連嘗試次數",
                    _description: "連線關閉和連線失敗將會嘗試重連，一旦超過重連嘗試次數限制將不再嘗試重連。"
                },
                experimental_api_enable: {
                    _title: "啟用實驗性 API",
                    _description: "實驗性 API 包含了一些危險操作，實現一些特殊功能可能是必要的，但如果使用不當可能會造成嚴重後果。<br>請開發者注意，如果您提供的產品需要啟用此實驗性 API，請務必說明您不得不這麼做的原因。<br>請使用者注意，如果您使用的第三方軟體要求您啟用實驗性 API 而未說明理由，非常不推薦您照做。"
                }
            },
            messages_polling: {
                _title: "訊息輪詢",
                _description: "早期版本中廣播系統的替代",
                enable: {
                    _title: "啟用訊息輪詢",
                    _description: "定時監聽 start.js 的內容更改而無需手動重新整理，關閉則使用舊版手動操作。<br>啟用廣播將停用此功能。"
                },
                tick: {
                    _title: "訊息輪詢間隔",
                    _description: "值越小響應越快，效能消耗越高。"
                },
            },
            sleep: {
                _title: "休眠機制",
                _description: "頁面不可見時使對話方塊休眠",
                enable: {
                    _title: "啟用休眠機制",
                    _description: "當頁面不可見時休眠以防止計時器失效所引發的災難性演出。<br>特別強調：如果您不瞭解這是什麼，請不要關閉它。<br>- 如果您只是想方便在瀏覽器中預覽而臨時關閉它，請一定不要忘記開啟。"
                },
                during_printing_stop_print: {
                    _title: "在列印期間休眠立即停止列印",
                    _description: "防止計時器失效導致列印過程阻塞。"
                },
            },
            print_audio: {
                _title: "列印音效",
                _description: "在每次輸出字元時播放音效",
                enable: {
                    _title: "啟用列印音效",
                    _description: ""
                },
                name: {
                    _title: "列印音效",
                    _description: "選擇您喜歡的列印音效。"
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
                _description: "在每條訊息開始列印時播放音效",
                enable: {
                    _title: "啟用新對話入場音效",
                    _description: ""
                },
                name: {
                    _title: "入場音效",
                    _description: "選擇您喜歡的入場音效。"
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
            print_effect: {
                _title: "字元列印動效",
                _description: "列印每個字元時所使用的動畫效果",
                name: {
                    _title: "動效名稱",
                    _description: "選擇您喜歡的打印動效。<br>請注意：訊息格式中的一些高階動效可能會覆蓋字元列印動效。如果您需要使用這些高階動效，建議您關閉字元列印動效。"
                },
                duration: {
                    _title: "動效用時",
                    _description: "播放動畫所需時間。"
                },
                scale: {
                    _title: "動效規模乘數",
                    _description: "動畫的運動幅度乘數。"
                },
                timing_function: {
                    _title: "動效時間曲線",
                    _description: "動畫在不同時間段的運動速度。"
                }
            },
            display: {
                _title: "隱去與顯現動畫",
                _description: "調整對話方塊的隱去與顯現動畫的引數",
                auto: {
                    _title: "閒置時自動隱去",
                    _description: "啟用後，對話方塊會在保持沒有任何動作一段時間後自動隱去。"
                },
                hidden_wait_time: {
                    _title: "閒置等候時間",
                    _description: "進入閒置狀態的最小等候時間。"
                },
                long_text_compensation_rate: {
                    _title: "長文字等候時間補償率",
                    _description: "當訊息文字過長時會額外補償一些等候時間，設為 0 則停用。"
                },
                hidden_time: {
                    _title: "隱去動畫用時",
                    _description: "對話方塊隱去所需時間。"
                },
                show_time: {
                    _title: "顯現動畫用時",
                    _description: "對話方塊顯現所需時間。"
                }
            },
            speech_synthesis: {
                _title: "講述人",
                _description: "使用系統語音合成介面讀出訊息內容",
                enable: {
                    _title: "啟用講述人",
                    _description: ""
                },
                voice: {
                    _title: "語音資源",
                    _description: "在這裡選擇可用的語音資源，留空則使用系統預設值。<br>如果沒有下拉選單，則說明沒有本地語音資源可用。<br>當所選擇的值不可用時，將使用系統預設值。"
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
                    _description: "在訊息發出後延遲讀出。"
                },
                speech_emoji: {
                    _title: "讀出表情符號",
                    _description: "啟用後講述人將會讀出訊息中的 emoji 符號和表情圖片的描述。<br>其它特殊符號不受影響。"
                },
                ignored_characters: {
                    _title: "忽略的字元",
                    _description: "指定一些字元不會被講述人讀出。"
                }
            },
            image: {
                _title: "圖片",
                _description: "對話方塊訊息中顯示的圖片",
                enable: {
                    _title: "啟用圖片",
                    _description: "啟用後可以在訊息中插入圖片。"
                },
                allow_data_url_and_relative_url: {
                    _title: "允許 Data URL 和相對地址",
                    _description: "允許使用 Data URL 格式傳輸圖片和使用相對地址。<br>停用將無法在編輯器中透過匯入檔案設定圖片，且只能使用 http(s):// 和 file:/// 協議頭的地址。<br>特別提醒：不要匯入大得離譜的圖片！"
                },
                default_max_size: {
                    _title: "預設最大圖片尺寸",
                    _description: "控制圖片在對話方塊中的預設最大尺寸。單位：em（相對於字元尺寸的長度單位）。"
                }
            },
            filter: {
                _title: "過濾器",
                _description: "控制訊息過濾器的狀態",
                enable: {
                    _title: "啟用過濾器",
                    _description: "啟用後，Echo-Live 會在收到訊息時執行已註冊的過濾器。"
                },
                duplicate_chinese_mood_symbol_slice_enable: {
                    _title: "連續重複的中文語氣符號切片過濾器",
                    _description: "將連續重複的中文語氣符號切分為不連續的語義單元，以修復連續使用符號產生意外折行的問題。"
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
                    _description: "編輯器中的配置標籤頁用於控制輸出內容格式，僅編寫程式碼時有用。"
                },
                tabpage_output_enable: {
                    _title: "顯示輸出標籤頁",
                    _description: "編輯器生成的程式碼會在此標籤頁匯出。輸出標籤頁在廣播模式下還可以傳送自訂訊息。"
                },
                client_state_panel_enable: {
                    _title: "顯示對話方塊狀態儀表板",
                    _description: "儀表板可以顯示所有對話方塊的狀態，綠色為啟用，紅色為休眠，灰色則表示沒有對話方塊加入頻道。<br>如果您新增了多個對話方塊，建議您啟用此項。<br>如果您是紅綠色盲，請在可訪問性設定中啟用紅綠色盲。<br>- 啟用後，藍色填充為啟用，藍色邊框為休眠。"
                },
                history_resend_bubble: {
                    _title: "歷史訊息再傳送時上浮",
                    _description: "歷史訊息再次傳送時使歷史記錄回到頂部"
                },
                history_maximum: {
                    _title: "歷史訊息數量上限",
                    _description: "設為 -1 則不設上限。"
                },
                log_line_maximum: {
                    _title: "日誌行數上限",
                    _description: "設為 -1 則不設上限。"
                },
                images_cache_maximum: {
                    _title: "自訂訊息圖片快取數上限",
                    _description: "設為 -1 則不設上限。"
                }
            },
            form: {
                _title: "表單預填充",
                _description: "編輯器初始化時表單的預設填充內容",
                username: {
                    _title: "初始說話人",
                    _description: "編輯器啟動後在說話人輸入框中預設填充的內容。"
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
                    _description: "用於生成可執行的訊息傳送命令。"
                },
                ontput_after_enable: {
                    _title: "啟用在輸出內容後插入內容",
                    _description: ""
                },
                output_after: {
                    _title: "在輸出內容後插入的內容",
                    _description: "用於生成可執行的訊息傳送命令。"
                }
            },
            websocket: {
                _title: "WebSocket",
                _description: "將編輯器連線到 WebSocket 伺服器",
                enable: {
                    _title: "啟用 WebSocket",
                    _description: "如果沒人要求您這麼做，請不要動它。<br>廣播模式下啟用 WebSocket 可連線至伺服器以從透過第三方軟體傳送訊息。<br>可從伺服器接收的訊息和廣播訊息一致，傳送的訊息須使用類似於 JSON.stringify 的方法序列化。<br>詳見<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>說明文件</a>。"
                },
                url: {
                    _title: "連線地址",
                    _description: "提供 WebSocket 連線的伺服器地址，使用 ws:// 或 wss:// 協議頭。"
                },
                auto_url: {
                    _title: "自動設定連線地址",
                    _description: "透過 HTTP(S) 協議訪問編輯器時，直接使用訪問地址作為連線地址，無需手動設定。"
                },
                reconnect_limit: {
                    _title: "最大重連嘗試次數",
                    _description: "連線關閉和連線失敗將會嘗試重連，一旦超過重連嘗試次數限制將不再嘗試重連。"
                },
                disable_broadcast: {
                    _title: "啟用 WebSocket 時禁用廣播頻道",
                    _description: "當編輯器和客戶端處於同一瀏覽器環境時，同時啟用 WebSocket 和廣播會導致客戶端收到重複指令。"
                }
            },
            color_picker: {
                _title: "拾色器",
                _description: "拾色器相關配置",
                palette: {
                    _title: "啟用的色板",
                    _description: "拾色器中有多種色板可供挑選。<br>若要挑選啟用的色板或調整排序，請反選 “全部啟用”，並在下方文字框中輸入色板名稱，一&#65279;行一&#65279;個。",
                    all_selected: "全部啟用"
                },
                contrast_enable: {
                    _title: "啟用 WCAG 顏色對比度測試",
                    _description: "在拾色器中顯示顏色對比面板和 WCAG 顏色對比度測試結果。"
                },
                contrast_background_color: {
                    _title: "WCAG 顏色對比度測試面板參考背景色",
                    _description: "僅支援十六進位制顏色碼。<br>請注意：背景色的 Alpha 通道會被忽略。<br>- 如果您的對話方塊背景顏色是半透明或全透明將無法正確計算對比度，請您自行採集混合後的背景顏色。"
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
                    _description: "表情選擇器中預製了一些表情包。<br>預製的表情包有 emoji、sheep-realms:pixel-head 和 sheep-realms:other。<br>若要挑選啟用的表情包或調整排序，請反選 “全部啟用”，並在下方文字框中輸入表情包名稱，一&#65279;行一&#65279;個。",
                    all_selected: "全部啟用"
                }
            }
        },
        history: {
            _title: "歷史記錄",
            _description: "面向觀眾展示的歷史記錄",
            style: {
                _title: "主題樣式",
                _description: "設定歷史記錄的樣式",
                history_theme: {
                    _title: "歷史記錄主題",
                    _description: "留空則使用全域主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。"
                },
                history_theme_variant: {
                    _title: "歷史記錄主題變體",
                    _description: "留空則使用全域主題變體。"
                },
                history_theme_script_enable: {
                    _title: "啟用歷史記錄主題指令碼",
                    _description: "此配置項需要啟用全域主題指令碼才能生效。"
                }
            },
            layout: {
                _title: "佈局",
                _description: "歷史記錄的內容佈局",
                message_list_reverse: {
                    _title: "歷史記錄倒序排列",
                    _description: "歷史記錄按照傳送時間由新到舊排列。"
                },
                message_item_reverse: {
                    _title: "歷史記錄佈局左右翻轉",
                    _description: "翻轉後的排列從左到右依次是：傳送時間、訊息內容、說話人。"
                },
                display_username: {
                    _title: "顯示說話人",
                    _description: "在歷史記錄中顯示說話人。"
                },
                display_time: {
                    _title: "顯示傳送時間",
                    _description: "在歷史記錄中顯示傳送時間。"
                }
            },
            message: {
                _title: "訊息",
                _description: "歷史記錄的訊息處理邏輯",
                remove_continuous_duplicate: {
                    _title: "去除連續的重複訊息",
                    _description: "如果場景中有多個對話方塊同時接收訊息，啟用此項可避免重複記錄歷史訊息。"
                },
                latest_message_hide: {
                    _title: "隱藏最新的歷史記錄",
                    _description: "對話方塊在開始列印訊息時會立即傳送訊息到歷史記錄中，啟用此項可避免最新訊息立即顯示在歷史記錄中。"
                },
                live_display_hidden_latest_message_show: {
                    _title: "對話方塊隱去時顯示最新的歷史記錄",
                    _description: "在對話方塊隱去時顯示被隱藏的最新的歷史記錄。"
                }
            }
        },
        character: {
            _title: "形象播放器",
            _description: "用於展示立繪或頭像的播放器",
            avatar: {
                _title: "預設形象",
                _description: "設定預設所使用的形象及其引數",
                name: {
                    _title: "形象",
                    _description: "Echo-Live 內建了“Echo 追音”作為預設形象。"
                },
                action: {
                    _title: "動作",
                    _description: "預設所使用的動作名稱，留空則使用預設值。<br>不同的形象會有不同的動作可選，請根據您選擇的形象來選擇動作。"
                },
                scene: {
                    _title: "鏡頭",
                    _description: "預設所使用的鏡頭名稱，留空則使用預設值。<br>不同的形象會有不同的鏡頭可選，請根據您選擇的形象來選擇鏡頭。"
                }
            },
            avatar_switch_effect: {
                _title: "形象切換動效",
                _description: "切換形象或動作時預設所使用的動畫效果",
                name: {
                    _title: "切換動效",
                    _description: "切換形象或動作時預設所使用的動畫效果。"
                },
                duration: {
                    _title: "動效用時",
                    _description: "播放動畫所需時間。"
                },
                scale: {
                    _title: "動效規模乘數",
                    _description: "動畫的運動幅度乘數。"
                },
                timing_function: {
                    _title: "動效時間曲線",
                    _description: "動畫在不同時間段的運動速度。"
                }
            },
        },
        accessibility: {
            _title: "可訪問性",
            _description: "可訪問性相關配置",
            font_size: {
                _title: "字型大小",
                _description: "調整後臺頁面文字的字型大小。",
                small: "小",
                middle: "適中",
                large: "大",
                extra_large: "特大",
                example_1: "你的愛還不夠啊！",
                example_2: "我對普通的人類沒有興趣！",
            },
            use_short_language_iso_code: {
                _title: "使用短 ISO 語言代碼",
                _description: "如果您的螢幕閱讀器只能識別兩位 ISO 語言代碼（即不支援擴展語言代碼），請啟用此配置項。這可能會導致一些字元不能正確選用變體字形。"
            },
            unlock_page_width: {
                _title: "解鎖頁面寬度",
                _description: "不再限制頁面內容寬度，這可以最佳化在較大字型佈局下的顯示效果。"
            },
            high_contrast: {
                _title: "高對比度",
                _description: "提高後臺頁面的對比度，並對焦點元素顯示高亮邊框。<br><span class='accessibility-high-contrast-hide'>此功能會遵循您的系統設定自動開啟。</span><span class='accessibility-high-contrast-show'>由於您的系統設定，此功能已預設開啟。</span>"
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
                _description: "焦點元素邊框的樣式。"
            },
            protanopia_and_deuteranopia: {
                _title: "紅綠色盲",
                _description: "綠色（安全）功能色會以藍色（通用）代替，以便和功能差異較大的黃色（警告）和紅色（危險）作出區分。"
            },
            link_underline: {
                _title: "總是顯示連結下劃線",
                _description: "為連結新增下劃線使其更醒目。"
            },
            animation_disable: {
                _title: "停用動畫",
                _description: "停用所有動畫和過渡效果。"
            },
            power_saving_mode: {
                _title: "停用高開銷效果",
                _description: "停用後臺頁面所有高效能消耗的畫面效果。"
            },
            send_on_enter: {
                _title: "按 Enter 鍵傳送訊息",
                _description: "只需按下 Enter 鍵即可傳送訊息，按下 Ctrl + Enter 鍵換行。"
            }
        },
        advanced: {
            _title: "高階設定",
            _description: "一些複雜的設定",
            _warn: "警告：除非您知道您在幹什麼，否則請不要動這裡的設定。",
            broadcast: {
                _title: "廣播",
                _description: "廣播的高階設定",
                allow_name_duplicate: {
                    _title: "允許識別名重複",
                    _description: "允許終端識別名出現重複，這可能會引發意料之外的情況。"
                },
                allow_send_duplicate_message: {
                    _title: "允許傳送重複訊息",
                    _description: "對話方塊收到重複訊息時會再次列印而非忽略，這將會失去防抖機制。"
                },
                websocket_heartbeat_backoff_scale: {
                    _title: "WebSocket 心跳包併發退避比率",
                    _description: "為了減輕 WebSocket 伺服器同時連線多個客戶端時的心跳包併發壓力，心跳包會以 UUID 為種子隨機延遲 0 ~ 4095 毫秒傳送。<br>調整比率可改變延遲長度。設為 0 可禁用併發退避。<br>預設的隨機範圍已足以應對常規使用場景，除非您試圖組建一個大型網路。"
                },
                websocket_heartbeat_duration: {
                    _title: "WebSocket 心跳包間隔",
                    _description: "每一個 WebSocket 心跳包之間的間隔。併發退避不會影響間隔，只會影響偏移量。<br>設為 0 可禁用心跳包。"
                }
            },
            editor: {
                _title: "編輯器",
                _description: "編輯器的高階設定",
                forced_display_split_message: {
                    _title: "強制顯示“{ @editor.form.label.split_message }”選項",
                    _description: "即便沒有開啟對話方塊狀態儀表板也顯示此選項。"
                },
                history_minimum_breaker_threshold: {
                    _title: "歷史記錄底部遊標熔斷閾值",
                    _description: "設為 -1 可停用此機制。"
                }
            },
            settings: {
                _title: "配置檔案編輯器",
                _description: "配置檔案編輯器的高階設定",
                display_config_key: {
                    _title: "顯示配置項鍵名",
                    _description: "在配置項描述下方顯示鍵名。"
                },
                display_hidden_option: {
                    _title: "顯示隱藏選項",
                    _description: "顯示一些因特定條件下不可用的或實驗性的選項。"
                },
                speech_synthesis_voices_maximum: {
                    _title: "講述人語音資源列表最大顯示數量",
                    _description: "在某些作業系統中可能會列出大量專案從而影響渲染效能。<br>設為 -1 則不設上限。"
                }
            },
            performance: {
                _title: "效能",
                _description: "調整 Echo-Live 的效能最佳化細節",
                foreach_text_style_by_message_data: {
                    _title: "基於訊息資料遍歷文字樣式",
                    _description: "預設情況下 Echo-Live 會在解析訊息格式時遍歷整個文字樣式登錄檔，這使得解析順序是固定的而不會產生衝突。然而如果文字樣式登錄檔中有大量登錄資料，將會略微影響效能。<br>啟用此配置項後，Echo-Live 會基於訊息格式中已有的屬性來遍歷文字樣式，但這會導致屬性順序變得敏感，靠後的屬性會覆蓋之前屬性的效果。"
                },
                row_search_threshold: {
                    _title: "橫向搜尋觸發閾值",
                    _description: "預設情況下資料檢索演算法採用垂直搜尋，在條件較少時可以最佳化檢索效率。但如果條件數量遠高於資料量，檢索效率將會降低。<br>當資料量和條件量的比值低於此閾值時，將會觸發橫向搜尋，以降低大量條件帶來的效能影響。<br>不過，您真的有這麼做的需求嗎？"
                }
            },
            device: {
                _title: "硬體裝置",
                _description: "配置 Echo-Live 呼叫的硬體裝置",
                enable: {
                    _title: "啟用硬體裝置控制",
                    _description: "允許 Echo-Live 呼叫一些硬體裝置以提供更好的操作體驗。例如震動馬達，這將用於在移動裝置上提供觸覺反饋。"
                }
            },
            obs_api: {
                _title: "OBS API",
                _description: "配置前臺頁面對 OBS API 的運用",
                allow_scene_name_set_attribute: {
                    _title: "允許場景名稱控制頁面屬性",
                    _description: "透過在 OBS 場景名稱末尾寫入像 <code aria-label='“左方括號、color、等於號、dark、右方括號”'>[color=dark]</code> 這樣的鍵值對來更改頁面屬性，以便於在不同的場景中應用不同的樣式。<br>要使用此功能，對應的瀏覽器源的頁面許可權應至少為“使用者資訊的讀取許可權”。"
                },
                echolive_mini_size_coefficient: {
                    _title: "對話方塊迷你尺寸計算係數",
                    _description: "透過在 OBS 場景名稱末尾寫入 <code aria-label='“左方括號、mini、右方括號”'>[mini]</code> 即可啟用對話方塊的迷你尺寸，迷你尺寸僅在部分主題中可用。<br>係數取值範圍為 0.3 ~ 2，迷你尺寸的寬度計算公式為：<code aria-label='場景高度乘以係數所得的值與場景寬度取最小值。'>min(場景高度 × 係數, 場景寬度)</code><br>要使用此功能，對應的瀏覽器源的頁面許可權應至少為“使用者資訊的讀取許可權”。"
                }
            }
        },
        extension: {
            _title: "擴充套件管理器",
            _description: "管理擴充套件包",
        },
        about: {
            _title: "關於",
            _description: "軟體資訊",
            about_echolive: "關於 Echo-Live",
            accessibility: "無障礙使用指南",
            bug_tracker: "錯誤追蹤",
            community: "社羣服務",
            copyright: "授權協議與聲明",
            document: "說明文件",
            feedback: "建議回饋",
            github: "GitHub 專案倉庫",
            license: "開源許可證",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "回報安全錯誤",
            social_media: "社交媒體",
            user_guide: "使用者指南",
            debug: {
                title: "除錯選項",
                console_local_storage: "輸出：Local Storage",
                console_registry: "輸出：登錄檔"
            }
        }
    },
    echolive: {
        system_message: "系統訊息",
        shutdown: "Echo-Live 因收到 shutdown 命令已停止執行，需要重新啟動請重新整理此頁面。",
        shutdown_reason: "Echo-Live 因收到 shutdown 命令已停止執行，原因為“{reason}”，需要重新啟動請重新整理此頁面。"
    },
    editor: {
        client_state: {
            active: "啟用",
            none: "未加入",
            sleep: "休眠"
        },
        client_target: {
            none: "無",
            not: "已排除",
            yes: "已選中"
        },
        client_state_panel: {
            targeted: "（僅限定向）",
            tip: "客戶端狀態：{client}；\nEcho 狀態：{echo}；\n標記狀態：{target}{targeted}；\n右鍵點選此處可標記目標。",
            tip_more_messages: "客戶端狀態：{client}；\nEcho 狀態：{echo}；\n標記狀態：{target}{targeted}；\n點選此處可列印下一條訊息。"
        },
        echo_state: {
            play: "列印中",
            ready: "就緒",
            stop: "停止"
        },
        emoji: {
            select: "表情包"
        },
        form: {
            text_length: "{n} 字元",
            aria_label: {
                log_box: "這裡是日誌列表，如果您聽到了這句話，請注意，這裡的閱讀體驗可能會很差。"
            },
            description: {
                formatting_code_example_1: "@b - 粗體，@i - 斜體，@u - 下劃線，@s - 刪除線，@r - 清除格式",
                formatting_code_example_2: "示例：這裡沒有格式。@b這裡有粗體。@i這裡有粗體和斜體。@r這裡沒有格式。@[#66ccff]這是藍色。",
                formatting_code_example_3: "點此閱讀關於快速格式化程式碼的指南",
                output_after: "在輸出內容之後插入尾部內容",
                output_before: "在輸出內容之前插入頭部內容",
                print_speed: "每個列印迴圈的延遲時間（毫秒），預設為 30。數字越大，耗時越長。中日韓字元延遲 × 2。",
                print_speed_custom: "每個列印迴圈的延遲時間（毫秒），預設為 30，您的預設配置為 {value}。數字越大，耗時越長。中日韓字元延遲 × 2。",
                quote: "自動在每一句話開頭和結尾新增引用符號，Echo Live 會為一些引用符號自動縮排。",
                sent_clear: "訊息傳送後使用此模板內容替換內容文字框。可以使用佔位符 <code aria-label='“兩對花括號包裹一個管道符”'>{{\\|}}</code> 來指定游標位置。。",
                split_message_example_1: "每一行視為一條訊息，組成訊息佇列，可以依次列印。",
                split_message_example_2: "當開啟對話方塊狀態儀表板時，可以點選對應的對話方塊按鈕列印下一條訊息。",
                open_settings: "開啟配置檔案編輯器"
            },
            label: {
                advanced_function: "高階功能",
                character: "說話人",
                content: "內容",
                live_client_state: "對話方塊狀態",
                output_after: "尾部內容",
                output_before: "頭部內容",
                output_content: "輸出內容",
                print_speed: "列印速度",
                quote: "引用符號",
                quote_after: "結尾",
                quote_before: "開頭",
                sent_clear: "傳送後重置內容",
                sent_clear_input: "模板",
                split_message: "多行文字分割為訊息佇列",
                startup_parameter: "啟動引數",
                statistic: "統計資訊",
                statistic_view: "檢視統計資訊",
                statistic_export: "匯出統計資訊",
                use_formatting_code: "使用快速格式化程式碼"
            },
            placeholder: {
                commander: "命令控制檯"
            }
        },
        format: {
            bold: "粗體",
            clear: "清除格式",
            color: "文字顏色",
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
            messages_more: "... 等 {n} 條訊息",
            resent_at: "（於 {time} 再次傳送）"
        },
        image_popups: {
            button: {
                delete_all_images: "刪除所有圖片"
            },
            label: {
                image_margin: "外邊距",
                image_rendering: "重取樣",
                image_size_max: "最大圖片尺寸",
                image_size_min: "最小圖片尺寸",
                set_image_parameter: "設定圖片屬性"
            },
            option: {
                image_rendering: {
                    auto: "自動",
                    pixelated: "最鄰近"
                }
            },
            tabpage: {
                file: {
                    title: "匯入檔案",
                    description: "直接匯入圖片檔案"
                },
                url: {
                    title: "匯入地址",
                    description: "匯入 URL 地址"
                },
                images: {
                    title: "相簿",
                    description: "已快取的圖片"
                }
            }
        },
        log: {
            index: "日誌",
            welcome: "歡迎使用 Echo-Live！如需查閱說明文件，請見：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessibility: {
                type: {
                    dbug: "除錯：",
                    done: "完成：",
                    erro: "錯誤：",
                    info: "資訊：",
                    tips: "提示：",
                    warn: "警告："
                }
            },
            broadcast: {
                close: "{client} 離開廣播頻道，識別名：{name}",
                echo_next: "收到來自其他服務端的命令：列印下一條訊息。",
                echo_next_from_self_to_target: "已命令 {name} 列印下一條訊息。",
                editor_websocket_connect_close: "編輯器與 WebSocket 伺服器 {url} 連線中斷。",
                editor_websocket_connect_error: "編輯器與 WebSocket 伺服器 {url} 連線出錯，進行第 {n} 次重連。",
                editor_websocket_connect_error_retry_failed: "編輯器與 WebSocket 伺服器 {url} 連線出錯，重連次數超出限制。",
                editor_websocket_connect_open: "編輯器與 WebSocket 伺服器 {url} 連線成功，編輯器 UUID：{uuid}",
                editor_websocket_message_error: "編輯器解析 Websocket 伺服器訊息時出錯。",
                hello: "{client} 進入廣播頻道，識別名：{name}",
                hello_hidden: "{client} 進入廣播頻道，已休眠，識別名：{name}",
                hello_reply: "{client} 響應了廣播，識別名：{name}",
                hello_reply_hidden: "{client} 響應了廣播，已休眠，識別名：{name}",
                hello_to_server: "{client} 已向 Websocket 伺服器傳送 HELLO 訊息，識別名：{name}",
                message_data_third: "收到來自其他服務端的訊息資料：{message}",
                page_hidden: "{client} 因不可見已休眠，識別名：{name}",
                page_visible: "{client} 已喚醒，識別名：{name}",
                ping_server: "有其他服務端加入頻道，識別名：{name}",
                set_theme_style_url: "收到來自其他服務端的命令：設定主題樣式檔案 URL 為 {url}",
                set_theme: "收到來自其他服務端的命令：設定主題為 {name}",
                shutdown: "收到來自其他服務端的命令：立即停止。",
                shutdown_reason: "收到來自其他服務端的命令：立即停止。原因為：${reason}",
                websocket_close: "收到來自其他服務端的命令：關閉 Websocket 連線。此命令將阻止嘗試重連。"
            },
            broadcast_launch: {
                disable: "未開啟廣播模式，無日誌顯示。",
                done: "廣播模式已開啟：{channel}",
                user_agent_check: "編輯器已正確安裝在 OBS 中！",
                user_agent_check_websocket: "編輯器已啟用 WebSocket 連線！",
                user_agent_error: "您似乎並未正確在 OBS 中安裝此編輯器，詳見：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/",
            },
            error: {
                name_duplicate: "識別名 {name} 發生衝突，{uuid} 已被踢出廣播頻道。如果您有使用重複識別名的需要，請將配置項 advanced.broadcast.allow_name_duplicate 設為 true。",
                websocket_error: "{client} Websocket 連線 {url} 出錯，進行第 {n} 次重連，識別名：{name}",
                websocket_error_retry_failed: "{client} Websocket 連線 {url} 出錯，重連次數超出限制，識別名：{name}",
                websocket_message_error: "{client} Websocket 接收到的訊息解析出錯，識別名：{name}",
                unknown_error_in_client: "{client} 發生未捕獲的錯誤：<br>{msg}<br>來源：{source}<br>行列：{line}:{col}<br>識別名：{name}",
                unknown_error_in_editor: "編輯器發生未捕獲的錯誤：{msg}<br>來源：{source}<br>行列：{line}:{col}"
            },
            message: {
                empty: "未輸入內容，未傳送任何訊息。",
                empty_data: "訊息內容無有效資料，未傳送任何訊息。",
                empty_messages: "傳送的訊息中沒有訊息佇列，這是一個錯誤的訊息格式。雖然這麼操作似乎不會引發嚴重問題，但不建議這麼操作。",
                illegal: "傳送的訊息格式存在錯誤。詳見說明文件：https://sheep-realms.github.io/Echo-Live-Doc/message/",
                resent: "已再次傳送歷史訊息。",
                sent: "已傳送訊息：{msg}",
                sent_custom: "已傳送自訂訊息：{msg}",
                sent_custom_multi: "已傳送 {n} 條自訂訊息，首條訊息為：{msg}",
                target: {
                    none: "[ ] 已取消標記：{name}",
                    not: "[-] 已標記排除：{name}",
                    yes: "[+] 已標記選中：{name}"
                }
            },
            tip: {
                unknown_error: "看來您可能遇到了一些問題。如果您確實覺得有什麼不對勁，請複製此日誌內容反饋給開發者，並詳細描述復現過程。"
            },
            warn: {
                no_client: "沒有客戶端響應，請檢查您是否正確開啟或安裝了 Echo-Live。如果您的操作正確，則可能是因為 OBS 中所有源均處於不可見狀態。"
            }
        },
        palette: {
            index: "拾色器",
            empty: "臥槽？！你在幹什麼？我放在這裡那麼大一個調色盤呢？還好我技高一籌給你兜住了！",
            select: "色板庫",
            accessibility: {
                tip: "需要無障礙使用説明嗎？"
            },
            diff_dashboard: {
                index: "對比度測試面板",
                background_color: "背景色",
                foreground_color: "前景色",
                not_applicable: "不適用",
                result: {
                    contrast: "對比度參考閾值",
                    wcag_aa: "WCAG AA",
                    wcag_aaa: "WCAG AAA"
                },
                state: {
                    ok: "{name} 測試透過",
                    fail: "{name} 測試失敗"
                }
            },
            label: {
                title_after: "{title} - {after}",
                common: {
                    after: {
                        deep: "深色",
                        default: "預設",
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
                        link: "連結 | 連結 {value}",
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
                custom_class: {
                    title: "高階樣式",
                    style: {
                        gradient_aqua_splash: "海洋巨星",
                        gradient_perfect_blue: "宇宙之眼",
                        gradient_dusty_grass: "固沙草原",
                        gradient_fly_high: "掙脫引力",
                        gradient_heavy_rain: "傾盆大雨",
                        gradient_juicy_peach: "多汁蜜桃",
                        gradient_mountain_rock: "築山之巖",
                        gradient_night_fade: "暮色銀河",
                        gradient_premium_dark: "高階深灰",
                        gradient_red_salvation: "碎空遠星",
                        gradient_salt_mountain: "地中之鹽",
                        gradient_spring_warmth: "暖陽春日",
                        gradient_sunny_morning: "明媚早晨",
                        gradient_winter_neva: "冰天雪地",
                        jitter: "抖動",
                        rainbow: "彩虹",
                        roll_down: "旋轉倒置",
                        wave_1: "微波起伏",
                        wave_2: "波濤洶湧",
                        wave_3: "驚濤駭浪"
                    },
                    group: {
                        colorful: "多彩漸變",
                        funny: "搞笑搞怪"
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
                description: "廣播控制 [alt+5]"
            },
            config: {
                title: "配置",
                description: "編輯配置 [alt+2]"
            },
            editor: {
                title: "編輯器",
                description: "文字編輯器 [alt+1]"
            },
            history: {
                title: "歷史記錄",
                description: "已傳送訊息的列表"
            },
            log: {
                title: "日誌",
                description: "執行日誌 [alt+4]"
            },
            output: {
                title: "輸出",
                description: "輸出程式碼 [alt+3]"
            },
            output_content: {
                title: "輸出內容",
                description: "編輯匯出程式碼和傳送訊息"
            }
        },
        tip: {
            hot_key_textarea_quick_send: "當焦點在此文字框中時，可以按下 Ctrl + Enter 快速傳送"
        }
    },
    effect: {
        print: {
            blur_in: "聚焦",
            fade_in: "淡入",
            move_in_down: "從下方移入",
            move_in_up: "從上方移入",
            none: "無",
            zoom_in_inside: "放大進入",
            zoom_in_outside: "縮小進入"
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
                nature: "森羅永珍"
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
                title: "綿羊的畫素頭像",
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
                    loading: "載入",
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
        name: "檔名",
        last_modified_date: "最後修改時間",
        size: "檔案大小",
        checker: {
            default_file_loaded: "預設路徑中的配置檔案已載入",
            empry: "未載入檔案",
            state: {
                error: "錯誤",
                exception: "異常",
                future: "新版",
                loaded: "已載入",
                update: "舊版"
            }
        },
        dropper: {
            title: "檔案選擇器",
            drop_file_but_file_text: "您覺得您很幽默嗎？",
            drop_file_but_file_text_target: "檔案",
            drop_file_cancel: "不放算了，哼！",
            drop_file_cancel_many: "一位使用者反覆拖拽檔案，這是他的程式發生的變化",
            drop_file_long_time: "你怎麼還不放手？",
            drop_file_now: "鬆開滑鼠拖放檔案",
            please_click: "點選此處選擇檔案",
            please_drop_file: "在這裡拖放檔案或點選此處選擇檔案",
            please_drop_file_keyboard: "當焦點在此處時，您也可以按下 Enter 或空格鍵選擇檔案",
            dialog: {
                many_file: {
                    title: "太多了",
                    description: "處理不了那麼多檔案，請一個一個來。"
                },
                not_file: {
                    title: "這不是檔案",
                    description: "您拖了個什麼玩意兒進來？"
                },
                selected: {
                    title: "已選擇檔案",
                    description: "檔名：{name}",
                    import_image: "插入圖片"
                },
                type_error: {
                    title: "檔案型別錯誤",
                    description: "這似乎並不是我們想要的檔案。"
                },
                use_chrome: {
                    title: "建議您使用最新版 Chrome 瀏覽器",
                    description: "此頁面使用了一些最新技術，您的瀏覽器可能無法支援部分功能。<br>當然您也可以試試 Edge 瀏覽器。",
                    goto: "獲取 Chrome"
                }
            }
        },
        picker: {
            config: "配置檔案",
            image: "圖片"
        }
    },
    font_weight: {
        bold: "粗體",
        inherit: "繼承預設值",
        normal: "適中",
        "100": "淡體",
        "200": "特細",
        "300": "細體",
        "350": "次細",
        "400": "標準",
        "500": "適中",
        "600": "次粗",
        "700": "粗體",
        "800": "特粗",
        "900": "濃體",
        "950": "特濃"
    },
    help: {
        easter_egg: {
            previous: "你就是想跟我反著幹，對吧？",
            previous_is_first_step: "別退了！已經到頭了！"
        },
        popover: {
            done: "完成",
            next: "繼續 →",
            prev: "← 後退",
            progress: "{{current}} / {{total}}"
        },
        step: {
            editor_overview: {
                s1: {
                    title: "歡迎使用 Echo-Live！",
                    description: "接下來我們將進入關於編輯器的新手引導。<br>如果您不方便使用滑鼠，可以使用方向鍵 <kbd>→</kbd> 前往下一個步驟，也可以按 <kbd>Esc</kbd> 鍵退出引導。"
                },
                s2: {
                    title: "我們只能一路向前",
                    description: "雖然我把後退按鈕刪了，但你還是可以透過方向鍵來後退。為了引導的正常進行，請不要後退，也不要亂點高亮框內的東西。求求您千萬不要！"
                },
                s3: {
                    title: "說話人",
                    description: "這裡填入需要在對話方塊中顯示的說話人，如果不需要則可以留空。",
                    input: "追音"
                },
                s4: {
                    title: "訊息內容",
                    description: "這裡填入在對話方塊中顯示的訊息，訊息將會使用列印動畫逐字輸出內容。",
                    input: "你好，世界！"
                },
                s5: {
                    title: "快速格式化程式碼",
                    description: "如果想要更豐富的文字樣式，可以在這裡啟用快速格式化程式碼。"
                },
                s6: {
                    title: "工具欄",
                    description: "啟用快速格式化程式碼後，您可以點選這些按鈕插入快速格式化程式碼。"
                },
                s7: {
                    title: "插入程式碼",
                    description: "點選工具欄中的按鈕，就能在游標處插入對應的程式碼。",
                    input: "@b你好，世界！"
                },
                s8: {
                    title: "顏色選擇器",
                    description: "您可以在這裡選擇文字顏色，點選色塊就能在游標處插入對應的顏色程式碼。"
                },
                s9: {
                    title: "色板",
                    description: "不喜歡這些顏色？這裡有多種色板供您選擇。"
                },
                s10: {
                    title: "插入顏色",
                    description: "現在，我們已經成功插入了顏色！",
                    input: "@b你好，@[#1890ff]世界！"
                },
                s11: {
                    title: "關於快速格式化程式碼",
                    description: "請注意，快速格式化程式碼會影響其後所有文字的樣式，並且是可以疊加的。直到遇到 @r，這會清空所有樣式。"
                },
                s12: {
                    title: "圖片選擇器",
                    description: "您還可以在訊息中插入圖片。可以直接匯入檔案，這會開啟一個系統的檔案選擇器，也可以透過 URL 地址匯入檔案。"
                },
                s13: {
                    title: "相簿",
                    description: "您使用過的圖片會儲存在這裡，即便您重新整理網頁之後也依舊存在。"
                },
                s14: {
                    title: "輸出訊息",
                    description: "當您編寫好訊息後，就可以在這裡點選按鈕輸出訊息了。如果您啟用了廣播模式，您可以在這裡直接傳送訊息。"
                },
                s15: {
                    title: "導航欄",
                    description: "接下來我們來看看別的東西。"
                },
                s16: {
                    title: "輸出標籤頁",
                    description: "當您在編輯器中點選了輸出按鈕時，訊息的程式碼會輸出到此處。"
                },
                s17: {
                    title: "自訂訊息",
                    description: "如果您啟用了廣播模式，您可以在這裡直接傳送訊息，這意味著您可以傳送功能更豐富的自訂訊息。"
                },
                s18: {
                    title: "日誌標籤頁",
                    description: "在日誌標籤頁中，您可以看到廣播模式下廣播系統的執行日誌。"
                },
                s19: {
                    title: "通知",
                    description: "此刻冒出來的是通知訊息，一些需要您留意的通知會出現在此處。",
                    notice: "您好！"
                },
                s20: {
                    title: "新人引導結束",
                    description: "再次感謝您使用 Echo-Live！如果您還有疑問，可以閱讀<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/' target='_blank'>說明文件</a>或諮詢開發者。"
                }
            },
            settings_overview: {
                s1: {
                    title: "歡迎使用 Echo-Live！",
                    description: "接下來我們將進入關於配置檔案編輯器的新手引導。<br>如果您不方便使用滑鼠，可以使用方向鍵 <kbd>→</kbd> 前往下一個步驟，也可以按 <kbd>Esc</kbd> 鍵退出引導。"
                },
                s2: {
                    title: "我們只能一路向前",
                    description: "雖然我把後退按鈕刪了，但你還是可以透過方向鍵來後退。為了引導的正常進行，請不要後退，也不要亂點高亮框內的東西。求求您千萬不要！"
                },
                s3: {
                    title: "導航欄",
                    description: "如你所見，配置檔案編輯器的使用過程可以分為這三個步驟。"
                },
                s4: {
                    title: "匯入",
                    description: "先來看看匯入這個步驟。"
                },
                s5: {
                    title: "匯入和升級配置檔案",
                    description: "你可以點選此處或將檔案拖進這裡來匯入配置檔案。如果您匯入了舊版配置檔案，可以在這裡自動升級。"
                },
                s6: {
                    title: "檔案資訊",
                    description: "這裡是當前所選中的檔案的資訊，包括檔名、尺寸、最後更改時間。"
                },
                s7: {
                    title: "編輯",
                    description: "匯入完成後，我們應該來編輯配置檔案了。"
                },
                s8: {
                    title: "分類",
                    description: "這裡是配置檔案專案的分類。"
                },
                s9: {
                    title: "配置項",
                    description: "這是其中一條配置項。您可以在這裡閱讀關於此配置項的描述，並嘗試更改配置值。"
                },
                s10: {
                    title: "更改配置",
                    description: "當您更改了配置後，對應的配置標題會顯示一個紅色星號，代表其已更改但未儲存。"
                },
                s11: {
                    title: "儲存配置",
                    description: "您可以在這裡儲存或撤銷更改。<br>暫存：儲存更改，但不匯出檔案。<br>儲存：儲存更改，並匯出檔案。"
                },
                s12: {
                    title: "匯出配置檔案",
                    description: "當您匯出配置檔案時，請將其放置在 Echo-Live 的目錄中，替換 config.js 檔案。在這之後重新整理網頁就可以應用最新配置。"
                },
                s13: {
                    title: "新增的配置項",
                    description: "當您匯入並升級了一箇舊版本的配置檔案時，新增的配置項會被高亮。"
                },
                s14: {
                    title: "匯出",
                    description: "來看看最後一個標籤頁。"
                },
                s15: {
                    title: "匯出內容",
                    description: "其實剛剛我們已經提到過匯出檔案了，這裡只是為了檢視和編輯匯出內容，以及另存新檔。"
                },
                s16: {
                    title: "重新匯出",
                    description: "如果你不小心搞砸了，點選這個按鈕即可重新匯出配置檔案內容。"
                },
                s17: {
                    title: "可訪問性",
                    description: "另外，如果您需要調整可訪問性相關配置，可以在這裡找到。<br>如有需要，您可以<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>點選此處閱讀無障礙使用指南</a>。"
                },
                s18: {
                    title: "新人引導結束",
                    description: "再次感謝您使用 Echo-Live！如果您還有疑問，可以閱讀<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/' target='_blank'>說明文件</a>或諮詢開發者。"
                }
            }
        },
        title: {
            editor_overview: "編輯器使用指南",
            settings_overview: "配置檔案編輯器使用指南"
        },
        tutorial_dialog: {
            title: "互動式引導",
            description: "您需要閱讀{title}嗎？",
            option: {
                yes: "需要",
                skip: "下次再說",
                no: "不需要"
            }
        }
    },
    live_controller: {
        all_icon: {
            title: "全量圖示"
        },
        classic: {
            title: "舊版純文字"
        },
        draw: {
            title: "畫圖"
        },
        neo_icon: {
            title: "圖示"
        },
        taskbar: {
            title: "工作列"
        },
        word: {
            title: "Word 文件",
            item: {
                cite: "引用",
                design: "設計",
                email: "郵件",
                file: "檔案",
                graphics: "繪圖",
                help: "幫助",
                layout: "佈局",
                insert: "插入",
                review: "審閱",
                start: "開始",
                view: "檢視"
            }
        }
    },
    live_theme: {
        bubble: {
            title: "氣泡",
            variant: {
                azure: "蔚藍",
                pink: "粉紅"
            }
        },
        glass: {
            title: "玻璃",
            variant: {
                coffee: "咖啡棕",
                blue: "湖泊藍",
                pink: "蜜桃粉",
                purple: "水晶紫",
                wine_red: "葡萄紅"
            }
        },
        vanilla: {
            title: "原版",
            variant: {
                dark: "深色",
                dark_glass: "深色半透明",
                light_glass: "半透明"
            }
        },
        void: {
            title: "虛空",
            variant: {
                white: "白色文字"
            }
        }
    },
    message_preview: {
        empty_message: "[空訊息]",
        empty_username: "[未指定說話人]",
        undefined_message: "[未定義訊息]"
    },
    meta_info: {
        author: "作者：{ name }",
        license: "授權協議：{ name }"
    },
    notice: {
        client_target_but_no_client: "請不要虛空索敵！",
        commander_tips: "您已開啟命令控制檯，點選此處可查閱關於命令的幫助。如果您只是誤操作，請將游標置於控制檯中並按 <kbd>Esc</kbd> 鍵退出。",
        config_re_output: "已重新匯出配置檔案內容！",
        config_saved: "配置檔案已儲存！請注意重新整理所有頁面使新配置生效。",
        config_saving: "儲存中...",
        config_saving_fail: "未授權寫入，配置檔案未儲存。",
        browser_zoom: "如果您不小心調整了縮放率不知道怎麼復原，請按：<kbd>Ctrl</kbd> + <kbd>0</kbd>（數字鍵）",
        browser_zoom_reset: {
            title: "漂亮的搶救！",
            message: "您已經掌握瞭如何操作瀏覽器縮放。請注意，<kbd>Ctrl</kbd> + <kbd>-</kbd> 和 <kbd>Ctrl</kbd> + <kbd>+</kbd> 組合鍵可以調整瀏覽器縮放，當心誤操作！"
        },
        debug_mode: "已啟用除錯選項！",
        drop_file_cancel_many: "你倒是放啊！",
        github_download_but_no_assets: {
            title: "讓我們開始下載...... 等一下？",
            message: "釋出了新版本結果沒上傳檔案？還能有這種事情？！"
        },
        import_image_url_empty: "未填寫圖片 URL！",
        local_storage_cleared: "已清除本地儲存資料！",
        open_file_picker_cancel: "已取消選擇檔案！",
        open_file_picker_fail: {
            title: "開啟檔案選擇器時發生錯誤",
            message: "這很有可能是因為您當前使用的瀏覽器不支援此功能。您還可以嘗試拖放檔案，但還是建議您更換瀏覽器。"
        },
        open_settings_in_obs: "請在瀏覽器中開啟 settings.html，而不是在 OBS 中！",
        unknown_error: {
            title: "發生了未捕獲的錯誤",
            message: "這應該不是什麼意料之中的戰術性報錯，您可以將此問題反饋給開發者，並提供復現方法。"
        }
    },
    page_title: {
        character: "Echo Live 形象播放器",
        editor: "Echo Live 編輯器",
        history: "Echo Live 歷史記錄",
        live: "Echo Live",
        settings: "Echo Live 配置檔案編輯器"
    },
    pip: {
        in_pip: "本視窗正是畫中畫！",
        not_support: "當前瀏覽器不支援 Document Picture-in-Picture API",
        open_pip_window: "開啟畫中畫視窗",
        title: "畫中畫"
    },
    settings: {
        unknown_config_type: "暫不支援修改此配置",
        config_input: {
            config_from_future: {
                title: "配置檔案來自未來版本",
                description: "此配置檔案來自於未來的 Echo-Live，您也許有哪裡搞錯了。<br>繼續載入可能會產生意料之外的問題。",
                load: "繼續載入"
            },
            json_parse_fail: {
                title: "無法安全讀取配置檔案",
                description: "這可能是因為配置檔案為早期版本，或是配置檔案內容損壞。<br>如果您確定配置檔案沒有問題，並且沒有被植入惡意程式碼的可能，可以嘗試 “不安全讀取”。",
                unsafe_load: "不安全讀取"
            },
            in_obs: {
                title: "不要在 OBS 中開啟此頁面",
                description: "這會產生一些意料之外的問題，並且您完全沒有必要將這個頁面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "處理不了那麼多檔案，請一個一個來。"
            },
            no_json: {
                title: "找不到配置資料",
                description: "無法在此檔案中找到配置資料。"
            },
            not_file: {
                title: "這不是檔案",
                description: "您拖了個什麼玩意兒進來？"
            },
            type_error: {
                title: "檔案型別錯誤",
                description: "這似乎並不是配置檔案。"
            },
            unsafe_load_fail: {
                title: "無法讀取配置檔案",
                description: "看來您的配置檔案確實有問題，請檢查您的配置檔案。"
            },
            update_config: {
                title: "配置檔案需要更新",
                description: "此配置檔案來自於舊版的 Echo-Live，需要更新才能使用。",
                update: "更新"
            },
            update_config_from_unknown_version: {
                title: "未知的配置檔案版本",
                description: "此配置檔案沒有版本號，可能來自於 1.2.7 之前的版本。<br>您可以強制升級此配置檔案，但並不能保證其正常運作，不建議您繼續使用此配置檔案。",
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
            config_output: "匯出配置內容"
        },
        msgbox: {
            accessibility: "Echo-Live 所有後臺頁面均支援鍵盤訪問。<br>更多有關無障礙使用的説明請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>說明文件</a>。",
            advanced_settings: "不要隨意更改這裡的配置，除非您知道您在做什麼。",
            character_settings: "形象播放器仍是一項實驗性功能，可能存在較多問題，未來有可能會發生重大更改，請勿過度依賴。",
            echo: {
                title: "關於 Echo",
                description: "Echo 是 Echo-Live 的核心，提供了文字滾動輸出功能。<br>它是一個工具庫，任何人都可以使用 Echo 建立自己的文字展示專案。<br>如果您有興趣瞭解 Echo，請見其 <a href='https://github.com/sheep-realms/Echo' target='_blank'>GitHub 倉庫</a>。"
            },
            extension: {
                title: "在做了在做了！！！",
                description: "為了讓擴充套件的功能變得更強大，咱對 Echo-Live 的資料載入邏輯進行了一場驚天地泣鬼神的更改，於是原有的擴充套件系統不管用了...... 不不不，咱不是那個意思！新的擴充套件系統需要很多配套設施，很多人非常期待這個版本的更新，所以擴充套件系統的更新需要延後了。如果不出意外的話，它很快就會回來的！"
            }
        },
        tabpage: {
            edit: {
                title: "編輯",
                description: "編輯配置檔案 [alt+2]"
            },
            export: {
                title: "匯出",
                description: "匯出配置檔案 [alt+3]"
            },
            import: {
                title: "匯入",
                description: "匯入配置檔案 [alt+1]"
            }
        }
    },
    sound: {
        pencil: "鉛筆",
        typewriter: "打字機",
        typewriter_loop: "打字機（隨機音效）",
        sys001: "清脆敲擊",
        sys002: "嗡嗡",
        sys003: "冒泡",
        enter: "打字機回車",
        paper: "翻頁"
    },
    statistic: {
        overview: {
            statistic_days: "統計天數"
        },
        editor: {
            message: {
                custom_code_sent_count: "自定義訊息傳送次數",
                last_sent: "最近一次訊息傳送時間",
                not_resent_count: "不包含重發的訊息傳送次數",
                resent_count: "訊息重新傳送次數",
                sent_character_average: "每條訊息平均字數",
                sent_character_total: "字元傳送總數",
                sent_count: "訊息傳送次數",
                sent_max_length: "訊息最大長度",
                used_formatting_code_count: "快速格式化程式碼使用次數",
                session: {
                    resent_max_count: "會話內訊息重新傳送最多次數",
                    sent_character_max_total: "會話內傳送最多總字數",
                    sent_max_count: "會話內訊息傳送最多次數"
                }
            },
            overview: {
                last_session_created: "最近一次會話啟動時間",
                session_created_count: "會話啟動次數",
                session_created_daily_average: "每個活動日會話啟動平均次數",
                session_created_days: "會話活動總天數",
                session_created_statistic_daily_rate: "每日會話活動率",
                session_duration_average_second: "會話平均時長",
                session_duration_max_second: "會話最大時長",
                session_duration_total_second: "會話總時長"
            }
        },
        misc: {
            view_statistic_count: "“這是什麼？統計資訊？看一下！”"
        }
    },
    statistic_info: {
        empty_timestamp: "從未發生",
        footer_description: "部分統計項需要在結束當前會話後才能完成統計。<br>統計開始於：{ created_at }<br>統計截止於：{ modified_at }"
    },
    studio: {
        title: {
            text_to_messages: "文字轉訊息格式 · Echo Live 工作室"
        },
        text_to_messages: {
            colon: "：",
            label: {
                character_split: "說話人分隔符",
                text: "對話文字"
            },
            tabpage: {
                edit: {
                    title: "編輯",
                    description: "編輯文字 [alt+1]"
                },
                output: {
                    title: "輸出",
                    description: "輸出訊息格式 [alt+2]"
                }
            }
        }
    },
    timing_function: {
        ease: "平滑",
        linear: "線性",
        ease_in: "緩出",
        ease_out: "緩入",
        ease_in_out: "緩入緩出",
        ease_in_sine: "正弦緩出",
        ease_out_sine: "正弦緩入",
        ease_in_out_sine: "正弦緩入緩出",
        ease_in_cubic: "三次方緩出",
        ease_out_cubic: "三次方緩入",
        ease_in_out_cubic: "三次方緩入緩出",
        ease_in_circ: "圓形緩出",
        ease_out_circ: "圓形緩入",
        ease_in_out_circ: "圓形緩入緩出",
        ease_in_back: "回退緩出",
        ease_out_back: "回退緩入",
        ease_in_out_back: "回退緩入緩出"
    },
    updater: {
        download_assets: "下載檔案",
        notice_title: "有新版本可用：{version}",
        notice_content_editor: "您可以開啟配置檔案編輯器獲取詳細資訊或自行前往 GitHub 下載最新版本。",
        notice_content_settings: "您可以更新到新版本，點此瞭解詳細資訊。",
        releases_author: "作者：{value}",
        releases_created_at: "釋出時間：{value}",
        releases_details: "發行版本詳情",
        releases_details_tips: "如出現內容渲染錯誤，請前往 GitHub 檢視原文。"
    },
    window: {
        config_font_size_overload: {
            title: "您是認真的嗎？",
            message: "您確定要使用以下配置嗎？",
            font_size_review: "字型大小：{value}"
        },
        clear_local_storage: {
            title: "清除本地儲存資料",
            message: "您確定要清除本地儲存資料嗎？<br>這是一個不可逆的操作，您將會永久丟失這些資料。"
        }
    }
};

echoLiveSystem.registry.setLanguageRegistryValue(lang_zho_Hant_TW);