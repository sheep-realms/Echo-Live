echoLiveSystem.registry.loadRegistry('slot_settings_wrapper_after', 'name', [
    {
        name: 'echolive.layout.controller',
        value: (id, data) => {
            const _getContent = name => PortalPreview.controller(
                echoLiveSystem.registry.getRegistryValue('live_controller', name)
            );
            data.onInputChange(value => {
                const controller = echoLiveSystem.registry.getRegistryValue('live_controller', value);
                if (controller === undefined) return;
                $('#settings-preview-wrapper-live-controller').html(_getContent(value));
            })

            return `<div id="settings-preview-wrapper-live-controller" class="settings-preview-wrapper" aria-hidden="true">
                ${ _getContent(data.value) }
            </div>`
        }
    }, {
        name: 'accessibility.font_size',
        value: (id, data) => {
            return `<div class="review-font-size-card" aria-hidden="true" style="--font-size-base-review: ${data.config.accessibility.font_size}px; font-size: var(--font-size-base);">
                <div class="example-1">${ $t('config.accessibility.font_size.example_1') }</div>
                <div class="example-2">${ $t('config.accessibility.font_size.example_2') }</div>
            </div>`;
        }
    }, {
        name: 'accessibility.protanopia_and_deuteranopia',
        value: () => {
            return `<div class="review-color-card" aria-label="${ $t('settings.label.accessibility_color_card') }">
                <div class="general"><div class="fg">${ $t('settings.functional_color.general') }</div><div class="bg"></div></div>
                <div class="safe"><div class="fg">${ $t('settings.functional_color.safe') }</div><div class="bg"></div></div>
                <div class="warn"><div class="fg">${ $t('settings.functional_color.warn') }</div><div class="bg"></div></div>
                <div class="danger"><div class="fg">${ $t('settings.functional_color.danger') }</div><div class="bg"></div></div>
            </div>`;
        }
    }
]);