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
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('您获取了值', value)
        return value
      },
      set(newValue) {
        if (newValue === value) {
          return
        }
        that.walk(newValue)
        value = newValue
        console.log('您设置了值', newValue)
      },
    })
  }
}
