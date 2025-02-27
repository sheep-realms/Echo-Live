/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class UniverseWindow {
    constructor() {
        this.lastWindowIndex = 0;
        this.windowList = {};

        this.init();
    }

    /**
     * 初始化事件绑定
     */
    init() {
        let that = this;
        $(document).on('click', '.fh-window .fh-window-title .close', function() {
            let $window = $(this).parents('.fh-window').eq(0);
            that.closeWindow($window.data('index'));
            that.runCallback($window.data('index'), null);
        });
        
        $(document).on('animationend', '.fh-window.window-show .fh-window-content', function(e) {
            if (e.target != this) return;
            let $window = $(this).parents('.fh-window').eq(0);
            let index = $window.data('index');
            let focusFormItem = $window.data('auto-focus-form-item');
            if (focusFormItem) {
                $window.find(`[name="${ focusFormItem }"]`).eq(0).focus();
            } else {
                that.autoSetFocusButton(index);
            }
            $window.parents('.fh-window-modal-bg').eq(0).removeClass('window-show');
            $window.removeClass('window-show');
        });
        
        $(document).on('animationend', '.fh-window.window-close', function(e) {
            if (e.target != this) return;
            that.killWindow($(this).data('index'));
        });

        $(document).on('click', '.fh-window:not(.window-close) .fh-window-controller-button:not(:disabled)', function() {
            let $window = $(this).parents('.fh-window').eq(0);
            if ($window.hasClass('fh-window-has-input')) {
                that.runCallback($window.data('index'), $window.find('.fh-window-output').eq(0).val());
            } else {
                that.runCallback($window.data('index'), $(this).data('controller-id'));
            }
        });

        $(document).on('click', '.fh-window-modal-bg.fh-window-modal-bg-closable', function(e) {
            if (e.target != this) return;
            that.closeWindow($(this).data('index'));
            that.runCallback($(this).data('index'), null);
        });

        $(document).on('keydown', '.fh-window', function(e) {
            if (e.code === 'Escape') {
                $(this).find('.fh-window-title .close').eq(0).click();
            }
        });
    }

    /**
     * 创建对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
     * @param {String} data.autoFocusButton 自动获得焦点的按钮
     * @param {String} data.autoFocusFormItem 自动获得焦点的表单项
     * @param {Boolean} data.closable 可关闭
     * @param {Boolean} data.hasInput 是否有输入框
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {String} data.style 样式
     * @param {Function} callback 回调函数
     * @returns {Object} 窗口数据
     */
    window(content = '', title = '', data = {}, callback = undefined) {
        data = {
            ...data,
            index: this.lastWindowIndex++
        }

        $('body').append(FHUIWindow.window(content, title, data));

        if (callback == undefined) {
            callback = (v, e) => { e.close() };
        }

        return this.addWindow(data.index, data, callback);
    }

    /**
     * 创建消息对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
     * @param {String} data.autoFocusButton 自动获得焦点的按钮
     * @param {String} data.autoFocusFormItem 自动获得焦点的表单项
     * @param {Boolean} data.closable 可关闭
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {String} data.style 样式
     * @param {Function} callback 回调函数
     * @returns {Object} 窗口数据
     */
    messageWindow(content = '', title = '', data = {}, callback = undefined) {
        return this.window(
            `<div class="fh-msgbox-content-message">${ content }</div>`,
            title, data, callback
        );
    }

    /**
     * 创建文本域对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
     * @param {String} data.autoFocusButton 自动获得焦点的按钮
     * @param {String} data.autoFocusFormItem 自动获得焦点的表单项
     * @param {Boolean} data.closable 可关闭
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {Boolean} data.readonly 只读
     * @param {String} data.style 样式
     * @param {Object} data.textarea 文本域
     * @param {Boolean} data.textarea.class 类
     * @param {Boolean} data.textarea.readOnly 只读
     * @param {Function} callback 回调函数
     * @returns {Object} 窗口数据
     */
    textareaWindow(content = '',title = '', data = {}, callback = undefined) {
        data = {
            textarea: {
                class: '',
                readOnly: false,
            },
            ...data,
            autoFocusFormItem: 'fh-window-textarea',
            hasInput: true
        }
        return this.window(
            FHUI.element(
                'div',
                {
                    class: [
                        'fh-window-textarea-form',
                        'echo-editor-form'
                    ]
                },
                FHUI.element(
                    'textarea',
                    {
                        class: [
                            'fh-window-textarea',
                            'fh-window-output',
                            data.textarea.class
                        ],
                        name: 'fh-window-textarea',
                        readonly: data.textarea.readOnly ? '' : undefined
                    },
                    content
                )
            ),
            title, data, callback
        );
    }

    /**
     * 添加窗口
     * @param {Number} index 索引编号
     * @param {Object} data 数据
     * @param {Function} callback 回调函数 
     * @returns {Object} 窗口数据
     */
    addWindow(index, data, callback = () => {}) {
        this.windowList[index] = {
            data: data,
            callback: callback,
            closed: false,
            unit: new UniverseWindowUnit(this, index)
        };
        if (config.accessibility.animation_disable || $('html').hasClass('accessibility-animation-disable')) {
            this.autoSetFocusButton(index);
        }
        return this.windowList[index];
    }

    /**
     * 关闭窗口
     * @param {Number} index 索引编号
     */
    closeWindow(index) {
        if (this.windowList[index] == undefined ) return;
        if (this.windowList[index].closed == true) return;
        this.windowList[index].closed = true;
        if (config.accessibility.animation_disable || $('html').hasClass('accessibility-animation-disable')) return this.killWindow(index);
        $(`.fh-window[data-index="${ index }"]`).addClass('window-close');
        $(`.fh-window[data-index="${ index }"] button`).attr('disabled', 'true');
        $(`.fh-window-modal-bg[data-index="${ index }"]`).addClass('window-close');
    }

    /**
     * 清除窗口
     * @param {Number} index 索引编号
     */
    killWindow(index) {
        $(`.fh-window[data-index="${ index }"]`).remove();
        $(`.fh-window-modal-bg[data-index="${ index }"]`).remove();
        delete this.windowList[index];
    }

    /**
     * 设置窗口标题
     * @param {Number} index 索引编号
     * @param {String} title 标题
     */
    setWindowTitle(index, title = '') {
        $(`.fh-window[data-index="${ index }"] .fh-window-title .title`).text(title);
    }

    /**
     * 设置消息框内容
     * @param {Number} index 索引编号
     * @param {String} content 内容
     */
    setMsgboxContent(index, content = '') {
        $(`.fh-window[data-index="${ index }"] .fh-window-content .fh-msgbox-content`).text(content);
    }

    /**
     * 运行回调函数
     * @param {Number} index 索引编号
     * @param {String} value 返回值
     */
    runCallback(index, value) {
        this.windowList[index]?.callback(
            value,
            this.windowList[index].unit
        );
    }

    /**
     * 自动设置焦点按钮
     * @param {Number} index 索引编号
     */
    autoSetFocusButton(index) {
        let $window = $(`.fh-window[data-index="${index}"]`).eq(0);

        let autoFocusButton = $window.data('auto-focus-button');

        let $ctrlBtn = $(`.fh-window[data-index="${ index }"] .fh-window-controller-button:not(:disabled)`);
        let $ctrlBtnSel = autoFocusButton ? $(`.fh-window[data-index="${ index }"] .fh-window-controller-button[data-controller-id="${ autoFocusButton }"]:not(:disabled)`) : undefined;
        if ($ctrlBtn.length == 0) {
            if (data.closable) $(`.fh-window[data-index="${ index }"] .fh-window-title .close`).focus();
        } else if ($ctrlBtnSel == undefined || $ctrlBtnSel.length == 0) {
            $ctrlBtn.eq(0).focus();
        } else {
            $ctrlBtnSel.eq(0).focus();
        }
    }
}

