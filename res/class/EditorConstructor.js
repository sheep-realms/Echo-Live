/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


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
        return `<div class="echo-editor-form-row"><label for="${id}">${label}</label>${content}</div>${tip != '' ? EditorForm.tip(tip) : ''}`;
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
        return EditorForm.item(
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
                icon: Icon.getIcon('material:format-bold'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="bold"`,
                title: $t('editor.format.bold') + ' [Ctrl+B]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-italic'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="italic"`,
                title: $t('editor.format.italic') + ' [Ctrl+I]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-underline'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="underline"`,
                title: $t('editor.format.underline') + ' [Ctrl+U]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-strikethrough-variant'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="strikethrough"`,
                title: $t('editor.format.strikethrough') + ' [Ctrl+D]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:palette'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="color"`,
                title: $t('editor.format.color') + ' [Ctrl+Shift+C]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:emoticon-happy'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="emoji"`,
                title: $t('editor.format.emoji') + ' [Ctrl+E]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:image'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="image"`,
                title: $t('editor.format.image') + ' [Ctrl+Shift+I]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-font-size-increase'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="font_size_increase"`,
                title: $t('editor.format.font_size_increase') + ' [Ctrl+↑]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-font-size-decrease'),
                class: 'editor-format-btn',
                attr: `data-editorid="${editorID}" data-value="font_size_decrease"`,
                title: $t('editor.format.font_size_decrease') + ' [Ctrl+↓]'
            }),
            EditorForm.buttonAir('', {
                icon: Icon.getIcon('material:format-clear'),
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
            dom += `<option value="${ e.meta.name }">${ $tc( e.meta.title, { before: 'editor.palette.label.' } ) }</option>`
        });
        return dom;
    }

    /**
     * 拾色器色板内容
     * @param {Object} palette 色板
     * @returns {String} DOM
     */
    static paletteContent(palette = {}) {
        if (palette.colors.length <= 0) return '';
        let dom = '<div class="palette-list">';
        let firstGruop = false;
        if (palette.colors[0]?.type === 'group') {
            dom = '';
            firstGruop = true;
        }
        palette.colors.forEach(e => {
            let title;
            let tv;
            if (e?.type === undefined || e?.type === 'color') {
                title = e.title;

                if (typeof e?.title?.translate === 'string') {
                    tv = { n: 0 };
                    if (typeof e?.title?.with === 'object') tv = {...tv, ...e.title.with, ...{ n: 2 }};
                    title = $t('editor.palette.label.' + e.title.translate, tv);
                }

                if (typeof e?.after == 'string') {
                    title = $t('editor.palette.label.title_after', {
                        title: title,
                        after: $t('editor.palette.label.common.after.' + e.after)
                    }, e.title?.name);
                }

                dom += `<button class="color-box" title="${ title.replace(/"/g, '&quot;') }" data-value="${ e.value.replace(/"/g, '') }" style="--color: ${ e.value.replace(/"/g, '') };"><div class="color"></div></button>`;
            } else if (e?.type === 'group') {
                title = e.value;

                if (typeof e?.value?.translate === 'string') {
                    tv = { n: 0 };
                    if (typeof e?.value?.with === 'object') tv = {...tv, ...e.value.with, ...{ n: 2 }};
                    title = $t('editor.palette.label.' + e.value.translate, tv, e.title?.name);
                }

                dom += `${ firstGruop ? '' : '</div>' }<div class="palette-group">${ EchoLiveTools.safeHTML(title) }</div><div class="palette-list">`;
            } else if (e?.type === 'class') {
                title = e.title;

                if (typeof e?.title?.translate === 'string') {
                    tv = { n: 0 };
                    if (typeof e?.title?.with === 'object') tv = {...tv, ...e.title.with, ...{ n: 2 }};
                    title = $t('editor.palette.label.' + e.title.translate, tv, e.title?.name);
                }

                dom += `<button
                    class="color-box color-box-custom-class ${ e?.preview_class ? 'echo-text-preview-' + e.preview_class : '' }"
                    title="${ title.replace(/"/g, '&quot;') }"
                    data-value="${ e.value.replace(/"/g, '') }"
                    style="${ e?.image ? `background-image: url(${ e.image });` : '' } ${ e?.style ?? '' }"
                >
                    <div class="color"></div>
                </button>`;
            }
            firstGruop = false;
        });
        if (!firstGruop) dom += '</div>'
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
                    ${ Icon.getIcon('material:check') }
                </div>
            </div>
            <div class="diff-result-content fail" title="${ $t('editor.palette.diff_dashboard.state.fail', { name: title }) }">
                <div class="title">${ value }</div>
                <div class="icon">
                    ${ Icon.getIcon('material:close') }
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
                    <kbd class="accessibility-key">Q</kbd>
                    <select name="popups-palette-select" id="popups-palette-select">
                        ${ Popups.paletteOptions(palette) }
                    </select>
                    <kbd class="accessibility-key">E</kbd>
                </div>
            </div>
            <div class="popups-palette-color-contrast" aria-label="${ $t('editor.palette.diff_dashboard.index') }">
                ${ Popups.paletteColorContrast() }
            </div>
            <div class="popups-palette-content">
                ${ Popups.palettePage(palette) }
            </div>
            <div class="popups-palette-accessibility">
                <span>${ $t('editor.palette.accessibility.tip') }</span>
                ${
                    EditorForm.buttonAir(
                        $t('ui.more_info'),
                        {
                            id: 'popups-palette-accessibility-help-btn'
                        }
                    )
                }
            </div>`,
            id,
            data
        );
    }

    

    /**
     * 表情选择器悬浮框
     * @param {Array<Object>} emojiPacks 表情包列表
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
    static emojiPopups(emojiPacks = [], data = {}, id = 'popups-emoji') {
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

        if (!Array.isArray(emojiPacks) || emojiPacks.length < 1) {
            emojiPacks = [
                {
                    meta: {
                        name: 'missingno',
                        namespace: 'missingno',
                        title: 'missingno'
                    },
                    image: {
                        isEmoji: true,
                        show_title: false
                    },
                    content: [
                        ':('
                    ]
                }
            ];
        }

        return Popups.container(
            `<div class="popups-emoji-header">
                <label for="popups-emoji-select" style="display: none;">${ $t('editor.emoji.select') }</label>
                <div class="popups-emoji-select-content">
                    <kbd class="accessibility-key">Q</kbd>
                    <select name="popups-emoji-select" id="popups-emoji-select">
                        ${ Popups.emojiOptions(emojiPacks) }
                    </select>
                    <kbd class="accessibility-key">E</kbd>
                </div>
            </div>
            <div class="popups-emoji-content">
                ${ Popups.emojiPage(emojiPacks) }
            </div>`,
            id,
            data
        );
    }

    /**
     * 表情选择器切换选项
     * @param {Array<Object>} emojiPacks 表情包列表
     * @returns {String} DOM
     */
    static emojiOptions(emojiPacks = []) {
        let dom = '';
        emojiPacks.forEach(e => {
            dom += `<option value="${ e.meta.name }">${ $tc(e.meta.title) }</option>`
        });
        return dom;
    }

    /**
     * 表情选择器页面
     * @param {Array<Object>} emojiPacks 表情包列表
     * @returns {String} DOM
     */
    static emojiPage(emojiPacks = []) {
        let dom = '';
        emojiPacks.forEach(e => {
            dom += `<div class="emoji-page hide review-size-${ e.image.review_size } image-rendering-${ e.image.rendering }" data-emoji-pack-id="${ e.meta.name }">${ Popups.emojiContent(e) }</div>`
        });
        return dom;
    }

    /**
     * 表情选择器内容
     * @param {Object} emojiPack 表情包
     * @returns {String} DOM
     */
    static emojiContent(emojiPack = {}) {
        if (emojiPack.content.length <= 0) return '';
        let dom = '<div class="emoji-list">';
        let firstGruop = false;
        if (emojiPack.content[0]?.type === 'group') {
            dom = '';
            firstGruop = true;
        }

        emojiPack.content.forEach(e => {
            let title;
            if (e?.type === 'emoji' || e?.type === undefined) {
                if (emojiPack.image.show_title) {
                    title = $tc(e.title, { before: 'emoji.' + emojiPack.path.translate + 'emoji.' });
                }

                if (emojiPack.image.isEmoji) {
                    if (typeof e == 'string') {
                        dom += `<button class="emoji-box is-true-emoji" data-value="${ e }">${ e }</button>`;
                    } else if (typeof e == 'object') {
                        dom += `<button class="emoji-box is-true-emoji" ${ title !== undefined ? `title="${ title }"` : '' } data-value="${ e.name }">${ e.name }</button>`;
                    }
                } else {
                    dom += `<button class="emoji-box" ${ title !== undefined ? `title="${ title }"` : '' } data-value="${ emojiPack.meta.namespace + ':' + e.name }"><img src="${ emojiPack.path.images + e.path }" alt="${ title }"></button>`;
                }
            } else if (e?.type === 'group') {
                title = $tc(e.title, { before: 'emoji.' + emojiPack.path.translate + 'group.' });
                dom += `${ firstGruop ? '' : '</div>' }<div class="emoji-group">${ title }</div><div class="emoji-list">`;
            }
            firstGruop = false;
        });
        if (!firstGruop) dom += '</div>';

        dom += '<div class="emoji-meta">';
        let authorDOM = '';
        if (emojiPack.meta?.author !== undefined && emojiPack.meta?.author !== '') {
            authorDOM = MetaInfo.linkList(
                emojiPack.meta.author,
                'ui.missingno.no_author',
                {
                    translateData: {
                        before: emojiPack.path.translate
                    }
                }
            );
            dom += `<div>${ $t('meta_info.author', { name: $tc( authorDOM ) }) }</div>`;
        }
        let licenseDOM = '';
        if (emojiPack.meta?.license !== undefined) {
            licenseDOM = MetaInfo.linkList(
                emojiPack.meta.license,
                'ui.missingno.no_name',
                {
                    translateData: {
                        before: emojiPack.path.translate
                    }
                }
            );
            dom += `<div>${ $t('meta_info.license', { name: $tc( licenseDOM ) }) }</div>`;
        }
        dom += '</div>';
        return dom;
    }

    /**
     * 图片选择器悬浮框
     * @param {Object} data 属性值
     * @param {String} id ID
     * @returns {String} DOM
     */
    static imagePopups(data = {}, id = 'popups-image') {
        data = {
            width: {
                min: '502px',
                max: '502px'
            },
            height: {
                min: '200px',
                max: 'calc(100vh - 32px)'
            },
            ...data
        }

        return Popups.container(
            `<nav id="popups-image-nav" class="tabpage-nav" data-navid="popups-image" role="tablist">
                <button
                    class="tabpage-nav-item"
                    data-pageid="file"
                    role="tab"
                    aria-selected="true"
                    title="${ $t('editor.image_popups.tabpage.file.description') }"
                >${ $t('editor.image_popups.tabpage.file.title') }</button>
                <button
                    class="tabpage-nav-item"
                    data-pageid="url"
                    role="tab"
                    aria-selected="false"
                    title="${ $t('editor.image_popups.tabpage.url.description') }"
                >${ $t('editor.image_popups.tabpage.url.title') }</button>
                <button
                    class="tabpage-nav-item"
                    data-pageid="images"
                    role="tab"
                    aria-selected="false"
                    title="${ $t('editor.image_popups.tabpage.images.description') }"
                >${ $t('editor.image_popups.tabpage.images.title') }</button>
            </nav>
            <div class="tabpage-centent" data-navid="popups-image">
                <section class="tabpage-panel" role="tabpanel" data-pageid="file">
                    <div class="popups-image-file-panel">
                        <div class="file-input">
                            <button id="image-file-input-box" class="file-drop-box" aria-label="${ $t('file.dropper.title') }">
                                <span class="file-drop-box-message">${ $t('file.dropper.please_click') }</span>
                                <span class="file-drop-box-message-keyboard">${ $t('file.dropper.please_drop_file_keyboard') }</span>
                            </button>
                            <div id="image-file-check-dialog" class="hide"></div>
                        </div>
                    </div>
                </section>
                <section class="tabpage-panel hide" role="tabpanel" data-pageid="url">
                    <div class="echo-editor-form">
                        <label for="image-url">URL</label>
                        <input type="text" id="image-url">
                        <div class="image-url-action">
                            <div class="image-url-message"></div>
                            ${ EditorForm.button(
                                $t('file.dropper.dialog.selected.import_image'),
                                {
                                    id: 'btn-file-check-dialog-import-image-url',
                                    icon: Icon.getIcon('material:check')
                                }
                            ) }
                        </div>
                    </div>
                </section>
                <section class="tabpage-panel hide" role="tabpanel" data-pageid="images">
                    <div class="images-list-action">
                        ${ Popups.imagesListAction(0) }
                    </div>
                    <div id="popups-image-images-list" class="images-list"></div>
                </section>
            </div>
            <div class="image-parameter echo-editor-form">
                <div class="collapse">
                    <div class="collapse-title">
                        <button role="checkbox" aria-selected="false" class="checkbox collapse-checkbox">
                            <span class="icon"></span>
                            <span class="text">${ $t('editor.image_popups.label.set_image_parameter') }</span>
                            <input type="hidden" id="image-parameter-set" value="0">
                        </button>
                    </div>
                    <div class="collapse-content hide">
                        <div class="image-parameter-line">
                            <div class="image-parameter-item">
                                <label for="image-size-max">${ $t('editor.image_popups.label.image_size_max') }</label>
                                <input type="number" id="image-size-max" value="${ config.echolive.image.default_max_size }" min="0">
                            </div>
                            <div class="image-parameter-item">
                                <label for="image-size-min">${ $t('editor.image_popups.label.image_size_min') }</label>
                                <input type="number" id="image-size-min" value="0" min="0">
                            </div>
                        </div>
                        <div class="image-parameter-line">
                            <div class="image-parameter-item">
                                <label for="image-margin">${ $t('editor.image_popups.label.image_margin') }</label>
                                <input type="number" id="image-margin" value="0.5" min="0" step="0.5">
                            </div>
                            <div class="image-parameter-item">
                                <label for="image-rendering">${ $t('editor.image_popups.label.image_rendering') }</label>
                                <select name="pets" id="image-rendering">
                                    <option value="auto">${ $t('editor.image_popups.option.image_rendering.auto') }</option>
                                    <option value="pixelated">${ $t('editor.image_popups.option.image_rendering.pixelated') }</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            id,
            data
        );
    }

    static imagesListAction(mode = 0) {
        const btnDeleteStart = EditorForm.buttonGhost(
            $t('ui.delete'),
            {
                class: 'btn-image-cache-delete',
                icon: Icon.getIcon('material:toggle-switch-off-outline'),
                color: 'danger',
                size: "small"
            }
        );
        const btnDeleteEnd = EditorForm.button(
            $t('ui.delete'),
            {
                class: 'btn-image-cache-delete-stop',
                icon: Icon.getIcon('material:toggle-switch'),
                color: 'danger',
                size: "small"
            }
        );
        const btnDeleteAll = EditorForm.buttonGhost(
            $t('editor.image_popups.button.delete_all_images'),
            {
                class: 'btn-image-cache-delete-all',
                icon: Icon.getIcon('material:delete'),
                color: 'danger',
                size: "small"
            }
        )
        if (mode == 0) {
            return btnDeleteStart;
        } else {
            return btnDeleteEnd + btnDeleteAll;
        }
    }

    static imagesContent(imagesData = []) {
        let dom = '';
        for (let i = 0; i < imagesData.length; i++) {
            const e = imagesData[i];
            if (e == undefined || e == null) continue;
            dom = Popups.imageBox(i, e.url, e.isAbsolute, e.rendering == 'pixelated' ? true : false) + dom;
        }
        return dom;
    }

    static imageBox(index, url, isAbsolute = false, isPixelated = false) {
        return `<button
            class="image-box ${ isAbsolute ? 'image-is-absolute' : ''} ${ isPixelated ? 'image-rendering-pixelated' : ''}"
            data-value="${ Number(index) }"
            data-is-absolute="${ Boolean(isAbsolute) }"
        >
            <img src="${ EchoLiveTools.safeHTML(url, true) }" alt="${ $t('file.picker.image') }">
        </button>`
    }
}

