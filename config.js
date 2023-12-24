// 这里是配置文件，请不要删除任何项目
// 配置文件保存修改后，请刷新网页
const config = {
    // Echo 相关配置
    echo: {
        // 滚动速度，每个字符打印循环的延迟时间（毫秒），最小值为 4
        print_speed: 30,
    },

    // Echo Live 相关配置
    echolive: {
        // 启用消息轮询，无需手动刷新，关闭则使用旧版手动操作
        messages_polling_enable: true,
        // 消息轮询间隔（毫秒），值越小响应越快，性能消耗越高
        messages_polling_tick: 250,

        // 启用打字音效，false 为禁用，true 为启用
        print_audio_enable: true,
        // 音效名称（详见 res/script/sounds.js）
        print_audio_name: 'typewriter_loop',
        // 音效音量，1 为最大
        print_audio_volume: 0.5,
        // 音效播放速度，1 为原速
        print_audio_rate: 1,

        // 启用新对话入场音效，false 为禁用，true 为启用
        next_audio_enable: false,
        // 音效名称（详见 res/script/sounds.js）
        next_audio_name: 'enter',
        // 音效音量，1 为最大
        next_audio_volume: 0.5,
        // 音效播放速度，1 为原速
        next_audio_rate: 1,
    },

    // 编辑器相关配置
    editor: {
        // 初始说话人
        username_init: '',
        // 在输出内容前插入的内容
        output_before: 'echolive.send(',
        // 启用上述功能，0 为禁用，1 为启用
        ontput_before_enable: 1,
        // 在输出内容后插入的内容
        output_after: ');',
        // 启用上述功能，0 为禁用，1 为启用
        ontput_after_enable: 1
    }
};