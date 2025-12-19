echoLiveSystem.registry.loadRegistry('message_filter', 'name', [
    {
        name: 'echolive:duplicate_chinese_mood_symbol_slice',
        value: (text) => {
            if (!config.echolive.filter.duplicate_chinese_mood_symbol_slice_enable) return text;
            if (typeof text !== 'string') return text;
            return text.replace(/([，。！？]|——)(?=\1)/g, '$1\u200B');
        }
    }
]);