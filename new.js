// 实现js操作符实例化对象的方法new

// 创建了一个全新的对象。
// 这个对象会被执行[[Prototype]]（也就是__proto__）链接。
// 生成的新对象会绑定到函数调用的this。
// 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
// 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用会自动返回这个新的对象。
function _new () {
  let obj = {} // 创建对象
  let Con = [].shift.call(arguments) // 将类数组转成数组，并且取出第一个参数
  obj.__proto__ = Con.prototype // 将对象的隐性原型指向构造函数的原型对象
  let result = Con.apply(obj, arguments) // 把创建对象作为this的上下文, arguments已经变成了数组并且头部第一个参数被取出
  return result instanceof Object ? result : obj; // 应该返回对象
}