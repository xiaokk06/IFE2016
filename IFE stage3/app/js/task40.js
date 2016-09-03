/**
 * datapicker plugin
 * constructor prototype design module
 */

let datePicker = function(container) {
    this.container = container;
    this.date = new Date();
    this.mianEle = null;
    this.sleectedEle = null;

    this.init();
}

datePicker.prototype = {
    constructor: datePicker,
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        this.mianEle = document.createElement('div');
        this.mianEle.className = 'mianDiv';

        let p = document.createElement('p');
        p.className = 'pStyle';

        let title = document.createElement('strong');
        title.className = 'title';

        p.appendChild(title);

        let arrLeft = document.createElement('strong');
        arrLeft.innerHTML = '<-';
        arrLeft.className = 'arrLeft';

        p.appendChild(arrLeft);

        let arrRight = document.createElement('strong');
        arrRight.innerHTML = '->';
        arrRight.className = 'arrRight';

        p.appendChild(arrRight);
        this.mianEle.appendChild(p);

        for (let i = 0; i < 7; i++) {
            let el = this.createEle();
            el.innerHTML = this.days[i];
            if (i === 0 || i === 6) {
                el.className += ' fontColor';
            }
            this.mianEle.appendChild(el);
        }

        for (let i = 0; i < 42; i++) {
            let el = this.createEle();
            el.className += ' spanCursor';
            this.mianEle.appendChild(el);
        }

        this.container.appendChild(this.mianEle);

        let self = this;

        EventUtil.addHandler(this.mianEle, 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() === 'span') {
                let index = self.getIndex(target, self.mianEle);
                let selectedIndex = self.getIndex(self.selectedEle, self.mianEle);
                let date = new Date(self.date);
                date.setDate(date.getDate() + index - selectedIndex);
                self.selectDate(date);
            }
        });

        EventUtil.addHandler(this.mianEle.getElementsByTagName('p')[0], 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target && target.className.indexOf('arrLeft') > -1) {
                self.preMonth();
            } else if (target && target.className.indexOf('arrRight' > -1)) {
                self.nextMonth();
            } else {

            }
        });


        this.renderByDate(this.date);
    },
    createEle: function() {
        let ele = document.createElement('span');
        ele.className = 'element';
        return ele;
    },
    renderByDate: function(date) {
        $('.title').innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        let dat = new Date(date);
        //获取当月的第一天
        dat.setDate(dat.getDate() - date.getDate() + 1);
        //获取这个月份的日历显示的第一天
        dat.setDate(dat.getDate() - dat.getDay());


        let allSpan = this.mianEle.getElementsByTagName('span');
        for (let i = 0; i < 42; i++) {
            // 获取显示日子的jq对象
            let ele = allSpan[i + 7];
            ele.innerHTML = dat.getDate();

            // 不是同月的色彩变淡
            if (dat.getMonth() !== date.getMonth()) {
                ele.style.color = 'lightgray';
            } else {
                // 周六日字变红
                if (dat.getDay() === 0 || dat.getDay() === 6) {
                    ele.style.color = 'rgb(200,27,1)';
                } else {
                    ele.style.color = '';
                }
            }

            // 被选中的日期背景变红
            if (dat.getTime() === date.getTime()) {
                ele.style.backgroundColor = 'rgb(200,27,1)';
                ele.style.color = 'white';
                this.selectedEle = ele;
            }

            dat.setDate(dat.getDate() + 1);
        }
    },
    nextMonth: function() {
        let dat = new Date(this.date);
        dat.setMonth(dat.getMonth() + 1);
        this.selectDate(dat);
    },

    preMonth: function() {
        let dat = new Date(this.date);
        dat.setMonth(dat.getMonth() - 1);
        this.selectDate(dat);
    },

    getSelectedDate: function() {
        let y = this.date.getFullYear(),
            m = this.date.getMonth() + 1,
            d = this.date.getDate();
        return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
    },
    selectDate: function(date) {
        this.selectedEle.style.backgroundColor = '';
        this.selectedEle.style.color = '';
        let allSpan = this.mianEle.getElementsByTagName('span');
        if (date.getMonth() === this.date.getMonth()) {
            let oIndex = this.getIndex(this.selectedEle, this.mianEle);
            let temp = allSpan[oIndex + date.getDate() - this.date.getDate() - 1];
            temp.style.backgroundColor = 'rgb(200,27,1)';
            temp.style.color = 'white';
            this.selectedEle = temp;
        } else {
            this.renderByDate(date);
        }
        this.date = date;
    },
    getIndex: function(node, parent) {
        parent = parent || document;
        let index = 0;
        while (node.parentNode == parent && node.tagName.toLowerCase() === 'span') {
            index++;
            node = node.previousElementSibling;
        }
        return index;
    }
}
