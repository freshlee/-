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
  purchase:function(){
    var timetype=this.data.time;
    var time
    var now =new Date();
    switch(timetype){
      case "1" : time=now.getTime + 24*60*60*7 ;
      case "2": time = now.getTime + 24 * 60 * 60 * 30 
      case "3": time = now.getTime + 24 * 60 * 60 * 30 * 6  
    }
    console.log(time);
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=payvip&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&times='+time,
      success: function (res) {
        console.log(res);
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
    var THIS=this;
     wx.request({
       url: 'http://192.168.1.213/api/index.php?c=book&a=pay&op=vip&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0',
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
       url: 'http://192.168.1.213/api/index.php?c=book&a=category&op=filter&uniacid=2&priceattr=2',
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