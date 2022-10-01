/**
 * 观察者模式
 */
class Subject {
  constructor(name) {
    this.name = name
    this.observers = []
    this.state = ''
  }

  // 接受观察着
  attach (observer) {
    this.observers.push(observer)
  }

  // 改变状态
  setState (newState) {
    this.state = newState
    this.observers.forEach(o => {
      o.update(newState)
    })
  }
}


class Observer {
  constructor (name) {
    this.name = name
  }

  update (state) {
    console.log(this.name + ' say' + state);
  }
}

const sub = new Subject('leetcode')
const ob1 = new Observer('jack')
const ob2 = new Observer('rose')

sub.attach(ob1)
sub.attach(ob2)

sub.setState('完美解决top100')