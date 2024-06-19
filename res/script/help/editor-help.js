let helpKey = EchoLiveTools.getUrlParam('help');

if (helpKey != null && helpKey != undefined) {
    const driver = window.driver.js.driver;
    const driverObj = driver({
        animate: !config.accessible.animation_disable,
        showProgress: true,
        progressText: '{{current}} / {{total}}',
        nextBtnText: '继续 →',
        prevBtnText: '← 后退',
        doneBtnText: '完成',
        showButtons: [
            'next',
            'close'
        ],
        steps: [
            {
                popover: {
                    title: '欢迎使用 Echo-Live！',
                    description: '接下来我们将进入一段新手引导。<br>如果您不方便使用鼠标，可以使用方向键 <kbd>→</kbd> 前往下一个步骤，也可以按 <kbd>Esc</kbd> 键退出引导。'
                }
            }, {
                popover: {
                    title: '我们只能一路向前',
                    description: '虽然我把后退按钮删了，但你还是可以通过方向键来后退。为了引导的正常进行，请不要后退，也不要乱点高亮框内的东西。求求您千万不要！',
                    onNextClick: () => {
                        $('#ptext-character').val('追音');
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#ptext-character',
                popover: {
                    title: '说话人',
                    description: '这里填入需要在对话框中显示的说话人，如果不需要则可以留空。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-content').val('你好，世界！');
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#ptext-content',
                popover: {
                    title: '消息内容',
                    description: '这里填入在对话框中显示的消息，消息将会使用打印动画逐字输出内容。',
                    side: "bottom",
                    align: 'start'
                }
            }, {
                element: '#ptext-collapse-use-formatting-code',
                popover: {
                    title: '快速格式化代码',
                    description: '如果想要更丰富的文本样式，可以在这里启用快速格式化代码。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-collapse-use-formatting-code[aria-selected="false"]').click();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#ptext-editor .editor-controller',
                popover: {
                    title: '工具栏',
                    description: '启用快速格式化代码后，您可以点击这些按钮插入快速格式化代码。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-content').val('@b你好，世界！');
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#ptext-content',
                popover: {
                    title: '插入代码',
                    description: '点击工具栏中的按钮，就能在光标处插入对应的代码。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-editor .editor-controller button[data-value="color"]').click();
                        $('#popups-palette .color-box').eq(0).focus();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#popups-palette',
                popover: {
                    title: '颜色选择器',
                    description: '您可以在这里选择文本颜色，点击色块就能在光标处插入对应的颜色代码。',
                    side: "bottom",
                    align: 'start'
                }
            }, {
                element: '#popups-palette .popups-palette-header',
                popover: {
                    title: '色板',
                    description: '不喜欢这些颜色？这里有多种色板供您选择。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        popupsDisplay('#popups-palette', false);
                        $('#ptext-content').val('@b你好，@[#1890ff]世界！');
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#ptext-content',
                popover: {
                    title: '插入颜色',
                    description: '现在，我们已经成功插入了颜色！',
                    side: "bottom",
                    align: 'start'
                }
            }, {
                element: '#ptext-content',
                popover: {
                    title: '关于快速格式化代码',
                    description: '请注意，快速格式化代码会影响其后所有文本的样式，并且是可以叠加的。直到遇到 @r，这会清空所有样式。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-editor .editor-controller button[data-value="image"]').click();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#popups-image',
                popover: {
                    title: '图片选择器',
                    description: '您还可以在消息中插入图片。可以直接导入文件，这会打开一个系统的文件选择器，也可以通过 URL 地址导入文件。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#popups-image .tabpage-nav-item[data-pageid="images"]').click();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '#popups-image',
                popover: {
                    title: '图库',
                    description: '您使用过的图片会保存在这里，即便您刷新网页之后也依旧存在。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        popupsDisplay('#popups-image', false);
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="ptext"] .editor-controller-bottom',
                popover: {
                    title: '输出消息',
                    description: '当您编写好消息后，就可以在这里点击按钮输出消息了。如果您启用了广播模式，您可以在这里直接发送消息。',
                    side: "top",
                    align: 'start'
                }
            }, {
                element: '#echo-editor-nav',
                popover: {
                    title: '导航栏',
                    description: '接下来我们来看看别的东西。',
                    side: "bottom",
                    align: 'start',
                    onNextClick: () => {
                        $('#ptext-btn-submit').click();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="output"]',
                popover: {
                    title: '输出标签页',
                    description: '当您在编辑器中点击了输出按钮时，消息的代码会输出到此处。',
                    side: "right",
                    align: 'start'
                }
            }, {
                element: '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="output"] .editor-controller-bottom',
                popover: {
                    title: '自定义消息',
                    description: '如果您启用了广播模式，您可以在这里直接发送消息，这意味着您可以发送功能更丰富的自定义消息。',
                    side: "top",
                    align: 'start',
                    onNextClick: () => {
                        $('#tabpage-nav-log').click();
                        driverObj.moveNext();
                    }
                }
            }, {
                element: '.tabpage-centent[data-navid="main"] .tabpage-panel[data-pageid="log"]',
                popover: {
                    title: '日志标签页',
                    description: '在日志标签页中，您可以看到广播模式下广播系统的运行日志。',
                    side: "right",
                    align: 'start',
                    onNextClick: () => {
                        $('#tabpage-nav-ptext').click();
                        sysNotice.send('您好！', '', 'info', {
                            id: 'help-sey-hello',
                            waitTime: 30000
                        });
                        driverObj.moveNext();
                    }
                }
            }, {
                popover: {
                    title: '通知',
                    description: '此刻冒出来的是通知消息，一些需要您留意的通知会出现在此处。',
                    onNextClick: () => {
                        sysNotice.killById('help-sey-hello');
                        driverObj.moveNext();
                    }
                }
            }, {
                popover: {
                    title: '新人引导结束',
                    description: '再次感谢您使用 Echo-Live！如果您还有疑问，可以阅读<a class="fh-link" href="https://sheep-realms.github.io/Echo-Live-Doc/" target="_blank">帮助文档</a>或咨询开发者。'
                }
            }
        ]
    });
    driverObj.drive();
}