/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class FHUI {
    constructor() {}

    /**
     * DOM 属性
     * @param {Object} attr 属性数据
     * @returns {String} DOM 属性
     */
    static attributes(attr = {}) {
        let dom = '';
        for (const key in attr) {
            if (Object.prototype.hasOwnProperty.call(attr, key)) {
                const e = attr[key];
                if (e === undefined) continue;
                let val = e;
                if (typeof e === 'object') {
                    if (Array.isArray(e)) {
                        val = e.filter(e2 => e2 !== undefined && e2 !== null).join(' ');
                    } else {
                        dom += FHUI.subAttributes(key, e) + ' ';
                        continue;
                    }
                }
                dom += `${ key }="${ String(val).replace(/"/g, '&quot;') }" `
            }
        }
        return dom.trim();
    }

    /**
     * DOM 子属性
     * @param {String} attrName 属性名
     * @param {Object} subAttr 子属性数据
     * @returns {String} DOM 属性
     */
    static subAttributes(attrName, subAttr = {}) {
        let dom = '';
        for (const key in subAttr) {
            if (Object.prototype.hasOwnProperty.call(subAttr, key)) {
                const e = subAttr[key];
                let val = e;
                if (Array.isArray(e)) {
                    val = e.filter(e2 => e2 !== undefined && e2 !== null).join(' ');
                }
                dom += `${ attrName }-${ key }="${ String(val).replace(/"/g, '&quot;') }" `
            }
        }
        return dom.trim();
    }

    /**
     * DOM 元素
     * @param {String} tagName 标签名称
     * @param {Object} attributes 属性
     * @param {String|null} content 内容
     * @returns {String} DOM
     */
    static element(tagName = 'div', attributes = {}, content = '') {
        if (content == null) return `<${ tagName } ${ FHUI.attributes(attributes) }>`;
        return `<${ tagName } ${ FHUI.attributes(attributes) }>${ FHUI.__elementJoin(content) }</${ tagName }>`
    }

    /**
     * 拼接 DOM 元素
     * @param {Array<String|undefined|null>} content 元素列表
     * @returns {String} DOM
     */
    static __elementJoin(content = []) {
        if (Array.isArray(content)) {
            let r = content.filter((e) => e !== undefined && e !== null);
            return r.join('');
        }
        return content;
    }
}


class FHUIComponent {
    constructor() {}

    static group(name, content = [], data = {}) {
        data = {
            class: undefined,
            id: undefined,
            style: undefined,
            ...data,
            attribute: {
                ...data.attribute
            }
        };
        return FHUI.element(
            'div',
            {
                class: [
                    'fh-component-group',
                    `fh-component-group-${ name }`
                ]
            },
            content
        );
    }
}


class FHUIComponentLabel {
    constructor() {}

    static label(content, data = {}) {
        data = {
            icon: undefined,
            ...data
        };

        return FHUI.element(
            'span',
            {
                class: 'fh-label'
            },
            FHUIComponentLabel.insideLabel(content, data)
        );
    }

    static insideLabel(content, data = {}) {
        data = {
            icon: undefined,
            ...data
        };

        let dom = '';
        let iconDOM = undefined;
        if (data?.icon !== undefined && Icon.getIcon(data.icon) !== undefined) {
            iconDOM = Icon.getIcon(data.icon);
            dom += FHUI.element(
                'span',
                {
                    class: [
                        'icon',
                        'fh-label-icon'
                    ],
                    aria: {
                        hidden: true
                    }
                },
                iconDOM
            )
        }
        if (content !== undefined) {
            dom += FHUI.element(
                'span',
                {
                    class: [
                        'text',
                        'fh-label-text'
                    ]
                },
                content
            )
        }

        return dom;
    }
}


class FHUIComponentInput {
    constructor() {}

