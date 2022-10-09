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