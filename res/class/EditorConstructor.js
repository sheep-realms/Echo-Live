class DOMConstructor {
    constructor() {}

    static join(domlist = []) {
        return domlist.join('');
    }
}

// 字段列表构造器
class EditorTextList {
    constructor() {}

    /**
     * 项目
     * @param {Number} index 索引编号
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getItem(index, value) {
        return `
        <div class="editor-text-list-item" data-index="${index}">
            <span class="index">${index + 1}.</span>
            <span class="text">${value.text}</span>
            <span class="btn">
                <button class="fh-button fh-small" data-index="${index}">编辑</button>
                <button class="fh-button fh-small fh-danger" data-index="${index}">删除</button>
            </span>
        </div>`;
    }

    /**
     * 列表
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getList(value) {
        let dom = '';
        for (let i = 0; i < value.length; i++) {
            dom += this.getItem(i, value[i]);
        }
        return dom;
    }
}

// 表单构造器
class EditorForm {
    constructor() {}

    /**
     * 提示
     * @param {String} label 标签名称
     * @returns {String} DOM
     */
    static tip(label) {
        return `<div class="abuser-from-checkbox-list"><span class="abuser-from-input-tip">${label}</span></div>`
    }

    /**
     * 表单项目
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} content 内容
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static item(id, label, content, tip = '') {
        return `<div class="abuser-from-row"><label for="${id}">${label}</label>${content}</div>${tip != '' ? FormConstructor.tip(tip) : ''}`;
    }

    /**
     * 输入框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @param {String} type 类型
     * @returns {String} DOM
     */
    static input(id, label, def, tip = '', type = 'text') {
        return FormConstructor.item(
            id,
            label,
            `<input type="${type}" name="${id}" id="${id}" class=" abuser-form-item" value="${def}" data-default="${def}">`,
            tip
        );
    }

