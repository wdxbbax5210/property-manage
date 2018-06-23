// pages/home/home.js
import util from "../../utils/util.js";
// 仅限查询数据 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tabs: [],
    selected: 0,
    index: 0,
    array: ['全部', '已缴费', '未缴费'],
    date: '',
    list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    operateRight: null,
    status: ["标记为已缴费","标记为已开票","删除该记录"],
    selectedStatus: 0
  },
  /**
   * 切换月份
   */
  bindDateChange: function (e) {
    console.log('月份选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    }, () => {
      this.onQueryDetailList();
    })
  },
  lower: function (e) {
    console.log(e)
  },
  /**
   * 选择缴费状态
   */
  bindPickerChange: function (e) {
    console.log('缴费状态选择改变，携带值为', e.detail.value)
    this.setData({
      selected: e.detail.value
    }, () => {
      this.onQueryDetailList();
    })
  },
  /**
   * 切换收费项目
   */
  onClick: function (e) {
    this.setData({
      date: "",
      index: e.detail.key
    },()=>{
      this.onQueryDetailList();
    })
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.setTitle("查询费用");
    console.log(options.operateRight)
    if (options.operateRight){
      this.setData({
        operateRight: options.operateRight
      })
      util.setTitle("管理");
    }
    let _userInfo = wx.getStorageSync("userInfo").data
    if (_userInfo){
      this.setData({
        userInfo: _userInfo
      })
    }
  },
  /**
   * 操作 标记为已开票 标记为 已缴费
   */
  bindhandleChange(e){
    console.log('缴费状态或者开票状态改变，携带值为', e.detail.value)
    this.setData({
      selectedStatus: e.detail.value
    },()=>{
      //刷新列表状态
      console.log(e.target.dataset)
      let id = e.target.dataset.id;
      let amount = e.target.dataset.amount;
      if (e.detail.value == 0 || e.detail.value == 1){
        wx.navigateTo({
          url: '../record/record?recordId=' + id + '&amount=' + amount + '&type=' + e.detail.value,
        })
      } else if (e.detail.value == 2){ //删除该条记录
        this.delFeeItem(id);
      }
    })
  },
  /**
   * 删除该条收费记录
   */
  delFeeItem(recordId){
    util.NetRequest({
      url: '/fee/record/del',
      params: {
        recordId: recordId
      },
      success: (data) => {
        this.onQueryDetailList()
      }
    })
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
        console.log(data)
        this.setData({
          tabs:[
            { itemName: '电费', content: '内容二', itemId: 2 },
            { itemName: '水费', content: '内容三', itemId: 3 },
          ],
        },()=>{
          this.onQueryDetailList()
        })
        console.log(data, "收费项目列表")
      }
    })
  },
  /**
   * 查询对应收费项目的详情列表 赋值给list
   */
  onQueryDetailList(){
    console.log(this.data.userInfo,"userInfo")
    let t = this, { tabs, selected, userInfo, date, index, array} = t.data;
    let url = "/fee/record/owner/list";
    if(this.data.operateRight == 1){
      url = "/fee/record/list";
    }
    util.NetRequest({
      url:url,
      params:{
        itemName: tabs[index].itemName,
        nickName: userInfo.nickName,
        unitNumber: userInfo.unitNumber || "",
        phoneNumber: userInfo.phoneNumber,
        theMonth: date,
        payStatus: selected == 0 ? "" : selected == 1 ? "1" : "0",
        payTimeFrom: "", //缴费时间
        payTimeTo: "", 
        ticketTimeFrom: "", //开票时间
        ticketTimeTo: ""
      },
      success: (data) => {
        console.log(data,"对应收费项目下的列表")
        this.setData({
          list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        })
      }
    })
  },
  /**
   * 新增收费记录
   */
  onAddRecord(){
    let id = e.target.dataset.id;
    // wx.navigateTo({
    //   url: '../record/record?recordId=' + id + '&addType=' + this.data.tabs[this.data.index],
    // })
    /**
  * 添加记录
  */
    // addRecord(){
    //   util.NetRequest({
    //     url: '/fee/record/add',
    //     params: {
    //       userId: "",
    //       itemId: "", //收费项目id
    //       theMonth: this.data.date, //所属月份
    //       planPayFee: this.data.amount //应收金额
    //     },
    //     success: (data) => {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     }
    //   })
    // },
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
    this.getFeeList();
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