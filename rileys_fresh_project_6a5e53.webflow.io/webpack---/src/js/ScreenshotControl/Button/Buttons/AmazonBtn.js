import GeneralBtnClass from './GeneralBtnClass.js';

export default class AmazonBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);
        this.init();
        this.additionalSetup();
    }

    init() {
        this.button = document.createElement("button");
        this.button.className = "ssBtnAmazon";
    }

    refreshControls(newControls) {
        newControls.prepend(this.button);
    }

    getLatestPlayerControls() {

        try {
            return document.getElementsByClassName("atvwebplayersdk-hideabletopbuttons-container")[0].children[0];
        } catch (error) {
            return null;
        }
    }

}