/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { PureComponent } from 'react';
import './index.css';

class ImgPreview extends PureComponent {
  constructor(props) {
    super(props);
    const partialThis = {
      deg: 0,
      scale: 1,
      dragging: false
    }
    Object.assign(this, partialThis)
  }

  componentDidMount() {
    // 当鼠标移出图片并触发mouseup时
    document.addEventListener('mouseup',this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup',this.handleMouseUp);    
  }

  getInitStyle = () => {
    const imgRect = this.img.getBoundingClientRect();
    const conRect = this.container.getBoundingClientRect();
    this.differ = imgRect.width < conRect.width? (imgRect.left - conRect.left): 0;
    // 如果图片大小大于边框大小进行缩小
    if (this.img.offsetWidth > this.container.offsetWidth){
      this.img.style.width = '100%';
    }
    // 获取img和container相关的属性保存在this上
    this.getRealPosition();
    this.oldWidth = this.img.offsetWidth;
    this.oldHeight = this.img.offsetHeight;
  }

  // 放大
  handleEnlarge = () => {
    const newScale = parseFloat((this.scale + 0.1).toFixed(1));
    this.scale = newScale > 5 ? 5 : newScale;
    this.img.style.transform = `rotate(${this.deg}deg) scale(${this.scale})`;
    this.getRealPosition();
  }

  // 缩小
  handleShrink = () => {
    const newScale = parseFloat((this.scale - 0.1).toFixed(1))
    this.scale = newScale < 1 ? 1 : newScale;
    this.img.style.transform = `rotate(${this.deg}deg) scale(${this.scale})`;
    this.initPosition();
    this.getRealPosition();
  }

  // 左转
  handleTurnLeft = () => {
    this.deg = (this.deg - 90 < 0) ? 270 : (this.deg - 90);

    if (this.deg === 90 || this.deg === 270){
      this.container.style.height = `${this.oldWidth}px`;
    } else {
      this.container.style.height = `${this.oldHeight}px`;     
    }
    this.img.style.transform = `rotate(${this.deg}deg) scale(${this.scale})`;
    this.initPosition()
    this.getRealPosition();
  }

  // 右转
  handleTurnRight = () => {
    this.deg = (this.deg + 90 > 360) ? 90 : (this.deg + 90);

    if (this.deg === 90 || this.deg === 270){
      this.container.style.height = `${this.oldWidth}px`;
    } else {
      this.container.style.height = `${this.oldHeight}px`;
    }
    this.img.style.transform = `rotate(${this.deg}deg) scale(${this.scale})`;
    this.initPosition()
    this.getRealPosition();
  }

  // 鼠标滚轮放大缩小
  handleWheelChange = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      this.handleEnlarge();
    }
    else if (e.deltaY < 0) {
      this.handleShrink();
    }
  }

  // 触发拖拽
  handleMouseDown = (e) => {
    e.preventDefault();
    this.dragging = true;
    // 用来初始化img的位置
    const imgX = this.translatePx(this.img.style.left);
    const imgY = this.translatePx(this.img.style.top);
    this.offsetX = e.pageX - imgX;
    this.offsetY = e.pageY - imgY;
  }

  // 开始拖拽
  handleMouseMove = (e) => {
    e.preventDefault();

    if (this.dragging){
      const imgRect = this.img.getBoundingClientRect();
      const conRect = this.container.getBoundingClientRect();

      let x = e.pageX - this.offsetX;
      let y = e.pageY - this.offsetY;

      // 限制大小小于边框大小无法拖拽，并且若有边界超出自动纠正位置
      if (imgRect.width < conRect.width) {
        x = this.imgX
      } else if (x > this.imgX + this.realContainerLeft - this.realImgLeft) {
        x = this.imgX + this.realContainerLeft - this.realImgLeft;
      }

      if (imgRect.height < conRect.height) {
        y = this.imgY
      } else if (y > this.imgY + this.realContainerTop - this.realImgTop) {
        y = this.imgY + this.realContainerTop - this.realImgTop;
      }
      
      if (imgRect.width < conRect.width) {
        x = this.imgX;        
      } else if (-x > -this.imgX + this.imgWidth + this.realImgLeft - this.conWidth - this.realContainerLeft) {
        x = this.imgX - (this.imgWidth + this.realImgLeft - this.conWidth - this.realContainerLeft);
      }

      if (imgRect.height < conRect.height) {
        y = this.imgY
      } else if (-y > -this.imgY + this.imgHeight + this.realImgTop - this.conHeight - this.realContainerTop) {
        y = this.imgY - (this.imgHeight + this.realImgTop - this.conHeight - this.realContainerTop);
      }

      this.img.style.left = `${x}px`;
      this.img.style.top = `${y}px`;
    }
  }

  // 结束拖拽
  handleMouseUp = (e) => {
    e.preventDefault();
    this.dragging = false; 
  }

  getRealPosition = () => {
    // 使用transform后的真实位置需要用getBoundingClientRect()方法获取
    const imgRect = this.img.getBoundingClientRect();
    const conRect = this.container.getBoundingClientRect();
    const partialThis = {
      realImgLeft: imgRect.left,
      realContainerLeft: conRect.left,
      realImgTop: imgRect.top,
      realContainerTop: conRect.top,
      imgX: this.translatePx(this.img.style.left),
      imgY: this.translatePx(this.img.style.top),
      imgWidth: imgRect.width,
      imgHeight: imgRect.height,
      conWidth: conRect.width,
      conHeight: conRect.height
    }
    Object.assign(this, partialThis);
  }

  // 初始化位置，防止container内部有空白
  initPosition = () => {
    const imgRect = this.img.getBoundingClientRect();
    const conRect = this.container.getBoundingClientRect();

    if ( this.scale === 1 && (this.deg === 0 || this.deg === 180 || this.deg === 360)){
      this.img.style.left = '0px';
      this.img.style.top = '0px';
      return
    }

    // 判断是哪个边界超出
    if (imgRect.left > conRect.left && imgRect.width > conRect.width) {
      this.img.style.left = parseInt(this.translatePx(this.img.style.left) - (imgRect.left - conRect.left)) + 'px';
    }

    if (imgRect.top > conRect.top) {
      this.img.style.top = parseInt(this.translatePx(this.img.style.top) - (imgRect.top - conRect.top)) + 'px';
    }

    if (imgRect.right < conRect.right && imgRect.width > conRect.width) {
      this.img.style.left = parseInt(this.translatePx(this.img.style.left) + ( conRect.right - imgRect.right)) + 'px';     
    }

    if (imgRect.bottom < conRect.bottom) {
      this.img.style.top = parseInt(this.translatePx(this.img.style.top) + (conRect.bottom - imgRect.bottom)) + 'px';      
    }
  }

  translatePx = (value) => {
    return value ? parseInt(value.split('px')[0]) : 0
  }

  render() {
    return (<div className="img-preview">
      <div className="btn-group">
        <span onClick={this.handleEnlarge}>放大</span>
        <span onClick={this.handleShrink}>缩小</span>
        <span onClick={this.handleTurnLeft}>左旋</span>
        <span onClick={this.handleTurnRight}>右旋</span>
      </div>
      <div className="img" ref={(container) => { this.container = container; }}>
        <img
          src={this.props.src}
          ref={(img) => { this.img = img; }}
          onLoad={this.getInitStyle}
          onWheel={this.handleWheelChange}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        />
      </div>
    </div>)
  }
}

export default ImgPreview;