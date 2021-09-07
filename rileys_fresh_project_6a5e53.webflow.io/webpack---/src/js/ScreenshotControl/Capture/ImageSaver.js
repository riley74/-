export default class ImageSaver {

    constructor() {}

    async save(__currentSite, __blob, __currentTime, __extension) {

        //console.log(document.featurePolicy.allowedFeatures());

        if (__extension == 'clipboard') {
            try {
                //console.log('Trying copy to clipboard...');
                await this.copyToClipboard(__blob);
            } catch (error) {
                console.log('Failed copy to clipboard.');
                this.saveFile(__currentSite, __blob, __currentTime);
            }
        } else {
            this.saveFile(__currentSite, __blob, __currentTime);
        }
    }

    saveFile(__currentSite, __blob, __currentTime) {

        console.log('Saving', __blob);

        var imgData = URL.createObjectURL(__blob);

        let extension = (__blob.type == 'image/jpeg' ? 'jpg' : 'png');

        var downloadObject = {
            type: 'ScreenshotDownload',
            url: imgData,
            filename: 'Screenshotter--' + this.getVideoTitle(__currentSite) + '-' + this.getTimecode(__currentTime) + "." + extension,
            saveAs: true
        }

        chrome.runtime.sendMessage(downloadObject);

        return null;
    }

    async copyToClipboard(__blob) {

        console.log(__blob.type, __blob);

        let clipData = new ClipboardItem({
            [__blob.type]: __blob
        });

        return navigator.clipboard.write([clipData]).then(() => {
            console.log('Copied!');

            var elem = document.getElementById('copiedToClipboard');
            if (elem) elem.parentNode.removeChild(elem);
            let notification = document.createElement("div");
            notification.id = 'copiedToClipboard';
            document.body.appendChild(notification);
            return 'done';
        }, () => {
            throw 'Failed';
        });
    }

    getVideoTitle(currentSite) {

        var videoTitle = '';
        //get the name of the video

        try {
            if (currentSite == 'youtube') {
                videoTitle = `YouTube-${document.getElementsByClassName("ytp-title-link")[0].textContent}`;
            } else if (currentSite == 'vimeo') {
                videoTitle = 'Vimeo-' + document.getElementsByTagName("H1")[0].children[0].innerText;
            } else if (currentSite == 'netflix') {
                videoTitle = `Netflix-${document.getElementsByClassName("video-title")[0].textContent}`;
            } else if (currentSite == 'amazon') {
                videoTitle = 'Amazon-' + document.getElementsByClassName("contentTitlePanel")[0].textContent;
            }
        } catch (e) {

        }

        if (videoTitle == '') {
            videoTitle = document.title;
        }

        videoTitle = videoTitle.replace(/[^a-zA-Z0-9-]/g, '');

        return videoTitle;
    }


    getTimecode(__currentTime) {

        var time = __currentTime;
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time - (minutes * 60));
        seconds = ("0" + seconds).slice(-2);
        var timecode = minutes + "’" + seconds + '”';
        //console.log(timecode);

        return timecode;
    }
}