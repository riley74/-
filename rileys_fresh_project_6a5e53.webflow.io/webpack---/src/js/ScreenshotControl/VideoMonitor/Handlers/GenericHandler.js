export default class GenericHandler {

    constructor() {

        this.video;
        this.element;
        this.wasPaused;

        this.tempHolder;
        this.wrapper;
        this.rememberPlace;

        this.init();
        this.pauseVideo();
    }

    init() {

        this.video = document.querySelectorAll('Video')[0];
        this.element = this.video;

        return null;

    }

    prepTempHolder(__tempHolderClassName) {

        //Create div for placement in root
        this.tempHolder = document.createElement("div");
        this.tempHolder.id = "ssTempHolder";
        this.tempHolder.style.maxWidth = this.video.videoWidth + 'px';
        this.tempHolder.style.maxHeight = this.video.videoHeight + 'px';
        this.tempHolder.classList.add(__tempHolderClassName);

        //Wrapper is body or fullscreen
        this.wrapper = document.webkitFullscreenElement;
        if (this.wrapper == null) {
            this.wrapper = document.body;
        }

        //Add placement div to wrapper 
        this.wrapper.classList.add("ssWrapper");
        this.wrapper.prepend(this.tempHolder);

        //Add div to remember place
        if (this.rememberPlace == undefined) {
            this.rememberPlace = document.createElement("div");
        };
        this.rememberPlace.id = "ssRememberPlace";

        let _this = this;
    }

    async moveElement() {

        //When element has moved, send promise
        return new Promise(resolve => {

            var config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            };

            var observer = new MutationObserver(event => {
                observer.disconnect();

                requestAnimationFrame(function() {

                    requestAnimationFrame(function() {

                        resolve('done');
                    });
                });
            });

            observer.observe(this.tempHolder, config);

            //Put element in remember place
            this.element.parentNode.insertBefore(this.rememberPlace, this.element);
            this.tempHolder.append(this.element);
        })

    }

    resetTabCapture() {

        this.rememberPlace.parentNode.insertBefore(this.element, this.rememberPlace);
        this.tempHolder.parentNode.removeChild(this.tempHolder);

        return null;
        //this.playVideo();

        /*
        let _this = this;
        var cleanUp = setTimeout(function() {
        	//console.log("CLEAN UP");
        	_this.wrapper.classList.remove("ssScreenshot");
        }, 1000)*/
    }

    pauseVideo() {
        if (!this.video) return;
        this.wasPaused = this.video.paused;
        if (this.video.paused == false) {
            this.video.pause();
        }
    }

    playVideo() {
        if (this.wasPaused == false) {
            this.video.play();
        }
    }

    get currentTime() {
        return this.video.currentTime;
    }

    get height() {
        return this.video.offsetHeight;
    }

    get width() {
        return this.video.offsetWidth;
    }

    /*get offsetX() {
    	return 0;
    }
	
    get offsetY() {
    	
    	//console.log(this.tempHolder.offsetTop);
    	return this.tempHolder.offsetTop;
    }*/
    get offsetX() {
        return this.video.offsetLeft;
    }

    get offsetY() {
        return this.video.offsetTop;
    }

}