import {
    CaptureIconPath
} from './CaptureIcon.js';

export default class GeneralBtnClass {

    constructor(__handleButtonClick) {

        this.button;
        this.playerControls;
        this.buttonClickRef;

        this.handleButtonClick = __handleButtonClick;
        //console.log(this.handleButtonClick, __handleButtonClick);
    }

    additionalSetup() {
        //console.log('setup');
        var captureIcon = document.createElement("svg");
        captureIcon.innerHTML = CaptureIconPath;
        this.button.append(captureIcon);

        var buttonClick = this.buttonClick.bind(this);

        this.button.addEventListener('click', buttonClick);
    }

    buttonClick(event) {

        //console.log('Button Clicked...');
        event.preventDefault();
        event.stopPropagation();
        this.handleButtonClick(this.button);
    }

    update() {

        let oldControls = this.playerControls;
        let newControls = this.getLatestPlayerControls();
        //console.log('GeneralBtnClass: update', oldControls, newControls);
        if (newControls && newControls.contains(this.button)) return;
        console.log('Refreshing button...');
        //if(oldControls == newControls) return;

        this.playerControls = newControls;
        if (this.playerControls) this.refreshControls(newControls);
    }
}