// 实现数组原型的reduce方法
//1.reduce 接受两个参数，第一个为 exc 函数，第二个为初始值，如果不传默认为 0
//2.reduce 最终会返回一个值，当然不一定是 Number 类型的，取决于你是怎么计算的，每次的计算结果都会作为下次 exc 中的第一个参数

Array.prototype._reduce = function(exc, initial = 0) {
  let result = initial
  this.forEach((item) => {
    result = exc(result, item)
  })
  return result
}
