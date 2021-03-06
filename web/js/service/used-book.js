/**
 * Created by wuhaolin on 5/20/15.
 * 二手书
 */
"use strict";

APP.service('UsedBook$', function ($rootScope, $state) {
    var that = this;

    /**
     * 是否正在加载数据
     * @type {boolean}
     */
    this.isLoading = false;

    /**
     * 加载对应用户所有还没有卖出的二手书
     * @param avosUser
     * @returns {*|AV.Promise}
     */
    this.loadUsedBookListForOwner = function (avosUser) {
        var query = avosUser.relation('usedBooks').query();
        query.descending('alive');
        query.equalTo('role', 'sell');
        query.limit(1000);
        return query.find();
    };

    /**
     * 加载对应用户所有发布的求书
     * @param avosUser
     * @returns {*|AV.Promise}
     */
    this.loadNeedBookListForOwner = function (avosUser) {
        var query = avosUser.relation('usedBooks').query();
        query.descending('alive');
        query.equalTo('role', 'need');
        query.limit(1000);
        return query.find();
    };

    /**
     * 加载对应用户所有发布的书漂流
     * @param avosUser
     * @returns {*|AV.Promise}
     */
    this.loadCircleBookListForOwner = function (avosUser) {
        var query = avosUser.relation('usedBooks').query();
        query.descending('alive');
        query.equalTo('role', 'circle');
        query.limit(1000);
        return query.find();
    };

    /**
     * 我上传的二手书
     * @type {{isLoading: boolean, usedBooks: Array, loadMore: Function, _hasMoreFlag: boolean, hasMore: Function}}
     */
    this.MyUsedBook = {
        isLoading: false,
        usedBooks: [],
        loadMore: function () {
            var query = AV.User.current().relation('usedBooks').query();
            query.descending('alive');
            query.skip(that.MyUsedBook.usedBooks.length);
            query.limit(LoadCount);
            query.equalTo('role', 'sell');
            query.find().done(function (usedBookList) {
                if (usedBookList.length > 0) {
                    that.MyUsedBook.usedBooks.pushUniqueArray(usedBookList);
                } else {
                    that.MyUsedBook._hasMoreFlag = false;
                }
            }).always(function () {
                that.MyUsedBook.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            });
        },
        _hasMoreFlag: true,
        hasMore: function () {
            return that.MyUsedBook._hasMoreFlag;
        }
    };

    /**
     * 我上传的求书
     * @type {{isLoading: boolean, needBooks: Array, loadMore: Function, _hasMoreFlag: boolean, hasMore: Function}}
     */
    this.MyNeedBook = {
        isLoading: false,
        needBooks: [],
        loadMore: function () {
            var query = AV.User.current().relation('usedBooks').query();
            query.descending('alive');
            query.skip(that.MyNeedBook.needBooks.length);
            query.limit(LoadCount);
            query.equalTo('role', 'need');
            query.find().done(function (needBookList) {
                if (needBookList.length > 0) {
                    that.MyNeedBook.needBooks.pushUniqueArray(needBookList);
                } else {
                    that.MyNeedBook._hasMoreFlag = false;
                }
            }).always(function () {
                that.MyNeedBook.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            });
        },
        _hasMoreFlag: true,
        hasMore: function () {
            return that.MyNeedBook._hasMoreFlag;
        }
    };

    /**
     * 我上传的书漂流
     * @type {{isLoading: boolean, circleBooks: Array, loadMore: Function, _hasMoreFlag: boolean, hasMore: Function}}
     */
    this.MyCircleBook = {
        isLoading: false,
        circleBooks: [],
        loadMore: function () {
            var query = AV.User.current().relation('usedBooks').query();
            query.descending('alive');
            query.skip(that.MyCircleBook.circleBooks.length);
            query.limit(LoadCount);
            query.equalTo('role', 'circle');
            query.find().done(function (circleBookList) {
                if (circleBookList.length > 0) {
                    that.MyCircleBook.circleBooks.pushUniqueArray(circleBookList);
                } else {
                    that.MyCircleBook._hasMoreFlag = false;
                }
            }).always(function () {
                that.MyCircleBook.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            });
        },
        _hasMoreFlag: true,
        hasMore: function () {
            return that.MyCircleBook._hasMoreFlag;
        }
    };

    /**
     * 重新加载我的UsedBook
     * @param roleFilter 只重新加载对应的role
     */
    that.reloadMyUsedBookAndGoMyHome = function (roleFilter) {
        var hashId = '';
        if (roleFilter === 'sell') {
            that.MyUsedBook.usedBooks.length = 0;
            that.MyUsedBook.loadMore();
            hashId = 'userUsedBook';
        } else if (roleFilter === 'need') {
            that.MyNeedBook.needBooks.length = 0;
            that.MyNeedBook.loadMore();
            hashId = 'userNeedBook';
        } else if (roleFilter === 'circle') {
            that.MyCircleBook.circleBooks.length = 0;
            that.MyCircleBook.loadMore();
            hashId = 'userCircleBook';
        }
        $rootScope.$digest();
        $rootScope.$broadcast('scroll.infiniteScrollComplete');
        $state.go('common.user-home', {ownerId: AV.User.current().id, hashId: hashId});
    };

    /**
     * 把这本UsedBook杀死
     * @param avosUsedBook
     * @param receiver
     */
    that.killUsedBook = function (avosUsedBook, receiver) {
        avosUsedBook.set('alive', false);
        receiver && avosUsedBook.set('receiver', receiver);
        avosUsedBook.save().done(function () {
            var role = avosUsedBook.get('role');
            that.reloadMyUsedBookAndGoMyHome(role);
        }).fail(function (err) {
            alert(err.message);
        });
    };

    /**
     * 把这本UsedBook救活
     * @param avosUsedBook
     */
    that.backToLifeUsedBook = function (avosUsedBook) {
        avosUsedBook.set('alive', true);
        avosUsedBook.set('receiver', null);
        avosUsedBook.save().done(function () {
            var role = avosUsedBook.get('role');
            that.reloadMyUsedBookAndGoMyHome(role);
        }).fail(function (err) {
            alert(err.message);
        });
    };

    /**
     * 上传一本书保存到数据库
     * 会更新MyUsedBook.usedBooks ｜ MyNeedBook.needBooks
     * @param avosUsedBook
     * @returns {*|AV.Promise}
     */
    this.saveUsedBook = function (avosUsedBook) {
        var rePromise = new AV.Promise();
        avosUsedBook.save(null).done(function () {
            rePromise.resolve(avosUsedBook);
            var role = avosUsedBook.get('role');
            that.reloadMyUsedBookAndGoMyHome(role);
        }).fail(function (error) {
            rePromise.reject(error);
        });
        return rePromise;
    };

    this.ISBN_sell = {
        /**
         * 获得对应ISBN的二手书一共有多少本
         * @param isbn13
         * @returns {*|AV.Promise}
         */
        getUsedBookNumberEqualISBN: function (isbn13) {
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo('role', 'sell');
            query.equalTo("isbn13", isbn13);
            return query.count();
        },
        /**
         * 目前正在加载的二手书的ISBN号码
         * @type {string}
         */
        nowISBN13: '',
        /**
         * 目前已经加载了对应的ISBN号码的二手书列表
         * @type {Array}
         */
        nowEqualISBNUsedBooks: [],
        /**
         * 获得所有对应ISBN的二手书
         * @param isbn13
         */
        loadMoreUsedBookEqualISBN: function (isbn13) {
            that.isLoading = true;
            if (isbn13 != that.ISBN_sell.nowISBN13) {//如果是新的ISBN号码就清空以前的
                that.ISBN_sell.nowISBN13 = isbn13;
                that.ISBN_sell.nowEqualISBNUsedBooks = [];
                that.ISBN_sell.hasMoreFlag = true;
            }
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo("isbn13", that.ISBN_sell.nowISBN13);
            query.equalTo('role', 'sell');
            query.descending("updatedAt");
            query.skip(that.ISBN_sell.nowEqualISBNUsedBooks.length);
            query.limit(5);
            query.include('owner');
            query.find().done(function (usedBooks) {
                if (usedBooks.length > 0) {
                    that.ISBN_sell.nowEqualISBNUsedBooks.pushUniqueArray(usedBooks);
                } else {
                    that.ISBN_sell.hasMoreFlag = false;
                }
            }).always(function () {
                that.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            })
        },
        hasMoreFlag: true,
        hasMore: function () {
            return that.ISBN_sell.hasMoreFlag;
        }
    };

    this.ISBN_need = {
        /**
         * 获得对应ISBN的二手书一共有多少本
         * @param isbn13
         * @returns {*|AV.Promise}
         */
        getNeedBookNumberEqualISBN: function (isbn13) {
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo('role', 'need');
            query.equalTo("isbn13", isbn13);
            return query.count();
        },
        /**
         * 目前正在加载的二手书的ISBN号码
         * @type {string}
         */
        nowISBN13: '',
        /**
         * 目前已经加载了对应的ISBN号码的二手书列表
         * @type {Array}
         */
        nowEqualISBNNeedBooks: [],
        /**
         * 获得所有对应ISBN的二手书
         * @param isbn13
         */
        loadMoreNeedBookEqualISBN: function (isbn13) {
            that.isLoading = true;
            if (isbn13 != that.ISBN_need.nowISBN13) {//如果是新的ISBN号码就清空以前的
                that.ISBN_need.nowISBN13 = isbn13;
                that.ISBN_need.nowEqualISBNNeedBooks = [];
                that.ISBN_need.hasMoreFlag = true;
            }
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo("isbn13", that.ISBN_need.nowISBN13);
            query.equalTo('role', 'need');
            query.descending("updatedAt");
            query.skip(that.ISBN_need.nowEqualISBNNeedBooks.length);
            query.limit(5);
            query.include('owner');
            query.find().done(function (usedBooks) {
                if (usedBooks.length > 0) {
                    that.ISBN_need.nowEqualISBNNeedBooks.pushUniqueArray(usedBooks);
                } else {
                    that.ISBN_need.hasMoreFlag = false;
                }
            }).always(function () {
                that.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            })
        },
        hasMoreFlag: true,
        hasMore: function () {
            return that.ISBN_need.hasMoreFlag;
        }
    };

    this.ISBN_circle = {
        /**
         * 获得对应ISBN的二手书一共有多少本
         * @param isbn13
         * @returns {*|AV.Promise}
         */
        getCircleBookNumberEqualISBN: function (isbn13) {
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo('role', 'circle');
            query.equalTo("isbn13", isbn13);
            return query.count();
        },
        /**
         * 目前正在加载的二手书的ISBN号码
         * @type {string}
         */
        nowISBN13: '',
        /**
         * 目前已经加载了对应的ISBN号码的二手书列表
         * @type {Array}
         */
        nowEqualISBNCircleBooks: [],
        /**
         * 获得所有对应ISBN的二手书
         * @param isbn13
         */
        loadMoreCircleBookEqualISBN: function (isbn13) {
            that.isLoading = true;
            if (isbn13 != that.ISBN_circle.nowISBN13) {//如果是新的ISBN号码就清空以前的
                that.ISBN_circle.nowISBN13 = isbn13;
                that.ISBN_circle.nowEqualISBNCircleBooks = [];
                that.ISBN_circle.hasMoreFlag = true;
            }
            var query = new AV.Query(Model.UsedBook);
            query.equalTo('alive', true);
            query.equalTo("isbn13", that.ISBN_circle.nowISBN13);
            query.equalTo('role', 'circle');
            query.descending("updatedAt");
            query.skip(that.ISBN_circle.nowEqualISBNCircleBooks.length);
            query.limit(5);
            query.include('owner');
            query.find().done(function (usedBooks) {
                if (usedBooks.length > 0) {
                    that.ISBN_circle.nowEqualISBNCircleBooks.pushUniqueArray(usedBooks);
                } else {
                    that.ISBN_circle.hasMoreFlag = false;
                }
            }).always(function () {
                that.isLoading = false;
                $rootScope.$broadcast('scroll.infiniteScrollComplete');
                $rootScope.$digest();
            })
        },
        hasMoreFlag: true,
        hasMore: function () {
            return that.ISBN_circle.hasMoreFlag;
        }
    };
});