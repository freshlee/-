// index.js
var myid;
var WxParse = require('../../wxParse/wxParse.js');
var concernstatus;
var originstatus;
var openid = getApp().globalData.openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   show:1,
   hidden:true,
  },
  concern: function () {
    concernstatus = 0;
    this.setData({
      favor: 0,
    })
    console.log(this.data.favor);
  },
  disconcern: function () {
    concernstatus = 1;
    this.setData({
      favor: 1,
    })
  },
  toRead:function(){
    wx.navigateTo({
      url: './read/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS=this;
    concernstatus = undefined;
    THIS.setData({
      hidden:false
    })
    myid=options.id;
    console.log(myid);
    //获取商品信息
    wx.request({
      url: "http://192.168.1.213/api/index.php?c=book&a=order&op=create&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid="+myid,
      success: function (res) {
        console.log(res.data);
        var data = res.data.dat;
        var article = data.goods.description;
          WxParse.wxParse('article', 'html', article, THIS, 5);
        THIS.setData({
          goods: data.goods,
          hidden: true,
        })
      },
      fail: function () {
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
      url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=list&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&orderid=7317&goodsid=' + myid,
      success: function (res) {
        console.log(res);
        var data = res.data.dat
        THIS.setData({
          commentnum: data.order_count,
          commentlist: data.order,
          reputation: data.level_avg,
        })
        console.log(res);
      }
    })
    //获取关注状态
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=gz&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + myid,
      success: function (res) {
        console.log(res);
        THIS.setData({
          favor: res.data.dat.isfavorite,
        })
        originstatus = res.data.dat.isfavorite;
      }
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
    if (concernstatus === undefined) { }
    else {
      if (concernstatus == 0 && originstatus == 1) {
        wx.request({
          url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=toggle&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + myid + "&isfavorite=1",
        })
      }
      else if (concernstatus == 1 && originstatus == 0) {
        wx.request({
          url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=toggle&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + myid + "&isfavorite=0",
        })
      }
    }
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