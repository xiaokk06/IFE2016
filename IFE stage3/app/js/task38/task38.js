/**
 * 表格排序插件
 * 构造器原型模式
 */


var SortableTable = function(element, data, names, sortFunc) {
    this.element = element;
    this.data = data;
    this.names = names;
    this.sortFunc = sortFunc;
    this.curOrder = null;

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
        let items = '<tr>';
        items += this.names.map(this.createTd).join('');
        items += '</tr>';
        this.element.innerHTML = items;

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
        let tbody=document.createElement('tbody');
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

        this.element.children[1].innerHTML = items;
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
    }
}
