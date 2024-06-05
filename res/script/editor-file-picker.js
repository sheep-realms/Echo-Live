"use strict";

let inFileDorp = false;
let inFileDorpTimer = 0;
let inFileDorpLongTime = false;
let dragleaveCount = 0;

let dropFile, dropFileReader, dropData;

const imageFilePickerOpts = {
    types: [
        {
            description: $t('file.picker.image'),
            accept: {
                'image/*': []
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};




$(document).on('click', '#image-file-input-box', function(e) {
    filePicker();
});

async function filePicker() {
    try {
        let [handle] = await window.showOpenFilePicker(imageFilePickerOpts);
        let fileData = await handle.getFile();
        checkImageFile([fileData]);
    } catch (error) {
        // console.log(error);
    }
}

function checkImageFile(fileList) {
    if (fileList.length !== 1) {
        showFileCheckDialogError('many_file');
        return;
    }

    if (fileList[0].type === '') {
        showFileCheckDialogError('type_error');
        return;
    }

    dropFile = fileList[0];
    dropFileReader = new FileReader();

    dropFileReader.onload = function(e2) {
        dropData = e2.target.result;

        if (dropFile.type.substring(0,6) != 'image/') {
            showFileCheckDialogError('type_error');
            return;
        }

        showFileCheckDialog(SettingsFileChecker.dialogImageFileSelected(dropFile.name));

        if (!config.accessible.power_saving_mode && !config.accessible.high_contrast) {
            $('#image-file-check-dialog').css('background-image', `url(${dropData})`);
        }
    };

    dropFileReader.readAsDataURL(dropFile);
}

$(document).on('dragover', '#image-file-input-box', function(e) {
    e.preventDefault();
    if (!inFileDorp) {
        inFileDorp = true;
        $('#image-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_now'));
        $('#image-file-input-box').addClass('dragover');
        inFileDorpTimer = setTimeout(function() {
            inFileDorpLongTime = true;
            $('#image-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_long_time'));
        }, 3000);
    }
});

$(document).on('dragleave', '#image-file-input-box', function(e) {
    e.preventDefault();
    inFileDorp = false;
    clearTimeout(inFileDorpTimer);
    inFileDorpTimer = 0;
    $('#image-file-input-box').removeClass('dragover');
    if (inFileDorpLongTime) {
        dragleaveCount++;
        if (dragleaveCount >= 5) {
            $('#image-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_cancel_many'));
        } else {
            $('#image-file-input-box .file-drop-box-message').text($t('file.droper.drop_file_cancel'));
        }
    } else {
        $('#image-file-input-box .file-drop-box-message').text($t('file.droper.please_click'));
    }
    inFileDorpLongTime = false;
});

$(document).on('drop', '#image-file-input-box', function(e) {
    e.preventDefault()
    inFileDorp = false;
    inFileDorpLongTime = false;
    clearTimeout(inFileDorpTimer);
    $('#image-file-input-box .file-drop-box-message').text($t('file.droper.please_click'));
    $('#image-file-input-box').removeClass('dragover');

    const fileList = e.originalEvent.dataTransfer.files;

    checkImageFile(fileList);
});

function showFileCheckDialog(content) {
    $('#image-file-check-dialog').html(content);
    $('.btn-default').focus();
    $('#image-file-input-box').addClass('hide');
    $('#image-file-check-dialog').removeClass('hide');
}

function showFileCheckDialogSuccess(key) {
    showFileCheckDialog(SettingsFileChecker.dialogSuccess(
        $t('file.droper.dialog.' + key + '.title'),
        $t('file.droper.dialog.' + key + '.description')
    ));
}

function showFileCheckDialogWarn(key) {
    showFileCheckDialog(SettingsFileChecker.dialogWarn(
        $t('file.droper.dialog.' + key + '.title'),
        $t('file.droper.dialog.' + key + '.description')
    ));
}

function showFileCheckDialogError(key) {
    showFileCheckDialog(SettingsFileChecker.dialogError(
        $t('file.droper.dialog.' + key + '.title'),
        $t('file.droper.dialog.' + key + '.description')
    ));
}

function closeFileCheckDialog() {
    $('#image-file-check-dialog').addClass('hide');
    $('#image-file-input-box').removeClass('hide');
    $('#image-file-input-box').focus();
    $('#image-file-check-dialog').text('');

    dropFile = dropFileReader = dropData = undefined;

    $('#image-file-check-dialog').css('background-image', `unset`);
}




function getImageAttr() {
    let hasImageAttr = $('#image-parameter-set').val();
    let imageAttr = {};
    let maxSize = $('#image-size-max').val();
    let minSize = $('#image-size-min').val();
    let margin = $('#image-size-min').val();
    let rendering = $('#image-rendering').val();

    if (hasImageAttr == 1) {
        imageAttr = {
            margin: {
                left: margin + 'em',
                right: margin + 'em'
            },
            rendering: rendering,
            size: {
                height: {
                    max: maxSize + 'em',
                    min: minSize + 'em'
                },
                width: {
                    max: maxSize + 'em',
                    min: minSize + 'em'
                }
            }
        };
    }

    return imageAttr;
}

