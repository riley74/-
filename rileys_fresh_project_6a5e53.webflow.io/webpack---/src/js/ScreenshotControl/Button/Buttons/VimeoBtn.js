import GeneralBtnClass from './GeneralBtnClass.js';

export default class VimeoBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);

        this.buttonWrap;

        this.init();
        this.additionalSetup();
    }

    init() {
        this.buttonWrap = document.createElement("div");
        this.buttonWrap.className = "box screenshotter ssBtnVimeo";
        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.className = "rounded-box";
        this.buttonWrap.append(this.button);
    }

    refreshControls(newControls) {
        newControls.append(this.buttonWrap);
    }

    getLatestPlayerControls() {
        return document.getElementsByClassName("vp-sidedock")[0];
    }

}