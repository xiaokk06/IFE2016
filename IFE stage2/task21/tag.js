// 传入window
(function(window, undefined) {
    window.onload = function() {
        var Input = document.getElementById("inputData"),
            insert = document.getElementById('insert'),
            // wrap=document.querySelector('.wrap'),
            craftWrap = document.querySelector('.craftTag');
        // test querySelector function
        // console.log(craftWrap);
        // console.log($('.wrap'));

        function init() {
            Input.style.height = 100 + 'px';
            Input.style.width = 240 + 'px';
        }

        // seal the querySelector function as a tool
        function $(tag) {
            // 返回当前文档中第一个匹配特定选择器的元素（使用深度优先，前序遍历规则遍历所有文档节点）
            return document.querySelector(tag);
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

        // delegate Event
        function delegateEvent(oParent, oChild, type, handler) {
            addEvent(oParent, type, function() {
                var event = arguments[0] || window.event;
                target = event.target || event.srcElement;
                if (target && target.tagName == oChild.toUpperCase()) {
                    handler.call(target, event);
                }
            });
        }

        var resultArray = [],
            tagObj = [];

        function getCurElements(element){
            tagObj = [];
            var auTags=element.getElementsByTagName('div'),len=auTags.length;
            for(var i=0;i<len;i++){
                tagObj.push(auTags[i].innerHTML);
            }
            return tagObj;
        }


        function autoInsert(event) {
            // console.log(event);
            var autoData = $('#tag').value;
            if (/[,，;；、\s\n]+/.test(autoData) || event.keyCode == 13) {
                var data = autoData.split(/[ ,\n\，、\s;；.。]/),
                    newTag = data[0],
                    tagObj=getCurElements($('.autoTag'));
                if (tagObj.indexOf(newTag) === -1) {
                    tagObj.push(newTag);
                    if (tagObj.length > 10) {
                        tagObj.shift();
                    }
                }
                $('.autoTag').innerHTML = tagObj.map(function(item) {
                    return "<div class='auTag'>" + item + "</div>";
                }).join('');
                $('#tag').value = "";
            }
        }


        function insertData() {
            var Data = Input.value.trim();
            // 多个分隔符使用正则表达式即可 中括号内直接写
            // 换行\n tab\t \,\，分别为英文和中文的逗号 即半角和全角 空格可以直接用空格表示
            var data = Data.split(/[ ,\n.\，、\t\ ]/),len=data.length;
            resultArray=getCurElements($('.craftTag'));
            for(var i=0;i<len;i++){
                if(resultArray.indexOf(data[i])===-1){
                    resultArray.push(data[i]);
                }
            }
            // console.log(resultArray);
            // loopInsert(resultArray);
            craftWrap.innerHTML = resultArray.map(function(item) {
                return "<div class='crTag'>" + item + "</div>";
            }).join('');
            Input.value = "";
        }

        function removeTag() {
            // console.log(this.parentNode);
            this.parentNode.removeChild(this);
        }



        addEvent(insert, 'click', insertData);
        addEvent($('#tag'),'keyup',autoInsert);
        delegateEvent($('.craftTag'), 'div', 'click', removeTag);
        delegateEvent($('.autoTag'), 'div', 'click', removeTag);



        init();
    };
})(window);
