// pages/my/hpme/index.js]
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
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS=this;

    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=footstep&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
      success:function(res){
        var test = /\d{4}-\d{2}-\d{2}/
        var data = res.data.dat.list
        for(var key in data){
          data[key].createtime = data[key].createtime.match(test);
        }
        console.log(res);
        THIS.setData({
          record:data,
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