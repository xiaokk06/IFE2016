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
            lock = false,
            timer = 300;

        function deepSearch() {
            var stack = [];
            (function recurse(currentNode) {
                if (currentNode !== null) {
                    stack.push(currentNode);
                    for (var i = 0; i < currentNode.children.length; i++) {
                        recurse(currentNode.children[i]);
                        // arguments.callee(currentNode.children[i]);
                    }
                    // callback ? callback(currentNode) : null;
                }
            })(treeRoot);
            nodeList = stack;
        }

        // animation function
        function animation(nodeList, keyword) {
            lock = true;
            var keyword = keyword || null;
            (function show() {
                var next = nodeList.shift();
                if (next) {
                    next.style.backgroundColor = "#3399CC";
                    setTimeout(function() {
                        if (!(next.firstChild.nodeValue.trim() == keyword)) {
                            next.style.backgroundColor = '#fff';
                            show();
                        }
                    }, timer);
                } else {
                    lock = false;
                }
            })();
        }

        addEvent($('.deepSearch'), 'click', function() {
            deepSearch();
            animation(nodeList);
        })
    }
}(window));
