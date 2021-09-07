import YouTubeBtn from './Buttons/YouTubeBtn.js';
import VimeoBtn from './Buttons/VimeoBtn.js';
import NetflixBtn from './Buttons/NetflixBtn.js';
import AmazonBtn from './Buttons/AmazonBtn.js';
import HuluBtn from './Buttons/HuluBtn.js';
import HBOBtn from './Buttons/HBOBtn.js';
import AllSitesBtnHandler from './Buttons/AllSitesBtnHandler.js';

export default class ButtonMonitor {

    constructor(__currentSite, handleButtonClick) {
        this.currentSite;
        this.button;
        this.playerControls;
        this.handlePageUpdate;

        this.init(__currentSite, handleButtonClick);
    }

    init(__currentSite, __handleButtonClick) {
        this.currentSite = __currentSite;
        this.handleButtonClick = __handleButtonClick;
        this.buildButton();
    }

    buildButton() {
        //console.log(`Building Screenshot button for ${this.currentSite}...`);

        switch (this.currentSite) {
            case 'youtube':
                this.button = new YouTubeBtn(this.handleButtonClick);
                break;
            case 'vimeo':
                //console.log('create vimeo btn');
                this.button = new VimeoBtn(this.handleButtonClick);
                break;
            case 'netflix':
                this.button = new NetflixBtn(this.handleButtonClick);
                break;
            case 'amazon':
                this.button = new AmazonBtn(this.handleButtonClick);
                break;
            case 'hulu':
                this.button = new HuluBtn(this.handleButtonClick);
                break;
            case 'hbo':
                this.button = new HBOBtn(this.handleButtonClick);
                break;
            case 'default':
                this.button = new AllSitesBtnHandler(this.handleButtonClick);
                break;
        }
    }

    update() {
        //console.log('Updating button:', this.button);
        if (this.button) this.button.update();
    }
}