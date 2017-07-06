// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
var box=[1,1,1];
var myid;
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
      url: '../goodscomment/list/index?id='+myid,
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
    myid=options.id;
    this.setData({
      myid:myid,
    })
    //获取商品信息
    var newurl ="http://192.168.1.213/api/index.php?c=book&a=order&op=create&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid="+myid;
    wx.request({
      url: newurl,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var data=res.data.dat;
        //  article=data.content;
        // WxParse.wxParse('article', 'html', article, THIS, 5);
        THIS.setData({
          goods:data.goods, 
          hidden:true,   
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
        })
        wx.showToast({
          title: '加载失败',
        })
      }
    })
//获取评论接口
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=list&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&orderid=7317&goodsid='+myid,
      success:function(res){
        var data=res.data.dat
        THIS.setData({
          commentnum:data.order_count,
          commentlist:data.order,
          reputation:data.level_avg,
        })
        console.log(res);
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