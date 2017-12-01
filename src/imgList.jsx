/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React, { Component } from 'react'
import './ImgPreview.scss'
import ImgPreview from './imgPreview'

const url = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'
const url1 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
class ImgItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNum: ''
    }
  }

  handleClick = (d, i) => {
    this.setState({
      showNum: i
    })
  }

  handleCancelPreview = () => {
    console.log(111)
    this.setState({
      showNum: ''
    })
  }

  handleStopPropagation = (e) => {
    e.stopPropagation()
  }
  
  render() {
    console.log(this.state)
    return (<div className="img-list">
      {this.props.srcList.map((d, i) => <div key={i} className="img-item">
        <img className="img-small" src={d} alt="" />
        <div className="img-item-hover" onClick={() => { this.handleClick(d, i) }}>
          <span className="img-item-preview">
            <img src="http://s0.meituan.net/bs/tempfs/file/wengrunyu/preview.png" alt="" />
          </span>
        </div>
        { this.state.showNum === i ? <div className="img-item-full" onClick={this.handleCancelPreview}>
          <div className="img-item-content" onClick={e => this.handleStopPropagation(e)}>
            <ImgPreview src={d} />
          </div>
        </div> : ''}
      </div>)}
    </div>)
  }
}

export default ImgItem;
