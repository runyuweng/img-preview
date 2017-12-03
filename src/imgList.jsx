/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React from 'react'
import PropTypes from 'prop-types'
import '../assets/index.css'
import ImgItem from './imgItem'

const ImgList = props => (
  <div className="img-preview-list">
    {props.srcList.map((d, i) => (
      d ? <ImgItem src={d} key={i} /> : null
    ))}
  </div>
)

ImgList.propTypes = {
  srcList: PropTypes.array,
}
ImgList.defaultProps = {
  srcList: [],
}

export default ImgList