// 客户端状态仪表构造器
class EditorClientState {
    constructor() {}

    static block(state, echoState = 'stop', messagesCount = 0, name = '', target = 'none', targeted = false) {
        let name2 = name;
        let title = '';
        let titleKey = 'editor.client_state_panel.tip';
        if (messagesCount > 0) titleKey = 'editor.client_state_panel.tip_more_messages'
        title = $t(
            titleKey,
            {
                client: $t('editor.client_state.' + state),
                echo: $t('editor.echo_state.' + echoState),
                target: $t('editor.client_target.' + target),
                targeted: targeted ? $t('editor.client_state_panel.targeted') : ''
            }
        );
        if (name.search(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i) != -1) name2 = '(' + name.split('-')[0] + ')';
        return `<button
            class="
                echo-live-client-state-block
                state-${state}
                echo-state-${echoState}
                ${ messagesCount > 0 ? 'echo-messages-next' : '' }
                client-target-${target}
                ${ targeted ? 'client-targeted' : '' }
            "
            title="${title}"
            data-name="${name}"
            data-target="${target}"
        >
            <div class="client-info">
                <div class="client-icon client-icon-left">
                    ${
                        target === 'yes' ? Icon.getIcon('material:flag') : (
                            target === 'not' ? Icon.getIcon('material:cancel') : (
                                targeted ? Icon.getIcon('material:cancel') : ''
                            )
                        )
                    }
                </div>
                <div class="client-name">${name2}</div>
                <div class="client-icon client-icon-right">
                    ${ echoState === 'play' || echoState === 'ready' ? Icon.getIcon('material:timer-sand') : ''}
                    ${ messagesCount > 0 && echoState === 'stop' ? Icon.getIcon('material:message-processing') : '' }
                </div>
            </div>
            <div class="state-color-block"></div>
        </button>`
    }

