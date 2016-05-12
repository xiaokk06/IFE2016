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

        function Treewalker() {
            // not necessary
            var filter = function(node) {
                return node.tagName.toLowerCase() === 'div' ?
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            };
            var walker = document.createTreeWalker(treeRoot, NodeFilter.SHOW_ELEMENT, filter, false);
            var node = walker.nextNode();
            while (node !== null) {
                //put the tag into a stack
                nodeList.push(node);
                node = walker.nextNode();
            }
        }

        function NodeIterator() {
            var iterator = document.createNodeIterator(treeRoot, NodeFilter.SHOW_ELEMENT, null, false);
            var node = iterator.nextNode();
            while (node !== null) {
                //put the tag into a stack
                nodeList.push(node);
                node = iterator.nextNode();
            }
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
            console.log(lock);
            if (lock) {
                alert("Searching now!");
                return;
            } else {
                var supportsTraversals = document.implementation.hasFeature('Traversals', '2.0');
                var supportNodeIterator = (typeof document.createNodeIterator === 'function');
                var supportTreeWalker = (typeof document.createTreeWalker === 'function');
                // console.log(supportsTraversals);
                // console.log(supportNodeIterator);
                // console.log(supportTreeWalker);
                if (supportsTraversals) {
                    if (supportTreeWalker) {
                        Treewalker();
                    } else if (supportNodeIterator) {
                        NodeIterator();
                    } else {
                        deepSearch();
                    }
                } else {
                    deepSearch();
                }
                animation(nodeList);
            }
        });

        addEvent($('.wideSearch'), 'click', function() {
            if (lock) {
                alert("Searching now!");
                return;
            } else {
                wideSearch();
                animation(nodeList);
            }
        });

        addEvent($('.query'), 'click', function() {
            if (lock) {
                alert("Searching now!");
                return;
            } else {
                var keyword = checkInput();
                if (keyword) {
                    deepSearch();
                    animation(nodeList, keyword);
                } else {
                    alert("No Found!");
                }
            }
        })
    }
}(window));
