const lang_zho_Hans = {
    lang: {
        code_iso_639_3: "zho-Hans",
        code_ietf: "zh-Hans",
        title: "简体中文"
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
        spacing: {
            number_compact: " ",
            compact_unit: "",
            unit_suffix: "",
        }
    },
    ui: {
        confirm: "确定",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "保存",
        save_as: "另存为",
        staging: "暂存",
        close: "关闭",
        off: "关闭",
        on: "开启",
        disable: "禁用",
        enable: "启用",
        enable_all: "全部启用",
        edit: "编辑",
        send: "发送",
        reset: "重置",
        clear: "清空",
        delete: "删除",
        undo: "撤销",
        input: "输入",
        output: "输出",
        import: "导入",
        export: "导出",
        re_export: "重新导出",
        more_info: "了解详情",
        add: "添加",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移",
        audition: "试听",
        download: "下载",
        search: "搜索",
        empty: "（空）",
        default: "默认",
        missingno: {
            no_author: "未署名",
            no_name: "未命名"
        }
    },
    unit: {
        char: "字",
        count: "次",
        day: "天",
        long_sec: "{m} 分钟 {s} 秒 | {h} 小时 {m} 分钟 {s} 秒 | {d} 天 {h} 小时 {m} 分钟 {s} 秒",
        ms: "毫秒",
        rate: "%",
        sec: "秒"
    },
    avatar: {
        common: {
            action: {
                angry: "愤怒",
                awkward: "尴尬",
                cry: "哭",
                doubt: "疑惑",
                laugh: "笑",
                idle: "闲置",
                missingno: "动作丢失",
                panic: "惊恐",
                screaming: "大叫",
                shaded: "黑脸",
                shy: "害羞",
                smile: "微笑"
            },
            scene: {
                bust: "半身",
                face: "头像",
                face_cu: "脸部特写",
                full: "全身",
                heel: "足上",
                knee: "膝上",
                long: "远景"
            }
        },
        echo_otone: {
            name: "Echo 追音",
            description: "Echo 追音（<span lang='ja'>エコー追音</span>）是一位活泼可爱的少女，乐于倾听各种声音，解读各种文字，帮助人们建立沟通的桥梁，并以自己喜欢的方式传播自己的所见所闻。",
            license: "Echo-Live 虚拟形象 “Echo 追音” 授权协议"
        }
    },
    border_style: {
        none: "无",
        solid: "实线",
        dashed: "虚线",
        dotted: "点线",
        double: "双实线",
        groove: "凹槽",
        ridge: "凸脊",
        inset: "嵌入",
        outset: "突出"
    },
    broadcast: {
        client: {
            type: {
                character: "Echo Live Character",
                client: "未知客户端",
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
                unknown: "未知终端"
            }
        }
    },
    character: {
        avatar_switch_effect: {
            none: "无",
            fade_in: "淡入"
        }
    },
    command: {
        common: {
            fail: {
                exceed_maximum_value: "逻辑错误：'{n}' 太大了，最大只能为 {max}",
                exceed_minimum_value: "逻辑错误：'{n}' 太小了，最小只能为 {min}",
                invalid_json: "语法错误：无效的 JSON",
                invalid_key_name: "语法错误：'{name}' 不是一个有效的键名",
                invalid_number: "语法错误：无效的数字",
                missing_parameter: "语法错误：缺少必要参数",
                unknown_option: "语法错误：不存在名为 '{name}' 的选项",
                not_broadcast: "运行失败：广播未启动"
            },
            label: {
                function_mode: "函数模式"
            },
            success: {
                broadcast_everyone: "已广播 {action} 消息",
                broadcast_target: "已发送 {action} 消息至 {name}",
                function: "已执行函数中的 {n} 条命令",
                function_fail_item: "- 第 {line} 行：{reason}",
                function_has_fail: "已执行函数中的 {n} 条命令，失败 {fail} 条，失败原因为："
            }
        },
        clearlocalstorage: {
            success: "请在弹出对话框中确认清除本地存储数据"
        },
        getlang: {
            success: {
                code: "当前语言的 ISO 639-3 代码为：{ @lang.code_iso_639_3 }",
                ietf: "当前语言的 IETF 代码为：{ @lang.code_ietf }",
                name: "当前语言的名称为：{ @lang.title }"
            }
        },
        var: {
            success: {
                del: "已删除 {stack} 堆中变量 {name}",
                get: "{stack} 堆中变量 {name} 的值为 {value}",
                set: "已设置 {stack} 堆中变量 {name} 的值为 {value}"
            },
            fail: {
                var_undefined: "{stack} 堆中变量 {name} 未定义"
            }
        }
    },
    config: {
        data_version: {
            _title: "数据版本",
            _description: "配置文件的数据版本。"
        },
        search: {
            _title: "搜索",
            _description: "搜索所有配置项",
            label: {
                search: "搜索配置项"
            },
            aria_label: {
                result: "搜索结果{index}：{title}",
                result_has_group: "搜索结果{index}：{group}，{title}"
            }
        },
        global: {
            _title: "全局",
            _description: "一些影响全局的设置",
            language: {
                _title: "界面语言",
                _description: "后台页面的界面语言。"
            },
            theme: {
                _title: "全局主题",
                _description: "控制对话框、历史记录等面向观众展示的界面主题。关于可用的主题请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>帮助文档</a>。<br>为了主题样式的表现正常，请在 OBS 选中对话框（包括历史记录在内的其他前台页面），右键，在弹出菜单中找到 “混合方式”，选择 “关闭 sRGB”。"
            },
            theme_variant: {
                _title: "全局主题变体",
                _description: "一些主题具有多种样式变体，如更换配色方案、调整不透明度等。留空则使用默认样式。<br>您还可以使用场景属性实现在不同的场景中使用不同的样式，详见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/#scene-attribute' target='_blank'>帮助文档</a>。"
            },
            theme_script_enable: {
                _title: "启用全局主题脚本",
                _description: "一些高级效果可能需要启用主题脚本才能正常使用。目前所有预制主题均不包含脚本。<br>脚本中可以执行任意代码，请谨慎安装需要您启用脚本的第三方主题。"
            },
            color_scheme: {
                _title: "后台配色方案",
                _description: "控制后台界面的配色。",
                _value: {
                    auto: "跟随系统",
                    dark: "深色",
                    light: "浅色"
                }
            },
            touchscreen_layout: {
                _title: "启用触屏布局",
                _description: "使用更大尺寸的布局以方便触屏操作。"
            },
            controller_layout_reverse: {
                _title: "反转控制器按钮布局",
                _description: "根据阅读方向将重要按钮放置于最先被阅读的位置。"
            },
            thin_scrollbar: {
                _title: "启用细滚动条",
                _description: "使用较细的滚动条替换默认滚动条。"
            },
            live_font_weight: {
                _title: "前台默认字重",
                _description: "前台页面的默认字重，可被主题的样式设置或消息格式覆盖。"
            }
        },
        echo: {
            _title: "Echo",
            _description: "Echo 相关配置",
            print_speed: {
                _title: "打印速度",
                _description: "每个字符打印循环的延迟时间（毫秒），最小值为 4。"
            },
            html_format_enable: {
                _title: "启用 HTML 过滤器",
                _description: "启用此过滤器后，HTML 语义元素会被转义，可以显示多个连续空格。关闭此过滤器有脚本注入风险。"
            }
        },
        echolive: {
            _title: "Echo-Live",
            _description: "Echo-Live 相关配置",
            style: {
                _title: "主题样式",
                _description: "设置对话框的样式",
                live_theme: {
                    _title: "对话框主题",
                    _description: "留空则使用全局主题。关于可用的主题请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>帮助文档</a>。"
                },
                live_theme_variant: {
                    _title: "对话框主题变体",
                    _description: "留空则使用全局主题变体。"
                },
                live_theme_script_enable: {
                    _title: "启用对话框主题脚本",
                    _description: "此配置项需要启用全局主题脚本才能生效。"
                }
            },
            layout: {
                _title: "布局",
                _description: "对话框的内容布局",
                username_text_align_right: {
                    _title: "说话人靠右对齐",
                    _description: "将说话人一栏靠向对话框右侧。"
                },
                diplay_controller: {
                    _title: "显示控制栏",
                    _description: "显示对话框底部的 “SAVE”、“LOAD” 等模拟按钮。"
                },
                controller: {
                    _title: "控制栏内容",
                    _description: "控制栏中的模拟按钮，可以由文字和图标组成。"
                }
            },
            broadcast: {
                _title: "广播",
                _description: "Echo-Live 的基本工作模式",
                enable: {
                    _title: "启用广播",
                    _description: "可通过编辑器直接发送消息，启用此项将禁用消息轮询。"
                },
                channel: {
                    _title: "广播频道",
                    _description: "如果您不知道这是什么请不要动它。"
                },
                websocket_enable: {
                    _title: "启用 WebSocket",
                    _description: "如果没人要求您这么做，请不要动它。<br>广播模式下启用 WebSocket 可连接至服务器以从第三方软件获取消息。<br>可从服务器接收的消息和广播消息一致，发送的消息须使用类似于 JSON.stringify 的方法序列化。<br>详见<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>帮助文档</a>。"
                },
                websocket_url: {
                    _title: "WebSocket 连接地址",
                    _description: "提供 WebSocket 连接的服务器地址，使用 ws:// 或 wss:// 协议头。"
                },
                websocket_reconnect_limit: {
                    _title: "WebSocket 最大重连尝试次数",
                    _description: "连接关闭和连接失败将会尝试重连，一旦超过重连尝试次数限制将不再尝试重连。"
                },
                experimental_api_enable: {
                    _title: "启用实验性 API",
                    _description: "实验性 API 包含了一些危险操作，实现一些特殊功能可能是必要的，但如果使用不当可能会造成严重后果。<br>请开发者注意，如果您提供的产品需要启用此实验性 API，请务必说明您不得不这么做的原因。<br>请用户注意，如果您使用的第三方软件要求您启用实验性 API 而未说明理由，非常不推荐您照做。"
                }
            },
            messages_polling: {
                _title: "消息轮询",
                _description: "早期版本中广播系统的替代",
                enable: {
                    _title: "启用消息轮询",
                    _description: "定时监听 start.js 的内容更改而无需手动刷新，关闭则使用旧版手动操作。<br>启用广播将禁用此功能。"
                },
                tick: {
                    _title: "消息轮询间隔",
                    _description: "值越小响应越快，性能消耗越高。"
                },
            },
            sleep: {
                _title: "休眠机制",
                _description: "页面不可见时使对话框休眠",
                enable: {
                    _title: "启用休眠机制",
                    _description: "当页面不可见时休眠以防止计时器失效所引发的灾难性演出。<br>特别强调：如果您不了解这是什么，请不要关闭它。<br>- 如果您只是想方便在浏览器中预览而临时关闭它，请一定不要忘记打开。"
                },
                during_printing_stop_print: {
                    _title: "在打印期间休眠立即停止打印",
                    _description: "防止计时器失效导致打印过程阻塞。"
                },
            },
            print_audio: {
                _title: "打印音效",
                _description: "在每次输出字符时播放音效",
                enable: {
                    _title: "启用打印音效",
                    _description: ""
                },
                name: {
                    _title: "打印音效",
                    _description: "选择您喜欢的打印音效。"
                },
                volume: {
                    _title: "音效音量",
                    _description: "1 为最大。"
                },
                rate: {
                    _title: "音效播放速度",
                    _description: "1 为原速。"
                }
            },
            next_audio: {
                _title: "新对话入场音效",
                _description: "在每条消息开始打印时播放音效",
                enable: {
                    _title: "启用新对话入场音效",
                    _description: ""
                },
                name: {
                    _title: "入场音效",
                    _description: "选择您喜欢的入场音效。"
                },
                volume: {
                    _title: "音效音量",
                    _description: "1 为最大。"
                },
                rate: {
                    _title: "音效播放速度",
                    _description: "1 为原速。"
                }
            },
            print_effect: {
                _title: "字符打印动效",
                _description: "打印每个字符时所使用的动画效果",
                name: {
                    _title: "打印动效",
                    _description: "选择您喜欢的打印动效。<br>请注意：消息格式中的一些高级动效可能会覆盖字符打印动效。如果您需要使用这些高级动效，建议您关闭字符打印动效。"
                },
                duration: {
                    _title: "动效用时",
                    _description: "播放动画所需时间。"
                },
                scale: {
                    _title: "动效规模乘数",
                    _description: "动画的运动幅度乘数。"
                },
                timing_function: {
                    _title: "动效时间曲线",
                    _description: "动画在不同时间段的运动速度。"
                }
            },
            display: {
                _title: "隐去与显现动画",
                _description: "调整对话框的隐去与显现动画的参数",
                auto: {
                    _title: "闲置时自动隐去",
                    _description: "启用后，对话框会在保持没有任何动作一段时间后自动隐去。"
                },
                hidden_wait_time: {
                    _title: "闲置等候时间",
                    _description: "进入闲置状态的最小等候时间。"
                },
                long_text_compensation_rate: {
                    _title: "长文本等候时间补偿率",
                    _description: "当消息文本过长时会额外补偿一些等候时间，设为 0 则禁用。"
                },
                hidden_time: {
                    _title: "隐去动画用时",
                    _description: "对话框隐去所需时间。"
                },
                show_time: {
                    _title: "显现动画用时",
                    _description: "对话框显现所需时间。"
                }
            },
            speech_synthesis: {
                _title: "讲述人",
                _description: "使用系统语音合成接口读出消息内容",
                enable: {
                    _title: "启用讲述人",
                    _description: ""
                },
                voice: {
                    _title: "语音资源",
                    _description: "在这里选择可用的语音资源，留空则使用系统默认值。<br>如果没有下拉列表，则说明没有本地语音资源可用。<br>当所选择的值不可用时，将使用系统默认值。"
                },
                pitch: {
                    _title: "音高",
                    _description: "1 为基准音高。"
                },
                rate: {
                    _title: "语速",
                    _description: "1 为基准速度。"
                },
                delay: {
                    _title: "延迟",
                    _description: "在消息发出后延迟读出。"
                },
                speech_emoji: {
                    _title: "读出表情符号",
                    _description: "启用后讲述人将会读出消息中的 emoji 符号和表情图片的描述。<br>其它特殊符号不受影响。"
                },
                ignored_characters: {
                    _title: "忽略的字符",
                    _description: "指定一些字符不会被讲述人读出。"
                }
            },
            image: {
                _title: "图片",
                _description: "对话框消息中显示的图片",
                enable: {
                    _title: "启用图片",
                    _description: "启用后可以在消息中插入图片。"
                },
                allow_data_url_and_relative_url: {
                    _title: "允许 Data URL 和相对地址",
                    _description: "允许使用 Data URL 格式传输图片和使用相对地址。<br>禁用将无法在编辑器中通过导入文件设置图片，且只能使用 http(s):// 和 file:/// 协议头的地址。<br>特别提醒：不要导入大得离谱的图片！"
                },
                default_max_size: {
                    _title: "默认最大图片尺寸",
                    _description: "控制图片在对话框中的默认最大尺寸。单位：em（相对于字符尺寸的长度单位）。"
                }
            },
            filter: {
                _title: "过滤器",
                _description: "控制消息过滤器的状态",
                enable: {
                    _title: "启用过滤器",
                    _description: "启用后，Echo-Live 会在收到消息时运行已注册的过滤器。"
                },
                duplicate_chinese_mood_symbol_slice_enable: {
                    _title: "连续重复的中文语气符号切片过滤器",
                    _description: "将连续重复的中文语气符号切分为不连续的语义单元，以修复连续使用符号产生意外折行的问题。"
                }
            }
        },
        editor: {
            _title: "编辑器",
            _description: "编辑器相关配置",
            function: {
                _title: "功能",
                _description: "编辑器中的功能",
                tabpage_config_enable: {
                    _title: "显示配置标签页",
                    _description: "编辑器中的配置标签页用于控制输出内容格式，仅编写代码时有用。"
                },
                tabpage_output_enable: {
                    _title: "显示输出标签页",
                    _description: "编辑器生成的代码会在此标签页导出。输出标签页在广播模式下还可以发送自定义消息。"
                },
                client_state_panel_enable: {
                    _title: "显示对话框状态仪表板",
                    _description: "仪表板可以显示所有对话框的状态，绿色为激活，红色为休眠，灰色则表示没有对话框加入频道。<br>如果您添加了多个对话框，建议您启用此项。<br>如果您是红绿色盲，请在可访问性设置中启用红绿色盲。<br>- 启用后，蓝色填充为激活，蓝色边框为休眠。"
                },
                history_resend_bubble: {
                    _title: "历史消息再发送时上浮",
                    _description: "历史消息再次发送时使历史记录回到顶部"
                },
                history_maximum: {
                    _title: "历史消息数量上限",
                    _description: "设为 -1 则不设上限。"
                },
                log_line_maximum: {
                    _title: "日志行数上限",
                    _description: "设为 -1 则不设上限。"
                },
                images_cache_maximum: {
                    _title: "自定义消息图片缓存数上限",
                    _description: "设为 -1 则不设上限。"
                }
            },
            form: {
                _title: "表单预填充",
                _description: "编辑器初始化时表单的默认填充内容",
                username: {
                    _title: "初始说话人",
                    _description: "编辑器启动后在说话人输入框中默认填充的内容。"
                },
                quote_before: {
                    _title: "引用符号（开头）",
                    _description: ""
                },
                quote_after: {
                    _title: "引用符号（结尾）",
                    _description: ""
                },
                ontput_before_enable: {
                    _title: "启用在输出内容前插入内容",
                    _description: ""
                },
                output_before: {
                    _title: "在输出内容前插入的内容",
                    _description: "用于生成可执行的消息发送命令。"
                },
                ontput_after_enable: {
                    _title: "启用在输出内容后插入内容",
                    _description: ""
                },
                output_after: {
                    _title: "在输出内容后插入的内容",
                    _description: "用于生成可执行的消息发送命令。"
                }
            },
            websocket: {
                _title: "WebSocket",
                _description: "将编辑器连接到 WebSocket 服务器",
                enable: {
                    _title: "启用 WebSocket",
                    _description: "如果没人要求您这么做，请不要动它。<br>广播模式下启用 WebSocket 可连接至服务器以从通过第三方软件发送消息。<br>可从服务器接收的消息和广播消息一致，发送的消息须使用类似于 JSON.stringify 的方法序列化。<br>详见<a href='https://sheep-realms.github.io/Echo-Live-Doc/dev/broadcast/' target='_blank'>帮助文档</a>。"
                },
                url: {
                    _title: "连接地址",
                    _description: "提供 WebSocket 连接的服务器地址，使用 ws:// 或 wss:// 协议头。"
                },
                auto_url: {
                    _title: "自动设置连接地址",
                    _description: "通过 HTTP(S) 协议访问编辑器时，直接使用访问地址作为连接地址，无需手动设置。"
                },
                reconnect_limit: {
                    _title: "最大重连尝试次数",
                    _description: "连接关闭和连接失败将会尝试重连，一旦超过重连尝试次数限制将不再尝试重连。"
                },
                disable_broadcast: {
                    _title: "启用 WebSocket 时禁用广播频道",
                    _description: "当编辑器和客户端处于同一浏览器环境时，同时启用 WebSocket 和广播会导致客户端收到重复指令。"
                }
            },
            color_picker: {
                _title: "拾色器",
                _description: "拾色器相关配置",
                palette: {
                    _title: "启用的色板",
                    _description: "拾色器中有多种色板可供挑选。<br>若要挑选启用的色板或调整排序，请反选 “全部启用”，并在下方文本框中输入色板名称，一&#65279;行一&#65279;个。",
                    all_selected: "全部启用"
                },
                contrast_enable: {
                    _title: "启用 WCAG 颜色对比度测试",
                    _description: "在拾色器中显示颜色对比面板和 WCAG 颜色对比度测试结果。"
                },
                contrast_background_color: {
                    _title: "WCAG 颜色对比度测试面板参考背景色",
                    _description: "仅支持十六进制颜色码。<br>请注意：背景色的 Alpha 通道会被忽略。<br>- 如果您的对话框背景颜色是半透明或全透明将无法正确计算对比度，请您自行采集混合后的背景颜色。"
                },
                contrast_threshold: {
                    _title: "WCAG 颜色对比度测试面板对比度参考阈值",
                    _description: "对比度低于此值视为测试失败。"
                }
            },
            emoji_picker: {
                _title: "表情选择器",
                _description: "表情选择器相关配置",
                emoji: {
                    _title: "启用的表情包",
                    _description: "表情选择器中预制了一些表情包。<br>预制的表情包有 emoji、sheep-realms:pixel-head 和 sheep-realms:other。<br>若要挑选启用的表情包或调整排序，请反选 “全部启用”，并在下方文本框中输入表情包名称，一&#65279;行一&#65279;个。",
                    all_selected: "全部启用"
                }
            }
        },
        history: {
            _title: "历史记录",
            _description: "面向观众展示的历史记录",
            style: {
                _title: "主题样式",
                _description: "设置历史记录的样式",
                history_theme: {
                    _title: "历史记录主题",
                    _description: "留空则使用全局主题。关于可用的主题请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>帮助文档</a>。"
                },
                history_theme_variant: {
                    _title: "历史记录主题变体",
                    _description: "留空则使用全局主题变体。"
                },
                history_theme_script_enable: {
                    _title: "启用历史记录主题脚本",
                    _description: "此配置项需要启用全局主题脚本才能生效。"
                }
            },
            layout: {
                _title: "布局",
                _description: "历史记录的内容布局",
                message_list_reverse: {
                    _title: "历史记录倒序排列",
                    _description: "历史记录按照发送时间由新到旧排列。"
                },
                message_item_reverse: {
                    _title: "历史记录布局左右翻转",
                    _description: "翻转后的排列从左到右依次是：发送时间、消息内容、说话人。"
                },
                display_username: {
                    _title: "显示说话人",
                    _description: "在历史记录中显示说话人。"
                },
                display_time: {
                    _title: "显示发送时间",
                    _description: "在历史记录中显示发送时间。"
                }
            },
            message: {
                _title: "消息",
                _description: "历史记录的消息处理逻辑",
                remove_continuous_duplicate: {
                    _title: "去除连续的重复消息",
                    _description: "如果场景中有多个对话框同时接收消息，启用此项可避免重复记录历史消息。"
                },
                latest_message_hide: {
                    _title: "隐藏最新的历史记录",
                    _description: "对话框在开始打印消息时会立即发送消息到历史记录中，启用此项可避免最新消息立即显示在历史记录中。"
                },
                live_display_hidden_latest_message_show: {
                    _title: "对话框隐去时显示最新的历史记录",
                    _description: "在对话框隐去时显示被隐藏的最新的历史记录。"
                }
            }
        },
        character: {
            _title: "形象播放器",
            _description: "用于展示立绘或头像的播放器",
            avatar: {
                _title: "默认形象",
                _description: "设置默认所使用的形象及其参数",
                name: {
                    _title: "形象",
                    _description: "Echo-Live 内置了“Echo 追音”作为默认形象。"
                },
                action: {
                    _title: "动作",
                    _description: "默认所使用的动作名称，留空则使用默认值。<br>不同的形象会有不同的动作可选，请根据您选择的形象来选择动作。"
                },
                scene: {
                    _title: "镜头",
                    _description: "默认所使用的镜头名称，留空则使用默认值。<br>不同的形象会有不同的镜头可选，请根据您选择的形象来选择镜头。"
                }
            },
            avatar_switch_effect: {
                _title: "形象切换动效",
                _description: "切换形象或动作时默认所使用的动画效果",
                name: {
                    _title: "切换动效",
                    _description: "切换形象或动作时默认所使用的动画效果。"
                },
                duration: {
                    _title: "动效用时",
                    _description: "播放动画所需时间。"
                },
                scale: {
                    _title: "动效规模乘数",
                    _description: "动画的运动幅度乘数。"
                },
                timing_function: {
                    _title: "动效时间曲线",
                    _description: "动画在不同时间段的运动速度。"
                }
            },
        },
        accessibility: {
            _title: "可访问性",
            _description: "可访问性相关配置",
            font_size: {
                _title: "字体大小",
                _description: "调整后台页面文本的字体大小。",
                small: "小",
                middle: "适中",
                large: "大",
                extra_large: "特大",
                example_1: "你的爱还不够啊！",
                example_2: "我对普通的人类没有兴趣！",
            },
            use_short_language_iso_code: {
                _title: "使用短 ISO 语言代码",
                _description: "如果您的屏幕阅读器只能识别两位 ISO 语言代码（即不支持扩展语言代码），请启用此配置项。这可能会导致一些字符不能正确选用变体字形。"
            },
            unlock_page_width: {
                _title: "解锁页面宽度",
                _description: "不再限制页面内容宽度，这可以优化在较大字体布局下的显示效果。"
            },
            high_contrast: {
                _title: "高对比度",
                _description: "提高后台页面的对比度，并对焦点元素显示高亮边框。<br><span class='accessibility-high-contrast-hide'>此功能会遵循您的系统设置自动开启。</span><span class='accessibility-high-contrast-show'>由于您的系统设置，此功能已默认开启。</span>"
            },
            high_contrast_outline_color: {
                _title: "焦点高亮边框颜色",
                _description: "焦点元素将会显示一个醒目边框。此配置可更改其颜色。"
            },
            high_contrast_outline_size: {
                _title: "焦点高亮边框尺寸",
                _description: "焦点元素边框的宽度。"
            },
            high_contrast_outline_style: {
                _title: "焦点高亮边框样式",
                _description: "焦点元素边框的样式。"
            },
            protanopia_and_deuteranopia: {
                _title: "红绿色盲",
                _description: "绿色（安全）功能色会以蓝色（通用）代替，以便和功能差异较大的黄色（警告）和红色（危险）作出区分。"
            },
            link_underline: {
                _title: "总是显示链接下划线",
                _description: "为链接添加下划线使其更醒目。"
            },
            animation_disable: {
                _title: "禁用动画",
                _description: "禁用所有动画和过渡效果。"
            },
            power_saving_mode: {
                _title: "禁用高开销效果",
                _description: "禁用后台页面所有高性能消耗的画面效果。"
            },
            send_on_enter: {
                _title: "按 Enter 键发送消息",
                _description: "只需按下 Enter 键即可发送消息，按下 Ctrl + Enter 键换行。"
            }
        },
        advanced: {
            _title: "高级设置",
            _description: "一些复杂的设置",
            _warn: "警告：除非您知道您在干什么，否则请不要动这里的设置。",
            broadcast: {
                _title: "广播",
                _description: "广播的高级设置",
                allow_name_duplicate: {
                    _title: "允许识别名重复",
                    _description: "允许终端识别名出现重复，这可能会引发意料之外的情况。"
                },
                allow_send_duplicate_message: {
                    _title: "允许发送重复消息",
                    _description: "对话框收到重复消息时会再次打印而非忽略，这将会失去防抖机制。"
                },
                websocket_heartbeat_backoff_scale: {
                    _title: "WebSocket 心跳包并发退避比率",
                    _description: "为了减轻 WebSocket 服务器同时连接多个客户端时的心跳包并发压力，心跳包会以 UUID 为种子随机延迟 0 ~ 4095 毫秒发送。<br>调整比率可改变延迟长度。设为 0 可禁用并发退避。<br>默认的随机范围已足以应对常规使用场景，除非您试图组建一个大型网络。"
                },
                websocket_heartbeat_duration: {
                    _title: "WebSocket 心跳包间隔",
                    _description: "每一个 WebSocket 心跳包之间的间隔。并发退避不会影响间隔，只会影响偏移量。<br>设为 0 可禁用心跳包。"
                }
            },
            editor: {
                _title: "编辑器",
                _description: "编辑器的高级设置",
                forced_display_split_message: {
                    _title: "强制显示“{ @editor.form.label.split_message }”选项",
                    _description: "即便没有开启对话框状态仪表板也显示此选项。"
                },
                history_minimum_breaker_threshold: {
                    _title: "历史记录底部游标熔断阈值",
                    _description: "设为 -1 可禁用此机制。"
                }
            },
            settings: {
                _title: "配置文件编辑器",
                _description: "配置文件编辑器的高级设置",
                display_config_key: {
                    _title: "显示配置项键名",
                    _description: "在配置项描述下方显示键名。"
                },
                display_hidden_option: {
                    _title: "显示隐藏选项",
                    _description: "显示一些因特定条件下不可用的或实验性的选项。"
                },
                speech_synthesis_voices_maximum: {
                    _title: "讲述人语音资源列表最大显示数量",
                    _description: "在某些操作系统中可能会列出大量项目从而影响渲染性能。<br>设为 -1 则不设上限。"
                }
            },
            performance: {
                _title: "性能",
                _description: "调整 Echo-Live 的性能优化细节",
                foreach_text_style_by_message_data: {
                    _title: "基于消息数据遍历文本样式",
                    _description: "默认情况下 Echo-Live 会在解析消息格式时遍历整个文本样式注册表，这使得解析顺序是固定的而不会产生冲突。然而如果文本样式注册表中有大量注册数据，将会略微影响性能。<br>启用此配置项后，Echo-Live 会基于消息格式中已有的字段来遍历文本样式，但这会导致字段顺序变得敏感，靠后的字段会覆盖之前字段的效果。"
                },
                row_search_threshold: {
                    _title: "横向搜索触发阈值",
                    _description: "默认情况下数据检索算法采用垂直搜索，在条件较少时可以优化检索效率。但如果条件数量远高于数据量，检索效率将会降低。<br>当数据量和条件量的比值低于此阈值时，将会触发横向搜索，以降低大量条件带来的性能影响。<br>不过，您真的有这么做的需求吗？"
                }
            },
            device: {
                _title: "硬件设备",
                _description: "配置 Echo-Live 调用的硬件设备",
                enable: {
                    _title: "启用硬件设备控制",
                    _description: "允许 Echo-Live 调用一些硬件设备以提供更好的操作体验。例如震动马达，这将用于在移动设备上提供触觉反馈。"
                }
            },
            obs_api: {
                _title: "OBS API",
                _description: "配置前台页面对 OBS API 的运用",
                allow_scene_name_set_attribute: {
                    _title: "允许场景名称控制页面属性",
                    _description: "通过在 OBS 场景名称末尾写入像 <code aria-label='“左方括号、color、等于号、dark、右方括号”'>[color=dark]</code> 这样的键值对来更改页面属性，以便于在不同的场景中应用不同的样式。<br>要使用此功能，对应的浏览器源的页面权限应至少为“用户信息的读取权限”。"
                },
                echolive_mini_size_coefficient: {
                    _title: "对话框迷你尺寸计算系数",
                    _description: "通过在 OBS 场景名称末尾写入 <code aria-label='“左方括号、mini、右方括号”'>[mini]</code> 即可启用对话框的迷你尺寸，迷你尺寸仅在部分主题中可用。<br>系数取值范围为 0.3 ~ 2，迷你尺寸的宽度计算公式为：<code aria-label='场景高度乘以系数所得的值与场景宽度取最小值。'>min(场景高度 × 系数, 场景宽度)</code><br>要使用此功能，对应的浏览器源的页面权限应至少为“用户信息的读取权限”。"
                }
            }
        },
        extension: {
            _title: "扩展管理器",
            _description: "管理扩展包",
        },
        about: {
            _title: "关于",
            _description: "软件信息",
            about_echolive: "关于 Echo-Live",
            accessibility: "无障碍使用指南",
            bug_tracker: "漏洞追踪",
            community: "社区服务",
            copyright: "授权协议与声明",
            document: "帮助文档",
            feedback: "建议反馈",
            github: "GitHub 项目仓库",
            license: "开源许可证",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "报告安全漏洞",
            social_media: "社交媒体",
            user_guide: "用户指南",
            debug: {
                title: "调试选项",
                console_local_storage: "输出：Local Storage",
                console_registry: "输出：注册表"
            }
        }
    },
    echolive: {
        system_message: "系统消息",
        shutdown: "Echo-Live 因收到 shutdown 命令已停止运行，需要重新启动请刷新此页面。",
        shutdown_reason: "Echo-Live 因收到 shutdown 命令已停止运行，原因为“{reason}”，需要重新启动请刷新此页面。"
    },
    editor: {
        client_state: {
            active: "激活",
            none: "未加入",
            sleep: "休眠"
        },
        client_target: {
            none: "无",
            not: "已排除",
            yes: "已选中"
        },
        client_state_panel: {
            targeted: "（仅限定向）",
            tip: "客户端状态：{client}；\nEcho 状态：{echo}；\n标记状态：{target}{targeted}；\n右键点击此处可标记目标。",
            tip_more_messages: "客户端状态：{client}；\nEcho 状态：{echo}；\n标记状态：{target}{targeted}；\n点击此处可打印下一条消息。"
        },
        echo_state: {
            play: "打印中",
            ready: "就绪",
            stop: "停止"
        },
        emoji: {
            select: "表情包"
        },
        form: {
            text_length: "{n} 字符",
            aria_label: {
                log_box: "这里是日志列表，如果您听到了这句话，请注意，这里的阅读体验可能会很差。"
            },
            description: {
                formatting_code_example_1: "@b - 粗体，@i - 斜体，@u - 下划线，@s - 删除线，@r - 清除格式",
                formatting_code_example_2: "示例：这里没有格式。@b这里有粗体。@i这里有粗体和斜体。@r这里没有格式。@[#66ccff]这是蓝色。",
                formatting_code_example_3: "点此阅读关于快速格式化代码的指南",
                output_after: "在输出内容之后插入尾部内容",
                output_before: "在输出内容之前插入头部内容",
                print_speed: "每个打印循环的延迟时间（毫秒），默认为 30。数字越大，耗时越长。中日韩字符延迟 × 2。",
                print_speed_custom: "每个打印循环的延迟时间（毫秒），默认为 30，您的默认配置为 {value}。数字越大，耗时越长。中日韩字符延迟 × 2。",
                quote: "自动在每一句话开头和结尾添加引用符号，Echo Live 会为一些引用符号自动缩进。",
                sent_clear: "消息发送后使用此模板内容替换内容文本框。可以使用占位符 <code aria-label='“两对花括号包裹一个管道符”'>{{\\|}}</code> 来指定光标位置。",
                split_message_example_1: "每一行视为一条消息，组成消息队列，可以依次打印。",
                split_message_example_2: "当开启对话框状态仪表板时，可以点击对应的对话框按钮打印下一条消息。",
                open_settings: "打开配置文件编辑器"
            },
            label: {
                advanced_function: "高级功能",
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
                sent_clear: "发送后重置内容",
                sent_clear_input: "模板",
                split_message: "多行文本分割为消息队列",
                startup_parameter: "启动参数",
                statistic: "统计信息",
                statistic_view: "查看统计信息",
                statistic_export: "导出统计信息",
                use_formatting_code: "使用快速格式化代码"
            },
            placeholder: {
                commander: "命令控制台"
            }
        },
        format: {
            bold: "粗体",
            clear: "清除格式",
            color: "文本颜色",
            emoji: "表情",
            font_size_decrease: "减小字号",
            font_size_increase: "增大字号",
            image: "插入图片",
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
        image_popups: {
            button: {
                delete_all_images: "删除所有图片"
            },
            label: {
                image_margin: "外边距",
                image_rendering: "重采样",
                image_size_max: "最大图片尺寸",
                image_size_min: "最小图片尺寸",
                set_image_parameter: "设置图片属性"
            },
            option: {
                image_rendering: {
                    auto: "自动",
                    pixelated: "最邻近"
                }
            },
            tabpage: {
                file: {
                    title: "导入文件",
                    description: "直接导入图片文件"
                },
                url: {
                    title: "导入地址",
                    description: "导入 URL 地址"
                },
                images: {
                    title: "图库",
                    description: "已缓存的图片"
                }
            }
        },
        log: {
            index: "日志",
            welcome: "欢迎使用 Echo-Live！如需查阅帮助文档，请见：https://sheep-realms.github.io/Echo-Live-Doc/",
            accessibility: {
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
                close: "{client} 离开广播频道，识别名：{name}",
                echo_next: "收到来自其他服务端的命令：打印下一条消息。",
                echo_next_from_self_to_target: "已命令 {name} 打印下一条消息。",
                editor_websocket_connect_close: "编辑器与 WebSocket 服务器 {url} 连接中断。",
                editor_websocket_connect_error: "编辑器与 WebSocket 服务器 {url} 连接出错，进行第 {n} 次重连。",
                editor_websocket_connect_error_retry_failed: "编辑器与 WebSocket 服务器 {url} 连接出错，重连次数超出限制。",
                editor_websocket_connect_open: "编辑器与 WebSocket 服务器 {url} 连接成功，编辑器 UUID：{uuid}",
                editor_websocket_message_error: "编辑器解析 Websocket 服务器消息时出错。",
                hello: "{client} 进入广播频道，识别名：{name}",
                hello_hidden: "{client} 进入广播频道，已休眠，识别名：{name}",
                hello_reply: "{client} 响应了广播，识别名：{name}",
                hello_reply_hidden: "{client} 响应了广播，已休眠，识别名：{name}",
                hello_to_server: "{client} 已向 Websocket 服务器发送 HELLO 消息，识别名：{name}",
                message_data_third: "收到来自其他服务端的消息数据：{message}",
                page_hidden: "{client} 因不可见已休眠，识别名：{name}",
                page_visible: "{client} 已唤醒，识别名：{name}",
                ping_server: "有其他服务端加入频道，识别名：{name}",
                set_theme_style_url: "收到来自其他服务端的命令：设置主题样式文件 URL 为 {url}",
                set_theme: "收到来自其他服务端的命令：设置主题为 {name}",
                shutdown: "收到来自其他服务端的命令：立即停止。",
                shutdown_reason: "收到来自其他服务端的命令：立即停止。原因为：${reason}",
                websocket_close: "收到来自其他服务端的命令：关闭 Websocket 连接。此命令将阻止尝试重连。"
            },
            broadcast_launch: {
                disable: "未开启广播模式，无日志显示。",
                done: "广播模式已开启：{channel}",
                user_agent_check: "编辑器已正确安装在 OBS 中！",
                user_agent_check_websocket: "编辑器已启用 WebSocket 连接！",
                user_agent_error: "您似乎并未正确在 OBS 中安装此编辑器，详见：https://sheep-realms.github.io/Echo-Live-Doc/main/how-to-use/",
            },
            error: {
                name_duplicate: "识别名 {name} 发生冲突，{uuid} 已被踢出广播频道。如果您有使用重复识别名的需要，请将配置项 advanced.broadcast.allow_name_duplicate 设为 true。",
                websocket_error: "{client} Websocket 连接 {url} 出错，进行第 {n} 次重连，识别名：{name}",
                websocket_error_retry_failed: "{client} Websocket 连接 {url} 出错，重连次数超出限制，识别名：{name}",
                websocket_message_error: "{client} Websocket 接收到的消息解析出错，识别名：{name}",
                unknown_error_in_client: "{client} 发生未捕获的错误：<br>{msg}<br>来源：{source}<br>行列：{line}:{col}<br>识别名：{name}",
                unknown_error_in_editor: "编辑器发生未捕获的错误：{msg}<br>来源：{source}<br>行列：{line}:{col}"
            },
            message: {
                empty: "未输入内容，未发送任何消息。",
                empty_data: "消息内容无有效数据，未发送任何消息。",
                empty_messages: "发送的消息中没有消息队列，这是一个错误的消息格式。虽然这么操作似乎不会引发严重问题，但不建议这么操作。",
                illegal: "发送的消息格式存在错误。详见帮助文档：https://sheep-realms.github.io/Echo-Live-Doc/message/",
                resent: "已再次发送历史消息。",
                sent: "已发送消息：{msg}",
                sent_custom: "已发送自定义消息：{msg}",
                sent_custom_multi: "已发送 {n} 条自定义消息，首条消息为：{msg}",
                target: {
                    none: "[ ] 已取消标记：{name}",
                    not: "[-] 已标记排除：{name}",
                    yes: "[+] 已标记选中：{name}"
                }
            },
            tip: {
                unknown_error: "看来您可能遇到了一些问题。如果您确实觉得有什么不对劲，请复制此日志内容反馈给开发者，并详细描述复现过程。"
            },
            warn: {
                no_client: "没有客户端响应，请检查您是否正确打开或安装了 Echo-Live。如果您的操作正确，则可能是因为 OBS 中所有源均处于不可见状态。"
            }
        },
        palette: {
            index: "拾色器",
            empty: "卧槽？！你在干什么？我放在这里那么大一个调色板呢？还好我技高一筹给你兜住了！",
            select: "色板库",
            accessibility: {
                tip: "需要无障碍使用帮助吗？"
            },
            diff_dashboard: {
                index: "对比度测试面板",
                background_color: "背景色",
                foreground_color: "前景色",
                not_applicable: "不适用",
                result: {
                    contrast: "对比度参考阈值",
                    wcag_aa: "WCAG AA",
                    wcag_aaa: "WCAG AAA"
                },
                state: {
                    ok: "{name} 测试通过",
                    fail: "{name} 测试失败"
                }
            },
            label: {
                title_after: "{title} - {after}",
                common: {
                    after: {
                        deep: "深色",
                        default: "默认",
                        light: "浅色",
                        lighter: "更浅",
                        lightest: "最浅",
                        middle: "适中"
                    },
                    color: {
                        amber: "琥珀色 | 琥珀色 {value}",
                        aqua: "水蓝色 | 水蓝色 {value}",
                        cyan: "青色 | 青色 {value}",
                        black: "黑色 | 黑色 {value}",
                        blue: "蓝色 | 蓝色 {value}",
                        blue_gray: "蓝灰色 | 蓝灰色 {value}",
                        brown: "棕色 | 棕色 {value}",
                        deep_aqua: "暗水蓝色 | 暗水蓝色 {value}",
                        deep_blue: "深蓝色 | 深蓝色 {value}",
                        deep_gray: "深灰色 | 深灰色 {value}",
                        deep_green: "深绿色 | 深绿色 {value}",
                        deep_orange: "暗橙色 | 暗橙色 {value}",
                        deep_purple: "深紫色 | 深紫色 {value}",
                        deep_red: "深红色 | 深红色 {value}",
                        deep_yellow: "深黄色 | 深黄色 {value}",
                        gold: "金色 | 金色 {value}",
                        gray: "灰色 | 灰色 {value}",
                        green: "绿色 | 绿色 {value}",
                        light_aqua: "亮水蓝色 | 亮水蓝色 {value}",
                        light_blue: "淡蓝色 | 淡蓝色 {value}",
                        light_gray: "淡灰色 | 淡灰色 {value}",
                        light_green: "淡绿色 | 淡绿色 {value}",
                        light_purple: "淡紫色 | 淡紫色 {value}",
                        light_orange: "亮橙色 | 亮橙色 {value}",
                        light_red: "淡红色 | 淡红色 {value}",
                        light_yellow: "淡黄色 | 淡黄色 {value}",
                        lime: "黄绿色 | 黄绿色 {value}",
                        indigo: "靛蓝色 | 靛蓝色 {value}",
                        magenta: "紫红色 | 紫红色 {value}",
                        orange: "橙色 | 橙色 {value}",
                        pink: "粉红色 | 粉红色 {value}",
                        purple: "紫色 | 紫色 {value}",
                        red: "红色 | 红色 {value}",
                        silver: "银色 | 银色 {value}",
                        sky: "天蓝色 | 天蓝色 {value}",
                        teal: "蓝绿色 | 蓝绿色 {value}",
                        white: "白色 | 白色 {value}",
                        violet: "蓝紫色 | 蓝紫色 {value}",
                        yellow: "黄色 | 黄色 {value}"
                    },
                    functional_color: {
                        danger: "危险 | 危险 {value}",
                        error: "错误 | 错误 {value}",
                        general: "通用 | 通用 {value}",
                        link: "链接 | 链接 {value}",
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
                        blue: "拂晓蓝 {value}",
                        cyan: "明青 {value}",
                        geek_blue: "极客蓝 {value}",
                        gold: "金盏花 {value}",
                        green: "极光绿 {value}",
                        lime: "青柠 {value}",
                        magenta: "洋红 {value}",
                        orange: "日暮 {value}",
                        purple: "酱紫 {value}",
                        red: "薄暮 {value}",
                        volcano: "火山 {value}",
                        yellow: "日出 {value}"
                    },
                    group: {
                        blue: "Daybreak Blue / 拂晓蓝",
                        cyan: "Cyan / 明青",
                        geek_blue: "Geek Blue / 极客蓝",
                        gold: "Calendula Gold / 金盏花",
                        green: "Polar Green / 极光绿",
                        lime: "Lime / 青柠",
                        magenta: "Magenta / 法式洋红",
                        orange: "Sunset Orange / 日暮",
                        purple: "Golden Purple / 酱紫",
                        red: "Dust Red / 薄暮",
                        volcano: "Volcano / 火山",
                        yellow: "Sunrise Yellow / 日出"
                    }
                },
                custom_class: {
                    title: "高级样式",
                    style: {
                        gradient_aqua_splash: "海洋巨星",
                        gradient_perfect_blue: "宇宙之眼",
                        gradient_dusty_grass: "固沙草原",
                        gradient_fly_high: "挣脱引力",
                        gradient_heavy_rain: "倾盆大雨",
                        gradient_juicy_peach: "多汁蜜桃",
                        gradient_mountain_rock: "筑山之岩",
                        gradient_night_fade: "暮色银河",
                        gradient_premium_dark: "高级深灰",
                        gradient_red_salvation: "碎空远星",
                        gradient_salt_mountain: "地中之盐",
                        gradient_spring_warmth: "暖阳春日",
                        gradient_sunny_morning: "明媚早晨",
                        gradient_winter_neva: "冰天雪地",
                        jitter: "抖动",
                        rainbow: "彩虹",
                        roll_down: "旋转倒置",
                        wave_1: "微波起伏",
                        wave_2: "波涛汹涌",
                        wave_3: "惊涛骇浪"
                    },
                    group: {
                        colorful: "多彩渐变",
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
                        emerald: "绿宝石色 {value}",
                        neutral: "中性色",
                        rose: "玫瑰色 {value}",
                        slate: "暗蓝灰色",
                        stone: "石头",
                        zinc: "金属"
                    },
                    group: {
                        weight: "深度 {value}"
                    }
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
                description: "编辑配置 [alt+2]"
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
                description: "运行日志 [alt+4]"
            },
            output: {
                title: "输出",
                description: "输出代码 [alt+3]"
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
    effect: {
        print: {
            blur_in: "聚焦",
            fade_in: "淡入",
            move_in_down: "从下方移入",
            move_in_up: "从上方移入",
            none: "无",
            zoom_in_inside: "放大进入",
            zoom_in_outside: "缩小进入"
        }
    },
    emoji: {
        emoji: {
            title: 'Emoji',
            group: {
                animal: "动物",
                emotion: "情感",
                food: "食物",
                gesture: "手势",
                nature: "森罗万象"
            }
        },
        sheep_realms: {
            other: {
                title: "绵羊的大表情",
                emoji: {
                    ahwu: "啊呜",
                    dame: "禁止",
                    danger: "危",
                    eating_potato_chips: "吃薯片",
                    nani: "问号",
                    orz: "累趴",
                    sofa: "大佬躺姿",
                    ze: "不爽"
                }
            },
            pixel_head: {
                title: "绵羊的像素头像",
                emoji: {
                    angry: "生气",
                    bathe: "洗澡",
                    black_stripe: "不愿透露姓名的绵羊女士",
                    box_gear: "盒精装备",
                    chaos: "混乱",
                    ciallo: "Ciallo~",
                    click: "戳一下",
                    close_eyes: "闭眼",
                    cry: "哭了",
                    default: "注视",
                    doubt: "疑问",
                    elec: "触电",
                    elec2: "发电",
                    exciting: "兴奋",
                    fear: "害怕",
                    glowing_glasses: "眼镜发光",
                    hammer: "锤一下",
                    happy: "开心",
                    heart: "爱心",
                    hehe: "流汗",
                    loading: "加载",
                    magnifier: "放大镜",
                    missingno: "查无此羊",
                    no: "不行",
                    pants: "蓝白胖次",
                    phone: "打电话",
                    pot_me: "铁锅炖自己",
                    respirator: "口罩",
                    sex: "发情",
                    shock: "警觉",
                    shy: "害羞",
                    sleep: "睡觉",
                    stone: "石化",
                    sunglasses: "墨镜",
                    unwelcome: "头套",
                    vomit: "呕吐",
                    wall: "偷看",
                    water: "浇水",
                    waterfall: "瀑布",
                    waterfall_end: "接水",
                    waterfall_start: "口若悬河",
                    watermelon: "吃瓜",
                    yes: "可以"
                }
            }
        }
    },
    file: {
        name: "文件名",
        last_modified_date: "最后修改时间",
        size: "文件大小",
        checker: {
            data_url_unavailable: "Data URL 和相对地址不可用",
            default_file_loaded: "默认路径中的配置文件已载入",
            empry: "未载入文件",
            state: {
                error: "错误",
                exception: "异常",
                future: "新版",
                loaded: "已载入",
                update: "旧版"
            }
        },
        dropper: {
            title: "文件选择器",
            drop_file_but_file_text: "您觉得您很幽默吗？",
            drop_file_but_file_text_target: "文件",
            drop_file_cancel: "不放算了，哼！",
            drop_file_cancel_many: "一位用户反复拖拽文件，这是他的程序发生的变化",
            drop_file_long_time: "你怎么还不放手？",
            drop_file_now: "松开鼠标拖放文件",
            please_click: "点击此处选择文件",
            please_drop_file: "在这里拖放文件或点击此处选择文件",
            please_drop_file_keyboard: "当焦点在此处时，您也可以按下 Enter 或空格键选择文件",
            dialog: {
                many_file: {
                    title: "太多了",
                    description: "处理不了那么多文件，请一个一个来。"
                },
                not_file: {
                    title: "这不是文件",
                    description: "您拖了个什么玩意儿进来？"
                },
                selected: {
                    title: "已选择文件",
                    description: "文件名：{name}",
                    import_image: "插入图片"
                },
                type_error: {
                    title: "文件类型错误",
                    description: "这似乎并不是我们想要的文件。"
                },
                use_chrome: {
                    title: "建议您使用最新版 Chrome 浏览器",
                    description: "此页面使用了一些最新技术，您的浏览器可能无法支持部分功能。<br>当然您也可以试试 Edge 浏览器。",
                    goto: "获取 Chrome"
                }
            }
        },
        picker: {
            config: "配置文件",
            image: "图片"
        }
    },
    font_weight: {
        bold: "粗体",
        inherit: "继承默认值",
        normal: "适中",
        "100": "淡体",
        "200": "特细",
        "300": "细体",
        "350": "次细",
        "400": "标准",
        "500": "适中",
        "600": "次粗",
        "700": "粗体",
        "800": "特粗",
        "900": "浓体",
        "950": "特浓"
    },
    help: {
        easter_egg: {
            previous: "你就是想跟我反着干，对吧？",
            previous_is_first_step: "别退了！已经到头了！"
        },
        popover: {
            done: "完成",
            next: "继续 →",
            prev: "← 后退",
            progress: "{{current}} / {{total}}"
        },
        step: {
            editor_overview: {
                s1: {
                    title: "欢迎使用 Echo-Live！",
                    description: "接下来我们将进入关于编辑器的新手引导。<br>如果您不方便使用鼠标，可以使用方向键 <kbd>→</kbd> 前往下一个步骤，也可以按 <kbd>Esc</kbd> 键退出引导。"
                },
                s2: {
                    title: "我们只能一路向前",
                    description: "虽然我把后退按钮删了，但你还是可以通过方向键来后退。为了引导的正常进行，请不要后退，也不要乱点高亮框内的东西。求求您千万不要！"
                },
                s3: {
                    title: "说话人",
                    description: "这里填入需要在对话框中显示的说话人，如果不需要则可以留空。",
                    input: "追音"
                },
                s4: {
                    title: "消息内容",
                    description: "这里填入在对话框中显示的消息，消息将会使用打印动画逐字输出内容。",
                    input: "你好，世界！"
                },
                s5: {
                    title: "快速格式化代码",
                    description: "如果想要更丰富的文本样式，可以在这里启用快速格式化代码。"
                },
                s6: {
                    title: "工具栏",
                    description: "启用快速格式化代码后，您可以点击这些按钮插入快速格式化代码。"
                },
                s7: {
                    title: "插入代码",
                    description: "点击工具栏中的按钮，就能在光标处插入对应的代码。",
                    input: "@b你好，世界！"
                },
                s8: {
                    title: "颜色选择器",
                    description: "您可以在这里选择文本颜色，点击色块就能在光标处插入对应的颜色代码。"
                },
                s9: {
                    title: "色板",
                    description: "不喜欢这些颜色？这里有多种色板供您选择。"
                },
                s10: {
                    title: "插入颜色",
                    description: "现在，我们已经成功插入了颜色！",
                    input: "@b你好，@[#1890ff]世界！"
                },
                s11: {
                    title: "关于快速格式化代码",
                    description: "请注意，快速格式化代码会影响其后所有文本的样式，并且是可以叠加的。直到遇到 @r，这会清空所有样式。"
                },
                s12: {
                    title: "图片选择器",
                    description: "您还可以在消息中插入图片。可以直接导入文件，这会打开一个系统的文件选择器，也可以通过 URL 地址导入文件。"
                },
                s13: {
                    title: "图库",
                    description: "您使用过的图片会保存在这里，即便您刷新网页之后也依旧存在。"
                },
                s14: {
                    title: "输出消息",
                    description: "当您编写好消息后，就可以在这里点击按钮输出消息了。如果您启用了广播模式，您可以在这里直接发送消息。"
                },
                s15: {
                    title: "导航栏",
                    description: "接下来我们来看看别的东西。"
                },
                s16: {
                    title: "输出标签页",
                    description: "当您在编辑器中点击了输出按钮时，消息的代码会输出到此处。"
                },
                s17: {
                    title: "自定义消息",
                    description: "如果您启用了广播模式，您可以在这里直接发送消息，这意味着您可以发送功能更丰富的自定义消息。"
                },
                s18: {
                    title: "日志标签页",
                    description: "在日志标签页中，您可以看到广播模式下广播系统的运行日志。"
                },
                s19: {
                    title: "通知",
                    description: "此刻冒出来的是通知消息，一些需要您留意的通知会出现在此处。",
                    notice: "您好！"
                },
                s20: {
                    title: "新人引导结束",
                    description: "再次感谢您使用 Echo-Live！如果您还有疑问，可以阅读<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/' target='_blank'>帮助文档</a>或咨询开发者。"
                }
            },
            settings_overview: {
                s1: {
                    title: "欢迎使用 Echo-Live！",
                    description: "接下来我们将进入关于配置文件编辑器的新手引导。<br>如果您不方便使用鼠标，可以使用方向键 <kbd>→</kbd> 前往下一个步骤，也可以按 <kbd>Esc</kbd> 键退出引导。"
                },
                s2: {
                    title: "我们只能一路向前",
                    description: "虽然我把后退按钮删了，但你还是可以通过方向键来后退。为了引导的正常进行，请不要后退，也不要乱点高亮框内的东西。求求您千万不要！"
                },
                s3: {
                    title: "导航栏",
                    description: "如你所见，配置文件编辑器的使用过程可以分为这三个步骤。"
                },
                s4: {
                    title: "导入",
                    description: "先来看看导入这个步骤。"
                },
                s5: {
                    title: "导入和升级配置文件",
                    description: "你可以点击此处或将文件拖进这里来导入配置文件。如果您导入了旧版配置文件，可以在这里自动升级。"
                },
                s6: {
                    title: "文件信息",
                    description: "这里是当前所选中的文件的信息，包括文件名、尺寸、最后更改时间。"
                },
                s7: {
                    title: "编辑",
                    description: "导入完成后，我们应该来编辑配置文件了。"
                },
                s8: {
                    title: "分类",
                    description: "这里是配置文件项目的分类。"
                },
                s9: {
                    title: "配置项",
                    description: "这是其中一条配置项。您可以在这里阅读关于此配置项的描述，并尝试更改配置值。"
                },
                s10: {
                    title: "更改配置",
                    description: "当您更改了配置后，对应的配置标题会显示一个红色星号，代表其已更改但未保存。"
                },
                s11: {
                    title: "保存配置",
                    description: "您可以在这里保存或撤销更改。<br>暂存：保存更改，但不导出文件。<br>保存：保存更改，并导出文件。"
                },
                s12: {
                    title: "导出配置文件",
                    description: "当您导出配置文件时，请将其放置在 Echo-Live 的目录中，替换 config.js 文件。在这之后刷新网页就可以应用最新配置。"
                },
                s13: {
                    title: "新增的配置项",
                    description: "当您导入并升级了一个旧版本的配置文件时，新增的配置项会被高亮。"
                },
                s14: {
                    title: "导出",
                    description: "来看看最后一个标签页。"
                },
                s15: {
                    title: "导出内容",
                    description: "其实刚刚我们已经提到过导出文件了，这里只是为了查看和编辑导出内容，以及另存为。"
                },
                s16: {
                    title: "重新导出",
                    description: "如果你不小心搞砸了，点击这个按钮即可重新导出配置文件内容。"
                },
                s17: {
                    title: "可访问性",
                    description: "另外，如果您需要调整可访问性相关配置，可以在这里找到。<br>如有需要，您可以<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>点击此处阅读无障碍使用指南</a>。"
                },
                s18: {
                    title: "新人引导结束",
                    description: "再次感谢您使用 Echo-Live！如果您还有疑问，可以阅读<a class='fh-link' href='https://sheep-realms.github.io/Echo-Live-Doc/' target='_blank'>帮助文档</a>或咨询开发者。"
                }
            }
        },
        tips: {
            images_cache_note: {
                title: "注意事项",
                description: "直接导入图片会占用较大的存储空间，而浏览器的持久化存储空间是有限的（不到 5 MB）。<br>因此请尽可能通过 URL 地址来导入图片。"
            }
        },
        title: {
            editor_overview: "编辑器使用指南",
            settings_overview: "配置文件编辑器使用指南"
        },
        tutorial_dialog: {
            title: "互动式引导",
            description: "您需要阅读{title}吗？",
            option: {
                yes: "需要",
                skip: "下次再说",
                no: "不需要"
            }
        }
    },
    live_controller: {
        all_icon: {
            title: "全量图标"
        },
        classic: {
            title: "旧版纯文本"
        },
        draw: {
            title: "画图"
        },
        neo_icon: {
            title: "图标"
        },
        taskbar: {
            title: "任务栏"
        },
        word: {
            title: "Word 文档",
            item: {
                cite: "引用",
                design: "设计",
                email: "邮件",
                file: "文件",
                graphics: "绘图",
                help: "帮助",
                layout: "布局",
                insert: "插入",
                review: "审阅",
                start: "开始",
                view: "视图"
            }
        }
    },
    live_theme: {
        bubble: {
            title: "气泡",
            variant: {
                azure: "蔚蓝",
                pink: "粉红"
            }
        },
        glass: {
            title: "玻璃",
            variant: {
                coffee: "咖啡棕",
                blue: "湖泊蓝",
                pink: "蜜桃粉",
                purple: "水晶紫",
                wine_red: "葡萄红"
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
            title: "虚空",
            variant: {
                white: "白色文本"
            }
        }
    },
    message_preview: {
        empty_message: "[空消息]",
        empty_username: "[未指定说话人]",
        undefined_message: "[未定义消息]"
    },
    meta_info: {
        author: "作者：{ name }",
        license: "授权协议：{ name }"
    },
    notice: {
        client_target_but_no_client: "请不要虚空索敌！",
        commander_tips: "您已打开命令控制台，点击此处可查阅关于命令的帮助。如果您只是误操作，请将光标置于控制台中并按 <kbd>Esc</kbd> 键退出。",
        config_re_output: "已重新导出配置文件内容！",
        config_saved: "配置文件已保存！请注意刷新所有页面使新配置生效。",
        config_saving: "保存中...",
        config_saving_fail: "未授权写入，配置文件未保存。",
        browser_zoom: "如果您不小心调整了缩放率不知道怎么复原，请按：<kbd>Ctrl</kbd> + <kbd>0</kbd>（数字键）",
        browser_zoom_reset: {
            title: "漂亮的抢救！",
            message: "您已经掌握了如何操作浏览器缩放。请注意，<kbd>Ctrl</kbd> + <kbd>-</kbd> 和 <kbd>Ctrl</kbd> + <kbd>+</kbd> 组合键可以调整浏览器缩放，当心误操作！"
        },
        debug_mode: "已启用调试选项！",
        drop_file_cancel_many: "你倒是放啊！",
        github_download_but_no_assets: {
            title: "让我们开始下载...... 等一下？",
            message: "发布了新版本结果没上传文件？还能有这种事情？！"
        },
        images_cache_storage_fail: "图片存储失败：图片过大或已达到存储容量上限，请清理一些图片。您可以改用填写图片地址来缓解存储负担。",
        import_image_url_empty: "未填写图片 URL！",
        local_storage_cleared: "已清除本地存储数据！",
        open_file_picker_cancel: "已取消选择文件！",
        open_file_picker_fail: {
            title: "打开文件选择器时发生错误",
            message: "这很有可能是因为您当前使用的浏览器不支持此功能。您还可以尝试拖放文件，但还是建议您更换浏览器。"
        },
        open_settings_in_obs: "请在浏览器中打开 settings.html，而不是在 OBS 中！",
        unknown_error: {
            title: "发生了未捕获的错误",
            message: "这应该不是什么意料之中的战术性报错，您可以将此问题反馈给开发者，并提供复现方法。"
        }
    },
    page_title: {
        character: "Echo Live 形象播放器",
        editor: "Echo Live 编辑器",
        history: "Echo Live 历史记录",
        live: "Echo Live",
        settings: "Echo Live 配置文件编辑器"
    },
    pip: {
        in_pip: "本窗口正是画中画！",
        not_support: "当前浏览器不支持 Document Picture-in-Picture API",
        open_pip_window: "打开画中画窗口",
        title: "画中画"
    },
    settings: {
        unknown_config_type: "暂不支持修改此配置",
        config_input: {
            config_from_future: {
                title: "配置文件来自未来版本",
                description: "此配置文件来自于未来的 Echo-Live，您也许有哪里搞错了。<br>继续加载可能会产生意料之外的问题。",
                load: "继续加载"
            },
            json_parse_fail: {
                title: "无法安全读取配置文件",
                description: "这可能是因为配置文件为早期版本，或是配置文件内容损坏。<br>如果您确定配置文件没有问题，并且没有被植入恶意代码的可能，可以尝试 “不安全读取”。",
                unsafe_load: "不安全读取"
            },
            in_obs: {
                title: "不要在 OBS 中打开此页面",
                description: "这会产生一些意料之外的问题，并且您完全没有必要将这个页面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "处理不了那么多文件，请一个一个来。"
            },
            no_json: {
                title: "找不到配置数据",
                description: "无法在此文件中找到配置数据。"
            },
            not_file: {
                title: "这不是文件",
                description: "您拖了个什么玩意儿进来？"
            },
            type_error: {
                title: "文件类型错误",
                description: "这似乎并不是配置文件。"
            },
            unsafe_load_fail: {
                title: "无法读取配置文件",
                description: "看来您的配置文件确实有问题，请检查您的配置文件。"
            },
            update_config: {
                title: "配置文件需要更新",
                description: "此配置文件来自于旧版的 Echo-Live，需要更新才能使用。",
                update: "更新"
            },
            update_config_from_unknown_version: {
                title: "未知的配置文件版本",
                description: "此配置文件没有版本号，可能来自于 1.2.7 之前的版本。<br>您可以强制升级此配置文件，但并不能保证其正常运作，不建议您继续使用此配置文件。",
                update: "强制更新"
            }
        },
        functional_color: {
            danger: "危险",
            general: "通用",
            safe: "安全",
            special: "特殊",
            warn: "警告"
        },
        label: {
            accessibility_color_card: "参考色卡",
            config_changed: "配置已更改",
            config_output: "导出配置内容"
        },
        msgbox: {
            accessibility: "Echo-Live 所有后台页面均支持键盘访问。<br>更多有关无障碍使用的帮助请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/' target='_blank'>帮助文档</a>。",
            advanced_settings: "不要随意更改这里的配置，除非您知道您在做什么。",
            character_settings: "形象播放器仍是一项实验性功能，可能存在较多问题，未来有可能会发生重大更改，请勿过度依赖。",
            echo: {
                title: "关于 Echo",
                description: "Echo 是 Echo-Live 的内核，提供了文本滚动输出功能。<br>它是一个工具库，任何人都可以使用 Echo 创建自己的文本展示项目。<br>如果您有兴趣了解 Echo，请见其 <a href='https://github.com/sheep-realms/Echo' target='_blank'>GitHub 仓库</a>。"
            },
            extension: {
                title: "在做了在做了！！！",
                description: "为了让扩展的功能变得更强大，咱对 Echo-Live 的数据加载逻辑进行了一场惊天地泣鬼神的更改，于是原有的扩展系统不管用了...... 不不不，咱不是那个意思！新的扩展系统需要很多配套设施，很多人非常期待这个版本的更新，所以扩展系统的更新需要延后了。如果不出意外的话，它很快就会回来的！"
            }
        },
        tabpage: {
            edit: {
                title: "编辑",
                description: "编辑配置文件 [alt+2]"
            },
            export: {
                title: "导出",
                description: "导出配置文件 [alt+3]"
            },
            import: {
                title: "导入",
                description: "导入配置文件 [alt+1]"
            }
        }
    },
    sound: {
        pencil: "铅笔",
        typewriter: "打字机",
        typewriter_loop: "打字机（随机音效）",
        sys001: "清脆敲击",
        sys002: "嗡嗡",
        sys003: "冒泡",
        enter: "打字机回车",
        paper: "翻页"
    },
    statistic: {
        overview: {
            statistic_days: "统计天数"
        },
        editor: {
            message: {
                custom_code_sent_count: "自定义消息发送次数",
                last_sent: "最近一次消息发送时间",
                not_resent_count: "不包含重发的消息发送次数",
                resent_count: "消息重新发送次数",
                sent_character_average: "每条消息平均字数",
                sent_character_daily_average: "每个活动日消息平均字数",
                sent_character_total: "字符发送总数",
                sent_count: "消息发送次数",
                sent_max_length: "消息最大长度",
                used_exclamation_mark_total: "感叹号使用总数",
                used_formatting_code_count: "快速格式化代码使用次数",
                used_question_mark_total: "问号使用总数",
                session: {
                    resent_max_count: "会话内消息重新发送最多次数",
                    sent_character_max_total: "会话内发送最多总字数",
                    sent_max_count: "会话内消息发送最多次数"
                }
            },
            overview: {
                last_session_created: "最近一次会话启动时间",
                session_created_count: "会话启动次数",
                session_created_daily_average: "每个活动日会话启动平均次数",
                session_created_days: "会话活动总天数",
                session_created_statistic_daily_rate: "每日会话活动率",
                session_duration_average_second: "会话平均时长",
                session_duration_max_second: "会话最大时长",
                session_duration_total_second: "会话总时长"
            }
        },
        misc: {
            view_statistic_count: "“这是什么？统计信息？看一下！”"
        }
    },
    statistic_info: {
        empty_timestamp: "从未发生",
        footer_description: "部分统计项需要在结束当前会话后才能完成统计。<br>这些数据仅存储于浏览器中，更换浏览器或清除浏览器数据会失去统计数据。<br>统计开始于：{ created_at }<br>统计截止于：{ modified_at }"
    },
    studio: {
        title: {
            text_to_messages: "文本转消息格式 · Echo Live 工作室"
        },
        text_to_messages: {
            colon: "：",
            label: {
                character_split: "说话人分隔符",
                text: "对话文本"
            },
            tabpage: {
                edit: {
                    title: "编辑",
                    description: "编辑文本 [alt+1]"
                },
                output: {
                    title: "输出",
                    description: "输出消息格式 [alt+2]"
                }
            }
        }
    },
    timing_function: {
        ease: "平滑",
        linear: "线性",
        ease_in: "缓出",
        ease_out: "缓入",
        ease_in_out: "缓入缓出",
        ease_in_sine: "正弦缓出",
        ease_out_sine: "正弦缓入",
        ease_in_out_sine: "正弦缓入缓出",
        ease_in_cubic: "三次方缓出",
        ease_out_cubic: "三次方缓入",
        ease_in_out_cubic: "三次方缓入缓出",
        ease_in_circ: "圆形缓出",
        ease_out_circ: "圆形缓入",
        ease_in_out_circ: "圆形缓入缓出",
        ease_in_back: "回退缓出",
        ease_out_back: "回退缓入",
        ease_in_out_back: "回退缓入缓出"
    },
    updater: {
        download_assets: "下载文件",
        notice_title: "有新版本可用：{version}",
        notice_content_editor: "您可以打开配置文件编辑器获取详细信息或自行前往 GitHub 下载最新版本。",
        notice_content_settings: "您可以更新到新版本，点此了解详细信息。",
        releases_author: "作者：{value}",
        releases_created_at: "发布时间：{value}",
        releases_details: "发行版本详情",
        releases_details_tips: "如出现内容渲染错误，请前往 GitHub 查看原文。"
    },
    window: {
        config_font_size_overload: {
            title: "您是认真的吗？",
            message: "您确定要使用以下配置吗？",
            font_size_review: "字体大小：{value}"
        },
        clear_local_storage: {
            title: "清除本地存储数据",
            message: "您确定要清除本地存储数据吗？<br>这是一个不可逆的操作，您将会永久丢失这些数据。"
        }
    }
};

echoLiveSystem.registry.setLanguageRegistryValue(lang_zho_Hans);