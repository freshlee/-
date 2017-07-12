// index.js
var doctype;
var openid = getApp().globalData.openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  topay:function(){
    var THIS=this;
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=pay&uniacid=2&openid=' + getApp().globalData.openid+"&orderid="+THIS.data.orderid,
    })
  },
  onLoad: function (options) {
   var THIS=this;
    this.setData({
      coursename:options.coursename,
      ordernum:options.ordernum,
      goodsid:options.goodsid,
      price:options.marketprice,
      orderid:options.orderid
    })
     doctype=options.doctype;
     if (!options.orderid){
       //生成订单好并获取信息
       wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=order&op=submit&uniacid=2&openid=' + getApp().globalData.openid+'&goodsid=' + options.goodsid,
         success: function (res) {
           console.log(res);
           THIS.setData({
             ordernum: res.data.dd,
           })
           wx.request({
             url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=params&uniacid=2&openid=' + getApp().globalData.openid + '&orderid=' + res.data.orderid,
             success:function(res){
             }
           })
         }
       })
     }
     else{
       wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=params&uniacid=2&openid=' + getApp().globalData.openid + '&orderid=' + THIS.data.orderid,
         success: function (res) {
         }
       })
     }
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
    // var doctypename;
    // switch (doctype){
    //   case "1": doctypename="video"
    //    break;
    //   case "2": doctypename = "course"
    //     break;
    //   case "3": doctypename = "article"
    //     break;
    // }
    // console.log(doctypename)
    // wx.redirectTo({
    //   url: '../' + doctypename + '/index',
    // })
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