    /**
     * 数字输入框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static inputNum(id, label, def, tip = '') {
        return FormConstructor.input(id, label, def, tip, 'number');
    }

    /**
     * 复选框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static checkbox(id, label, def, tip = '') {
        return FormConstructor.item(
            id,
            '',
            `<button role="checkbox" aria-selected="${def}" class="checkbox ${def == 1 ? 'selected' : ''}">
                <span class="icon"></span>
                <span class="text">${label}</span>
                <input type="hidden" name="${id}" id="${id}" value="${def}" data-default="${def}">
            </button>`,
            tip
        );
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'ghost'|'dashed'|'air'} data.type 按钮类型
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static button(content, data) {
        return `<button
            ${data?.id ? `id="${data.id}"` : ''}
            class="
                fh-button
                ${data?.type ? 'fh-' + data?.type : ''}
                ${data?.size ? 'fh-' + data?.size : ''}
                ${data?.color ? 'fh-' + data?.color : ''}
                ${data?.icon ? 'fh-icon-button' : ''}
                ${data?.class ? data.class : ''}
            "
            ${data?.disabled ? 'disabled' : ''}
            ${data?.title ? `title="${data.title}"` : ''}
            ${data?.attr ? data.attr : ''}
        >
            ${data?.icon ? data?.icon : ''}${content}
        </button>`
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static buttonGhost(content, data) {
        data = {
            ...data,
            ...{
                type: 'ghost'
            }
        }
        return EditorForm.button(content, data);
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static buttonAir(content, data) {
        data = {
            ...data,
            ...{
                type: 'air'
            }
        }
        return EditorForm.button(content, data);
    }

    /**
     * 编辑器控制器
     * @param {String} editorID 编辑器ID
     * @returns {String} DOM
     */
    static editorController(editorID) {
        return DOMConstructor.join([
            EditorForm.buttonAir('', {
                icon: Icon.formatBold(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="bold"`,
                title: '粗体 [Ctrl+B]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatItalic(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="italic"`,
                title: '斜体 [Ctrl+I]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatUnderline(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="underline"`,
                title: '下划线 [Ctrl+U]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatStrikethroughVariant(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="strikethrough"`,
                title: '删除线 [Ctrl+D]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.palette(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="color"`,
                title: '文本颜色'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatClear(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="clear"`,
                title: '清除格式 [Ctrl+Shift+Space]'
            })
        ]);
    }
}

class Popups {
    constructor() {}

    /**
     * 悬浮框
     * @param {String} content 内容
     * @param {String} id ID 
     * @param {Object} data 属性值
     * @param {String} data.class 类
     * @param {Object} data.pos 位置
     * @param {Number} data.pos.x X 坐标
     * @param {Number} data.pos.y Y 坐标
     * @param {Object} data.width 宽度
     * @param {String} data.width.min 最小宽度
     * @param {String} data.width.max 最大宽度
     * @param {Object} data.height 高度
     * @param {String} data.height.min 最小高度
     * @param {String} data.height.max 最大高度
     * @returns {String} DOM
     */
    static container(content = '', id = '', data = {}) {
        data = {
            class: '',
            pos: {
                x: 0,
                y: 0
            },
            width: {
                min: '200px',
                max: '100vw'
            },
            height: {
                min: '150px',
                max: '300px'
            },
            ...data
        };
        return `<div
            ${ id != '' ? `id="${id}"` : '' }
            class="fh-popups hide ${ data.class != '' ? data.class : '' }"
            style="
                --popups-pos-left: ${ data.pos.x }px;
                --popups-pos-top: ${ data.pos.y }px;
                --popups-width-min: ${ data.width.min };
                --popups-width-max: ${ data.width.max };
                --popups-height-min: ${ data.height.min };
                --popups-height-max: ${ data.height.max };
            "
        >
            ${ content }
        </div>`;
    }

    /**
     * 拾色器色板切换选项
     * @param {Array<Object>} palette 色板列表
     * @returns {String} DOM
     */
    static paletteOptions(palette = []) {
        let dom = '';
        palette.forEach(e => {
            dom += `<option value="${ e.meta.name }">${ e.meta.title }</option>`
        });
        return dom;
    }

    /**
     * 拾色器色板内容
     * @param {Object} palette 色板
     * @returns {String} DOM
     */
    static paletteContent(palette = {}) {
        let dom = '<div class="palette-list">';
        palette.colors.forEach(e => {
            if (e?.type === undefined || e?.type === 'color') {
                dom += `<button class="color-box" title="${ e.title.replace(/"/g, '&quot;') }" data-value="${ e.value.replace(/"/g, '') }" style="--color: ${ e.value.replace(/"/g, '') };"><div class="color"></div></button>`
            } else if (e?.type === 'group') {
                dom += `</div><div class="palette-group">${ e.value.replace(/</g, '&lt;').replace(/>/g, '&gt;') }</div><div class="palette-list">`
            }
        });
        dom += '</div>'
        return dom;
    }

    /**
     * 拾色器色板页面
     * @param {Array<Object>} palette 色板列表
     * @returns {String} DOM
     */
    static palettePage(palette = []) {
        let dom = '';
        palette.forEach(e => {
            dom += `<div class="palette-page hide" data-palette-id="${ e.meta.name }">${ Popups.paletteContent(e) }</div>`
        });
        return dom;
    }

    /**
     * 拾色器对比度测试面板测试项目状态框
     * @param {String} title 标题
     * @param {String|Number} value 值
     * @param {String} DOMClass 类
     * @param {'ok'|'fail'} state 状态
     * @returns {String} DOM
     */
    static paletteColorContrastBox(title, value, DOMClass, state = 'ok') {
        return `<div class="diff-result-box ${ DOMClass } state-${ state }">
            <div class="diff-result-content ok" title="${ title } 测试通过">
                <div class="title">${ value }</div>
                <div class="icon">
                    ${ Icon.check() }
                </div>
            </div>
            <div class="diff-result-content fail" title="${ title } 测试失败">
                <div class="title">${ value }</div>
                <div class="icon">
                    ${ Icon.close() }
                </div>
            </div>
        </div>`;
    }

    /**
     * 拾色器对比度测试面板
     * @param {String} bgc 背景色
     * @param {String} fgc 前景色
     * @param {Object} r 测试结果
     * @param {Number} r.contrastRatio 对比度
     * @param {Boolean} r.meetsAA WCAG AA 标准
     * @param {Boolean} r.meetsAAA WCAG AAA 标准
     * @returns {String} DOM
     */
    static paletteColorContrast(bgc = '#ffffff', fgc = '#000000', r = {contrastRatio: 21, meetsAA: true, meetsAAA: true}) {
        return `<div class="diff-dashboard" style="--bg-color: ${ bgc }; --fg-color: ${ fgc };">
            <div class="diff-bg">
                <span class="diff-fg-text">${ bgc.toUpperCase() }</span>
            </div>
            <div class="diff-fg"></div>
        </div>
        <div class="diff-result">
            ${ Popups.paletteColorContrastBox('对比度参考阈值', '21', 'diff-result-contrast') }
            ${ Popups.paletteColorContrastBox('WCAG AA', 'AA', 'diff-result-aa') }
            ${ Popups.paletteColorContrastBox('WCAG AAA', 'AAA', 'diff-result-aaa') }
        </div>`
    }

    /**
     * 拾色器悬浮框
     * @param {Array<Object>} palette 色板列表
     * @param {Object} data 属性值
     * @param {String} data.class 类
     * @param {Object} data.pos 位置
     * @param {Number} data.pos.x X 坐标
     * @param {Number} data.pos.y Y 坐标
     * @param {Object} data.width 宽度
     * @param {String} data.width.min 最小宽度
     * @param {String} data.width.max 最大宽度
     * @param {Object} data.height 高度
     * @param {String} data.height.min 最小高度
     * @param {String} data.height.max 最大高度
     * @param {String} id ID
     * @returns {String} DOM
     */
    static palettePopups(palette = [], data = {}, id = 'popups-palette') {
        data = {
            width: {
                min: '400px',
                max: '400px'
            },
            height: {
                min: '300px',
                max: '300px'
            },
            ...data
        }

        if (!Array.isArray(palette) || palette.length < 1) {
            palette = [
                {
                    meta: {
                        name: 'missingno',
                        title: 'missingno'
                    },
                    colors: [
                        { type: 'group', value: '卧槽？！你在干什么？我放在这里那么大一个调色板呢？还好我技高一筹给你兜住了！' },
                        { value: '#000000', title: 'Black' },
                        { value: '#ffffff', title: 'White' }
                    ]
                }
            ];
        }

        return Popups.container(
            `<div class="popups-palette-header">
                <label for="popups-palette-select" style="display: none;">色板库</label>
                <div class="popups-palette-select-content">
                    <kbd class="accessible-key">Q</kbd>
                    <select name="popups-palette-select" id="popups-palette-select">
                        ${ Popups.paletteOptions(palette) }
                    </select>
                    <kbd class="accessible-key">E</kbd>
                </div>
            </div>
            <div class="popups-palette-color-contrast">
                ${ Popups.paletteColorContrast() }
            </div>
            <div class="popups-palette-content">
                ${ Popups.palettePage(palette) }
            </div>
            <div class="popups-palette-accessible">
                <span>需要无障碍使用帮助吗？</span>
                ${
                    EditorForm.buttonAir(
                        '了解详情',
                        {
                            id: 'popups-palette-accessible-help-btn'
                        }
                    )
                }
            </div>`,
            id,
            data
        );
    }
}

// 客户端状态仪表构造器
class EditorClientState {
    constructor() {}