    static clientBlock(client) {
        if (client.hidden) {
            return EditorClientState.block('sleep', client.echoState, client.messagesCount, client.name, client.target, client.targeted);
        } else {
            return EditorClientState.block('active', client.echoState, client.messagesCount, client.name, client.target, client.targeted);
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
            return e.type === 'live';
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
                <div class="username">${ EchoLiveTools.safeHTML(username) }</div>
                <div class="message">${ EchoLiveTools.safeHTML(message) }</div>
                ${ length > 1 ? `<div class="length">${ $t('editor.history.messages_more', { n: length }) }</div>` : ''}
                <div class="time">
                    <span class="created">${time}</span>
                    <span class="sent hide">${HistoryMessage.sentAt(time)}</span>
                </div>
            </div>
            <div class="action">
                ${EditorForm.buttonGhost($t('ui.edit'), {
                    icon: Icon.getIcon('material:pencil'),
                    class: 'history-message-item-btn-edit',
                    attr: `data-index="${index}"`
                })}
                ${EditorForm.buttonGhost($t('ui.send'), {
                    icon: Icon.getIcon('material:send'),
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
            <span class="icon left" aria-hidden="true">${ item.icon !== undefined ? Icon.getIcon(item.icon) : ''}</span>
            <span class="title">${ $t( 'config.' + item.id + '._title' ) }</span>
            <span class="icon right" aria-hidden="true"></span>
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
        return `<section class="settings-page hide" data-pageid="${ id }" aria-labelledby="tabpage-panel-title-config-${ id }">
            <h3 class="tabpage-panel-title" id="tabpage-panel-title-config-${ id }">${ $t(`config.${ id }._title`) }</h3>
            ${ content }
        </section>`;
    }

    static setGroupTitle(data) {
        const { title = '', description = '', depth, icon } = data;
        let iconDOM;
        iconDOM = icon !== undefined ? Icon.getIcon(icon) : undefined;
        if (depth === 1) {
            return `<button class="settings-group-collapse-title">
                <div class="title">${ title }</div>
                <div class="icon" aria-hidden="true">
                    <span class="open">${ Icon.getIcon('material:chevron-down') }</span>
                    <span class="close">${ Icon.getIcon('material:chevron-up') }</span>
                </div>
            </button>`;
        } else if (depth > 1) {
            return `<div class="settings-group-collapse-subtitle">
                <div class="title">${ title }</div>
            </div>`;
        }
        return `<hgroup class="settings-group-title">
            ${ iconDOM ? `<div class="icon" aria-hidden="true">${ iconDOM }</div>` : '' }
            <div class="text">
                <h3 class="title">${ title }</h3>
                <div class="description">${ description }</div>
            </div>
        </hgroup>`;
    }

    static setItem(data) {
        const { type = '', id = '', title = '', description = '', content = '', moreContent = '', icon = undefined } = data;
        let iconDOM;
        iconDOM = icon !== undefined ? Icon.getIcon(icon) : undefined;
        return `<div class="settings-item settings-type-${ type.split('.')[0] }" data-id="${ id }" data-type="${ type }">
            <div class="meta">
                ${ iconDOM ? `<div class="icon" aria-hidden="true">${ iconDOM }</div>` : '' }
                <div class="text">
                    <div class="title">${ title }</div>
                    <div class="description">${ description }</div>
                    <div class="key"><code>${ id }</code></div>
                </div>
            </div>
            <div class="value">
                ${ content }
            </div>
            ${ moreContent !== '' ? moreContent : '' }
        </div>`;
    }

    static setItemAuto(item) {
        const fun = {
            string: 'setItemString',
            number: 'setItemNumber',
            boolean: 'setItemBoolean',
        }

        const funSpecial = {
            all_or_array_string: 'setItemAllOrArrayString',
            fontsize: 'setItemFontSize'
        };

        let types = item.type.split('.');

        let run = fun[types[0]];

        if (types[0] === 'special') {
            run = funSpecial[types[1]];
        }

        if (run === undefined) run = 'setItemUnknown';

        const title = $t( 'config.' + item.name + '._title' );
        const description = $t( 'config.' + item.name + '._description' );

        if (item.type === 'object') return SettingsPanel.setGroupTitle({
            title: title,
            description: description,
            depth: item?.depth,
            icon: item?.icon
        });
        if (item.type === 'boolean.bit') return SettingsPanel.setItemBoolean({
            itype: item.type,
            id: item.name,
            title: title,
            description: description,
            value: item.default,
            attribute: item?.attribute,
            isBit: true,
            icon: item?.icon
        });

        return SettingsPanel[run]({
            type: item.type,
            id: item.name,
            title: title,
            description: description,
            value: item.default,
            attribute: item?.attribute,
            unit: item?.unit,
            icon: item?.icon
        });
    }

    static setItems(items) {
        let dom = '';
        let inGroup = false;
        let inCollapse = false;
        items.forEach(e => {
            if (e.type === 'object' && (e?.depth === undefined || e?.depth <= 1)) {
                if (inCollapse) {
                    dom += '</div></div>';
                    inCollapse = false;
                }
                if (inGroup && (e?.depth === undefined || e?.depth <= 0)) {
                    dom += '</div></div>';
                    inGroup = false;
                }
                
                if (e?.depth > 0) {
                    dom += `<div class="settings-group-collapse state-close" data-id="${ e.name }">`;
                } else {
                    dom += `<div class="settings-group" data-id="${ e.name }">`;
                }
            }
            dom += SettingsPanel.setItemAuto(e);
            if (e.type === 'object' && (e?.depth === undefined || e?.depth <= 1)) {
                if (e?.depth > 0) {
                    dom += (inCollapse ? '</div>' : '') + `<div class="settings-group-collapse-content">`;
                    inCollapse = true;
                } else {
                    dom += (inGroup ? '</div>' : '') + `<div class="settings-group-content">`;
                    inGroup = true;
                }
            }
        });
        if (inGroup) dom += '</div></div>';
        return dom;
    }

    static setItemUnknown(data) {
        data.content = `<span class="settings-unknown-config-type">${ $t('settings.unknown_config_type') }</span>`;
        return SettingsPanel.setItem(data);
    }

    static setItemString(data) {
        const { type = '', id = '', title = '', value = '', attribute = undefined } = data;
        if (type === 'string.multiline') return SettingsPanel.setItemStringMultiLine(data);

        let inputDOM = '';
        if (attribute?.datalist === undefined || attribute.datalist.length === 0) {
            inputDOM = FHUIComponentInput.input(
                value,
                'text',
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code'
                }
            );
        } else {
            inputDOM = FHUIComponentInput.inputSelect(
                value,
                attribute.datalist,
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code',
                    option_description_fill_value: true,
                    option_width: attribute?.option_width
                }
            );
        }

        return SettingsPanel.setItem({
            ...data,
            content: FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                },
                title
            ) + inputDOM,
            moreContent: `<div class="content hide"></div>`
        });
    }

