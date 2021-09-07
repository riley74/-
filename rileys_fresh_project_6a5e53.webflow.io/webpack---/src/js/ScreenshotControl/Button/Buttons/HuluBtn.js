import GeneralBtnClass from './GeneralBtnClass.js';

export default class HuluBtn extends GeneralBtnClass {

    constructor(__handleButtonClick) {
        super(__handleButtonClick);
        this.init();
        this.additionalSetup();
    }

    init() {
        this.button = document.createElement("div");
        this.button.className = "ssBtnHulu";
    }

    refreshControls(newControls) {
        newControls.prepend(this.button);
    }

    getLatestPlayerControls() {

        try {
            return document.getElementsByClassName('BottomUiControls__playerSettingsGroup')[0];
        } catch (error) {
            return null;
        }
    }

}