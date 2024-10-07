"use strict";

if (APP_META.isBeta) {
    const iconPath = $('head link[rel="icon"]').attr('href');
    let iconPathSplit = iconPath.split('/');
    iconPathSplit[iconPathSplit.length - 1] = 'favicon-beta.ico';
    $('head link[rel="icon"]').attr('href', iconPathSplit.join('/'));
}

if (config.global.color_scheme != 'auto') $('html').addClass('prefers-color-scheme-' + config.global.color_scheme);
if (config.global.touchscreen_layout) $('html').addClass('touchscreen-layout');
if (config.global.controller_layout_reverse) $('html').addClass('controller-layout-reverse');
if (config.global.thin_scrollbar) $('html').addClass('thin-scrollbar');
if (config.accessible.high_contrast || window.matchMedia('(forced-colors: active)').matches) {
    $('html').addClass('accessible-high-contrast');
    $('html').css('--accessible-outline-color', config.accessible.high_contrast_outline_color);
    $('html').css('--accessible-outline-size', config.accessible.high_contrast_outline_size);
    $('html').css('--accessible-outline-style', config.accessible.high_contrast_outline_style);
}
if (config.accessible.drotanopia_and_deuteranopia) $('html').addClass('accessible-drotanopia-and-deuteranopia');
if (config.accessible.link_underline) $('html').addClass('accessible-link-underline');
if (config.accessible.animation_disable) $('html').addClass('accessible-animation-disable');
if (config.accessible.power_saving_mode) $('html').addClass('power-saving-mode');
$('html').css('--font-size-base', `${ config.accessible.font_size }px`);



let timer = {
    clickEffect: -1
}

let checkboxEvent = {};

/**
 * 设置表单元素默认值
 * @param {String} $sel 选择器
 * @param {String|Number} value 值
 */
function setDefaultValue($sel, value) {
    $($sel).data('default', value);
    $($sel).val(value);
}

/**
 * 设置复选框默认状态
 * @param {String} $sel 选择器
 * @param {0|1} value 值
 */
function setCheckboxDefaultValue($sel, value) {
    if (typeof value === 'boolean') value ? value = 1 : value = 0;

    $($sel).val(value);
    if (value == 1) {
        $($sel).parents('.checkbox').attr('aria-selected', 'true');
        $($sel).parents('.checkbox').addClass('selected');
    } else {
        $($sel).parents('.checkbox').attr('aria-selected', 'false');
        $($sel).parents('.checkbox').removeClass('selected');
    }
}


/**
 * 模拟点击
 * @param {String} $sel 选择器
 */
function effectClick($sel) {
    clearTimeout(timer.clickEffect);
    $('.fh-effect-click').removeClass('fh-effect-click');
    $($sel).addClass('fh-effect-click');
    timer.clickEffect = setTimeout(() => {
        $($sel).removeClass('fh-effect-click');
    }, 1000);
}

/**
 * 标签页短暂高亮
 * @param {String} $sel 选择器
 */
function effectFlicker($sel) {
    clearTimeout(timer.clickEffect);
    $('.fh-effect-flicker').removeClass('fh-effect-flicker');
    $($sel).addClass('fh-effect-flicker');
    timer.clickEffect = setTimeout(() => {
        $($sel).removeClass('fh-effect-flicker');
    }, 1000);
}


/**
 * 编辑器插入字符
 * @param {String} id 元素ID
 * @param {String} text 左侧插入字符串
 * @param {String} text2 右侧插入字符串
 * @param {Boolean} forceInputText2 未选中文本时强制插入右侧字符串
 * @param {Boolean} forceRepeatBefore 左侧有相同字符串时强制插入字符串
 * @param {Boolean} forceRepeatAfter 右侧有相同字符串时强制插入字符串
 * @param {Boolean} firstClear 当起始光标在左侧时清除左侧插入字符
 * @param {Function} selectedTextFilter 选中文本过滤器
 */