function outputImageCode(index) {
    insertTextAtCursor('ptext-content', `@{sys:img:${index}}`, '', false, true);

    closeFileCheckDialog();
    popupsDisplay('#popups-image', false);
}

$(document).on('click', '#btn-flie-check-dialog-cancel', function() {
    closeFileCheckDialog(true);
});

function addImageData(data, attr) {
    let r = selectedImageData.findIndex((e) => e?.url == data);
    let isAbsolute = true;
    let isPixelated = attr.rendering == 'pixelated' ? true : false;

    if (data.search(/^(http:\/\/|https:\/\/|file:\/\/\/)/) == -1) isAbsolute = false;

    if (r == -1) {
        r = selectedImageData.push({
            url: data,
            isAbsolute: isAbsolute,
            isPixelated: isPixelated,
            ...attr
        }) - 1;

        if (config.editor.function.images_cache_maximum != -1 && selectedImageData.length > config.editor.function.images_cache_maximum) {
            do {
                delete selectedImageData[++selectedImageDataBottomIndex];
                $(`#popups-image-images-list .image-box[data-value="${selectedImageDataBottomIndex}"]`).remove();
            } while (selectedImageData.length - 1 - selectedImageDataBottomIndex > config.editor.function.images_cache_maximum);
        }

        $('#popups-image-images-list').prepend(Popups.imageBox(r, data, isAbsolute, isPixelated));
    } else {
        selectedImageData[r] = {
            url: data,
            isAbsolute: isAbsolute,
            isPixelated: isPixelated,
            ...attr
        };
    }

    try {
        localStorageManager.setItem('images_cache', selectedImageData.flat());
    } catch (error) {
        
    }

    return r;
}


$(document).on('click', '#btn-flie-check-dialog-import-image', function() {
    let i = 0;
    let imageAttr = getImageAttr();
    i = addImageData(dropData, imageAttr);
    outputImageCode(i);
});

$(document).on('click', '#btn-flie-check-dialog-import-image-url', function() {
    debugger
    const imageURL = $('#image-url').val().trim();
    let i = 0;
    let imageAttr = getImageAttr();
    i = addImageData(imageURL, imageAttr);

    $('#image-url').val('')
    outputImageCode(i);
});



$(document).on('click', '#popups-image-nav .tabpage-nav-item', function() {
    let pageid = $(this).data('pageid')

    if (pageid == 'images') {
        $('.image-parameter').addClass('hide');
    } else {
        $('.image-parameter').removeClass('hide');
    }
});



$(document).on('input', '#image-url', function() {
    let value = $(this).val();
    if (value.trim() == '') {
        $('.image-url-message').text('');
        return;
    }
    if (!config.echolive.image.allow_data_url_and_relative_url && value.search(/^(http:\/\/|https:\/\/|file:\/\/\/)/) == -1) {
        $('.image-url-message').text('Data URL 和相对地址不可用');
    } else {
        $('.image-url-message').text('');
    }
});



$(document).on('click', '#popups-image-images-list:not(.in-delete) .image-box', function() {
    let value = $(this).data('value')
    outputImageCode(value);
});

$(document).on('click', '#popups-image-images-list.in-delete .image-box', function() {
    let value = $(this).data('value')
    delete selectedImageData[value];
    $(`#popups-image-images-list .image-box[data-value="${value}"]`).remove();
    try {
        localStorageManager.setItem('images_cache', selectedImageData.flat());
    } catch (error) {}
});

$(document).on('click', '#popups-image .btn-image-cache-delete', function() {
    $('#popups-image-images-list').addClass('in-delete');
    $('#popups-image .images-list-action').html(Popups.imagesListAction(1));
    $('#popups-image .btn-image-cache-delete-stop').focus();
});

$(document).on('click', '#popups-image .btn-image-cache-delete-stop', function() {
    $('#popups-image-images-list').removeClass('in-delete');
    $('#popups-image .images-list-action').html(Popups.imagesListAction(0));
    $('#popups-image .btn-image-cache-delete').focus();
});

$(document).on('click', '#popups-image .btn-image-cache-delete-all', function() {
    selectedImageData = [];
    $('#popups-image-images-list').removeClass('in-delete');
    $('#popups-image-images-list .image-box').remove();
    $('#popups-image .images-list-action').html(Popups.imagesListAction(0));
    $('#popups-image .btn-image-cache-delete').focus();
    try {
        localStorageManager.setItem('images_cache', selectedImageData.flat());
    } catch (error) {}
});