    static setItemStringMultiLine(data) {
        const { id = '', title = '', value = '' } = data;
        // value = String(value).replace(/"/g, '&quot;');
        return SettingsPanel.setItem({
            ...data,
            content: `<label class="settings-item-label" for="${ id.replace(/\./g, '-') }">${ title }</label>`,
            moreContent: `<div class="content">
                <textarea id="${ id.replace(/\./g, '-') }" class="settings-value code" aria-label="${ title }" data-default="${ encodeURIComponent(value) }">${ value }</textarea>
            </div>`
        });
    }

    static setItemNumber(data) {
        const { id = '', title = '', value = '', attribute = undefined, unit = undefined } = data;
        return SettingsPanel.setItem({
            ...data,
            content: FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                },
                title
            ) +
            FHUIComponentInput.input(
                value,
                'number',
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code',
                    after: {
                        label: unit ? $t('unit.' + unit) : undefined
                    },
                    attribute: {
                        max: attribute?.max !== undefined ? attribute.max : undefined,
                        min: attribute?.min !== undefined ? attribute.min : undefined,
                        step: attribute?.step !== undefined ? attribute.step : undefined
                    }
                }
            )
        });
    }

    static setItemBoolean(data) {
        const { id = '', value = '', isBit = undefined } = data;
        return SettingsPanel.setItem({
            ...data,
            content: `<div class="settings-switch state-${ value ? 'on' : 'off' }" data-is-bit="${ isBit ? '1' : '0' }">
                ${
                    FHUIComponentButton.buttonGhost(
                        $t('ui.off'),
                        {
                            icon: 'material:toggle-switch-off-outline',
                            class: 'btn-switch btn-off'
                        }
                    )
                }
                ${
                    FHUIComponentButton.button(
                        $t('ui.on'),
                        {
                            icon: 'material:toggle-switch',
                            class: 'btn-switch btn-on'
                        }
                    )
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }" class="settings-value settings-switch-value" data-default="${ value }" value="${ value }">
            </div>`
        });
    }

    static setItemAllOrArrayString(data) {
        const { id = '', value = '' } = data;
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

        return SettingsPanel.setItem({
            ...data,
            content: `<div class="settings-switch settings-switch-all-or-array-string state-${ isAll ? 'on' : 'off' }">
                ${
                    FHUIComponentButton.buttonGhost(
                        $t('ui.enable_all'),
                        {
                            icon: 'material:toggle-switch-off-outline',
                            class: 'btn-switch btn-off'
                        }
                    )
                }
                ${
                    FHUIComponentButton.button(
                        $t('ui.enable_all'),
                        {
                            icon: 'material:toggle-switch',
                            class: 'btn-switch btn-on'
                        }
                    )
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }-is-all" class="settings-value-enable-all settings-switch-value" data-default="${ isAll }" value="${ isAll }">
            </div>`,
            moreContent: `<div class="content ${ isAll ? 'hide' : '' }">
                <div class="settings-value-list-box">
                    <textarea id="${ id.replace(/\./g, '-') }-list" class="settings-value-list code" data-default="${ isAll ? '' : encodeURIComponent(listStr) }">${ listStr }</textarea>
                </div>
            </div>`
        });
    }

    static setItemFontSize(data) {
        const { id = '', value = '' } = data;
        return SettingsPanel.setItem({
            ...data,
            content: FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                }
            ) +
            FHUIComponentInput.range(
                value,
                {
                    id: id.replace(/\./g, '-'),
                    name: id.replace(/\./g, '-'),
                    hasInput: true,
                    inputClass: 'settings-value code',
                    label: [
                        { value: 8, label: $t('config.accessibility.font_size.small') },
                        { value: 16, label: $t('config.accessibility.font_size.middle') },
                        { value: 24, label: $t('config.accessibility.font_size.large') },
                        { value: 32, label: $t('config.accessibility.font_size.extra_large') }
                    ],
                    attribute: {
                        min:8,
                        max: 32,
                        step: 2
                    }
                }
            )
        });
    }

    static linkBar(title = '', href = '', icon = undefined, data = {}) {
        data = {
            isDebug: false,
            debug: '',
            ...data
        };
        return `<a
            class="settings-link-bar ${ data.isDebug ? 'settings-link-debug' : ''}"
            href="${ href }"
            ${ !data.isDebug ? 'target="_blank"' : '' }
            ${ data.isDebug ? `data-debug="${ data.debug }"` : '' }
        >
            <div class="icon left">${ icon != undefined ? Icon.getIcon(icon) : '' }</div>
            <div class="title">${ title }</div>
            <div class="icon right">${ !data?.isDebug ? Icon.getIcon('material:open-in-new') : '' }</div>
        </a>`;
    }

    static linkBarGroupTitle(title = '', data = {}) {
        data = {
            isDebug: false,
            ...data
        };
        return `<div class="settings-link-bar-group-title ${ data.isDebug ? 'settings-link-debug' : ''}">${ title }</div>`;
    }

    /**
     * 消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @param {'info'|'warn'|'error'|'black'} type 类型
     * @returns {String} DOM
     */
    static msgBox(title = '', content = '', icon = 'material:information', type = 'info') {
        return `<aside class="msgbox state-${ type }">
            <div class="icon" aria-hidden="true">${ Icon.getIcon(icon) }</div>
            <div class="text">
                <div class="title">${ title }</div>
                <div class="content">${ content }</div>
            </div>
        </aside>`;
    }

    /**
     * 警告消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @returns {String} DOM
     */
    static msgBoxWarn(title = '', content = '', icon = 'material:alert') {
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

    static searchResultList(data = []) {
        let dom = '';
        data.forEach((e, i) => {
            dom += SettingsPanel.searchResultItem(e, i);
        });
        return dom;
    }

    static searchResultItem(data = {}, index) {
        let ariaLabel = '';
        if (data.groupTitle.length === 0 || data.groupTitle === undefined) {
            ariaLabel = $t('config.search.aria_label.result', { index: index + 1, title: data.title });
        } else {
            ariaLabel = $t('config.search.aria_label.result_has_group', { index: index + 1, group: data.groupTitle, title: data.title });
        }
        return `<button class="settings-search-result-item" data-id="${ data.name }" role="link" aria-label="${ ariaLabel }" tabindex="0">
            <div class="group-title">${ data.groupTitle }</div>
            <div class="title">${ data.title }</div>
            <div class="description">${ data.description }</div>
        </button>`;
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
     * @param {'ok'|'warn'|'error'|'unknown'} state 状态
     * @param {String} stateMessage 状态消息
     * @returns {String} DOM
     */
    static fill(file, state = 'unknown', stateMessage = '') {
        const icons = {
            ok: 'material:check',
            warn: 'material:alert',
            error: 'material:close',
            unknown: 'material:help',
        };
        return `<div class="file-check-box">
            <div class="info">
                <div class="icon">${ Icon.getIcon('material:file-code-outline') }</div>
                <div class="meta">
                    <div class="name" title="${ $t('file.name') }">${ file.name }</div>
                    <div class="size" title="${ $t('file.size') }">${ EchoLiveTools.formatFileSize(file.size) }</div>
                    <div class="last-modified-date" title="${ $t('file.last_modified_date') }">${ EchoLiveTools.formatDate(file.lastModifiedDate || file.lastModified, 'date_time') }</div>
                </div>
            </div>
            <div class="state state-${ state }">
                <div class="icon">${ Icon.getIcon(icons[state]) }</div>
                <div class="message">${ stateMessage }</div>
            </div>
        </div>`;
    }

    static dialog(title = '', description = '', controller = '', icon = undefined, domClass = '') {
        return `<div class="file-check-dialog ${ domClass }">
            <div class="icon">${ icon != undefined ? Icon.getIcon(icon) : ''}</div>
            <div class="title">${ title }</div>
            <div class="description">${ description }</div>
            <div class="controller">${ controller }</div>
        </div>`;
    }

    static dialogSuccess(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.ok'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:check')
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:check', 'state-success');
    }

    static dialogWarn(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:alert', 'state-warn');
    }

    static dialogError(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:close', 'state-error');
    }

    static dialogJSONParseFail() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.json_parse_fail.title'),
            $t('settings.config_input.json_parse_fail.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.json_parse_fail.unsafe_load'),
                {
                    id: 'btn-file-check-dialog-unsafe-load',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:shield-off'),
                    color: 'warn'
                }
            )
        );
    }

    static dialogUseChrome() {
        return SettingsFileChecker.dialogWarn(
            $t('file.dropper.dialog.use_chrome.title'),
            $t('file.dropper.dialog.use_chrome.description'),
            EditorForm.buttonGhost(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('file.dropper.dialog.use_chrome.goto'),
                {
                    id: 'btn-file-check-dialog-goto-chrome',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:open-in-new')
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
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config.update'),
                {
                    id: 'btn-file-check-dialog-update-config',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:update')
                }
            )
        );
    }

    static dialogUpdateConfigFromUnknownVersion() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.update_config_from_unknown_version.title'),
            $t('settings.config_input.update_config_from_unknown_version.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config_from_unknown_version.update'),
                {
                    id: 'btn-file-check-dialog-update-config-from-unknown-version',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:update'),
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
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.config_from_future.load'),
                {
                    id: 'btn-file-check-dialog-config-from-future',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:arrow-right'),
                    color: 'warn'
                }
            )
        );
    }

    static dialogImageFileSelected(filename = '') {
        return SettingsFileChecker.dialogSuccess(
            $t('file.dropper.dialog.selected.title'),
            $t('file.dropper.dialog.selected.description', { name: filename }),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('file.dropper.dialog.selected.import_image'),
                {
                    id: 'btn-file-check-dialog-import-image',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:check')
                }
            )
        );
    }
}




