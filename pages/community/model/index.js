// index.js
var openid = getApp().globalData.openid;
var praises=[];
var postid;
var logo=[];
var pic=[];
var bid;
var permission;
var page;
var max;
var rest;
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
 //关注
 concern:function(){
   this.setData({
     isconcern:!this.data.isconcern,
   })
 },
 //删除评论
 delcomment:function(e){
   var pid = e.currentTarget.dataset.pid;
   var index = e.currentTarget.dataset.index;
   wx.request({
     url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=like&uniacid=2&openid=' + getApp().globalData.openid+'&id=12&bid='+bid+"&pid="+pid,
     success:function(res){
       var newlist=THIS.data.list;
       newlist.splice(index, 1);
       THIS.setData({
         list:newlist
       })
     }
   })
 },
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
      url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=like&uniacid=2&openid=' + getApp().globalData.openid+'&id=12&bid=' + bid + "&pid=" + pid,
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
       url: 'http://192.168.1.213/api/index.php?c=book&a=Post&op=submit&uniacid=2&openid=' + getApp().globalData.openid+'&images=' + logo[0]+"&bid="+bid,
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
     wx.request({
         url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=upload&uniacid=2&openid=' + getApp().globalData.openid + '&bid=' + bid,
         data: { images: logo},
         success:function(res){
             
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
        url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&openid=' + getApp().globalData.openid+'&mid=25769&bid=' + postid,
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
      var THIS=this;
       if (page = 2) {
          wx.request({
              url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&page=1&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
              success: function (res) {
                  max = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
                  rest = res.data.dat.tatal % res.data.dat.pagesize;
                  console.log(res)
                  var data = res.data.dat;
                  THIS.setData({
                      list: data.list,
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
       }
      else if(page = max){
        wx.request({
            url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&page=1&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
            success: function (res) {
                var data = res.data.dat;
                var anchor = (page - 1) * 10;
                var newlist=[];
                newlist = THIS.data.list;
                newlist.splice(anchor, rest);
                THIS.setData({
                    list: THIS.data.list.concat(data.list),
                    hidden: true,
                })
                console.log(THIS.data.list);
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
      }
  },
  onLoad: function (options) {
    page=2;
    var THIS=this;
    postid=options.id;
    bid = options.id;
    console.log(options);
    //判断是不是版主
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Usersq&op=banzhu&uniacid=2&openid=' + getApp().globalData.openid+'&mid=25769&bid=' + bid,
      success: function (res) {
       permission=res.data.dat;
       THIS.setData({
         permission:permission,
       })
      }
    }) 
    this.setData({
      hidden: false,
    })
    //评论数据
    this.getcomment();
    //头部数据
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=main&uniacid=2&openid=' + getApp().globalData.openid+'&mid=25769&id=' + bid,
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
    //获取关注状态
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=sfgz&uniacid=2&openid=' + getApp().globalData.openid+'&mid=25769&bid=' + bid,
      success:function(res){
        THIS.setData({
            concern:res.data.dat,
            isconcern: res.data.dat,
        })
        console.log(THIS.data.isconcern)
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
           url: 'http://192.168.1.213/api/index.php?c=book&a=comment&op=upload&uniacid=2&openid=' + getApp().globalData.openid+'&bid='+bid,
           filePath: logo,
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
    var THIS=this;
    var old = this.data.concern;
    var latest = this.data.isconcern;
    if(old!=latest){
      wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=follow&uniacid=2&openid=' + getApp().globalData.openid  + "&bid=" + bid,
        success: function () {
        }
      })
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
      if(page<=max){
          //刷新评论数据
          var THIS = this;
          wx.request({
              url: 'http://192.168.1.213/api/index.php?c=book&a=Board&op=getlist&uniacid=2&page=' + page + '&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
              success: function (res) {
                  var data = res.data.dat;
                  THIS.setData({
                      list: THIS.data.list.concat(data.list),
                      hiddsen: true,
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
          page += 1; 
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})