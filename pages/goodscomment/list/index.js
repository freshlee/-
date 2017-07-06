// index.js
var newlist=new Array;
var pid;
var bid;
var newurl;
var myid;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    write: 0,
    hidden: true,
    submiting: true,
  },
  //输入操作
  inputing: function (e) {
    this.setData({
      content: e.detail.value,
    }
    )
  },
  back: function () {
    this.setData({
      write: 0,
    })
  },
  praise:function(event){
    var THIS=this;
    var des = event.currentTarget.dataset.index;
    var index = event.currentTarget.dataset.num;
    this.setData({
      status:newlist,
      hidden: false,
    })
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=list&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid='+myid,
      success:function(){
        var that=THIS;
        wx.request({
          url: newurl,
          success: function (res) {
            that.setData({
              praiselist: res.data.dat.order,
              hidden:true,
            })
          },
          fail:function(){
            that.setData({
              hidden: true,
            }) 
          }
        })
      }
    })
  },

  tocomment: function (e) {

    var des = e.currentTarget.dataset.des;
    console.log(e.currentTarget.dataset.des)
    wx.navigateTo({
      url: '../../comment/index?pid=' + des + '&bid=' + postid,
    })

  },
  write: function () {
    this.setData({
      write: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var THIS=this;
     myid = options.id;
     this.setData({
       myid:myid,
     })
     newurl='http://192.168.1.213/api/index.php?c=book&a=comment&op=list&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&goodsid=' + myid,
    console.log(newurl);
    this.getcomment();
  },
  getcomment:function(){
    var THIS = this;
    wx.request({
      url: newurl,
      success: function (res) {
        console.log(res);
        THIS.setData({
          praiselist: res.data.dat.order,
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
        }) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          myheight: res.screenHeight,
        })
      },
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