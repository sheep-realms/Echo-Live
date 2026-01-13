class ShortcutManager {
    constructor(options = {}) {
        this.views = new Map();
        this.stack = [];

        this.root = options.root || document;

        this._handleKeydown = this._handleKeydown.bind(this);
        this.root.addEventListener("keydown", this._handleKeydown, true);
    }

    /**
     * 视图注册
     * @param {String} name 视图名称
     * @param {Object} config 配置
     * @param {Object} config.submitKey 提交快捷键
     * @param {'ctrl-enter'|'enter'} config.submitKey.mode 组合模式
     * @param {Boolean} config.submitKey.swap 互换行为 
     * @param {Function} config.submitKey.handler 触发函数
     * @param {'always'|'ctrlOnly'|'none'} config.submitKey.imeGuard IEM 避让
     * @param {{ keys: String, handler: Function }[]} config.shortcuts 快捷键列表
     * @param {String} config.shortcuts[].keys 按键组合
     * @param {Function} config.shortcuts[].handler 触发函数
     * @param {Boolean} config.shortcuts[].allowMultiple 允许快捷键多次注册（忽略警告）
     */
    registerView(name, config) {
		if (this.views.has(name)) {
			throw new Error(`View "${name}" already registered.`);
		}

		const shortcuts = new Map();

		const addShortcut = (
			key,
			handlers,
			submitOnly = false,
			allowMultiple = false,
			imeGuard = null
		) => {
			if (!shortcuts.has(key)) {
				shortcuts.set(key, []);
			}

			if (handlers.length > 1 && !allowMultiple) {
				console.warn(
					`[ShortcutManager] Shortcut "${key}" in view "${name}" has multiple handlers.`
				);
			}

			shortcuts.get(key).push({
				handlers,
				submitOnly,
				imeGuard
			});
		};

		/* -------- 普通快捷键 -------- */

		for (const item of config.shortcuts || []) {
			const keys = Array.isArray(item.keys) ? item.keys : [item.keys];
			const handlers = Array.isArray(item.handler)
				? item.handler
				: [item.handler];

			for (const key of keys) {
				addShortcut(
					this._normalizeKey(key),
					handlers,
					!!item.submitOnly,
					!!item.allowMultiple
				);
			}
		}

		/* -------- 提交快捷键转写 -------- */

		if (config.submitKey) {
			const {
				mode = "ctrl-enter",
				swap = false,
				handler,
				imeGuard = "always"
			} = config.submitKey;

			if (typeof handler !== "function") {
				throw new Error(`submitKey.handler must be a function.`);
			}

			const submitKeys =
				swap
					? this._expandSubmitKeys(
                            mode === "ctrl-enter" ? "enter" : "ctrl-enter",
                            mode !== "ctrl-enter"
                        )
                    : this._expandSubmitKeys(
                            mode,
                            mode === "ctrl-enter"
                        );

			submitKeys.forEach(key => {
				addShortcut(
					key,
					[handler],
					true,
					false,
					imeGuard
				);
			});

			/* ---- 互换模式下的“插入换行” ---- */

			if (swap) {
				const newlineKeys =
					this._expandSubmitKeys(
						mode,
						mode === "ctrl-enter"
					);

				newlineKeys.forEach(key => {
					addShortcut(key, [
						(event, element) => {
							this.insertNewline(element);
						}
					], true);
				});
			}
		}

		this.views.set(name, {
			name,
			shortcuts,
			bindings: []
		});
	}


    /* ----------------------------
     * 视图提交与移除
     * ---------------------------- */

    pushView(name, source = "manual", element = null) {
        if (!this.views.has(name)) {
            throw new Error(`View "${name}" is not registered.`);
        }

        this.stack.push({ name, source, element });
    }

    popView(name, options = {}) {
        const { all = false } = options;

        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (this.stack[i].name === name) {
                this.stack.splice(i, 1);
                if (!all) return;
            }
        }
    }

    popTopView(expectedName) {
        if (!this.stack.length) return;

        const top = this.stack[this.stack.length - 1];
        if (!expectedName || top.name === expectedName) {
            this.stack.pop();
        }
    }

    /* ----------------------------
     * 元素绑定
     * ---------------------------- */

    bindElement(selector, viewName) {
        const view = this.views.get(viewName);
        if (!view) {
            throw new Error(`View "${viewName}" is not registered.`);
        }

        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            const onFocus = () => {
                this.pushView(viewName, "auto", el);
            };

            const onBlur = () => {
                this.popView(viewName);
            };

            el.addEventListener("focus", onFocus);
            el.addEventListener("blur", onBlur);

            view.bindings.push({ el, onFocus, onBlur });
        });
    }

    /* ----------------------------
     * 键盘事件处理
     * ---------------------------- */

    _handleKeydown(event) {
        const key = this._eventToKey(event);
        const checked = new Set();

        for (let i = this.stack.length - 1; i >= 0; i--) {
            const layer = this.stack[i];
            if (checked.has(layer.name)) continue;
            checked.add(layer.name);

            const view = this.views.get(layer.name);
            if (!view) continue;

            const records = view.shortcuts.get(key);
            if (!records) continue;

            for (const record of records) {
                if (record.submitOnly && layer.source !== "auto") {
                    continue;
                }
				
				
				/* -------- IME Guard -------- */

				if (record.imeGuard && event.isComposing) {
					if (record.imeGuard === "always") {
						return;
					}

					if (
						record.imeGuard === "ctrlOnly" &&
						!event.ctrlKey
					) {
						return;
					}
				}

                event.preventDefault();

                for (const fn of record.handlers) {
                    if (layer.source === "auto") {
                        fn(event, layer.element);
                    } else {
                        fn(event);
                    }
                }

                return;
            }
        }
    }

    /* ----------------------------
     * 键名处理
     * ---------------------------- */

    _eventToKey(event) {
        const parts = [];

        if (event.ctrlKey) parts.push("Ctrl");
        if (event.shiftKey) parts.push("Shift");
        if (event.altKey) parts.push("Alt");

        parts.push(event.code);
        return parts.join("+");
    }

    _normalizeKey(key) {
        if (typeof key === "string") return key;
        throw new Error("Invalid key format.");
    }
	
	_expandSubmitKeys(mode, ctrl) {
		const enterKeys = ["Enter", "NumpadEnter"];

		if (ctrl) {
			return enterKeys.map(k => `Ctrl+${k}`);
		}

		return enterKeys;
	}

    insertNewline(el) {
        const start = el.selectionStart;
        const end   = el.selectionEnd;
        const value = el.value;
        el.value            = value.substring(0, start) + "\n" + value.substring(end);
        el.selectionStart   = el.selectionEnd = start + 1;
        const div   = document.createElement("div");
        const style = getComputedStyle(el);

        [
            "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordWrap",
            "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderTopWidth", "borderBottomWidth",
            "boxSizing", "lineHeight", "whiteSpace"
        ].forEach(k => div.style[k] = style[k]);

        div.style.position      = "absolute";
        div.style.visibility    = "hidden";
        div.style.whiteSpace    = "pre-wrap";
        div.style.width         = style.width;
        div.style.height        = "auto";

        const before = el.value.substring(0, el.selectionStart);
        const after = el.value.substring(el.selectionStart);

        div.textContent         = before;
        const marker            = document.createElement("span");
        marker.textContent      = "●";
        div.appendChild(marker);
        const rest              = document.createTextNode(after);
        div.appendChild(rest);
        document.body.appendChild(div);
        const markerTop         = marker.offsetTop;
        const targetScrollTop   = markerTop - 4;
        el.scrollTop            = targetScrollTop;
        document.body.removeChild(div);
    }
}