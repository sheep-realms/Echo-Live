let extensionManager = new ExtensionManager();

try {
    if (config.echolive.speech_synthesis.enable) speechSynthesis.getVoices();
} catch (error) {}

if (config.global.theme_script_enable) {
    extensionManager.enableAddons();
}
