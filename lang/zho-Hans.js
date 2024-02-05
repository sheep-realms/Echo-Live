const lang_zho_Hans = {
    lang: {
        code_iso_639_3: "zho-Hans",
        code_ietf: "zh-Hans",
        title: "简体中文"
    },
    ui: {
        confirm: "确认",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "保存",
        close: "关闭",
        edit: "编辑",
        send: "发送",
        reset: "重置",
        clear: "清空",
        input: "输入",
        output: "输出",
        more_info: "了解详情"
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
            active: "激活",
            sleep: "休眠",
        },
        form: {
            text_length: "{n} 字符",
            aria_label: {
                content_plain_text: "纯文本内容编辑框",
                log_box: "这里是日志列表，如果您听到了这句话，请注意，这里的阅读体验可能会很差。",
                output_content: "输出内容编辑框"
            },
            description: {
                formatting_code_example_1: "@b - 粗体，@i - 斜体，@u - 下划线，@s - 删除线，@r - 清除格式",
                formatting_code_example_2: "示例：这里没有格式。@b这里有粗体。@i这里有粗体和斜体。@r这里没有格式。@[#66ccff]这是蓝色。",
                output_after: "在输出内容之后插入尾部内容",
                output_before: "在输出内容之前插入头部内容",
                print_speed: "每个打印循环的延迟时间（毫秒），默认为 30。数字越大，耗时越长。中日韩字符延迟 × 2。",
                print_speed_custom: "每个打印循环的延迟时间（毫秒），默认为 30，您的默认配置为 {value}。数字越大，耗时越长。中日韩字符延迟 × 2。",
                quote: "自动在每一句话开头和结尾添加引用符号，Echo Live 会为一些引用符号自动缩进。"
            },
            label: {
                character: "说话人",
                content: "内容",
                live_client_state: "对话框状态",
                output_after: "尾部内容",
                output_before: "头部内容",
                output_content: "输出内容",
                print_speed: "打印速度",
                quote: "引用符号",
                quote_after: "结尾",
                quote_before: "开头",
                startup_parameter: "启动参数",
                use_formatting_code: "使用快速格式化代码"
            }
        },
        format: {
            clear: "清除格式",
            color: "文本颜色",
            bold: "粗体",
            italic: "斜体",
            underline: "下划线",
            strikethrough: "删除线"
        },
        history: {
            clear: "清空历史记录",
            clear_confirm: "确认清空",
            messages_more: "... 等 {n} 条消息",
            resent_at: "（于 {time} 再次发送）"
        },
        log: {
            index: "日志",
            welcome: "欢迎使用 Echo-Live！如需查阅帮助文档，请见：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessible: {
                type: {
                    dbug: "调试：",
                    done: "完成：",
                    erro: "错误：",
                    info: "信息：",
                    tips: "提示：",
                    warn: "警告："
                }
            },
            broadcast: {
                close: "{client} 离开广播频道，UUID：{uuid}",
                echo_next: "收到来自其他服务端的命令：打印下一条消息。",
                hello: "{client} 进入广播频道，UUID：{uuid}",
                hello_hidden: "{client} 进入广播频道，已休眠，UUID：{uuid}",
                hello_to_server: "{client} 已向 Websocket 服务器发送 HELLO 消息，UUID：{uuid}",
                message_data_third: "收到来自其他服务端的消息数据。",
                page_hidden: "{client} 因不可见已休眠，UUID：{uuid}",
                page_visible: "{client} 已唤醒，UUID：{uuid}",
                ping_server: "有其他服务端加入频道，UUID：{uuid}",
                set_theme_style_url: "收到来自其他服务端的命令：设置主题样式文件 URL 为 {url}",
                set_theme: "收到来自其他服务端的命令：设置主题为 {name}",
                websocket_close: "收到来自其他服务端的命令：关闭 Websocket 连接。此命令将阻止 {client} 尝试重连。"
            },
            broadcast_launch: {
                disable: "未开启广播模式，无日志显示。",
                done: "广播模式已开启：{channel}",
                user_agent_check: "编辑器已正确安装在 OBS 中！",
                user_agent_error: "您似乎并未正确在 OBS 中安装此编辑器，详见：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/",
            },
            error: {
                websocket_error: "{client} Websocket 连接 {url} 出错，进行第 {n} 次重连，UUID：{uuid}",
                websocket_error_retry_failed: "{client} Websocket 连接 {url} 出错，重连次数超出限制，UUID：{uuid}",
                websocket_message_error: "{client} Websocket 接收到的消息解析出错，UUID：{uuid}"
            },
            message: {
                empty: "未输入内容，未发送任何消息。",
                empty_data: "消息内容无有效数据，未发送任何消息。",
                empty_messages: "发送的消息中没有消息队列，这是一个错误的消息格式。虽然这么操作似乎不会引发严重问题，但不建议这么操作。",
                illegal: "发送的消息格式存在错误。详见帮助文档：https://sheep-realms.github.io/Echo-Live-Doc/message/",
                resent: "已再次发送历史消息。",
                sent: "已发送纯文本消息：{msg}",
                sent_custom: "已发送自定义消息：{msg}",
                sent_custom_multi: "已发送 {n} 条自定义消息，首条消息为：{msg}"
            },
            warn: {
                no_client: "没有客户端响应，请检查您是否正确打开或安装了 Echo-Live。如果您的操作正确，则可能是因为 OBS 中所有源均处于不可见状态。"
            }
        },
        palette: {
            index: "拾色器",
            empty: "卧槽？！你在干什么？我放在这里那么大一个调色板呢？还好我技高一筹给你兜住了！",
            select: "色板库",
            accessible: {
                tip: "需要无障碍使用帮助吗？"
            },
            diff_dashboard: {
                index: "对比度测试面板",
                background_color: "背景色",
                foreground_color: "前景色",
                result: {
                    contrast: "对比度参考阈值",
                    wcag_aa: "WCAG AA",
                    wcag_aaa: "WCAG AAA"
                },
                state: {
                    ok: "{name} 测试通过",
                    fail: "{name} 测试失败"
                }
            }
        },
        tabpage: {
            broadcast: {
                title: "广播",
                description: "广播控制 [alt+5]"
            },
            config: {
                title: "配置",
                description: "编辑配置 [alt+3]"
            },
            editor: {
                title: "编辑器",
                description: "文本编辑器 [alt+1]"
            },
            history: {
                title: "历史记录",
                description: "已发送消息的列表"
            },
            log: {
                title: "日志",
                description: "运行日志 [alt+6]"
            },
            output: {
                title: "输出",
                description: "输出代码 [alt+4]"
            },
            output_content: {
                title: "输出内容",
                description: "编辑导出代码和发送消息"
            }
        },
        tip: {
            hot_key_textarea_quick_send: "当焦点在此文本框中时，可以按下 Ctrl + Enter 快速发送"
        }
    },
    message_preview: {
        empty_message: "[空消息]",
        empty_username: "[未指定说话人]",
        undefined_message: "[未定义消息]"
    }
};