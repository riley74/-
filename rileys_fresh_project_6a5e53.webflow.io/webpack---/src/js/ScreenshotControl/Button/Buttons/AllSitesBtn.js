import GeneralBtnClass from './GeneralBtnClass.js';

export default class AllSitesBtn extends GeneralBtnClass {

    constructor(__video, __handleButtonClick) {

        super();

        this.handleButtonClick = this.buttonClicked;
        this.buttonClickRef = __handleButtonClick;
        console.log('New AllSitesBtn:', __video);

        this.video = __video;

        this.iconDimmer;

        this.init();
        this.additionalSetup();
    }

    buttonClicked() {
        this.buttonClickRef(this.video);
    }

    init() {

        this.button = document.createElement("button");
        this.button.className = "ssBtnDefault";

        console.log(this.videoContainer);
        this.videoContainer.prepend(this.button);
        //additionalSetup(this.button);

        //var video = document.getElementsByTagName("Video")[0];
        //this.video.parentNode.prepend(button);

        //this.video.addEventListener('play', this.iconFadeOut);
        //this.video.addEventListener('mousemove', this.iconFadeOut);

        //complete();

    }

    iconFadeOut(event) {

        clearInterval(this.iconDimmer);

        this.button.classList.remove("fade");

        let _this = this;

        this.iconDimmer = setInterval(function() {

            //console.log("Fade Out.......");

            if (!_this.video.paused) {
                _this.button.classList.add("fade");
            }

            clearInterval(_this.iconDimmer);

        }, 250);

    }

    /*update() {
    	console.log('GenericBtn Update:', this.videoContainer, this.button.parentNode);
    	if(!this.videoContainer) return;
    	if(this.videoContainer == this.button.parentNode) return;
    	this.videoContainer.prepend(this.button);
    }*/

    /*refreshControls(newControls) {
    	console.log(newControls);
    	//newControls.append(this.buttonWrap);
    }*/

    get videoContainer() {

        return this.video.parentNode;
        //let allVideos = document.querySelectorAll('Video');
        //console.log('allVideos:', allVideos);
        //return allVideos;
        //let video = allVideos.length > 0 ? allVideos[0] : null;
        //if(!video) return null;
        //return video.parentNode;
    }

}