// index.js
var praises=[];
var postid;
var logo=[];
var pic=[];
var bid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statu: 0,
    praise: [],
    status: 0,
    hidden:true,
    submiting:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //删除图片
  del:function(e){
    var index= e.currentTarget.dataset.index;
    logo.splice(index,1);
    this.setData({
      logo:logo,
    })
  },
  back:function(){
    this.setData({
      status:0,
    })
  },
  tocomment:function(e){
     var des=e.currentTarget.dataset.des;
     wx.navigateTo({
       url: '../../comment/index?pid='+des+'&bid='+postid,
     })

  },
  changestatu: function (event) {
    var indexnow = event.currentTarget.dataset.index;
    var status = []
    status[indexnow] = this.data.statu[indexnow]==1 ? 0 : 1;
    this.setData({
      statu: status,
    })
  },
  dochange:function(bid,pid){
    var THIS=this;
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=like&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&id=12&bid=' + bid + "&pid=" + pid,
      success: function (res) {
        THIS.setData({
          shit:res.data.dat.good,
        })
      }
    })
    console.log(this.data.shit);
    return this.data.shit;
  },

  //提交申请
  submit: function (e) {
    var THIS=this;
    var data=e.detail.value;
    this.setData({
      content:data,
    })
    if (data >= 200 || data <= 5){
      wx.showToast({
        title: '内容在5~200个之间',
      })
      return false;
      }
    this.setData({
      submiting: false,
    })
     wx.request({
       url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=submit&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&images=' + logo[0]+"&bid="+bid,
       data:{
         content:THIS.data.content,
       },
       success:function(res){
         THIS.setData({
           status:0,
           submiting: true,
         })
         wx.showToast({
           title: '上传成功',
         })
         THIS.getcomment();
       },
       fail:function(){
         THIS.setData({
           submiting: true,
         })
         wx.showToast({
           title: '上传失败',
         })
       }
     })
  },
  agree: function (event) {
    this.setData({
      hidden:false,
    })
    var indexnow = event.currentTarget.dataset.index;
    var THIS=this;
    this.dochange(postid, indexnow);
      wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&mid=25769&bid=' + postid,
        success: function (res) {
          console.log(res);
          var data = res.data.dat;
          THIS.setData({
            list: data.list,
            hidden:true,
          })
        }
      })

  },
  toTip: function () {
    wx.navigateTo({
      url: '../tip/index'
    })
  },
  write: function () {
    this.setData({
      status: 1,
    })
  },
    //评论数据
  getcomment:function(){
    var THIS = this;
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&mid=25769&bid=' + bid,
      success: function (res) {
        console.log(res)
        var data = res.data.dat;
        THIS.setData({
          list: data.list,
          hiddsen:true,
        })
      },
      fail:function(){
        this.setData({
          hidden: true,
        })
        wx.showToast({
          title: '加载失败',
        })
      }
    }) 
  },
  onLoad: function (options) {
    var THIS=this;
    postid=options.id;
    bid = options.id;
    console.log(options);
    this.setData({
      hidden: false,
    })
    //评论数据
    this.getcomment();
    //头部数据
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=main&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&mid=25769&id=' + bid,
      success: function (res) {
        console.log(res)
        var data=res.data.dat;
        THIS.setData({
          board:data.board,
          hidden: true,
        })
      },
      fail: function () {
        this.setData({
          hidden: true,
        })
        wx.showToast({
          title: '加载失败',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  insertpic:function(){
    var THIS=this;
     wx.chooseImage({
       success: function(res) {
         logo.push(res.tempFilePaths[0])
         pic.push(res);
         THIS.setData({
           logo: logo,
           pic: pic,
         })
         wx.uploadFile({
           url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=submit&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0&bid=12&pid=21',
           filePath: logo[0],
           name: 'images',
         })
       },
     })
  },
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