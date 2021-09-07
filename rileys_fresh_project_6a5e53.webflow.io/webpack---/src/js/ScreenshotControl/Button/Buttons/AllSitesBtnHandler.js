import AllSitesBtn from "./AllSitesBtn";

export default class AllSitesBtnHandler {

    constructor(__handleButtonClick) {

        this.handleButtonClick = __handleButtonClick;
        this.knownVideos = [];
    }

    init() {

    }

    update() {
        //console.log('GenericBtn Update:', this.videoContainer, this.button.parentNode);
        if (!this.allVideos || this.allVideos.length == 0) return;

        for (let video of this.allVideos) {

            //console.log('video!');

            let isNew = true;
            for (let knownVideo of this.knownVideos) {

                //console.log(knownVideo, video);
                if (knownVideo == video) {
                    //console.log('not unique!!')
                    isNew = false;
                }
            }

            if (isNew == true) {
                //Adding Button
                console.log('allsitesbtnhandler: adding button')
                let newBtn = new AllSitesBtn(video, this.handleButtonClick);
            }

            this.knownVideos.push(video);

        }
    }

    refreshControls(newControls) {
        console.log(newControls);
        //newControls.append(this.buttonWrap);
    }

    get allVideos() {

        let allVideos = document.querySelectorAll('Video');
        return allVideos;
    }

}