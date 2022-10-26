// 实现数组原型map方法
// 1.map 中的 exc 接受三个参数，分别是: 元素值、元素下标和原数组
// 2.map 返回的是一个新的数组，地址不一样

Array.prototype._map = function(exc) {
  const result = []
  this.forEach((item, index, arr) => {
    result[index] = exc(item, index, arr)
  })
  return result
}

const a = new Array(2).fill(2)
console.log(a.map((item, index, arr) => item * index + 1))
console.log(a._map((item, index, arr) => item * index + 1))