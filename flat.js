function flat(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Params must be array')
  }
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur)? flat(cur) : cur)
  }, [])
}

const arr = [1,2,[3,4,[5,[6]]]]
console.log(flat(arr))
console.log(arr.flat(Infinity))