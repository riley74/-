export default class ExtensionGen {
    constructor() {

        this.imageType;
        this.imageExtension;

        //this.init();
    }

    async getExt() {

        let imageType;
        let imageExt;

        return new Promise(function(resolve, reject) {
            chrome.storage.local.get('imageType', function(items) {

                imageType = items['imageType'];

                if (!imageType) {
                    chrome.storage.local.set({
                        'imageType': 'image/png'
                    });
                    imageType = 'image/png';
                }

                resolve(imageType);

            });
        });
    }
}