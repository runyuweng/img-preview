# img-preview
## 介绍
图片预览组件，点击后全屏显示，支持放大缩小、拖拽等操作。
## 安装
`$ npm install img-preview`
## 使用
```
import ImgPreview from 'img-preview';
...
class AgentList extends Component {
  ...
  render(){
    return <ImgPreview src='url'/>
  }
}
```
## 配置
- src: 