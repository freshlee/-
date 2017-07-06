// index.js
var doctype;
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
   var THIS=this;
    this.setData({
      coursename:options.coursename,
      ordernum:options.orderid,
      goodsid:options.goodsid,
    })
     doctype=options.doctype;
     wx.request({
       url: '',
       success:function(res){

       }
     })
     if (options.goodsid){
       wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=order&op=submit&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + options.goodsid,
         success: function (res) {
           console.log(res);
           THIS.setData({
             ordernum: res.data.dd,
           })
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
    wx.navigateBack({
      delta: 1,
    })
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