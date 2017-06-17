// pages/video/index.js
var WxParse = require('../../wxParse/wxParse.js');
var org;
Page({
        
  /**
   * 页面的初始数据
   */
  data: {
   length,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  section:function(){
    this.setData({
      border_section:"8rpx solid red",
      border_detail:"none",
      border_comment: "none",
      border_interact: "none",
      toView:"section",
    })
  },
  detail: function () {
    this.setData({
      border_section: "none",
      border_detail: "8rpx solid red",
      border_comment: "none",
      border_interact: "none",
      toView: "detail",
    })
  },
  comment: function () {
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "8rpx solid red",
      border_interact: "none",
      toView: "comment",
    })
  },
  interact: function () {
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "none",
      border_interact: "8rpx solid red",
      toView: "interact",
    })
  },
  onLoad: function (options) {
    var THIS=this;
    var article;
    wx.request({
      url: 'http://192.168.1.5/index.php?c=edu&a=detail&op=getgoods&id=1647&openid=1', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // article=res.data.dat.content;
        // console.log(article);
      }
    })
    /** 
    * WxParse.wxParse(bindName , type, data, target,imagePadding) 
    * 1.bindName绑定的数据名(必填) 
    * 2.type可以为html或者md(必填) 
    * 3.data为传入的具体数据(必填) 
    * 4.target为Page对象,一般为this(必填) 
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);  
  
  },
  onStop:function(){
    var THIS=this;
    var length=this.data.length;
    if(org<=length/2){
      THIS.setData({
        toView: "section",
      });
      this.section();
    }
    else if(org>=length/2&&org<length*1.5){
    THIS.setData({
      toView:"detail",
    });
    this.detail();
    }
    else if (org >= length*1.5&&org<length*2.5){
      THIS.setData({
        toView: "comment",
      });
      this.comment();
      }
    else if (org >= length*2.5&&org<=length*4){
      THIS.setData({
        toView: "interact",
      });
      this.interact();
      }
      console.log (org)

  },
  onMove:function(e){
    org=e.detail.scrollLeft;
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS=this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          length:res.screenWidth,
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