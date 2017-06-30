// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
var box=[1,1,1];
Page({

  /**
   * 页面的初始数据
   */
  data: {
     status:0,
     box:box,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  more:function(){
    wx.navigateTo({
      url: '../comment/index',
    })
  },
  move:function(event){
    if(event.detail.scrollTop>=190){
      this.setData({
        status:1,
      })
    }
    else{
      this.setData({
        status:0,
      })
      
    }
  },
  expension:function(event){
    var casename=event.currentTarget.dataset.case;
    box[casename] = box[casename]==1?0:1;
    this.setData({
      box:box,
    })
    console.log(this.data.box);
  },
  detail: function () {
    nowpos=0;
    this.setData({
      myindex:0,
      index:0,
    })
    console.log(this.data.toView);
  },
  comment: function () {
    nowpos=lengths;
    this.setData({
      myindex: 1,
      index: 1,
    })
    console.log(this.data.toView);
  },
  interact: function () {
    nowpos=lengths*2;
    this.setData({
      myindex: 2,
      index: 2,
    })
    console.log(this.data.toView);
  },
  onLoad: function (options) {
    var THIS = this;
    var article;
    var myid=options.id;
    var newurl ="http://192.168.1.3/api/index.php?c=book&a=videoshop&op=query_videoshopid&shopid=1647";
    wx.request({
      url: newurl,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var data=res.data.dat.SHOPID[0];
         article=data.content;
        console.log(article);
        WxParse.wxParse('article', 'html', article, THIS, 5);
        THIS.setData({
          price:data.marketprice,
          title:data.title,
          
        })
        console.log(THIS.data.price);
      }
    })

  },

  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
          lengths= res.screenWidth;
          THIS.setData({
            myheight:res.screenHeight,
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