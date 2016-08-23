/**
 * 表单验证插件
 */

var Validate = function() {

    var validate = new EventTarget();

    var tips = {
        name: {
            origin: '必填，长度为4-16个字符',
            empty: '名称不能为空',
            error: '格式错误',
            correct: '名称可用'
        },
        password: {
            origin: '6到16位数字和字母',
            empty: '密码不能为空',
            error: '格式错误',
            correct: '密码可用'
        },
        rePassword: {
            origin: '必填，必须与密码相同',
            empty: '密码不能为空',
            error: '密码和上次输入不一致',
            correct: '密码可用'
        },
        email: {
            origin: 'example@haha.com',
            empty: '邮箱不能为空',
            error: '邮箱格式错误',
            correct: '邮箱可用'
        },
        phone: {
            origin: '请输入11位手机号码',
            empty: '手机号不能为空',
            error: '手机号格式错误',
            correct: '手机号可用'
        }
    };

    var patterns = {
        password: /[a-z0-9A-Z]{6,16}/,
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        phone: /^1[3|4|5|8][0-9]\d{4,8}$/
    }

    function handlerEvent(event) {

        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event),
            type = event.type;
        if (target && target.tagName == 'INPUT') {
            var val = target.value.trim(),
                len = val.replace(new RegExp('[^\x00 -\xff]', 'g'), 'aa').length,
                id = target.id,
                info = document.getElementsByName(id)[0];;
            // console.log(event);
            // console.log(target);
            switch (type) {
                case 'focus':
                case 'focusin':
                    focusEvent(target, id, val, len, info);
                    break;
                case 'blur':
                case 'focusout':
                    blurEvent(target, id, val, len, info);
                    break;
            }
        }


    }


    function focusEvent(target, id, val, len, info) {
        target.className = 'origin';
        info.innerHTML = tips[id]['origin'];
        info.className = 'origin';
    }


    function blurEvent(target, id, val, len, info) {
        /**
         * 获取提示信息所在td
         * getElementsByClassName不兼容IE8-
         * 可以使用parentElement一级一级往上再往下寻找
         * 不过这种方法或产生很长的查找链 不推荐
         * 可以加入name属性 使用getElementsByName获取元素
         * DOM2方法 兼容性暂时没查到 
         * 猜想兼容所有浏览器
         */
        if (len == 0) {
            target.className = 'incorrect';
            info.className = 'incorrect';
            info.innerHTML = tips[id]['empty'];
            return;
        }

        if (id == 'name') {
            if (len >= 4 && len <= 16) {
                target.className = 'correct';
                info.className = 'correct';
                info.innerHTML = tips[id]['correct'];
            } else {
                target.className = 'incorrect';
                info.className = 'incorrect';
                info.innerHTML = tips[id]['error'];
            }
        } else if (id == 'rePassword') {
            var password = document.getElementById('password').value.trim();
            if (password !== val) {
                target.className = 'incorrect';
                info.className = 'incorrect';
                info.innerHTML = tips[id]['error'];
            } else {
                target.className = 'correct';
                info.className = 'correct';
                info.innerHTML = tips[id]['correct'];
            }
        } else {
            if (patterns[id].test(val)) {
                target.className = 'correct';
                info.className = 'correct';
                info.innerHTML = tips[id]['correct'];
            } else {
                target.className = 'incorrect';
                info.className = 'incorrect';
                info.innerHTML = tips[id]['error'];
            }
        }
    }

    validate.enable = function() {
        if (navigator.userAgent.indexOf('Firefox') > -1) {
            /**
             * firefox不支持focusin和focusout事件
             *  onfocusin 事件在一个元素即将获得焦点时触发。
             *  onfocusin 事件类似于 onfocus 事件。 主要的区别是 onfocus 事件不支持冒泡。因此，如果你想知道元素或者其子元素是否获取焦点，
             *  需要使用 onfocusin 事件。
             *  虽然 Firefox 浏览器不支持 onfocusin 事件， 但你可以通过使用 onfocus （使用addEventListener()方法的可选参数 useCapture）的
             *  捕获监听事件来查看元素或其子元素是否获取焦点。
             */
            document.addEventListener('focus', handlerEvent, true);
            document.addEventListener('blur', handlerEvent, true);
        } else {
            EventUtil.addHandler(document, 'focusin', handlerEvent);
            EventUtil.addHandler(document, 'focusout', handlerEvent);
        }
    };

    validate.disable = function() {
        if (navigator.userAgent.indexOf('Firefox') > -1) {
            document.removeEventListener('focus', handlerEvent, true);
            document.removeEventListener('blur', handlerEvent, true);
        }
        EventUtil.removeHandler(document, 'focusin', handlerEvent);
        EventUtil.removeHandler(document, 'focusout', handlerEvent);
    }

    return validate;
}
