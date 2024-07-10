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
        });
        
        $(document).on('animationend', '.fh-window.window-close', function(e) {
            if (e.target != this) return;
            that.killWindow($(this).data('index'));
        });

        $(document).on('click', '.fh-window:not(.window-close) .fh-window-controller-button:not(:disabled)', function() {
            let $window = $(this).parents('.fh-window').eq(0);
            that.runCallback($window.data('index'), $(this).data('controller-id'));
        });

        $(document).on('click', '.fh-window-modal-bg.fh-window-modal-bg-closable', function() {
            that.closeWindow($(this).data('index'));
            that.runCallback($(this).data('index'), $(this).data('controller-id'));
        });
    }

    /**
     * 对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
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

        this.addWindow(data.index, data, callback);
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
    setTitle(title) {
        this.parent.setWindowTitle(this.index, title);
    }
}