/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class SlotInstaller {
    constructor() {
        this.handlers = new Map();

        this.observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType === 1) {
                        this._processElement(node);

                        node.querySelectorAll?.("slot").forEach((slot) =>
                            this._processElement(slot)
                        );
                    }
                }

                if (m.type === "attributes" && m.target instanceof HTMLSlotElement) {
                    const attr = m.attributeName;
                    if (attr && this.handlers.has(attr)) {
                        this._replaceSlot(m.target, attr);
                    }
                }
            }
        });

        this.observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true
        });
    }

    /**
     * 注册监听器
     * @param {String} attributeName 属性名
     * @param {(slot: HTMLSlotElement) => Node|String} handler 节点或 HTML 字符串
     */
    register(attributeName, handler) {
        this.handlers.set(attributeName, handler);
        this._scanExisting(attributeName);
    }

    /**
     * 扫描现有 DOM
     */
    _scanExisting(attributeName) {
        const matches = document.querySelectorAll(`slot[${attributeName}]`);
        matches.forEach((el) => this._replaceSlot(el, attributeName));
    }

    /**
     * 处理单个节点
     */
    _processElement(el) {
        if (!(el instanceof HTMLSlotElement)) return;

        for (const attributeName of this.handlers.keys()) {
            if (el.hasAttribute(attributeName)) {
                this._replaceSlot(el, attributeName);
            }
        }
    }

    /**
     * 执行替换动作
     */
    _replaceSlot(slotEl, attributeName) {
        const handler = this.handlers.get(attributeName);
        if (!handler) return;

        let replacement = handler(slotEl);

        if (typeof replacement === "string") {
            const tpl = document.createElement("template");
            tpl.innerHTML = replacement.trim();
            replacement = tpl.content.firstChild;
        }

        if (replacement instanceof Node) {
            slotEl.replaceWith(replacement);
        }
    }

    /**
     * 停止监听
     */
    disconnect() {
        this.observer.disconnect();
    }
}
