// pages/approveList/approvelist.js
import util from "../../utils/util.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 1, //默认显示待审核列表
    list: [1,2,3,4,5]
  },
  onChangeTab(event){
    let tab = event.target.dataset.active;
    this.setData({
      activeTab: tab,
      list: tab == "2" ? [1,2,3] : tab == "3" ? [1] : [1,2,3,4,5]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("用户审核");
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