/**
 * 表格排序插件
 * 构造器原型模式
 */


var SortableTable = function(element, data, names, sortFunc, isFrozen) {
    this.element = element;
    this.data = data;
    this.names = names;
    this.sortFunc = sortFunc;
    this.curOrder = null;
    this.isFrozen = isFrozen;
    this.headClone = null;

    this.init();
}

SortableTable.prototype = {
    constructor: SortableTable,
    init: function() {
        this.curOrder = [];
        for (var key in this.data) {
            this.curOrder.push(key);
        }
        // insert names row
        let items = '<thead>';
        items += this.names.map(this.createTd).join('');
        items += '</thead>';
        this.element.innerHTML = items;
        this.element.children[0].style.backgroundColor = '#F3B5B5';

        this.render();
        this.reSort();
    },
    createTd: function(name) {

        let td = document.createElement('td');
        let span = document.createElement('span');
        td.appendChild(span);
        span.innerHTML = name;
        if (name == names[0]) {
            return td.outerHTML;
        }
        let div = document.createElement('div');
        div.className = 'divStyle';
        for (var i = 0; i < 2; i++) {
            var divArrow = document.createElement('div');
            divArrow.className = 'divArrow';
            divArrow.className += (i == 0 ?
                ' downArrow' :
                ' upArrow');
            div.appendChild(divArrow);
        }
        td.appendChild(div);
        return td.outerHTML;
    },
    render: function() {
        let tbody = document.createElement('tbody');
        this.element.appendChild(tbody);

        function newTd(str) {
            return '<td>' + str + '</td>';
        }
        let items = '';
        // insert names column
        for (let i = 0; i < this.curOrder.length; i++) {
            let name = this.curOrder[i];
            items += '<tr><td>' + name + '</td>';
            items += this.data[name].map(newTd).join('');
            items += '</tr>';
        }

        // console.log(items);

        if (this.element.children[1] && this.element.children[1].tagName.toLowerCase() != 'thead') {
            this.element.children[1].innerHTML = items;
        } else {
            this.element.children[2].innerHTML = items;
        }
        this.headClone = document.createElement('thead');
        if (this.isFrozen) {
            this.headFreeze();
        }
        // console.log(this.headClone);
    },
    reSort: function() {
        let self = this;
        // console.log(self.element);
        EventUtil.addHandler(self.element.children[0], 'click', function(event) {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            // console.log(event);
            // console.log(target);
            if (target.className.indexOf('downArrow') > -1) {
                let index = self.getIndex(target);
                // console.log(index);
                let fn = self.sortFunc(self.names[index]);
                self.curOrder.sort(function(d1, d2) {
                    return fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                })
                self.render();
            } else if (target.className.indexOf('upArrow') > -1) {
                let index = self.getIndex(target);
                // console.log(index);
                let fn = self.sortFunc(self.names[index]);
                self.curOrder.sort(function(d1, d2) {
                    return -fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                })
                self.render();
            } else {

            }
        });
    },
    getIndex: function(target) {
        let parentTd = target.parentNode.parentNode;
        // console.log(parentTd);
        let index = 0;
        while (parentTd.tagName.toLowerCase() == 'td' && parentTd.children.length > 1) {
            index++;
            parentTd = parentTd.previousElementSibling;
        }
        return index;
    },
    /**
     * [headFreeze description]
     * 实际就是重新添加一个thead元素在滚动的时候显示出来
     * @return {[type]} [description]
     */
    headFreeze: function() {
        let self = this;
        let thead = this.element.children[0];
        let height = this.element.offsetHeight;
        let width = this.element.offsetWidth;
        let headOffsetTop = thead.offsetTop;
        let headOffsetLeft = thead.offsetLeft;
        if (this.element.children[1] && this.element.children[1].tagName.toLowerCase() != 'thead') {

            this.headClone.className = ' hide';
            this.headClone.style.backgroundColor = '#F3B5B5';
            this.headClone.innerHTML = thead.innerHTML;
            //减去的20为左右padding的宽度
            this.headClone.children[0].children[0].style.width = (thead.children[0].children[0].clientWidth - 20) + 'px';
            this.element.insertBefore(this.headClone, thead);
        }
        EventUtil.addHandler(window, 'scroll', function(event) {
            let headClone = self.element.children[0];
            headClone.style.width = width + 'px';
            var scrollTop = self.getScrollTop();
            if (scrollTop >= headOffsetTop + height) {
                if (headClone.className.indexOf('hide') == -1) {
                    headClone.className = 'hide';
                }
            } else if (scrollTop > headOffsetTop) {
                // headClone.className;
                console.log(headClone.className);
                if (headClone.className.indexOf('hide') > -1) {
                    headClone.className -= ' hide';
                }
                if (headClone.className.indexOf('show') == -1) {
                    headClone.className += ' show';
                }
                if (headClone.className.indexOf('fixedThead') == -1) {
                    headClone.className += ' fixedThead';
                }
                headClone.className = headClone.className;
            } else {
                headClone.className = ' hide';
            }
        })
    },
    /**
     * [getScrollTop description]
     * 获取滚动值
     * @return {[type]} [description]
     */
    getScrollTop: function() {
        var scrollPos;
        if (window.pageYOffset) {
            scrollPos = window.pageYOffset;
        } else if (document.compatMode && document.compatMode != 'BackCompat') { scrollPos = document.documentElement.scrollTop; } else if (document.body) { scrollPos = document.body.scrollTop; }
        return scrollPos;
    }
}
