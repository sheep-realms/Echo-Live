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
        missingno: {
            no_author: "未署名",
            no_name: "未命名"
        }
    },
    broadcast: {
        client: {
            type: {
                client: "未知客户端",
                editor: "Echo-Live Editor",
                history: "Echo-Live History",
                live: "Echo-Live",
                unknow: "未知终端"
            }
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
                unknow_option: "语法错误：不存在名为 '{name}' 的选项",
                not_broadcast: "运行失败：广播未启动"
            },
            success: {
                broadcast_everyone: "已广播 {action} 消息",
                broadcast_target: "已发送 {action} 消息至 {name}"
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
        global: {
            _title: "全局",
            _description: "一些影响全局的设置",
            language: {
                _title: "显示语言",
                _description: "后台页面的显示语言。"
            },
            theme: {
                _title: "全局主题",
                _description: "控制对话框、历史记录等面向观众展示的界面主题。关于可用的主题请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/theme/' target='_blank'>帮助文档</a>。"
            },
            theme_script_enable: {
                _title: "启用全局主题脚本",
                _description: "一些高级效果可能需要启用主题脚本才能正常使用。目前所有预制主题均不包含脚本。<br>脚本中可以执行任意代码，请谨慎安装需要您启用脚本的第三方主题。"
            },
            color_scheme: {
                _title: "后台配色方案",
                _description: "控制后台界面的配色。可用的方案有 auto（跟随系统）、light（浅色）和 dark（深色）。",
                _value: {
                    auto: "跟随系统",
                    dark: "深色",
                    light: "浅色"
                }
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
                live_theme_script_enable: {
                    _title: "启用对话框主题脚本",
                    _description: "此配置项需要启用全局主题脚本才能生效。"
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
                    _description: "提供 WebSocket 连接的服务器地址，使用 ws:// 协议头。"
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
                    _description: "单位：毫秒。值越小响应越快，性能消耗越高。"
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
                _title: "打字音效",
                _description: "在每次输出字符时播放音效",
                enable: {
                    _title: "启用打字音效",
                    _description: ""
                },
                name: {
                    _title: "音效名称",
                    _description: "可用的音效名称请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>帮助文档</a>。"
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
                    _title: "音效名称",
                    _description: "可用的音效名称请见<a href='https://sheep-realms.github.io/Echo-Live-Doc/custom/sound/#list' target='_blank'>帮助文档</a>。"
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
            display: {
                _title: "隐去与显现动画",
                _description: "调整对话框的隐去与显现动画的参数",
                auto: {
                    _title: "闲置时自动隐去",
                    _description: "启用后，对话框会在保持没有任何动作一段时间后自动隐去。"
                },
                hidden_wait_time: {
                    _title: "闲置等候时间",
                    _description: "进入闲置状态的最小等候时间，单位毫秒（1 秒 = 1000 毫秒）。"
                },
                long_text_compensation_rate: {
                    _title: "长文本等候时间补偿率",
                    _description: "当消息文本过长时会额外补偿一些等候时间，设为 0 则禁用。"
                },
                hidden_time: {
                    _title: "隐去动画用时",
                    _description: "对话框隐去所需时间，单位毫秒。"
                },
                show_time: {
                    _title: "显现动画用时",
                    _description: "对话框显现所需时间，单位毫秒。"
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
                    _description: "在这里选择可用的语音资源，留空则使用系统默认值。<br>在内容为空的情况下，点击文本框即可列出所有可用的值。部分浏览器可能需要多点一次。<br>请注意：不同的浏览器会出现不同的值，一些浏览器会提供独有的语音资源，例如 Chrome 的 Google 合成语音，这些语音资源不能在 OBS 中使用。语音资源能否正确使用最终取决于前台页面所在的浏览器环境。<br>当所选择的值不可用时，将使用系统默认值。"
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
                    _description: "在消息发出后延迟读出，单位为毫秒，1000 毫秒为 1 秒。"
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
                    _description: "仪表板可以显示所有对话框的状态，绿色为激活，红色为休眠，灰色则表示没有对话框加入频道。<br>如果您添加了多个对话框，建议您启用此项。<br>如果您是红绿色盲，请在无障碍设置中启用红绿色盲。<br>- 启用后，蓝色填充为激活，蓝色边框为休眠。"
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
            color_picker: {
                _title: "拾色器",
                _description: "拾色器相关配置",
                palette: {
                    _title: "启用的色板",
                    _description: "拾色器中有多种色板可供挑选。<br>预制的色板有 material、tailwindcss、ant_design 和 minecraft。<br>若要挑选启用的色板或调整排序，请反选 “全部启用”，并在下方文本框中输入色板名称，一&#65279;行一&#65279;个。",
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
                }
            }
        },
        accessible: {
            _title: "无障碍",
            _description: "无障碍相关配置",
            high_contrast: {
                _title: "启用高对比度",
                _description: "提高后台页面的对比度，并对焦点元素显示高亮边框。"
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
                _description: "焦点元素边框的样式，可以是 solid、dotted、dashed 或 double。"
            },
            drotanopia_and_deuteranopia: {
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
            }
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
            user_guide: "用户指南"
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
        client_state_panel: {
            tip: "客户端状态：{client}，Echo 状态：{echo}。",
            tip_more_messages: "客户端状态：{client}，Echo 状态：{echo}。点击此处可打印下一条消息。"
        },
        echo_state: {
            play: "打印中",
            ready: "就绪",
            stop: "停止"
        },
        form: {
            text_length: "{n} 字符",
            aria_label: {
                commander: "控制台",
                content_plain_text: "纯文本内容编辑框",
                log_box: "这里是日志列表，如果您听到了这句话，请注意，这里的阅读体验可能会很差。",
                output_content: "输出内容编辑框"
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
                split_message_example_1: "每一行视为一条消息，组成消息队列，可以依次打印。",
                split_message_example_2: "当开启对话框状态仪表板时，可以点击对应的对话框按钮打印下一条消息。",
                open_settings: "打开配置文件编辑器"
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
                split_message: "多行文本分割为消息队列",
                startup_parameter: "启动参数",
                use_formatting_code: "使用快速格式化代码"
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
                close: "{client} 离开广播频道，识别名：{name}",
                echo_next: "收到来自其他服务端的命令：打印下一条消息。",
                echo_next_from_self_to_target: "已命令 {name} 打印下一条消息。",
                hello: "{client} 进入广播频道，识别名：{name}",
                hello_hidden: "{client} 进入广播频道，已休眠，识别名：{name}",
                hello_reply: "{client} 响应了广播，识别名：{name}",
                hello_reply_hidden: "{client} 响应了广播，已休眠，识别名：{name}",
                hello_to_server: "{client} 已向 Websocket 服务器发送 HELLO 消息，识别名：{name}",
                message_data_third: "收到来自其他服务端的消息数据。",
                page_hidden: "{client} 因不可见已休眠，识别名：{name}",
                page_visible: "{client} 已唤醒，识别名：{name}",
                ping_server: "有其他服务端加入频道，识别名：{name}",
                set_theme_style_url: "收到来自其他服务端的命令：设置主题样式文件 URL 为 {url}",
                set_theme: "收到来自其他服务端的命令：设置主题为 {name}",
                shutdown: "收到来自其他服务端的命令：立即停止。",
                shutdown_reason: "收到来自其他服务端的命令：立即停止。原因为：${reason}",
                websocket_close: "收到来自其他服务端的命令：关闭 Websocket 连接。此命令将阻止 {client} 尝试重连。"
            },
            broadcast_launch: {
                disable: "未开启广播模式，无日志显示。",
                done: "广播模式已开启：{channel}",
                user_agent_check: "编辑器已正确安装在 OBS 中！",
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
                sent: "已发送纯文本消息：{msg}",
                sent_custom: "已发送自定义消息：{msg}",
                sent_custom_multi: "已发送 {n} 条自定义消息，首条消息为：{msg}"
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
                description: "广播控制 [alt+6]"
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
        droper: {
            title: "文件选择器",
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
    message_preview: {
        empty_message: "[空消息]",
        empty_username: "[未指定说话人]",
        undefined_message: "[未定义消息]"
    },
    page_title: {
        editor: "Echo Live 编辑器",
        history: "Echo Live 历史记录",
        live: "Echo Live",
        settings: "Echo Live 配置文件编辑器"
    },
    settings: {
        unknow_config_type: "暂不支持修改此配置",
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
            update_config_from_unknow_version: {
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
            echo: {
                title: "关于 Echo",
                description: "Echo 是 Echo-Live 的内核，提供了文本滚动输出功能。<br>它是一个工具库，任何人都可以使用 Echo 创建自己的文本展示项目。<br>如果您有兴趣了解 Echo，请见其 <a href='https://github.com/sheep-realms/Echo' target='_blank'>GitHub 仓库</a>。"
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
    }
};