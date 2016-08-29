var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var superagent = require('superagent');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 请求最新消息
 */
app.get('/news/latest', function(req, res) {
	superagent
		.get('http://news-at.zhihu.com/api/4/news/latest')
		.end(function(err, data) {
			res.json(data.body);
		});
});

/**
 * 请求图片
 */
app.get('/img/:picAddress/:picId', function(req, res) {
	var picAddress = req.params.picAddress;
	var picId = req.params.picId;
	superagent
		.get('http://' + picAddress + '/' + picId)
		.end(function(err, data) {
			res.send(data.body);
		});
});

app.listen('5001', function() {
	console.log('server is running at http://localhost:5001');
})
