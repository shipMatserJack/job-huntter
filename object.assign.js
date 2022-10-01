/**
 * 实现Object.assign
 * @param {*} target 
 * @param  {...any} source 
 * @returns 
 */
function _assign (target, ...source) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert null or undefined to object')
  }
  const res = Object(target)
  source.forEach(obj => {
    if (obj) {
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
          res[key] = obj[key]
        }
      }
    }
  })
  return res
}