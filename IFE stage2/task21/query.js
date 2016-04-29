// 因为 ecmascript 执行JS代码是从里到外，因此把全局变量window或jQuery对象传进来，
// 就避免了到外层去寻找，提高效率。undefined在老一辈的浏览器是不被支持的，直接使用会报错，
// js框架要考虑到兼容性，因此增加一个形参undefined。
// 还有，不要用window.undefined传递给形参，有可能window.undefined被其他人修改了，
// 最好就是甚么都不传，形参的undefined就是真正的undefined了
// 在Ecmascript 3中，undefined是可变的，不是关键字，这意味着它的值可以被覆盖或者重新赋值。
// 如undefined = true。值得庆幸的是在ECMASCRIPT 5严格模式（’use strict';）中解析器将抛出一个类型错误。
// 因此我们需要保护我们的undefined,
// var undefined = 8;  
// (function( window ) {   
//     alert(window.undefined); // 8  
//     alert(undefined); // 8  
// })(window);  
// 以上代码就可以修改window.undefined从而导致访问不到真正的undefined
(function(window, undefined) {
    window.onload = function() {
        var Input = document.getElementById("inputData"),
            insert = document.getElementById('insert'),
            craftWrap=document.querySelector('.craftTag');
            console.log(craftWrap);

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
            // 多个分隔符使用正则表达式即可 中括号内直接写
            // 换行\n tab\t \,\，分别为英文和中文的逗号 即半角和全角 空格可以直接用空格表示
            resultArray = Data.split(/[ ,\n.\，、\t\ ]/);
            console.log(resultArray);
            // loopInsert(resultArray);
            craftWrap.innerHTML=resultArray.map(function(item) {
                return "<div class='crTag'>"+item+"</div>";
            }).join('');

            Input.value = "";

        }

        addEvent(insert, 'click', insertData);

        init();
    };
})(window);
