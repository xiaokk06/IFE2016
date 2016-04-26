(function(window, undefined) {
    // addEvent
    function addEvent(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    // trim
    function trim(str) {
        if (str && typeof str === "string") {
            return str.replace(/(^\s*)|(\s*)$/g, ""); //去除前后空白符
        }
    }


    window.onload = function() {
        // get the elements
        var leftIn = document.getElementById('leftIn'),
            rightIn = document.getElementById('rightIn'),
            leftOut = document.getElementById('leftOut'),
            rightOut = document.getElementById('rightOut'),
            Data = document.getElementById('Data'),
            randomData = document.getElementById('random'),
            sortData = document.getElementById('sort'),
            quene = document.getElementById('quene');



        function checkInput() {
            var val = Data.value;
            // console.log(val);
            var trimStr = trim(val);
            // console.log(trimStr);
            if (trimStr) {
                if (parseInt(trimStr) <= 100 && parseInt(trimStr) > 0) {
                    if (/^[0-9]+$/.test(trimStr)) {
                        return parseInt(trimStr);
                    } else {
                        alert("your input is not suitable , please try again");
                        Data.value = "";
                        return false;
                    }
                } else {
                    alert("please input a num between 0 and 100");
                    Data.value = "";
                    return false;
                }
            } else {
                alert("please input a num!");
                Data.value = "";
                return false;
            }
        }


        // function leftIn
        function leftInQuene() {
            var inputVal = checkInput();
            if (inputVal) {
                var newLi = document.createElement('li');
                // newLi.innerHTML = inputVal;
                newLi.style.height = inputVal * 3 + 'px';
                newLi.style.left = '0';
                newLi.style.backgroundColor = colors[Math.floor(Math.random() * 10)];
                var cNode = quene.getElementsByTagName('li'),
                    cLen = cNode.length;
                // console.log(cNode);
                if (cLen > 0) {
                    for (var i = 0; i < cLen; i++) {
                        cNode[i].style.left = 25 * (i + 1) + 'px';
                    }
                }
                quene.insertBefore(newLi, quene.childNodes[0]);
                Data.value = "";
            }
        }

        // function rightIn
        function rightInQuene() {
            var inputVal = checkInput();
            if (inputVal) {
                var newLi = document.createElement('li');
                // newLi.innerHTML = inputVal;
                var cNode = quene.getElementsByTagName('li'),
                    cLen = cNode.length;
                newLi.style.height = inputVal * 3 + 'px';
                newLi.style.left = 25 * cLen + 'px';
                newLi.style.backgroundColor = colors[Math.floor(Math.random() * 10)];
                quene.appendChild(newLi);
                Data.value = "";
            }
        }

        function checkUlEmpty() {
            if (quene.getElementsByTagName('li').length === 0) {
                alert("you should add some elements first");
                return false;
            } else {
                return true;
            }
        }


        function rightOutQuene() {
            if (checkUlEmpty()) {
                var liNodes = quene.getElementsByTagName('li'),
                    liLen = liNodes.length;
                quene.removeChild(liNodes[liLen - 1]);
            }
        }

        function leftOutQuene() {
            if (checkUlEmpty()) {
                quene.removeChild(quene.getElementsByTagName('li')[0]);
                var liNodes = quene.getElementsByTagName('li'),
                    liLen = liNodes.length;
                for (var i = 0; i < liLen; i++) {
                    liNodes[i].style.left = 25 * i + 'px';
                }
            }
        }

        var colors = ['#3399CC', '#55DDFF', '#3366CC', '#5522FF', '#4499CC', '#66DDFF', '#33FFCC', '#55DDAA', '#1199CC', '#00DDFF'];

        // random create data
        function randCreate() {
            // var innerHTML = "";
            quene.innerHTML = "";
            for (var i = 0; i < 20; i++) {
                var Num = Math.ceil(Math.random() * 100);
                var newLi = document.createElement('li');
                var liStyle = newLi.style;
                liStyle.left = 25 * i + 'px';
                liStyle.height = Num * 3 + 'px';
                liStyle.backgroundColor = colors[Math.floor(Math.random() * 10)];
                quene.appendChild(newLi);

                // innerHTML += "<li style='height:" + Num * 3 + "px; width: 20px;  background-color:" + colors[Math.floor(Math.random() * 10)] + "'></li>";
            }
            // quene.innerHTML = innerHTML;
        }

        // 这种排序方法有局限性 最小的元素被加在ul末尾 之后调用rightOutQuene会发生错误
        // function propSort() {
        //     var liNodes = quene.getElementsByTagName('li'),
        //         liLen = liNodes.length;
        //     // console.log(parseInt(maxHeight));

        //     for (; liLen > 0; liLen--) {
        //         var j = 0;
        //         var maxHeight = parseInt(liNodes[0].style.height);

        //         for (var i = 1; i < liLen; i++) {
        //             var nextHeight = parseInt(liNodes[i].style.height);

        //             if (nextHeight > maxHeight) {
        //                 maxHeight = nextHeight;
        //                 j = i;
        //             }
        //         }
        //         console.log(j);
        //         var k = j;
        //         var Node = liNodes[j++];
        //         console.log(liNodes[j].style.left);
        //         for (; j < liLen; j++) {
        //             liNodes[j].style.left = 25 * (j - 1) + 'px';
        //         }

        //         quene.removeChild(liNodes[k]);
        //         quene.appendChild(Node);
        //         Node.style.left = 25 * (liLen - 1) + 'px';
        //     }
        // }

        function propSort() {
            var liNodes = quene.getElementsByTagName('li'),
                liLen = liNodes.length;
                //这里实际就是使用setTimeout来为之后的arguments.callee能够调用提供方法，可以使用方法来替代
            setTimeout(function() {
                if (liLen > 0) {
                    for (var j = 0; j < liLen - 1; j++) {
                        if (parseInt(liNodes[j].style.height) > parseInt(liNodes[j + 1].style.height)) {
                            var arg = liNodes[j + 1].style.height;
                            liNodes[j + 1].style.height = liNodes[j].style.height;
                            liNodes[j].style.height = arg;
                        }
                    }
                    liLen--;
                    setTimeout(arguments.callee, 300);
                }
            }, 10);

        }


        addEvent(leftIn, 'click', leftInQuene);
        addEvent(rightIn, 'click', rightInQuene);
        addEvent(rightOut, 'click', rightOutQuene);
        addEvent(leftOut, 'click', leftOutQuene);
        addEvent(randomData, 'click', randCreate);
        addEvent(sortData, 'click', propSort);
    };
})(window);
