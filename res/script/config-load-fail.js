"use strict";

function configLoadFail() {
    window.stop();

    $('html link[rel="stylesheet"]').remove();
    $('html title').text('配置文件加载出错');
    $('body').remove();

    alert('配置文件加载出错：配置文件中包含错误，或未找到配置文件。请检查您的配置文件。');
}