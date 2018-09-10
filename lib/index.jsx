import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'
import { isArray, isString, isObject } from './utils'
import '../assets/index.css'
import '../assets/iconfont.css'

const Index = (props) => {
  const { src, render, emptyText } = props

  let srcList

  if (isArray(src) && src.length > 0) {
    srcList = src
  } else if (isString(src)) {
    srcList = [src]
  } else {
    return emptyText
  }
  return (
    <div className="img-preview">
      {srcList.map((d, i) => (
        d ? <Item
          src={isObject(d) ? (d.url || '') : d}
          item={d}
          key={i}
          render={render}
        /> : null
      ))}
    </div>
  )
}

Index.propTypes = {
  render: PropTypes.any,
  src: PropTypes.any,
  emptyText: PropTypes.any,
}
Index.defaultProps = {
  render: false,
  src: '',
  emptyText: null,
}

export default Index
