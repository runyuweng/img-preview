import React, { Component } from 'react'
import { render } from 'react-dom'
import ImgPreview from 'img-preview'

const url = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'
const url1 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
const url2 = 'http://is1.mzstatic.com/image/thumb/Purple3/v4/e8/28/d2/e828d25f-7c00-c5c5-1da6-82a70b05e75b/source/1024x1024sr.jpg'

class ExamplePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{ width: '490px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '30px',
          color: '#108ee9',
          textAlign: 'center',
          marginBottom: '20px',
        }}
        >
          Img-Preview-Demo
        </h1>
        <ImgPreview src={[url, url1, url2, url, url1, url2, url, url1, url2, url]} />
      </div>
    )
  }
}

render(<ExamplePage />, document.querySelector('#app'))
