import GetCanvasBlob from './GetCanvasBlob';

export default class TabCapture {

    constructor(__videoMonitor, __imageType) {

        this.videoHandler = __videoMonitor;
        this.imageType = __imageType;

        return this.init();
    }

    async init() {

        //console.log('Doing TabCapture for:', this.videoHandler);

        let _this = this;

        //console.log('tab capture NOW');
        //originalMaxWidth = video.style.maxWidth;
        //video.style.maxWidth = video.videoWidth + 'px';

        let imgSrc = await this.sendToBackground();
        let image = await this.loadImage(imgSrc);

        let canvas = document.createElement("canvas");

        //console.log(this.videoHandler, this.videoHandler.width, this.videoHandler.height, this.videoHandler.offsetX, this.videoHandler.offsetY);
        canvas.width = this.videoHandler.width * 2;
        canvas.height = this.videoHandler.height * 2;
        //console.log(canvas.width, canvas.height);
        //console.log(image, -this.videoHandler.offsetX*2, -this.videoHandler.offsetY*2, window.innerWidth*2, window.innerHeight*2);

        //console.log('Canvas:', this.videoMonitor.element.offsetLeft, -this.videoMonitor.element.offsetTop, window.innerWidth*2, window.innerHeight*2);
        canvas.getContext('2d').drawImage(image, -this.videoHandler.offsetX * 2, -this.videoHandler.offsetY * 2, window.innerWidth * 2, window.innerHeight * 2);

        var canvasBlob = new GetCanvasBlob(canvas, this.imageType);
        return await canvasBlob.then(function(blob) {
            return blob;
        });
    }

    sendToBackground() {

        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                type: "TabCaptureScreenshot"
            }, async function(response) {

                resolve(response.imgSrc);
            });
        })
    }


    loadImage(__imgSrc) {

        return new Promise(resolve => {

            let image = document.createElement("img");
            image.src = __imgSrc;

            image.onload = function() {
                resolve(image);
            }
        })
    }
}