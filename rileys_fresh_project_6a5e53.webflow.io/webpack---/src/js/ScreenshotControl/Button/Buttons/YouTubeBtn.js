import GeneralBtnClass from './GeneralBtnClass.js';

export default class AmazonBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);
        this.init();
        this.additionalSetup();
    }

    init() {
        this.button = document.createElement("button");
        this.button.className = "ytp-button ssBtnYouTube";
    }

    refreshControls(newControls) {
        newControls.prepend(this.button);
    }

    getLatestPlayerControls() {
        return document.getElementsByClassName("ytp-right-controls")[0];
    }

}