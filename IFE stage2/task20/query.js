(function(window, undefined) {
    window.onload = function() {
        var Input = document.getElementById("inputData"),
        keyword=document.getElementById('keyword'),
        query=document.getElementById('query'),
        insert=document.getElementById('insert');
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

        function insertData() {
            var Data = document.getElementById('inputData').value,
                resultArray = [];
            resultArray = Data.split(',\n.、');
            console.log(resultArray);
        }

        addEvent(insert,'click',inputData);

        init();
    };
})(window);
