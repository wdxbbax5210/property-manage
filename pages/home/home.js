// pages/home/home.js
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
        key:1
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
    userInfo: {},
    tabs: [
      { 
        title: '物业费', 
        content: [
          {
            "title": "",
          }
        ]
       },
      { title: '电费', content: '内容二' },
      { title: '水费', content: '内容三' },
      { title: '燃气费', content: '内容四' },
      { title: '选项五', content: '内容五' },
      { title: '选项六', content: '内容六' }
    ],
    selected: 0,
    array: ['全部', '已缴费', '未缴费'],
    date: '',
    list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  lower: function (e) {
    console.log(e)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selected: e.detail.value
    })
  },
  onClick: function (e) {
    this.setData({
      date: "",
      selected: 0
    })
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("首页");
    let t = this;
    wx.getSetting({
      success: function (res) {
        console.log(res)
        //已经授权 跳转到首页
        if (res.authSetting['scope.userInfo']) {
          //从cookie中获取用户信息 给后台
        } else {
          //没有授权 引导用户授权
          let dialogComponent = t.selectComponent('.wxc-dialog')
          dialogComponent && dialogComponent.show();
        }
      }
    })
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  
  //确认授权
  onConfirm() {
    // this.login();
    wx.switchTab({
      url: '../my/my',
    })
    this.hideDialog();
  },
  onCancel() {
    console.log('点击了取消按钮')
    this.hideDialog()
  },
  onSearch() {
    wx.navigateTo({
      url: '../feeSearchResult/feeSearchResult',
    })
  },
  // showToast() {
  //   let $toast = this.selectComponent(".J_toast")
  //   $toast && $toast.show()
  // },
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