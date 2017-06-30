// index.js
var orgY;
var orgtop;
var who=[];
var final=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  myindex:0,
  thetop:-110,
  status:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS=this;
   wx.getSystemInfo({
     success: function(res) {
          THIS.setData({
            myheight:res.screenHeight,
          })
     },
   })
  },
  base: function () {
    this.setData({
      index: 0,
      myindex: 0,
    })
  },
  address: function () {
    this.setData({
      index: 1,
      myindex: 1,
    })
  },
  teacher: function () {
    this.setData({
      index: 2,
      myindex: 2,
    })
  },
  remark: function () {
    this.setData({
      index: 3,
      myindex: 3,
    })
  },
  start:function(e){
      var whose=e.currentTarget.dataset.index;
      orgY=e.touches[0].pageY;
      console.log(e);
      orgtop=this.data.thetop;
      this.setData({
        status: 1,
        who:whose,
      })
  },
  moving:function(e){
    var whose = e.currentTarget.dataset.index;
    var nowY = e.touches[0].pageY;
    var top=nowY-orgY;
    if (top + orgtop <= -110 || top + orgtop>0){return false}
    final[whose] = top + orgtop;
    this.setData({
      thetop:top+orgtop,
      final:final,
    })
    console.log(top - this.data.thetop);
    if(top>=40){
      final[whose]=0;
      this.setData({
        status:0,
        thetop:0,
        final: final,
      })
    }
    else if (top <= -40) {
      final[whose]=-110;
      this.setData({
        status: 0,
        thetop: -110,
        final: final,
      })
    }
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