class UniverseWindowUnit {
    constructor(parent, index) {
        this.parent = parent;
        this.index = index;
    }

    /**
     * 清除窗口
     */
    kill() {
        this.parent.killWindow(this.index);
    }

    /**
     * 关闭窗口
     * @returns {UniverseWindowUnit} 自身
     */
    close() {
        this.parent.closeWindow(this.index);
        return this;
    }

    /**
     * 设置窗口标题
     * @param {String} title 标题
     * @returns {UniverseWindowUnit} 自身
     */
    setTitle(title = '') {
        this.parent.setWindowTitle(this.index, title);
        return this;
    }

    /**
     * 设置消息框内容
     * @param {String} content 内容
     * @returns {UniverseWindowUnit} 自身
     */
    setMsgboxContent(content = '') {
        this.parent.setMsgboxContent(this.index, content);
        return this;
    }
}

class UpdateWindow {
    constructor(parent) {
        this.parent = parent;
        this.updateData = localStorageManager.getItem('updater');
        this.windowUnit = undefined;
        this.windowUnitAssetsSelector = undefined;

        this.init();
    }

    init() {
        this.windowUnit = this.parent.window(
            FHUIWindow.releasesView(this.updateData.latestReleasesData),
            '发行版本详情',
            {
                autoIconButton: true,
                controller: [
                    'close',
                    {
                        id: 'open',
                        content: 'GitHub',
                        data: {
                            icon: Icon.openInNew,
                            type: 'ghost'
                        }
                    },
                    'download'
                ],
                maskClosable: true,
                size: {
                    width: '680px',
                    height: '80vh'
                }
            },
            (value, unit) => {
                switch (value) {
                    case 'close':
                    case null:
                        unit.close();
                        break;

                    case 'open':
                        window.open(this.updateData.latestReleasesData?.html_url, '_blank');
                        break;

                    case 'download':
                        this.selectAssets();
                        // if (this.updateData.latestReleasesData?.assets.length == 0) {
                        //     sysNotice.sendTHasTitle('notice.github_download_but_no_assets', {}, {}, {
                        //         icon: 'help'
                        //     });
                        // } else if (this.updateData.latestReleasesData?.assets.length == 1) {
                        //     window.open(this.updateData.latestReleasesData?.assets[0]?.browser_download_url, '_blank');
                        // } else {
                        //     this.selectAssets();
                        // }
                        break;
                
                    default:
                        break;
                }
            }
        ).unit;
    }

    selectAssets() {
        if (this.windowUnitAssetsSelector != undefined) return;
        this.windowUnitAssetsSelector = this.parent.window(
            FHUIWindow.assetsSelectorsView(this.updateData.latestReleasesData.assets),
            '下载文件',
            {
                autoIconButton: true,
                controller: ['close'],
                icon: 'download',
                maskClosable: true
            },
            (v, e) => {
                this.windowUnitAssetsSelector = undefined;
                e.close();
            }
        );
    }
}