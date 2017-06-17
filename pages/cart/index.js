var app = getApp()
Page( {
  data: {
      cartImg: '../../images/cart-null.png',
      tipWords: '你的购物车没有商品赶快去挑选吧',
      count:0,
      number:0,
      totals: '',
      minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
      selectedAllStatus: true,
      carts: [{ title: "测试", thumb:"C:/Users/Administrator/Desktop/image/banner2.jpg",id:165,marketprice:1600,total:50}
      ]
    },
     switchindex:function(){
      wx.switchTab({
            url: '../index/index'
        })
    },
    del: function(e){
      var that=this;
      var id= e.currentTarget.dataset.id;
        wx.showModal({
          title: '提示',
          content: '确定删除课程吗？',
          success: function(res) {
            if (res.confirm) {
              var openid=app.globalData.openid;
              var acid=app.globalData.uniacid;
              wx.request({
                  url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=delete',
                  method: 'GET',
                  data: {openid:openid,acid:acid,id:id},
                  header: {
                      'Accept': 'application/json'
                  },
                  success: function(res) {
                     if(res.data.status==1){
                        var carts=res.data.list;
                        for(var i in carts){
                          carts[i].selected=true;
                        }
                        wx.showToast({
                            title: '删除成功'
                        });
                        that.setData({
                              carts: carts
                        }) 
                        wx.setStorage({
                          key: "cartcount",
                          data: res.data.list
                      })
                        that.sum();
                     }
                     if(res.data.status==0){
                        wx.showToast({
                            title: res.data.msg
                        });
                     }
                  }
              })
            }
          }
      })
    },

  bindCheckbox: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.sum()
  },
   bindSelectAll: function() {
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    var carts = this.data.carts;
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },
  sum: function() {
    var carts = this.data.carts;
    var totals = 0;
    var total =0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        totals += carts[i].total * carts[i].marketprice;
      }
    }
    total=totals.toFixed(2);
    this.setData({
      carts: carts,
      totals: '￥' + total
    });
  },
  buy:function(){
    var numm=[];
    var acid=app.globalData.uniacid;
    var openids=app.globalData.openid;
    var carts=this.data.carts;
    //获取cart数量
    var fromcart=1;
    for (var i = 0; i < carts.length; i++) {
      //需要删除的内容
      if (carts[i].selected) {
         numm.push(carts[i].id);
      }
    }if(numm!=''){
      wx.showToast({
				title: '',
        icon: 'loading'
			});
       wx.request({
         url: '',
         data:{
           cart:numm,
           openid:openid,

         }
       })
        // wx.navigateTo({
        //     url: '../cart/index?openid='+openid+'&acid='+acid+'&cartid='+numm+'&fromcart='+fromcart
        // })
    }else{
      wx.showModal({
          title: '提示',
          content: '请勾需要删除的内容！'
      })
    }
    
    },
    
  onLoad: function() {

  },
  



})
