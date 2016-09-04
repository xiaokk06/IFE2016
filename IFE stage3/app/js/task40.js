/**
 * datapicker plugin
 * constructor prototype design module
 */

let datePicker = function(container) {
    this.container = container;
    this.date = new Date();
    this.mainEle = null;
    this.sleectedEle = null;

    this.init();
}

datePicker.prototype = {
    constructor: datePicker,
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        this.mainEle = document.createElement('div');
        this.mainEle.className = 'mianDiv';

        let p = document.createElement('p');
        p.className = 'pStyle';

        let title = document.createElement('div');
        title.className = 'title';

        let year = this.createDiv('year');
        let month = this.createDiv('month');
        title.innerHTML = year.outerHTML + '年' + month.outerHTML + '月';


        p.appendChild(title);

        let arrLeft = document.createElement('strong');
        arrLeft.innerHTML = '<-';
        arrLeft.className = 'arrLeft';

        p.appendChild(arrLeft);

        let arrRight = document.createElement('strong');
        arrRight.innerHTML = '->';
        arrRight.className = 'arrRight';

        p.appendChild(arrRight);
        this.mainEle.appendChild(p);

        let dateWrap = document.createElement('div');
        dateWrap.className = 'dateWrap';

        for (let i = 0; i < 7; i++) {
            let el = this.createEle();
            el.innerHTML = this.days[i];
            if (i === 0 || i === 6) {
                el.className += ' fontColor';
            }
            dateWrap.appendChild(el);
        }

        for (let i = 0; i < 42; i++) {
            let el = this.createEle();
            el.className += ' spanCursor';
            dateWrap.appendChild(el);
        }

        this.mainEle.appendChild(dateWrap);
        this.mainEle.style.display = 'none';

        let parentNode = this.container.parentNode;
        parentNode.insertBefore(this.mainEle, this.container.nextElementSibling);

        let self = this;

        EventUtil.addHandler($('.dateWrap'), 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() === 'span') {
                let index = self.getIndex(target, $('.dateWrap'));
                //如果点击星期就不跳转
                if (index >= 1 && index <= 7) {
                    return;
                }
                if (target == self.selectedEle) {
                    return;
                }
                let selectedIndex = self.getIndex(self.selectedEle, $('.dateWrap'));
                let date = new Date(self.date);
                date.setDate(date.getDate() + index - selectedIndex);
                self.selectDate(date);
                self.setInput();
                self.mainEle.style.display = 'none';
            }
        });

        EventUtil.addHandler(this.container, 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target == self.container) {
                self.mainEle.style.display = 'block';
                self.renderByDate(self.date);
            }
        });

        EventUtil.addHandler(this.mainEle.getElementsByTagName('p')[0], 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target && target.className.indexOf('arrLeft') > -1) {
                self.preMonth();
            } else if (target && target.className.indexOf('arrRight') > -1) {
                self.nextMonth();
            } else {
                return;
            }
        });

        EventUtil.addHandler($('.title'), 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            let targetCls = target.className;
            if (target.parentNode.className != 'calcWarp') {
                return;
            }
            let wrapNodeCls = target.parentNode.parentNode.className;
            if (wrapNodeCls.indexOf('year') > -1) {
                if (targetCls.indexOf('add') > -1) {
                    self.nextYear();
                } else if (targetCls.indexOf('reduce') > -1) {
                    self.preYear();
                } else {

                }
            } else if (wrapNodeCls.indexOf('month') > -1) {
                if (targetCls.indexOf('add')) {
                    self.nextMonth();
                } else if (targetCls.indexOf('reduce') > -1) {
                    self.preMonth();
                } else {

                }
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
        $('#year').value = date.getFullYear();
        $('#month').value = date.getMonth() + 1;
        this.yearInit();
        this.monthInit();
        let dat = new Date(date);
        //获取当月的第一天
        dat.setDate(dat.getDate() - date.getDate() + 1);
        //获取这个月份的日历显示的第一天
        dat.setDate(dat.getDate() - dat.getDay());


        let allSpan = $('.dateWrap').getElementsByTagName('span');
        // console.log(allSpan);
        for (let i = 0; i < 42; i++) {
            // 获取显示日子的jq对象
            let ele = allSpan[i + 7];
            this.resetEle(ele);
            ele.innerHTML = dat.getDate();

            // 不是同月的色彩变淡
            if (dat.getMonth() !== date.getMonth()) {
                ele.style.color = '#787878';
            } else {
                // 周六日字变蓝
                if (dat.getDay() === 0 || dat.getDay() === 6) {
                    ele.style.color = '#337DBE';
                } else {
                    ele.style.color = '';
                }
            }

            // 被选中的日期背景变蓝
            if (dat.getTime() === date.getTime()) {
                ele.style.backgroundColor = '#337DBE';
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
    nextYear: function() {
        let dat = new Date(this.date);
        dat.setFullYear(dat.getFullYear() + 1);
        this.selectDate(dat);
    },
    preYear: function() {
        let dat = new Date(this.date);
        dat.setFullYear(dat.getFullYear() - 1);
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
        let index = this.getIndex(this.selectedEle, $('.dateWrap'));
        if ((index - 1) % 7 == 0 && index % 7 == 0) {
            this.selectedEle.style.color = '#337DBE';
        }
        this.selectedEle.style.color = '';
        let allSpan = this.mainEle.getElementsByTagName('span');
        if (date.getMonth() === this.date.getMonth() && date.getFullYear() === this.date.getFullYear()) {
            let temp = allSpan[index + date.getDate() - this.date.getDate() - 1];
            this.selectedSpan(temp);
            this.selectedEle = temp;
        } else {
            this.renderByDate(date);
        }
        this.date = date;
    },
    getIndex: function(node, parent) {
        parent = parent || document;
        let index = 0;
        while (node && node.tagName.toLowerCase() === 'span') {
            if (node.parentNode && node.parentNode == parent) {
                index++;
            }
            node = node.previousElementSibling;
        }
        return index;
    },
    setInput: function() {
        let year = this.date.getFullYear();
        let month = (this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1) : (this.date.getMonth() + 1);
        let day = this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate();
        let result = '' + year + '/' + month + '/' + day;
        this.container.value = result;
    },
    createDiv: function(name) {
        let div = document.createElement('div');
        div.className = name;
        let input = document.createElement('input');
        input.id = name;
        let calcWarp = document.createElement('div');
        calcWarp.className = 'calcWarp';
        let add = document.createElement('div');
        add.className = 'add';
        let reduce = document.createElement('div');
        reduce.className = 'reduce';
        calcWarp.appendChild(add);
        calcWarp.appendChild(reduce);
        div.appendChild(input);
        div.appendChild(calcWarp);
        return div;
    },
    yearInit: function() {
        if ($('.yearSelect')) {
            $('.year').removeChild($('.yearSelect'));
        }
        let yearWrap = document.createElement('div');
        yearWrap.className = 'yearSelect';
        let year = this.date.getFullYear();
        let selectedYear = null;
        for (let i = year - 4; i <= year + 4; i++) {
            let span = document.createElement('span');
            span.className = 'element';
            span.innerHTML = i;
            yearWrap.appendChild(span);

            if (i === year) {
                this.selectedSpan(span);
                selectedYear = span;
            }
        }
        yearWrap.style.display = 'none';
        $('.year').appendChild(yearWrap);
        let self = this;
        EventUtil.addHandler($('#year'), 'click', function(event) {
            self.yearInit();
            $('.yearSelect').style.display = 'block';
        });
        EventUtil.addHandler($('.yearSelect'), 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target && target.tagName.toLowerCase() == 'span') {
                if (target !== selectedYear) {
                    self.resetEle(selectedYear);
                    self.selectedSpan(target);
                    let date = new Date(self.date);
                    date.setFullYear(0 + target.innerHTML);
                    $('#year').value = self.date.getFullYear();
                    self.selectDate(date);
                }
                $('.yearSelect').style.display = 'none';
            }
        });
    },
    monthInit: function() {
        if ($('.monthSelect')) {
            $('.month').removeChild($('.monthSelect'));
        }
        let monthWrap = document.createElement('div');
        monthWrap.className = 'monthSelect';
        let month = this.date.getMonth() + 1;
        let selectedMonth = null;
        for (let i = 1; i <= 12; i++) {
            let span = document.createElement('span');
            span.className = 'element';
            span.innerHTML = i;
            monthWrap.appendChild(span);

            if (i === month) {
                this.selectedSpan(span);
                selectedMonth = span;
            }
        }
        monthWrap.style.display = 'none';
        $('.month').appendChild(monthWrap);
        let self = this;
        EventUtil.addHandler($('#month'), 'click', function(event) {
            self.monthInit();
            $('.monthSelect').style.display = 'block';
        });
        EventUtil.addHandler($('.monthSelect'), 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target && target.tagName.toLowerCase() == 'span') {
                EventUtil.stopPropagation(event);
                if (target !== selectedMonth) {
                    self.resetEle(selectedMonth);
                    self.selectedSpan(target);
                    let date = new Date(self.date);
                    date.setMonth(0 + target.innerHTML - 1);
                    $('#month').value = self.date.getMonth() + 1;
                    self.selectDate(date);
                }
                $('.monthSelect').style.display = 'none';
            }
        });
    },
    resetEle: function(element) {
        element.style.backgroundColor = '';
        element.style.color = 'black';
    },
    selectedSpan: function(element) {
        element.style.backgroundColor = '#337DBE';
        element.style.color = 'white';
    }
}
