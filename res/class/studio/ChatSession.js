class ChatSession {
    constructor() {
        this.lastIndex = 0;
        this.messages = [];
    }

    addMessage(message) {
        const index = this.lastIndex++;
        const data = {
            index: index,
            type: 'chat_message',
            payload: message,
            created_at: Date.now()
        };
        let canMerge = false;
        if (this.messages[index - 1] !== undefined) {
            const lastMessage = this.messages[index - 1];
            canMerge = lastMessage.type === 'chat_message'
                && lastMessage.payload?.from?.uuid === message.from?.uuid
                && lastMessage.payload?.data?.username === message.data?.username
                && Math.abs(data.created_at - lastMessage.created_at) < 180000;
        }

        this.messages.push(data);

        return {
            canMerge: canMerge,
            lastIndex: index - 1,
            data: data
        }
    }

    addSystemMessage(text) {
        this.messages.push({
            index: this.lastIndex++,
            type: 'system_message',
            payload: text,
            created_at: Date.now()
        });
    }
}