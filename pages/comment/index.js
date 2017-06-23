// index.js
var newlist=new Array;
var localpraiselist=[{ praise: 35 }, { praise: 35 }, { praise: 35 }];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    praiselist: localpraiselist,
  },
  praise:function(event){
    var index = event.currentTarget.dataset.num;
    console.log(localpraiselist[index].praise);
    if (newlist[index]){
      localpraiselist[index].praise -= 1;}
    else { localpraiselist[index].praise += 1}
    console.log(newlist[index]);
    newlist[index] =newlist[index]==1?0:1;
    this.setData({
      status:newlist,
      praiselist: localpraiselist,
    })
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