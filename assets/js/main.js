window.onload = function() {
    'use strict';

    const chromep = new ChromePromise();

    var currentTab = new Promise(
        function(res, rej){
            chromep.tabs.query({active: true, lastFocusedWindow: true}).then(
                function(tab){
                    res(tab[0]);
                }
            );
        }
    );

    var inputList = function(){
        return document.querySelectorAll('input');
    }

    var setAttr = function(element, attr){
        getAttrByTab(attr).then(
            function(res){
                element.value = res;
            }
        );
    }

    var getAttrByTab = function(attr){
        return new Promise(function(res, rej){
            currentTab.then(
                function(resC, rejC){
                    if(!resC) return;
                    if(resC[attr]) return res(resC[attr]);
                    switch(attr){
                        case 'location':
                            chromep.tabs.detectLanguage(resC.id).then(
                                function(resL){
                                        if(resL != 'und')
                                            return res(window.languages[resL]);
                                    }
                                );
                            break;
                    }
                }
            );
        });
    }

    var fillForm = function(){
        inputList().forEach(function(el){
            setAttr(el, el.name);
        });
    }

    fillForm();
};
