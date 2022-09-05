function currying (fn) {
  // 保存第一个方法内的参数
  const args = [...arguments].slice(1)
  return function() {
    const newArgs = [...args, ...arguments]
    return fn.apply(this, newArgs)
  }
}

function add() {
  // 保存第一次执行的参数
  const args = [...arguments]
  var _adder = function() {
    // 闭包保存收集剩余参数
    args.push(...arguments)
    return _adder
  }
  // toString隐式转换立即执行计算
  _adder.toString = function() {
    return args.reduce((a, b) => a+b)
  }
  return _adder
}

console.log(add(1)(2)(3))
console.log(add(1)(2)(3).toString())