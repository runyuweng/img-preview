import React from 'react'
import PropTypes from 'prop-types'
import List from './list'
import { isArray, isString } from './utils'

const Index = (props) => {
  const { src, render } = props

  let srcList

  if (isArray(src) && src.length > 0) {
    srcList = src
  } else if (isString(src)) {
    srcList = [src]
  } else {
    return null
  }
  return <List srcList={srcList} render={render} />
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
