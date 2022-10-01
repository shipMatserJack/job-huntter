const EventListener = {
  // 添加事件
  addEvent (el, type, handler) {
    if (el.addEventListener) {
      el.addEventListener(type, handler, false)
    } else if (el.attachEavent) {
      el.attachEavent("on" + type, handler)
    }else {
      el["on"+type] = handler
    }
  },
  // 移除事件
  removeEvent (el, type, handler) {
    if (el.removeEventListener) {
      el.removeEventListener(type, handler, false)
    } else if (el.detachEvent) {
      el.detachEvent("on" + type, handler)
    }else {
      el["on"+type] = null
    }
  },
  // 获取事件目标
  getTarget (event) {
    return event.target || event.srcElement
  },
  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent (event) {
    return event || window.event
  },
  // 组织默认事件
  stopPropagation (event) {
    if (event.stopPropagation) event.stopPropagation()
    else event.cancelBubble = true
  },
  // 取消默认行为
  preventDefault (event) {
    if (event.preventDefault) event.preventDefault()
    else event.returnValue = false
  }
}