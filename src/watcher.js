/* 用于关联compile和observe */
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    //将新创建的watcher对象存储到target属性上
    Dep.target = this
    //将expr的旧值存起来
    oldValue = this.getVmValue(vm, expr)
    //清空Dep.target
    Dep.target = null
  }

  //用于更新页面的方法
  update() {
    let oldValue = this.oldValue
    let newValue = this.getVmValue(this.vm, this.expr)
    if (oldValue != newValue) {
      this.cb(newValue, oldValue)
    }
  }

  getVmValue(vm, expr) {
    let data = vm.$data
    expr.split('.').forEach((key) => {
      data = data[key]
    })
    return data
  }
}

/*dep对象用于管理和通知所有的订阅者*/
class Dep {
  constructor() {
    //用于管理所有的订阅者
    this.subs = []
  }

  //添加订阅者
  addSub(watcher) {
    this.subs.push(watcher)
  }

  //通知所有订阅者,并且调用update方法
  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
