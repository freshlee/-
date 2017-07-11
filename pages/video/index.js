// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
var box=[1,1,1];
var myid;
var merchid;
var concernstatus;
var originstatus;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     status:0,
     content:"测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试测试测测试测试"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  concern:function(){
     concernstatus=0;
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
    concernstatus=undefined;
    this.setData({
      myid:myid,
      box:box,
    })
    //获取商品信息
    var newurl = "http://192.168.1.213/api/index.php?c=book&a=order&op=create&uniacid=2&openid=" + getApp().globalData.openid+"&goodsid="+myid;
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
        merchid=data.goods.merchid;
        var article=data.goods.content;
        WxParse.wxParse('article', 'html', article, THIS, 5);
        THIS.setData({
          goods:data.goods, 
          hidden:true,   
        })
        //获取机构信息
        wx.request({
          url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=id&uniacid=2&openid=' + getApp().globalData.openid+'&uid=' + merchid,
          success: function (res) {
            console.log(res);
            THIS.setData({
              organise: res.data.dat.zz.description,
            })
          }
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
      url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=list&uniacid=2&openid=' + getApp().globalData.openid+'&orderid=7317&goodsid='+myid,
      success:function(res){
        var data=res.data.dat
        THIS.setData({
          commentnum:data.order_count,
          commentlist:data.order,
          reputation:data.level_avg,
        })
      }
    })
  //获取机构接口
    wx.request({
      url: '',
    })
    //获取教师信息
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=spt&uniacid=2&openid=' + getApp().globalData.openid+'&goodsid=' +myid,
      success:function(res){
        var data=res.data.dat;
        THIS.setData({
          teacher:data.teacher,
        })
      },
    })
    //获取关注状态
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=gz&uniacid=2&openid=' + getApp().globalData.openid+'&goodsid='+myid,
      success:function(res){
        console.log(res);
        THIS.setData({
          favor:res.data.dat.isfavorite,
        })
        originstatus = res.data.dat.isfavorite;
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
    //关注

    if (concernstatus ===undefined){}
    else{
      if (concernstatus == 0 && originstatus==1){
        wx.request({
          url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=toggle&uniacid=2&openid='+getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=1",
        })
      }
      else if (concernstatus == 1&&originstatus==0){
        wx.request({
          url: 'http://192.168.1.213/api/index.php?c=book&a=merch&op=toggle&uniacid=2&openid=' + getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=0",
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