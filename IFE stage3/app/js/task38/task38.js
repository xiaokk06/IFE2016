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

        this.render();
    },
    createTd: function(name) {
        let td = document.createElement('td');
        let span = document.createElement('span');
        let div = document.createElement('div');
        div.className = 'divStyle';
        span.innerHTML = name;
        td.appendChild(span);
        for (var i = 0; i < 2; i++) {
            var divArrow = document.createElement('div');
            divArrow.className = 'divArrow';
            divArrow.className += (i == 0 ?
                ' downArrow;' :
                ' upArrow');
            div.appendChild(divArrow);
        }
        td.appendChild(div);
        return td;
    },
    render: function() {
        function newTd(str) {
            return '<td>' + str + '</td>';
        }

        // insert names row
        let items = '<tr>';
        items += this.names.map(this.createTd).join('');
        items += '</tr>';

        // insert names column
        for (let i = 0; i < this.curOrder.length; i++) {
            let name = this.curOrder[i];
            items += '<tr><td>' + name + '<td>';
            items += this.data[name].map(newTd).join('');
            items += '</tr>';
        }

        this.element.innerHTML = items;
        this.addSortEle();


    },
    addSortEle: function() {
        let self = this;


    }
}
