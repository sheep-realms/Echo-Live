echoLiveSystem.registry.loadRegistry('palette', e => e.meta.name, [
    {
        meta: {
            name: 'material',
            title: {
                name: 'Material Design',
                translate: 'material.title'
            }
        },
        colors: [
            { value: '#000000', title: { name: 'Black', translate: 'common.color.black' } },
            { value: '#000000de', title: { name: 'Black - Default', translate: 'common.color.black' }, after: 'default' },
            { value: '#0000008a', title: { name: 'Black - Light', translate: 'common.color.black' }, after: 'light' },
            { value: '#00000052', title: { name: 'Black - Lighter', translate: 'common.color.black' }, after: 'lighter' },
            { value: '#00000012', title: { name: 'Black - Lightest', translate: 'common.color.black' }, after: 'lightest' },
            { value: '#ffffff', title: { name: 'White', translate: 'common.color.white' } },
            { value: '#ffffffde', title: { name: 'White - Default', translate: 'common.color.white' }, after: 'default' },
            { value: '#ffffff8a', title: { name: 'White - Light', translate: 'common.color.white' }, after: 'light' },
            { value: '#ffffff52', title: { name: 'White - Lighter', translate: 'common.color.white' }, after: 'lighter' },
            { value: '#ffffff12', title: { name: 'White - Lightest', translate: 'common.color.white' }, after: 'lightest' },
            { value: '#e2e4e9', title: { name: 'Gray', translate: 'common.color.gray' } },
            { value: '#e2e4e9d1', title: { name: 'Gray - Default', translate: 'common.color.gray' }, after: 'default' },
            { value: '#e2e4e98f', title: { name: 'Gray - Light', translate: 'common.color.gray' }, after: 'light' },
            { value: '#e2e4e952', title: { name: 'Gray - Lighter', translate: 'common.color.gray' }, after: 'lighter' },
            { value: '#e2e4e91f', title: { name: 'Gray - Lightest', translate: 'common.color.gray' }, after: 'lightest' },

            { type: 'group', value: { name: 'Dark', translate: 'common.after.deep' } },
            { value: '#e53734', title: { name: 'Red - Dark', translate: 'common.color.red' }, after: 'deep' },
            { value: '#c3185d', title: { name: 'Pink - Dark', translate: 'common.color.pink' }, after: 'deep' },
            { value: '#8c24a8', title: { name: 'Purple - Dark', translate: 'common.color.purple' }, after: 'deep' },
            { value: '#673ab6', title: { name: 'Deep Purple - Dark', translate: 'common.color.deep_purple' }, after: 'deep' },
            { value: '#303fa1', title: { name: 'Indigo - Dark', translate: 'common.color.indigo' }, after: 'deep' },
            { value: '#1975d2', title: { name: 'Blue - Dark', translate: 'common.color.blue' }, after: 'deep' },
            { value: '#0287cf', title: { name: 'Light Blue - Dark', translate: 'common.color.light_blue' }, after: 'deep' },
            { value: '#0097a8', title: { name: 'Cyan - Dark', translate: 'common.color.cyan' }, after: 'deep' },
            { value: '#007a6c', title: { name: 'Teal - Dark', translate: 'common.color.teal' }, after: 'deep' },
            { value: '#398e3d', title: { name: 'Green - Dark', translate: 'common.color.green' }, after: 'deep' },
            { value: '#689f38', title: { name: 'Light Green - Dark', translate: 'common.color.light_green' }, after: 'deep' },
            { value: '#b0b52c', title: { name: 'Lime - Dark', translate: 'common.color.lime' }, after: 'deep' },
            { value: '#fbc02d', title: { name: 'Yellow - Dark', translate: 'common.color.yellow' }, after: 'deep' },
            { value: '#ffa200', title: { name: 'Amber - Dark', translate: 'common.color.amber' }, after: 'deep' },
            { value: '#fa8900', title: { name: 'Orange - Dark', translate: 'common.color.orange' }, after: 'deep' },
            { value: '#f4511f', title: { name: 'Deep Orange - Dark', translate: 'common.color.deep_orange' }, after: 'deep' },
            { value: '#5d4037', title: { name: 'Brown - Dark', translate: 'common.color.brown' }, after: 'deep' },
            { value: '#616161', title: { name: 'Grey - Dark', translate: 'common.color.gray' }, after: 'deep' },
            { value: '#455a63', title: { name: 'Blue Grey - Dark', translate: 'common.color.blue_gray' }, after: 'deep' },

            { type: 'group', value: { name: 'Default', translate: 'common.after.middle' } },
            { value: '#ef5552', title: { name: 'Red', translate: 'common.color.red' } },
            { value: '#e92063', title: { name: 'Pink', translate: 'common.color.pink' } },
            { value: '#ab47bd', title: { name: 'Purple', translate: 'common.color.purple' } },
            { value: '#7e56c2', title: { name: 'Deep Purple', translate: 'common.color.deep_purple' } },
            { value: '#4051b5', title: { name: 'Indigo', translate: 'common.color.indigo' } },
            { value: '#2094f3', title: { name: 'Blue', translate: 'common.color.blue' } },
            { value: '#02a6f2', title: { name: 'Light Blue', translate: 'common.color.light_blue' } },
            { value: '#00bdd6', title: { name: 'Cyan', translate: 'common.color.cyan' } },
            { value: '#009485', title: { name: 'Teal', translate: 'common.color.teal' } },
            { value: '#4cae4f', title: { name: 'Green', translate: 'common.color.green' } },
            { value: '#8bc34b', title: { name: 'Light Green', translate: 'common.color.light_green' } },
            { value: '#cbdc38', title: { name: 'Lime', translate: 'common.color.lime' } },
            { value: '#ffec3d', title: { name: 'Yellow', translate: 'common.color.yellow' } },
            { value: '#ffc105', title: { name: 'Amber', translate: 'common.color.amber' } },
            { value: '#ffa724', title: { name: 'Orange', translate: 'common.color.orange' } },
            { value: '#ff6e42', title: { name: 'Deep Orange', translate: 'common.color.deep_orange' } },
            { value: '#795649', title: { name: 'Brown', translate: 'common.color.brown' } },
            { value: '#757575', title: { name: 'Grey', translate: 'common.color.gray' } },
            { value: '#546d78', title: { name: 'Blue Grey', translate: 'common.color.blue_gray' } },

            { type: 'group', value: { name: 'Light', translate: 'common.after.light' } },
            { value: '#e57171', title: { name: 'Red - Light', translate: 'common.color.red' }, after: 'light' },
            { value: '#ec417a', title: { name: 'Pink - Light', translate: 'common.color.pink' }, after: 'light' },
            { value: '#bb69c9', title: { name: 'Purple - Light', translate: 'common.color.purple' }, after: 'light' },
            { value: '#9574cd', title: { name: 'Deep Purple - Light', translate: 'common.color.deep_purple' }, after: 'light' },
            { value: '#5d6cc0', title: { name: 'Indigo - Light', translate: 'common.color.indigo' }, after: 'light' },
            { value: '#42a5f5', title: { name: 'Blue - Light', translate: 'common.color.blue' }, after: 'light' },
            { value: '#28b5f6', title: { name: 'Light Blue - Light', translate: 'common.color.light_blue' }, after: 'light' },
            { value: '#25c5da', title: { name: 'Cyan - Light', translate: 'common.color.cyan' }, after: 'light' },
            { value: '#26a699', title: { name: 'Teal - Light', translate: 'common.color.teal' }, after: 'light' },
            { value: '#68bb6c', title: { name: 'Green - Light', translate: 'common.color.green' }, after: 'light' },
            { value: '#9ccc66', title: { name: 'Light Green - Light', translate: 'common.color.light_green' }, after: 'light' },
            { value: '#d3e156', title: { name: 'Lime - Light', translate: 'common.color.lime' }, after: 'light' },
            { value: '#ffee57', title: { name: 'Yellow - Light', translate: 'common.color.yellow' }, after: 'light' },
            { value: '#ffc929', title: { name: 'Amber - Light', translate: 'common.color.amber' }, after: 'light' },
            { value: '#ffad33', title: { name: 'Orange - Light', translate: 'common.color.orange' }, after: 'light' },
            { value: '#ff8a66', title: { name: 'Deep Orange - Light', translate: 'common.color.deep_orange' }, after: 'light' },
            { value: '#8d6e62', title: { name: 'Brown - Light', translate: 'common.color.brown' }, after: 'light' },
            { value: '#9e9e9e', title: { name: 'Grey - Light', translate: 'common.color.gray' }, after: 'light' },
            { value: '#607c8a', title: { name: 'Blue Grey - Light', translate: 'common.color.blue_gray' }, after: 'light' }
        ]
    }, {
        meta: {
            name: 'tailwindcss',
            title: {
                name: 'Tailwind CSS',
                translate: 'tailwindcss.title'
            }
        },
        colors: [
            { value: '#000000', title: { name: 'Black', translate: 'common.color.black' } },
            { value: '#ffffff', title: { name: 'White', translate: 'common.color.white' } },
            { value: '#64748b', title: { name: 'Slate', translate: 'tailwindcss.color.slate' } },
            { value: '#6b7280', title: { name: 'Gray', translate: 'common.color.gray' } },
            { value: '#71717a', title: { name: 'Zinc', translate: 'tailwindcss.color.zinc' } },
            { value: '#737373', title: { name: 'Neutral', translate: 'tailwindcss.color.neutral' } },
            { value: '#787170', title: { name: 'Stone', translate: 'tailwindcss.color.stone' } },

            { type: 'group', value: { name: 'Weight 500', translate: 'tailwindcss.group.weight', with: { value: 500 } } },
            { value: '#ef4444', title: { name: 'Red 500', translate: 'common.color.red', with: { value: 500 } } },
            { value: '#f97316', title: { name: 'Orange 500', translate: 'common.color.orange', with: { value: 500 } } },
            { value: '#f59e0b', title: { name: 'Amber 500', translate: 'common.color.amber', with: { value: 500 } } },
            { value: '#eab308', title: { name: 'Yellow 500', translate: 'common.color.yellow', with: { value: 500 } } },
            { value: '#84cc16', title: { name: 'Lime 500', translate: 'common.color.lime', with: { value: 500 } } },
            { value: '#22c55e', title: { name: 'Green 500', translate: 'common.color.green', with: { value: 500 } } },
            { value: '#10b981', title: { name: 'Emerald 500', translate: 'tailwindcss.color.emerald', with: { value: 500 } } },
            { value: '#14b8a6', title: { name: 'Teal 500', translate: 'common.color.teal', with: { value: 500 } } },
            { value: '#06b6d4', title: { name: 'Cyan 500', translate: 'common.color.cyan', with: { value: 500 } } },
            { value: '#0ea5e9', title: { name: 'Sky 500', translate: 'common.color.sky', with: { value: 500 } } },
            { value: '#3b82f6', title: { name: 'Blue 500', translate: 'common.color.blue', with: { value: 500 } } },
            { value: '#6366f1', title: { name: 'Indigo 500', translate: 'common.color.indigo', with: { value: 500 } } },
            { value: '#8b5cf6', title: { name: 'Violet 500', translate: 'common.color.violet', with: { value: 500 } } },
            { value: '#a855f7', title: { name: 'Purple 500', translate: 'common.color.purple', with: { value: 500 } } },
            { value: '#d945ef', title: { name: 'Fuchsia 500', translate: 'common.color.magenta', with: { value: 500 } } },
            { value: '#ec4899', title: { name: 'Pink 500', translate: 'common.color.pink', with: { value: 500 } } },
            { value: '#f43f5e', title: { name: 'Rose 500', translate: 'tailwindcss.color.rose', with: { value: 500 } } },

            { type: 'group', value: { name: 'Weight 700', translate: 'tailwindcss.group.weight', with: { value: 700 } } },
            { value: '#b91c1c', title: { name: 'Red 700', translate: 'common.color.red', with: { value: 700 } } },
            { value: '#c2410c', title: { name: 'Orange 700', translate: 'common.color.orange', with: { value: 700 } } },
            { value: '#b45309', title: { name: 'Amber 700', translate: 'common.color.amber', with: { value: 700 } } },
            { value: '#a16007', title: { name: 'Yellow 700', translate: 'common.color.yellow', with: { value: 700 } } },
            { value: '#4d7c0f', title: { name: 'Lime 700', translate: 'common.color.lime', with: { value: 700 } } },
            { value: '#15803d', title: { name: 'Green 700', translate: 'common.color.green', with: { value: 700 } } },
            { value: '#047857', title: { name: 'Emerald 700', translate: 'tailwindcss.color.emerald', with: { value: 700 } } },
            { value: '#0f766e', title: { name: 'Teal 700', translate: 'common.color.teal', with: { value: 700 } } },
            { value: '#0e7490', title: { name: 'Cyan 700', translate: 'common.color.cyan', with: { value: 700 } } },
            { value: '#03719f', title: { name: 'Sky 700', translate: 'common.color.sky', with: { value: 700 } } },
            { value: '#1d4ed8', title: { name: 'Blue 700', translate: 'common.color.blue', with: { value: 700 } } },
            { value: '#4338ca', title: { name: 'Indigo 700', translate: 'common.color.indigo', with: { value: 700 } } },
            { value: '#6d28d9', title: { name: 'Violet 700', translate: 'common.color.violet', with: { value: 700 } } },
            { value: '#7e22ce', title: { name: 'Purple 700', translate: 'common.color.purple', with: { value: 700 } } },
            { value: '#a21caf', title: { name: 'Fuchsia 700', translate: 'common.color.magenta', with: { value: 700 } } },
            { value: '#be185d', title: { name: 'Pink 700', translate: 'common.color.pink', with: { value: 700 } } },
            { value: '#be123c', title: { name: 'Rose 700', translate: 'tailwindcss.color.rose', with: { value: 700 } } },

            { type: 'group', value: { name: 'Weight 300', translate: 'tailwindcss.group.weight', with: { value: 300 } } },
            { value: '#fca5a5', title: { name: 'Red 300', translate: 'common.color.red', with: { value: 300 } } },
            { value: '#fdba74', title: { name: 'Orange 300', translate: 'common.color.orange', with: { value: 300 } } },
            { value: '#fcd34d', title: { name: 'Amber 300', translate: 'common.color.amber', with: { value: 300 } } },
            { value: '#fde047', title: { name: 'Yellow 300', translate: 'common.color.yellow', with: { value: 300 } } },
            { value: '#bee664', title: { name: 'Lime 300', translate: 'common.color.lime', with: { value: 300 } } },
            { value: '#86efac', title: { name: 'Green 300', translate: 'common.color.green', with: { value: 300 } } },
            { value: '#6ee7b7', title: { name: 'Emerald 300', translate: 'tailwindcss.color.emerald', with: { value: 300 } } },
            { value: '#5eeaD4', title: { name: 'Teal 300', translate: 'common.color.teal', with: { value: 300 } } },
            { value: '#67e8f9', title: { name: 'Cyan 300', translate: 'common.color.cyan', with: { value: 300 } } },
            { value: '#7dd3fc', title: { name: 'Sky 300', translate: 'common.color.sky', with: { value: 300 } } },
            { value: '#93c5fd', title: { name: 'Blue 300', translate: 'common.color.blue', with: { value: 300 } } },
            { value: '#a5b4fc', title: { name: 'Indigo 300', translate: 'common.color.indigo', with: { value: 300 } } },
            { value: '#c4b5fd', title: { name: 'Violet 300', translate: 'common.color.violet', with: { value: 300 } } },
            { value: '#d8b4fe', title: { name: 'Purple 300', translate: 'common.color.purple', with: { value: 300 } } },
            { value: '#f0abfc', title: { name: 'Fuchsia 300', translate: 'common.color.magenta', with: { value: 300 } } },
            { value: '#f9a8d4', title: { name: 'Pink 300', translate: 'common.color.pink', with: { value: 300 } } },
            { value: '#fda4af', title: { name: 'Rose 300', translate: 'tailwindcss.color.rose', with: { value: 300 } } }
        ]
    }, {
        meta: {
            name: 'ant_design',
            title: {
                name: 'Ant Design',
                translate: 'ant_design.title'
            }
        },
        colors: [
            { type: 'group', value: { name: '功能色', translate: 'common.group.functional_color' } },
            { value: '#1890ff', title: { name: 'Link', translate: 'common.functional_color.link' } },
            { value: '#25c41a', title: { name: 'Success', translate: 'common.functional_color.success' } },
            { value: '#ffad14', title: { name: 'Warning', translate: 'common.functional_color.warning' } },
            { value: '#ff4d4f', title: { name: 'Error', translate: 'common.functional_color.error' } },
            { value: '#177ddc', title: { name: 'Link - Dark', translate: 'common.functional_color.link' }, after: 'deep' },
            { value: '#49aa19', title: { name: 'Success - Dark', translate: 'common.functional_color.success' }, after: 'deep' },
            { value: '#d89614', title: { name: 'Warning - Dark', translate: 'common.functional_color.warning' }, after: 'deep' },
            { value: '#a61d24', title: { name: 'Error - Dark', translate: 'common.functional_color.error' }, after: 'deep' },

            { type: 'group', value: { name: '中性色', translate: 'common.group.neutral_color' } },
            { value: '#ffffff', title: { name: 'Gray 1', translate: 'common.color.white', with: { value: 1 } } },
            { value: '#fafafa', title: { name: 'Gray 2', translate: 'common.color.white', with: { value: 2 } } },
            { value: '#f5f5f5', title: { name: 'Gray 3', translate: 'common.color.light_gray', with: { value: 3 } } },
            { value: '#f0f0f0', title: { name: 'Gray 4', translate: 'common.color.light_gray', with: { value: 4 } } },
            { value: '#d9d9d9', title: { name: 'Gray 5', translate: 'common.color.gray', with: { value: 5 } } },
            { value: '#bfbfbf', title: { name: 'Gray 6', translate: 'common.color.gray', with: { value: 6 } } },
            { value: '#8c8c8c', title: { name: 'Gray 7', translate: 'common.color.gray', with: { value: 7 } } },
            { value: '#595959', title: { name: 'Gray 8', translate: 'common.color.deep_gray', with: { value: 8 } } },
            { value: '#434343', title: { name: 'Gray 9', translate: 'common.color.deep_gray', with: { value: 9 } } },
            { value: '#262626', title: { name: 'Gray 10', translate: 'common.color.black', with: { value: 10 } } },
            { value: '#1f1f1f', title: { name: 'Gray 11', translate: 'common.color.black', with: { value: 11 } } },
            { value: '#141414', title: { name: 'Gray 12', translate: 'common.color.black', with: { value: 12 } } },
            { value: '#000000', title: { name: 'Gray 13', translate: 'common.color.black', with: { value: 13 } } },

            { type: 'group', value: { name: 'Dust Red / 薄暮', translate: 'ant_design.group.red' } },
            { value: '#fff1f0', title: { name: 'Red 1', translate: 'ant_design.color.red', with: { value: 1 } } },
            { value: '#ffccc7', title: { name: 'Red 2', translate: 'ant_design.color.red', with: { value: 2 } } },
            { value: '#ffa39e', title: { name: 'Red 3', translate: 'ant_design.color.red', with: { value: 3 } } },
            { value: '#ff7875', title: { name: 'Red 4', translate: 'ant_design.color.red', with: { value: 4 } } },
            { value: '#ff4d4f', title: { name: 'Red 5', translate: 'ant_design.color.red', with: { value: 5 } } },
            { value: '#f5222d', title: { name: 'Red 6', translate: 'ant_design.color.red', with: { value: 6 } } },
            { value: '#cf1322', title: { name: 'Red 7', translate: 'ant_design.color.red', with: { value: 7 } } },
            { value: '#a8071a', title: { name: 'Red 8', translate: 'ant_design.color.red', with: { value: 8 } } },
            { value: '#820014', title: { name: 'Red 9', translate: 'ant_design.color.red', with: { value: 9 } } },
            { value: '#5c0011', title: { name: 'Red 10', translate: 'ant_design.color.red', with: { value: 10 } } },

            { type: 'group', value: { name: 'Volcano / 火山', translate: 'ant_design.group.volcano' } },
            { value: '#fff2e8', title: { name: 'Volcano 1', translate: 'ant_design.color.volcano', with: { value: 1 } } },
            { value: '#ffd8bf', title: { name: 'Volcano 2', translate: 'ant_design.color.volcano', with: { value: 2 } } },
            { value: '#ffbb96', title: { name: 'Volcano 3', translate: 'ant_design.color.volcano', with: { value: 3 } } },
            { value: '#ff9c6e', title: { name: 'Volcano 4', translate: 'ant_design.color.volcano', with: { value: 4 } } },
            { value: '#ff7a45', title: { name: 'Volcano 5', translate: 'ant_design.color.volcano', with: { value: 5 } } },
            { value: '#fa541c', title: { name: 'Volcano 6', translate: 'ant_design.color.volcano', with: { value: 6 } } },
            { value: '#d4380d', title: { name: 'Volcano 7', translate: 'ant_design.color.volcano', with: { value: 7 } } },
            { value: '#ad2102', title: { name: 'Volcano 8', translate: 'ant_design.color.volcano', with: { value: 8 } } },
            { value: '#871400', title: { name: 'Volcano 9', translate: 'ant_design.color.volcano', with: { value: 9 } } },
            { value: '#610b00', title: { name: 'Volcano 10', translate: 'ant_design.color.volcano', with: { value: 10 } } },

            { type: 'group', value: { name: 'Sunset Orange / 日暮', translate: 'ant_design.group.orange' } },
            { value: '#fff7e6', title: { name: 'Orange 1', translate: 'ant_design.color.orange', with: { value: 1 } } },
            { value: '#ffe7ba', title: { name: 'Orange 2', translate: 'ant_design.color.orange', with: { value: 2 } } },
            { value: '#ffd591', title: { name: 'Orange 3', translate: 'ant_design.color.orange', with: { value: 3 } } },
            { value: '#ffc069', title: { name: 'Orange 4', translate: 'ant_design.color.orange', with: { value: 4 } } },
            { value: '#ffa940', title: { name: 'Orange 5', translate: 'ant_design.color.orange', with: { value: 5 } } },
            { value: '#fa8c16', title: { name: 'Orange 6', translate: 'ant_design.color.orange', with: { value: 6 } } },
            { value: '#d46b08', title: { name: 'Orange 7', translate: 'ant_design.color.orange', with: { value: 7 } } },
            { value: '#ad4e00', title: { name: 'Orange 8', translate: 'ant_design.color.orange', with: { value: 8 } } },
            { value: '#873800', title: { name: 'Orange 9', translate: 'ant_design.color.orange', with: { value: 9 } } },
            { value: '#612500', title: { name: 'Orange 10', translate: 'ant_design.color.orange', with: { value: 10 } } },

            { type: 'group', value: { name: 'Calendula Gold / 金盏花', translate: 'ant_design.group.gold' } },
            { value: '#fffbe6', title: { name: 'Gold 1', translate: 'ant_design.color.gold', with: { value: 1 } } },
            { value: '#fff1b8', title: { name: 'Gold 2', translate: 'ant_design.color.gold', with: { value: 2 } } },
            { value: '#ffe58f', title: { name: 'Gold 3', translate: 'ant_design.color.gold', with: { value: 3 } } },
            { value: '#ffd666', title: { name: 'Gold 4', translate: 'ant_design.color.gold', with: { value: 4 } } },
            { value: '#ffc53d', title: { name: 'Gold 5', translate: 'ant_design.color.gold', with: { value: 5 } } },
            { value: '#faad14', title: { name: 'Gold 6', translate: 'ant_design.color.gold', with: { value: 6 } } },
            { value: '#d48806', title: { name: 'Gold 7', translate: 'ant_design.color.gold', with: { value: 7 } } },
            { value: '#ad6800', title: { name: 'Gold 8', translate: 'ant_design.color.gold', with: { value: 8 } } },
            { value: '#874d00', title: { name: 'Gold 9', translate: 'ant_design.color.gold', with: { value: 9 } } },
            { value: '#613400', title: { name: 'Gold 10', translate: 'ant_design.color.gold', with: { value: 10 } } },

            { type: 'group', value: { name: 'Sunrise Yellow / 日出', translate: 'ant_design.group.yellow' } },
            { value: '#feffe6', title: { name: 'Yellow 1', translate: 'ant_design.color.yellow', with: { value: 1 } } },
            { value: '#ffffb8', title: { name: 'Yellow 2', translate: 'ant_design.color.yellow', with: { value: 2 } } },
            { value: '#fffb8f', title: { name: 'Yellow 3', translate: 'ant_design.color.yellow', with: { value: 3 } } },
            { value: '#fff566', title: { name: 'Yellow 4', translate: 'ant_design.color.yellow', with: { value: 4 } } },
            { value: '#ffec3d', title: { name: 'Yellow 5', translate: 'ant_design.color.yellow', with: { value: 5 } } },
            { value: '#fadb14', title: { name: 'Yellow 6', translate: 'ant_design.color.yellow', with: { value: 6 } } },
            { value: '#d4b106', title: { name: 'Yellow 7', translate: 'ant_design.color.yellow', with: { value: 7 } } },
            { value: '#ad8b00', title: { name: 'Yellow 8', translate: 'ant_design.color.yellow', with: { value: 8 } } },
            { value: '#876800', title: { name: 'Yellow 9', translate: 'ant_design.color.yellow', with: { value: 9 } } },
            { value: '#614700', title: { name: 'Yellow 10', translate: 'ant_design.color.yellow', with: { value: 10 } } },

            { type: 'group', value: { name: 'Lime / 青柠', translate: 'ant_design.group.lime' } },
            { value: '#fcffe6', title: { name: 'Lime 1', translate: 'ant_design.color.lime', with: { value: 1 } } },
            { value: '#f4ffb8', title: { name: 'Lime 2', translate: 'ant_design.color.lime', with: { value: 2 } } },
            { value: '#eaff8f', title: { name: 'Lime 3', translate: 'ant_design.color.lime', with: { value: 3 } } },
            { value: '#d3f261', title: { name: 'Lime 4', translate: 'ant_design.color.lime', with: { value: 4 } } },
            { value: '#bae637', title: { name: 'Lime 5', translate: 'ant_design.color.lime', with: { value: 5 } } },
            { value: '#a0d911', title: { name: 'Lime 6', translate: 'ant_design.color.lime', with: { value: 6 } } },
            { value: '#7cb305', title: { name: 'Lime 7', translate: 'ant_design.color.lime', with: { value: 7 } } },
            { value: '#5b8c00', title: { name: 'Lime 8', translate: 'ant_design.color.lime', with: { value: 8 } } },
            { value: '#3f6600', title: { name: 'Lime 9', translate: 'ant_design.color.lime', with: { value: 9 } } },
            { value: '#254000', title: { name: 'Lime 10', translate: 'ant_design.color.lime', with: { value: 10 } } },

            { type: 'group', value: { name: 'Polar Green / 极光绿', translate: 'ant_design.group.green' } },
            { value: '#f6ffed', title: { name: 'Green 1', translate: 'ant_design.color.green', with: { value: 1 } } },
            { value: '#d9f7be', title: { name: 'Green 2', translate: 'ant_design.color.green', with: { value: 2 } } },
            { value: '#b7eb8f', title: { name: 'Green 3', translate: 'ant_design.color.green', with: { value: 3 } } },
            { value: '#95de64', title: { name: 'Green 4', translate: 'ant_design.color.green', with: { value: 4 } } },
            { value: '#73d13d', title: { name: 'Green 5', translate: 'ant_design.color.green', with: { value: 5 } } },
            { value: '#52c41a', title: { name: 'Green 6', translate: 'ant_design.color.green', with: { value: 6 } } },
            { value: '#389e0d', title: { name: 'Green 7', translate: 'ant_design.color.green', with: { value: 7 } } },
            { value: '#237804', title: { name: 'Green 8', translate: 'ant_design.color.green', with: { value: 8 } } },
            { value: '#135200', title: { name: 'Green 9', translate: 'ant_design.color.green', with: { value: 9 } } },
            { value: '#092b00', title: { name: 'Green 10', translate: 'ant_design.color.green', with: { value: 10 } } },

            { type: 'group', value: { name: 'Cyan / 明青', translate: 'ant_design.group.cyan' } },
            { value: '#e6fffb', title: { name: 'Cyan 1', translate: 'ant_design.color.cyan', with: { value: 1 } } },
            { value: '#b5f5ec', title: { name: 'Cyan 2', translate: 'ant_design.color.cyan', with: { value: 2 } } },
            { value: '#87e8de', title: { name: 'Cyan 3', translate: 'ant_design.color.cyan', with: { value: 3 } } },
            { value: '#5cdbd3', title: { name: 'Cyan 4', translate: 'ant_design.color.cyan', with: { value: 4 } } },
            { value: '#36cfc9', title: { name: 'Cyan 5', translate: 'ant_design.color.cyan', with: { value: 5 } } },
            { value: '#13c2c2', title: { name: 'Cyan 6', translate: 'ant_design.color.cyan', with: { value: 6 } } },
            { value: '#08979c', title: { name: 'Cyan 7', translate: 'ant_design.color.cyan', with: { value: 7 } } },
            { value: '#006d75', title: { name: 'Cyan 8', translate: 'ant_design.color.cyan', with: { value: 8 } } },
            { value: '#00474f', title: { name: 'Cyan 9', translate: 'ant_design.color.cyan', with: { value: 9 } } },
            { value: '#002329', title: { name: 'Cyan 10', translate: 'ant_design.color.cyan', with: { value: 10 } } },

            { type: 'group', value: { name: 'Daybreak Blue / 拂晓蓝', translate: 'ant_design.group.blue' } },
            { value: '#e6f4ff', title: { name: 'Blue 1', translate: 'ant_design.color.blue', with: { value: 1 } } },
            { value: '#bae0ff', title: { name: 'Blue 2', translate: 'ant_design.color.blue', with: { value: 2 } } },
            { value: '#91caff', title: { name: 'Blue 3', translate: 'ant_design.color.blue', with: { value: 3 } } },
            { value: '#69b1ff', title: { name: 'Blue 4', translate: 'ant_design.color.blue', with: { value: 4 } } },
            { value: '#4096ff', title: { name: 'Blue 5', translate: 'ant_design.color.blue', with: { value: 5 } } },
            { value: '#1677ff', title: { name: 'Blue 6', translate: 'ant_design.color.blue', with: { value: 6 } } },
            { value: '#0958d9', title: { name: 'Blue 7', translate: 'ant_design.color.blue', with: { value: 7 } } },
            { value: '#003eb3', title: { name: 'Blue 8', translate: 'ant_design.color.blue', with: { value: 8 } } },
            { value: '#002c8c', title: { name: 'Blue 9', translate: 'ant_design.color.blue', with: { value: 9 } } },
            { value: '#001d66', title: { name: 'Blue 10', translate: 'ant_design.color.blue', with: { value: 10 } } },

            { type: 'group', value: { name: 'Geek Blue / 极客蓝', translate: 'ant_design.group.geek_blue' } },
            { value: '#f0f5ff', title: { name: 'Geek Blue 1', translate: 'ant_design.color.geek_blue', with: { value: 1 } } },
            { value: '#d6e4ff', title: { name: 'Geek Blue 2', translate: 'ant_design.color.geek_blue', with: { value: 2 } } },
            { value: '#adc6ff', title: { name: 'Geek Blue 3', translate: 'ant_design.color.geek_blue', with: { value: 3 } } },
            { value: '#85a5ff', title: { name: 'Geek Blue 4', translate: 'ant_design.color.geek_blue', with: { value: 4 } } },
            { value: '#597ef7', title: { name: 'Geek Blue 5', translate: 'ant_design.color.geek_blue', with: { value: 5 } } },
            { value: '#2f54eb', title: { name: 'Geek Blue 6', translate: 'ant_design.color.geek_blue', with: { value: 6 } } },
            { value: '#1d39c4', title: { name: 'Geek Blue 7', translate: 'ant_design.color.geek_blue', with: { value: 7 } } },
            { value: '#10239e', title: { name: 'Geek Blue 8', translate: 'ant_design.color.geek_blue', with: { value: 8 } } },
            { value: '#061178', title: { name: 'Geek Blue 9', translate: 'ant_design.color.geek_blue', with: { value: 9 } } },
            { value: '#030852', title: { name: 'Geek Blue 10', translate: 'ant_design.color.geek_blue', with: { value: 10 } } },

            { type: 'group', value: { name: 'Golden Purple / 酱紫', translate: 'ant_design.group.purple' } },
            { value: '#f9f0ff', title: { name: 'Purple 1', translate: 'ant_design.color.purple', with: { value: 1 } } },
            { value: '#efdbff', title: { name: 'Purple 2', translate: 'ant_design.color.purple', with: { value: 2 } } },
            { value: '#d3adf7', title: { name: 'Purple 3', translate: 'ant_design.color.purple', with: { value: 3 } } },
            { value: '#b37feb', title: { name: 'Purple 4', translate: 'ant_design.color.purple', with: { value: 4 } } },
            { value: '#9254de', title: { name: 'Purple 5', translate: 'ant_design.color.purple', with: { value: 5 } } },
            { value: '#722ed1', title: { name: 'Purple 6', translate: 'ant_design.color.purple', with: { value: 6 } } },
            { value: '#531dab', title: { name: 'Purple 7', translate: 'ant_design.color.purple', with: { value: 7 } } },
            { value: '#391085', title: { name: 'Purple 8', translate: 'ant_design.color.purple', with: { value: 8 } } },
            { value: '#22075e', title: { name: 'Purple 9', translate: 'ant_design.color.purple', with: { value: 9 } } },
            { value: '#120338', title: { name: 'Purple 10', translate: 'ant_design.color.purple', with: { value: 10 } } },

            { type: 'group', value: { name: 'Magenta / 法式洋红', translate: 'ant_design.group.magenta' } },
            { value: '#fff0f6', title: { name: 'Magenta 1', translate: 'ant_design.color.magenta', with: { value: 1 } } },
            { value: '#ffd6e7', title: { name: 'Magenta 2', translate: 'ant_design.color.magenta', with: { value: 2 } } },
            { value: '#ffadd2', title: { name: 'Magenta 3', translate: 'ant_design.color.magenta', with: { value: 3 } } },
            { value: '#ff85c0', title: { name: 'Magenta 4', translate: 'ant_design.color.magenta', with: { value: 4 } } },
            { value: '#f759ab', title: { name: 'Magenta 5', translate: 'ant_design.color.magenta', with: { value: 5 } } },
            { value: '#eb2f96', title: { name: 'Magenta 6', translate: 'ant_design.color.magenta', with: { value: 6 } } },
            { value: '#c41d7f', title: { name: 'Magenta 7', translate: 'ant_design.color.magenta', with: { value: 7 } } },
            { value: '#9e1068', title: { name: 'Magenta 8', translate: 'ant_design.color.magenta', with: { value: 8 } } },
            { value: '#780650', title: { name: 'Magenta 9', translate: 'ant_design.color.magenta', with: { value: 9 } } },
            { value: '#520339', title: { name: 'Magenta 10', translate: 'ant_design.color.magenta', with: { value: 10 } } },
        ]
    }, {
        meta: {
            name: 'minecraft',
            title: {
                name: 'Minecraft',
                translate: 'minecraft.title'
            }
        },
        colors: [
            { value: '#000000', title: { name: 'Black', translate: 'common.color.black' } },
            { value: '#0000aa', title: { name: 'Dark Blue', translate: 'common.color.deep_blue' } },
            { value: '#00aa00', title: { name: 'Dark Green', translate: 'common.color.deep_green' } },
            { value: '#00aaaa', title: { name: 'Dark Aqua', translate: 'common.color.deep_aqua' } },
            { value: '#aa0000', title: { name: 'Dark Red', translate: 'common.color.deep_red' } },
            { value: '#aa00aa', title: { name: 'Dark Purple', translate: 'common.color.deep_purple' } },
            { value: '#ffaa00', title: { name: 'Gold', translate: 'common.color.gold' } },
            { value: '#aaaaaa', title: { name: 'Gray', translate: 'common.color.gray' } },
            { value: '#555555', title: { name: 'Dark Gray', translate: 'common.color.deep_gray' } },
            { value: '#5555ff', title: { name: 'Blue', translate: 'common.color.blue' } },
            { value: '#55ff55', title: { name: 'Green', translate: 'common.color.green' } },
            { value: '#55ffff', title: { name: 'Aqua', translate: 'common.color.aqua' } },
            { value: '#ff5555', title: { name: 'Red', translate: 'common.color.red' } },
            { value: '#ff55ff', title: { name: 'Light Purple', translate: 'common.color.light_purple' } },
            { value: '#ffff55', title: { name: 'Yellow', translate: 'common.color.yellow' } },
            { value: '#ffffff', title: { name: 'White', translate: 'common.color.white' } },
        ]
    }, {
        meta: {
            name: 'custom_class',
            title: {
                name: '高级样式',
                translate: 'custom_class.title'
            }
        },
        colors: [
            { type: 'group', value: { name: '搞笑搞怪', translate: 'custom_class.group.funny' } },
            {
                type: 'class',
                value: 'jitter',
                title: { name: '抖动', translate: 'custom_class.style.jitter' },
                image: 'res/image/editor/palette/jitter.png'
            },
            {
                type: 'class',
                value: 'wave-1',
                title: { name: '', translate: 'custom_class.style.wave_1' },
                image: 'res/image/editor/palette/wave_1.png'
            },
            {
                type: 'class',
                value: 'wave-2',
                title: { name: '', translate: 'custom_class.style.wave_2' },
                image: 'res/image/editor/palette/wave_2.png'
            },
            {
                type: 'class',
                value: 'wave-3',
                title: { name: '', translate: 'custom_class.style.wave_3' },
                image: 'res/image/editor/palette/wave_3.png'
            },
            {
                type: 'class',
                value: 'orbit-1',
                title: { name: '', translate: 'custom_class.style.orbit_1' },
                image: 'res/image/editor/palette/orbit_1.png'
            },
            {
                type: 'class',
                value: 'orbit-2',
                title: { name: '', translate: 'custom_class.style.orbit_2' },
                image: 'res/image/editor/palette/orbit_2.png'
            },
            {
                type: 'class',
                value: 'orbit-3',
                title: { name: '', translate: 'custom_class.style.orbit_3' },
                image: 'res/image/editor/palette/orbit_3.png'
            },
            {
                type: 'class',
                value: 'roll-down',
                title: { name: '旋转倒置', translate: 'custom_class.style.roll_down' },
                image: 'res/image/editor/palette/roll_down.png'
            },

            { type: 'group', value: { name: '多彩渐变', translate: 'custom_class.group.colorful' } },
            {
                type: 'class',
                value: 'rainbow',
                title: { name: '彩虹', translate: 'custom_class.style.rainbow' },
                preview_class: 'rainbow'
            },
            {
                type: 'class',
                value: 'gradient-salt-mountain',
                title: { name: '地中之盐', translate: 'custom_class.style.gradient_salt_mountain' },
                preview_class: 'gradient-salt-mountain'
            },
            {
                type: 'class',
                value: 'gradient-heavy-rain',
                title: { name: '倾盆大雨', translate: 'custom_class.style.gradient_heavy_rain' },
                preview_class: 'gradient-heavy-rain'
            },
            {
                type: 'class',
                value: 'gradient-mountain-rock',
                title: { name: '筑山之岩', translate: 'custom_class.style.gradient_mountain_rock' },
                preview_class: 'gradient-mountain-rock'
            },
            {
                type: 'class',
                value: 'gradient-premium-dark',
                title: { name: '高级深灰', translate: 'custom_class.style.gradient_premium_dark' },
                preview_class: 'gradient-premium-dark'
            },
            {
                type: 'class',
                value: 'gradient-sunny-morning',
                title: { name: '明媚早晨', translate: 'custom_class.style.gradient_sunny_morning' },
                preview_class: 'gradient-sunny-morning'
            },
            {
                type: 'class',
                value: 'gradient-juicy-peach',
                title: { name: '多汁蜜桃', translate: 'custom_class.style.gradient_juicy_peach' },
                preview_class: 'gradient-juicy-peach'
            },
            {
                type: 'class',
                value: 'gradient-dusty-grass',
                title: { name: '固沙草原', translate: 'custom_class.style.gradient_dusty_grass' },
                preview_class: 'gradient-dusty-grass'
            },
            {
                type: 'class',
                value: 'gradient-aqua-splash',
                title: { name: '海洋巨星', translate: 'custom_class.style.gradient_aqua_splash' },
                preview_class: 'gradient-aqua-splash'
            },
            {
                type: 'class',
                value: 'gradient-night-fade',
                title: { name: '暮色银河', translate: 'custom_class.style.gradient_night_fade' },
                preview_class: 'gradient-night-fade'
            },
            {
                type: 'class',
                value: 'gradient-red-salvation',
                title: { name: '碎空远星', translate: 'custom_class.style.gradient_red_salvation' },
                preview_class: 'gradient-red-salvation'
            },
            {
                type: 'class',
                value: 'gradient-winter-neva',
                title: { name: '冰天雪地', translate: 'custom_class.style.gradient_winter_neva' },
                preview_class: 'gradient-winter-neva'
            },
            {
                type: 'class',
                value: 'gradient-fly-high',
                title: { name: '冰天雪地', translate: 'custom_class.style.gradient_fly_high' },
                preview_class: 'gradient-fly-high'
            },
            {
                type: 'class',
                value: 'gradient-perfect-blue',
                title: { name: '宇宙之眼', translate: 'custom_class.style.gradient_perfect_blue' },
                preview_class: 'gradient-perfect-blue'
            },
            {
                type: 'class',
                value: 'gradient-spring-warmth',
                title: { name: '暖阳春日', translate: 'custom_class.style.gradient_spring_warmth' },
                preview_class: 'gradient-spring-warmth'
            },
        ]
    }
]);