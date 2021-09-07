export default class PageMonitor {

    constructor(handlePageUpdate) {
        this.enableRefresh = true;

        this.init(handlePageUpdate);
    }



    init(handlePageUpdate) {
        var observer = new MutationObserver(function(mutations) {

            if (this.enableRefresh == undefined) {
                this.enableRefresh = true;
            }

            //console.log('enableRefresh', this.enableRefresh);

            if (this.enableRefresh == true) {

                //console.log("Page Monitor: Refreshing!");
                handlePageUpdate();

                this.enableRefresh = false;

                //console.log('Setting timer...');
                var _this = this;
                setTimeout(function() {
                    _this.enableRefresh = true;
                }, 1000)
            }
        });

        var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        };

        observer.observe(document.body, config);
    }

}