echoLiveSystem.registry.loadRegistry('statistic', 'name', [
    {
        name: 'editor.overview.session_created_count'
    }, {
        name: 'editor.overview.last_session_created',
        type: 'timestamp'
    }, {
        name: 'editor.overview.session_duration_total_second',
        unit: 'long_sec'
    }, {
        name: 'editor.overview.session_duration_max_second',
        unit: 'long_sec'
    }, {
        name: 'editor.overview.session_duration_average_second',
        unit: 'long_sec',
        source: 'method'
    }, {
        name: 'editor.message.last_sent',
        type: 'timestamp'
    }, {
        name: 'editor.message.sent_count'
    }, {
        name: 'editor.message.resent_count'
    }, {
        name: 'editor.message.not_resent_count',
        source: 'method'
    }, {
        name: 'editor.message.used_formatting_code_count'
    }, {
        name: 'editor.message.custom_code_sent_count'
    }, {
        name: 'editor.message.sent_character_total'
    }, {
        name: 'editor.message.sent_character_average',
        source: 'method'
    }, {
        name: 'editor.message.sent_max_length'
    }, {
        name: 'editor.message.session.sent_max_count'
    }, {
        name: 'editor.message.session.resent_max_count'
    }, {
        name: 'editor.message.session.sent_character_max_total'
    }
]);