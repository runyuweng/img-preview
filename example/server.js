
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(3000, (error) => {
  if (error) throw error
  console.log('Server running at http://localhost:3000.')
})
