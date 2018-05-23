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
    add: "+",
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
    iconColor: "white",
    arr: [],
    logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  clickBtn: function(event){
    var id = event.target.id;
    console.log(id);
    if(id == this.data.back){ //回退
      var currentData = this.data.screenData;
        if(currentData == "0"){
          return;
        }
        currentData = currentData.substring(0, currentData.length-1);
        if(currentData == "" || currentData == "-"){
          currentData = 0;
        }
        this.setData({"screenData": currentData});
        this.data.arr.pop();

    } else if(id == this.data.equal){//等于
      var currentData = this.data.screenData;
      if (currentData == "0") {
        return;
      }
      var lastLetter = currentData.charAt(currentData.length);
      if(isNaN(lastLetter)){//isNaN判断是否是数字， 但是如果为空值或者空格 会返回true
        return;
      }
      var num = "";
      var operator = "";
      var arr = this.data.arr;
      var operatorArr = [];
      for(var i in arr){//把字符串 parse成计算数组
        if(!isNaN(arr[i]) || arr[i] == this.data.point || arr[i] == this.data.reverse){
          num += arr[i]
        } else{
          operator = arr[i];
          operatorArr.push(num);
          operatorArr.push(operator);
          // for(var j in operatorArr){ //检测表达式
          //   if(j%2 == 1 && operatorArr[j] != "+" && operatorArr[j] != "-" && operatorArr[i] != "*" && operatorArr != "/" ){ // 表达式错误
          //   wx.showToast({
          //     title: 'your expression is incorrect.',
          //   })
          //   }
          // }
          num = "";
        }
      }
      operatorArr.push(Number(num));
      console.log(operatorArr);
      var res = Number(operatorArr[0]) * 1.0;
      
      for(var i = 1; i < operatorArr.length; ++i){
        if(isNaN(operatorArr[i])){//计算  计算并不按照数学常识= = 先乘除后加减 而是按顺序
          if (operatorArr[i] == this.data.add) {
            console.log(operatorArr[i]);
            res += Number(operatorArr[i + 1]);
          } else if (operatorArr[i] == this.data.sub) {
            res -= Number(operatorArr[i + 1]);
          } else if (operatorArr[i] == this.data.multi) {
            res *= Number(operatorArr[i + 1]);
          } else if (operatorArr[i] == this.data.div) {
            res /= Number(operatorArr[i + 1]);
          }
          console.log(res);
        }
      }
      console.log("res = " + res)
      this.data.logs.push(data + res);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(res);

      this.setData({ "screenData": res + "" });

    } else if(id == this.data.clear){//清0
      this.setData({"screenData": 0});
      this.data.arr.length=0;

    } else if(id == this.data.reverse){//倒转正负号
      var currentData = this.data.screenData;

      if(currentData == "0"){
        return;
      }
      var firstLetter = currentData.charAt(0);
      if (firstLetter == "-"){
        currentData = currentData.substr(1);
        this.data.arr.shift();
      } else {
        currentData = "-" + currentData;
        this.data.arr.unshift();
      }
    } else{
      if (id in this.data.operaSymbo){
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }

      var sd = this.data.screenData;
      var data;
      if(sd == 0){
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data });
      this.data.arr.push(id);
      if (this.data.operaSymbo[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function(){
    wx.navigateTo({
      url: '../history/history'
    })
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
