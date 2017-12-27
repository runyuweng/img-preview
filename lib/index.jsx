import React from 'react'
import PropTypes from 'prop-types'
import ImgList from './imgList'

const Index = (props) => {
  const { src, render } = props
  let srcList
  if (Object.prototype.toString.call(src) === '[object Array]' && src.length > 0) {
    srcList = src
  } else if (Object.prototype.toString.call(src) === '[object String]') {
    srcList = [src]
  } else {
    return null
  }
  return <ImgList srcList={srcList} render={render} />
}

Index.propTypes = {
  render: PropTypes.any,
  src: PropTypes.any,
}
Index.defaultProps = {
  render: false,
  src: '',
}

export default Index