class FHUINotice {
    constructor() {}

    static notice(message = '', title = '', type = 'info', data = {}) {
        const themes = {
            info: {
                icon: 'material:information',
                color: 'general'
            },
            success: {
                icon: 'material:check',
                color: 'safe'
            },
            alert: {
                icon: 'material:alert',
                color: 'warn'
            },
            warn: {
                icon: 'material:alert',
                color: 'warn'
            },
            error: {
                icon: 'material:close',
                color: 'danger'
            },
            fatal: {
                icon: 'material:alert-octagon',
                color: 'danger'
            },
            experimental: {
                icon: 'material:test-tube',
                color: 'special'
            },
            trophy: {
                icon: 'material:trophy',
                color: 'general'
            },
            tips: {
                icon: 'material:lightbulb-on',
                color: 'general'
            }
        };
        let theme = themes[type];
        if (theme === undefined) {
            theme = {
                icon: 'material:information',
                color: 'general'
            };
        }

        data = {
            animation: true,
            hasClick: false,
            icon: theme.icon,
            id: undefined,
            index: -1,
            waitTime: undefined,
            width: undefined,
            ...data
        };
        let iconDOM = Icon.getIcon(data.icon) !== undefined ? Icon.getIcon(data.icon) : Icon.getIcon('material:information');

        return `<div
                class="
                    fh-notice-item
                    fh-${ theme.color }
                    ${ data.animation ? 'fh-notice-ani-in' : '' }
                    ${ data.waitTime < 0 ? 'is-permanently' : '' }
                    ${ data.hasClick ? 'has-click' : '' }
                "
                data-index="${ data.index }"
                ${ data.id ? `data-id="${ data.id }"` : '' }
                style="${ data?.width !== undefined ? `--fh-notice-width-custom: ${ data.width };` : '' }"
            >
            <div class="fh-notice-item-container">
                <div class="fh-notice-item-content">
                    <div class="fh-notice-item-content-icon">
                        ${ iconDOM }
                    </div>
                    <div class="fh-notice-item-content-message">
                        ${ title !== '' ? `<div class="title">${ title }</div>` : '' }
                        <div class="message">${ message }</div>
                    </div>
                    <div class="fh-notice-item-content-action">
                        ${ EditorForm.buttonAir('', {
                            class: 'fh-notice-item-btn-close',
                            icon: Icon.getIcon('material:close'),
                            color: 'danger'
                        }) }
                    </div>
                </div>
                <div class="fh-notice-item-bg"></div>
            </div>
        </div>`;
    }
}

