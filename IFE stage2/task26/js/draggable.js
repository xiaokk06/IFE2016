/**
 * 封装一个拖拽的对象
 */

var DragDrop = function() {
    var dragdrop = new EventTarget(),
        dragging = null,
        diffx = 0,
        diffy = 0;

    function handlerEvent(event) {
        // 获取事件和对象
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event).parentNode,
            type = event.type;
        // 获取浏览器视口宽高
        // 考虑浏览器是否处在混杂模式
        var width = document.documentElement.clientWidth || document.body.clientWidth,
            height = document.documentElement.clientHeight || document.body.clientHeight;


        switch (type) {
            case 'mousedown':
                if (target.className.indexOf('draggable') > -1) {
                    dragging = target;
                    /**
                     * 计算鼠标与target边框的距离 
                     * 防止鼠标抖动现象的出现
                     * @type {[type]}
                     */
                    diffx = event.clientX - target.offsetLeft;
                    diffy = event.clientY - target.offsetTop;
                    dragdrop.fire({
                        type: 'dragstart',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    });
                }
                break;
            case 'mousemove':
                if (dragging !== null) {
                    var left = event.clientX - diffx;
                    var top = event.clientY - diffy;

                    /**
                     * 边缘检测
                     * 检测拖拽的目标框是否在视口区域之外
                     */
                    if (left < 0) {
                        left = 0;
                    } else if (left > width - dragging.offsetWidth) {
                        left = width - dragging.offsetWidth;
                    }

                    if (top < 0) {
                        top = 0;
                    } else if (top > height - dragging.offsetHeight) {
                        top = height - dragging.offsetHeight;
                    }
                    dragging.style.left = left + 'px';
                    dragging.style.top = top + 'px';
                    dragdrop.fire({
                        type: 'drag',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    });
                }
                break;
            case 'mouseup':
                dragdrop.fire({
                    type: 'dragend',
                    target: dragging,
                    x: event.clientX,
                    y: event.clientY
                });
                dragging = null;
                break;
        }
    };

    // 公共接口
    dragdrop.enable = function() {
        EventUtil.addHandler(document, 'mousedown', handlerEvent);
        EventUtil.addHandler(document, 'mousemove', handlerEvent);
        EventUtil.addHandler(document, 'mouseup', handlerEvent);

    };

    dragdrop.disable = function() {
        EventUtil.removeHandler(document, 'mousedown', handlerEvent);
        EventUtil.removeHandler(document, 'mousemove', handlerEvent);
        EventUtil.removeHandler(document, 'mouseup', handlerEvent);
    };

    return dragdrop;
}
