// index.js
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
  jump:function(e){
    var cid=e.currentTarget.dataset.des;
    var url="../square/index?cid="+cid;
    wx.navigateTo({
      url: url,
    })
  },
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  var THIS=this;
  wx.request({
    url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=snsvad',
    success:function(res){
        var data =res.data.dat;
        console.log(res);
          for(var key in data.SNSVAD){
            var mark=/www.ht.com/;
            data.SNSVAD[key].thumb = data.SNSVAD[key].thumb.replace(mark,"192.168.1.213/ht");
          }
          console.log(data);
          THIS.setData({
            bannerUrls:data.SNSVAD,
            nav:data.CATEGORY,
          })
    },
  })
  wx.request({
    url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=boardlist&uniacid=2&openid=' + getApp().globalData.openid+'&mid=25769',
    success:function(res){
    var data=res.data.dat;
    console.log(data);
    THIS.setData({
      tiplist:data.list,
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