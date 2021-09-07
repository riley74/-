import VideoMonitor from './VideoMonitor/VideoMonitor.js';
import PageMonitor from './PageMonitor.js';
import ButtonMonitor from './Button/ButtonMonitor.js';
import Capture from './Capture/Capture.js';

export default class ScreenshotControl {

    constructor(__currentSite) {

        this.currentSite = __currentSite;

        this.pageMonitor;
        this.buttonMonitor;
        this.capture;

        this.init();
    }

    init() {

        var handlePageUpdate = this.handlePageUpdate.bind(this);
        var handleButtonClick = this.handleButtonClick.bind(this);
        var takeScreenshot = this.takeScreenshot.bind(this);

        this.pageMonitor = new PageMonitor(handlePageUpdate);
        this.buttonMonitor = new ButtonMonitor(this.currentSite, handleButtonClick);
        this.capture = new Capture(this.currentSite);

        chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

            switch (msg.action) {
                case 'take-screenshot':
                    chrome.runtime.sendMessage({
                        type: "GAEvent",
                        event: "ScreenshotTaken",
                        action: "KeyboardShortcut"
                    });

                    let videos = document.getElementsByTagName("Video");
                    if (videos.length == 0) return;

                    let videosThatStarted = [];
                    for (let video of videos) {
                        if (video.currentTime > 0) videosThatStarted.push(video);
                    }
                    let largestVideo = videosThatStarted[0];
                    for (let video of videosThatStarted) {
                        if (video.width > largestVideo.width) largestVideo = video;
                    }
                    if (!largestVideo) return;
                    console.log('Take Screenshot!');
                    takeScreenshot(largestVideo);
                    break;
            }
        });
    }

    handlePageUpdate() {

        if (this.buttonMonitor) this.buttonMonitor.update();

    }

    handleButtonClick(__video) {
        chrome.runtime.sendMessage({
            type: "GAEvent",
            event: "ScreenshotTaken",
            action: "Clicked"
        });
        this.takeScreenshot(__video);
    }

    async takeScreenshot(__video) {

        console.log(__video);
        let videoMonitor = new VideoMonitor(this.currentSite, __video);
        //videoMonitor.pauseVideo();
        console.log(this);
        await this.capture.go(videoMonitor);
        videoMonitor.playVideo();
    }


}