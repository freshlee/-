// index.js
var WxParse = require('../../wxParse/wxParse.js');
var myId;
var content;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myId = options.id;
    var THIS = this;
    var newUrl = "http://192.168.1.213/api/index.php?c=book&a=order&op=create&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=" + myId;
    console.log(newUrl);
    //获取商品信息
    wx.request({
      url: newUrl,
      success: function (res) {
        var data = res.data.dat;
        THIS.setData({
          goods:data.goods,
        })
        console.log(THIS.data.show);
      }
    })
    var article = "那些年，谁没迷过几个侦探？曾经想看又不敢看的动画片《鸭子侦探》，曾经被《名侦探柯南》里《诅咒的假面在冷笑》吓得缩成一团，曾经拉上小伙伴才敢看的《金田一少年事件簿》，曾经与大学室友一起追过的《神探夏洛克》和《大侦探波洛》。那些紧张又烧脑的情节，让人欲罢不能。本期周刊，知友";
     var that = this; 
     WxParse.wxParse('article', 'html', article, that, 5); 
  },
  purchase:function(){
    wx.navigateTo({
      url: '../checkout/index?id='+myId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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