// pages/addFeeRecord/addFeeRecord.js

import util from "../../utils/util.js";
Page({
  // 新增或编辑某个收费项目下的收费记录  
  /**
   * 页面的初始数据
   */
  data: {
    amount: "",     //应收金额
    date: "",       //所属月份
    unitNumber: "", //单元编号
    itemId: null,   //收费项目Id
    userId: null,   //用户id
    userName: "", //选中的用户昵称
    $toast: {
      show: false
    },
    userInfo: wx.getStorageSync("userInfo"),
    userList: [], //可选的用户列表
    message:"", //保存失败后的提示语
    backNumber: 1, //向上返回的层级数
    recordId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item && JSON.parse(options.item) && !util.isEmptyObj(JSON.parse(options.item))){
      let _item = JSON.parse(options.item);
      this.setData({
        amount: _item.planPayFee,     //应收金额
        date: _item.theMonth,       //所属月份
        unitNumber: _item.unitNumber || null, //单元编号
        itemId: _item.itemId,   //收费项目Id
        userId: _item.userId,   //用户id
        userName: _item.nickName, //选中的用户昵称
        recordId: _item.id  //记录id
      })
    }
    if(options.id){
      this.setData({
        userId: options.id,
        userName: options.name
      })
    }
    if (options.itemId){
      this.setData({
        itemId: options.itemId
      })
    }
    if (this.data.recordId) {
      util.setTitle("编辑记录")
    } else {
      util.setTitle("新增记录")
    }
  },
  onSelectUser(){
    this.setData({
      backNumber: 2
    },()=>{
      wx.navigateTo({
        url: '../selectUser/selectUser?itemId=' + this.data.itemId,
      })
    })
  },
  onUnitChange(e){
    this.setData({
      unitNumber: e.detail.value
    })
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
    if (!this.data.amount || !this.data.date || !this.data.userId || !this.data.unitNumber){
      this.showToast()
      return
    }
    let params = {
      userId: this.data.userId, 
      planPayFee: this.data.amount || null,  
      itemId: this.data.itemId || null, 
      theMonth: this.data.date || null,
      unitNumber: this.data.unitNumber || null,
      recordId: this.data.recordId || null
    }
    
    let url = '/fee/record/add';
    if (params.recordId) {
      url ='/fee/record/upd'
    }
    util.NetRequest({
      url: url,
      params: params,
      success: (res) => {
        wx.navigateBack({
          delta: t.data.backNumber
        })
      },
      fail: (err)=>{
        console.log(err)
      }
    })
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