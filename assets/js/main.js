window.onload = function() {
    'use strict';

    const chromep = new ChromePromise();

    var currentTab = new Promise(
        function(res, rej){
            chromep.tabs.query({active: true, lastFocusedWindow: true}).then(
                function(tab){
                    console.log(tab);
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
                    if(resC[attr]) return res(resC[attr]);
                    switch(attr){
                        case 'location':
                            chromep.tabs.detectLanguage(resC.id).then(
                                function(resL){
                                    return res(window.languages[resL]);
                                }
                            );
                            // getAttrByTab()
                            // console.log(.en);
                            break;
                    }
                    console.log(attr);
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
