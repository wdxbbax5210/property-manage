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
    ifShow: true, //是否显示点击授权按钮
  },
  login: function (userInfo) {
    if (this.data.logged) return
    let t = this;
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://229492634.miss-xia-property-manage.club/user/login',
            // header: header,
            method: "POST",
            data: {
              code: res.code,
              userInfo: userInfo
            },
            success: (data) => {
              console.log(data)
              let dialogComponent = t.selectComponent('.wxc-dialog')
              dialogComponent && dialogComponent.show();
              t.setData({
                ifShow: false
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  onConfirm(){
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("我的");
    let t = this;
    //判断是否已授权 授权过就设置ifShow为false
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          t.setData({
            ifShow: false
          })
        }
      }
    })
  },
  onGetUserInfo: function (e) {
    let t = this;
    t.login(e.detail.userInfo)
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