function insertTextAtCursor(id, text, text2 = '', forceInputText2 = false, forceRepeatBefore = false, forceRepeatAfter = false, firstClear = false, selectedTextFilter = undefined) {
    let textarea       = document.getElementById(id);

    let selectionStart = textarea.selectionStart,
        selectionEnd   = textarea.selectionEnd;

    let textBefore     = textarea.value.substring(0,              selectionStart),
        selectedText   = textarea.value.substring(selectionStart, selectionEnd),
        textAfter      = textarea.value.substring(selectionEnd);

    
    if (!forceRepeatBefore && textBefore.substring(textBefore.length - text.length) == text) text = '';
    if (firstClear && selectionStart == 0) text = '';

    if (selectionStart == selectionEnd) {
        if (!forceInputText2) text2 = '';
        textarea.value = textBefore + text   /*  NONE  */ + text2 + textAfter;
        textarea.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
    } else {
        if (typeof selectedTextFilter == 'function') selectedText = selectedTextFilter(selectedText);
        if (!forceRepeatAfter && textAfter.search(text2) == 0) text2 = '';
        textarea.value = textBefore + text + selectedText + text2 + textAfter;
        textarea.setSelectionRange(selectionStart + text.length, selectionStart + text.length + selectedText.length);
    }
    
    textarea.focus();
    $('#' + id).trigger('input');
}


/**
 * 计算对比度是否符合 WCAG 标准
 * @param {String} color1 背景色（HEX）
 * @param {String} color2 前景色（HEX）
 * @returns {Object} 测试结果
 */
function calculateContrastRatio(color1 = undefined, color2 = undefined) {
    if (typeof color2 !== 'string') return;
    if (typeof color1 !== 'string') return;

    let rgb1 = hexToRgb(color1);
    let rgb2 = hexToRgb(color2);
    rgb1.a = 1;

    if (rgb2?.a != undefined && rgb2?.a < 1) rgb2 = blendColors(rgb1, rgb2);

    // 辅助函数：Alpha 混合
    function blendColors(backgroundColor, foregroundColor) {
        const blendAlpha = (1 - foregroundColor.a) * backgroundColor.a;
        const resultAlpha = foregroundColor.a + blendAlpha;
    
        const resultColor = {
            r: Math.round((foregroundColor.r * foregroundColor.a + backgroundColor.r * blendAlpha) / resultAlpha),
            g: Math.round((foregroundColor.g * foregroundColor.a + backgroundColor.g * blendAlpha) / resultAlpha),
            b: Math.round((foregroundColor.b * foregroundColor.a + backgroundColor.b * blendAlpha) / resultAlpha),
        };
    
        return resultColor;
    }

    // 辅助函数：将十六进制颜色转换为 RGB
    function hexToRgb(hexColor) {
        // 移除可能包含的 # 符号
        hexColor = hexColor.replace(/^#/, '');
    
        // 长度转换
        if (hexColor.length === 3 || hexColor.length === 4) {
            hexColor = hexColor
                .split('')
                .map(char => char.repeat(2))
                .join('');
        }
    
        // 提取颜色通道的值
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
    
        // 检查是否有 alpha 通道
        if (hexColor.length === 8) {
            const a = parseInt(hexColor.substring(6, 8), 16) / 255;
            return { r, g, b, a };
        } else {
            return { r, g, b };
        }
    }

    // 辅助函数：计算相对亮度
    function calculateRelativeLuminance(color) {
        const gammaCorrect = (value) => {
            value = value / 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * gammaCorrect(color.r) + 0.7152 * gammaCorrect(color.g) + 0.0722 * gammaCorrect(color.b);
    }

    // 辅助函数：计算对比度
    function calculateContrast(color1, color2) {
        const luminance1 = calculateRelativeLuminance(color1);
        const luminance2 = calculateRelativeLuminance(color2);
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    // 辅助函数：检查是否符合标准
    function checkContrastStandard(contrastRatio, standard) {
        return contrastRatio >= standard;
    }

    // 计算对比度
    const contrastRatio = calculateContrast(rgb1, rgb2);

    // 返回结果
    return {
        contrastRatio: contrastRatio,
        meetsAA: checkContrastStandard(contrastRatio, 4.5),
        meetsAAA: checkContrastStandard(contrastRatio, 7)
    };
}


// 创建悬浮框
function popupsCreate(dom, sel) {
    $('body').append(dom);
    $(window).on("resize", function () {
        let pos = $(sel).offset();
        popupsMove(sel, pos.left, pos.top);
    });
}

// 更改悬浮框可见性
function popupsDisplay(sel, value = true) {
    if (value) {
        $(sel).removeClass('hide');
    } else {
        $(sel).addClass('hide');
    }
}

// 移动悬浮框
function popupsMove(sel, left = 0, top = 0) {
    let $sel = $(sel),
        popupsWidth = $sel.outerWidth(),
        popupsHeight = $sel.outerHeight();
    
    if (document.documentElement.clientWidth - left - 16 < popupsWidth) left = document.documentElement.clientWidth - popupsWidth - 16;
    if (document.documentElement.scrollHeight - top - 16 < popupsHeight) top = document.documentElement.scrollHeight - popupsHeight - 16;
    if (document.documentElement.scrollTop + window.innerHeight - top < popupsHeight) top = document.documentElement.scrollTop + window.innerHeight - popupsHeight - 16;
    if (left < 16) left = 16;
    if (top < 16) top = 16;
    $sel.css('--popups-pos-left', left + 'px').css('--popups-pos-top', top + 'px');
}

/**
 * 移动悬浮框到元素
 * @param {String} popupsSel 悬浮框选择器
 * @param {String} elementSel 目标元素选择器
 * @param {'center'|'left'|'right'} align 水平对齐方式
 * @param {'bottom'|'top'} vertical 垂直方向
 * @param {Number} gap 间隙
 */
function popupsMoveToElement(popupsSel, elementSel, align = 'left', vertical = 'bottom', gap = 8) {
    let $psel   = $(popupsSel),
        $esel   = $(elementSel),
        epos    = $esel.offset(),
        ewidth  = $esel.width(),
        eheight = $esel.height(),
        pwidth  = $psel.width(),
        pheight = $psel.height(),
        newpos  = { left: 0, top: 0};

    if (vertical === 'bottom') {
        newpos.top = epos.top + eheight + gap;
    } else if (vertical === 'top') {
        newpos.top = epos.top - gap - pheight;
    }

    if (align === 'left') {
        newpos.left = epos.left;
    } else if (align === 'center') {
        newpos.left = epos.left + ewidth / 2 - pwidth / 2;
    } else if (align === 'right') {
        newpos.left = epos.left + ewidth - pwidth;
    }

    popupsMove(popupsSel, newpos.left, newpos.top);
}


// 悬浮框隐去逻辑
$(document).on('mousedown', function(e) {
    if ($(e.target).closest('.fh-popups:not(.hide)').length == 0) $('.fh-popups').addClass('hide');
});
$(document).on('focus', '*', function(e) {
    if ($(e.target).closest('.fh-popups:not(.hide)').length == 0) $('.fh-popups').addClass('hide');
});

// 复选框
$(document).on('click', '.checkbox', function() {
    let v = $(this).children('input').val();
    let name = $(this).children('input').attr('name');
    if (v == 0) {
        $(this).children('input').val(1);
        $(this).addClass('selected');
        $(this).attr('aria-selected', 'true');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').removeClass('hide');
        }
        if (typeof checkboxEvent[name] == 'function') checkboxEvent[name](1);
    } else {
        $(this).children('input').val(0);
        $(this).removeClass('selected');
        $(this).attr('aria-selected', 'false');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').addClass('hide');
        }
        if (typeof checkboxEvent[name] == 'function') checkboxEvent[name](0);
    }
});

// 标签页切换
$(document).on('click', '.tabpage-nav .tabpage-nav-item:not(.disabled)', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const navid = $(this).parent().data('navid');
    const pageid = $(this).data('pageid');
    // console.log($(`.tabpage-centent[data-navid="${navid}"] .tabpage-panel`));
    // document.startViewTransition(() => {});
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel`).addClass('hide');
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hide');
    popupsDisplay('#popups-palette', false);
});

// 拾色器色板切换
$(document).on('change', '#popups-palette-select', function() {
    let name = $(this).val();
    $('#popups-palette .palette-page').addClass('hide');
    $(`#popups-palette .palette-page[data-palette-id="${ name }"]`).removeClass('hide');
});

