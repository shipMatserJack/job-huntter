// Array.prototype.flat()  特性总结

// Array.prototype.flat() 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
// 不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
// 传入 <=0 的整数将返回原数组，不“拉平”
// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
// 如果原数组有空位，Array.prototype.flat() 会跳过空位。


// function flat(arr) {
//   if (!Array.isArray(arr)) {
//     throw new TypeError('Params must be array')
//   }
//   return arr.reduce((pre, cur) => {
//     return pre.concat(Array.isArray(cur)? flat(cur) : cur)
//   }, [])
// }

// const arr = [1,2,[3,4,[5,[6]]]]
// console.log(flat(arr))
// console.log(arr.flat(Infinity))


Array.prototype.flat = function (deep = 1) {
  if(typeof deep !== 'number' || deep < 0) {
    return this
  }
  const arr = this
  let res = []
  arr.forEach(v => {
    if(Array.isArray(v) && deep > 0) {
      res = res.concat(v.flat(deep -1))
    } else {
      res.push(v)
    }
  })
  return res
}


// Array.prototype.flat = function (deep = 1) {
//   if(typeof deep !== 'number' || deep < 0) {
//     return this
//   }
//   const arr = this
//   return deep > 0 ? 
//     arr.reduce((pre, cur) => pre.concat(Array.isArray(cur)? cur.flat(--deep) : cur), [])
//     : arr
// }

console.log([1,2,[1,2],[1,[2,[3]]]].flat(2))