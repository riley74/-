import GenericHandler from './GenericHandler.js'

export default class HBOHandler extends GenericHandler {

    constructor() {

        super();

        this.init();
    }

    init() {
        this.video = document.querySelectorAll('Video')[0] || this.video;
        if (this.video) this.element = this.video;
    }

    async prepTabCapture() {

        super.prepTempHolder('hbo');
        return await super.moveElement();
    }

    async resetTabCapture() {
        return await super.resetTabCapture();
    }

    /*get offsetX() {
    	return this.video.offsetLeft;
    }
	
    get offsetY() {
    	return this.video.offsetTop;
    }*/

}