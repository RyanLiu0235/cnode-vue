// 借鉴了 @1340641314 的项目 react-cnode，传送门：https://github.com/1340641314/react-cnode/blob/master/server.js

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var opn = require('opn');
var morgan = require('morgan');

// 相当于通过本地node服务代理请求到了http://cnodejs.org/api
var proxy = [{
  path: '/api/v1/*',
  target: 'https://cnodejs.org',
  host: 'cnodejs.org'
}];

//启动服务
var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  proxy: proxy
});

server.app.use(morgan());

//将其他路由，全部返回index.html
server.app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

server.listen(5000, function() {
  console.log('server is running at http://localhost:5000/');
  opn('http://localhost:5000/');
});