    static block(type, title = '') {
        return `<div class="echo-live-client-state-block state-${type}" title="${title}"></div>`
    }

    static clientBlock(client) {
        if (client.hidden) {
            return EditorClientState.block('sleep', '休眠');
        } else {
            return EditorClientState.block('active', '激活');
        }
    }

    static clientList(clients) {
        if (clients.length == 0) return EditorClientState.block('none');
        let dom = '';
        clients.forEach(e => {
            dom += EditorClientState.clientBlock(e);
        });
        return dom;
    }

    static statePanel(clients) {
        return `<div class="echo-live-client-state-panel">${EditorClientState.clientList(clients)}</div>`;
    }
}

class HistoryMessage {
    constructor() {}

    static sentAt(time) {
        return `（于 ${time} 再次发送）`;
    }

    static item(message, username, time, length, index) {
        return `<div class="history-message-item" role="listitem">
            <div class="content">
                <div class="username">${username}</div>
                <div class="message">${message}</div>
                ${ length > 1 ? `<div class="length">... 等 ${length} 条消息</div>` : ''}
                <div class="time">
                    <span class="created">${time}</span>
                    <span class="sent hide">${HistoryMessage.sentAt(time)}</span>
                </div>
            </div>
            <div class="action">
                ${EditorForm.buttonGhost('编辑', {
                    icon: Icon.pencil(),
                    class: 'history-message-item-btn-edit',
                    attr: `data-index="${index}"`
                })}
                ${EditorForm.buttonGhost('发送', {
                    icon: Icon.send(),
                    class: 'history-message-item-btn-send',
                    attr: `data-index="${index}"`
                })}
            </div>
        </div>`;
    }
}