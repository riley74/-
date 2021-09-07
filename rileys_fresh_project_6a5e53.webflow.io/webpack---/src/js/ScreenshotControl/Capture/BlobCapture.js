import GetCanvasBlob from './GetCanvasBlob';

export default class BlobCapture {

    constructor(__videoHandler, __imageType) {

        this.videoHandler = __videoHandler;
        this.imageType = __imageType;

        return this.init();
    }

    async init() {
        var canvas = document.createElement("canvas");

        //canvas.setAttribute('crossOrigin', 'Anonymous');
        //video().setAttribute('crossOrigin', 'Anonymous');

        canvas.width = this.videoHandler.video.videoWidth;
        canvas.height = this.videoHandler.video.videoHeight;

        console.log(this.videoHandler, canvas.width, canvas.height);

        canvas.getContext('2d').drawImage(this.videoHandler.video, 0, 0, canvas.width, canvas.height);

        try {

            var canvasBlob = new GetCanvasBlob(canvas, this.imageType);
            return await canvasBlob.then(function(blob) {
                console.log('Blob:', blob);
                return blob;
            });

        } catch (error) {
            console.log('ERROR:', error);
            throw error;
        }

    }
}