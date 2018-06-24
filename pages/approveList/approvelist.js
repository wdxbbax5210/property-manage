// pages/approveList/approvelist.js
import util from "../../utils/util.js"; 
import dataMap from "../../utils/dataMap.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userType: 0, //用户类型  0未审核 1普通用户 7普通员工  8管理员 9超级管理员 默认显示待审核列表
    userInfo: wx.getStorageSync("userInfo"),
    page: 1,
    pageSize: 10,
    count: 0,
    myUserType:null,
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
    this.setData({
      myUserType: parseInt(this.data.userInfo.userType)
    })
  },
  queryUserList: function (){
    let params = {
      userType: this.data.userType, //查询的用户类型列表
      nickName:  null,  //昵称
      unitNumber: null, //单元编号
      phoneNumber: null, //手机号码
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/user/list',
      params: params,
      success: (res) => {
        console.log(res.data, "用户列表")
        let _list = res.data.list || [];
        if (params.page > 1){
          _list = t.data.list.concat(res.data.list)
        }
        this.setData({
          list: _list,
          count: res.data.count
        })
      }
    })
  },
  lower(){
    if (this.data.page * this.data.pageSize < this.data.count){
      console.log("到底了！请求下一页")
      this.setData({
        page: this.data.page + 1
      }, () => {
        this.queryUserList();
      })
    }else{
      console.log("没有数据了")
    }
  },
  /**
   * 设置用户身份
   */
  userVerify: function(event){
    console.log(event.target.dataset.item,"要给用户设置的身份")
    let it = event.target.dataset.item;
    let params = {
      userId: it.id,
      userType: event.target.dataset.type
    }
    util.NetRequest({
      url: '/user/verify',
      params: params,
      success: (data) =>{
        console.log(data.data, "用户verify")
        this.queryUserList();
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