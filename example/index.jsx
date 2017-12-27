import React, { Component } from 'react'
import { render } from 'react-dom'
import ImgPreview from 'img-preview'

const url = 'https://avatars2.githubusercontent.com/u/16834265?s=400&u=dd37eb4c227696e1fe47e8354d59b5db53be6959&v=4'
const url1 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
const url2 = 'http://is1.mzstatic.com/image/thumb/Purple3/v4/e8/28/d2/e828d25f-7c00-c5c5-1da6-82a70b05e75b/source/1024x1024sr.jpg'
const url3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512306639939&di=2ed72fe99a940fe06aeb8e96a5ae3ada&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fae51f3deb48f8c5481fc87e03d292df5e1fe7fd5.jpg'
const url4 = 'xxxx'

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

        <h2 style={{ color: '#6f5d4f' }}>default:</h2>

        <ImgPreview src={[url4, url, url1, url2, url, url1, url2, url, url1, url2, url, url3]} />

        <h2 style={{ color: '#6f5d4f' }}>customize:</h2>

        <ImgPreview
          src={[
            {
              url: url1,
              name: '图片1',
            },
            {
              url: url2,
              name: '图片2',
            },
          ]}
          render={t => (
            <span style={{ marginLeft: '10px', color: 'rgb(16, 142, 233)', fontWeight: 'bolder' }}>
              {t.name}
            </span>
          )}
        />
      </div>
    )
  }
}

render(<ExamplePage />, document.querySelector('#app'))
