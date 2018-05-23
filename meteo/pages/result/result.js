// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    attention: "",
    temp: "",
    todayDate: "",
    highest: "",
    lowest: "",
    windPower: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allForecast = (wx.getStorageSync('forecast') || []);
    console.log(allForecast.city);
    var windp = allForecast.forecast[0].fengli;
    var windpN = "";
    for(var i in windp){
      if(!isNaN(windp[i])){
        console.log(windp[i]);
        windpN += windp[i];
      }
    }
    console.log("wind power: " + windpN);
    this.setData({
      city : allForecast.city + "\n",
      attention : allForecast.ganmao + "\n",
      temp : allForecast.wendu + " degree",
      todayDate: allForecast.forecast[0].date + "\n",
      highest: allForecast.forecast[0].high + "\n",
      lowest: allForecast.forecast[0].low + "\n",
      windPower: windpN + " degree" + "\n"
    });
  },

  back: function(){
    wx.navigateBack(
      {delta:2}
    )
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