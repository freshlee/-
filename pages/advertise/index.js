// index.js
var myid;
var WxParse = require('../../wxParse/wxParse.js');
var lat;
var lng;
var tel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    myindex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  call:function(){
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  getloacation:function(){
    wx.openLocation({
      latitude: lat,
      longitude: lng,
    })
  },
  onLoad: function (options) {
    var THIS=this;
    myid=options.id;
    //获取基础信息
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=id&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&uid='+myid,
      success:function(res){
        //标记坐标
        var data=res.data.dat.jg
        lat=data.lat;
        lng=data.lng;
        tel=data.tel
        console.log(res);
        THIS.setData({
          base:data,
        })
      }
    })
    //获取教师信息
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=teacher&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&uid=' + myid,
      success:function(res){
         console.log(res);
         THIS.setData({
           teacher: res.data.dat.teacher,
         })
      }
    })
    //获取课程信息
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=shop&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&uid=' + myid,
      success: function (res) {
        console.log(res);
        THIS.setData({
          shop: res.data.dat.shop,
        })
      }
    })

  
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
  teacher: function () {
    this.setData({
      index: 2,
      myindex: 2,
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