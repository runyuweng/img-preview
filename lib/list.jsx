/**
 * 图片预览
 * autohr: wengrunyu@meituan.com
 */
import React from 'react'
import '../assets/index.css'
import { isObject } from './utils'
import Item from './item'

const List = props => (
  <div className="img-preview">
    {props.srcList.map((d, i) => (
      d ? <Item
        src={isObject(d) ? (d.url || '') : d}
        item={d}
        key={i}
        render={props.render}
      /> : null
    ))}
  </div>
)

export default List
