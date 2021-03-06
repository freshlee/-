// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
var myid;
var merchid;
var concernstatus;
var originstatus;
var box;
var ralativecourse=[];
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
  jumptoorganise:function(){
    wx.navigateTo({
        url: '../advertise/index?merchid='+this.data.merchid,
    })
  },
  jumptocourse:function(e){
     var id=e.currentTarget.dataset.id;
     var doctype = e.currentTarget.dataset.doctype;
     var typename;
     switch(doctype){
         case "1": typename = "video";
         case "2": typename = "course";
         case "3": typename = "article";
     }
     wx.navigateTo({
         url: '../'+typename+"/index?id="+id,
     })
  },
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
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS = this;
    var article;
    myid=options.id;
    box=[1,1,1];
    concernstatus=undefined;
    this.setData({
      myid:myid,
      box: [1, 1, 1],
    })
    //获取商品信息
    var newurl = "http://192.168.1.213/api/index.php?c=eweivideo&a=order&op=create&uniacid=" + getApp().globalData.acid+"&openid=" + getApp().globalData.openid+"&goodsid="+myid;
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
          merchid:merchid,   
        })
        //获取机构信息
        wx.request({
            url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=id&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&uid=' + merchid,
          success: function (res) {
            console.log(res);
            THIS.setData({
              organise: res.data.dat.zz.description,
              organiseinfo:res.data.dat,
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
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=comment&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid='+myid,
      success:function(res){
        var data=res.data.dat
        THIS.setData({
          commentnum:data.order_count,
          commentlist:data.order,
          reputation:data.level_avg,
        })
      }
    })

    //获取教师信息
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=spt&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' +myid,
      success:function(res){
        var data=res.data.dat;
        var teacher=data.teacher;
        for(var key in teacher){
            var coursecount;
            var newcontent=teacher[key].content;
            WxParse.wxParse('content['+key+']', 'html', newcontent, THIS, 5);
            wx.request({
                url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=tsp&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&tid=' + teacher[key].id,
                success:function(res){
                    var data=res.data.dat.shop;
                    teacher[key].courselist=data;
                    THIS.setData({
                        teacher: teacher,
                        ralativecourse:ralativecourse.concat(data)
                    })
                }
            })
        }
      },
    })
    //获取关注状态
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=gz&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid='+myid,
      success:function(res){
        console.log(res);
        THIS.setData({
          favor:res.data.dat.isfavorite,
        })
        originstatus = res.data.dat.isfavorite;
      }
    })
    //留下脚印
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=addfootstep&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&goodsid=' + myid,
      success:function(res){
        console.log("已经加入浏览记录")
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
      var THIS=this;
      this.setData({
          hidden:false
      })
      //获取权限信息
      wx.request({
          url: "http://192.168.1.213/api/index.php?c=eweivideo&a=pay&op=gm&uniacid=" + getApp().globalData.acid+"&openid=" + getApp().globalData.openid + "&goodsid=" + myid,
          success: function (res) {
              THIS.setData({
                  permission: res.data.dat,
                  hidden:true
              })
          },
          fail:function(){
              THIS.setData({
                  hidden: true
              })
          }
      })
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
    console.log()
    if (concernstatus ===undefined){}
    else{
      if (concernstatus == 0 && originstatus==1){
        wx.request({
            url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=toggle&uniacid=' + getApp().globalData.acid+'&openid='+getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=1",
        })
      }
      else if (concernstatus == 1 && originstatus==0){
        wx.request({
            url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=toggle&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=0",
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