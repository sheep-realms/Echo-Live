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
        close: "關閉",
        edit: "編輯",
        send: "發送",
        reset: "重置",
        clear: "清空",
        input: "輸入",
        output: "輸出",
        more_info: "了解詳情"
    },
    broadcast: {
        client: {
            type: {
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
            }
        }
    },
    editor: {
        client_state: {
            active: "啟動",
            sleep: "休眠",
        },
        form: {
            text_length: "{n} 字符",
            aria_label: {
                content_plain_text: "純文本內容編輯框",
                log_box: "這裏是日誌列表，如果您聽到了這句話，請注意，這裏的閲讀體驗可能會很差。",
                output_content: "輸出內容編輯框"
            },
            description: {
                formatting_code_example_1: "@b - 粗體，@i - 斜體，@u - 下劃線，@s - 刪除線，@r - 清除格式",
                formatting_code_example_2: "示例：這裏沒有格式。@b這裏有粗體。@i這裏有粗體和斜體。@r這裏沒有格式。@[#66ccff]這是藍色。",
                output_after: "在輸出內容之後插入尾部內容",
                output_before: "在輸出內容之前插入頭部內容",
                print_speed: "每個打印循環的延遲時間（毫秒），默認為 30。數字越大，耗時越長。中日韓字符延遲 × 2。",
                print_speed_custom: "每個打印循環的延遲時間（毫秒），默認為 30，您的默認配置為 {value}。數字越大，耗時越長。中日韓字符延遲 × 2。",
                quote: "自動在每一句話開頭和結尾添加引用符號，Echo Live 會為一些引用符號自動縮進。"
            },
            label: {
                character: "説話人",
                content: "內容",
                live_client_state: "對話框狀態",
                output_after: "尾部內容",
                output_before: "頭部內容",
                output_content: "輸出內容",
                print_speed: "打印速度",
                quote: "引用符號",
                quote_after: "結尾",
                quote_before: "開頭",
                startup_parameter: "啟動參數",
                use_formatting_code: "使用快速格式化代碼"
            }
        },
        format: {
            clear: "清除格式",
            color: "文本顏色",
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
            welcome: "歡迎使用 Echo-Live！如需查閲幫助文檔，請見：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessible: {
                type: {
                    dbug: "調試：",
                    done: "完成：",
                    erro: "錯誤：",
                    info: "資訊：",
                    tips: "提示：",
                    warn: "警吿："
                }
            },
            broadcast: {
                close: "{client} 離開廣播頻道，UUID：{uuid}",
                echo_next: "收到來自其他服務端的命令：打印下一條消息。",
                hello: "{client} 進入廣播頻道，UUID：{uuid}",
                hello_hidden: "{client} 進入廣播頻道，已休眠，UUID：{uuid}",
                hello_to_server: "{client} 已向 Websocket 伺服器發送 HELLO 消息，UUID：{uuid}",
                message_data_third: "收到來自其他服務端的消息數據。",
                page_hidden: "{client} 因不可見已休眠，UUID：{uuid}",
                page_visible: "{client} 已喚醒，UUID：{uuid}",
                ping_server: "有其他服務端加入頻道，UUID：{uuid}",
                set_theme_style_url: "收到來自其他服務端的命令：設置主題樣式文件 URL 為 {url}",
                set_theme: "收到來自其他服務端的命令：設置主題為 {name}",
                websocket_close: "收到來自其他服務端的命令：關閉 Websocket 連接。此命令將阻止 {client} 嘗試重連。"
            },
            broadcast_launch: {
                disable: "未開啟廣播模式，無日誌顯示。",
                done: "廣播模式已開啟：{channel}",
                user_agent_check: "編輯器已正確安裝在 OBS 中！",
                user_agent_error: "您似乎並未正確在 OBS 中安裝此編輯器，詳見：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/",
            },
            error: {
                websocket_error: "{client} Websocket 連接 {url} 出錯，進行第 {n} 次重連，UUID：{uuid}",
                websocket_error_retry_failed: "{client} Websocket 連接 {url} 出錯，重連次數超出限制，UUID：{uuid}",
                websocket_message_error: "{client} Websocket 接收到的消息解析出錯，UUID：{uuid}"
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
            warn: {
                no_client: "沒有客户端響應，請檢查您是否正確打開或安裝了 Echo-Live。如果您的操作正確，則可能是因為 OBS 中所有源均處於不可見狀態。"
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
                description: "文本編輯器 [alt+1]"
            },
            history: {
                title: "歷史記錄",
                description: "已發送消息的列表"
            },
            log: {
                title: "日誌",
                description: "運行日誌 [alt+6]"
            },
            output: {
                title: "輸出",
                description: "輸出代碼 [alt+4]"
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
    message_preview: {
        empty_message: "[空消息]",
        empty_username: "[未指定説話人]",
        undefined_message: "[未定義消息]"
    }
};