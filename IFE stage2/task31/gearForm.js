/**
 * author by xiaokk06
 * 2016/08/24
 * 表单联动插件 手动实现angular功能
 * 只要数据格式是定义的标准格式就可以实现表单联动
 * 因为IE9及一下版本的change事件不冒泡 所以并不支持
 *
 * 利用事件捕获时候IE8并不支持addEventListener
 * 所以兼容性也只比上一种做法多了一个IE9
 *
 * 初始化时手动触发select的onchange事件 兼容性依然IE8
 * 所以放心使用querySelctor方法 因为兼容性还是在IE8这里
 */

/**
 * 实际中这里的数据除第一个select之外都应该动态获取
 * 或者是直接由服务器一次性返回存储在浏览器端
 * @type {Object}
 */
var data = {
    city: {
        bj: '北京',
        sh: '上海',
        hz: '杭州'
    },
    bj: {
        bj_university: '大学',
        bj_highScool: '高中'
    },
    sh: {
        sh_university: '大学',
        sh_highScool: '高中'
    },
    hz: {
        hz_university: '大学',
        hz_highScool: '高中'
    },
    bj_university: ["北京大学", "清华大学", "北京航空航天大学"],
    bj_highScool: ['北京四中', '北京五中'],
    sh_university: ["复旦大学", "上海交通大学", "同济大学"],
    sh_highScool: ['上海第一中学', '交大附中'],
    hz_university: ["浙江大学", "杭州电子科技大学", "浙江工业大学"],
    hz_highScool: ['杭州第一中学', '杭州附中'],
}


/**
 * 联动表单封装 
 * 使用单例模式比较适合
 */
var formGear = function() {
    var formgear = new EventTarget();

    /**
     * 获取元素索引 
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    function getIndex(element) {
        var index = 0,
            preElement = element.previousElementSibling;
        while (preElement && preElement.tagName.toUpperCase() === 'SELECT') {
            index++;
            preElement = preElement.previousElementSibling;
        }
        return index;
    };

    function handlerEvent(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        // console.log(target);
        if (target.tagName.toLowerCase() === 'select') {
            var selected = target.options[target.selectedIndex].value,
                nextElement = target.nextElementSibling;
            while (nextElement && nextElement.tagName.toLowerCase() === 'select') {
                var selecteData = data[selected];
                /**
                 * 这里的instanceof方法后面接Array或者Object都是true
                 * 因为Array也是Object实例的关系
                 * 要判断一个对象是否未数组可以使用 Array.isArray(object)
                 * 要得到一个对象的实例类型可以使用Object.prototype.toString.call(object)来获取
                 *
                 * Object.prototype.toString.call(data[selected]).slice(8,-1).toLowerCase() 获取对象类型的工具函数
                 */
                // console.log(data[selected] instanceof Array);  //true
                // console.log(data[selected] instanceof Object); //true
                nextElement.options.length = 0;
                if (Array.isArray(selecteData)) {
                    for (var i = 0; i < selecteData.length; i++) {
                        var opt = document.createElement('option');
                        opt.value = selecteData[i];
                        opt.innerHTML = selecteData[i];
                        nextElement.appendChild(opt);
                    }
                } else if (Object.prototype.toString.call(selecteData).slice(8, -1).toLowerCase() === 'object') {
                    for (i in selecteData) {
                        var opt = document.createElement('option');
                        opt.value = i;
                        opt.innerHTML = selecteData[i];
                        nextElement.appendChild(opt);
                    }
                } else {

                }
                selected = nextElement.options[0].value;
                nextElement = nextElement.nextElementSibling;
            }
        } else {

        }

    };

    formgear.initForm = function() {
        /*
         * 应该在绑定了监听事件之后进行初始化操作
         * 这样可以将其他表单也初始化
         * 在IE下第一个表单的值无法改变
         * 但是其他表单的初始化事件完成
         *
         *解决方案
         *把初始化操作放在window.onload方法里面执行就可以解决ie下不显示新值得问题
         * 
         */
        var select = document.querySelector('select');
        select.options.length = 0;
        var originData = data['city'];
        for (i in originData) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = originData[i];
            select.appendChild(opt);
        }
        /**
         * 触发定义的select的change事件完成初始表单的自动填充
         * 兼容性依然之于IE8
         * @type {[type]}
         */
        var ev = document.createEvent('HTMLEvents');
        ev.initEvent('change', true, false);
        select.options[0].selected = true;
        select.dispatchEvent(ev);
        // select.value = select.options[0].value;
        // console.log(select.options[0].value);
        // console.log(select.options[select.selectedIndex]);
    };

    formgear.enable = function() {
        // EventUtil.addHandler(document, 'change', handlerEvent);
        document.addEventListener('change', handlerEvent, true);
        formgear.initForm();
    };

    formgear.disable = function() {
        // EventUtil.removeHandler(document, 'change', handlerEvent);
        document.removeEventListener('change', handlerEvent, true);

    }

    return formgear;
}
