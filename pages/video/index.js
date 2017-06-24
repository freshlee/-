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
  scroll:function(event){
     var mytop=this;
     var nowstatus;
     console.log(mytop);
     if(mytop>=190){
       nowstatus =1
     }
     else{nowstatus=0}
     this.setData({
       status:nowstatus,
     })
  },
  detail: function () {
    nowpos=0;
    this.setData({
      border_section: "none",
      border_detail: "4rpx solid rgb(7,103,200)",
      border_comment: "none",
      border_interact: "none",
      scrollLeft: 0,
    })
    console.log(this.data.toView);
  },
  comment: function () {
    nowpos=lengths;
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "4rpx solid rgb(7,103,200)",
      border_interact: "none",
      scrollLeft: lengths,
    })
    console.log(this.data.toView);
  },
  interact: function () {
    nowpos=lengths*2;
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "none",
      border_interact: "4rpx solid rgb(7,103,200)",
      scrollLeft: lengths*2,
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
  onStop: function () {
    var THIS = this;
    var length = lengths;
    if(org>nowpos){
      if (org <= length / 10) {
        this.detail();
      }
      else if (org >= length / 10 && org < length * 1.1) {
        this.comment();
      }
      else if (org >= length * 1.1 && org < length * 3) {
        this.interact();
      }
    } 
    else{
      if (org <= length*0.9) {
        this.detail();
      }
      else if (org >= length*0.9 && org < length * 1.9) {
        this.comment();
      }
      else if (org >= length * 1.9 && org < length * 3) {
        this.interact();
      }
    }
   
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