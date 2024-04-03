const lang_zho_Hant_TW = {
    lang: {
        code_iso_639_3: "zho-Hant-TW",
        code_ietf: "zh-Hant-TW",
        title: "繁體中文（台灣地區）"
    },
    ui: {
        confirm: "確認",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "儲存",
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
        reset: "重設",
        clear: "清空",
        delete: "刪除",
        undo: "復原",
        input: "輸入",
        output: "輸出",
        import: "匯入",
        export: "匯出",
        re_export: "重新匯出",
        more_info: "了解詳情",
        add: "添加",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移"
    },
    broadcast: {
        client: {
            type: {
                client: "未知用戶端",
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
                unknow: "未知終端"
            }
        }
    },
    config: {
        data_version: {
            _title: "資料版本",
            _description: "配置檔案的資料版本。"
        },
        global: {
            _title: "全域",
            _description: "一些影響全域的設定",
            language: {
                _title: "顯示語言",
                _description: "後台頁面的顯示語言。"
            },
            theme: {
                _title: "全域主題",
                _description: "控制對話框、歷史記錄等面向觀眾展示的介面主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。"
            },
            theme_script_enable: {
                _title: "啟用全域主題腳本",
                _description: "一些進階效果可能需要啟用主題腳本才能正常使用。目前所有預製主題均不包含腳本。<br>腳本中可以執行任意程式碼，請謹慎安裝需要您啟用腳本的第三方主題。"
            },
            color_scheme: {
                _title: "後台配色方案",
                _description: "控制後台介面的配色。可用的方案有 auto（跟隨系統）、light（淺色）和 dark（深色）。",
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
                _title: "列印速度",
                _description: "每個字元列印循環的延遲時間（毫秒），最小值為 4。"
            },
            html_format_enable: {
                _title: "啟用 HTML 過濾器",
                _description: "啟用此過濾器後，HTML 語義元素會被轉義，可以顯示多個連續空格。關閉此過濾器有腳本注入風險。"
            }
        },
        echolive: {
            _title: "Echo-Live",
            _description: "Echo-Live 相關配置",
            live_theme: {
                _title: "對話框主題",
                _description: "留空則使用全域主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。"
            },
            live_theme_script_enable: {
                _title: "啟用對話框主題腳本",
                _description: "此配置項需要啟用全域主題腳本才能生效。"
            },
            broadcast_enable: {
                _title: "啟用廣播",
                _description: "可透過編輯器直接發送消息，啟用此項將禁用消息輪詢。"
            },
            broadcast_channel: {
                _title: "廣播頻道",
                _description: "如果您不知道這是什麼請不要動它。"
            },
            websocket_enable: {
                _title: "啟用 WebSocket",
                _description: "如果沒人要求您這麼做，請不要動它。<br>廣播模式下啟用 WebSocket 可連線至伺服器以從第三方軟體獲取消息。<br>可從伺服器接收的消息和廣播消息一致，發送的消息須使用類似於 JSON.stringify 的方法序列化。<br>詳見<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>說明文件</a>。"
            },
            websocket_url: {
                _title: "WebSocket 連接地址",
                _description: "提供 WebSocket 連接的伺服器地址，使用 ws:// 協議頭。"
            },
            websocket_reconnect_limit: {
                _title: "WebSocket 最大重連嘗試次數",
                _description: "連接關閉和連線失敗將會嘗試重連，一旦超過重連嘗試次數限制將不再嘗試重連。"
            },
            experimental_api_enable: {
                _title: "啟用實驗性 API",
                _description: "實驗性 API 包含了一些危險操作，實現一些特殊功能可能是必要的，但如果使用不當可能會造成嚴重後果。<br>請開發者注意，如果您提供的產品需要啟用此實驗性 API，請務必說明您不得不這麼做的原因。<br>請使用者注意，如果您使用的第三方軟體要求您啟用實驗性 API 而未說明理由，非常不推薦您照做。"
            },
            messages_polling_enable: {
                _title: "啟用消息輪詢",
                _description: "定時監聽 start.js 的內容更改而無需手動重新整理，關閉則使用舊版手動操作。<br>啟用廣播將禁用此功能。"
            },
            messages_polling_tick: {
                _title: "消息輪詢間隔",
                _description: "單位：毫秒。值越小響應越快，性能消耗越高。"
            },
            sleep_enable: {
                _title: "啟用休眠機制",
                _description: "當頁面不可見時休眠以防止計時器失效所引發的災難性演出。<br>特別強調：如果您不了解這是什麼，請不要關閉它。<br>- 如果您只是想方便在瀏覽器中預覽而臨時關閉它，請一定不要忘記打開。"
            },
            sleep_during_printing_stop_print: {
                _title: "在列印期間休眠立即停止列印",
                _description: "防止計時器失效導致列印過程阻塞。"
            },
            print_audio_enable: {
                _title: "啟用打字音效",
                _description: "在每次輸出字元時播放音效。"
            },
            print_audio_name: {
                _title: "音效名稱",
                _description: "可用的音效名稱請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>說明文件</a>。"
            },
            print_audio_volume: {
                _title: "音效音量",
                _description: "1 為最大。"
            },
            print_audio_rate: {
                _title: "音效播放速度",
                _description: "1 為原速。"
            },
            next_audio_enable: {
                _title: "啟用新對話入場音效",
                _description: "在每條消息開始列印時播放音效。"
            },
            next_audio_name: {
                _title: "音效名稱",
                _description: "可用的音效名稱請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>說明文件</a>。"
            },
            next_audio_volume: {
                _title: "音效音量",
                _description: "1 為最大。"
            },
            next_audio_rate: {
                _title: "音效播放速度",
                _description: "1 為原速。"
            }
        },
        editor: {
            _title: "編輯器",
            _description: "編輯器相關配置",
            tabpage_config_enable: {
                _title: "顯示配置分頁",
                _description: "編輯器中的配置分頁用於控制輸出內容格式，僅編寫程式碼時有用。"
            },
            tabpage_output_enable: {
                _title: "顯示輸出分頁",
                _description: "編輯器生成的程式碼會在此分頁匯出。輸出分頁在廣播模式下還可以發送自訂消息。"
            },
            client_state_panel_enable: {
                _title: "顯示對話框狀態儀錶板",
                _description: "儀錶板可以顯示所有對話框的狀態，綠色為啟用，紅色為休眠，灰色則表示沒有對話框加入頻道。<br>如果您添加了多個對話框，建議您啟用此項。<br>如果您是紅綠色盲，請在無障礙設定中啟用紅綠色盲。<br>- 啟用後，藍色填充為啟用，藍色邊框為休眠。"
            },
            username_init: {
                _title: "初始說話人",
                _description: "編輯器啟動後在說話人輸入框中預設填充的內容。"
            },
            output_before: {
                _title: "在輸出內容前插入的內容",
                _description: "用於生成可執行的消息發送指令。"
            },
            ontput_before_enable: {
                _title: "啟用在輸出內容前插入內容",
                _description: ""
            },
            output_after: {
                _title: "在輸出內容後插入的內容",
                _description: "用於生成可執行的消息發送指令。"
            },
            ontput_after_enable: {
                _title: "啟用在輸出內容後插入內容",
                _description: ""
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
            palette: {
                _title: "啟用的色板",
                _description: "拾色器中有多種色板可供挑選。<br>預製的色板有 material、tailwindcss、ant_design 和 minecraft。<br>若要挑選啟用的色板或調整排序，請反選 “全部啟用”，並在下方文字框中輸入色板名稱，一行一個。",
                all_selected: "全部啟用"
            },
            palette_color_contrast_enable: {
                _title: "啟用 WCAG 顏色對比度測試",
                _description: "在拾色器中顯示顏色對比面板和 WCAG 顏色對比度測試結果。"
            },
            palette_color_contrast_background_color: {
                _title: "WCAG 顏色對比度測試面板參考背景色",
                _description: "僅支援十六進位制顏色碼。<br>請注意：背景色的 Alpha 通道會被忽略。<br>- 如果您的對話框背景顏色是半透明或全透明將無法正確計算對比度，請您自行採集混合後的背景顏色。"
            },
            palette_color_contrast_threshold: {
                _title: "WCAG 顏色對比度測試面板對比度參考閾值",
                _description: "對比度低於此值視為測試失敗。"
            }
        },
        history: {
            _title: "歷史記錄",
            _description: "面向觀眾展示的歷史記錄",
            history_theme: {
                _title: "歷史記錄主題",
                _description: "留空則使用全域主題。關於可用的主題請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>說明文件</a>。"
            },
            history_theme_script_enable: {
                _title: "啟用歷史記錄主題腳本",
                _description: "此配置項需要啟用全域主題腳本才能生效。"
            },
            message_list_reverse: {
                _title: "歷史記錄倒序排列",
                _description: "歷史記錄按照發送時間由新到舊排列。"
            },
            message_item_reverse: {
                _title: "歷史記錄布局左右翻轉",
                _description: "翻轉後的排列從左到右依次是：發送時間、消息內容、說話人。"
            },
            display_username: {
                _title: "顯示說話人",
                _description: "在歷史記錄中顯示說話人。"
            },
            display_time: {
                _title: "顯示發送時間",
                _description: "在歷史記錄中顯示發送時間。"
            },
            remove_continuous_duplicate: {
                _title: "去除連續的重複消息",
                _description: "如果場景中有多個對話框同時接收消息，啟用此項可避免重複記錄歷史消息。"
            },
            latest_message_hide: {
                _title: "隱藏最新的歷史記錄",
                _description: "對話框在開始列印消息時會立即發送消息到歷史記錄中，啟用此項可避免最新消息立即顯示在歷史記錄中。"
            }
        },
        accessible: {
            _title: "無障礙",
            _description: "無障礙相關配置",
            high_contrast: {
                _title: "啟用高對比度",
                _description: "提高後台頁面的對比度，並對焦點元素顯示突顯邊框。"
            },
            high_contrast_outline_color: {
                _title: "焦點突顯邊框顏色",
                _description: "焦點元素將會顯示一個醒目邊框。此配置可更改其顏色。"
            },
            high_contrast_outline_size: {
                _title: "焦點突顯邊框尺寸",
                _description: "焦點元素邊框的寬度。"
            },
            high_contrast_outline_style: {
                _title: "焦點突顯邊框樣式",
                _description: "焦點元素邊框的樣式，可以是 solid、dotted、dashed 或 double。"
            },
            drotanopia_and_deuteranopia: {
                _title: "紅綠色盲",
                _description: "綠色（安全）功能色會以藍色（通用）代替，以便和功能差異較大的黃色（警告）和紅色（危險）作出區分。"
            }
        },
        advanced: {
            _title: "進階設定",
            _description: "一些複雜的設定",
            _warn: "警告：除非您知道您在幹什麼，否則請不要動這裡的設定。",
            broadcast: {
                _title: "廣播",
                _description: "廣播的進階設定",
                allow_name_duplicate: {
                    _title: "允許識別名重複",
                    _description: "允許終端識別名出現重複，這可能會引發意料之外的情況。"
                }
            },
            editor: {
                _title: "編輯器",
                _description: "編輯器的進階設定",
                history_minimum_breaker_threshold: {
                    _title: "歷史記錄底部游標熔斷閾值",
                    _description: "設為 -1 可禁用此機制。"
                }
            }
        },
        about: {
            _title: "關於",
            _description: "軟體資訊",
            about_echolive: "關於 Echo-Live",
            accessibility: "無障礙使用指南",
            bug_tracker: "漏洞追蹤",
            community: "社群服務",
            copyright: "授權協議與宣告",
            document: "說明文件",
            feedback: "建議回饋",
            github: "GitHub 項目倉庫",
            license: "開源授權條款",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "報告安全漏洞",
            social_media: "社交媒體",
            user_guide: "使用者指南"
        }
    },
    editor: {
        client_state: {
            active: "啟用",
            none: "未加入",
            sleep: "休眠"
        },
        client_state_panel: {
            tip: "用戶端狀態：{client}，Echo 狀態：{echo}。",
            tip_more_messages: "用戶端狀態：{client}，Echo 狀態：{echo}。點擊此處可列印下一條消息。"
        },
        echo_state: {
            play: "列印中",
            ready: "就緒",
            stop: "停止"
        },
        form: {
            text_length: "{n} 字元",
            aria_label: {
                content_plain_text: "純文字內容編輯框",
                log_box: "這裡是日誌列表，如果您聽到了這句話，請注意，這裡的閱讀體驗可能會很差。",
                output_content: "輸出內容編輯框"
            },
            description: {
                formatting_code_example_1: "@b - 粗體，@i - 斜體，@u - 下劃線，@s - 刪除線，@r - 清除格式",
                formatting_code_example_2: "範例：這裡沒有格式。@b這裡有粗體。@i這裡有粗體和斜體。@r這裡沒有格式。@[#66ccff]這是藍色。",
                output_after: "在輸出內容之後插入尾部內容",
                output_before: "在輸出內容之前插入頭部內容",
                print_speed: "每個列印循環的延遲時間（毫秒），預設為 30。數字越大，耗時越長。中日韓字元延遲 × 2。",
                print_speed_custom: "每個列印循環的延遲時間（毫秒），預設為 30，您的預設配置為 {value}。數字越大，耗時越長。中日韓字元延遲 × 2。",
                quote: "自動在每一句話開頭和結尾添加引用符號，Echo Live 會為一些引用符號自動縮排。"
            },
            label: {
                character: "說話人",
                content: "內容",
                live_client_state: "對話框狀態",
                output_after: "尾部內容",
                output_before: "頭部內容",
                output_content: "輸出內容",
                print_speed: "列印速度",
                quote: "引用符號",
                quote_after: "結尾",
                quote_before: "開頭",
                startup_parameter: "啟動參數",
                use_formatting_code: "使用快速格式化程式碼"
            }
        },
        format: {
            clear: "清除格式",
            color: "文字顏色",
            bold: "粗體",
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
        log: {
            index: "日誌",
            welcome: "歡迎使用 Echo-Live！如需查閱說明文件，請見：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessible: {
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
                echo_next: "收到來自其他服務端的指令：列印下一條消息。",
                echo_next_from_self_to_target: "已指令 {name} 列印下一條消息。",
                hello: "{client} 進入廣播頻道，識別名：{name}",
                hello_hidden: "{client} 進入廣播頻道，已休眠，識別名：{name}",
                hello_to_server: "{client} 已向 Websocket 伺服器發送 HELLO 消息，識別名：{name}",
                message_data_third: "收到來自其他服務端的消息資料。",
                page_hidden: "{client} 因不可見已休眠，識別名：{name}",
                page_visible: "{client} 已喚醒，識別名：{name}",
                ping_server: "有其他服務端加入頻道，識別名：{name}",
                set_theme_style_url: "收到來自其他服務端的指令：設定主題樣式文件 URL 為 {url}",
                set_theme: "收到來自其他服務端的指令：設定主題為 {name}",
                websocket_close: "收到來自其他服務端的指令：關閉 Websocket 連接。此指令將阻止 {client} 嘗試重連。"
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
                empty_data: "消息內容無有效資料，未發送任何消息。",
                empty_messages: "發送的消息中沒有消息佇列，這是一個錯誤的消息格式。雖然這麼操作似乎不會引發嚴重問題，但不建議這麼操作。",
                illegal: "發送的消息格式存在錯誤。詳見說明文件：https://sheep-realms.github.io/Echo-Live-Doc/message/",
                resent: "已再次發送歷史消息。",
                sent: "已發送純文字消息：{msg}",
                sent_custom: "已發送自訂消息：{msg}",
                sent_custom_multi: "已發送 {n} 條自訂消息，首條消息為：{msg}"
            },
            tip: {
                unknown_error: "看來您可能遇到了一些問題。如果您確實覺得有什麼不對勁，請複製此日誌內容回饋給開發者，並詳細描述復現過程。"
            },
            warn: {
                no_client: "沒有用戶端響應，請檢查您是否正確打開或安裝了 Echo-Live。如果您的操作正確，則可能是因為 OBS 中所有源均處於不可見狀態。"
            }
        },
        palette: {
            index: "拾色器",
            empty: "我操？！你在幹什麼？我放在這裡那麼大一個調色板呢？還好我技高一籌給你兜住了！",
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
            }
        },
        tabpage: {
            broadcast: {
                title: "廣播",
                description: "廣播控制 [alt+5]"
            },
            config: {
                title: "配置",
                description: "編輯配置 [alt+3]"
            },
            editor: {
                title: "編輯器",
                description: "文字編輯器 [alt+1]"
            },
            history: {
                title: "歷史記錄",
                description: "已發送消息的列表"
            },
            log: {
                title: "日誌",
                description: "執行日誌 [alt+6]"
            },
            output: {
                title: "輸出",
                description: "輸出代碼 [alt+4]"
            },
            output_content: {
                title: "輸出內容",
                description: "編輯匯出程式碼和發送消息"
            }
        },
        tip: {
            hot_key_textarea_quick_send: "當焦點在此文字框中時，可以按下 Ctrl + Enter 快速發送"
        }
    },
    file: {
        name: "檔案名",
        last_modified_date: "最後修改時間",
        size: "檔案大小",
        checker: {
            default_file_loaded: "預設路徑中的配置檔案已載入",
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
            drop_file_cancel_many: "一位使用者反覆拖曳文件，這是他的程式發生的變化",
            drop_file_long_time: "你怎麼還不放手？",
            drop_file_now: "鬆開滑鼠拖放文件",
            please_drop_file: "在這裡拖放文件或點擊此處選擇文件",
            please_drop_file_keyboard: "當焦點在此處時，您也可以按下 Enter 或空白鍵選擇文件"
        },
        picker: {
            config: "配置檔案"
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
        settings: "Echo Live 配置檔案編輯器"
    },
    settings: {
        unknow_config_type: "暫不支援修改此配置",
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
                title: "不要在 OBS 中打開此頁面",
                description: "這會產生一些意料之外的問題，並且您完全沒有必要將這個頁面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "處理不了那麼多文件，請一個一個來。"
            },
            no_json: {
                title: "找不到配置資料",
                description: "無法在此文件中找到配置資料。"
            },
            type_error: {
                title: "文件類型錯誤",
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
            update_config_from_unknow_version: {
                title: "未知的配置檔案版本",
                description: "此配置檔案沒有版本號，可能來自於 1.2.7 之前的版本。<br>您可以強制升級此配置檔案，但並不能保證其正常運作，不建議您繼續使用此配置檔案。",
                update: "強制更新"
            },
            use_chrome: {
                title: "建議您使用最新版 Chrome 瀏覽器",
                description: "此頁面使用了一些最新技術，您的瀏覽器可能無法支援部分功能。<br>當然您也可以試試 Edge 瀏覽器。",
                goto: "獲取 Chrome"
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
            accessibility: "Echo-Live 所有後台頁面均支援鍵盤訪問。<br>更多有關無障礙使用的幫助請見<a href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>說明文件</a>。",
            advanced_settings: "不要隨意更改這裡的配置，除非您知道您在做什麼。"
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
    }
};