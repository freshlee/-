//app.js
var fundebug = require('./fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var THIS = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.cnmmsc.org/ljf_api.php?api=getopenid',
          data: {
            code: res.code,
            acid: 499,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (response) {
            var openid = response.data.openid;
            THIS.globalData.openid = openid;
            wx.getUserInfo({
              success: function (res) {
                var info = res.userInfo;
                wx.request({
                  url: 'http://192.168.1.213/api/index.php?c=book&a=login&op=register',
                  data: {
                    'openid': openid,
                    'avatarUrl': info.avatarUrl,
                    'name': info.nickName,
                    'gender': info.gender,
                    'province': info.province,
                    'city': info.city,
                    'uniacid': 2,
                  },

                })
              },
            })
          },
        })
      }
    })
    wx.request({
        url: 'http://192.168.1.213/api/index.php?c=book&a=videoshop&op=bb',
        success:function(res){
            THIS.globalData.version = res.data.dat;
        }
    })
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          var code=res.code;
          wx.request({
            url: 'https://api.cnmmsc.org/ljf_api.php?api=getopenid&acid=499&code='+code,
            success
          })
          console.log(res);
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    acid:2,
  }
})