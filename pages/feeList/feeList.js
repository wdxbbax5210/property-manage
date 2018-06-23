// pages/feeList/feeList.js
import util from "../../utils/util.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feeList:[
      // {id:"1",itemName:"电费测试1"},
      // {id:"2",itemName:"电费测试2"}
    ],
    itemName: null,
    itemId: null, //编辑的id
    page: 1,
    pageSize: 99,
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
  OnNameChange(event){
    this.setData({
      itemName: event.detail.value
    })
  },
  getFeeList(){
    let params = {
      itemName: this.data.itemName, //非必填 
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    let t = this;
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (res) => {
        t.setData({
          feeList: res.list
        })
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
        t.setData({
          itemName: null,
          itemId: null
        },()=>{
          t.getFeeList()
        })
      }
    })
  },
  onConfirm: function(){
    if(this.data.itemId){
      this.feeItemUpdate();
    }else{
      this.feeItemAdd();
    }
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onCancel: function(){
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
    this.setData({
      itemName: null,
      itemId: null
    })
  },
  feeItemUpdate: function(){
    let t = this;
    let params = {
      itemName: this.data.itemName, //必填 
      itemId: this.data.itemId, //项目Id 必填
    }
    console.log("编辑")
    util.NetRequest({
      url: '/fee/item/upd',
      params: params,
      success: (data) => {
        console.log(data, "更新收费项目")
        t.setData({
          itemName: null,
          itemId: null
        },()=>{
          t.getFeeList()
        })
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