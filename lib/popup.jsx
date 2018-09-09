/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { PureComponent } from 'react'
import Img from './img.js';

class Popup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading'
    }
  }
  componentWillReceiveProps() {
    this.setState({
      status: 'loading'
    })
  }
  componentWillUnmount() {
    this.setState({
      status: 'end'
    })
  }
  handleOnload = () => {
    // 打开后立即关闭
    if (!document.getElementById('img-preview-popup-bg')) {
      return
    }
    this.setState({
      status: "success"
    })
    this.newImg = new Img(this.img)
    this.newImg.initializePosition()
  }
  handleClick = (e) => {
    // 防止触发关闭事件
    e.stopPropagation()
  }
  handleShrink = () => {
    this.newImg.shrink()
    this.newImg.centered()
    this.newImg.render()
  }
  handleEnlarge = () => {
    this.newImg.enlarge()
    this.newImg.centered()
    this.newImg.render()
  }
  handleTurnLeft = () => {
    this.newImg.turnLeft()
    this.newImg.centered()
    this.newImg.render()
  }
  handleTurnRight = () => {
    this.newImg.turnRight()
    this.newImg.centered()
    this.newImg.render()
  }
  handleReset = () => {
    this.newImg.reset()
    this.newImg.centered()
    this.newImg.render()
  }

  handleError = () => {
    setTimeout(() => {
      this.setState({
        status: 'error'
      })
    }, 100)
  }

  handleReload = (e) => {
    e.stopPropagation()
    this.setState({
      status: 'loading'
    })
  }

  render() {
    const { status } = this.state;
    switch (status) {
      case 'loading':
        return (
          <div className="img-preview-popup">
            <div className="img-preview-loading">
              <div className="img-preview-loading-container">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <img
              src={this.props.src}
              onClick={this.handleClick}
              ref={(img) => { this.img = img }}
              onLoad={this.handleOnload}
              onError={this.handleError}
            />
          </div>
        )
      case 'error':
        return (
          <div className="img-preview-popup">
            <div className="error">
              <div className="iconfont icon-error_img" onClick={this.handleReload}/> 
            </div>
          </div>
        )
      case 'success':
        return (
          <div className="img-preview-popup">
            <img
              src={this.props.src}
              onClick={this.handleClick}
              ref={(img) => { this.img = img }}
              onLoad={this.handleOnload}
              onError={this.handleError}
            />
            <div className="toolbar">
              <ul onClick={this.handleClick}>
                <li className="iconfont icon-enlarge"  onClick={this.handleEnlarge}/>
                <li className="iconfont icon-shrink" onClick={this.handleShrink}/>
                <li className="iconfont icon-turn-left" onClick={this.handleTurnLeft}/>
                <li className="iconfont icon-turn-right" onClick={this.handleTurnRight}/>
                <li className="iconfont icon-refresh"  onClick={this.handleReset}/>
              </ul>
            </div>
          </div>
        )
      case 'end':
        return null
    }
  }
}


export default Popup
