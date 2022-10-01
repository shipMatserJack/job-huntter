/**
 * 实现Object.create()
 * 会将参数对象作为创建的空对象原型，返回这个空对象
 * @param {*} obj 
 * @returns 
 */
function _create (obj) {
  function C(){}
  C.prototype = obj
  return new C()
}