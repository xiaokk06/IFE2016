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

        // 可以实现添加数据但是没有足够简洁
        // function loopInsert(arr) {
        //     var arrLen = arr.length,
        //         i = 0,
        //         innerHTML = "";
        //     console.log(arrLen);
        //     for (; i < arrLen; i++) {
        //         innerHTML += "<div class='newElement'>" + arr[i] + "</div>";
        //     }
        //     wrap.innerHTML += innerHTML;
        // }

        function search() {
            var word = keyword.value.trim();
            render(word);
        }

        // 当传入参数为空时可以直接进行数据的添加 当传入参数为查询字符串时可以通过map方法来对每一项
        // 进行查询 然后将匹配项替换为高亮标记的文本
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
