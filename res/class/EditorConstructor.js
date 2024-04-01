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
        return `<div class="echo-editor-form-checkbox-list"><span class="echo-editor-form-input-tip">${label}</span></div>`
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
        return `<div class="echo-editor-form-row"><label for="${id}">${label}</label>${content}</div>${tip != '' ? FormConstructor.tip(tip) : ''}`;
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
            `<input type="${type}" name="${id}" id="${id}" class=" echo-editor-form-item" value="${def}" data-default="${def}">`,
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
                title: $t('editor.format.bold') + ' [Ctrl+B]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatItalic(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="italic"`,
                title: $t('editor.format.italic') + ' [Ctrl+I]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatUnderline(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="underline"`,
                title: $t('editor.format.underline') + ' [Ctrl+U]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatStrikethroughVariant(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="strikethrough"`,
                title: $t('editor.format.strikethrough') + ' [Ctrl+D]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.palette(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="color"`,
                title: $t('editor.format.color')
            }),
            EditorForm.buttonAir('', {
                icon: Icon.formatClear(),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="clear"`,
                title: $t('editor.format.clear') + ' [Ctrl+Shift+Space]'
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
            <div class="diff-result-content ok" title="${ $t('editor.palette.diff_dashboard.state.ok', { name: title }) }">
                <div class="title">${ value }</div>
                <div class="icon">
                    ${ Icon.check() }
                </div>
            </div>
            <div class="diff-result-content fail" title="${ $t('editor.palette.diff_dashboard.state.fail', { name: title }) }">
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
            <div class="diff-bg" title="${ $t('editor.palette.diff_dashboard.background_color') }">
                <span class="diff-fg-text">${ bgc.toUpperCase() }</span>
            </div>
            <div class="diff-fg" title="${ $t('editor.palette.diff_dashboard.foreground_color') }"></div>
        </div>
        <div class="diff-result">
            ${ Popups.paletteColorContrastBox($t('editor.palette.diff_dashboard.result.contrast'), '21', 'diff-result-contrast') }
            ${ Popups.paletteColorContrastBox($t('editor.palette.diff_dashboard.result.wcag_aa'), 'AA', 'diff-result-aa') }
            ${ Popups.paletteColorContrastBox($t('editor.palette.diff_dashboard.result.wcag_aaa'), 'AAA', 'diff-result-aaa') }
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
                        { type: 'group', value: $t('editor.palette.empty') },
                        { value: '#000000', title: 'Black' },
                        { value: '#ffffff', title: 'White' }
                    ]
                }
            ];
        }

        return Popups.container(
            `<div class="popups-palette-header">
                <label for="popups-palette-select" style="display: none;">${ $t('editor.palette.select') }</label>
                <div class="popups-palette-select-content">
                    <kbd class="accessible-key">Q</kbd>
                    <select name="popups-palette-select" id="popups-palette-select">
                        ${ Popups.paletteOptions(palette) }
                    </select>
                    <kbd class="accessible-key">E</kbd>
                </div>
            </div>
            <div class="popups-palette-color-contrast" aria-label="${ $t('editor.palette.diff_dashboard.index') }">
                ${ Popups.paletteColorContrast() }
            </div>
            <div class="popups-palette-content">
                ${ Popups.palettePage(palette) }
            </div>
            <div class="popups-palette-accessible">
                <span>${ $t('editor.palette.accessible.tip') }</span>
                ${
                    EditorForm.buttonAir(
                        $t('ui.more_info'),
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

    static block(state, echoState = 'stop', messagesCount = 0, name = '') {
        let name2 = name;
        let title = '';
        let titleKey = 'editor.client_state_panel.tip';
        if (messagesCount > 0) titleKey = 'editor.client_state_panel.tip_more_messages'
        title = $t(
            titleKey,
            {
                client: $t('editor.client_state.' + state),
                echo: $t('editor.echo_state.' + echoState)
            }
        );
        if (name.search(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i) != -1) name2 = '(' + name.split('-')[0] + ')';
        return `<button
            class="
                echo-live-client-state-block
                state-${state}
                echo-state-${echoState}
                ${ messagesCount > 0 ? 'echo-messages-next' : '' }
            "
            title="${title}"
            data-name="${name}"
        >
            <div class="client-info">
                <div class="client-icon client-icon-left"></div>
                <div class="client-name">${name2}</div>
                <div class="client-icon client-icon-right">
                    ${ echoState == 'play' || echoState == 'ready' ? Icon.timerSand() : ''}
                    ${ messagesCount > 0 && echoState == 'stop' ? Icon.messageProcessing() : '' }
                </div>
            </div>
            <div class="state-color-block"></div>
        </button>`
    }

    static clientBlock(client) {
        if (client.hidden) {
            return EditorClientState.block('sleep', client.echoState, client.messagesCount, client.name);
        } else {
            return EditorClientState.block('active', client.echoState, client.messagesCount, client.name);
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

    static statePanel(clients = []) {
        const c = clients.filter((e) => {
            return e.type == 'live';
        });
        return `<div class="echo-live-client-state-panel">${EditorClientState.clientList(c)}</div>`;
    }
}

class HistoryMessage {
    constructor() {}

    static sentAt(time) {
        return $t('editor.history.resent_at', { time: time });
    }

    static item(message, username, time, length, index) {
        return `<div class="history-message-item" role="listitem">
            <div class="content">
                <div class="username">${username}</div>
                <div class="message">${message}</div>
                ${ length > 1 ? `<div class="length">${ $t('editor.history.messages_more', { n: length }) }</div>` : ''}
                <div class="time">
                    <span class="created">${time}</span>
                    <span class="sent hide">${HistoryMessage.sentAt(time)}</span>
                </div>
            </div>
            <div class="action">
                ${EditorForm.buttonGhost($t('ui.edit'), {
                    icon: Icon.pencil(),
                    class: 'history-message-item-btn-edit',
                    attr: `data-index="${index}"`
                })}
                ${EditorForm.buttonGhost($t('ui.send'), {
                    icon: Icon.send(),
                    class: 'history-message-item-btn-send',
                    attr: `data-index="${index}"`
                })}
            </div>
        </div>`;
    }
}




class SettingsPanel {
    constructor() {}

    static navItem(item) {
        return `<button
            class="settings-nav-item"
            data-pageid="${ item.id }"
            role="tab"
            aria-selected="false"
            title="${ $t( 'config.' + item.id + '._description' ) }"
        >
            <span class="icon left">${ item.icon != undefined ? Icon[item.icon]() : ''}</span>
            <span class="title">${ $t( 'config.' + item.id + '._title' ) }</span>
            <span class="icon right"></span>
        </button>`;
    }

    static nav(items) {
        let dom = '';
        items.forEach(e => {
            dom += SettingsPanel.navItem(e);
        });

        return dom;
    }

    static page(id, content = '') {
        return `<div class="settings-page hide" data-pageid="${ id }">${ content }</div>`;
    }

    static setGroupTitle(title = '', description = '') {
        return `<div class="settings-group-title">
            <div class="title">${ title }</div>
            <div class="description">${ description }</div>
        </div>`;
    }

    static setItem(type = 'string', id = '', title = '', description = '', content = '', moreContent = '') {
        return `<div class="settings-item settings-type-${ type.split('.')[0] }" data-id="${ id }" data-type="${ type }">
            <div class="meta">
                <div class="title">${ title }</div>
                <div class="description">${ description }</div>
            </div>
            <div class="value">
                ${ content }
            </div>
            ${ moreContent != '' ? moreContent : '' }
        </div>`;
    }

    static setItemAuto(item) {
        const fun = {
            string: 'setItemString',
            number: 'setItemNumber',
            boolean: 'setItemBoolean',
        }

        const funSpecial = {
            all_or_array_string: 'setItemAllOrArrayString'
        };

        let types = item.type.split('.');

        let run = fun[types[0]];

        if (types[0] == 'special') {
            run = funSpecial[types[1]];
        }

        if (run == undefined) run = 'setItemUnknow';

        const title = $t( 'config.' + item.name + '._title' );
        const description = $t( 'config.' + item.name + '._description' );

        if (item.type == 'object') return SettingsPanel.setGroupTitle(title, description);
        if (item.type == 'boolean.bit') return SettingsPanel.setItemBoolean(item.type, item.name, title, description, item.default, item?.attribute, true);

        return SettingsPanel[run](item.type, item.name, title, description, item.default, item?.attribute);
    }

    static setItems(items) {
        let dom = '';
        items.forEach(e => {
            dom += SettingsPanel.setItemAuto(e);
        });
        return dom;
    }

    static setItemUnknow(type = '', id = '', title = '', description = '', value = '') {
        return SettingsPanel.setItem(
            type, id, title, description,
            `<span class="settings-unknow-config-type">${ $t('settings.unknow_config_type') }</span>`
        );
    }

    static setItemString(type = '', id = '', title = '', description = '', value = '', attribute = undefined) {
        value = String(value).replace(/"/g, '&quot;');
        let dl = '';
        let hasDatalist = false;
        if (attribute != undefined) {
            if (attribute?.datalist != undefined) {
                hasDatalist = true;
                dl += `<datalist id="${ id.replace(/\./g, '-') }-datalist">`;
                attribute.datalist.forEach(e => {
                    dl += `<option value="${ e.value }">${ e?.title ? e.title : '' }</option>`;
                });
                dl += `</datalist>`;
            }
        }
        return SettingsPanel.setItem(
            'string', id, title, description,
            `<label class="title" style="display: none;" for="${ id.replace(/\./g, '-') }">${ title }</label>
            <input type="text" id="${ id.replace(/\./g, '-') }" class="settings-value code" ${ hasDatalist ? `list="${ id.replace(/\./g, '-') }-datalist"` : '' } aria-label="${ title }" data-default="${ value }" value="${ value }">${ dl }`
        );
    }

    static setItemNumber(type = '', id = '', title = '', description = '', value = '', attribute = undefined) {
        value = String(value).replace(/"/g, '&quot;');
        let attr = '';
        if (attribute != undefined) {
            if (attribute?.max != undefined) attr += `max="${ attribute.max }" `;
            if (attribute?.min != undefined) attr += `min="${ attribute.min }" `;
            if (attribute?.step != undefined) attr += `step="${ attribute.step }" `;
        }
        return SettingsPanel.setItem(
            type, id, title, description,
            `<label class="title" style="display: none;" for="${ id.replace(/\./g, '-') }">${ title }</label>
            <input type="number" id="${ id.replace(/\./g, '-') }" ${ attr }class="settings-value code" aria-label="${ title }" data-default="${ value }" value="${ value }">`
        );
    }

    static setItemBoolean(type = '', id = '', title = '', description = '', value = '', attribute = undefined, isBit = false) {
        value = String(value).replace(/"/g, '&quot;');
        return SettingsPanel.setItem(
            type, id, title, description,
            `<div class="settings-switch state-${ value ? 'on' : 'off' }" data-is-bit="${ isBit ? '1' : '0' }">
                ${
                    EditorForm.button($t('ui.off'), {
                        icon: Icon.toggleSwitchOffOutline(),
                        class: 'btn-switch btn-off',
                        type: 'ghost'
                    })
                }
                ${
                    EditorForm.button($t('ui.on'), {
                        icon: Icon.toggleSwitch(),
                        class: 'btn-switch btn-on'
                    })
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }" class="settings-value settings-switch-value" data-default="${ value }" value="${ value }">
            </div>`
        );
    }

    static setItemAllOrArrayString(type = '', id = '', title = '', description = '', value = '') {
        let list = [];
        let isAll = false;
        let listStr = '';
        if (value === 'all') {
            list = [];
            isAll = true;
        } else if (!Array.isArray(value)) {
            list = [];
        } else {
            list = value;
            listStr = list.filter(str => str.trim() !== '').map(str => str.trim()).join('\n');
        }

        return SettingsPanel.setItem(
            type, id, title, description,
            `<div class="settings-switch settings-switch-all-or-array-string state-${ isAll ? 'on' : 'off' }">
                ${
                    EditorForm.button($t('ui.enable_all'), {
                        icon: Icon.toggleSwitchOffOutline(),
                        class: 'btn-switch btn-off',
                        type: 'ghost'
                    })
                }
                ${
                    EditorForm.button($t('ui.enable_all'), {
                        icon: Icon.toggleSwitch(),
                        class: 'btn-switch btn-on'
                    })
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }-is-all" class="settings-value-enable-all settings-switch-value" data-default="${ isAll }" value="${ isAll }">
            </div>`,
            `<div class="content ${ isAll ? 'hide' : '' }">
                <div class="settings-value-list-box">
                    <textarea id="${ id.replace(/\./g, '-') }-list" class="settings-value-list code" data-default="${ isAll ? '' : encodeURIComponent(listStr) }">${ listStr }</textarea>
                </div>
            </div>`
        );
    }

    static linkBar(title = '', href = '', icon = undefined) {
        return `<a class="settings-link-bar" href="${ href }" target="_blank">
            <div class="icon left">${ icon != undefined ? Icon[icon]() : '' }</div>
            <div class="title">${ title }</div>
            <div class="icon right">${ Icon.openInNew() }</div>
        </a>`;
    }

    static linkBarGroupTitle(title = '') {
        return `<div class="settings-link-bar-group-title">${ title }</div>`;
    }

    /**
     * 消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @param {'info'|'warn'|'error'|'black'} type 类型
     * @returns {String} DOM
     */
    static msgBox(title = '', content = '', icon = 'information', type = 'info') {
        return `<div class="msgbox state-${ type }">
            <div class="icon">${ Icon[icon]() }</div>
            <div class="text">
                <div class="title">${ title }</div>
                <div class="content">${ content }</div>
            </div>
        </div>`;
    }

    /**
     * 警告消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @returns {String} DOM
     */
    static msgBoxWarn(title = '', content = '', icon = 'alert') {
        return SettingsPanel.msgBox(title, content, icon, 'warn');
    }

    /**
     * 高对比度消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @returns {String} DOM
     */
    static msgBoxBlack(title = '', content = '', icon = 'information') {
        return SettingsPanel.msgBox(title, content, icon, 'black');
    }
}

class SettingsFileChecker {
    constructor() {}

    static default() {
        return `<div class="file-check-box">
            <span class="empty-message">${ $t('file.checker.default_file_loaded') }</span>
        </div>`;
    }

    static empty() {
        return `<div class="file-check-box">
            <span class="empty-message">${ $t('file.checker.empry') }</span>
        </div>`;
    }

    /**
     * 文件信息和状态
     * @param {File} file 文件
     * @param {'ok'|'warn'|'error'|'unknow'} state 状态
     * @param {String} stateMessage 状态消息
     * @returns {String} DOM
     */
    static fill(file, state = 'unknow', stateMessage = '') {
        const icons = {
            ok: 'check',
            warn: 'alert',
            error: 'close',
            unknow: 'help',
        };
        return `<div class="file-check-box">
            <div class="info">
                <div class="icon">${ Icon.fileCodeOutline() }</div>
                <div class="meta">
                    <div class="name" title="${ $t('file.name') }">${ file.name }</div>
                    <div class="size" title="${ $t('file.size') }">${ EchoLiveTools.formatFileSize(file.size) }</div>
                    <div class="last-modified-date" title="${ $t('file.last_modified_date') }">${ EchoLiveTools.formatDate(file.lastModifiedDate || file.lastModified) }</div>
                </div>
            </div>
            <div class="state state-${ state }">
                <div class="icon">${ Icon[icons[state]]() }</div>
                <div class="message">${ stateMessage }</div>
            </div>
        </div>`;
    }

    static dialog(title = '', description = '', controller = '', icon = undefined, domClass = '') {
        return `<div class="file-check-dialog ${ domClass }">
            <div class="icon">${ icon != undefined ? Icon[icon]() : ''}</div>
            <div class="title">${ title }</div>
            <div class="description">${ description }</div>
            <div class="controller">${ controller }</div>
        </div>`;
    }

    static dialogWarn(title = '', description = '', controller = '') {
        if (controller == '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-flie-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.close(),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'alert', 'state-warn');
    }

    static dialogError(title = '', description = '', controller = '') {
        if (controller == '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-flie-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.close(),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'close', 'state-error');
    }

    static dialogJSONParseFail() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.json_parse_fail.title'),
            $t('settings.config_input.json_parse_fail.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-flie-check-dialog-cancel',
                    icon: Icon.close(),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.json_parse_fail.unsafe_load'),
                {
                    id: 'btn-flie-check-dialog-unsafe-load',
                    class: 'btn-default',
                    icon: Icon.shieldOff(),
                    color: 'warn'
                }
            )
        );
    }

    static dialogUseChrome() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.use_chrome.title'),
            $t('settings.config_input.use_chrome.description'),
            EditorForm.buttonGhost(
                $t('ui.close'),
                {
                    id: 'btn-flie-check-dialog-cancel',
                    icon: Icon.close(),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.use_chrome.goto'),
                {
                    id: 'btn-flie-check-dialog-goto-chrome',
                    class: 'btn-default',
                    icon: Icon.openInNew()
                }
            )
        );
    }

    static dialogUpdateConfig() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.update_config.title'),
            $t('settings.config_input.update_config.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-flie-check-dialog-cancel-rollback',
                    icon: Icon.close(),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config.update'),
                {
                    id: 'btn-flie-check-dialog-update-config',
                    class: 'btn-default',
                    icon: Icon.update()
                }
            )
        );
    }

    static dialogUpdateConfigFromUnknowVersion() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.update_config_from_unknow_version.title'),
            $t('settings.config_input.update_config_from_unknow_version.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-flie-check-dialog-cancel-rollback',
                    icon: Icon.close(),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config_from_unknow_version.update'),
                {
                    id: 'btn-flie-check-dialog-update-config-from-unknow-version',
                    class: 'btn-default',
                    icon: Icon.update(),
                    color: 'warn'
                }
            )
        );
    }

    static dialogConfigFromFuture() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.config_from_future.title'),
            $t('settings.config_input.config_from_future.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-flie-check-dialog-cancel-rollback',
                    icon: Icon.close(),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.config_from_future.load'),
                {
                    id: 'btn-flie-check-dialog-config-from-future',
                    class: 'btn-default',
                    icon: Icon.arrowRight(),
                    color: 'warn'
                }
            )
        );
    }
}