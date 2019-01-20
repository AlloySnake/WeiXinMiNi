// pages/MyInfo/MyInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scinfo: app.globalData.SCInfo,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    NewOrderList:[],
    OldOrderList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scinfo: app.globalData.SCInfo,
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        }); 
        //console.log(res);
      }

    });

    




  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  }, 
  GetChuChang: function (e) {
    //console.log(e)
    app.globalData.scanddid.index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../ChuChang/ChuChang?ddcode=' + e.currentTarget.dataset.item.DD_Code
    })
  },
   /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
    var that = this;
    wx.request({
      url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
      data: {//发送给后台的数据
        s: new Date().toLocaleString,
        SoRunType: "GetNewOrderList",
        openid: wx.getStorageSync("openid"),
        sccode: app.globalData.SCInfo.SCCode,
        mdcode: app.globalData.SCInfo.mdcode,

        //tm: "6921665707940"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        let NewOrderList;
        if (res.data.state == "ok") {
          NewOrderList = res.data.OrderList;
          console.log(res.data.OrderList)
          //console.log(res.data.OrderList[0].goods)

          that.setData({
            NewOrderList
          });




        }
        else {

        }

      }
    });
    /*
    var that = this;

    let xxx = parseInt(app.globalData.scanddid.index);
    if (xxx != -1 && app.globalData.scanddid.ddid!='')
    {

    
    let NewOrderList = that.data.NewOrderList;
    NewOrderList.splice(xxx, 1);
    that.setData({
      NewOrderList 

    });
      app.globalData.scanddid.index=-1
      app.globalData.scanddid.ddid = ''
    }
    */
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