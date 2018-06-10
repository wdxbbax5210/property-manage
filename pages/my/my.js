// pages/my/my.js
import util from "../../utils/util.js";
let header = getApp().globalData.header;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false, //是否登录
    userInfo: wx.getStorageSync("userInfo")
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("我的");
    console.log(this.data.userInfo.data)
  },
  
  getMyApprove: function(){
    wx.navigateTo({
      url: 'infoApprove/infoApprove',
    })
  },
  /**
   * 获取审批列表 跳转审批页面
   */
  getApproveList: function() {
    wx.navigateTo({
      url: '../approveList/approvelist',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log("获取审批列表")
  },
  goToFeeEntry: function(){
    wx.navigateTo({
      url: '../feeEntry/feeEntry',
    })
  },
  goToFeeList: function(){
    wx.navigateTo({
      url: '../feeList/feeList',
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