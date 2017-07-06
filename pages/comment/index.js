// index.js
var newlist=new Array;
var pid;
var bid;
var newurl;
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
      url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=like&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&pid='+des,
      success:function(){
        var that=THIS;
        wx.request({
          url: newurl,
          success: function (res) {
            that.setData({
              praiselist: res.data.dat.list,
              hidden:true,
            })
            console.log(that.data.praiselist)
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
     pid = options.pid;
     bid = options.bid;
    newurl = 'http://192.168.1.213/api/index.php?c=book&a=Post&op=getlist&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&pid='+pid+"&bid="+bid;
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
          praiselist: res.data.dat.list,
        })
      }
    })
  },
  submit: function (e) {
    var THIS = this;
    var data = e.detail.value;
    if (data >= 200 || data <= 5) {
      wx.showToast({
        title: '内容在5~200个之间',
      })
      return false;
    }
    this.setData({
      submiting: false,
      content:data,
    })
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=reply&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&pid='+pid+"&bid="+bid,
      data: {content:THIS.data.content},
      success: function (res) {
        THIS.setData({
          write: 0,
          submiting: true,
        })
        wx.showToast({
          title: '上传成功',
        })
        THIS.getcomment();
      },
      fail: function () {
        THIS.setData({
          submiting: true,
        })
        wx.showToast({
          title: '上传失败',
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