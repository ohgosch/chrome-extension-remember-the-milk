(function() {
    'use strict';

    fillForm();
    function fillForm(){
        inputList(
            function(inputs){
                inputs.forEach(
                    function(el){
                        if(el.name == 'location') return;
                        setAttr(el, function(error){
                            console.log(error);
                        });
                    }
                );
            }
        );
    }

    /**
     * @callback callback
     * @param {boolean} error
     * @param {tab} tab
     */
    function currentTab(callback) {
        var hasTab = false;
        debugger
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab){
            hasTab = true;
            callback(false, tab[0]);
        });
        if(!hasTab) callback(true, null);
    }

    /**
     *
     * @callback
     *
     */
    function inputList(callback) {
        callback(document.querySelectorAll('input'));
    }

    function setAttr(element, callback) {
        getAttrByTab(
            element,
            function(error, attr){
                if(error) {
                    callback(error);
                } else {
                    element.value = attr;
                    callback(false);
                }

            }
        );
    }

    function getAttrByTab(attr, callback){
        currentTab(
            function(error, tab){
                if(error) {
                    return callback(error, null);
                }
                debugger
                if(!tab[attr]){
                    callback(true, null);
                } else {
                    callback(false, tab[attr]);
                }
            }
        )
    }
})();
