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


$(document).on('click', '#btn-flie-check-dialog-import-image', function() {
    let i = 0;
    let imageAttr = getImageAttr();
    i = selectedImageData.findIndex((e) => e.url == dropData);
    if (i == -1) {
        i = selectedImageData.push({
            url: dropData,
            ...imageAttr
        }) - 1;
    } else {
        selectedImageData[i] = {
            url: dropData,
            ...imageAttr
        };
    }

    outputImageCode(i);
});

$(document).on('click', '#btn-flie-check-dialog-import-image-url', function() {
    const imageURL = $('#image-url').val().trim();
    let i = 0;
    let imageAttr = getImageAttr();
    i = selectedImageData.findIndex((e) => e.url == imageURL);
    if (i == -1) {
        i = selectedImageData.push({
            url: imageURL,
            ...imageAttr
        }) - 1;
    } else {
        selectedImageData[i] = {
            url: imageURL,
            ...imageAttr
        };
    }

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