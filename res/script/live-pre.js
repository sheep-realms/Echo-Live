"use strict";

let extensionManager = new ExtensionManager();
try {
    extensionManager.mixer = mixer;
} catch (error) {
    
}
extensionManager.launch(extensions);
extensionManager.importDefaultTheme(echoLiveSystem.registry.getRegistryArray('live_theme'));

try {
    if (config.echolive.speech_synthesis.enable) speechSynthesis.getVoices();
} catch (error) {}