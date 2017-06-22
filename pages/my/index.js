// pages/video/index.js
var WxParse = require('../../wxParse/wxParse.js');
var org;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length,
    Logo: [{ text: "浏览记录", logo: '../../images/记录.png' }, { text: "我的帖子", logo: '../../images/帖子.png' }, { text: "我的回答", logo: '../../images/回答.png' }, { text: "我的课程", logo: '../../images/课程.png' },{text: "商家入驻", logo:'../../images/商家入驻.png'}],

  },

  /**
   * 生命周期函数--监听页面加载
   */

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
    var article;
    var myid = options.id;
    var newurl = "http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&openid=1&id" + myid;
    wx.request({
      // url: 'http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&id=1647&openid=1',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        article = res.data.dat.content;
        console.log(article);
        WxParse.wxParse('article', 'html', article, THIS, 5);
      }
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
      fail:function(){
        console.log('用户数据调取失败');
      },
      success: function (res) {
        console.log("test");
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        THIS.setData({
          myprotrait:avatarUrl,
          username: nickName,
        })
        console.log(avatarUrl);
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