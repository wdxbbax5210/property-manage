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
    list: [],
    operateRight: null,
    status: ["已缴费","已开票","删除","编辑"],
    selectedStatus: 0,
    page: 1,
    pageSize: 10,
    count: 0, 
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
      itemName: null, //非必填
      page: 1,
      pageSize: 99 
    }
    util.NetRequest({
      url: '/fee/item/list',
      params: params,
      success: (res) => {
        this.setData({
          tabs: res.list,
        },()=>{
          this.onQueryDetailList()
        })
        console.log(res, "收费项目列表")
      }
    })
  },
  /**
   * 查询对应收费项目的详情列表 赋值给list
   */
  onQueryDetailList(){
    let t = this, { tabs, selected, userInfo, date, index, array} = t.data;
    let url = "/fee/record/owner/list";
    if(this.data.operateRight == 1){
      url = "/fee/record/list";
    }
    util.NetRequest({
      url:url,
      params:{
        itemName: tabs[index].itemName || null,
        nickName: userInfo.nickName || null,
        unitNumber: userInfo.unitNumber || null,
        phoneNumber: userInfo.phoneNumber || null,
        theMonth: date || null,
        payStatus: selected == 0 ? null : selected == 1 ? "1" : "0",
        payTimeFrom: null, //缴费时间
        payTimeTo: null, 
        ticketTimeFrom: null, //开票时间
        ticketTimeTo: null,
        page: this.data.page,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        console.log(res,"对应收费项目下的列表")
        this.setData({
          list: res.list || [],
          count: res.count
        })
      }
    })
  },
  /**
   * 新增收费记录
   */
  onAddRecord(e){
    let id = e.target.dataset.id;
    wx.navigateTo({
      url: '../addFeeRecord/addFeeRecord?recordId=' + id,
    })
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