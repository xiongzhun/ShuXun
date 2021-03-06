/**
 * Created by wuhaolin on 5/20/15.
 * 进入认证页面
 */
"use strict";

APP.controller('bs_hello', function ($scope, $state) {
    $scope.User$.loginWithUnionId(readCookie('unionId')).done(function () {//尝试使用cookies登入
        $state.go('common.user-home', {ownerId: AV.User.current().id});
    });

    //生成微信二维码
    new WxLogin({
        id: 'WechatLoginQRCodeCon',
        appid: WECHAT.AppID_Desktop,
        scope: 'snsapi_login',
        state: 'desktop',
        redirect_uri: encodeURI('http://www.ishuxun.cn/wechatOAuthForwarder')
    });
    $scope.SEO$.setSEO('微信 登入');
});