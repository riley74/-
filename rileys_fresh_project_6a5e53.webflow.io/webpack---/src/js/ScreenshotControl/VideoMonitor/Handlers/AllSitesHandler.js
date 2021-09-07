import GenericHandler from './GenericHandler.js'

export default class AllSitesHandler extends GenericHandler {

    constructor(__button) {

        super();

        this.video = __button;
        this.element = this.video;
    }

    update() {
        //console.log('update');//, this.buttonMonitor.button);
    }

    init() {
        //do nothing
    }

    async prepTabCapture() {

        super.prepTempHolder('allSites');

        this.tempHolder.style.maxWidth = this.video.videoWidth + 'px';
        this.tempHolder.style.maxHeight = this.video.videoHeight + 'px';

        return await super.moveElement();
    }

    async resetTabCapture() {
        return await super.resetTabCapture();
    }

}