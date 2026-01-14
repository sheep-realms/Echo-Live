echoLiveSystem.registry.loadRegistry('editor_controller_method', 'name', [
    {
        name: 'echolive:format_clear_text_filter',
        value: text => text.replace(/(?<!\\)@(\[#[0-9a-fA-F]{3,8}\]|\{.*?\}|\S)/g, '')
    }
]);