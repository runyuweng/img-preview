/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import '../assets/index.css'
import ImgPreview from './imgPreview'

const Hover = (props) => {
  return (
    <div>
      <div className="img-item-full" onClick={props.handleClick}>
        <span className="img-preview-cancel">x</span>
        <div className=" img-item-content" onClick={e => props.handleStopPropagation(e)} >
          <ImgPreview
            src={props.src}
          />
        </div>
      </div>
    </div>)
}


class ImgItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      loading: true,
    }
    this.showImg = false
    this.div = document.createElement('div')
}

  handleClick = () => {
    this.showImg = !this.showImg
    if (this.showImg) {
      document.body.appendChild(this.div)
      ReactDOM.render(
        <Hover
          src={this.props.src}
          handleStopPropagation={this.handleStopPropagation}
          handleClick={this.handleClick}
        />,
        this.div,
      )
    } else {
      this.div.parentNode && this.div.parentNode.removeChild(this.div)
    }
  }

  handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  handleOnload = () => {
    this.setState({
      loading: false,
    })
  }

  handleError = () => {
    this.setState({
      showError: true,
    })
  }

  render() {
    const { src, render, item } = this.props
    return (
      <div style={{ display: 'inline-block' }}>
        {render && <span onClick={this.handleClick}>{render(item)}</span> || (
          <div className="img-item">
            <div className="loading" style={{ display: this.state.loading ? 'flex' : 'none' }}>
              <div className="img-preview-loading">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            {!this.state.showError ? (
              <div style={{ height: '100%', width: '100%' }}>
                <div className="img-small-content" style={{ display: !this.state.loading ? 'block' : 'none' }}>
                  <img
                    className="img-small"
                    src={src}
                    alt=""
                    onError={this.handleError}
                    onLoad={this.handleOnload}
                  />
                  <div className="img-item-hover" onClick={this.handleClick}>
                    <span className="img-item-preview">
                      <img src="http://s0.meituan.net/bs/tempfs/file/wengrunyu/preview.png" alt="preview" />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="img-error">
                <img
                  onLoad={this.handleOnload}
                  src="http://s0.meituan.net/bs/tempfs/file/wengrunyu/imgerror.png"
                  alt="error"
                />
              </div>
            )}
          </div>
        )}
      </div>)
  }
}

ImgItem.propTypes = {
  item: PropTypes.object,
  render: PropTypes.any,
  src: PropTypes.string,
}
ImgItem.defaultProps = {
  item: {},
  render: false,
  src: '',
}

Hover.propTypes = {
  src: PropTypes.string,
  handleClick: PropTypes.func,
  handleStopPropagation: PropTypes.func,
}
Hover.defaultProps = {
  src: '',
  handleClick: () => {},
  handleStopPropagation: () => {},
}

export default ImgItem
