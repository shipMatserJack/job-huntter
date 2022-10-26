// 实现数组原型filter方法
// 1.filter 中的 exc 接受三个参数，与map一致，主要实现的是数组的过滤功能，会根据 exc 函数的返回值来判断是否“留下”该值。
// 2.filter 返回的是一个新的数组，地址不一致。

Array.prototype._filter = function(exc) {
  const result = []
  this.forEach((item, index, arr) => {
    if(exc(item, index, arr)) {
      result.push(item)
    }
  })
  return result
}

const b = [1, 3, 4, 5, 6, 2, 5, 1, 8, 20]

console.log(b._filter(item => item % 2 === 0)) // [ 4, 6, 2, 8, 20 ]