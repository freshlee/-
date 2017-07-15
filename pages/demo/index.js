var openid = getApp().globalData.openid;
Page({
  data: {

  },
getLocalTime:function (nS) {     
  var timestamp = nS;
  var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
  var date = (d.getFullYear()) + "年" +
    (d.getMonth() + 1) + "月" +
    (d.getDate()) + "日";
    return date;  
  }, 
moveToMore:function(){
  wx.navigateTo({
    url: '../filter/index?type=3',
  })
},
moveToArticle:function(event){
  var newurl = '../article/index?id='+event.currentTarget.dataset.id;
  wx.navigateTo({
    url: newurl,
  })
},
// recorrect:function(des,oldip,newip){
//   for(var key in des){
//     mark=/oldip/
//     des[key].thumb = des[key].thumb.replace(mark,"")
//   }
// },
onReady:function(){
  var hehe = getApp().globalData.userInfo;  
  console.log(hehe);  
  var THIS=this;

  //获取用户信息
  
},
 onLoad:function(){
     this.setData({
         versioninfo: getApp().globalData.version,
     })
   var THIS=this;
   //商品接口
   wx.request({
       url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=videoshop&op=query_videoshop&uniacid=' + getApp().globalData.acid,
     data: {
     },
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       console.log(res);
       var videos = [];
       var mainLogos;
       var subLogos = [];
       var courses = [];
       var article = [];
       var bannerUrl = [];
       var list1 = res.data.dat.type1;
       var list3 = res.data.dat.type2;
       var list4 = res.data.dat.type3;
       for (var i in list1) {
         var element = "../video/index?doctype=" + list1[i].doctype + "&id=" + list1[i].id;
         var list1_thumb = list1[i].thumb;
         videos.push({ url: element, thumb: list1_thumb,title: list1[i].title});
       }
       for (var i in list3) {
         var element = "../course/index?id=" + list3[i].id;
         var list3_thumb = list3[i].thumb;
         courses.push({ url: element, thumb: list3_thumb, price: list3[i].marketprice, name: list3[i].title });
       }
       for (var i in list4) {
         var element = "../course/index?id=" + list4[i].id;
         var list4_thumb = list4[i].thumb;
         var time = THIS.getLocalTime(list4[i].createtime);
         article.push({ url: element, thumb: list4_thumb, title: list4[i].title, subscript: list4[i].articlesubscript, content: list4[i].content,time:time,id:list4[i].id });
       }

       THIS.setData({
         video: videos,
         courseData: courses,
         articleData: article,
       });
     }
   })

   //展示接口
   wx.request({
       url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=videovad&op=videovad_nav&uniacid=' + getApp().globalData.acid,
     data: {
     },
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       console.log(res);
       var videos = [];
       var mainLogos;
       var subLogos = [];
       var courses = [];
       var article = [];
       var bannerUrl = [];
       var navs = [];
       var banner = res.data.dat.BANNER;
       var list2 = res.data.adv;
       var nav = res.data.dat.NAV;
       for (var i in banner) {
         var link = banner[i].link;
         var mark = /id=\d{2,5}/
         var reslink = link.match(mark);
         bannerUrl.push({ url: banner[i].link, thumb: banner[i].thumb });
       }
       for (var i in list2) {
         if (i == 0) { mainLogos = { url: list2[i].link, thumb: list2[i].thumb }; continue; }
         else if (i <= 4) { subLogos.push({ url: list2[i].link, thumb: list2[i].thumb }); }
         else { break; }
       }
       for (var key in nav) {
           var probe = /cate=\d*/
           var id= nav[key].url.match(probe)[0];
           var id=id.substring(5);
           console.log(id);
         navs.push({ url: "../filter/index?cate=" + id, thumb: nav[key].icon, name: nav[key].navname })
       }

       THIS.setData({
         title: navs,
         bannerUrls: bannerUrl,

       });
     }
   })
   //机构接口
   wx.request({
       url: 'http://192.168.1.213/api/index.php?c=eweivideo&a=merch&op=sy&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
     success:function(res){
       console.log(res);
       var data=res.data.dat.sy;
       for(var key in data){
         data[key].url="../advertise/index?id="+data[key].id;
       }
       var main_organise = data[0];
       var new_organise = data.slice(1, data.length);
       THIS.setData({
         organise: new_organise,
         mainorganise: main_organise,
       })
     }
   })
 },

})

