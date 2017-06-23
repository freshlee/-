// index.js
//请注意 页面数据和访问后台数据分开储存了；
var mycate=undefined;
var mytype=undefined;
var mypay=undefined;
Page({
  /**
   * 页面的初始数据
   */
  data: {
  backgroundurl:"../../images/background.jpg",
  cates:0,
  types:0,
  pays:0,
  trans_mycate:"全部",
  trans_mytype : "全部",
  trans_mypay : "全部",
  status:"off",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  //转跳页面
  statusChange:function(){
     this.setData({
       status:this.data.status=="on"?"off":"on",
     })
  },
  jump:function(event){
    var id = event.currentTarget.dataset.id;
    var type=event.currentTarget.dataset.nav;
    if(type==1){mytype="video"}
    else if (type == 3) { mytype = "course"}
    else { mytype = "article" }
    var newurl="../"+mytype+"/index?&id="+id;
    console.log(newurl);
     wx.navigateTo({
       url: newurl,
     })
  },
  chosecate:function(event){
    var trans = event.currentTarget.dataset.trans;
     var cate=event.currentTarget.dataset.cate;
     mycate=cate;
     this.setData({
       cates:cate,
       trans_mycate:trans.substr(0,2)+"..",
     })
  },
  chosetype: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var types = event.currentTarget.dataset.type;
    mytype = types;
    this.setData({
      types: types,
      trans_mytype:trans.substr(0,2)+"..",
    })
    console.log(mytype);
  },
  chosepay: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var pay = event.currentTarget.dataset.pay;
    mypay = pay;
    this.setData({
      trans_mypay:trans.substr(0,2)+"..",
      pays: pay,
    })
  },
  sure: function () {
    var THIS = this;
    var newcate = mycate == undefined || mycate ==0 ? "" : "&pcate=" + mycate;
    var newtype = mytype == undefined || mytype ==0 ? "" : "&doctype=" + mytype;
    var newpay = mypay == undefined || mypay ==0 ? "" : "&priceattr=" + mypay;
    var newurl = "http://www.api.com/index.php?c=book&a=getgoods&acid=2&op=filter&openid=5" + newcate + newtype + newpay;
    console.log(newurl);
    this.setData({
      status: "off"
    })
    wx.request({
      url: newurl,
      success: function (res) {
        res = res.data;
        console.log(res);
        THIS.setData({
          cases: res,
        })
      }
    })
    
  },
  onLoad: function (options) {
    //初始化数据
    mytype = gettype;
    switch (gettype) {
      case "1":
        gettype = "视频";
        break;
      case "2":
        gettype = "课程";
        break;
      case "3":
        gettype = "文章";
    }

    console.log(gettype);
    this.setData({
      types: mytype,
      trans_mytype: gettype,
    })
    var newcate = mycate == undefined ? "" : "&pcate=" + mycate;
    var newtype = mytype == undefined ? "" : "&doctype=" + mytype;
    var newpay = mypay == undefined ? "" : "&priceattr=" + mypay;
    var newurl = "http://www.api.com/index.php?c=book&a=getgoods&acid=2&op=filter&openid=5"+newcate+newtype+newpay;
    var gettype = options.type;
    var cate = options.cate;
    var pay = options.pay;
    var Thetype=options.type;
    var THIS=this;
    console.log(newurl);
     wx.request({
       url: "http://www.api.com/index.php?c=book&a=getgoods&acid=2&op=query_cate&openid=5",
       success:function(res){
         var res=res.data;
           THIS.setData({
             goodstype:res,
           })
       }
     })
     wx.request({
       url: newurl,
       success: function (res) {
         res = res.data;
         console.log(res);
         THIS.setData({
           cases: res,
         })
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