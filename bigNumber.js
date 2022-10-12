// 解决js大数相加的问题
// define: a和b为非常大的数字（字符串类型），解决a和b相加后的精度问题
function bigNumberAdd(a, b) {
  let res = '', c = 0 //进位值
  a = a.split('')
  b = b.split('')
  while(a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop()
    res = c % 10 + res
    c = c > 9
  }
  console.log(res)
  return res.replace(/^0+/, '')
}

console.log(bigNumberAdd('12478945645654','489789411231231523'))
console.log(12478945645654 + 489789411231231523)