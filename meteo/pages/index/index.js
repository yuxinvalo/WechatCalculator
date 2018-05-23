//index.js
//获取应用实例
const app = getApp()
const url = require('../../utils/url.js');

Page({
  data: {
    motto: 'Please tape a city:',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading: false,
    disabled: true,
    modalErrorText: "",
    hiddenmodalput: true,
    inputValue: ""
  },
  inputCity: function(event){
    let city = event.detail.value;
    if(city.length != 0){
      this.setData({
        disabled : false,
        inputValue : city
      });
    }
  },

searchInfo: function(event){
  this.setData({
    loading : true
  });
  let that = this; //it seems revelant to assign this to that, because "this" in wx.request means itself but not index app instance.

  wx.request({
    url: url.WEATHER_URL,
    header:{
      "Content-Type": "application/json",
    },
    data: {
      "city" : this.data.inputValue
    },
    success: function(res){
      console.log(res.data);
      if(res.data.status == 1000){
        wx.setStorageSync('forecast', res.data.data);
        wx.navigateTo({
          url: '../result/result',
        })
      } else {
        that.setData({
          modalErrorText: "Input Error! " + res.data.desc,
          hiddenmodalput: false
        });
      }
    },
    fail: function(res){
      console.log("failed: " + res);
      that.setData({ 
        modalHidden: false,
        modalErrorText: "wx.request.fail-Please check your network！"
      })
    }
  })
  this.setData({
    loading: false
  });
},
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  cancel: function(){
    this.setData({
      hiddenmodalput: true,
      inputValue: ""
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