    static {
        $(document).on('click', '.fh-input-label', function() {
            $(this).parents('.fh-input-component').eq(0).find('.fh-input').eq(0).focus();
        });

        // 范围滑块与输入框绑定
        $(document).on('input', '.fh-component-group-range-input .fh-input-component.fh-input-type-range .fh-range', function() {
            const cpt = $(this).parents('.fh-component-group-range-input').eq(0);
            const ipt = cpt.find('.fh-input-component.fh-input-type-number .fh-input').eq(0);
            if (ipt.val() == $(this).val()) return;
            ipt.val($(this).val());
            ipt.trigger('input');
        });

        // 输入框和范围滑块绑定
        $(document).on('input', '.fh-component-group-range-input .fh-input-component.fh-input-type-number .fh-input', function() {
            const cpt = $(this).parents('.fh-component-group-range-input').eq(0);
            const ipt = cpt.find('.fh-input-component.fh-input-type-range .fh-range').eq(0);
            ipt.val($(this).val());
        });

        // 下拉菜单弹出
        $(document).on('click', '.fh-input-select-component .fh-input-component .fh-input, .fh-input-select-component .fh-input-component .fh-input-label', function() {
            __fhSelectOptionShow(this);
        });
        $(document).on('keydown', '.fh-input-select-component .fh-input-component .fh-input', function(e) {
            // console.log(e.code);
            switch (e.code) {
                case 'Enter':
                    __fhSelectOptionShow(this, true);
                    break;
            
                default:
                    break;
            }
        });
        function __fhSelectOptionShow(that, setFocus = false) {
            const select = $(that).parents('.fh-input-select-component').eq(0);
            const inputCpt = select.find('.fh-input-component').eq(0);
            const input = select.find('.fh-input-component .fh-input').eq(0);
            const list = select.find('.fh-select-option-list').eq(0);
            const topCheck = (inputCpt.offset().top - window.scrollY) >= (list.height() + 16);
            const bottomCheck =
                (window.scrollY + window.innerHeight) - (inputCpt.offset().top + inputCpt.height()) >= (list.height() + 16);

            input.trigger('input');
            
            if (list.hasClass('hide')) {
                list.css('--select-list-width-auto', select.width() + 'px');
                list.removeClass('offset-top offset-bottom');
                list.removeClass('hide closed');

                if (bottomCheck) {
                    list.css('top', inputCpt.offset().top + inputCpt.height() + 'px');
                    list.addClass('offset-bottom');
                } else if (!bottomCheck && topCheck) {
                    list.css('top', inputCpt.offset().top - list.height() + 'px');
                    list.addClass('offset-top');
                } else {
                    list.css('top', Math.max((window.scrollY + window.innerHeight) - list.height() - 16, 16) + 'px');
                    list.addClass('offset-center');
                }

                list.css('left', inputCpt.offset().left + 'px');

                if ((list.offset().left + list.width() + 24) > (window.scrollX + window.innerWidth)) {
                    list.css('left', window.scrollX + window.innerWidth - list.width() - 24 + 'px');
                }

                if (setFocus) {
                    const selectedOptions = list.find('.fh-select-option[aria-selected="true"]');
                    const options = list.find('.fh-select-option[aria-selected="true"]');
                    setTimeout(() => {
                        if (selectedOptions.length > 0) {
                            selectedOptions.eq(0).focus();
                        } else if (selectedOptions.length == 0 && options.label > 0) {
                            options.eq(0).focus();
                        }
                    }, 0);
                }

                input.attr('aria-expanded', true);
            } else {
                list.addClass('hide');
                input.attr('aria-expanded', false);
            }
        }

        // 下拉菜单快捷键
        $(document).on('keydown', '.fh-input-select-component .fh-input-component .fh-input', function(e) {
            const select = $(this).parents('.fh-input-select-component').eq(0);
            const input = select.find('.fh-input-component .fh-input').eq(0);
            const list = select.find('.fh-select-option-list').eq(0);
            const length = list.data('length');
            let index = list.data('index');

            switch (e.code) {
                case 'ArrowUp':
                    e.preventDefault();
                    index--;
                    if (index < 0) index = length - 1;
                    break;

                case 'ArrowDown':
                    e.preventDefault();
                    index = ++index % length;
                    if (Number.isNaN(index)) index = -1;
                    break;
            
                default:
                    return
            }

            list.data('index', index);
            input.val(list.find(`.fh-select-option[data-index="${ index }"]`).eq(0).data('value'));
            input.trigger('input');
            // input.select();
        });
        $(document).on('keydown', '.fh-input-select-component .fh-select-option', function(e) {
            const select = $(this).parents('.fh-input-select-component').eq(0);
            const input = select.find('.fh-input-component .fh-input').eq(0);
            const list = $(this).parents('.fh-select-option-list').eq(0);
            const length = list.data('length');
            let index = $(this).data('index');
            switch (e.code) {
                case 'Escape':
                    input.focus();
                    list.addClass('hide');
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    index--;
                    if (index < 0) index = length - 1;
                    list.find(`.fh-select-option[data-index="${ index }"]`).eq(0).focus();
                    break;

                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    index = ++index % length;
                    if (Number.isNaN(index)) index = -1;
                    list.find(`.fh-select-option[data-index="${ index }"]`).eq(0).focus();
                    break;
            
                default:
                    break;
            }
        });

        // 下拉菜单选择
        $(document).on('click', '.fh-input-select-component .fh-select-option', function() {
            const select = $(this).parents('.fh-input-select-component').eq(0);
            const input = select.find('.fh-input-component .fh-input').eq(0);
            const list = select.find('.fh-select-option-list').eq(0);
            input.val($(this).data('value'));
            list.data('index', $(this).data('index'));
            list.find('.fh-select-option').attr('aria-selected', false);
            list.find(`.fh-select-option[data-value="${ $(this).data('value') }"]`).attr('aria-selected', true);
            list.addClass('hide');
            input.attr('aria-expanded', false);
            input.focus();
            input.trigger('input');
            input.trigger('change');
        });

        // 输入框绑定下拉菜单选中状态
        $(document).on('input', '.fh-input-select-component .fh-input-component .fh-input', function() {
            const select = $(this).parents('.fh-input-select-component').eq(0);
            const input = select.find('.fh-input-component .fh-input').eq(0);
            const list = select.find('.fh-select-option-list').eq(0);
            const option = list.find(`.fh-select-option[data-value="${ input.val() }"]`)
            list.find('.fh-select-option').attr('aria-selected', false);
            if (option.length > 0) {
                option.attr('aria-selected', true);
                input.attr('aria-activedescendant', option.eq(0).attr('id'));
            } else {
                input.removeAttr('aria-activedescendant');
            }
        });

        // 下拉菜单隐去
        $(document).on('animationend', '.fh-select-option-list.hide ', function() {
            $(this).addClass('closed');
        });

        // 下拉菜单失焦
        $(document).on('mousedown', function(e) {
            if ($(e.target).closest('.fh-select-option-list:not(.hide)').length == 0) {
                $('.fh-select-option-list').addClass('hide');
                $('.fh-input.fh-select[aria-expanded="true"]').attr('aria-expanded', false);
            }
        });
        $(document).on('focus', '*', function(e) {
            if ($(e.target).closest('.fh-select-option-list:not(.hide)').length == 0) {
                $('.fh-select-option-list').addClass('hide');
                $('.fh-input.fh-select[aria-expanded="true"]').attr('aria-expanded', false);
            }
        });
    }

