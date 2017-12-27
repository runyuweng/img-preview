# img-preview
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
    return (
      <div>
        <ImgPreview src='url'/>
        <ImgPreview src={[url0, url1, url2]}/>
        <ImgPreview
          render={(t) => <a href={t.url}>t.name</a>}
          src={[
            {
              url: '111',
              name: '111,
            }, {
              url: '222',
              name: '222,
            },{
              url: '333',
              name: '333,
            },
          ]}
        />
      </div>
  }
}
```
## 配置
- src: 支持数组或是字符串（url地址）
- render: 自定义渲染list样式

注意：在使用render时，src必须为array类型，同时array的每一项必须为object类型并包含src属性，详见demo。
## 特性
- 自动生成预览缩略图
- 点击缩略图后弹出大图
- 支持自定义列表样式
- 支持放大缩小、旋转、拖拽等操作
## 预览
| 缩略图列表 | 大图 |
| ---- | ---- |
| ![image](assets/list.png) | ![image](assets/detail.png) |
