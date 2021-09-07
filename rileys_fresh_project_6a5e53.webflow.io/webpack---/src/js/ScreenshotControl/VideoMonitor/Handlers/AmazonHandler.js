import GenericHandler from './GenericHandler.js'

export default class AmazonHandler extends GenericHandler {

    constructor() {

        super();

        this.init();
    }

    init() {
        try {
            this.video = document.querySelectorAll('#dv-web-player Video')[0] || this.video;
            this.element = this.video.parentNode;
        } catch (error) {
            //console.log()
        }
    }

    async prepTabCapture() {

        super.prepTempHolder('amazon');
        return await super.moveElement();
    }

    async resetTabCapture() {
        return await super.resetTabCapture();
    }
}