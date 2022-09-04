// 判断类型
function judgeType (source) {
  return Object.prototype.toString.call(source).replace(new RegExp(/\[|\]|object /g), '')
}
const reference = ['Map', 'WeakMap', 'Set', 'WeakSet', 'Date', 'RegExp', 'Error']

function deepClone(source, hash = new WeakMap()) {
  if(hash.has(source)) {
    return source
  }
  let res = null
  const type = judgeType(source)
  if(type === 'Object') {
    res = {}
    hash.set(source)
    for (const key in source) {
      if(Object.hasOwnProperty.call(source, key)) {
        res[key] = deepClone(source[key], hash)
      }
    }
  } else if (type === 'Array') {
    res = []
    source.forEach((e, i) => {
      res[i] = deepClone(e)
    });
  } else if (reference.includes(source)) {
    res = new source.constructor(source)
  } else {
    res = source
  }
  return res
}

const map = new Map();
map.set("key", "value");
map.set("ConardLi", "coder");

const set = new Set();
set.add("ConardLi");
set.add("coder");

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: "child",
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: 2,
    str: '2',
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        let t = 0;
        console.log("coder", t++);
    },
    func2: function (a, b) {
        return a + b;
    },
};
//测试代码
const test1 = deepClone(target);
target.field4.push(9);
console.log('test1: ', test1);
