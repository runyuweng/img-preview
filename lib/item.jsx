/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Popup from './popup'
import { SUCCESS_STATUS, LOADING_STATUS, ERROR_STATUS } from './constants'

class ImgItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: LOADING_STATUS,
    }
    this.showImg = false
    this.div = document.createElement('div')
  }

  handleClick = () => {
    if (this.state.status === 'error') {
      return
    }
    this.showImg = !this.showImg
    if (this.showImg) {
      document.body.appendChild(this.div)
      ReactDOM.render(
        <div id="img-preview-popup-bg" onClick={this.handleClick}>
          <div className="iconfont icon-close cancel" />
          <Popup src={this.props.src} ref={(popup) => { this.popup = popup }} />
        </div>,
        this.div,
      )
    } else {
      this.popup.componentWillUnmount()
      this.div.parentNode && this.div.parentNode.removeChild(this.div)
    }
  }

  handleReload = () => {
    this.setState({
      status: LOADING_STATUS,
    })
  }

  handleOnload = () => {
    this.setState({
      status: SUCCESS_STATUS,
    })
  }

  handleError = () => {
    setTimeout(() => {
      this.setState({
        status: ERROR_STATUS,
      })
    }, 100)
  }

  handleStatusRender = () => {
    const { status } = this.state
    const { src } = this.props
    switch (status) {
      case ERROR_STATUS:
        return <div className="iconfont icon-error_img error" onClick={this.handleReload} />
      case LOADING_STATUS:
        return (
          <div className="img-preview-loading">
            <div className="img-preview-loading-container">
              <span />
              <span />
              <span />
              <span />
            </div>
            <img
              src={src}
              alt="tumbnail"
              onError={this.handleError}
              onLoad={this.handleOnload}
            />
          </div>
        )
      case SUCCESS_STATUS:
        return (
          <div className="success" onClick={this.handleClick}>
            <img src={src} alt="tumbnail" />
            <div className="img-hover">
              <div className="iconfont icon-view view" />
            </div>
          </div>
        )
      default:
        return null
    }
  }


  render() {
    const { render, item } = this.props
    return (
      <div className="thumbnail-container">
        {render ? (
          <span onClick={this.handleClick}>
            {render(item)}
          </span>
        ) : (
          <div className="thumbnail">
            {this.handleStatusRender()}
          </div>
        )}
      </div>
    )
  }
}

ImgItem.propTypes = {
  render: PropTypes.any,
  item: PropTypes.any,
  src: PropTypes.string,
}

ImgItem.defaultProps = {
  render: null,
  item: {},
  src: '',
}

export default ImgItem
