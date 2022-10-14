Function.prototype.myCall = function() {
  const [ctx, ...args] = arguments
  const fn = Symbol('fn')
  ctx[fn] = this || window
  const res = ctx[fn](...args)
  delete ctx[fn]
  return res
}
// let obj2 = {
//   a: 2,
// };
// let obj1 = {
//   a: 1,
//   getName: function (b, c) {
//     console.log(this.a);
//     console.log(b);
//     console.log(c);
//     return this.a + b + c;
//   },
// };
// obj1.getName.myCall(obj2, 3, 4)
// console.log(obj2)

Function.prototype.myApply = function () {
  const [ctx, args] = arguments
  const fn = Symbol('fn')
  ctx[fn] = this || window
  const res = ctx[fn](...args)
  delete ctx[fn]
  return res
}

// let obj2 = {
//   a: 2,
// };
// let obj1 = {
//   a: 1,
//   getName: function (args) {
//     const [b, c] = args
//     console.log(this.a);
//     console.log(b);
//     console.log(c);
//     return this.a + b + c;
//   },
// };
// obj1.getName.myCall(obj2, [3, 4])
// console.log(obj2)

Function.prototype.myBind = function () {
  const that = this
  const [ctx, args] = arguments
  return function () {
    return that.apply(ctx, args)
  }
}

// let obj1 = {
//   age: '2',
// };
// let obj2 = {
//   age: '88',
//   getInfo: function (name) {
//     return `${name} 今年${this.age} 岁`;
//   },
// };
// let p = obj2.getInfo.myBind(obj1, '小明');
// console.log(p)