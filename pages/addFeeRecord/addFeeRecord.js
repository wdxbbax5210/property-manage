// pages/addFeeRecord/addFeeRecord.js

import util from "../../utils/util.js";
Page({
  // 新增或编辑某个收费项目下的收费记录  
  // 用户  下拉选择？
  // 单元编号 下拉选择？
  // 
  
  /**
   * 页面的初始数据
   */
  data: {
    amount: "",  //缴费金额
    date: "",
    $toast: {
      show: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("新增记录")
  },
  onAmountChange(e){
    this.setData({
      amount: e.detail.value
    })
  },
  /**
   * 日期改变
   */
  onDateChange(e) {
    console.log('日期选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 新增/编辑保存
   */
  onConfirm(){
    let t = this;
    if (!this.data.amount || !this.data.date){
      this.showToast()
    }
  },
  /**
   * 提示
   */
  showToast() {
    this.setData({
      $toast: {
        show: true
      }
    })
    setTimeout(() => {
      this.setData({
        $toast: {
          show: false
        }
      })
    }, 1000)
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