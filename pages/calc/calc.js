// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back: "back",
    clear: "clear",
    reverse: "reverse",
    hist: "history",
    add: "add",
    num9: "9",
    num8: "8",
    num7: "7",
    sub: "-",
    num6: "6",
    num5: "5",
    num4: "4",
    multi: "x",
    num3: "3",
    num2: "2",
    num1: "1",
    div: "/",
    num0: "0",
    point: ".",
    equal: "=",
    screenData: "0",
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
    lastIsOperaSymbo: false,
    iconColor: "white"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  clickBtn: function(event){
    var id = event.target.id;
    console.log(id);
    if(id == this.data.reverse){
      var currentData = this.data.screenData;
        if(currentData == "0"){
          return;
        } else {
          currentData = currentData.substring(0, data.length-1);
        }
    } else if(id == this.data.equal){

    } else if(id == this.data.clear){

    }
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
