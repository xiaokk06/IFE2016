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

        // deep search
        function deepSearch() {
            var stack = [];
            (function recurse(currentNode) {
                if (currentNode !== null) {
                    stack.push(currentNode);
                    for (var i = 0; i < currentNode.children.length; i++) {
                        // recurse(currentNode.children[i]);
                        // Recursion
                        arguments.callee(currentNode.children[i]);
                    }
                    // callback ? callback(currentNode) : null;
                }
            })(treeRoot);
            nodeList = stack;
        }

        // wide search
        function wideSearch() {
        	reset();
            // need a queue to store parentNode
            // so that other childNode can be pushed into the nodeList stack
            var queue = [],
                currentNode = treeRoot;
            nodeList = [];
            nodeList.push(currentNode);
            while (currentNode) {
                var length = currentNode.children.length;
                for (var i = 0; i < length; i++) {
                    queue.push(currentNode.children[i]);
                }
                // callback ? callback(currentNode) : null;
                currentNode = queue.shift();
                nodeList.push(currentNode);
            }
        }

        // animation function
        function animation(nodeList, keyword) {
        	reset();
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

        function checkInput() {
            return $('.keyword').value.trim();
        }

        function reset() {
            nodeList = [];
            clearInterval(timer);
            var divs = document.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                divs[i].style.backgroundColor = '#fff';
            }
        }

        addEvent($('.deepSearch'), 'click', function() {
            deepSearch();
            animation(nodeList);
        });

        addEvent($('.wideSearch'), 'click', function() {
            wideSearch();
            animation(nodeList);
        });

        addEvent($('.query'), 'click', function() {
            var keyword = checkInput();
            if (keyword) {
                deepSearch();
                animation(nodeList, keyword);
            } else {
                alert("No Found!");
            }
        })
    }
}(window));
