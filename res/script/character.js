/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

let echoLiveCharacter = new EchoLiveCharacter(config);

const SEL_CHARACTER = '#echo-live-character';
const SEL_CHARACTER_LAYER = `${SEL_CHARACTER} .echo-live-character-layer`;
const SEL_CHARACTER_LAYER_MAIN = `${SEL_CHARACTER_LAYER} .layer[data-layer="main"]`;
const SEL_CHARACTER_LAYER_BEFORE = `${SEL_CHARACTER_LAYER} .layer[data-layer="before"]`;

$(document).on('animationend', `${SEL_CHARACTER_LAYER} .layer`, function() {
    $(this).css('--layer-effect-name', 'none');
    if ($(this).data('layer') !== 'main') $(this).addClass('hidden');
});

const changeImage = (image, layer) => {
    $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).removeClass('hidden');
    $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).css('background-image', `url(${image.url})`);
    if (image.position !== undefined) $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).css('background-position', image.position);
    if (image.size !== undefined) $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).css('background-size', image.size);
    if (image.repeat !== undefined) $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).css('background-repeat', image.repeat);
};

const updateLayer = (effect = {}) => {
    if (effect?.name === undefined) {
        effect.name = config.character.avatar_switch_effect.name || 'none';
    }
    
    if (effect.name === 'none' || effect.name === 'unset') {
        $(SEL_CHARACTER_LAYER_MAIN).css('--layer-effect-name', effect.name);
        $(SEL_CHARACTER_LAYER_BEFORE).css('--layer-effect-name', effect.name);
    } else {
        $(SEL_CHARACTER_LAYER_MAIN).css('--layer-effect-name', `${effect.name}-main`);
        $(SEL_CHARACTER_LAYER_BEFORE).css('--layer-effect-name', `${effect.name}-before`);
    }
};

const clearImage = () => {
    $(SEL_CHARACTER_LAYER_MAIN).removeClass('hidden');
    $(SEL_CHARACTER_LAYER_MAIN).css('background-image', 'unset');
    updateLayer();
};


echoLiveCharacter.on('imageChange', changeImage);
echoLiveCharacter.on('layerUpdate', updateLayer);
echoLiveCharacter.on('imageClear', clearImage);