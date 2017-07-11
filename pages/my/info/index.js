// index.js
const date = new Date()
const years = []
const months = []
const days = []
var birth =[];
var openid = getApp().globalData.openid;


for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  renew:function(){
    var THIS = this;
    wx.request({
      url: 'http://192.168.1.213/api/index.php?c=book&a=Usersq&op=selectuser&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0',
      success: function (res) {
        console.log(res);
        var data = res.data.dat.member;
        THIS.setData({
          username: data.realname,
          sex: data.sex,
          num: data.mobile,
          email: data.email,
          qq: data.qq,
          age: data.age,
          time: data.birthyear + "-" + data.birthmonth + "-" + data.birthday
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      hidden: true,
    })
    this.renew();
  
  },
  submit:function(e){
    this.setData({
      hidden:false,
    })
    var times=this.data.time.split("-");
    var year=times[0]
    var month = times[1]
    var day = times[2]
    var THIS=this;
     wx.request({
       url: 'http://192.168.1.213/api/index.php?c=book&a=Usersq&op=userinfo&uniacid=2&openid=otNFxuOh8MWAIewTiZ_tpLdiSKc0' + "&lat=" + THIS.data.lat + "&lng=" + THIS.data.lng + "&birthyear=" + year + "&birthmonth=" + month + "&birthday=" + day,
       data:e.detail.value,
       success:function(res){
         console.log(res);
       var data=res.data.dat
         THIS.setData({
           hidden: true,
         })
         THIS.renew();
       }
     })
  },
  genderchange(e){
    this.setData({
      gender: e.detail.value, 
    })
    console.log(this.data.gender);
  },
  bindChange: function (e) {
    const val = e.detail.value;
    birth=e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },
  bindTimeChange: function (e) {
    var newdate=e.detail.value.split("-");
    var today = new Date(newdate[1] + " " + newdate[2] + "," + newdate[0]);
    var birthday = new Date();
    var diff = -(today.getTime() - birthday.getTime())/1000/3600/24/365;
    var yearold = Math.floor(diff);
    this.setData({
      time: e.detail.value,
      age: yearold,
    })
  },
  getaddress: function () {
    var THIS = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        THIS.setData({
          address: res.address,
          lat:res.latitude,
          lng:res.longitude,
        })
      },
    })
  },
  check:function(){
    var name =this.data.username;
    var gender=this.data.gender;
    var birth=this.data.time;
    var age=this.data.age;
    var num=this.data.num;
    var email=this.data.email;
    var qq =this.data.qq;
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