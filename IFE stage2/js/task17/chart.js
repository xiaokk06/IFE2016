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
       function addEvent(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
       }
       
       // 根据类名获取元素
       function getElementByClassName(parent,clsName){
       	var oParent=parent?getElementById('parent'):document;
       	var result=[];
       	var obj=oParent.getElementsByTagName('*');
       	var len=obj.length;
       	for(var i=0;i<len;i++){
       		if(obj[i].className===clsName){
       			result.push(obj[i]);
       		}
       	}
       	return result;
       }

       var wrap=getElementByClassName("",'aqi-chart-wrap')[0];
       // console.log(wrap);
       var citySelect=document.getElementById('city-select');
       var gramSelect=document.getElementsByName('gra-time');

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

        var city=['北京','上海','广州','深圳','成都','西安','福州','厦门','沈阳'];

        // 添加城市
        function addCity(){
            var i=0,cityLen=aqiSourceData.size;
            console.log(cityLen);
            // for(;i<city.length;i++){
            //     var option=document.createElement('option');
            //     option.text=aqiSourceData[i];
            //     option.setAttribute('value',aqiSourceData[i]);
            //     citySelect.add(option);
            // }
        }

        var aqiSourceData = {
            "北京": randomBuildData(500),
            "上海": randomBuildData(300),
            "广州": randomBuildData(200),
            "深圳": randomBuildData(100),
            "成都": randomBuildData(300),
            "西安": randomBuildData(500),
            "福州": randomBuildData(100),
            "厦门": randomBuildData(100),
            "沈阳": randomBuildData(500)
        };

        // 用于渲染图表的数据
        var chartData = {};

        // 记录当前页面的表单选项
        var pageState = {
            nowSelectCity: -1,
            nowGraTime: "day"
        };

        /**
         * 渲染图表
         */
        function renderChart() {

        }

        /**
         * 日、周、月的radio事件点击时的处理函数
         */
        function graTimeChange() {
            // 确定是否选项发生了变化 
            var i=0,radioLen=gramSelect.length;
            for(;i<radioLen;i++){
                if(gramSelect[i].checked){
                    console.log(gramSelect[i].value);
                }
            }
            // 设置对应数据

            // 调用图表渲染函数
        }

        /**
         * select发生变化时的处理函数
         */
        function citySelectChange() {
            // 确定是否选项发生了变化 

            // 设置对应数据

            // 调用图表渲染函数
        }

        /**
         * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
         */
        function initGraTimeForm() {

        }

        /**
         * 初始化城市Select下拉选择框中的选项
         */
        function initCitySelector() {
            // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

            // 给select设置事件，当选项发生变化时调用函数citySelectChange

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
            addCity();
            initGraTimeForm();
            initCitySelector();
            initAqiChartData();
        }

        init();

    };
})(window);
