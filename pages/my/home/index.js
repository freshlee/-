// pages/video/index.js
var WxParse = require('../../../wxParse/wxParse.js');
var openid = getApp().globalData.openid;
var org;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Logo: [{ text: '个人资料', logo: '../../../images/person.png', url: '../info/index' },
    { text: "浏览记录", logo: '../../../images/record.png', url: "../record/index" },
    { text: "我的社区", logo: '../../../images/mytip.png', url: "../mytip/index" },
    { text: "我的订单", logo: '../../../images/order.png', url: '../collect/index' },
    { text: "成为VIP", logo: '../../../images/VIP.png', url: "../vip/index" },
    { text: "商家入驻", logo: '../../../images/join.png', url: "../join/index" }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  jump: function (event) {
    var url = event.currentTarget.dataset.des;
    wx.navigateTo({
      url: url,
    })
  },

  detail: function () {
    this.setData({
      border_section: "none",
      border_detail: "4rpx solid white",
      border_comment: "none",
      border_interact: "none",
      toView: "detail",
    })
  },
  comment: function () {
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "4rpx solid white",
      border_interact: "none",
      toView: "comment",
    })
  },

  onLoad: function (options) {
    var THIS = this;
    this.setData({
        versioninfo: getApp().globalData.version,
    })

  },
  onStop: function () {
    var THIS = this;
    var length = this.data.length;
    if (org <= length / 2) {
      THIS.setData({
        toView: "detail",
      });
      this.detail();
    }
    else if (org >= length / 2 && org < length * 1.5) {
      THIS.setData({
        toView: "comment",
      });
      this.comment();
    }

    console.log(org);
    console.log(this.data.toView)

  },
  onMove: function (e) {
    org = e.detail.scrollLeft;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          length: res.screenWidth,
        })
      }

    })
    wx.getUserInfo({
      fail: function () {
        console.log('用户数据调取失败');
      },
      success: function (res) {
        console.log(res);
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        THIS.setData({
          myprotrait: avatarUrl,
          username: nickName,
        })
        console.log(avatarUrl);
      }
    })
    //获取浏览条数,只显示数目
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=footstep&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
      success:function(res){
        var record = res.data.dat.list.length;
        THIS.setData({
           record:record,
        })
      }
    })
    //获取收藏条数，只显示数目
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=gzlist&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
        success: function (res) {
            console.log(res);
            THIS.setData({
                collection: res.data.dat.list.length,
            })
        }
    })
    //获取个人社区信息
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=Usersq&op=main&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
        success: function (res) {
           THIS.setData({
               followcount:res.data.dat.followcount,
           })
        }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})