    /**
     * 文本框
     * @param {String|Number} value 文本框中的值
     * @param {'text'|'number'|'password'|'search'|'url'|'email'|'tel'} type 文本框类型
     * @param {Object} data 数据
     * @param {String} data.class 类
     * @param {Array<Object>} data.datalist 数据列表
     * @param {String} data.datalist_id 数据列表 ID
     * @param {String|Number} data.default_value 默认值
     * @param {String} data.id ID
     * @param {String} data.name 名称
     * @param {String} data.style 样式
     * @param {Object} data.after 开头标签
     * @param {String} data.after.icon 开头标签图标
     * @param {String} data.after.label 开头标签内容
     * @param {Boolean} data.after.is_primary 是否为重要标签
     * @param {Object} data.attribute 元素属性
     * @param {Object} data.before 结尾标签
     * @param {String} data.before.icon 结尾标签图标
     * @param {String} data.before.label 结尾标签内容
     * @param {Boolean} data.before.is_primary 是否为重要标签
     * @returns {String} DOM
     */
    static input(value = undefined, type = 'text', data = {}) {
        data = {
            class: undefined,
            datalist: undefined,
            datalist_id: undefined,
            default_value: undefined,
            id: undefined,
            name: undefined,
            style: undefined,
            ...data,
            after: {
                icon: undefined,
                label: undefined,
                is_primary: false,
                ...data?.after
            },
            before: {
                icon: undefined,
                label: undefined,
                is_primary: true,
                ...data?.before
            },
            attribute: {
                ...data?.attribute
            }
        };
        data.name               = data.name             || data.id;
        data.default_value      = data.default_value    || value;
        data.after .__enable    = data.after .icon  !== undefined   || data.after .label !== undefined;
        data.before.__enable    = data.before.icon  !== undefined   || data.before.label !== undefined;

        let datalistDOM;
        if (Array.isArray(data.datalist) && data.datalist.length > 0) {
            if (data.datalist_id === undefined && data.id !== undefined) {
                data.datalist_id = `${ data.id }-datalist`;
            }
            datalistDOM = FHUIComponentInput.datalist(
                data.datalist,
                {
                    id: data.datalist_id
                }
            );
            data.attribute.list = data.datalist_id;
        }

        return FHUI.element(
            'div',
            {
                class: [
                    'fh-input-component',
                    `fh-input-type-${ type }`
                ]
            },
            [
                data.before.__enable ? FHUIComponentInput.__inputLabel('before', data.before) : undefined,
                FHUI.element(
                    'input',
                    {
                        ...data.attribute,
                        type: type,
                        name: data.name,
                        id: data.id,
                        class: 'fh-input ' + data.class,
                        style: data.style,
                        value: value,
                        data: {
                            default: data.default_value
                        }
                    },
                    null
                ),
                datalistDOM,
                data.after.__enable ? FHUIComponentInput.__inputLabel('after', data.after) : undefined
            ]
        );
    }