class FHUIWindow {
    constructor() {}

    /**
     * 对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
     * @param {String} data.autoFocusButton 自动获得焦点的按钮
     * @param {String} data.autoFocusFormItem 自动获得焦点的表单项
     * @param {Boolean} data.autoIconButton 自动设置按钮图标
     * @param {Boolean} data.closable 可关闭
     * @param {Boolean} data.hasInput 是否有输入框
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Number} data.index 索引编号
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {String} data.style 样式
     * @returns {String} DOM
     */
    static window(content = '', title = '', data = {}) {
        data = {
            attr: undefined,
            autoFocusButton: undefined,
            autoFocusFormItem: undefined,
            closable: true,
            icon: undefined,
            id: undefined,
            index: -1,
            controller: ['confirm'],
            maskClosable: false,
            modal: true,
            style: undefined,
            size: {
                width: '500px',
                height: '300px'
            },
            ...data
        }

        let iconDom = '';
        if (data.icon !== undefined && Icon.getIcon(data.icon) !== undefined) {
            iconDom = Icon.getIcon(data.icon);
        } else {
            iconDom = Icon.getIcon('material:information');
        }

        let dom = `<div
            role="dialog"
            ${ data.id !== undefined ? `id="${ data.id }"` : '' }
            class="fh-window window-show ${ data.hasInput ? 'fh-window-has-input' : '' }"
            style="
                --width: min(${ data.size.width }, calc(100vw - 32px));
                --height: min(${ data.size.height }, calc(100vh - 32px));
                ${ data.style ?? '' }
            "
            data-index="${ data.index }"
            ${ data.autoFocusButton !== undefined ? `data-auto-focus-button="${ data.autoFocusButton }"` : '' }
            ${ data.autoFocusFormItem !== undefined ? `data-auto-focus-form-item="${ data.autoFocusFormItem }"` : '' }
            ${ data.attr ?? '' }
        >
            <div class="fh-window-title">
                <span class="icon">
                    ${ iconDom }
                </span>
                <span class="title">
                    ${ title }
                </span>
                <button class="close" ${ !data.closable ? 'disabled' : '' }>
                    ${ Icon.getIcon('material:close') }
                </button>
            </div>
            <div class="fh-window-content">
                <div class="fh-msgbox-content">${ content }</div>
                <div class="fh-msgbox-controller fh-controller ${ data.controller.length > 3 ? 'controller-overload' : '' }">
                    ${ FHUIWindow.controller(data.controller, data.autoIconButton) }
                </div>
            </div>
        </div>`;

        if (data.modal) {
            dom = `<div
                class="
                    fh-window-modal-bg
                    window-show
                    ${ data.maskClosable ? 'fh-window-modal-bg-closable' : '' }
                "
                data-index="${ data.index }"
            >
                ${ dom }
            </div>`;
        }

        return dom;
    }

