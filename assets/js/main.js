(function() {
    'use strict';

    var currentTab = function(callback){
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab){
            console.log('tentando');
            return callback({error: false, content: tab[0]});
        });
    }

    var inputList = function(){
        return document.querySelectorAll('input');
    }

    var setAttr = function(element, attr){
        var val = getAttrByTab(attr);
        if(val.error) return val;

        return element.value = attr.content;
    }

    var getAttrByTab = function(attr){
        currentTab(function(error, content){
            if(error) return {error: true};

            return {error: false, content: content};
        });
    }

    var fillForm = function(){
        inputList().forEach(function(el){
            setAttr(el, el.name);
        });
    }

    fillForm();
})();
