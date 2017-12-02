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
      showNum: '',
    }
  }

  handleClick = (d, i) => {
    this.setState({
      showNum: i,
    })
  }

  handleCancelPreview = () => {
    this.setState({
      showNum: '',
    })
  }

  handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  render() {
    console.log(this.state)
    return (
      <div className="img-list">
        {this.props.srcList.map((d, i) => (
          <div key={i} className="img-item">
            <img className="img-small" src={d} alt="" />
            <div className="img-item-hover" onClick={() => { this.handleClick(d, i) }}>
              <span className="img-item-preview">
                <img src="http://s0.meituan.net/bs/tempfs/file/wengrunyu/preview.png" alt="" />
              </span>
            </div>
            {this.state.showNum === i ? (
              <div className="img-item-full" onClick={this.handleCancelPreview}>
                <div className="img-item-content" onClick={e => this.handleStopPropagation(e)}>
                  <ImgPreview src={d} />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>)
  }
}

ImgItem.propTypes = {
  srcList: PropTypes.array,
}
ImgItem.defaultProps = {
  srcList: [],
}

export default ImgItem