    /**
     * 范围滑块
     * @param {Number} value 值
     * @param {Object} data 数据
     * @param {String} data.class 类
     * @param {String|Number} data.default_value 默认值
     * @param {Array<Object>} data.label 标签列表
     * @param {String} data.id ID
     * @param {Boolean} data.hasInput 有输入框
     * @param {String} data.name 名称
     * @param {String} data.style 样式
     * @param {Object} data.attribute 元素属性
     * @param {Number} data.attribute.max 最大值
     * @param {Number} data.attribute.min 最小值
     * @param {Number} data.attribute.step 步长
     * @returns {String} DOM
     */
    static range(value = undefined, data = {}) {
        data = {
            class: undefined,
            default_value: undefined,
            label: [],
            id: undefined,
            inputClass: '',
            hasInput: false,
            name: undefined,
            style: undefined,
            ...data,
            attribute: {
                max: undefined,
                min: 0,
                step: undefined,
                ...data?.attribute
            }
        };

        data.name               = data.name             || data.id;
        data.default_value      = data.default_value    || value;
        if (value === undefined) value = data.attribute.min || data.attribute.max || 0;

        const rangeComponent = FHUI.element(
            'div',
            {
                class: [
                    'fh-input-component',
                    'fh-input-type-range',
                    data.label.length > 0 ? 'has-value-label' : undefined
                ]
            },
            [
                FHUI.element(
                    'input',
                    {
                        ...data.attribute,
                        type: 'range',
                        name: data.name,
                        id: data.id,
                        class: [
                            'fh-range',
                            data.class
                        ],
                        style: data.style,
                        value: value,
                        data: {
                            default: data.default_value
                        }
                    },
                    null
                ),
                data.label.length > 0 ? FHUIComponentInput.__rangeLabel(data.label, data.attribute) : null
            ]
        );

        if (data.hasInput) {
            const inputComponent = FHUIComponentInput.input(
                value,
                'number',
                {
                    class: 'fh-range-input ' + data.inputClass,
                    attribute: {
                        max: data.attribute.max,
                        min: data.attribute.min,
                        step: data.attribute.step
                    },
                    data: {
                        default: data.default_value
                    }
                }
            );
            return FHUIComponent.group(
                'range-input',
                [
                    rangeComponent,
                    inputComponent
                ]
            );
        }

        return rangeComponent;
    }

