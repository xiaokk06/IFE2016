'use strict';

{
    // 函数参数数量
    var sum = function sum(a, b) {
        return a + b;
    };
    var arity = sum.length;
    console.log(arity);
}

{
    // 高阶函数
    var filter = function filter(pred, xs) {
        var result = [];
        for (var idx = 0; idx < xs.length; idx++) {
            if (pred(xs[idx])) {
                result.push(xs[idx]);
            }
        }
        return result;
    };
    var is = function is(type) {
        return function (x) {
            return Object(x) instanceof type;
        };
    };
    filter(is(Number), [0, '1', 2, null]);
}

{
    // 偏函数
    var partial = function partial(f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, moreArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                moreArgs[_key2] = arguments[_key2];
            }

            return f.apply(undefined, args.concat(moreArgs));
        };
    };

    var add3 = function add3(a, b, c) {
        return a + b + c;
    };

    var fivePlus = partial(add3, 2, 3);

    fivePlus(4);

    var addMore = add3.bind(null, 2, 3);
    addMore(4);
}

{
    //函数柯里化 将一个接收多个参数的函数转化为单参数函数的方式 
    //转化后的函数每次只接收一个参数 然后返回一个新函数
    //新函数可以继续接收参数 知道接收到所有的参数
    var _sum = function _sum(a, b) {
        return a + b;
    };
    _sum(2, 3);

    var curriedSum = function curriedSum(a) {
        return function (b) {
            return a + b;
        };
    };
    curriedSum(40)(2);

    var add2 = curriedSum(2);
    add2(10);
}

{
    // 函数合成 接收多个函数作为参数并返回一个新函数
    // 心函数按照传入的参数的顺序从左到右依次执行
    // 前一个函数的返回值是后一个函数的输入值

    var compose = function compose(f, g) {
        return function (a) {
            return f(g(a));
        };
    };

    var floorAndToString = compose(function (val) {
        return val.toString();
    }, Math.floor);

    floorAndToString(121.212121);
}

{
    //纯函数
    //一个纯函数需要满足两个条件，第一是函数的返回值只能由输入值（函数接
    //收的参数）决定，也就是说纯函数接收相同的参数会返回相同的值；第二是
    //纯函数不会对自身作用域之外的运行环境产生副作用（side effects），比
    //如说不会改变外部环境中变量的值，这会被认为是不安全的行为
    var greeting = void 0;
    var greet = function greet(greeting) {
        return "Hi, " + greeting;
    };
    greet('xiaokk06');
}

{
    //side effects
    //如果函数或表达式与其自身作用域之外的可变数据发生了读写操作
    //此时函数和表达式就产生了副作用

    var _greeting = void 0;
    var _greet = function _greet() {
        return function (greeting) {
            return "Hi, " + window.name;
        };
    };
    // 执行时更改了外部环境的变量
    _greet();

    // new Date()是可变数据
    var differentEveryTime = new Date();
    console.log('IO is a side effect!');
}

{
    // Idempotent
    // 幂等 同一个函数使用相同的参数嵌套执行多次与执行一次的结果相同
    Math.abs(Math.abs(10));
    sort(sort(sort([2, 1])));
}

{
    //point-free style 是一种不显式向函数传递参数的代码风格，通常需要柯里
    //化和高阶函数来实现：
    var map = function map(fn) {
        return function (list) {
            return list.map(fn);
        };
    };
    var add = a = function (_a) {
        function a(_x) {
            return _a.apply(this, arguments);
        }

        a.toString = function () {
            return _a.toString();
        };

        return a;
    }(function (b) {
        return a + b;
    });

    // not points-free
    // number是一个显示传递的参数
    var incrementAll = Numbers = map(add(1)(numbers));

    // Points-free
    // add(1)的返回值隐式传递给了map，作为map的list参数
    var incrementAll2 = map(add(1));
}