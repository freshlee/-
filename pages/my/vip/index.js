// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  show:function(){
    this.setData({
      status:1,
    })
  },
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  var time=new Date();
  var quantum=time.getHours();
  var now;
  console.log(quantum);
  if(quantum<6){
     now=0;
  }
  else if(quantum<12){
    now=1;
  }
  else if (quantum < 14){
    now=2;
  }
  else if (quantum < 18) {
    now = 3;
  }
  else{
    now = 4;
  }
  this.setData({
    timestatus:now,
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