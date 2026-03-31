echoLiveSystem.registry.loadRegistry('slot_settings_wrapper_before', 'name', [
    {
        name: 'editor.form.username',
        value: () => {
            return SettingsPanel.msgBoxWarn(
                '',
                $t('settings.msgbox.old_version_abandoned_config')
            ) + '<div style="height: var(--gap-middle);"></div>';
        }
    }
]);