    static controller(data = [], autoIconButton = false) {
        let dom = '';
        data.forEach(e => {
            if (typeof e === 'object' && !Array.isArray(e)) {
                dom += FHUIWindow.controllerButton(e?.id, e?.content, e?.data, autoIconButton);
            } else if (typeof e === 'string') {
                if (e === 'no' && data.indexOf('cancel') !== -1) {
                    dom += FHUIWindow.controllerButton(e, undefined, {
                        color: 'warn'
                    }, autoIconButton);
                } else {
                    dom += FHUIWindow.controllerButton(e, undefined, {}, autoIconButton);
                }
            }
        });
        return dom;
    }

    static controllerButton(id, content = undefined, data = {}, autoIconButton = false) {
        const btnColorType = {
            cancel: 'danger',
            clear: 'danger',
            close: 'danger',
            delete: 'danger',
            no: 'danger',
            reset: 'danger'
        };
        const btnIcon = {
            cancel: 'material:close',
            close: 'material:close',
            confirm: 'material:check',
            download: 'material:download',
            no: 'material:close',
            yes: 'material:check',
        }

        let colorType = btnColorType[id];
        let icon = autoIconButton ? btnIcon[id] : undefined;
        if (content === undefined) content = $t('ui.' + id);
        data = {
            class: 'fh-window-controller-button fh-window-controller-button-' + id,
            color: colorType,
            attribute: {
                data: {
                    'controller-id': id
                }
            },
            icon: icon,
            ...data
        }

        return FHUIComponentButton.button(content, data);
    }

