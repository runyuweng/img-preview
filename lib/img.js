export default class Img {
  constructor(oImg) {
    this.getStyle(oImg)
    this.move()
  }
  getStyle = (oImg) => {
    oImg.style.visibility = 'visible'
    this.getContainer()
    this.getImage(oImg)
  }
  getImage = (oImg) => {
    this.img = {
      scale: 1,
      dom: oImg,
      naturalWidth: oImg.offsetWidth,
      naturalHeight: oImg.offsetHeight,
      transform: 0,
    }
  }
  getContainer = () => {
    const oContainer = document.getElementById('img-preview-popup-bg')
    this.container = {
      dom: oContainer,
      width: oContainer.offsetWidth,
      height: oContainer.offsetHeight - 200,
    }
  }
  // 拖拽/鼠标滚动
  move = () => {
    const oImg = this.img.dom
    window.onresize = () => {
      this.getContainer()
      this.initializePosition()
    }
    oImg.onmousedown = (e) => {
      e.preventDefault()
      oImg.setAttribute('class', '')
      let start = true
      const disX = e.clientX - oImg.offsetLeft
      const disY = e.clientY - oImg.offsetTop
      document.onmousemove = (ev) => {
        if (!start) {
          return
        }
        ev.preventDefault()
        this.img.left = ev.clientX - disX
        this.img.top = ev.clientY - disY - 100
        this.render()
      }
      document.onmouseup = () => {
        start = false
        oImg.setAttribute('class', 'transition')
      }
    }
    oImg.onmousewheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        this.enlarge()
      } else if (e.deltaY < 0) {
        this.shrink()
      }
      this.centered()
      this.render()
    }
  }
  // 渲染
  render = () => {
    this.img.dom.style.width = `${this.img.realWidth}px`
    this.img.dom.style.height = `${this.img.realHeight}px`

    this.img.dom.style.marginLeft = `${this.img.left}px`
    this.img.dom.style.marginTop = `${this.img.top}px`

    this.img.dom.style.transform = `rotate(${this.img.transform}deg)`
  }
  reset = () => {
    if (this.container.height < this.img.naturalHeight) {
      const scale = this.container.height / this.img.naturalHeight
      this.shrink(scale)
    } else {
      this.shrink(1)
    }
    this.img.transform = 0
  }
  // 缩小
  shrink = (scale) => {
    if (scale) {
      this.img.scale = scale
      this.img.realWidth = scale * this.img.naturalWidth
      this.img.realHeight = scale * this.img.naturalHeight
      return
    }
    if ((this.img.scale - 0.1) > 0) {
      const newScale = this.img.scale * 0.9
      this.img.scale = newScale
      this.img.realWidth = newScale * this.img.naturalWidth
      this.img.realHeight = newScale * this.img.naturalHeight
    }
  }
  // 放大
  enlarge = () => {
    const scale = this.img.scale * 1.1
    this.img.scale = scale
    this.img.realWidth = scale * this.img.naturalWidth
    this.img.realHeight = scale * this.img.naturalHeight
  }
  // 左转
  turnLeft = () => {
    this.img.transform = this.img.transform - 90
  }
  // 右转
  turnRight = () => {
    this.img.transform = this.img.transform + 90
  }
  // 居中
  centered = () => {
    this.img.left = (this.container.width - this.img.realWidth) / 2
    this.img.top = (this.container.height - this.img.realHeight) / 2
  }
  initializePosition = () => {
    if (this.container.height < this.img.naturalHeight) {
      // 需要缩小的倍数
      const scale = this.container.height / this.img.naturalHeight
      this.shrink(scale)
      this.centered()
      this.render()
    } else {
      this.img.realWidth = this.img.naturalWidth
      this.img.realHeight = this.img.naturalHeight
      this.centered()
      this.render()
    }
    setTimeout(() => {
      this.img.dom.setAttribute('class', 'transition')
    }, 5)
  }
}
