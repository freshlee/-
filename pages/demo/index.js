Page({
  data: {

  },
moveToMore:function(){
  wx.navigateTo({
    url: '../filter/index?type=3',
  })
},
moveToArticle:function(event){
  var newurl = '../article/index?'+event.currentTarget.dataset.id;
  wx.navigateTo({
    url: newurl,
  })
},
onReady:function(){
  var THIS=this;

  //商品接口
  wx.request({
    url: 'http://192.168.1.3/api/index.php?c=book&a=videoshop&op=query_videoshop',
    data: {
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      var videos=[];
      var mainLogos;
      var subLogos=[];
      var courses=[];
      var article=[];
      var bannerUrl=[];
      var list1 = res.data.dat.type1;
      var list3 = res.data.dat.type2;
      var list4 = res.data.dat.type3;
      for(var i in list1){
        var element = "../video/index?doctype=" + list1[i].doctype + "&id=" + list1[i].id;
        var list1_thumb=list1[i].thumb;
        videos.push({url:element,thumb:list1_thumb});
      }
      console.log(subLogos);
      for (var i in list3) {
        var element = "../course/index?id=" + list3[i].id;
        var list3_thumb = list3[i].thumb;
        courses.push({ url: element, thumb: list3_thumb ,price:list3[i].marketprice,name:list3[i].name});
      }
      for (var i in list4) {
        var element = "../course/index?id=" + list4[i].id;
        var list4_thumb = list4[i].thumb;
        article.push({ url: element, thumb: list4_thumb, title:list4[i].articlename, subscript: list4[i].articlesubscript,content:list4[i].content});
      }
      console.log(article);
       
      THIS.setData({
        video:videos,
        courseData:courses,
        articleData:article,    
      });
    }
  })

//展示接口
  wx.request({
    url: 'http://192.168.1.3/api/index.php?c=book&a=videovad&op=query_videovad', 
    data: {
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      var videos = [];
      var mainLogos;
      var subLogos = [];
      var courses = [];
      var article = [];
      var bannerUrl = [];
      var banner = res.data.dat.BANNER;
      var list2 = res.data.adv;
      for (var i in banner) {
        var link = banner[i].link;
        var mark = /id=\d{2,5}/
        var reslink = link.match(mark);
        console.log(reslink);
        bannerUrl.push({ url: banner[i].link, thumb: banner[i].thumb });
      }
      for (var i in list2) {
        if (i == 0) { mainLogos = { url: list2[i].link, thumb: list2[i].thumb }; continue; }
        else if (i <= 4) { subLogos.push({ url: list2[i].link, thumb: list2[i].thumb }); }
        else { break; }
      }

      THIS.setData({
        title: res.data.nav,
        bannerUrls: bannerUrl,

      });
    }
  })

},

})