    static inputSelect(value = undefined, options = [], data = {}) {
        data = {
            class: undefined,
            default_value: undefined,
            id: undefined,
            name: undefined,
            option_description_fill_value: false,
            option_width: undefined,
            style: undefined,
            controlsId: undefined,
            ...data,
            attribute: {
                ...data?.attribute
            }
        }

        const optID = `fh-select-option-${ EchoLiveTools.getUUID() }-${ String(performance.now()).replace('.', '') }`;
        data.controlsId = optID;

        data.name               = data.name             || data.id;
        data.default_value      = data.default_value    || value;

        let inputDOM = FHUIComponentInput.input(
            value,
            'text',
            {
                id: data.id,
                name: data.name,
                class: 'fh-select ' + data.class,
                after: {
                    icon: 'material:chevron-down',
                    is_primary: true
                },
                attribute: {
                    aria: {
                        autocomplete: 'list',
                        expanded: 'false',
                        controls: optID,
                    },
                    autocomplete: 'off',
                    data: {
                        default: data.default_value
                    },
                    role: 'combobox'
                }
            }
        );

        let optionsDOM = FHUIComponentInput.selectMenu(value, options, data);

        return FHUI.element(
            'div',
            {
                ...data.attribute,
                class: 'fh-input-select-component',
                style: data.style
            },
            [
                inputDOM,
                optionsDOM
            ]
        );
    }

    static selectMenu(value = undefined, options = [], data = {}) {
        let optionsDOM = '';
        let selectedIndex = [];
        let hasDescription = false;

        options.forEach((e, i) => {
            e = {
                title: '',
                description: undefined,
                value: undefined,
                ...e
            };

            if (data.option_description_fill_value) {
                if (e.title === '') {
                    e.title = e.value;
                } else {
                    e.description = e.value;
                }
            }
            if (!hasDescription && e.description !== undefined) hasDescription = true;

            if (e.value === value) selectedIndex.push(i);

            optionsDOM += FHUI.element(
                'button',
                {
                    aria: {
                        selected: e.value === value
                    },
                    class: 'fh-select-option',
                    id: data?.controlsId ? data.controlsId + '-' + i : undefined,
                    data: {
                        index: i,
                        value: e.value
                    },
                    role: 'option'
                },
                [
                    FHUI.element(
                        'div',
                        {
                            class: 'selected-icon',
                            aria: {
                                hidden: true
                            }
                        },
                        Icon.getIcon('material:check')
                    ),
                    FHUI.element(
                        'div',
                        {
                            class: 'fh-select-option-content'
                        },
                        [
                            FHUI.element(
                                'div',
                                {
                                    class: 'title'
                                },
                                e.title
                            ),
                            e.description !== undefined ? FHUI.element(
                                'div',
                                {
                                    class: 'description'
                                },
                                e.description
                            ) : undefined
                        ]
                    )
                ]
            );
        });

        optionsDOM = FHUI.element(
            'div',
            {
                class: [
                    'fh-select-option-list',
                    hasDescription ? 'has-description' : null,
                    'hide',
                    'closed'
                ],
                id: data?.controlsId,
                data: {
                    length: options.length,
                    index: selectedIndex.length > 0 ? selectedIndex[0] : -1
                },
                role: 'list',
                style: data.option_width !== undefined ? `--select-list-width: ${ data.option_width };` : undefined
            },
            optionsDOM
        );

        return optionsDOM;
    }

    /**
     * 文本框头尾标签
     * @param {'after'|'before'} type 类型
     * @param {Object} data 数据
     * @returns {String} DOM
     */
    static __inputLabel(type, data = {}) {
        return FHUI.element(
            'div',
            {
                class: [
                    'fh-input-label',
                    `fh-input-label-type-${ type }`,
                    data.is_primary ? 'fh-input-label-primary' : null,
                    data.label === undefined && data.icon !== undefined ? 'fh-input-label-only-icon' : null
                ]
            },
            FHUIComponentLabel.insideLabel(data.label, { icon: data.icon })
        );
    }

    static __rangeLabel(label, attribute) {
        let dom = '';
        let translateX = '-50%';
        let align = 'center';
        label.forEach(e => {
            e = {
                value: '0%',
                label: 'missingno',
                ...e
            }
            translateX = '-50%';
            align = 'center';
            if (typeof e.value === 'number') {
                if (typeof attribute.max === 'undefined') {
                    e.value = '0%';
                } else {
                    e.value = `${ (e.value - attribute.min) / (attribute.max - attribute.min) * 100 }%`
                }
            }
            if (e.value === '0%') {
                translateX = 'calc(var(--font-size-base) / 2 * -1)';
                align = 'left';
            }
            if (e.value === '100%') {
                translateX = 'calc(-100% + var(--font-size-base) / 2)';
                align = 'right';
            }
            dom += FHUI.element(
                'div',
                {
                    class: 'fh-range-value-label',
                    style: `left: ${ e.value }; transform: translateX(${ translateX }); text-align: ${ align };`
                },
                e.label
            );
        });
        return FHUI.element(
            'div',
            {
                class: 'fh-range-value-label-list'
            },
            dom
        );
    }

