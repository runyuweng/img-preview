/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React from 'react'
import PropTypes from 'prop-types'
import '../assets/index.css'
import ImgItem from './imgItem'

const ImgList = props => (
  <div className="img-list">
    {props.srcList.map((d, i) => (
      <ImgItem src={d} key={i} />
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
