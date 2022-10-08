/**
 * promise实现
 */

// 1. 三种状态：PENDING、FULFILLED、REJECTED
// 2. resolev和reject函数
// 3. 链式调用 then catch

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED'; 

class _Promise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.value = null
    this.reason = null
    this.state = PENDING
    this.onFulfilledCbs = []
    this.onRejectedCbs = []
    const resolve = (value) => {
      if(this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCbs.forEach(cb => cb())
      }
    }
    const reject = (reason) => {
      if(this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCbs.forEach(cb => cb())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      this.reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') onFulfilled = (value) => value;
    if (typeof onRejected !== 'function') onRejected = (err) => { throw err };
    // return new promise
    let promise2 = new _Promise((resolve, reject) => {
      // fulfilled
      if(this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // rejected
      if(this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      // pending
      if(this.state === PENDING) {
        this.onFulfilledCbs.push(() => setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }))
        this.onRejectedCbs.push(() => setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }))
      }
    })
    return promise2
  }
  catch(errFn) {
    return this.then(null, errFn)
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called;
    try {
      const then = x.then
      if (typeof then !== 'function'){
        resolve(x)
      } else {
        then.call(
          x, 
          value => {
            if(called) return
            called = true
            resolvePromise(promise2, value, resolve, reject)
          }, 
          reason => {
            if(called) return
            called = true
            reject(reason)
          })
      }
    } catch (error) {
      if(called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

function isPromise(x) {
  if((typeof x === 'object' && x !== null) || typeof x === 'function') {
    if (typeof x.then === 'function') {
      return true
    }
  }
  return false
}
new _Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve(2)
  }, 1000)
}).then(res => res).then(res => console.log(res))

// 实现promise.all
_Promise.all = function(values) {
  return new _Promise((resolve, reject) => {
    let arr = [], times = 0
    function collectRes (value, i) {
      arr[i] = value
      if(++times === values.length) {
        resolve(arr)
      }
    }
    for(let i=0; i<values.length; i++) {
      if(isPromise(values[i])) {
        values[i]
          .then(y => {
          collectRes(y, i)
        }, reject)
          .catch(e => reject(e))
      } else {
        collectRes(values[i], i)
      }
    }
  })
}

_Promise.all([1,3,4]).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})

// 实现promise.race

_Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(item => {
      _Promise.resolve(item).then(
        val => resolve(val),
        reason => reject(reason)
      )
    })
  })
}