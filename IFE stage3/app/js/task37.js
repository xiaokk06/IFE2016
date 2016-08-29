/**
 * autohr by xiaok
 * 2016/08/26
 */

let dialog = $('.dialog');
let main = $('main');

EventUtil.addHandler($('.show'), 'click', function(event) {
    dialog.setAttribute('open', '');
    main.classList.add('de-emphasized');
    setPlace();
});

function closeDialog(event) {
    event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    let clsName = target.className;
    /**
     * do something different for different target
     * @param  {[type]} clsName [description]
     * @return {[type]}         [description]
     */
    if (clsName === 'sure') {
        Dialog();
    } else {
        Dialog();
    }
}

/**
 * dialog水平垂直居中定位
 * @return {[type]} [description]
 */
function setPlace() {
    let width = document.documentElement.clientWidth || document.body.clientWidth;
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    let dialogWidth = dialog.offsetWidth;
    let dialogHeight = dialog.offsetHeight;
    dialog.style.top = (height - dialogHeight) / 2 + 'px';
    dialog.style.left = (width - dialogWidth) / 2 + 'px';
};

function Dialog() {
    if (dialog.close) {
        dialog.close();
    } else {
        dialog.removeAttribute('open');
    }
}

var dragdrop = new DragDrop();
dragdrop.enable();


EventUtil.addHandler($('.sure'), 'click', closeDialog);
EventUtil.addHandler($('.close'), 'click', closeDialog);
