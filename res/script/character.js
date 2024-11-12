let echoLiveCharacter = new EchoLiveCharacter(config);

const SEL_CHARACTER = '#echo-live-character';
const SEL_CHARACTER_LAYER = `${SEL_CHARACTER} .echo-live-character-layer`;
const SEL_CHARACTER_LAYER_MAIN = `${SEL_CHARACTER_LAYER} .layer[data-layer="main"]`;
const SEL_CHARACTER_LAYER_BEFORE = `${SEL_CHARACTER_LAYER} .layer[data-layer="before"]`;

$(document).on('animationend', `${SEL_CHARACTER_LAYER} .layer`, function() {
    $(this).css('--layer-effect-name', 'none');
    if ($(this).data('layer') !== 'main') $(this).addClass('hidden');
});

echoLiveCharacter.on('imageChange', (url, layer) => {
    $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).removeClass('hidden');
    $(`${SEL_CHARACTER_LAYER} .layer[data-layer="${layer}"]`).css('background-image', `url(${url})`);
});

echoLiveCharacter.on('layerUpdate', () => {
    $(SEL_CHARACTER_LAYER_MAIN).css('--layer-effect-name', 'fade-in');
    $(SEL_CHARACTER_LAYER_BEFORE).css('--layer-effect-name', 'fade-out');
});