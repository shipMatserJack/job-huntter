// 批量请求函数，最大并发数maxNum
// 每当有一个请求返回，就留出空位，可增加新请求
// 所有请求完成后，结果按照urls的顺序依次打印

function mutiRequest (reqArr, limit) {
  const reqLength = reqArr.length
  const resArr = new Array(reqLength)
  let i=0;
  return new Promise((resolve, reject) => {
    const max = reqLength >= limit ? limit : reqLength
    while(i<max) {
      reqFn()
    }
    async function reqFn() {
      const cur = i++
      const fn = reqArr[cur]
      const data = await fn.catch(err => err)
      console.log(data)
      resArr[cur] = data
      if (i === reqLength) resolve(resArr)
      else reqFn()
    }
  })
}

function req (res, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res)
    }, delay)
  })
}
mutiRequest([
  req(1, 500),
  req(2, 500),
  req(3, 5000),
  req(4, 1000)],
  2)
