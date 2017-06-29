// index.js
const date = new Date()
const years = []
const months = []
const days = []
var birth =[]

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
  onLoad: function (options) {
  
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
    wx.chooseAddress({
      success: function (res) {
        var address = res.provinceName + " " + res.cityName + " " + res.detailInfo;
        THIS.setData({
          address: address,
        })
        console.log(THIS.data.address);
      }
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