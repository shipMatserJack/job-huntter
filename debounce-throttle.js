function debounce (fn, interval) {
  let timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval);
  }
}

function throttle (fn, interval) {
  let flag = true
  return function() {
    if(!flag) return
    flag = false
    setTimeout(()=> {
      fn.apply(this, arguments)
      flag = true
    }, interval)
  }
}