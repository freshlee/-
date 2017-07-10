// pages/my/hpme/index.js
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

    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=footstep&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0',
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