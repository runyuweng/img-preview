import React, { Component } from 'react'
import { render } from 'react-dom'
import ImgPreview from 'img-preview'

const url = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'
const url1 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'

class ExamplePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div>example page</div>
        <ImgPreview src={[url, url1]} />
      </div>
    )
  }
}

render(<ExamplePage />, document.querySelector('#app'))
