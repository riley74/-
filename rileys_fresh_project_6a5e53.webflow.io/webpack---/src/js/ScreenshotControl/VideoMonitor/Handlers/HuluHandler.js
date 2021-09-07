import GenericHandler from './GenericHandler.js'

export default class HuluHandler extends GenericHandler {

    constructor() {

        super();

        this.init();
    }

    init() {
        try {
            this.video = document.querySelectorAll('#content-video-player')[0] || this.video;
            this.element = this.video;
        } catch (error) {
            //console.log()
        }
    }

    async prepTabCapture() {

        super.prepTempHolder('hulu');
        return await super.moveElement();

    }

    async resetTabCapture() {
        return await super.resetTabCapture();
    }
}