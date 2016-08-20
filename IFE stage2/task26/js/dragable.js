/**
 * 封装一个拖拽的对象
 */

var DragDrop = function() {
    var drogdrop = new EventTarget(),
        dragging = null,
        diffx = 0,
        diffy = 0;

    function handlerEvent(event) {
        // 获取事件和对象
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event),
            type = event.type;

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
                    diffy = event.cilentY - target.offsetTop;
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
                    dragging.style.left = (event.clientX - diffx) + 'px';
                    dragging.style.top = (event.clientY - diffY) + 'px';
                    drogdrop.fire({
                        type: 'drag',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    });
                }
                break;
            case 'mouseup':
                drogdrop.fire({
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
