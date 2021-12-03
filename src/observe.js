class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  /** 核心方法 */
  walk(data) {
    /*给data中所有的数据添加getter和setter */

    //先过滤掉简单类型
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
      //如果是复杂类型   继续添加getter  setter
      this.walk(data[key])
    })
  }

  //定义响应式的数据，进行数据劫持
  defineReactive(data, key, value) {
    let that = this
    //dep 保存了所有订阅了该数据的订阅者
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        //如果Dep.target中有watcher对象，存储到订阅者数组中
        Dep.target && dep.addSub(Dep.target)
        console.log(dep)
        return value
      },
      set(newValue) {
        if (newValue === value) {
          return
        }
        that.walk(newValue)
        value = newValue

        //发布通知  让所有订阅者更新内容
        dep.notify()
      },
    })
  }
}
