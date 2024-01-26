"use strict";

if (config.accessible.high_contrast) $('body').addClass('accessible-high-contrast');
if (config.accessible.drotanopia_and_deuteranopia) $('body').addClass('accessible-drotanopia-and-deuteranopia');

let timer = {
    clickEffect: -1
}

let checkboxEvent = {};

// 设置表单元素默认值
function setDefaultValue($sel, value) {
    $($sel).data('default', value);
    $($sel).val(value);
}

// 设置复选框默认状
function setCheckboxDefaultValue($sel, value) {
    $($sel).val(value);
    if (value == 1) {
        $($sel).parents('.checkbox').attr('aria-selected', 'true');
        $($sel).parents('.checkbox').addClass('selected');
    } else {
        $($sel).parents('.checkbox').attr('aria-selected', 'false');
        $($sel).parents('.checkbox').removeClass('selected');
    }
}


// 模拟点击
function effectClick($sel) {
    clearTimeout(timer.clickEffect);
    $('.fh-effect-click').removeClass('fh-effect-click');
    $($sel).addClass('fh-effect-click');
    timer.clickEffect = setTimeout(() => {
        $($sel).removeClass('fh-effect-click');
    }, 1000);
}

// 获取格式化时间
function getTime() {
    let d = new Date();
    return `${d.getFullYear()}-${afterZero(d.getMonth() + 1)}-${afterZero(d.getDate())} ${afterZero(d.getHours())}:${afterZero(d.getMinutes())}:${afterZero(d.getSeconds())}`;
}

// 时间前补零
function afterZero(value) {
    if (value >= 10) {
        return `${value}`;
    } else {
        return `0${value}`;
    }
}


// 编辑器插入字符
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

// 移动悬浮框到元素
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
$(document).on('click', '.tabpage-nav .tabpage-nav-item', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const navid = $(this).parent().data('navid');
    const pageid = $(this).data('pageid');
    // console.log($(`.tabpage-centent[data-navid="${navid}"] .tabpage-panel`));
    // document.startViewTransition(() => {});
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel`).addClass('hide');
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hide');
});

// 拾色器色板切换
$(document).on('change', '#popups-palette-select', function() {
    let name = $(this).val();
    $('#popups-palette .palette-page').addClass('hide');
    $(`#popups-palette .palette-page[data-palette-id="${ name }"]`).removeClass('hide');
});