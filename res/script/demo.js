const data = {
    username: '【绵羊】',
    messages: [
        {message: ''},
        {message: '你好，这里是绵羊！'},
        {message: '如你所见，这是一个用于无声直播的类似于视觉小说的对话框。'},
        {
            message: [
                {text: '一些无声系虚拟主播也许需要用类似的方式与观众进行文字交流。', pause: 20},
                {text: '没错，我也需要。'}
            ]
        },
        {message: '于是我把我以前开发的一款 JavaScript 小工具 Echo.js 运用在了这里，开发了一款用于直播的 H5 对话框插件。'},
        {
            message: [
                {text: '我把它叫做 Echo Live......', pause: 40},
                {text: ' 好吧我承认这个名字很随便。'}
            ]
        },
        {message: '对话框内的文本支持多种样式。'},
        {
            message: [
                {text: '支持更改文字颜色，我要给你点颜色看看。', pause: 40},
                {text: '这是红色。', style: {color: 'red'}, pause: 20},
                {text: '这是绿色。', style: {color: 'green'}}
            ]
        },
        {
            message: [
                {text: '支持更改字形与样式。', pause: 40},
                {text: '这是粗体。', style: {bold: true}, pause: 20},
                {text: '这是斜体。', style: {italic: true}, pause: 20},
                {text: '这是下划线。', style: {underline: true}}
            ]
        },
        {
            message: [
                {text: '甚至', typewrite: "shen'zhi"},
                {text: '可以', typewrite: "k'y"},
                {text: '模拟', typewrite: "mo'ni"},
                {text: '打字', typewrite: "da'zi"},
                {text: '过程', typewrite: "guo'cheng"},
                {text: '。'}
            ], data: {printSpeed: 80}
        },
        {message: '可以自定义滚动速度。', data: {printSpeed: 80}},
        {
            message: [
                {text: '也可以在必要的时候，', pause: 20},
                {text: '停顿一下。'}
            ]
        },
        {message: '中日韩字符滚动速度减半。相对于中日韩字符，英文字符具有两倍的滚动速度。下面是示例......'},
        {
            message: [
                {
                    text: '「日々私たちが過ごしている日常は、実は、奇跡の連続なのかもしれない。」',
                    style: { style: 'text-indent: -1em; display: block;' }
                }
            ]
        },
        {
            message: [
                {
                    text: '"Every ordinary day we experience may be a continuous miracle."',
                    style: { style: 'text-indent: -0.5em; display: block;' }
                }
            ]
        },
        {
            message: [
                {
                    text: '「我们所经历的每个平凡的日常，也许就是连续发生的奇迹。」',
                    style: { style: 'text-indent: -1em; display: block;' }
                }
            ]
        },
        {
            message: [
                {text: '你也可以自定义一些有趣的动画样式。', pause: 20},
                {text: '比如...... ', pause: 40},
                {text: '跳一跳！', style: {rock: 'y'}}
            ]
        },
        {
            message: [
                {text: '你可能想问，', pause: 20},
                {text: '不，你必须得问。', pause: 20},
                {text: '这么多功能，操作难度会不会有点高？',}
            ]
        },
        {message: '问到点上了。确实有点难，这是我目前正在解决的问题。'},
        {message: '我需要优化一下 Echo Live，尽可能做到让乘法口诀都记不住的虚拟主播都会用，然后再发布。'},
        {message: '如果你对这个项目感兴趣，可以去 GitHub 上看看 sheep-realms/Echo，里面有详细(?)的开发文档。'},
        {message: '过段时间我也会把 Echo Live 上传到 GitHub，大概。'},
        {message: '（Echo 里一堆屎山代码，不知道要优化到猴年马月......）'},
        {message: '以上就是对 Echo Live 功能展示的全部内容，感谢你看到这里，我们有缘再见。'}
    ]
};