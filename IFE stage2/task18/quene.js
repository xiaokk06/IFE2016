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
            quene = document.getElementById('quene');



        function checkInput() {
            var val = Data.value;
            // console.log(val);
            var trimStr = trim(val);
            // console.log(trimStr);
            if (trimStr) {
                if (/^[0-9]*$/.test(trimStr)) {
                    return trimStr;
                } else {
                    alert("your input is not suitable , please try again");
                    return false;
                }
            } else {
                alert("please input a num!");
                return false;
            }
        }


        // function leftIn
        function leftInQuene() {
            var inputVal = checkInput();
            if (inputVal) {
                var newLi = document.createElement('li');
                newLi.innerHTML = inputVal;
                quene.insertBefore(newLi, quene.childNodes[0]);
                Data.value = "";
            }
        }

        // function rightIn
        function rightInQuene() {
            var inputVal = checkInput();
            if (inputVal) {
                var newLi = document.createElement('li');
                newLi.innerHTML = inputVal;
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

        function leftOutQuene(){
            if (checkUlEmpty()) {
                var liNodes = quene.getElementsByTagName('li'),
                    liLen = liNodes.length;
                quene.removeChild(liNodes[0]);
            }
        }

        addEvent(leftIn, 'click', leftInQuene);
        addEvent(rightIn, 'click', rightInQuene);
        addEvent(rightOut, 'click', rightOutQuene);
        addEvent(leftOut,'click',leftOutQuene);
    };
})(window);
