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
            $window.parents('.fh-window-modal-bg').eq(0).removeClass('window-show');
            $window.removeClass('window-show');

            let index = $window.data('index');
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
        });
        
        $(document).on('animationend', '.fh-window.window-close', function(e) {
            if (e.target != this) return;
            that.killWindow($(this).data('index'));
        });

        $(document).on('click', '.fh-window:not(.window-close) .fh-window-controller-button:not(:disabled)', function() {
            let $window = $(this).parents('.fh-window').eq(0);
            that.runCallback($window.data('index'), $(this).data('controller-id'));
        });

        $(document).on('click', '.fh-window-modal-bg.fh-window-modal-bg-closable', function(e) {
            if (e.target != this) return;
            that.closeWindow($(this).data('index'));
            that.runCallback($(this).data('index'), $(this).data('controller-id'));
        });

        $(document).on('keydown', '.fh-window', function(e) {
            if (e.keyCode == 27) {
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
     * @param {Boolean} data.closable 可关闭
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {String} data.style 样式
     * @param {Function} callback 回调函数
     * @returns {String} DOM
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
     */
    close() {
        this.parent.closeWindow(this.index);
    }

    /**
     * 设置窗口标题
     * @param {String} title 标题
     */
    setTitle(title = '') {
        this.parent.setWindowTitle(this.index, title);
    }

    /**
     * 设置消息框内容
     * @param {String} content 内容
     */
    setMsgboxContent(content = '') {
        this.parent.setMsgboxContent(this.index, content);
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
                        //     sysNotice.sendThasTitle('notice.github_download_but_no_assets', {}, {}, {
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