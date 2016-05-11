// make window local to search faster and protect undefined
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

        //前序遍历
        // 这里是采用递归的方式 先根据前序遍历将所有节点排序
        // 将排序后的节点存在数组中 
        function preOrder(node) {
            if (!(node == null)) {
                nodeList.push(node);
                preOrder(node.firstElementChild);
                preOrder(node.lastElementChild);
            }
        }

        //中序遍历
        function inOrder(node) {
            if (!(node == null)) {
                inOrder(node.firstElementChild);
                nodeList.push(node);
                inOrder(node.lastElementChild);
            }
        }

        //后序遍历
        function postOrder(node) {
            if (!(node == null)) {
                postOrder(node.firstElementChild);
                postOrder(node.lastElementChild);
                nodeList.push(node);
            }
        }


        //颜色变化函数
        function changeColor() {
            var i = 0;
            nodeList[i].style.backgroundColor = 'blue';
            timer = setInterval(function(argument) {
                i++;
                if (i < nodeList.length) {
                    nodeList[i - 1].style.backgroundColor = '#fff';
                    nodeList[i].style.backgroundColor = 'blue';
                } else {
                    clearInterval(timer);
                    nodeList[nodeList.length - 1].style.backgroundColor = '#fff';
                }
            }, 500)
        }

        //初始化样式
        function reset() {
            nodeList = [];
            clearInterval(timer);
            var divs = document.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                divs[i].style.backgroundColor = '#fff';
            }
        }

        addEvent($('.first'), 'click', function() {
            reset();
            preOrder(treeRoot);
            changeColor();
        });

        addEvent($('.middle'), 'click', function() {
            reset();
            inOrder(treeRoot);
            changeColor();
        });

        addEvent($('.last'), 'click', function() {
            reset();
            postOrder(treeRoot);
            changeColor();
        });

    };
})(window);
