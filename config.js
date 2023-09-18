// 这里是配置文件，请不要删除任何项目
const config = {
    // Echo 相关配置
    echo: {
        // 滚动速度，每个字符打印循环的延迟时间（毫秒），最小值为 4
        print_speed: 30
    },

    // 编辑器相关配置
    editor: {
        // 初始说话人
        username_init: '',
        // 在输出内容前插入的内容
        output_before: 'const data = ',
        // 启用上述功能，0 为禁用，1 为启用
        ontput_before_enable: 1
    }
};