/**
 * Created by wuhaolin on 5/30/15.
 * AngularJS配置
 */
"use strict";

var leanAnalytics = new _LeanAnalytics('Wechat');
var APP = angular.module('APP', ['ionic'], null)
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //配置ionic样式
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        //配置路由表
        $stateProvider.state('common', {
            url: '/common',
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>'
        }).state('book', {
            url: '/book',
            abstract: true,
            templateUrl: 'tabs.html'
        }).state('person', {
            url: '/person',
            abstract: true,
            templateUrl: 'tabs.html'
        }).state('common.hello', {
            url: '/hello',
            templateUrl: 'html/common/hello.html'
        }).state('common.signup', {
            /**
             * @param:code 用于去微信获取用户消息的凭证
             */
            url: '/signup?code',
            templateUrl: 'html/common/sign-up.html'
        }).state('common.user-list', {
            /**
             * @param:cmd 当前模式 =near时显示我附近的用户
             * @param:title 当前View要显示的标题
             * @param:majorFilter 专业筛选限制
             */
            url: '/user-list?cmd&title&majorFilter',
            templateUrl: 'html/common/user-list.html'
        }).state('common.user-home', {
            /**
             * @param:ownerId 主人的AVOS ID
             * @param:hashId 滚动到的hashId userUsedBook userNeedBook userCircleBook
             */
            url: '/user-home?ownerId&hashId',
            templateUrl: 'html/common/user-home.html'
        }).state('book.recommend', {
            /**
             * @param:major 所有模块专门显示这个专业的书
             */
            url: '/recommend?major',
            views: {
                'book': {
                    templateUrl: 'html/book/recommend.html'
                }
            }
        }).state('book.search-list', {
            /**
             * @param:keyword 要搜索的关键字
             */
            url: '/search-list/?keyword',
            views: {
                'book': {
                    templateUrl: 'html/book/search-list.html'
                }
            }
        }).state('book.book-list', {
            /**
             * @param:cmd 当前模式 =tag时显示一类书 =need
             * 当cmd=tag 时用的表示显示哪一类型的书
             * 当cmd=major 显示一个专业的相关书
             * 当cmd=latest 显示最新的书
             * @param:title 当前View要显示的标题
             * @param:tag 当cmd=tag 时用的表示显示哪一类型的书
             */
            url: '/book-list?cmd&title&tag',
            views: {
                'book': {
                    templateUrl: 'html/book/book-list.html'
                }
            }
        }).state('book.used-book-list', {
            /**
             * @param:cmd 当前模式 =near时显示我附近的二手书 =isbn时显示所有对应ISBN的二手书
             * @param:isbn13 当cmd=isbn时使用
             * @param:tag 专业筛选
             */
            url: '/used-book-list?cmd&isbn13&tag',
            views: {
                'book': {
                    templateUrl: 'html/book/used-book-list.html'
                }
            }
        }).state('book.one-book', {
            /**
             * @param:isbn13 一本书的isbn13号码
             */
            url: '/one-book/?isbn13',
            views: {
                'book': {
                    templateUrl: 'html/book/one-book.html'
                }
            }
        }).state('book.one-used-book', {
            /**
             * @param:usedBookAvosObjectId 二手书的AVOS ID
             */
            url: '/one-used-book/?usedBookAvosObjectId',
            views: {
                'book': {
                    templateUrl: 'html/book/one-used-book.html'
                }
            }
        }).state('book.title-pre', {
            /**
             * @param:title 标题
             * @param:pre 预览
             */
            url: '/title-pre?title&pre',
            views: {
                'book': {
                    templateUrl: 'html/book/title-pre.html'
                }
            }
        }).state('person.edit-one-used-book', {
            /**
             * @param:usedBookId 要编辑的二手书的AVOS usedBookId
             */
            url: '/edit-one-used-book/?usedBookId',
            views: {
                'person': {
                    templateUrl: 'html/person/edit-one-used-book.html'
                }
            }
        }).state('person.upload-one-used-book', {
            /**
             * @param:isbn13 要上传的二手书的isbn13号码
             * @param:role 要上传的书的类型
             */
            url: '/upload-one-used-book/?isbn13&role',
            views: {
                'person': {
                    templateUrl: 'html/person/upload-one-used-book.html'
                }
            }
        }).state('person.status-list', {
            /**
             * @param:cmd 当前模式
             * =newUsedBook时显上传的二手书
             * =newNeedBook 显示发布的求书
             * =private 有同学给我发私信
             * =reviewUsedBook 有同学评价我的书
             */
            url: '/status-list?cmd',
            views: {
                'person': {
                    templateUrl: 'html/person/status-list.html'
                }
            }
        }).state('person.edit-person-info', {
            url: '/edit-person-info',
            views: {
                'person': {
                    templateUrl: 'html/person/edit-person-info.html'
                }
            }
        }).state('person.my', {
            url: '/person/my',
            views: {
                'person': {
                    templateUrl: 'html/person/my.html'
                }
            }
        }).state('person.send-msg-to-user', {
            /**
             * @param:receiverObjectId 接受者的微信openID
             * @param:usedBookObjectId 当前太难的二手书的AVOS ID
             * @param:inboxType private | reviewUsedBook
             * @param:title 显示的说明当前聊天模式标题
             */
            url: '/send-msg-to-user?receiverObjectId&usedBookObjectId&inboxType&title',
            views: {
                'person': {
                    templateUrl: 'html/person/send-msg-to-user.html'
                }
            }
        });
        $urlRouterProvider.otherwise('/book/recommend');
    });

APP.run(function ($rootScope, $state, $anchorScroll, User$, BookInfo$, BookRecommend$, DoubanBook$, InfoService$, SearchBook$, Status$, UsedBook$, WeChatJS$, IonicModalView$) {
    $rootScope.User$ = User$;
    $rootScope.BookInfo$ = BookInfo$;
    $rootScope.BookRecommend$ = BookRecommend$;
    $rootScope.DoubanBook$ = DoubanBook$;
    $rootScope.InfoService$ = InfoService$;
    $rootScope.SearchBook$ = SearchBook$;
    $rootScope.Status$ = Status$;
    $rootScope.UsedBook$ = UsedBook$;

    $rootScope.WeChatJS$ = WeChatJS$;
    $rootScope.IonicModalView$ = IonicModalView$;

    WeChatJS$.config();//马上调用配置微信
    User$.loginWithUnionId(readCookie('unionId'));
    $rootScope.$on('$stateChangeStart', function (event, nextState) {
        var stateName = nextState['name'];
        if (stateName.indexOf('person.') >= 0) {//需要登录
            if (!AV.User.current()) {
                event.preventDefault();//停止当前
                $state.go('common.hello');//去验证身份
            }
        }
    });
    /**
     * 滚动到一个hash标签
     * @param hashId
     */
    $rootScope.scrollToHash = function (hashId) {
        $anchorScroll(hashId);
    };
});
