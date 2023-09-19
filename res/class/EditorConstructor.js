class EditorTextList {
    constructor() {}

    static getItem(index, value) {
        return `
        <div class="editor-text-list-item" data-index="${index}">
            <span class="index">${index + 1}.</span>
            <span class="text">${value.text}</span>
            <span class="btn">
                <button class="fh-button fh-small" data-index="${index}">编辑</button>
                <button class="fh-button fh-small fh-danger" data-index="${index}">删除</button>
            </span>
        </div>`;
    }

    static getList(value) {
        let dom = '';
        for (let i = 0; i < value.length; i++) {
            dom += this.getItem(i, value[i]);
        }
        return dom;
    }
}