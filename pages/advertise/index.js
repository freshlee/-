// index.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "../../images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.324520,
        latitude: 23.099994
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    index: 0,
    myindex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  base:function(){
    this.setData({
      index:0,
      myindex:0,
    })
  },
  address:function(){
    this.setData({
      index:1,
      myindex: 1,
    })
  },
  onchange: function (event) {
    this.setData({
      myindex: event.detail.current,
    })
  },
  onReady: function () {
    var THIS=this;
    var article="测试";
    WxParse.wxParse('article', 'html', article, THIS, 5);
    wx.getSystemInfo({
      success: function(res) {
        THIS.setData({
          myheight:res.screenHeight,
        })
      },
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