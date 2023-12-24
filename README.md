# Echo Live
![banner](https://sheep-realms.github.io/images/project/echo-live/banner.png)

这是一款基于 [Echo](https://github.com/sheep-realms/Echo) 的用于无声系虚拟主播直播的仿视觉小说对话框 OBS 插件。该插件无需部署本地服务器，下载后开箱即用。

下文为帮助文档摘要，如需阅读完整帮助文档请见 [Echo-Live 在线帮助文档](https://sheep-realms.github.io/Echo-Live-Doc/)（另有 [CloudFlare 镜像](https://echo-live-doc.pages.dev/)）。

## 使用方法
### 方法一：通过 OBS 内置浏览器广播传递消息（推荐）
1. 打开 OBS，将 `live.html` 作为浏览器源 **（不要勾选 “本地文件”）** 添加到您的场景中。如果您不知道如何正确填写地址，请直接使用浏览器打开 `live.html`，然后复制地址栏里的地址。
2. 点击 OBS 菜单中的 停靠窗口 > 自定义浏览器停靠窗口，将 `editor.html` 添加到停靠窗口中。如果您不知道如何正确填写地址，同上。
3. 在弹出的编辑窗口中，根据指引填写对话数据，点击 “发送”。（注：如果您关闭了广播功能则不会有发送按钮）
4. 若要继续制作下一条对话，重复步骤 3。

注：如需修改启动后的初始消息，请编辑文件 `start.js`。

### 方法二：通过轮询传递消息
如果因 OBS 更新等原因导致上述方法失效，请尝试此方法。
1. 使用文本编辑器打开配置文件 `config.js`, 将配置项 `echolive` 中的 `broadcast_enable` 改为 `false`，`messages_polling_enable` 改为 `true`。建议您使用 [VSCode](https://code.visualstudio.com/) 等专业文本编辑器作为您的文本编辑器，不建议使用 Windows 内置的记事本。
2. 打开 OBS，将 `live.html` 作为浏览器源（勾选 “本地文件”）添加到您的场景中。
3. 使用文本编辑器打开 `start.js` 备用。
4. 通过浏览器打开 `editor.html`，根据网页指引生成对话数据并复制。
5. 将 `start.js` 中的内容全部替换成复制的内容并保存。
6. 对话框将会自动打印修改后的消息。如果没有启用消息轮询，则需手动在 OBS 中选中浏览器源，点击 “刷新”。如果您自定义了一串消息列表，点击 “交互”，在弹出的窗口中点击任意内容区域即可开始打印下一条消息。
7. 若要继续制作下一条对话，重复步骤 3 ~ 5。当您熟悉语法格式后，您也可以直接编辑 `start.js`。

## 注意事项
- 每次显示新对话都需要刷新源。
- 富文本不适合快节奏的直播活动，更适合用作预先准备好的演出。
- 您可能需要准备足够大的屏幕或副屏以获得更方便的操作体验。
- 在浏览器中预览效果时，一些浏览器的自动播放音频政策会导致您在未点击网页的情况下听不到打字音效，这是正常现象，OBS 内置浏览器无此限制。
- 请注意控制每一段话的字数，否则会溢出。
- 虽然 `config.js` 有个看起来和输出内容很像的东西，但是请不要把输出内容粘贴在这里，您应该去覆盖 `start.js` 里的内容。

## 主题
Echo-Live 内置了多套主题，您可以通过修改 `live.html` 中定义主题样式的部分修改主题，文件中已有注释指引。您可以通过 `res/style/live-theme/` 文件夹浏览可用主题。

另外，各种主题文件中都在顶部整理了常用变量，方便您快速修改诸如背景颜色、边框、字体大小等参数。

主题文件使用的是广泛运用的 CSS 样式，如有需要，您可以咨询网页或UI设计师定制主题。

### 修改主题的方法
在 `live.html` 文件中您可用看到以下被注释强调的内容：

``` html
<link rel="stylesheet" href="res/style/live-theme/vanilla.css">
```

假如您想将主题文件更换为 `bubble.css`，您应当如此修改：

``` html
<link rel="stylesheet" href="res/style/live-theme/bubble.css">
```

最后，别忘了保存文件。

### 主题介绍
| 文件名 | 名称 | 描述 |
| - | - | - |
| vanilla.css | 原版 | Echo-Live 的默认主题，几乎没有任何装饰，适用于在画面中以全屏宽度靠下展现。右侧预留了立绘位置，可将立绘覆盖在对话框之上。 |
| bubble.css | 气泡 | 常见的气泡对话框，具有粗边框和投影，可调整成任意尺寸，没有预留立绘位置。 |
| vold.css | 虚空 | 无背景对话框，仅显示文字。 |

## 客制化
- `res/style/live-theme/` 是主题文件夹，定义了对话框的样式，默认选中 `vanilla.css`，里面已经整理好了常用变量以供修改。
  - 如需切换主题，请修改 `live.html` 中定义的主题样式，文件中已有注释指引。
- `res/style/echo.css` 定义了对话框正文的样式。
- `res/style/fh-ui.css` 是编辑器所使用的 UI 库，请不要动它，除非您知道您在做什么。
- `res/style/editor.css` 是编辑器所使用的样式，请不要动它，除非您知道您在做什么。
- `config.js` 是配置文件，可修改默认滚动速度等信息。
- `res/script/live.js` 是部署 `res/class/Echo.js` 的脚本，主要工作为导入配置、绑定事件、配合 `res/style/echo.css` 解析消息格式。
- `res/script/live-pre.js` 是在 `live.html` 头部加载的脚本，负责导入扩展资源。
- `res/script/sounds.js` 定义了打字音效。
- `res/class/EchoLive.js` 是业务逻辑类，目前正在封装整理 `res/script/live.js` 中的脚本。

## 扩展
Echo-Live 支持扩展，可用于增加额外资源。

**注意：Echo-Live 的扩展仅作规范导入分享资源之用，虽然目前仅支持增加额外音频资源，但实际上可以被用来做任何事，因此请谨慎安装来路不明的扩展。**

### 安装
1. 将扩展（是一个文件夹）放入 `extensions` 文件夹。
2. 在 `extensions.js` 中插入该扩展的文件夹名称。

### 开发
首先，您需要为您的扩展创建一个文件夹，推荐使用英文字符命名。在该文件夹中创建文件 `pack.js`，使用 `extensionManager.load()` 方法加载扩展资源。

该方法需要传入 Object 数据，示例如下：
``` javascript
extensionManager.load({
    meta: {
        namespace: 'sample'
    },
    addon: {
        audio: [
            {
                name: 'sonar',
                path: 'audio/sonar.ogg'
            }
        ]
    }
});
```

| 键名 | 类型 | 描述 |
| - | - | - |
| `meta` | Object | 扩展元数据。 |
| `meta.namespace` | String | 命名空间，与文件夹名称一致。 |
| `addon` | Object | 扩展所添加的额外内容。 |
| `addon.audio` | Array | 音效列表。 |
| `addon.audio[].name` | String | 音效名称。 |
| `addon.audio[].path` | String | 音效路径，以 `pack.js` 所在文件夹为起点。 |

使用扩展添加新音效后，需要以 `命名空间:音效名称` 的格式调用音效。

## 杂谈
这是我目前能想到的最优解决方案，更便捷的操作流程需要部署服务器，无论是本地服务器还是云服务器都是对用户智商和钱包的考验。如果您有更优秀的解决方案，欢迎提出。

## 另见
- [如何为 Echo-Live 项目作出贡献？](CONTRIBUTING.md)
- [授权协议与声明](copyright.md)
- [GPL（GNU General Public License，GNU通用公共许可协议）第3版](LICENSE)
- [Echo-Live-Typetool](https://github.com/RaySky-Rt/Echo-Live-Typetool)

## 相关资源
建议您安装可免费商用字体以规避版权纠纷，Echo-Live 默认使用思源黑体。

- [思源黑体](https://github.com/adobe-fonts/source-han-sans)
