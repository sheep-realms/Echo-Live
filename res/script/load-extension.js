if (config.global.theme_script_enable) {
    extensionManager.enableAddons();
} else {
    console.warn("配置文件中未允许允许外置脚本，因此所有的 Addons 都没有被启动。")
}