/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../assets/index.css'
import ImgPreview from './imgPreview'

class ImgItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showImg: false,
    }
  }

  handleClick = () => {
    this.setState({
      showImg: !this.state.showImg,
    })
  }

  handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    const { src } = this.props
    return (
      <div className="img-item">
        {/* <div className="loading">
          <div className="img-preview-loading">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div> */}
        <div className="img-small-content">
          <img className="img-small" src={src} alt="" />
          <div className="img-item-hover" onClick={this.handleClick}>
            <span className="img-item-preview">
              <img src="http://s0.meituan.net/bs/tempfs/file/wengrunyu/preview.png" alt="" />
            </span>
          </div>
        </div>
        {this.state.showImg ? (
          <div className="img-item-full" onClick={this.handleClick}>
            <span className="img-preview-cancel" onClick={this.handleClick}>x</span>          
            <div className=" img-item-content" onClick={e => this.handleStopPropagation(e)} >
              <ImgPreview
                src={src}
              />
            </div>
          </div>
        ) : null}
      </div>)
  }
}

ImgItem.propTypes = {
  src: PropTypes.string,
}
ImgItem.defaultProps = {
  src: '',
}

export default ImgItem
