const ScreenshotControl = require('./ScreenshotControl').default;

var pageEnabled = false;
var currentSite;

var ssInstances = [];
var buildingButton = false;
var ga;

init();

function init() {

    var url = window.location.host;

    chrome.storage.local.get(null, function(items) {

        if (url.includes("youtube.com")) {
            if (items['youtube'] == true) pageEnabled = true;
            currentSite = 'youtube';
        } else if (url.includes("vimeo.com")) {
            if (items['vimeo'] == true) pageEnabled = true;
            currentSite = 'vimeo';
        } else if (url.includes("netflix.com")) {
            if (items['netflix'] == true) pageEnabled = true;
            currentSite = 'netflix';
        } else if (url.includes("amazon") || url.includes("primevideo")) {
            if (items['amazon'] == true) pageEnabled = true;
            currentSite = 'amazon';
        } else if (url.includes("hulu.com")) {
            if (items['hulu'] == true) pageEnabled = true;
            currentSite = 'hulu';
        } else if (url.includes("hbomax.com")) {
            if (items['hbo'] == true) pageEnabled = true;
            currentSite = 'hbo';
        } else if (items['everythingelse'] == true) {
            pageEnabled = true;
            currentSite = 'default';

            var blackList = items['blacklist'].split(/\r?\n/g);
            //console.log(blackList);

            for (var domain in blackList) {
                //console.log('Testing:', blackList[domain]);
                if (url.includes(blackList[domain]) && blackList[domain].length > 2) {
                    console.log("Current Domain (" + blackList[domain] + ") is in Screenshotter blacklist.");
                    pageEnabled = false;
                }
            }
        } else {
            var whiteList = items['whitelist'].split(/\r?\n/g);
            //console.log(whiteList);

            for (var domain in whiteList) {
                //console.log('Testing:', whiteList[domain]);
                if (url.includes(whiteList[domain]) && whiteList[domain].length > 2) {
                    console.log("Current Domain (" + whiteList[domain] + ") is in Screenshotter whitelist.");
                    pageEnabled = true;
                    currentSite = 'default';
                }
            }
        }

        if (pageEnabled == true) {
            require('../../scss/page/page.scss');
            console.log('Activate Screenshotter:', url)
            var screenshot = new ScreenshotControl(currentSite);
        }
    });
}