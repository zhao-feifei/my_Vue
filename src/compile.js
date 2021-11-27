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
      this.compile(fragment)
      //3.把fragment一次性添加到页面
      this.el.appendChild(fragment)
    }
  }

  /*---------------------------------核心方法-------------------------------*/

  // 将node转换为fragment
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    //把el中所有的子节点全部添加到文档碎片中
    let childNodes = node.childNodes

    this.toArray(childNodes).forEach((node) => {
      fragment.appendChild(node)
    })
    return fragment
  }
  //在内存中编译文档碎片
  compile(fragment) {
    let childNodes = fragment.childNodes
    this.toArray(childNodes).forEach((node) => {
      //如果是文本节点，解析插值表达式

      if (this.isElementNode(node)) {
        //如果是元素则解析指令
        this.compileElement(node)
      }
      if (this.isTextNode(node)) {
        //如果是文本节点，解析插值表达式
        this.compileText(node)
      }
      //如果当前节点存在子节点，需要递归解析
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  //解析元素标签
  compileElement(node) {
    // console.log(node)
    //1.获取所有属性
    let attributes = node.attributes
    this.toArray(attributes).forEach((attr) => {
      //2.解析  v-  开头的指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        //获取指令后半部分
        let type = attrName.slice(2)
        let expr = attr.value
        if (type === 'text') {
          node.textContent = this.vm.$data[expr]
        }
        if (type === 'html') {
          node.innerHTML = this.vm.$data[expr]
        }
      }
    })
  }
  //解析文本节点
  compileText(node) {
    // console.log(node)
  }

  /*---------------------------------工具方法-------------------------------*/
  //转换为数组
  toArray(likeArray) {
    return [].slice.call(likeArray)
  }
  //是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
  //是否为文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  //是否为指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
}
