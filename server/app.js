/**
 * Created by wuhaolin on 3/29/15.
 * express 后端服务器
 */
"use strict";
var express = require('express');
var AV = require('leanengine');
var WechatMsg = require('./wechat/wechatMsg.js');
var cloud = require('./cloud/cloud.js');

var app = express();

app.use(cloud);//加载定义的云代码

app.use('/wechatMsg', WechatMsg);//配置微信消息服务

/**
 * 把微信OAuth回调映射到AngularJs signup路由
 */
app.get('/wechatOAuthForwarder', function (req, res) {
    var code = req.query.code;
    var state = req.query.state;
    if (state == 'wechat') {
        res.redirect('/wechat/#/common/signup?code=' + code);
    } else if (state == 'desktop') {
        res.redirect('/desktop/#!/common/signup?code=' + code);
    } else {
        res.redirect('/');
    }
});

app.use(require('prerender-node').set('prerenderServiceUrl', 'http://prerender.wuhaolin.cn'));

/**
 * 配置静态资源
 */
app.use('/', express.static('./public'));

// Handle 404
app.use(function (req, res) {
    res.redirect('/desktop');
});

module.exports = app;