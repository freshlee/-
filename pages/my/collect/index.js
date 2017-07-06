// index.js
var alllist;
var finishlist=[];
var waitinglist=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    myindex: 0,
    hidden:true,
  },
  pay:function(e){
    var ordersn = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    var newurl = "../../booklist/index?orderid=" + ordersn +"&coursename="+title;
    wx.navigateTo({
      url: newurl,
    })
  },
  comment:function(e){
    var orderid = e.currentTarget.dataset.order;
    var goodsid=e.currentTarget.dataset.index;
    var newurl="../../goodscomment/add/index?id="+goodsid+"&orderid="+orderid;
    wx.navigateTo({
      url: newurl,
    })
  },
  onchange: function (event) {
    this.setData({
      myindex: event.detail.current,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS=this;
    this.setData({
      hidde:false,
    })
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=order&op=list&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0',
      success:function(res){
        var data = res.data.dat.order_list;
        var all = [].concat(data);
        console.log(all);
        console.log(data);
        for(var key in data){
          if(data[key].status==0){
            waitinglist.push(data[key]);
          }
          else{
            finishlist.push(data[key]);       
          }
        }
        THIS.setData({
          all: data,
          waitinglist: waitinglist,
          finishlist: finishlist,
          hidde: true,
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        THIS.setData({
          myheight:res.screenHeight,
        })
      },
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