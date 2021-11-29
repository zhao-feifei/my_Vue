/* 用于关联compile和observe */
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb

    //将expr的旧值存起来
    oldValue = this.getVmValue(vm, expr)
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
