class LRUCache {
  constructor(limit) {
    this.limit = limit
    this.cache = new Map()
  }

  get (key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    this.cache.delete(key) //删除记录
    this.cache.set(key, value) // 插入之最前面，确保最近使用原则
    return value
  }

  put (key, value) {
    if(this.cache.has(key)) this.cache.delete(key)
    if(this.cache.size >= this.limit) {
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}