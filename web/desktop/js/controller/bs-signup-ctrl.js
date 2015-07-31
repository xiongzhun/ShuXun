/**
 * Created by wuhaolin on 7/30/15.
 * 不需要必须关注书循微信号后才可以注册，不关注扫码后也可以获得用户信息，填写后注册
 * 在桌面版注册后再去微信版直接就可以登入。
 */
APP.controller('bs_signUp', function ($scope, $stateParams, User$, BootstrapModalView$, InfoService$) {
    $scope.startSchoolYearOptions = InfoService$.startSchoolYearOptions;
    $scope.InfoService$ = InfoService$;
    //是否正在加载中..
    $scope.isLoading = true;
    var wechatAOuthCode = $stateParams['code'];

    $scope.step = 'subscribe';
    User$.getDesktopOAuthUserInfo(wechatAOuthCode).done(function (userInfo) {
        $scope.isLoading = false;
        $scope.userInfo = userInfo;
        User$.loginWithUnionId(userInfo.username).done(function (user) {//已经注册过
            User$.updateMyInfoWithJson(userInfo);//更新微信信息
            $scope.userObjectId = user.id;
            $scope.step = 'ok';
        }).fail(function () {//已经关注书循，但是还没有注册过
            $scope.step = 'info';
        }).always(function () {
            $scope.$digest();
        });
    }).fail(function () {//用户还没有关注
        alert('要先关注书循微信号哦');
        $scope.step = 'subscribe';
    }).always(function () {
        $scope.$digest();
    });

    $scope.chooseMajor = function () {
        BootstrapModalView$.openChooseMajorModalView(function (major) {
            $scope.userInfo.major = major;
        })
    };

    $scope.chooseSchool = function () {
        BootstrapModalView$.openChooseSchoolModalView(function (school) {
            $scope.userInfo.school = school;
        })
    };

    $scope.submitOnClick = function () {
        $scope.isLoading = true;
        delete  $scope.userInfo.openId;//不要存储来自Desktop端的微信openID，因为调用微信接口给用户推送时是通过来自wechat端获得的openID对用户推送的
        User$.signUpWithJSONUser($scope.userInfo).done(function (me) {
            $scope.me = me;
            $scope.step = 'ok';
            User$.loginWithUnionId(me.get('username'));
        }).fail(function (error) {
            alert(error.message);
        }).always(function () {
            $scope.isLoading = false;
            $scope.$digest();
        });
    };
});