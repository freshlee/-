// index.js
var page=0;
var psize;
var total;
var max=3;
Page({

  /**
   * 页面的初始数据
   */
  more:function(){
    var THIS=this;
    if(page<max){
      wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=Usersq&op=getposts&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&page=' + page,
        success: function (res) {
          psize = res.data.dat.pagesize;
          total = res.data.dat.total;
          console.log(res);
          THIS.setData({
            replys: THIS.data.replys.concat(res.data.dat.list),
          })
          max = Math.ceil(total / psize);
        }
      })
    }
    else{
        THIS.setData({
        warm:1,
      })
    }
    page += 1;
    console.log(psize);
  },
  jumptoreply: function (e) {
    var id = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../comment/index?id=' + id,
    })
  },
  jumptomodel:function(e){
    var id=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../community/model/index?id=' + id,
    })
  },
  getLocalTime: function (nS) {
    var timestamp = nS;
    var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "年" +
      (d.getMonth() + 1) + "月" +
      (d.getDate()) + "日";
    return date;
  }, 
  data: {
  myindex:0,
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
  onmove:function(event){
    var now=event.detail.current
    this.setData({
      myindex:now,
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
    var THIS=this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          myheight: res.screenHeight,
        })
      },
    })
    //获取帖子
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Usersq&op=main&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0',
      success:function(res){
        var data=res.data.dat;
        for(var key in data.posts){
          data.posts[key].createtime = THIS.getLocalTime(data.posts[key].createtime)
        }
        console.log(res);
        THIS.setData({
          boards: data.boards,
          posts:data.posts,
          replys:data.replys,

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