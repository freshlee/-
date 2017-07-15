// index.js
var openid = getApp().globalData.openid;
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
    if(options.merchid!=0){

    }
    this.setData({
        versioninfo:getApp().globalData.version,
    })
    var THIS=this;
    myid=options.id;
    //获取基础信息
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=id&uniacid=' + getApp().globalData.acid+'&uid=' + myid + "&openid=" + getApp().globalData.openid,
      success:function(res){
        //标记坐标
          var data = res.data.dat;
        if(res.data.dat.jg){
            lat = data.jg.lat;
            lng = data.jg.lng;
            tel = data.jg.tel;
        }
        else{
            tel = data.zz.phone;
        }
        console.log(res);
        THIS.setData({
          base:data,
        })
      }
    })
    //获取教师信息
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=teacher&uniacid=' + getApp().globalData.acid+'&uid=' + myid + "&openid=" + getApp().globalData.openid,
      success:function(res){
         console.log(res);
         THIS.setData({
           teacher: res.data.dat.teacher,
         })
      }
    })
    //获取课程信息
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=shop&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&uid=' + myid,
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