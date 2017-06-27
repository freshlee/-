// index.js
var oldpos=0;
var indexnow=0;
var textdata=[];
var newdata;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statu:0,
    praise:1,
    status:0,
  },
  changestatu:function(){
   this.setData({
     statu:this.data.statu==1?0:1,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onchange:function(event){
    var index=event.detail.current;
    var oldindex=indexnow;
    if(index==2){
            indexnow += 1;
            index = 1;
    }
    else if(index == 0){
      if(indexnow!=0){
        indexnow -= 1;
        index = 1
      }
    }
    else{
      if(oldpos==0){
        index=1;
      }
      else{
        indexnow=1;
        index=0;
      }
    }
    if(indexnow+2<=textdata.length&&indexnow>=0){
      newdata = textdata.slice(indexnow, indexnow + 3);
    }
    else{
      indexnow=oldindex;
    }

    this.setData({
      contents:newdata,
      step:index,
      status:1,
    })
    oldpos = event.detail.current;
    console.log(indexnow);
    console.log(newdata);
    this.setData({
      status: 0,
    })
  },
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.status);
    var THIS=this;
    wx.getSystemInfo({
      success: function(res) {
         THIS.setData({
           myheight:res.windowHeight,
         })
      },
    })
    textdata=[{ content: 11111111 }, { content: 222222222 }, { content: 33333333 }, { content: 444444444 }, { content: 55555555 }, { content: 666666666 }, { content: 77777777 }];
    newdata=textdata.slice(0,3);
    this.setData({
      contents:newdata,
    })
  
  },
  agree:function(){
    this.setData({
      praise:1,
    })
  },
  oposite: function () {
    this.setData({
      praise: 0,
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