class OBSTutorial {
    constructor() {
        this.$player = '#obs-tutorial-player';
        this.$view = '#obs-tutorial-view';
        this.$control = '#obs-tutorial-control';
        this.stats = 'stop';
        this.sence = [];
        this.source = [];
    }

    static senceListItem(title, isSelected = false, id, index = -1) {
        return `<div class="panel-list-item${ isSelected ? ' selected' : '' }"${ id ? ` id="${ id }"` : '' } data-index="${ index }"><div class="title">${ title }</div></div>`
    }

    static sourceListItem(title, type = 'browser', id, index = -1) {
        const icon = {
            browser: 'material:earth',
            image: 'material:image'
        }
        return `<div class="panel-list-item"${ id ? ` id="${ id }"` : '' } data-index="${ index }">
            <div class="icon">
                ${ Icon.getIcon(icon[type], 'material:earth') }
            </div>
            <div class="title">${ title }</div>
            <div class="action action-1">
                <slot data-icon="material:eye"></slot>
            </div>
            <div class="action action-2">
                <slot data-icon="material:lock-open"></slot>
            </div>
        </div>`
    }

    init() {
        this.clearSenceList();
        this.clearSourceList();
        this.addSence('场景 1');
        this.addSource('背景', 'image');
    }

    start(handler) {
        $(this.$view).removeClass('stopped');
        setTimeout(handler, 1000);
    }

    stop() {
        $(this.$view).addClass('stopped');
    }

    clearSenceList() {
        this.sence = [];
        $('#slot-scene').html('');
    }

    clearSourceList() {
        this.source = [];
        $('#slot-source').html('');
    }

    addSence(title, id) {
        const dom = OBSTutorial.senceListItem(title, this.sence.length === 0, id, this.sence.length);
        this.sence.push({ title, id })
        $('#slot-scene').append(dom);
    }

    addSource(title, type = 'browser', id) {
        const dom = OBSTutorial.sourceListItem(title, type, id, this.source.length);
        this.source.push({ title, type, id })
        $('#slot-source').prepend(dom);
    }
}