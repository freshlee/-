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
      carts: [
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
          content: '确定删除购物车吗？',
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
    bindMinus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var total = this.data.carts[index].total;
    if (parseInt(total) > 1) {
      total --;
      var minusStatus = total <= 1 ? 'disabled' : 'normal';
    var carts = this.data.carts;
    carts[index].total = total;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    var type=2;
    var id=this.data.carts[index].id;
    var acid=app.globalData.uniacid;
    var openid=app.globalData.openid;
     wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=changnum',
            method: 'GET',
            data: {id:id,acid:acid,openid:openid,type:type},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
               
            }
        })
    this.sum();
    }else{
       wx.showToast({
				title: '超过下限了！'
			});
    }
  },
  bindPlus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var total = this.data.carts[index].total;
    var stock = this.data.carts[index].stock;
    if (parseInt(total) < parseInt(stock)) {
        total ++;
        var minusStatus = total <= 1 ? 'disabled' : 'normal';
        var carts = this.data.carts;
        carts[index].total = total;
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        this.setData({
          carts: carts,
          minusStatuses: minusStatuses
        });
        var type=1;
        var id=this.data.carts[index].id;
        var acid=app.globalData.uniacid;
        var openid=app.globalData.openid;
        wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=changnum',
                method: 'GET',
                data: {id:id,acid:acid,openid:openid,type:type,num:0},
                header: {
                    'Accept': 'application/json'
                },
                success: function(res) {

                }
            })
        this.sum()
    }else{
         wx.showToast({
            title: '库存不足！'
          });
    }
    
  },
  inputchange:function(e){
      var value=e.detail.value;
      var index = parseInt(e.currentTarget.dataset.index);
      var total = this.data.carts[index].total;
      var stock = this.data.carts[index].stock;
      var r = /^\+?[1-9][0-9]*$/;　
      if(r.test(value)){
          if (parseInt(value) <= parseInt(stock)) {
            var minusStatus = total <= 1 ? 'disabled' : 'normal';
            var carts = this.data.carts;
            carts[index].total = value;
            var minusStatuses = this.data.minusStatuses;
            minusStatuses[index] = minusStatus;
            this.setData({
              carts: carts,
              minusStatuses: minusStatuses
            });
            var type=1;
            var id=this.data.carts[index].id;
            var acid=app.globalData.uniacid;
            var openid=app.globalData.openid;
            wx.request({
                    url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=changnum',
                    method: 'GET',
                    data: {id:id,acid:acid,openid:openid,type:0,num:value},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {

                    }
                })
            this.sum()
        }else{
            wx.showToast({
                title: '库存不足！'
              });
        }
      }else{
         wx.showToast({
              title: '请输入整数'
            });
      }
      
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
    var numm=''
    var acid=app.globalData.uniacid;
    var openid=app.globalData.openid;
    var carts=this.data.carts;
    var fromcart=1;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
         numm+=carts[i].id+','
      }
    }if(numm!=''){
      wx.showToast({
				title: '',
        icon: 'loading'
			});
        wx.navigateTo({
            url: '../checkout/index?openid='+openid+'&acid='+acid+'&cartid='+numm+'&fromcart='+fromcart
        })
    }else{
      wx.showModal({
          title: '提示',
          content: '请勾选中你心仪的商品！'
      })
    }
    
    },
    
  onLoad: function() {

  },
  onShow:function(){
    var that=this;
    var acid=app.globalData.uniacid;
    var openid=app.globalData.openid;
     wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=query',
            method: 'GET',
            data: {acid:acid,openid:openid},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              var carts=res.data.list;
              if(carts.lenght!=0){
                  for(var i in carts){
                      carts[i].selected=true;
                  }
              }
              that.setData({
                    carts: carts
              }) 
              that.sum();
            }
        })
  },




})
