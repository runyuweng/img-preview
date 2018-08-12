/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../assets/index.css'
import Popup from './popup'

class ImgItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading'
    }
    this.showImg = false
    this.div = document.createElement('div')
  }

  handleClick = () => {
    if (this.state.status === 'error') {
      return
    }
    this.showImg = !this.showImg;
    if (this.showImg) {
      document.body.appendChild(this.div)
      ReactDOM.render(
        <div id="img-preview-popup-bg" onClick={this.handleClick}>
          <div className="iconfont icon-close cancel" />
          <Popup src={this.props.src} />
        </div>,
        this.div,
      )
    } else {
      this.div.parentNode && this.div.parentNode.removeChild(this.div)
    }
  }

  handleOnload = () => {
    this.setState({
      status: 'success',
    })
  }

  handleError = () => {
    this.setState({
      status: 'error'
    })
  }

  handleShow = () => {
    const { status } = this.state;
    const { src } = this.props
    switch (status) {
      case 'error':
        return <div className="iconfont icon-img-error error"/> ;
      case 'loading':
        return (
          <div className="loading">
            <div className="loading-container">
              <span />
              <span />
              <span />
              <span />
            </div>
            <img
              src={src}
              onError={this.handleError}
              onLoad={this.handleOnload}
            />
          </div>
        );
      case 'success':
        return (
          <div className="success" onClick={this.handleClick}>
            <img src={src}/>
            <div className="img-hover">
              <div className="iconfont icon-view view"></div>
            </div>
          </div>
        );
    }
  }

  handleRender = () => {
    const { render, item } = this.props;
    if (render) {
      return (
        <span onClick={this.handleClick}>
          {render(item)}
        </span>
      )
    }
    return (
      <div className="thumbnail">
        {this.handleShow()}
      </div>
    )
  }

  render() {
    const { render, item } = this.props
    return (
      <div className="thumbnail-container">
        {this.handleRender()}
      </div>
    )
  }
}

export default ImgItem
