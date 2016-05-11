(function(window, undefined) {
    window.onload = function() {
        // util
        function $(tag) {
            return document.querySelector(tag);
        }

        // addEvent
        function addEvent(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.atttchEvent) {
                element.atttchEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        }

        var nodeList = [],
            treeRoot = $('.main'),
            timer = null;

        function deepSearch(node){
        	if(node!==null){
        		
        	}
        }
    }
}(window));