    /**
     * 文本框数据列表
     * @param {Array<Object>} values 值列表
     * @param {String|Number} values[].value 值
     * @param {String} values[].title 标题
     * @param {Object} data 数据
     * @param {String} data.id ID
     * @returns {String} DOM
     */
    static datalist(values = [], data = {}) {
        data = {
            id: undefined,
            ...data,
            attribute: {
                ...data?.attribute
            }
        }
        let dom = '';

        values.forEach(e => {
            dom += FHUI.element(
                'option',
                {
                    value: e.value
                },
                e?.title ? e.title : ''
            );
        });

        return FHUI.element(
            'datalist',
            {
                ...data.attribute,
                id: data.id
            },
            dom
        );
    }
}


class FHUIComponentButton {
    constructor() {}

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {Object} data.attribute 元素属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标名称
     * @param {Boolean} data.disabled 禁用按钮
     * @param {Boolean} data.loading 加载状态
     * @param {undefined|'ghost'|'dashed'|'air'} data.type 按钮类型
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static button(content = '', data = {}) {
        data = {
            class: undefined,
            color: undefined,
            disabled: false,
            loading: false,
            icon: undefined,
            id: undefined,
            size: undefined,
            title: undefined,
            type: undefined,
            ...data,
            attribute: {
                ...data?.attribute
            }
        };

        if (data.loading) data.icon = 'FHLoading'

        return FHUI.element(
            'button',
            {
                ...data.attribute,
                class: [
                    'fh-button',
                    data.color ? `fh-${ data.color }` : null,
                    data.size ? `fh-${ data.size }` : null,
                    data.type ? `fh-${ data.type }` : null,
                    data?.icon ? 'fh-icon-button' : null,
                    data.class
                ],
                color: data.color,
                disabled: data.disabled ? '' : undefined,
                id: data.id,
                title: data.title
            },
            FHUIComponentLabel.insideLabel(content, { icon: data.icon })
        );
    }

    static buttonGhost(content = '', data = {}) {
        data = {
            ...data,
            type: 'ghost'
        }
        return FHUIComponentButton.button(content, data);
    }

    static buttonDashed(content = '', data = {}) {
        data = {
            ...data,
            type: 'dashed'
        }
        return FHUIComponentButton.button(content, data);
    }

    static buttonAir(content = '', data = {}) {
        data = {
            ...data,
            type: 'air'
        }
        return FHUIComponentButton.button(content, data);
    }
}


class FHUIComponentMenu {
    constructor() {}

    static menu(list = [], data = {}) {
        data = {
            ...data
        };

        return FHUI.element(
            'div',
            {
                aria: {
                    role: 'menu'
                },
                class: 'fh-menu'
            },
            FHUIComponentMenu.menuList(list)
        );
    }

    static menuList(list = []) {
        let dom = '';
        list.forEach(e => {
            dom += FHUIComponentMenu.menuItem(e);
        });
        return dom;
    }

    static menuItem(data = {}) {
        data = {
            content: '',
            icon: undefined,
            children: [],
            ...data
        };

        return FHUI.element(
            'a',
            {
                aria: {
                    role: 'menuitem'
                },
                class: 'fh-menu-item'
            },
            [
                FHUI.element(
                    'div',
                    {
                        class: 'icon-start'
                    },
                    data.icon !== undefined ? Icon.getIcon(data.icon) : null
                ),
                FHUI.element(
                    'div',
                    {
                        class: 'content'
                    },
                    data.content
                ),
                FHUI.element(
                    'div',
                    {
                        class: 'icon-end'
                    },
                    data.children.length > 0 ? Icon.getIcon('material:chevron-right') : null
                )
            ]
        );
    }
}