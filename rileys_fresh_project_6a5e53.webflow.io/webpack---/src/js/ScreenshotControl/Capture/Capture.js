import ImageSaver from './ImageSaver.js';
import BlobCapture from './BlobCapture.js';
import TabCapture from './TabCapture.js';

import ExtensionGen from './ExtensionGen.js';

const imageSaver = new ImageSaver();

export default class Capture {

    constructor(__currentSite) {

        this.inProgress = false;

        this.currentSite = __currentSite;
        this.imageType;
        this.imageExtension;
        this.video;

        this.extGen = new ExtensionGen();
        this.init()
    }

    init() {

        //this.imageType = extGen.imageType;
        //this.imageExtension = extGen.imageExtension;

    }

    async go(__videoMonitor) {

        this.imageType = await this.extGen.getExt();

        console.log('Taking Screenshot...', this.imageType);

        if (this.inProgress == true) {
            console.log('Screenshot already in progress!');
            return;
        }
        this.inProgress = true;

        let blob;

        try {
            console.log('Trying blob capture...');
            blob = await new BlobCapture(__videoMonitor, this.imageType);

        } catch (error) {

            console.log(error, 'Trying tab capture...')
            await __videoMonitor.prepTabCapture();
            blob = await new TabCapture(__videoMonitor, this.imageType);
            __videoMonitor.resetTabCapture();

        }

        if (blob) {
            imageSaver.save(this.currentSite, blob, __videoMonitor.currentTime, this.imageType);
        } else {
            throw ('Blob is undefined!');
        }

        this.inProgress = false;

        return null;
    }
}