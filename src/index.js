import React, { PureComponent } from 'react'
import ImgPreview from './imgPreview'
import ImgList from './imgList.jsx'

export default (props) => {
  const { src } = props;
  let srcList = []
  if (src && Object.prototype.toString.call(src) === '[object Array]') {
    srcList = src
  } else {
    srcList.push(src)
  }
  return <ImgList srcList={srcList} />
}