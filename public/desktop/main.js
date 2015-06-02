"use strict";function jsonp(e,o,t){var n=document.createElement("script");n.type="text/javascript";var r=Date.now()+String(Math.floor(100*Math.random()));n.src=e+(e.indexOf("?")>0?"&":"?")+"callback=CB"+r,n.onload=function(){n.parentNode.removeChild(n)},n.onerror=function(e){t&&t(e)},window["CB"+r]=function(e){o(e)},document.head.appendChild(n)}function createCookie(e,o,t){var n="";if(t){var r=new Date;r.setTime(r.getTime()+24*t*60*60*1e3),n="; expires="+r.toUTCString()}document.cookie=e+"="+o+n+"; path=/"}function readCookie(e){for(var o=e+"=",t=document.cookie.split(";"),n=0;n<t.length;n++){for(var r=t[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(o))return r.substring(o.length,r.length)}return null}function eraseCookie(e){createCookie(e,"",-1)}function configSemantic(){$(".ui.dropdown").dropdown(),$(".ui.search").search({type:"category"}),$(".hasPubInfoPopupBook").popup({inline:!0}),$("#topSearchInputCon").popup({inline:!0,on:"click"}),$(".ui.rating").rating(),$("#menu").sidebar("setting","transition","overlay").sidebar("setting","dimPage",!1).sidebar("toggle")}var Model={};if("undefined"!=typeof require)var AV=require("leanengine");Model.User=AV.Object.extend("_User",{avatarUrlWithSize:function(e){var o=this.get("avatarUrl");return o?o.substring(0,o.length-1)+e:null}}),Model.Status=AV.Object.extend("_Status"),Model.BookInfo=AV.Object.extend("BookInfo"),Model.School=AV.Object.extend("School"),Model.UsedBook=AV.Object.extend("UsedBook"),"undefined"!=typeof module&&(module.exports=Model),AV.initialize("kusn9e3cp5znt5lic9fufqfmsvsibsoaejpah089x6v2n7e0","nt5l8v4n4m08zxttpt7upqxwgt6oy47lzb3f8c4juf34otfm"),window.location.host.indexOf("ishuxun.cn")<0&&AV.setProduction(!1);var WECHAT={AppID:"wx2940a8d3ddcad5e9"},LoadCount=Math.floor(document.body.clientWidth/80),RandomStart=(new Date).getDay()*Math.floor(10*Math.random());Array.prototype.pushArray=function(e){for(var o=0;o<e.length;o++)this.push(e[o])},Array.prototype.unshiftArray=function(e){for(var o=0;o<e.length;o++)this.unshift(e[o])};var APP=angular.module("APP",[],null);configSemantic(),APP.service("BookInfo$",["$rootScope",function(e){var o=this;this.getJsonBookByISBN13=function(e){return AV.Cloud.run("getJsonBookByISBN13",{isbn13:e})},this.LatestBook={books:[],hasMoreFlag:!0,loadMore:function(){var t=new AV.Query(Model.BookInfo);t.select(["doubanId","isbn13","title","image","pubdate","author","publisher","pubdate","price"]),t.descending("pubdate"),t.skip(o.LatestBook.books.length+RandomStart),t.limit(LoadCount),t.find().done(function(t){t.length>0?o.LatestBook.books.pushArray(t):o.LatestBook.hasMoreFlag=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return o.LatestBook.hasMoreFlag}},this.searchBook=function(e){var o=new AV.SearchQuery("BookInfo");return o.queryString(e),o.find(null)}}]),APP.service("BookRecommend$",["$rootScope","DoubanBook$","BookInfo$",function(e,o,t){var n=this;this.BookTag={tag:null,load:function(){AV.Cloud.run("getAllBookTags",null,null).done(function(o){n.BookTag.tag=o,e.$apply()})},getTagAttrNames:function(){return n.BookTag.tag?Object.keys(n.BookTag.tag):[]}},this.BookTag.load(),this.TagBook={nowTag:"",setTag:function(o){o!=n.TagBook.nowTag&&(n.TagBook.books=[],n.TagBook.nowTag=o,t.searchBook(o).done(function(o){n.TagBook.books.unshiftArray(o),e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")}))},books:[],hasMoreFlag:!0,loadMore:function(){o.getBooksByTag(n.TagBook.nowTag,n.TagBook.books.length,LoadCount,function(o){var t=o.books;if(t.length>0)for(var r=0;r<t.length;r++)n.TagBook.books.push(Model.BookInfo["new"](t[r]));else n.TagBook.hasMoreTag=!1;e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.TagBook.hasMoreFlag}},this.MajorBook={major:AV.User.current()?AV.User.current().attributes.major:"",books:[],hasMoreFlag:!0,loadMore:function(){o.getBooksByTag(n.MajorBook.major,n.MajorBook.books.length+RandomStart,LoadCount,function(o){n.MajorBook.totalNum=o.total;var t=o.books;if(t.length>0)for(var r=0;r<t.length;r++)n.MajorBook.books.push(Model.BookInfo["new"](t[r]));else n.MajorBook.hasMoreFlag=!1;e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.MajorBook.hasMoreFlag},loadFromBookInfo:function(){t.searchBook(n.MajorBook.major).done(function(o){n.MajorBook.books.unshiftArray(o),e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}},this.NearNeedBook={needBooks:[],hasMoreFlag:!0,loadMore:function(){var o=AV.User.current()?AV.User.current().get("location"):null,t=new AV.Query(Model.UsedBook);if(t.notEqualTo("owner",AV.User.current()),t.equalTo("role","need"),o&&t.near("location",o),n.NearNeedBook._majorFilter){var r=new AV.Query(Model.User);r.equalTo("major",n.NearNeedBook._majorFilter),t.matchesQuery("owner",r)}t.skip(n.NearNeedBook.needBooks.length+RandomStart),t.limit(LoadCount),t.find().done(function(o){o.length>0?n.NearNeedBook.needBooks.pushArray(o):n.NearNeedBook.hasMoreFlag=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.NearNeedBook.hasMoreFlag},_majorFilter:null,setMajorFilter:function(e){e!=n.NearNeedBook._majorFilter&&(n.NearNeedBook.needBooks.length=0,n.NearNeedBook.hasMoreFlag=!0,n.NearNeedBook._majorFilter=e,n.NearNeedBook.loadMore())},getMajorFilter:function(){return n.NearNeedBook._majorFilter}},this.NearUsedBook={usedBooks:[],hasMoreFlag:!0,loadMore:function(){var o=AV.User.current()?AV.User.current().get("location"):null,t=new AV.Query(Model.UsedBook);if(t.notEqualTo("owner",AV.User.current()),t.equalTo("role","sell"),o&&t.near("location",o),n.NearUsedBook._majorFilter){var r=new AV.Query(Model.User);r.equalTo("major",n.NearUsedBook._majorFilter),t.matchesQuery("owner",r)}t.skip(n.NearUsedBook.usedBooks.length),t.limit(LoadCount),t.find().done(function(o){o.length>0?n.NearUsedBook.usedBooks.pushArray(o):n.NearUsedBook.hasMoreFlag=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.NearUsedBook.hasMoreFlag},_majorFilter:null,setMajorFilter:function(e){e!=n.NearUsedBook._majorFilter&&(n.NearUsedBook.usedBooks.length=0,n.NearUsedBook.hasMoreFlag=!0,n.NearUsedBook._majorFilter=e,n.NearUsedBook.loadMore())},getMajorFilter:function(){return n.NearUsedBook._majorFilter}},this.NearUser={users:[],hasMoreFlag:!0,loadMore:function(){var o=AV.User.current()?AV.User.current().get("location"):null,t=new AV.Query(Model.User);AV.User.current()&&t.notEqualTo("objectId",AV.User.current().id),o&&t.near("location",o),n.NearUser._majorFilter&&t.equalTo("major",n.NearUser._majorFilter),t.skip(n.NearUser.users.length),t.limit(Math.floor(document.body.clientWidth/50)),t.find().done(function(o){o.length>0?n.NearUser.users.pushArray(o):n.NearUser.hasMoreFlag=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.NearUser.hasMoreFlag},_majorFilter:null,setMajorFilter:function(e){e!=n.NearUser._majorFilter&&(n.NearUser.users.length=0,n.NearUser.hasMoreFlag=!0,n.NearUser._majorFilter=e,n.NearUser.loadMore())},getMajorFilter:function(){return n.NearUser._majorFilter}},this.NearUser.loadMore()}]),angular.module("APP").run(["$templateCache",function(e){e.put("temp/footer.html",'<div class="center aligned sixteen wide column" style="color: #48af5a"><div><i class="wechat link icon"></i> <i class="qq link icon"></i> <i class="weibo link icon"></i></div><small>还地球一片绿色</small></div>'),e.put("temp/header.html",'<header class="ui fixed green inverted menu" ng-controller="d_topBar"><a class="item" href="bookRecommend.html"><img src="../../img/pathLogo.png" class="ui mini image"></a> <span ng-if="me"><a class="item" href="../person/uploadOneUsedBook.html"><i class="home icon"></i>上传旧书</a> <a class="item" href="../person/uploadOneNeedBook.html"><i class="mail icon"></i>发布求书</a> <a class="item" href="../person/statusList.html"><i class="mail icon"></i> <span class="ui red circular mini label" ng-if="unreadCountSum()>0">{{unreadCountSum()}}</span></a> <span class="ui dropdown item"><img ng-src="{{me.avatarUrlWithSize(64)}}" class="ui avatar mini image" style="display: inline"> {{me.attributes.nickName}} <i class="dropdown icon"></i> <span class="menu"><a class="item"><i class="female icon"></i>退出</a></span></span></span> <span ng-if="!me"><span class="item"><a class="ui button" href="../tool/hello.html">登入</a></span> <span class="item"><a class="ui button" href="../tool/hello.html">加入</a></span></span> <span class="right item"><span class="ui action fluid input" id="topSearchInputCon" style="width: 300px"><input type="text" placeholder="搜索图书" ng-model="SearchBook$.keyword" ng-change="SearchBook$.searchInputOnChange()"> <a class="ui inverted button" ng-click="SearchBook$.searchBtnOnClick()" href="searchList.html">搜索</a></span> <span class="ui flowing fluid popup"><span class="ui divided selection list"><span class="item" ng-repeat="bookInfo in SearchBook$.books"><img class="ui avatar image" ng-src="{{bookInfo.attributes.image}}"> <a class="content" href="oneBook.html"><p class="header">{{bookInfo.attributes.title}}</p><p class="sub header"><em>{{bookInfo.attributes.author.toString()}}</em> <em><i class="ui yen icon"></i>{{bookInfo.attributes.price}}</em></p><p class="description"><em>{{bookInfo.attributes.publisher}}</em> <em>{{bookInfo.attributes.pubdate}}</em></p></a></span></span></span></span></header>'),e.put("temp/nearUserList.html",'<div class="sixteen wide column" ng-controller="d_partials_NearUser"><div class="ui horizontal divider"><a class="ui circular button" href="/">附近的同学</a></div><d-user-info style="margin: 2px" ng-repeat="one in users" user="one"></d-user-info></div>'),e.put("temp/oneBookAsideInfo.html",'<div class="ui grid" ng-controller="d_partials_oneBookAsideInfo"><div class="sixteen wide center aligned column"><div class="ui buttons"><a class="ui button">上传旧书</a><div class="or"></div><a class="ui positive button">发布求书</a></div></div><div class="sixteen wide column"><div class="ui horizontal divider"><a class="ui circular button">网购新书比价</a></div><div class="ui selection list"><a class="item" ng-repeat="one in businessInfos | orderBy:\'price\'" ng-href="{{one.url}}" target="_blank"><img class="ui avatar image" ng-src="{{one.logoUrl}}"><div class="content"><h3 class="header"><em>{{one.price}}</em><i class="yen icon"></i><em>{{one.name}}</em></h3></div></a></div><div class="ui horizontal divider"><a class="ui circular button">要卖对应旧书的同学</a></div><div class="ui selection list"><div class="item" ng-repeat="one in UsedBook$.ISBN_sell.nowEqualISBNUsedBooks"><img class="ui avatar image" ng-src="{{one.attributes.owner.avatarUrlWithSize(64)}}}}"><div class="content"><h3 class="header"><em ng-if="one.attributes.price">{{one.attributes.price}}<i class="yen icon"></i></em> <em ng-if="one.attributes.des">{{one.attributes.des}}</em></h3><em ng-if="one.updatedAt">{{one.updatedAt | date:\'mediumDate\' }}</em></div></div></div><div class="ui message" ng-if="UsedBook$.ISBN_sell.nowEqualISBNUsedBooks.length==0">还没有对应的二手书</div><div class="ui horizontal divider"><a class="ui circular button">正需要这本书的同学</a></div><div class="ui selection list"><div class="item" ng-repeat="one in UsedBook$.ISBN_need.nowEqualISBNNeedBooks"><img class="ui avatar image" ng-src="{{one.attributes.owner.avatarUrlWithSize(64)}}}}"><div class="content"><h3 class="header"><em ng-if="one.attributes.price">{{one.attributes.price}}<i class="yen icon"></i></em> <em ng-if="one.attributes.des">{{one.attributes.des}}</em></h3><em ng-if="one.updatedAt">{{one.updatedAt | date:\'mediumDate\' }}</em></div></div></div><div class="ui message" ng-if="UsedBook$.ISBN_need.nowEqualISBNNeedBooks.length==0">还没有同学想要它</div></div></div>'),e.put("temp/userInfoTemplate.html",'<div class="ui card"><div class="content" ng-if="heUsedBookList.length>=2"><div class="ui two column center aligned grid"><div class="column" ng-repeat="one in heUsedBookList.slice(0,2)"><div class="ui small image"><img ng-src="{{one.attributes.image}}"></div><small>{{one.attributes.title}}</small></div></div></div><a class="extra content"><div class="left floated meta"><em>{{user.attributes.major}}</em><br><em>{{user.attributes.school}}</em></div><div class="right floated author"><strong>{{user.attributes.nickName}}</strong> <img class="ui avatar image" ng-src="{{user.attributes.avatarUrl}}"></div></a><div class="ui bottom attached tiny basic buttons" ng-if="!hideUsedBook"><button class="ui button">要卖<em>{{userUsedBookNumber}}</em>本旧书</button> <button class="ui button">正需要<em>{{userNeedBookNumber}}</em>本书</button> <button class="ui button" ng-if="!isMyFollowee">关注</button> <button class="ui button" ng-if="isMyFollowee">取消关注</button></div></div>')}]),APP.service("BusinessSite$",function(){this.getBusinessInfoByISBN=function(e){return AV.Cloud.run("getBusinessInfo",{isbn13:e},null)}}),APP.service("DoubanBook$",["$rootScope","BookInfo$",function(e,o){function t(e){for(var o=e.substring(3,12),t=0,n=0;9>n;n++){var r=parseInt(o.charAt(n));t+=r*(10-n)}var a=t%11,s=11-a,i=String(s);return 10==s?i="X":11==s&&(i="0"),String(o+i)}var n=this,r="http://api.douban.com/v2/book";this.getBookByISBD=function(e,n,a){function s(e){var o=r+"/isbn/"+e;return null==a&&(a="id,rating,author,pubdate,image,binding,translator,catalog,pages,publisher,isbn13,title,author_intro,summary,price"),o+="?fields="+a}jsonp(s(e),function(e){n(e)},function(){13==e.length&&jsonp(s(t(e)),function(e){n(e)},function(){o.getJsonBookByISBN13(e).done(function(e){n(e)}).fail(function(){n(null)})})})},this.getBookByISBD_simple=function(e,o){n.getBookByISBD(e,o,"author,pubdate,image,publisher,title,price,isbn13")},this.searchBooks=function(e,o,t,n){var a=r+"/search";return e&&e.length<1?[]:(a+="?q="+e,o&&(a+="&start="+o),t&&(a+="&count="+t),a+="&fields=isbn13,title,image,author,publisher,pubdate,price",void jsonp(a,function(e){n(e)}))},this.getBooksByTag=function(e,o,t,n){var a=r+"/search";return!e||e.length<1?[]:(a+="?tag="+e,o&&(a+="&start="+o),t&&(a+="&count="+t),a+="&fields=isbn13,title,image,author,publisher,pubdate,price",void jsonp(a,function(e){n(e)}))},this.BookReview={reviewList:[],nowBookId:null,hasMoreFlag:!0,loadMore:function(){AV.Cloud.run("getDoubanBookReview",{id:n.BookReview.nowBookId,start:n.BookReview.reviewList.length},null).done(function(o){if(o.length>0)for(var t=0;t<o.length;t++)n.BookReview.reviewList.push(o[t]);else n.BookReview.hasMoreFlag=!1,0==n.BookReview.reviewList.length&&(alert("还没有对应的书评~"),history.back());e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMore:function(){return n.BookReview.hasMoreFlag},clear:function(){n.BookReview.reviewList=[],n.BookReview.hasMoreFlag=!0,e.$broadcast("scroll.infiniteScrollComplete")}}}]),APP.service("InfoService$",["$rootScope",function(e){var o=this;this.majors=[],AV.Cloud.run("getAllMajor",null,null).done(function(e){o.majors=e}),this.searchMajorKeyword="",this.filter_majorByKeyword=function(e){return e.name.indexOf(o.searchMajorKeyword)>-1},this.School={schools:[],loadMore:function(){var t=AV.User.current()?AV.User.current().get("location"):null,n=new AV.Query(Model.School);t&&n.near("location",t),o.School.searchSchoolKeyword.length>0?n.startsWith("name",o.School.searchSchoolKeyword):(n.skip(o.School.schools.length),n.limit(10)),n.find().done(function(t){if(t.length>0)for(var n=0;n<t.length;n++)o.School.schools.push(t[n].get("name"));e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},searchSchoolKeyword:"",filter_schoolByKeyword:function(e){return e.indexOf(o.School.searchSchoolKeyword)>=0}},this.startSchoolYearOptions=[];for(var t=(new Date).getFullYear(),n=t-6;t>=n;n++)o.startSchoolYearOptions.push(n.toString())}]),APP.service("IonicModalView$",["$rootScope","$ionicModal","$ionicHistory","InfoService$",function(e,o,t,n){this.registerChooseSchoolModalView=function(e,t){e.InfoService$=n,o.fromTemplateUrl("temp/tool/chooseSchoolModalView.html",{scope:e}).then(function(o){e.chooseSchoolModalView=o}),e.schoolOnChoose=function(o){t(o),e.chooseSchoolModalView.hide()}},this.registerChooseMajorModalView=function(e,t){e.InfoService$=n,o.fromTemplateUrl("temp/tool/chooseMajorModalView.html",{scope:e}).then(function(o){e.chooseMajorModalView=o}),e.majorOnChoose=function(o){t(o),e.chooseMajorModalView.hide()}},this.alertTitleAndPreModalView=function(t,n){var r=e.$new(!0);r.titleAndPreModalViewData={title:t,pre:n},o.fromTemplateUrl("temp/tool/titleAndPreModalView.html",{scope:r}).then(function(e){r.titleAndPreModalView=e,e.show()})}}]),APP.service("SearchBook$",["$rootScope","$timeout","DoubanBook$","BookInfo$",function(e,o,t,n){var r=this;this.keyword="",this.books=[],this.hasMore=function(){return r.books.length<r.totalNum},this.totalNum=0,this.loadMore=function(){r.keyword.length>0&&t.searchBooks(r.keyword,r.books.length,10,function(o){if(r.totalNum=o.total,r.totalNum>0){for(var t=o.books,n=0;n<t.length;n++)r.books.push(Model.BookInfo["new"](t[n]));e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")}else alert("没有找到你想要的图书")})};var a=null;this.searchBtnOnClick=function(){r.loadMore(),o.cancel(a)},this.searchInputOnChange=function(){r.books=[],r.totalNum=0,o.cancel(a),a=o(function(){r.loadFromBookInfo(),r.searchBtnOnClick()},1e3)},this.loadFromBookInfo=function(){n.searchBook(r.keyword).done(function(o){r.books.pushArray(o),e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}}]),APP.service("Status$",["$rootScope",function(e){var o=this;this.loadUnreadStatusesCount=function(){var t=AV.User.current();t&&(AV.Status.countUnreadStatuses(t,"newUsedBook").done(function(t){o.NewUsedBookStatus.unreadCount=t.unread,e.$apply()}),AV.Status.countUnreadStatuses(t,"newNeedBook").done(function(t){o.NewNeedBookStatus.unreadCount=t.unread,e.$apply()}),AV.Status.countUnreadStatuses(t,"private").done(function(t){o.PrivateStatus.unreadCount=t.unread,e.$apply()}),AV.Status.countUnreadStatuses(t,"reviewUsedBook").done(function(t){o.ReviewUsedBookStatus.unreadCount=t.unread,e.$apply()}))},this.NewUsedBookStatus={unreadCount:0,statusList:[],load:function(){var t=AV.Status.inboxQuery(AV.User.current(),"newUsedBook");t.include("usedBook"),t.include("source"),t.limit(o.NewUsedBookStatus.unreadCount),t.find().done(function(t){o.NewUsedBookStatus.statusList.length=0;for(var n=0;n<t.length;n++){var r=t[n];r.attributes=r.data,o.NewUsedBookStatus.statusList.push(r)}o.NewUsedBookStatus.unreadCount=0,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}},this.NewNeedBookStatus={unreadCount:0,statusList:[],load:function(){var t=AV.Status.inboxQuery(AV.User.current(),"newNeedBook");t.include("usedBook"),t.include("source"),t.limit(o.NewNeedBookStatus.unreadCount),t.find().done(function(t){o.NewNeedBookStatus.statusList.length=0;for(var n=0;n<t.length;n++){var r=t[n];r.attributes=r.data,o.NewNeedBookStatus.statusList.push(r)}o.NewNeedBookStatus.unreadCount=0,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}},this.PrivateStatus={unreadCount:0,statusList:[],load:function(){var t=AV.Status.inboxQuery(AV.User.current(),"private");t.include("usedBook"),t.include("source"),t.limit(o.PrivateStatus.unreadCount),t.find().done(function(t){o.PrivateStatus.statusList.length=0;for(var n=0;n<t.length;n++){var r=t[n];r.attributes=r.data,o.PrivateStatus.statusList.push(r)}o.PrivateStatus.unreadCount=0,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}},this.ReviewUsedBookStatus={unreadCount:0,statusList:[],load:function(){var t=AV.Status.inboxQuery(AV.User.current(),"reviewUsedBook");t.include("usedBook"),t.include("source"),t.limit(o.ReviewUsedBookStatus.unreadCount),t.find().done(function(t){o.ReviewUsedBookStatus.statusList.length=0;for(var n=0;n<t.length;n++){var r=t[n];r.attributes=r.data,o.ReviewUsedBookStatus.statusList.push(r)}o.ReviewUsedBookStatus.unreadCount=0,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})}},this.sendPrivateMsg=function(e,o,t,n){var r=new AV.Status(null,o);return r.set("to",AV.Object.createWithoutData("_User",e)),n&&r.set("usedBook",AV.Object.createWithoutData("UsedBook",n)),r.set("role",t),AV.Status.sendPrivateStatus(r,e)},this.reviewUsedBook=function(e,o,t,n){var r=new AV.Promise(null),a=new AV.Query(Model.UsedBook);return a.select("owner"),a.get(o).done(function(o){var s=o.get("owner");a=new AV.Query(Model.User),a.equalTo("objectId",s.id);var i=new AV.Status(null,t);i.query=a,i.inboxType="reviewUsedBook",i.set("to",AV.Object.createWithoutData("_User",e)),i.set("role",n),i.set("usedBook",o),i.send().done(function(e){r.resolve(e)}).fail(function(e){r.reject(e)})}).fail(function(e){r.reject(e)}),r},this.getStatusList_reviewBook=function(e){var o=new AV.Query(Model.Status),t=AV.Object.createWithoutData("UsedBook",e);return o.equalTo("inboxType","reviewUsedBook"),o.equalTo("usedBook",t),o.include("source","to"),o.find()},this.makeQueryStatusList_twoUser=function(e,o){if(e){var t=AV.User.current(),n=AV.Object.createWithoutData("_User",e),r=new AV.Query(Model.Status);r.equalTo("source",t),r.equalTo("to",n);var a=new AV.Query(Model.Status);if(a.equalTo("source",n),a.equalTo("to",t),o){var s=AV.Object.createWithoutData("UsedBook",o);r.equalTo("usedBook",s),a.equalTo("usedBook",s)}return AV.Query.or(r,a)}return new AV.Error(1,"缺少avosUserId")},this.cleanMyInbox=function(e,t,n){var r=AV.User.current(),a=AV.Status.inboxQuery(r,e);t&&a.equalTo("usedBook",AV.Object.createWithoutData("UsedBook",t)),n&&a.equalTo("source",AV.Object.createWithoutData("_User",n)),a.find().done(function(){o.loadUnreadStatusesCount()})}}]),APP.service("UsedBook$",["$rootScope",function(e){var o=this;this.isLoading=!1,this.loadUsedBookListForOwner=function(e){var o=e.relation("usedBooks").query();return o.equalTo("role","sell"),o.find()},this.loadNeedBookListForOwner=function(e){var o=e.relation("usedBooks").query();return o.equalTo("role","need"),o.find()},this.myUsedBookList=[],this.loadMyUsedBookList=function(){o.isLoading=!0;var t=AV.User.current().relation("usedBooks").query();t.equalTo("role","sell"),t.descending("updatedAt"),t.find().done(function(e){o.myUsedBookList=e}).always(function(){o.isLoading=!1,e.$apply()})},this.myNeedBookList=[],this.loadMyNeedBookList=function(){o.isLoading=!0;var t=AV.User.current().relation("usedBooks").query();t.equalTo("role","need"),t.descending("updatedAt"),t.find().done(function(e){o.myNeedBookList=e}).always(function(){o.isLoading=!1,e.$apply()})},this.removeUsedBook=function(e){var t=e.get("role");window.confirm("你确定要删除它吗?将不可恢复")&&e.destroy().done(function(){"sell"==t?o.loadMyUsedBookList():"need"==t&&o.loadMyNeedBookList()}).fail(function(e){alert(e.message)})},this.ISBN_sell={getUsedBookNumberEqualISBN:function(e){var o=new AV.Query(Model.UsedBook);return o.equalTo("role","sell"),o.equalTo("isbn13",e),o.count()},nowISBN13:"",nowEqualISBNUsedBooks:[],loadMoreUsedBookEqualISBN:function(t){o.isLoading=!0,t!=o.ISBN_sell.nowISBN13&&(o.ISBN_sell.nowISBN13=t,o.ISBN_sell.nowEqualISBNUsedBooks=[],o.ISBN_sell.hasMoreFlag=!0);var n=new AV.Query(Model.UsedBook);n.equalTo("isbn13",o.ISBN_sell.nowISBN13),n.equalTo("role","sell"),n.descending("updatedAt"),n.skip(o.ISBN_sell.nowEqualISBNUsedBooks.length),n.limit(5),n.include("owner"),n.find().done(function(e){e.length>0?o.ISBN_sell.nowEqualISBNUsedBooks.pushArray(e):o.ISBN_sell.hasMoreFlag=!1}).always(function(){o.isLoading=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMoreFlag:!0,hasMore:function(){return o.ISBN_sell.hasMoreFlag}},this.ISBN_need={getNeedBookNumberEqualISBN:function(e){var o=new AV.Query(Model.UsedBook);return o.equalTo("role","need"),o.equalTo("isbn13",e),o.count()},nowISBN13:"",nowEqualISBNNeedBooks:[],loadMoreNeedBookEqualISBN:function(t){o.isLoading=!0,t!=o.ISBN_need.nowISBN13&&(o.ISBN_need.nowISBN13=t,o.ISBN_need.nowEqualISBNNeedBooks=[],o.ISBN_need.hasMoreFlag=!0);var n=new AV.Query(Model.UsedBook);n.equalTo("isbn13",o.ISBN_need.nowISBN13),n.equalTo("role","need"),n.descending("updatedAt"),n.skip(o.ISBN_need.nowEqualISBNNeedBooks.length),n.limit(5),n.include("owner"),n.find().done(function(e){e.length>0?o.ISBN_need.nowEqualISBNNeedBooks.pushArray(e):o.ISBN_need.hasMoreFlag=!1}).always(function(){o.isLoading=!1,e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMoreFlag:!0,hasMore:function(){return o.ISBN_need.hasMoreFlag}}}]),APP.service("User$",["$rootScope","Status$",function(e,o){var t=this;this.signUpWithJSONUser=function(e){var o=e.unionId;delete e.unionId;var t=Model.User["new"](e);return t.set("username",o),t.set("password",o),t.signUp(null)},this.followUser=function(o){var t=AV.User.current();t?t.follow(o).done(function(){e.$broadcast("FollowSomeone")}).fail(function(e){alert("关注失败:"+e.message)}):alert("请先登入")},this.unfollowUser=function(o){var t=AV.User.current();t?t.unfollow(o).done(function(){e.$broadcast("UnfollowSomeone")}).fail(function(e){alert("取消关注失败:"+e.message)}):alert("请先登入")},this.Followee={users:[],loadMore:function(){var o=AV.User.current().followeeQuery();if(o.include("followee"),o.skip(t.Followee.users.length),o.limit(10),t.Followee._majorFilter){var n=new AV.Query(Model.User);n.equalTo("major",t.Followee._majorFilter),o.matchesQuery("followee",n)}o.find().done(function(o){if(o.length>0){for(var n=0;n<o.length;n++)o[n].avatarUrlWithSize=Model.User.prototype.avatarUrlWithSize;t.Followee.users.pushArray(o)}else t.Followee.hasMoreFlag=!1;e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMoreFlag:!0,hasMore:function(){return t.Followee.hasMoreFlag},_majorFilter:null,setMajorFilter:function(e){e!=t.Followee._majorFilter&&(t.Followee.users.length=0,t.Followee.hasMoreFlag=!0,t.Followee._majorFilter=e,t.Followee.loadMore())},getMajorFilter:function(){return t.Followee._majorFilter}},this.Follower={users:[],loadMore:function(){var o=AV.User.current().followerQuery();if(o.include("follower"),o.skip(t.Follower.users.length),o.limit(10),t.Follower._majorFilter){var n=new AV.Query(Model.User);n.equalTo("major",t.Follower._majorFilter),o.matchesQuery("follower",n)}o.find().done(function(o){if(o.length>0){for(var n=0;n<o.length;n++)o[n].avatarUrlWithSize=Model.User.prototype.avatarUrlWithSize;t.Follower.users.pushArray(o)}else t.Follower.hasMoreFlag=!1;e.$apply(),e.$broadcast("scroll.infiniteScrollComplete")})},hasMoreFlag:!0,hasMore:function(){return t.Follower.hasMoreFlag},_majorFilter:null,setMajorFilter:function(e){e!=t.Follower._majorFilter&&(t.Follower.users.length=0,t.Follower.hasMoreFlag=!0,t.Follower._majorFilter=e,t.Follower.loadMore())},getMajorFilter:function(){return t.Follower._majorFilter}},this.changeWechatAvatarSize=function(e,o){return e?e.substring(0,e.length-1)+o:null},this.loginWithUnionId=function(e){var t=new AV.Promise(null);return e?AV.User.logIn(e,e).done(function(e){t.resolve(e),o.loadUnreadStatusesCount()}).fail(function(e){t.reject(e)}):t.reject("unionId错误"),t}}]),APP.service("WeChatJS$",["$rootScope",function(e){function o(e){var o={title:"书循",desc:"让你的课本重复利用",link:window.location.href,imgUrl:"http://"+window.location.host+"/wechat/img/logo-R.png"};return o=angular.extend(o,e)}var t=this;this.config=function(){AV.Cloud.run("getWechatJsConfig",{url:location.href.split("#")[0]},null).done(function(e){wx.config(e)})},wx.ready(function(){wx.onMenuShareTimeline(o()),wx.onMenuShareAppMessage(o()),wx.onMenuShareQQ(o()),wx.onMenuShareWeibo(o()),wx.getLocation({success:function(e){AV.Cloud.run("updateMyLocation",{latitude:e.latitude,longitude:e.longitude},null)},fail:function(){AV.Cloud.run("updateMyLocation",null,null)},cancel:function(){AV.Cloud.run("updateMyLocation",null,null)}})}),wx.error(function(){t.config()}),this.scanQRCode=function(o){wx.scanQRCode({needResult:1,scanType:["barCode"],success:function(t){o(t.resultStr.split(",")[1]),e.$apply()}})},this.previewOneImage=function(e){wx.previewImage({current:e,urls:[e]})},this.getOAuthURL=function(){var e=location.href.split("#")[0]+"#/tab/signUp";return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+WECHAT.AppID+"&redirect_uri="+encodeURIComponent(e)+"&response_type=code&scope=snsapi_base&state=#wechat_redirect"},this.getOAuthUserInfo=function(e,o,t){AV.Cloud.run("getWechatOAuthUserInfo",{code:e},null).done(function(e){var t={openId:e.openid,unionId:e.unionid,nickName:e.nickname,sex:e.sex,avatarUrl:e.headimgurl};createCookie("unionId",t.unionId,365),o(t)}).fail(function(e){t&&t(e)})},this.openMap=function(e,o){jsonp("http://apis.map.qq.com/ws/coord/v1/translate?type=1&key=R3DBZ-HEYRF-ZSZJ3-JAJJN-2ZWFF-SLBJV&output=jsonp&locations="+e+","+o,function(e){if(0==e.status){var o=e.locations[0];wx.openLocation({latitude:o.lat,longitude:o.lng,name:"该同学位置"})}})}}]),APP.controller("d_partials_NearUser",["$scope","BookRecommend$",function(e,o){e.users=o.NearUser.users}]),APP.controller("d_partials_oneBookAsideInfo",["$scope","BusinessSite$","UsedBook$","User$",function(e,o,t,n){e.User$=n;var r="9787302231240";o.getBusinessInfoByISBN(r).done(function(o){e.businessInfos=o,e.$apply()}),e.UsedBook$=t;var a=setInterval(function(){function e(){t.ISBN_sell.hasMore()||t.ISBN_need.hasMore()||clearInterval(a)}t.ISBN_sell.hasMore()?t.ISBN_sell.loadMoreUsedBookEqualISBN(r):e(),t.ISBN_need.hasMore()?t.ISBN_need.loadMoreNeedBookEqualISBN(r):e()},500)}]),APP.controller("d_topBar",["$scope","SearchBook$","Status$",function(e,o,t){e.SearchBook$=o,e.me=AV.User.current(),e.unreadCountSum=function(){return t.NewUsedBookStatus.unreadCount+t.NewNeedBookStatus.unreadCount+t.PrivateStatus.unreadCount+t.ReviewUsedBookStatus.unreadCount}}]),APP.directive("dIncludeReplace",function(){return{require:"ngInclude",restrict:"A",link:function(e,o){o.replaceWith(o.children())}}}),APP.directive("dUserInfo",function(){function e(e){function o(){if(e.user){e.userUsedBookNumber=0;var o=AV.Object.createWithoutData("_User",e.user.id),t=o.relation("usedBooks").query();t.equalTo("role","sell"),t.count().done(function(o){e.userUsedBookNumber=o,e.$apply()})}}function t(){if(e.user){e.userNeedBookNumber=0;var o=AV.Object.createWithoutData("_User",e.user.id),t=o.relation("usedBooks").query();t.equalTo("role","need"),t.count().done(function(o){e.userNeedBookNumber=o,e.$apply()})}}function n(){if(e.user&&AV.User.current()){var o=AV.User.current().followeeQuery();o.equalTo("followee",AV.Object.createWithoutData("_User",e.user.id)),o.count().done(function(o){e.user.isMyFollowee=1==o,e.$apply()})}}function r(){if(e.user){var o=AV.Object.createWithoutData("_User",e.user.id),t=o.relation("usedBooks").query();t.limit(2),t.find().done(function(o){e.heUsedBookList=o,e.$apply()})}}e.isMyFollowee=!1,e.heUsedBookList=[],e.$watch(function(){return e.user?e.user.attributes:null},function(){n(),(null==e.hideUsedBook||0==e.hideUsedBook)&&(o(),t(),!e.hideUsedBook&&r())}),e.$on("FollowSomeone",function(){n()}),e.$on("UnfollowSomeone",function(){n()})}return{restrict:"E",scope:{user:"=",hideUsedBook:"=?",usedBookObjectId:"=?"},templateUrl:"../temp/userInfoTemplate.html",link:e}});