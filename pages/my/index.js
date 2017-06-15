var app = getApp()
Page( {
  data: {
    userInfo: {}
  },
  bindphone:function(){
        wx.navigateTo({
             url: '../extra/bindphone/index'
        })
  },
  apply:function(){
        wx.navigateTo({
             url: '../merchant/apply/index'
        })
  },
    resetbind:function(){
    var that = this
    var acid=app.globalData.uniacid;
    var openid=app.globalData.openid;
    wx.showModal({
          title: '提示',
          content: '确定解绑手机吗？',
          success: function(res) {
              if (res.confirm) {
                    wx.request({
                        url: 'https://api.cnmmsc.org/index.php?c=shop2&a=bindmobile&op=unbind',
                        method: 'GET',
                        data: {openid:openid,acid:acid},
                        header: {
                            'Accept': 'application/json'
                        },
                        success: function(res) {
                            wx.showToast({
                                title: res.data.msg
                            });
                            if(res.data.status==1){
                                that.setData({isbindmobile:0})
                            }
                        }
                    })
              }
          }
    })
      
  },
  onPullDownRefresh: function(){
    this.onshow();
    wx.stopPullDownRefresh();
  },
  onshow:function(){
      var that = this
    var acid=app.globalData.uniacid;
    var openid=app.globalData.openid;
    wx.getUserInfo({
        success: function(res) {
            app.globalData.userinfo = res.userInfo
        }
    })
      that.setData( {
        userInfo: app.globalData.userinfo,
        copyright:app.globalData.copyright
      })
      wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=ucenter',
            method: 'GET',
            data: {openid:openid,acid:acid},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData( {
                   status1: res.data.dat.ordercount[0],
                   status2: res.data.dat.ordercount[1],
                   status3: res.data.dat.ordercount[2],
                   status4: res.data.dat.ordercount[3],
                   status5: res.data.dat.ordercount[4],
                   status6: res.data.dat.ordercount[5],
                   isbindmobile: res.data.dat.isbindmobile,
                   client_apply:res.data.dat.client_apply,
                   merch_status:res.data.dat.merch_status
                })
            }
        })
  },
  onShow: function() {
    this.onshow();
  }

})