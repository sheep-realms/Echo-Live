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
                        val = e.filter(e2 => e2 != undefined && e2 != null).join(' ');
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
                    val = e.filter(e2 => e2 != undefined && e2 != null).join(' ');
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
        if (data?.icon !== undefined && Icon[data.icon] !== undefined) {
            iconDOM = Icon[data.icon];
            dom += FHUI.element(
                'span',
                {
                    class: [
                        'icon',
                        'fh-label-icon'
                    ]
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
        $(document).on('input', '.fh-component-group-range-input .fh-input-component.fh-input-type-range .fh-range', function() {
            const cpt = $(this).parents('.fh-component-group-range-input').eq(0);
            const ipt = cpt.find('.fh-input-component.fh-input-type-number .fh-input').eq(0);
            ipt.val($(this).val());
        });

        $(document).on('input', '.fh-component-group-range-input .fh-input-component.fh-input-type-number .fh-input', function() {
            const cpt = $(this).parents('.fh-component-group-range-input ').eq(0);
            const ipt = cpt.find('.fh-input-component.fh-input-type-range .fh-range').eq(0);
            ipt.val($(this).val());
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
     * @param {Object} data.attribute 元素属性
     * @param {Object} data.before 结尾标签
     * @param {String} data.before.icon 结尾标签图标
     * @param {String} data.before.label 结尾标签内容
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
                ...data?.after
            },
            before: {
                icon: undefined,
                label: undefined,
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
                        class: [
                            'fh-input',
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
     * @param {String} data.id ID
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
            id: undefined,
            hasInput: false,
            name: undefined,
            style: undefined,
            ...data,
            attribute: {
                max: undefined,
                min: 0,
                step: undefined,
                ...data?.attribute
            },
            label: {
                range: {
                    max: undefined,
                    middle: undefined,
                    min: undefined
                }
            }
        };

        if (value === undefined) value = data.attribute.min || data.attribute.max || 0;

        const rangeComponent = FHUI.element(
            'div',
            {
                class: [
                    'fh-input-component',
                    `fh-input-type-range`
                ]
            },
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
            )
        );

        if (data.hasInput) {
            const inputComponent = FHUIComponentInput.input(
                value,
                'number',
                {
                    class: 'fh-range-input',
                    attribute: {
                        max: data.attribute.max,
                        min: data.attribute.min
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
        return FHUI.element(
            'div',
            {
                class: [
                    'fh-input-component',
                    `fh-input-type-range`
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
                data.hasInput ? FHUIComponentInput.input(
                    value,
                    'number',
                    {
                        class: 'fh-range-input',
                        attribute: {
                            max: data.attribute.max,
                            min: data.attribute.min
                        }
                    }
                ) : undefined
            ]
        );
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
                    `fh-input-label-type-${ type }`
                ]
            },
            FHUIComponentLabel.insideLabel(data.label, { icon: data.icon })
        );
    }

    static __rangeLabel() {
        // TODO: 想个办法搞定这个
        return '';
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