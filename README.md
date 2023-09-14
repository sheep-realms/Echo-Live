# Echo Live
一款基于 [Echo](https://github.com/sheep-realms/Echo) 的用于无声系虚拟主播直播的仿视觉小说对话框 OBS 插件。

## 使用方法
1. 打开 OBS，将 `live.html` 作为浏览器源添加到您的场景中。
2. 使用文本编辑器打开 `start.js` 备用。建议您使用 [VSCode](https://code.visualstudio.com/) 等专业文本编辑器作为您的文本编辑器，不建议使用 Windows 内置的记事本。
3. 通过浏览器打开 `editor.html`，根据网页指引生成对话数据并复制。
4. 将 `start.js` 中的内容替换成复制的内容。
5. 在 OBS 中选中浏览器源，点击 “刷新”。如果您自定义了一串消息列表，点击 “交互”，在弹出的窗口中点击任意内容区域即可开始打印下一条消息。