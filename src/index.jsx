import React from 'react'
import PropTypes from 'prop-types'
import ImgList from './imgList'

const Index = (props) => {
  const { src } = props
  let srcList
  if (Object.prototype.toString.call(src) === '[object Array]') {
    srcList = src
  } else if (Object.prototype.toString.call(src) === '[object String]') {
    srcList = [src]
  } else {
    console.error('src must be Array or String')
    return ''
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