// 表情包切换
$(document).on('change', '#popups-emoji-select', function() {
    let name = $(this).val();
    $('#popups-emoji .emoji-page').addClass('hide');
    $(`#popups-emoji .emoji-page[data-emoji-pack-id="${ name }"]`).removeClass('hide');
});

// 拾色器无障碍提示按钮
$(document).on('click', '#popups-palette-accessible-help-btn', function() {
    window.open('https://sheep-realms.github.io/Echo-Live-Doc/main/accessible/#visual', '_blank');
    popupsDisplay('#popups-palette', false);
});

// 拾色器色块鼠标进入
$(document).on('mouseenter', '#popups-palette.color-contrast-enable .color-box', function() {
    paletteColorContrastCheck($(this).data('value'));
});

// 拾色器快捷键
$(document).on('keydown', '#popups-palette', function(e) {
    // console.log(e.keyCode);

    let psv = [];
    let now = '';
    let nowIndex = 0;
    let nextIndex = 0;
    function getPaletteSelectValue() {
        now = $('#popups-palette-select').val();
        let $pso = $('#popups-palette-select option');
        for (let i = 0; i < $pso.length; i++) {
            psv.push($pso.eq(i).val())
        }
        nowIndex = psv.indexOf(now);
        nextIndex = nowIndex;
    }

    switch (e.keyCode) {
        case 27:
            popupsDisplay('#popups-palette', false);
            $('#ptext-content').focus();
            break;

        case 81:
            getPaletteSelectValue();
            nextIndex--;
            if (nextIndex < 0) nextIndex = psv.length - 1;
            $('#popups-palette-select').val(psv[nextIndex]);
            $('#popups-palette-select').change();
            $('#popups-palette-select').focus();
            break;

        case 69:
            getPaletteSelectValue();
            nextIndex = ++nextIndex % psv.length;
            $('#popups-palette-select').val(psv[nextIndex]);
            $('#popups-palette-select').change();
            $('#popups-palette-select').focus();
            break;
    
        default:
            break;
    }
});

