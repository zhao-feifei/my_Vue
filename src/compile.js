//负责模板解析的类
class Compile {
  constructor(el, vm) {
    // el: new Vue传递的选择器
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    //vm: new 的Vue实例
    this.vm = vm
    //编译模板
    if (this.el) {
      //1.将el中所有的子节点放入内存
      let fragment = this.node2fragment(this.el)
      //2.在内存中编译fragment
      //3.把fragment一次性添加到页面
    }
  }

  //重要方法
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    //把el中所有的子节点全部添加到文档碎片中
    let childNodes = node.childNodes
    this.toArray(childNodes).forEach((node) => {
      fragment.appendChild(node)
    })
  }
  //工具方法
  toArray(likeArray) {
    return [].slice.call(likeArray)
  }
}
