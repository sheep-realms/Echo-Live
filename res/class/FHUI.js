class FHUI {
    constructor() {}

    static attributes(attr = {}) {
        let dom = '';
        for (const key in attr) {
            if (Object.prototype.hasOwnProperty.call(attr, key)) {
                const e = attr[key];
                if (e === undefined) continue;
                let val = e;
                if (typeof e === 'object') {
                    if (Array.isArray(e)) {
                        val = e.join(' ');
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

    static subAttributes(attrName, subAttr) {
        let dom = '';
        for (const key in subAttr) {
            if (Object.prototype.hasOwnProperty.call(subAttr, key)) {
                const e = subAttr[key];
                let val = e;
                if (Array.isArray(e)) {
                    val = e.join(' ');
                }
                dom += `${ attrName }-${ key }="${ String(val).replace(/"/g, '&quot;') }" `
            }
        }
        return dom.trim();
    }

    static element(tagName = 'div', attributes = {}, content = '') {
        if (content == null) return `<${ tagName } ${ FHUI.attributes(attributes) }>`;
        return `<${ tagName } ${ FHUI.attributes(attributes) }>${ FHUI.__elementJoin(content) }</${ tagName }>`
    }

    static __elementJoin(content = []) {
        if (Array.isArray(content)) {
            let r = content.filter((e) => e !== undefined && e !== null);
            return r.join('');
        }
        return content;
    }
}

class FHUIComponentInput {
    constructor() {}

    /**
     * 输入框
     * @param {String|Number} value 输入框中的值
     * @param {'text'|'number'|'password'} type 输入框类型
     * @param {Object} data 数据
     * @param {String} data.class 类
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

        return FHUI.element(
            'div',
            {
                class: [
                    'fh-input-component',
                    `fh-input-type-${type}`
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
                data.after.__enable ? FHUIComponentInput.__inputLabel('after', data.after) : undefined
            ]
        );
    }

    /**
     * 输入框头尾标签
     * @param {'after'|'before'} type 类型
     * @param {Object} data 数据
     * @returns {String} DOM
     */
    static __inputLabel(type, data = {}) {
        let iconDOM = undefined;
        if (data?.icon !== undefined && Icon[data.icon] !== undefined) {
            iconDOM = Icon[data.icon];
        }

        return FHUI.element(
            'div',
            {
                class: [
                    'fh-input-label',
                    `fh-input-label-type-${ type }`
                ]
            },
            [
                iconDOM ? `<span class="icon">${ iconDOM }</span>` : undefined,
                data?.label ? `<span class="text">${ data.label }</span>` : undefined
            ]
        );
    }
}