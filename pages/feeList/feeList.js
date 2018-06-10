// pages/feeList/feeList.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feeList:[1,2],
    itemName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFeeList();
    util.setTitle("收费项目")
  },
  Add: function(){
    let t = this;
    let dialogComponent = t.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  OnNameChange: function(event){
    console.log(event.detail.value)
    this.setData({
      itemName: event.detail.value
    })
  },
  getFeeList: function(){
    let params = {
      itemName:"" //非必填 
    }
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/fee/item/list',
      data: params,
      success: (data) => {
        console.log(data, "收费项目列表")
      }
    })
  },
  feeItemAdd: function(){
    let params = {
      itemName: "" //必填 
    }
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/fee/item/add',
      data: params,
      success: (data) => {
        console.log(data, "新增收费项目")
        this.getFeeList()
      }
    })
  },
  onCancel: function(){
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  feeItemUpdate: function(){
    let params = {
      itemName: "", //必填 
      itemId:"", //项目Id 必填
    }
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/fee/item/upd',
      data: params,
      success: (data) => {
        console.log(data, "更新收费项目")
        this.getFeeList()
      }
    })
  },
  feeItemDel: function(){
    let params = {
      itemId: "", //项目Id 必填
    }
    wx.request({
      url: 'http://www.miss-xia-property-manage.club:8080/fee/item/del',
      data: params,
      success: (data) => {
        console.log(data, "删除收费项目")
        this.getFeeList()
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