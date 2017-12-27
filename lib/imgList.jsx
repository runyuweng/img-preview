/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React from 'react'
import PropTypes from 'prop-types'
import '../assets/index.css'
import { isObject } from './utils'
import ImgItem from './imgItem'

const ImgList = props => (
  <div className="img-preview-list">
    {props.srcList.map((d, i) => (
      d ? <ImgItem src={isObject(d) ? (d.url || '') : d} item={d} key={i} render={props.render} /> : null
    ))}
  </div>
)

ImgList.propTypes = {
  render: PropTypes.any,
  srcList: PropTypes.array,
}
ImgList.defaultProps = {
  render: false,
  srcList: [],
}

export default ImgList
