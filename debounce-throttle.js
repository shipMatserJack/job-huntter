// 限制高频事件触发，interval内执行一次，如果期间再次触发重新计算时间
function debounce (fn, interval) {
  let timer
  return function() {
    let _this = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, arguments)
    }, interval);
  }
}

// 限制高频事件触发，interval内只会执行一次
function throttle (fn, interval) {
  let flag = true
  return function() {
    let _this = this
    if(!flag) return
    flag = false
    setTimeout(()=> {
      fn.apply(_this, arguments)
      flag = true
    }, interval)
  }
}