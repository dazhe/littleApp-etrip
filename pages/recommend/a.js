// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    topBarItems: [
      // id name selected 选中状态
      {id:'all',name:'今日特卖',selected:true},
      {id:'good',name:'新品特惠',selected:false},
      {id:'share',name:'假期出行',selected:false},
      {id:'ask',name:'超值机票',selected:false}
    ],
    page: 1,
    tab: 'all'
  },
  onPullDownRefresh: function () {
    this.fetchData1();
    console.log('下拉刷新', new Date());
  },
  onLoad: function () {
    this.fetchData1();
  },
  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    var topBarItems = self.data.topBarItems;
    // 切换topBarItem 
    for (var i = 0;i<topBarItems.length;i++) {
      if(tab == topBarItems[i].id) {
          topBarItems[i].selected = true;
      } else {
          topBarItems[i].selected = false;
      }
    }
    self.setData({
      topBarItems:topBarItems
    })

    self.setData({
      tab: tab
    });
    if (tab !== 'all') {
      this.fetchData1({tab: tab});
    } else {
      this.fetchData1();
    }
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        self.setData({
          postsList: self.data.postsList.concat(res.data.data.map(function (item) {
            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
            return item;
          }))
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData1({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData1({page: self.data.page});
    }
  },
  fetchData1: function (data) {
    var urls=['http://z.qyer.com/all_0_0_0_0_0_0_0/?sort_today_new=1&_channel=freetour&_type=channel','http://z.qyer.com//all_0_0_0_0_69_0_0/page1/?_channel=sales&_type=channel'];
    var url='http://z.qyer.com//all_0_0_0_0_69_0_0/page1/?_channel=sales&_type=channel';
    var key=Math.floor(Math.random()*2);
    console.log(key);
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    wx.request({
      url:url,
      success: function (res) {
        var str=res.data;
        str=str.substring(str.indexOf('<ul class="zw-module-smallcard-list clearfix">')+'<ul class="zw-module-smallcard-list clearfix">'.length);
        str=str.substring(0,str.indexOf("</ul>"))
         var itemsList=str.split("</li>");
         var items=new Array();
         for(var i=0;i<itemsList.length;i++){
           var item={};
           var str=itemsList[i];
           str=str.substring(str.indexOf('<a href="')+'<a href="'.length);
           item.url=str.substring(0,str.indexOf('"'));
           str=str.substring(str.indexOf('title="')+'title="'.length);
           item.title=str.substring(0,str.indexOf('"'));
           str=str.substring(str.indexOf('data-original="')+'data-original="'.length);
           item.img=str.substring(0,str.indexOf('"'));
           str=str.substring(str.indexOf('<p class="travelmonth">')+'<p class="travelmonth">'.length);
           item.travelTime=str.substring(0,str.indexOf('</p>'));
           str=str.substring(str.indexOf('<em>')+'<em>'.length);
           item.price=str.substring(0,str.indexOf('</em>'));
           items.push(item);
         }
        self.setData({
          postsList: items
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})
