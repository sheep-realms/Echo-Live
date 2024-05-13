let extensionManager = new ExtensionManager();
try {
    extensionManager.mixer = mixer;
} catch (error) {
    
}
extensionManager.launch(extensions);

try {
    if (config.echolive.speech_synthesis.enable) speechSynthesis.getVoices();
} catch (error) {}