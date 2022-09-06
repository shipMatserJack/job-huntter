// 概念：假设我们是A instanceof B，那么就是看B的原型，是否出现在A的原型链上。
function _instanceof (A, B) {
  if(typeof A !== 'object' || A === null || typeof B !== 'function') {
    return false
  }
  let left = A.__proto__
  const right = B.prototype
  while(true) {
    if(left === null) {
      return false
    }
    if(right === left) {
      return true
    }
    left = left.__proto__
  }
}

console.log(_instanceof(new Number(1), Number))