// 表情包捷键
$(document).on('keydown', '#popups-emoji', function(e) {
    // console.log(e.keyCode);

    let psv = [];
    let now = '';
    let nowIndex = 0;
    let nextIndex = 0;
    function getPaletteSelectValue() {
        now = $('#popups-emoji-select').val();
        let $pso = $('#popups-emoji-select option');
        for (let i = 0; i < $pso.length; i++) {
            psv.push($pso.eq(i).val())
        }
        nowIndex = psv.indexOf(now);
        nextIndex = nowIndex;
    }

    switch (e.keyCode) {
        case 27:
            popupsDisplay('#popups-emoji', false);
            $('#ptext-content').focus();
            break;

        case 81:
            getPaletteSelectValue();
            nextIndex--;
            if (nextIndex < 0) nextIndex = psv.length - 1;
            $('#popups-emoji-select').val(psv[nextIndex]);
            $('#popups-emoji-select').change();
            $('#popups-emoji-select').focus();
            break;

        case 69:
            getPaletteSelectValue();
            nextIndex = ++nextIndex % psv.length;
            $('#popups-emoji-select').val(psv[nextIndex]);
            // 遇到了一个邪道问题，程序基于断点运行，不修，直接暴力解决
            // 重复代码是刻意为之，但凡少一行程序都跑不起来
            setTimeout(function() {
                $('#popups-emoji-select').val(psv[nextIndex]);
                $('#popups-emoji-select').change();
                $('#popups-emoji-select').focus();
            }, 4);
            $('#popups-emoji-select').change();
            $('#popups-emoji-select').focus();
            break;
    
        default:
            break;
    }
});

// 图片选择器快捷键
$(document).on('keydown', '#popups-image', function(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 27:
            popupsDisplay('#popups-image', false);
            $('#ptext-content').focus();
            break;
    
        default:
            break;
    }
});

function paletteColorContrastCheck(value) {
    let bg = config.editor.color_picker.contrast_background_color;
    let threshold = config.editor.color_picker.contrast_threshold;

    $('#popups-palette .popups-palette-color-contrast .diff-dashboard').css('--bg-color', bg);
    $('#popups-palette .popups-palette-color-contrast .diff-dashboard').css('--fg-color', value);
    $('#popups-palette .popups-palette-color-contrast .diff-dashboard .diff-fg-text').text(value.toUpperCase());

    let r = calculateContrastRatio(bg, value);

    $('#popups-palette .popups-palette-color-contrast .diff-result-box').removeClass('state-ok state-fail');
    if (r.meetsAA) {
        $('#popups-palette .popups-palette-color-contrast .diff-result-aa').addClass('state-ok');
    } else {
        $('#popups-palette .popups-palette-color-contrast .diff-result-aa').addClass('state-fail');
    }
    if (r.meetsAAA) {
        $('#popups-palette .popups-palette-color-contrast .diff-result-aaa').addClass('state-ok');
    } else {
        $('#popups-palette .popups-palette-color-contrast .diff-result-aaa').addClass('state-fail');
    }
    if (r.contrastRatio >= threshold) {
        $('#popups-palette .popups-palette-color-contrast .diff-result-contrast').addClass('state-ok');
    } else {
        $('#popups-palette .popups-palette-color-contrast .diff-result-contrast').addClass('state-fail');
    }

    $('#popups-palette .popups-palette-color-contrast .diff-result-contrast .title').text(r.contrastRatio.toFixed(1));
}