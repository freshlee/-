// index.js
var openid = getApp().globalData.openid;

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
  purchase:function(){
    var THIS=this;
    this.setData({
      hidden:false,
    })
    var timetype=this.data.time;
    var time = new Date();
    switch(timetype){
      case "1" : time.setDate(time.getDate()+7);
      case "2": time.setMonth(time.getMonth()+1);
      case "3": time.setFullYear(time.getFullYear()+0.5); 
    }
    console.log(time);
    var timestamp = Date.parse(time);
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=payvip&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&times=' + timestamp,
      success: function (res) {
        THIS.setData({
          hidden:true,
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
        })
      }
    })
  },
  charge:function(e){
    var time=e.currentTarget.dataset.type;
    var money = e.currentTarget.dataset.money;
    this.setData({
      time:time,
      money:money,
    })
  },
  show:function(){
    this.setData({
      status:1,
    })
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS=this;
     wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=vip&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
       success:function(res){
         for(var key in res.data.dat.level){
           res.data.dat.level[key].ordermoney = parseInt(res.data.dat.level[key].ordermoney);
         }
         console.log(res);
        THIS.setData({
          viplist:res.data.dat.level,
        })
       }
     })
     //VIP课程
     wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=category&op=filter&uniacid=' + getApp().globalData.acid+'&priceattr=2',
       success:function(res){
         console.log(res);
         THIS.setData({
           list:res.data
         })
       }
     })
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