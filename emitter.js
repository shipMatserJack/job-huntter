// 回调函数id
// 事件对象存储
class Emitter {
  constructor() {
    this.eventObj = {}
    this.cbId = null
  }

  on (name, cb) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const id = this.cbId++
    this.eventObj[name][id] = cb
    return id
  }

  once(name, cb) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const id = 'once' + this.cbId++
    this.eventObj[name][id] = cb
    return id
  }

  off (name, id) {
    if(this.eventObj[name][id]) {
      delete this.eventObj[name][id]
    }
    if (Object.keys(this.eventObj[name]).length === 0) {
      delete this.eventObj[name]
    }
  }

  emit (name, ...args) {
    const eventList = this.eventObj[name]
    for(const id in eventList) {
      eventList[id](...args)
      if (id.indexOf('once') > -1) {
        delete eventList[id]
      }
    }
  }
}

const bus = new Emitter()

const id = bus.on('key1', (name, age) => {
  console.info("我是订阅事件A:", name, age);
})
bus.once("key1", (name, age) => {
  console.info("我是一次订阅事件A:", name, age);
})
bus.off("key1", id)

// 发布事件key1
bus.emit('key1', "小猪课堂", 26);
bus.emit('key1', "小猪课堂", 26);
