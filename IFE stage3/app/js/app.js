{ // 函数参数数量
    const sum = (a, b) => a + b;
    const arity = sum.length;
    console.log(arity);
}

{
    // 高阶函数
    const filter = (pred, xs) => {
        const result = [];
        for (let idx = 0; idx < xs.length; idx++) {
            if (pred(xs[idx])) {
                result.push(xs[idx]);
            }
        }
        return result;
    }
    const is = (type) => (x) => Object(x) instanceof type;
    filter(is(Number), [0, '1', 2, null]);
}

{
    // 偏函数
    const partial = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs);

    const add3 = (a, b, c) => a + b + c;

    const fivePlus = partial(add3, 2, 3);

    fivePlus(4);


    const addMore = add3.bind(null, 2, 3);
    addMore(4);
}



{
    //函数柯里化 将一个接收多个参数的函数转化为单参数函数的方式 
    //转化后的函数每次只接收一个参数 然后返回一个新函数
    //新函数可以继续接收参数 知道接收到所有的参数
    const sum = (a, b) => a + b;
    sum(2, 3);

    const curriedSum = (a) => (b) => a + b;
    curriedSum(40)(2);

    const add2 = curriedSum(2);
    add2(10);
}


{
    // 函数合成 接收多个函数作为参数并返回一个新函数
    // 心函数按照传入的参数的顺序从左到右依次执行
    // 前一个函数的返回值是后一个函数的输入值

    const compose = (f, g) => (a) => f(g(a));

    const floorAndToString = compose((val) => val.toString(), Math.floor);

    floorAndToString(121.212121);
}

{
    //纯函数
    //一个纯函数需要满足两个条件，第一是函数的返回值只能由输入值（函数接
    //收的参数）决定，也就是说纯函数接收相同的参数会返回相同的值；第二是
    //纯函数不会对自身作用域之外的运行环境产生副作用（side effects），比
    //如说不会改变外部环境中变量的值，这会被认为是不安全的行为
    let greeting;
    const greet = (greeting) => "Hi, " + greeting;
    greet('xiaokk06');
}

{
    //side effects
    //如果函数或表达式与其自身作用域之外的可变数据发生了读写操作
    //此时函数和表达式就产生了副作用

    let greeting;
    const greet = () => greeting => "Hi, " + window.name;
    // 执行时更改了外部环境的变量
    greet();

    // new Date()是可变数据
    const differentEveryTime = new Date();
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
    const map = (fn) => (list) => list.map(fn);
    const add = (a) = (b) => a + b;

    // not points-free
    // number是一个显示传递的参数
    const incrementAll = (Numbers) = map(add(1)(numbers));

    // Points-free
    // add(1)的返回值隐式传递给了map，作为map的list参数
    const incrementAll2 = map(add((1)));

}
