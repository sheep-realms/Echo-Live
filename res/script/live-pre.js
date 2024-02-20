let extensionManager = new ExtensionManager();
try {
    extensionManager.mixer = mixer;
} catch (error) {
    
}
extensionManager.launch(extensions);