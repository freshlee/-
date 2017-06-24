// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onchange:function(event){
     this.setData({
       myindex:event.detail.current,
     })
  },
  detail: function () {
    nowpos=0;
    this.setData({
      myindex:0,
      index:0,
    })
    console.log(this.data.toView);
  },
  comment: function () {
    nowpos=lengths;
    this.setData({
      myindex: 1,
      index: 1,
    })
    console.log(this.data.toView);
  },
  interact: function () {
    nowpos=lengths*2;
    this.setData({
      myindex: 2,
      index: 2,
    })
    console.log(this.data.toView);
  },
  onLoad: function (options) {
    var THIS = this;
    var article;
    var myid=options.id;
    var newurl ="http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&openid=1&id"+myid;
    // wx.request({
    //   url: 'http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&id=1647&openid=1',
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //      article=res.data.dat.content;
    //     console.log(article);
    //     WxParse.wxParse('article', 'html', article, THIS, 5);
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
          lengths= res.screenWidth;
          THIS.setData({
            myheight:res.screenHeight,
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