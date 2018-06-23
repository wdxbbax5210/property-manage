// pages/approveList/approvelist.js
import util from "../../utils/util.js"; 
import dataMap from "../../utils/dataMap.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{ id: 1, userName: "测试名字1", userType: "0" }, { id: 2, userName: "测试名字2",userType: "1"}],
    userType: 0, //用户类型  0未审核 1普通用户 7普通员工  8管理员 9超级管理员 默认显示待审核列表
    userInfo: wx.getStorageSync("userInfo")
  },
  onChangeTab(event){
    let tab = event.target.dataset.active;
    this.setData({
      userType: tab,
    },()=>{
      this.queryUserList();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("用户审核");
    // this.getUser();
    console.log(this.data.userInfo.userType,"我的身份")
    this.queryUserList(); 
  },
  queryUserList: function (){
    let params = {
      userType: this.data.userType, //查询的用户类型列表
      nickName:  null,  //昵称
      unitNumber: null, //单元编号
      phoneNumber: null //手机号码
    }
    console.log(params)
    util.NetRequest({
      url: '/user/list',
      params: params,
      success: (data) => {
        console.log(data, "用户列表")
      }
    })
  },
  /**
   * 设置用户身份
   */
  userVerify: function(event){
    console.log(event.target.dataset.item,"要给用户设置的身份")
    let it = event.target.dataset.item;
    let params = {
      userId: it.id,
      userType: it.userType
    }
    console.log(params)
    util.NetRequest({
      url: '/user/verify',
      params: params,
      success: (data) =>{
        console.log(data, "用户verify")
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