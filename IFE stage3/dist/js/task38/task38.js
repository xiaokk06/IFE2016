'use strict';

/**
 * 表格排序插件
 * 构造器原型模式
 */

var SortableTable = function SortableTable(element, data, names, sortFunc) {
    this.element = element;
    this.data = data;
    this.names = names;
    this.sortFunc = sortFunc;
    this.curOrder = null;

    this.init();
};

SortableTable.prototype = {
    constructor: SortableTable,
    init: function init() {
        this.curOrder = [];
        for (var key in this.data) {
            this.curOrder.push(key);
        }
        // insert names row
        var items = '<tr>';
        items += this.names.map(this.createTd).join('');
        items += '</tr>';
        this.element.innerHTML = items;

        this.render();
        this.reSort();
    },
    createTd: function createTd(name) {

        var td = document.createElement('td');
        var span = document.createElement('span');
        td.appendChild(span);
        span.innerHTML = name;
        if (name == names[0]) {
            return td.outerHTML;
        }
        var div = document.createElement('div');
        div.className = 'divStyle';
        for (var i = 0; i < 2; i++) {
            var divArrow = document.createElement('div');
            divArrow.className = 'divArrow';
            divArrow.className += i == 0 ? ' downArrow' : ' upArrow';
            div.appendChild(divArrow);
        }
        td.appendChild(div);
        return td.outerHTML;
    },
    render: function render() {
        var tbody = document.createElement('tbody');
        this.element.appendChild(tbody);
        function newTd(str) {
            return '<td>' + str + '</td>';
        }
        var items = '';
        // insert names column
        for (var i = 0; i < this.curOrder.length; i++) {
            var name = this.curOrder[i];
            items += '<tr><td>' + name + '</td>';
            items += this.data[name].map(newTd).join('');
            items += '</tr>';
        }

        // console.log(items);

        this.element.children[1].innerHTML = items;
    },
    reSort: function reSort() {
        var self = this;
        // console.log(self.element);
        EventUtil.addHandler(self.element.children[0], 'click', function (event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            // console.log(event);
            // console.log(target);
            if (target.className.indexOf('downArrow') > -1) {
                (function () {
                    var index = self.getIndex(target);
                    // console.log(index);
                    var fn = self.sortFunc(self.names[index]);
                    self.curOrder.sort(function (d1, d2) {
                        return fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                    });
                    self.render();
                })();
            } else if (target.className.indexOf('upArrow') > -1) {
                (function () {
                    var index = self.getIndex(target);
                    // console.log(index);
                    var fn = self.sortFunc(self.names[index]);
                    self.curOrder.sort(function (d1, d2) {
                        return -fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                    });
                    self.render();
                })();
            } else {}
        });
    },
    getIndex: function getIndex(target) {
        var parentTd = target.parentNode.parentNode;
        // console.log(parentTd);
        var index = 0;
        while (parentTd.tagName.toLowerCase() == 'td' && parentTd.children.length > 1) {
            index++;
            parentTd = parentTd.previousElementSibling;
        }
        return index;
    }
};