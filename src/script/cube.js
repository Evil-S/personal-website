function Cure(node) {
  // 定义立方体类
  this.node = node
  this.init()
}
Cure.prototype.init = function() {
  // 立方体对象初始化
  let self = this
  this.nodes = []
  self.nodes = self.update(self.node)
  self.bindEvents(self.node)
}
Cure.prototype.update = function(item) {
  // 获取立方体的宽高定位信息
  return {
    w: item.offsetWidth,
    h: item.offsetHeight,
    l: item.offsetLeft,
    t: item.offsetTop
  }
}
Cure.prototype.bindEvents = function(item) {
  // 绑定进入事件
  let self = this
  item.onmouseenter = function(e) {
    self.addClass(e, item, 'in')
    return false
  }
  item.onmouseleave = function(e) {
    self.addClass(e, item, 'out')
    return false
  }
}
Cure.prototype.addClass = function(e, item, state) {
  // 添加类名
  let direction = this.getDirection(e)
  let classSuffix = ''
  if (direction === 0) {
    classSuffix = 'Top'
  } else if (direction === 1) {
    classSuffix = 'Right'
  } else if (direction === 2) {
    classSuffix = 'Bottom'
  } else if (direction === 3) {
    classSuffix = 'Left'
  }
  item.className = 'skills-cube-wrapper'
  item.classList.add(state + classSuffix)
}
Cure.prototype.getDirection = function(e) {
  // 判断进入方向
  let w = this.nodes.w
  let h = this.nodes.h
  let x = e.pageX - this.nodes.l - w / 2
  let y = e.pageY - this.nodes.t - h / 2
  let d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4
  return d // d的数值用于判断方向上下左右。
}
export {
  Cure
}
