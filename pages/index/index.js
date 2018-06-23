// pages/index/index.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        key: 1
      }, {
        link: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        key: 2
      }, {
        link: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        key: 3
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  goQuery: function (){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  goToFeeList: function () {
    wx.navigateTo({
      url: '../feeList/feeList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("工作台");
    let t = this;
    wx.getSetting({
      success: function (res) {
        //已经授权 
        if (!res.authSetting['scope.userInfo']) {
          //从cookie中获取用户信息 给后台
          console.log(wx.getStorageSync("userInfo").data)
          let userInfo = wx.getStorageSync("userInfo").data;
          getApp().globalData.header.Cookie = 'JSESSIONID=' + userInfo.sessionId;
          getApp().globalData.requestId = userInfo.openId;
        } else {
          //没有授权 引导用户授权
          t.showDialog()
        }
      }
    })
  },
  showDialog(){
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onCancel() {
    console.log('点击了取消按钮')
    this.hideDialog()
  },
  //确认授权
  onConfirm() {
    // this.login();
    // wx.switchTab({
    //   url: '../my/my',
    // })
    wx.navigateTo({
      url: '../register/register',
    })
    this.hideDialog();
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