    static releasesView(releasesData) {
        return `<div class="releases-view">
            <div class="releases-view-meta">
                <div class="title">${ releasesData?.tag_name ?? '?' }</div>
                <div class="meta">
                    <div class="created-at">发布时间：${ EchoLiveTools.formatDate(releasesData?.created_at) }</div>
                    <div class="author">作者：${ releasesData?.author?.login }</div>
                </div>
            </div>
            <div class="releases-view-body markdown-body">${ marked.parse(releasesData?.body) }</div>
        </div>`;
    }

    static assetsSelectorsView(assets) {
        let dom = '';
        assets.forEach(e => {
            dom += `<div class="assets-item"><a class="fh-link" href="${ e?.browser_download_url }" target="_blank">${ EchoLiveTools.safeHTML(e?.name) }</a></div>`;
        });
        return `<div class="assets-list">${ dom }</div>`;
    }
}


class MetaInfo {
    constructor() {}

    static linkList(data, translateFallback, translateData = {}) {
        if (data === undefined) return $t('ui.empty');
        if (!Array.isArray(data)) data = [data];
        let isFirst = true;
        let dom = '';
        const comma = $t('localization.comma');

        data.forEach(e => {
            if (typeof e === 'string') e = { name: e };
            
            e = {
                name: undefined,
                url: undefined,
                ...e
            };
            if (e.name === undefined) e.name = $t(translateFallback);
            if (isFirst) {
                isFirst = false;
            } else {
                dom += comma;
            }
            if (e.url !== undefined) {
                dom += FHUI.element(
                    'a',
                    {
                        target: '_blank',
                        href: e.url,
                        referrerpolicy: 'no-referrer'
                    },
                    EchoLiveTools.safeHTML($tc(e.name, translateData))
                );
            } else {
                dom += FHUI.element(
                    'span',
                    {},
                    EchoLiveTools.safeHTML($tc(e.name, translateData))
                );
            }
            
        });

        return dom;
    }
}


class AvatarReviewPanel {
    constructor() {}

    static panel(meta, data = {}) {
        return `<div class="avatar-review-panel">
            <div class="avatar-review-image"></div>
            <div class="avatar-review-info">
                ${ AvatarReviewPanel.info(meta, data) }
            </div>
        </div>`;
    }

    static info(meta, data = {}) {
        if (meta === undefined) return '';

        data = {
            translateData: undefined,
            ...data
        };

        return `<div class="title">${ EchoLiveTools.safeHTML($tc(meta?.title, { before: 'avatar.' })) }</div>
        <div class="description">${ EchoLiveTools.sanitizeHTML($tc(meta?.description, { before: 'avatar.' })) }</div>
        <div class="footer">
            <div class="author">${
                $t(
                    'meta_info.author',
                    {
                        name: MetaInfo.linkList(
                            meta?.author,
                            'ui.missingno.no_author',
                            data.translateData
                        )
                    }
                )
            }</div>
            <div class="license">${
                $t(
                    'meta_info.license',
                    {
                        name: MetaInfo.linkList(
                            meta?.license,
                            'ui.missingno.no_name',
                            data.translateData
                        )
                    }
                )
            }</div>
        </div>`;
    }
}