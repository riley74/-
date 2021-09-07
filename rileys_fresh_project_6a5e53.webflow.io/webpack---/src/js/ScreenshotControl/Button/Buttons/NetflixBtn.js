import GeneralBtnClass from './GeneralBtnClass.js';

export default class NetflixBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);
        this.init();
        this.additionalSetup();
    }

    init() {
        this.button = document.createElement("div");
        this.button.className = "touchable PlayerControls--control-element nfp-popup-control ssBtnNetflix";
    }

    refreshControls(newControls) {
        newControls.insertBefore(this.button, this.playerControls.children[5]);
    }

    getLatestPlayerControls() {
        return document.getElementsByClassName("PlayerControlsNeo__button-control-row")[0];
    }

}