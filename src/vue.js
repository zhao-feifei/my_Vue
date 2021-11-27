class Vue {
  constructor(options = {}) {
    // 将传过来的数据绑定给vm实例
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods
    // 如果指定了el,则对el进行解析
    if (this.$el) {
      // Compile负责解析模板
      new Compile(this.$el, this) //这里将  模板,  vm实例  传递过去
    }
  }
}
