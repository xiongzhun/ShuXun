/**
 * Created by wuhaolin on 5/20/15.
 * 进入认证页面
 */
"use strict";

APP.controller('ion_hello', function ($scope, $state, $stateParams, $ionicHistory, WeChatJS$, User$) {
    $scope.WeChatJS$ = WeChatJS$;
    User$.loginWithUnionId(readCookie('unionId')).done(function () {//尝试使用cookies登入
        $state.go('tab.person_my');
        $ionicHistory.clearHistory();
    });
});