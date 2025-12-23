echoLiveSystem.registry.loadRegistry('statistic_method', 'name', [
    {
        name: 'editor.overview.session_duration_average_second',
        value: (s) => {
            const [ count, total ] = s.getValues([
                'editor.overview.session_created_count',
                'editor.overview.session_duration_total_second'
            ]);
            return total / count;
        }
    }, {
        name: 'editor.overview.session_created_statistic_daily_rate',
        value: (s) => {
            const [ total, count ] = s.getValues([
                'overview.statistic_days',
                'editor.overview.session_created_days'
            ]);
            return Math.max(Math.min(count / total, 1), 0);
        }
    }, {
        name: 'editor.overview.session_created_daily_average',
        value: (s) => {
            const [ count, total ] = s.getValues([
                'editor.overview.session_created_days',
                'editor.overview.session_created_count'
            ]);
            return total / count;
        }
    }, {
        name: 'editor.message.not_resent_count',
        value: (s) => {
            const [ total, count ] = s.getValues([
                'editor.message.sent_count',
                'editor.message.resent_count'
            ]);
            return Math.max(total - count, 0);
        }
    }, {
        name: 'editor.message.sent_character_average',
        value: (s) => {
            const [ count, total ] = s.getValues([
                'editor.message.sent_count',
                'editor.message.sent_character_total'
            ]);
            return total / count;
        }
    }, {
        name: 'editor.message.sent_character_daily_average',
        value: (s) => {
            const [ count, total ] = s.getValues([
                'editor.overview.session_created_days',
                'editor.message.sent_character_total'
            ]);
            return total / count;
        }
    }
]);