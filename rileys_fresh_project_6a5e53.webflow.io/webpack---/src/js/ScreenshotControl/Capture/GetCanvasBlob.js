export default class GetCanvasBlob {

    constructor(__canvas, __imageType) {

        this.canvas = __canvas;
        this.blobSizeMinimum = 30000;
        this.imageType = __imageType;

        return this.init();
    }

    init() {

        let _this = this;

        return new Promise(function(resolve, reject) {

            _this.canvas.toBlob(function(blob) {

                if (blob == null) {
                    reject('No Image to Download');
                    return;
                }

                if (blob.size < _this.blobSizeMinimum) reject("Blob Screenshot too small: " + blob.size);

                resolve(blob);

            }, _this.imageType, 1.0)

        })
    }



}