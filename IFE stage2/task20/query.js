(function(window, undefined) {
    window.onload = function() {
        var Input = document.getElementById("inputData"),
            keyword = document.getElementById('keyword'),
            query = document.getElementById('query'),
            insert = document.getElementById('insert'),
            wrap = document.getElementById('wrap');
        // console.log(Input);


        function init() {
            Input.style.height = 60 + 'px';
            Input.style.width = 200 + 'px';
        }

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

        var resultArray = [];


        function insertData() {
            var Data = Input.value.trim();
            resultArray = Data.split(/[ ,\n.\，、\t\ ]/);
            console.log(resultArray);
            // loopInsert(resultArray);

            render();

            Input.value="";

        }

        function loopInsert(arr) {
            var arrLen = arr.length,
                i = 0,
                innerHTML = "";
            console.log(arrLen);
            for (; i < arrLen; i++) {
                innerHTML += "<div class='newElement'>" + arr[i] + "</div>";
            }
            wrap.innerHTML += innerHTML;
        }

        function search() {
            var word = keyword.value.trim();
            render(word);
        }

        function render(str) {
            wrap.innerHTML = resultArray.map(function(d) {
                if (str != null && str.length > 0) {
                    d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
                }
                return '<div>' + d + '</div>';
            }).join('');
        }

        addEvent(insert, 'click', insertData);
        addEvent(query, 'click', search);

        init();
    };
})(window);
