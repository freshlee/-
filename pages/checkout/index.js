// pages/detail/index.js
var id;
var openid = getApp().globalData.openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  purchase:function(){
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },
  getcordinate:function(){
    var THIS = this;
    wx.chooseAddress({
      success: function (res) {
        var address = res.provinceName + " " + res.cityName + " " + res.detailInfo;
        THIS.setData({
          address: address,
        })
        console.log(THIS.data.address);
      }
    })
  },
  purchase:function(){
    var THIS=this;
    //生成订单
    wx.navigateTo({
      url: '../booklist/index?coursename=' + THIS.data.goods.title + "&goodsid=" + id + "&doctype=" + THIS.data.doctype,
    })
  },
  onLoad: function (options) {
     var THIS=this;
      id=options.id;
      //获取数据
      wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=order&op=create&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + id,
        success:function(res){
          var data=res.data.dat;
          THIS.setData({
            goods:data.goods,
            doctype:data.goods.type,
            hidden:true,
          })
          console.log(THIS.data.goods)
        },
        fail:function(){
          THIS.setData({
            hidden: true,
          })
          wx.showToast({
            title: '加载失败',
          })
        }
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