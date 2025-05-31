class FileManager {
    constructor() {
        this.writableFileHandle = undefined;
    }

    async exportFile(content, fileName = 'missingno.txt', data = {}) {
        data = {
            chatset: 'utf-8',
            saveAs: false,
            type: 'text/plain',
            ...data
        };

        // 如果支持 showSaveFilePicker 则使用，否则使用传统下载方式
        if (window.showSaveFilePicker != undefined) {
            const result = await this.saveFile(content, fileName, data);
            return Promise.resolve(result);
        }
    
        let blob = new Blob([content], { type: `${ data.type };charset=${ data.chatset }` });
    
        let downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = '';
    
        if ('download' in downloadLink) {
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            window.open(`data:${ data.type };charset=${ data.chatset },` + encodeURIComponent(content));
        }

        return Promise.resolve({
            success: true
        });
    }

    async saveFile(content, fileName = 'missingno.txt', data = {}) {
        data = {
            chatset: 'utf-8',
            excludeAcceptAllOption: true,
            saveAs: false,
            types: [
                {
                    description: undefined,
                    accept: {
                        'text/plain': ['.txt']
                    }
                }
            ],
            ...data
        };

        const opts = {
            suggestedName: fileName,
            types: data.types,
            excludeAcceptAllOption: data.excludeAcceptAllOption
        };
    
        try {
            if (data.saveAs || this.writableFileHandle == undefined) this.writableFileHandle = await window.showSaveFilePicker(opts);
            const writable = await this.writableFileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            outputTabUnsavePoint(false);
            return Promise.resolve({
                success: true
            });
        } catch (error) {
            return Promise.resolve({
                success: false,
                error: error
            });
        }
    }
}