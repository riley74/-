import NetflixHandler from './Handlers/NetflixHandler.js';
import AmazonHandler from './Handlers/AmazonHandler.js';
import HuluHandler from './Handlers/HuluHandler.js';
import HBOHandler from './Handlers/HBOHandler.js';
import GenericHandler from './Handlers/GenericHandler.js';
import AllSitesHandler from './Handlers/AllSitesHandler.js';

var currentSite;

export default class VideoMonitor {

    constructor(__currentSite, __video) {

        this.handler = this.init(__currentSite, __video);
        return this.handler;
    }

    init(__currentSite, __video) {

        switch (__currentSite) {
            case 'youtube':
                return new GenericHandler();
                break;
            case 'netflix':
                return new NetflixHandler();
                break;
            case 'vimeo':
                return new GenericHandler();
                break;
            case 'hulu':
                return new HuluHandler();
                break;
            case 'amazon':
                return new AmazonHandler();
                break;
            case 'hbo':
                return new HBOHandler();
                break;
            default:
                return new AllSitesHandler(__video);
        }
    }
}