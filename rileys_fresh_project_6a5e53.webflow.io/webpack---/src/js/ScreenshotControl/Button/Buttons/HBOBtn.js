import GeneralBtnClass from './GeneralBtnClass.js';

export default class HBOBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);
        this.init();
        this.additionalSetup();
    }

    init() {
        this.button = document.createElement("div");
        this.button.className = "ssBtnHBO";
    }

    refreshControls(newControls) {
        console.log('newcontrols:', newControls);
        newControls.append(this.button);
    }

    getLatestPlayerControls() {

        let controls;
        try {
            controls = document.querySelectorAll('[aria-label="Volume slider"]')[0].parentElement.parentElement.parentElement;
        } catch {

        }
        return controls;
    }

}