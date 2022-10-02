
/**
 * 实现模版字符串
 * @param {*} template 
 * @param {*} data 
 * @returns 
 */
function render (template, data) {
  const reg = /\{\{(\w+)\}\}/
  if (reg.test(template)) {
    const name = reg.exec(template)[1]
    template = template.replace(reg, data[name])
    return render(template, data)
  }
  console.log(template);
  return template
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined