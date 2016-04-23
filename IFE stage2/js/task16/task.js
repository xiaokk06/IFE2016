(function(window, undefined) {
    window.onload = function() {

        /**
         * 去除输入的空格字符
         */
        function trim(str) {
            if (str && typeof str === "string") {
                return str.replace(/(^\s*)|(\s*)$/g, ""); //去除前后空白符
                // 兼容中文空格和实体空格
                // return str.replace(/ /^[\s\u3000\u00A0]+|[\s\u3000\u00A0]+$/g, "");
            }
        }

        /**
         * aqiData，存储用户输入的空气指数数据
         */
        var aqiData = {};
        var canAdd = false;
        var city = document.getElementById('aqi-city-input');
        var aqiValue = document.getElementById('aqi-value-input');
        var addBtn = document.getElementById('add-btn');
        var aqiTable = document.getElementById('aqi-table');
        // var aqiTbody=document.getElementsByTagName('tbody')[0];
        // console.log(aqiTbody);
        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {
            // console.log(typeof aqiValue.value);
            if (cityHandle(city.value) && valueHandle(aqiValue.value)) {
                for (var prop in aqiData) {
                    if (prop == city.value) {
                        alert("该城市已存在，请重新输入！");
                        city.value = "";
                        aqiValue.value = "";
                        return false;
                    }
                }
                aqiData[city.value] = aqiValue.value;
                canAdd = true;
                // console.log(aqiData);
            } else {
                return false;
            }
        }

        /**
         * 渲染aqi-table表格
         */
        function renderAqiList() {
            // console.log(aqiData);
            if (canAdd) {
                aqiTable.innerHTML += "<tr><td>" + city.value + "</td><td>" + aqiValue.value + "</td><td><button>删除</button></td>";
                city.value = "";
                aqiValue.value = "";
                canAdd = false;
            } else {

            }
            // aqiTbody.innerHTML="";
            // for (var prop in aqiData) {
            //     aqiTbody.innerHTML += "<tr><td>" + prop + "</td><td>" + aqiData[prop] + "</td><td><button>删除</button></td>";
            // }
        }

        /**
         * 点击add-btn时的处理逻辑
         * 获取用户输入，更新数据，并进行页面呈现的更新
         */
        function addBtnHandle() {
            addAqiData();
            renderAqiList();
        }

        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle() {
            var deleteRow = this.parentNode.parentNode;
            var tbody = deleteRow.parentNode;
            // console.log(deleteRow);
            var deleteCity = this.parentNode.parentNode.children[0].innerHTML;
            tbody.remove(deleteRow);
            for (var attr in aqiData) {
                if (deleteCity === attr) {
                    delete aqiData[attr];
                }
            }

            // renderAqiList();
        }

        // 处理城市名称输入是否合法
        function cityHandle(str) {
            // console.log(city.value);
            if (!trim(str)) {
                alert("输入城市为空，请输入一个城市");
                return false;
            }
            var trim_str = trim(str);
            // console.log(trim_str);
            var reg_eng = /[^a-zA-Z]/g;
            var reg_chi = /[^\u4e00-\u9fa5]/;
            if (!reg_chi.test(trim_str) || !reg_eng.test(trim_str)) {
                return true;
            } else {
                alert("请输入由英文字母或中文组成的城市名");
                return false;
            }
        }
        // 处理空气质量指数输入是否合法
        function valueHandle(str) {
            // console.log(str);
            if (!trim(str)) {
                alert("输入城市空气质量为空，请输入一个数值");
                return false;
            }
            var trim_str = parseInt(trim(str));
            var reg_value = /\d/;
            if (reg_value.test(trim_str)) {
                return true;
            } else {
                alert("请输入合法的空气质量数值");
            }
        }

        // 跨浏览器事件处理
        var eventUtil = {
            // 添加句柄
            addHandler: function(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler);
                } else {
                    // element.'on'+type
                    // 连接属性时可以用.的时候都可以用中括号
                    // 不能用.连接字符串
                    element['on' + type] = handler;
                }
            },
            // 删除句柄
            removeHandler: function(element, type, handler) {
                if (element.addEventListener) {
                    element.removeEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.detachEvent('on' + type, handler);
                } else {
                    // element.'on'+type
                    // 连接属性时可以用.的时候都可以用中括号
                    // 不能用.连接字符串
                    element['on' + type] = null;
                }
            }
        };

        // 添加委托事件
        function delegateEvent(element, tag, type, handle) {
            eventUtil.addHandler(element, type, function() {
                // 事件对象会作为参数传递给时间处理函数 evnet===arguments[0]
                var event = arguments[0] || window.event,
                    // 判断IE兼容性
                    target = event.target || event.srcElement;
                if (target && target.tagName === tag.toUpperCase()) {
                    handle.call(target, event);
                }
            });
        }


        function init() {

            // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            eventUtil.addHandler(addBtn, "click", addBtnHandle);
            // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
            delegateEvent(aqiTable, 'button', "click", delBtnHandle);
        }



        init();
    };
})(window);
