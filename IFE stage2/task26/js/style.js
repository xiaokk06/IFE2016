/**
 * 获取时间
 */
function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}
/**
 * 控制台输出
 * @param message 消息
 * @param colour 颜色
 */
var consoleText = document.getElementById("console-text");

function log(message, colour) {
    var date = new Date();
    var p = document.createElement("p");
    p.innerHTML = getTime() + " ";
    var span = document.createElement("span");
    span.innerHTML = message;
    span.style.color = colour;
    p.appendChild(span);
    consoleText.appendChild(p);
    console.log("%c" + message, "background-color:" + colour);
    consoleText.scrollTop = consoleText.scrollHeight;
}

/**
 * 页面中可拖拽的面板拖动
 * @type {DragDrop}
 */
var dragdrop = new DragDrop();
dragdrop.enable();

/**
 * 构造控制面板
 */
(function() {
    var data = ['第一轨道', '第二轨道', '第三轨道', '第四轨道'],
        obj = document.getElementById('control-main')
    len = data.length, i = 0, htmlContent = '';
    for (; i < len; i++) {
        var div = document.createElement('div'),
            html = '';
        div.dataset.id = i;
        html = "<span>" + data[i] + "</span>" + '<button type="button" data-type="create" data-status="create">创建飞船</button>' + '<button type="button" disabled="disabled" data-type="drive" data-status="start">飞行</button>' + '<input type="number" title="速度" placeholder="速度" value="1" disabled="disabled" />' + '<button type="button" disabled="disabled" data-type="rate">设置速度</button>';
        div.innerHTML = html;
        obj.appendChild(div);
    }
})();


/**
 * 操作面板
 */
(function() {
    //按钮事件
    var buttonClick = function() {
        var orbit = this.parentNode.dataset.id - 0;
        var message = this.dataset.type;
        switch (message) {
            case 'create':
                if (this.dataset.status == 'create') {
                    commander.createSpaceShip(orbit);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;
                } else {
                    commander.destroy(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                    this.nextElementSibling.nextElementSibling.disabled = true;
                    this.nextElementSibling.nextElementSibling.value = 1;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
                }
                break;
            case 'drive':
                if (this.dataset.status == 'start') {
                    commander.start(orbit);
                    this.dataset.status = 'stop';
                    this.innerHTML = '停止';
                } else {
                    commander.stop(orbit);
                    this.dataset.status = 'start';
                    this.innerHTML = '飞行';
                }
                break;
            case 'rate':
                var value = this.previousElementSibling.value - 0;
                commander.setRate(orbit, value);
                break;
        }
    };
    //绑定按钮事件
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonClick);
    }
})();
