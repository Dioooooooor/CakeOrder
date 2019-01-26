// pages/home/home.js
const app = getApp()
const globalData = require('../../utils/globalData.js')
const http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend:{},   //推荐列表
    commodities:{},         //商品列表
    navs: [             //导航
      { icon: "../../images/navs/new.png", name: "新品", typeId: 0 },
      { icon: "../../images/navs/hot.png", name: "热门", typeId: 1 },
      { icon: "../../images/navs/off.png", name: "折扣", typeId: 2 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this)
    this.laodRecommendInfo()
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

  },

  /**
   * 获取推荐信息
   */
  laodRecommendInfo: function(){
    var data = {}
    data.url = globalData.GlobalData.ServerURL + '/commodities'
    data.param = {}
    data.mode = 'GET'
    var success = function(ins, res) {
      console.log(res)
      ins.setData({
        recommend: res.items,
      })
    }
    var fail = function(ins) {
      console.log("failed")
    }
    http.sendRequest(globalData.GlobalData.HttpGateURL, data, "POST", this, success, this, fail)

    // wx.request({
    //   url: 'http://api.caochen.com:5000/v1/commodities',
    //   data: {},
    //   method: "GET",
    //   header:{
    //     'content-type': 'application/json'
    //   },
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       recommend: res.data.items,
    //     })
    //   },
    //   fail: function(){
    //     console.log("failed")
    //   }
    // })
  },

  /**
   * 获取所有商品信息
   */
  loadCommodityInfo: function(){
    wx.request({
      url: 'http://api.caochen.com:5000/v1/commodities',
      data: {},
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        this.setData({
          commodities: res.data.items,
        })
      },
      fail: function () {
        console.log("failed")
      }
    })
  },

  catchTapCategory: function(e){
    var data = e.currentTarget.dataset
    app.globalData.currentCateType = { typeName: data.type, typeId: data.typeid }
    var jumpUrl = ""
    switch(data.typeid){
      case 0: jumpUrl = "../newproduct/newproduct" 
        break;
      case 1: jumpUrl = "../hotproduct/hotproduct"
        break;
      case 2: jumpUrl = "../offproduct/offproduct"
        break;
    }
    wx.navigateTo({
      url: jumpUrl,
    })
  }
})