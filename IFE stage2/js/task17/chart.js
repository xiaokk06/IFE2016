(function(window, undefined) {
    window.onload = function() {
        /* 数据格式演示
        var aqiSourceData = {
          "北京": {
            "2016-01-01": 10,
            "2016-01-02": 10,
            "2016-01-03": 10,
            "2016-01-04": 10
          }
        };
        */

        // 添加事件
        function addEvent(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        }

        function delegateEvent(pNode, cNode, type, handler) {
            addEvent(pNode, type, function() {
                var event = arguments[0] || window.event;
                // IE
                var target = event.target || event.srcElement;
                // console.log(event);
                // console.log(target);
                // console.log(target.tagName);
                // console.log(target && target.tagName);
                // console.log(cNode.toUpperCase());
                if (target && target.tagName === cNode.toUpperCase()) {
                    // console.log("OK");
                    handler.call(target, event);

                }
            });
        }

        // 根据类名获取元素
        function getElementByClassName(parent, clsName) {
            var oParent = parent ? getElementById('parent') : document;
            var result = [];
            var obj = oParent.getElementsByTagName('*');
            var len = obj.length;
            for (var i = 0; i < len; i++) {
                if (obj[i].className === clsName) {
                    result.push(obj[i]);
                }
            }
            return result;
        }


        var citySelect = document.getElementById('city-select');
        var timePicker = document.getElementsByTagName('input');
        // console.log(timePicker);
        var timeGram = document.getElementById('time-gram');

        // 以下两个函数用于随机模拟生成测试数据
        function getDateStr(dat) {
            var y = dat.getFullYear();
            var m = dat.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = dat.getDate();
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        }

        function randomBuildData(seed) {
            var returnData = {};
            var dat = new Date("2016-01-01");
            var datStr = '';
            for (var i = 1; i < 92; i++) {
                datStr = getDateStr(dat);
                returnData[datStr] = Math.ceil(Math.random() * seed);
                dat.setDate(dat.getDate() + 1);
            }
            return returnData;
        }

        // var city=['北京','上海','广州','深圳','成都','西安','福州','厦门','沈阳'];


        function getDataByInterval(Interval) {
            var Data = {},
                Num;
            var mark = "day";
            if (Interval === 7) {
                mark = "week";
                Num = Math.ceil(len / Interval);
            } else {
                mark = "month";
                Num = Math.floor(len / Interval);
            }
            var len = getObjectLen(chartData);
            // console.log(len);
            var amount = 0,
                i = 1,
                j = 1;
            for (var key in chartData) {
                // console.log(chartData[key]);
                if (i < len) {
                    if (i % Interval !== 0) {
                        amount += chartData[key];
                        i++;
                    } else if (i % Interval === 0) {
                        Data[j +'st  '+ mark] = Math.ceil((amount + chartData[key]) / Interval);
                        amount = 0;
                        i++;
                        j++;
                    }
                } else {
                    Data[Num + 'st  ' + mark] = Math.ceil(amount / Interval);
                }
            }
            return Data;
        }


        // 处理数据
        function dataHandler() {
            chartData = aqiSourceData[pageState.nowSelectCity];
            // console.log(chartData);
            switch (pageState.nowGraTime) {
                case "day":
                    return chartData;
                case "week":
                    return getDataByInterval(7);
                case "month":
                    return getDataByInterval(31);
            }
        }


        // 添加城市
        function addCity() {
            var i = 0,
                cityLen = city.length;
            for (; i < city.length; i++) {
                var option = document.createElement('option');
                option.text = city[i];
                option.setAttribute('value', city[i]);
                citySelect.add(option);
            }
        }


        var aqiSourceData = {
            "北京": randomBuildData(400),
            "上海": randomBuildData(300),
            "广州": randomBuildData(200),
            "深圳": randomBuildData(100),
            "成都": randomBuildData(300),
            "西安": randomBuildData(400),
            "福州": randomBuildData(100),
            "厦门": randomBuildData(100),
            "沈阳": randomBuildData(400)
        };

        // 添加城市
        function addAqiCity(city) {
            var type = typeof city;
            if (type === 'string') {
                addCity(city);
            } else if (type === 'object') {
                for (var i in city) {
                    var option = document.createElement('option');
                    option.text = i;
                    option.setAttribute('value', i);
                    citySelect.add(option);
                }
            } else {
                return false;
            }
        }

        // 用于渲染图表的数据
        var chartData = {};

        // 记录当前页面的表单选项
        var pageState = {
            nowSelectCity: "北京",
            nowGraTime: "day"
        };

        function getObjectLen(obj) {
            var type = typeof obj;
            if (type === 'string') {
                return obj.length;
            } else if (type === 'object') {
                var length = 0;
                for (var i in obj) {
                    length++;
                }
                return length;
            } else {
                return false;
            }
        }

        function getWidth(width, len) {
            var posObj = {};
            posObj.width = Math.floor(width / (len * 2));
            posObj.left = Math.floor(width / len);
            posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
            return posObj;
        }

        function getHintLfeft(posObj, i) {
            if (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 60 <= 0) {
                return 5;
            } else if (posObj.left * i + posObj.offsetLeft + posObj.width / 2 + 60 >= 1200) {
                return (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 110);
            } else {
                return (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 60);
            }
        }

        function getTitle() {
            switch (pageState.nowGraTime) {
                case "day":
                    return "每日";
                case "week":
                    return "周平均";
                case "month":
                    return "月平均";
            }
        }

        var colors = ['#3399CC', '#55DDFF', '#3366CC', '#5522FF', '#4499CC', '#66DDFF', '#33FFCC', '#55DDAA', '#1199CC', '#00DDFF'];

        /**
         * 渲染图表
         */
        function renderChart() {
            graTimeChange();
            citySelectChange();
            var wrap = getElementByClassName("", 'aqi-chart-wrap')[0];
            // console.log(wrap);
            var innerHTML = "",
                i = 0;
            var width = wrap.clientWidth;
            chartData = dataHandler();
            // console.log(chartData);
            var len = getObjectLen(chartData);
            // console.log(len);
            // console.log(pageState.nowGraTime);
            var posObj = getWidth(width, len);
            innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月" + getTitle() + "空气质量报告</div>";
            for (var key in chartData) {
                innerHTML += "<div class='aqi-bar " + pageState.nowGraTime + "'title='" + key + " AQI "+chartData[key]+"' style='height:" + chartData[key] + "px; width: " + posObj.width + "px; left:" + (posObj.left * i++ + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 10)] + "'></div>";
            }
            wrap.innerHTML = innerHTML;
        }

        /**
         * 日、周、月的radio事件点击时的处理函数
         */
        function graTimeChange() {
            var i = 0,
                radioLen = timePicker.length,
                chooseTime;
            for (; i < radioLen; i++) {
                if (timePicker[i].checked) {
                    // console.log(timePicker[i].value);
                    chooseTime = timePicker[i].value;
                    // 确定是否选项发生了变化 
                    if (chooseTime === pageState.nowGraTime) {

                    } else {
                        // 设置对应数据
                        pageState.nowGraTime = chooseTime;

                        // 调用图表渲染函数
                        renderChart();
                    }
                }
            }
        }

        /**
         * select发生变化时的处理函数
         */
        function citySelectChange() {
            var i = 0,
                options = citySelect.getElementsByTagName('option'),
                chooseCity;
            optionLen = options.length;
            for (; i < optionLen; i++) {
                if (options[i].selected) {
                    // console.log(options[i].value);
                    // pageState.nowGraTime = options[i].value;
                    chooseCity = options[i].value;
                    // 确定是否选项发生了变化 
                    if (chooseCity === pageState.nowSelectCity) {
                        // 
                    } else {
                        // 设置对应数据
                        pageState.nowSelectCity = chooseCity;
                        chartData = aqiSourceData[chooseCity];
                        // console.log(chartData);
                        // 调用图表渲染函数
                        renderChart();
                    }
                }
            }

        }

        /**
         * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
         */
        function initGraTimeForm() {
            delegateEvent(timeGram, 'input', 'click', graTimeChange);
        }

        /**
         * 初始化城市Select下拉选择框中的选项
         */
        function initCitySelector() {
            // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
            addAqiCity(aqiSourceData);
            // 给select设置事件，当选项发生变化时调用函数citySelectChange
            // 直接在select上绑定事件即可 没有必要添加事件委托
            // delegateEvent(citySelect,'option','click',citySelectChange);
            addEvent(citySelect, 'change', citySelectChange);
        }

        /**
         * 初始化图表需要的数据格式
         */
        function initAqiChartData() {
            // 将原始的源数据处理成图表需要的数据格式
            // 处理好的数据存到 chartData 中
        }

        /**
         * 初始化函数
         */
        function init() {
            initGraTimeForm();
            initCitySelector();
            initAqiChartData();
        }

        init();
        renderChart();

    };
})(window);
