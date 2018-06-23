// pages/feeList/feeList.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feeList:[
      {id:"1",title:"电费测试1"},
      {id:"2",title:"电费测试2"}
    ],
    itemName:"",
    itemId:"", //编辑的id
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
  Edit: function(event){
    let t = this;
    this.setData({
      itemName: event.target.dataset.name,
      itemId: event.target.dataset.id
    },()=>{
      let dialogComponent = t.selectComponent('.wxc-dialog')
      dialogComponent && dialogComponent.show();
    })
  },
  OnNameChange: function(event){
    this.setData({
      itemName: event.detail.value
    })
  },
  getFeeList: function(){
    let params = {
      itemName:"" //非必填 
    }
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (data) => {
        console.log(data, "收费项目列表")
      }
    })
  },
  feeItemAdd: function(){
    let params = {
      itemName: this.data.itemName //必填 
    }
    console.log("新增")
    let t = this;
    util.NetRequest({
      url: "/fee/item/add",
      params: params,
      success: (data) => {
        console.log(data, "新增收费项目")
        t.getFeeList()
      }
    })
  },
  onConfirm: function(event){
    if(this.data.itemId){
      this.feeItemUpdate(event.target.dataset.id);
    }else{
      this.feeItemAdd();
    }
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onCancel: function(){
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  feeItemUpdate: function(id){
    let params = {
      itemName: this.data.itemName, //必填 
      itemId: id, //项目Id 必填
    }
    console.log("编辑" + params)
    util.NetRequest({
      url: '/fee/item/upd',
      params: params,
      success: (data) => {
        console.log(data, "更新收费项目")
        this.getFeeList()
      }
    })
  },
  feeItemDel: function (event){
    let params = {
      itemId: event.target.dataset.id, //项目Id 必填
    }
    let t = this;
    util.NetRequest({
      url: "/fee/item/del",
      params: params,
      success: (data) => {
        console.log(data, "删除收费项目")
        t.getFeeList()
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