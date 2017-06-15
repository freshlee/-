Page({
  data: {
    title: [{ name: "计算机", thumb: "C:/Users/Administrator/Desktop/image/计算机.png" }, { name: "经营会计", thumb: "C:/Users/Administrator/Desktop/image/会计.png" }, { name: "社科法律", thumb: "C:/Users/Administrator/Desktop/image/社区法律.png" }, { name: "创业", thumb: "C:/Users/Administrator/Desktop/image/创业.png" }, { name: "艺术设计", thumb: "C:/Users/Administrator/Desktop/image/艺术设计.png" }, { name: "外语", thumb: "C:/Users/Administrator/Desktop/image/外语.png" }, { name: "工程", thumb: "C:/Users/Administrator/Desktop/image/工程.png" }, { name: "先修课", thumb: "C:/Users/Administrator/Desktop/image/先修课.png" }],
    bannerUrls: [
      'C:/Users/Administrator/Desktop/image/banner1.png',
      'C:/Users/Administrator/Desktop/image/banner2.jpg',
      'C:/Users/Administrator/Desktop/image/banner3.png',
    ],
    courseData: [{ name: "IOS高级工程师全课程", price: "300", img: "courseData", url: "C:/Users/Administrator/Desktop/image/Case3-01.png" }, { name: "Andriod开发/项目", price: "500", img: "courseData", url: "/images/demoimage/Case3_02.png" }, { name: "Andriod开发/项目", price: "500", img: "courseData", url: "/images/demoimage/Case3_02.png" }],
    autoplay: false,
    myheight:"80%",
    articleData: [{ title: "《同级管理》互联网时代的管理变革", content: "内容简述:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", subscript: "#知识管理#互联网联网", url: "C:/Users/Administrator/Desktop/image/article.png" }, { title: "新闻标题", content: "内容简述：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", subscript: "#标签", url: "C:/Users/Administrator/Desktop/image/article.png" }],
  },
onReady:function(){
  var THIS=this;
  wx.request({
    url: 'http://192.168.1.5/index.php?c=edu&a=index&op=init', //仅为示例，并非真实的接口地址
    data: {
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      var filter=[];
      // console.log(res.data.list1);
      var data = res.data.list1;
      for(var i in res.data.list1){
        var element = "../detail/video/index?doctype=" + data[i].doctype + "&id=" + data[i].id;
        filter.push(element);
      }
      
      THIS.setData({
        title:res.data.nav,
        video:filter,
      });
      console.log(THIS.data.video);
    }
  })
}
})

