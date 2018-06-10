// pages/approveList/approvelist.js
import util from "../../utils/util.js"; 
import dataMap from "../../utils/dataMap.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0, //默认显示待审核列表
    list: [{ id: 1, userType: "NORMAL" }, { id: 2, userType: "NORMAL"}],
    userType:"" , //用户类型
    userInfo: wx.getStorageSync("userInfo")
  },
  onChangeTab(event){
    let tab = event.target.dataset.active;
    this.setData({
      activeTab: tab,
      // list: tab == "1" ? [1,2,3] : tab == "7" ? [1] : [1,2,3,4,5]
    })
    this.queryUserList(dataMap.userIdentity[tab].type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("用户审核");
    this.getUser();
    console.log(this.data.userInfo)
  },
  getUser: function(){
    let userType = this.data.userInfo.data.userType;
    let type;
    if (userType){
      this.setData({
        userType: dataMap.userIdentity[userType]
      })
      type = dataMap.userIdentity[userType].type;
      this.queryUserList(type);
    }
  },
  queryUserList: function (userType){
    let params = {
      userType: userType, //用户类型
      nickName: this.data.userInfo.data.nickName || '',  //昵称
      unitNumber: "", //单元编号
      phoneNumber: "" //手机号码
    }
    console.log(params)
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/user/list',
      data: params,
      success: (data) => {
        console.log(data,"用户列表")
      }
    })
  },
  userVerify: function(event){
    console.log(event.target.dataset.item)
    let it = event.target.dataset.item;
    let params = {
      userId: it.id,
      userType: it.userType
    }
    console.log(params)
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/user/verify',
      data: params,
      success: (data) => {
        console.log(data, "用户列表")
      }
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