import React from 'react'
import PropTypes from 'prop-types'
import ImgList from './imgList'

const Index = (props) => {
  const { src } = props
  let srcList
  if (Object.prototype.toString.call(src) === '[object Array]' && src.length > 0) {
    srcList = src
  } else if (Object.prototype.toString.call(src) === '[object String]') {
    srcList = [src]
  } else {
    return null
  }
  return <ImgList srcList={srcList} />
}

Index.propTypes = {
  src: PropTypes.any,
}
Index.defaultProps = {
  src: '',
}

export default Index
