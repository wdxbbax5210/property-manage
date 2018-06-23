// pages/home/home.js
import util from "../../utils/util.js";
// 仅限查询数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync("userInfo") || {},
    tabs: [
      { title: '物业费', content: [{"title": "",}]
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
    util.setTitle("查询费用");
    this.getFeeList();
  },
  /**
   * 获取收费项目列表 赋值给tabs
   */
  getFeeList(){
    let params = {
      itemName: "" //非必填 
    }
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (data) => {
        if(data.list){

        }
        this.setData({
          tabs: data.list || []
        })
        console.log(data, "收费项目列表")
      }
    })
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