var util = require("../../resource/js/util.js");
// pages/MenDian/MenDian.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ZuiXinMd: {},
    fujinMd: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
/*
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })

*/




    //let aa;
    // aa = util.distance(36.06592, 103.78576, 40.28161, 97.048963);
    // console.log(aa);
  },
  xuanMD: function(e) {
    let that = this;
    let zj = wx.getStorageSync("ZJMenDian");
    let md = e.currentTarget.dataset.item;
    
    var cunindex = -1;
    for (var index in zj) {
      if (zj[index].SCCode == md.SCCode && zj[index].mdcode == md.mdcode) {
        cunindex=index;
        break;
      }
    }
    if (cunindex>-1)
{
  //     console.log("888")
  // console.log(zj)
      zj.splice(cunindex, 1);
}else
{
      // console.log("***")
      // console.log(zj)
  zj.splice(e.currentTarget.dataset.index, 1);
}

    //console.log(that.data)
    cunindex=-1;
    for (var index in that.data.fujinMd) {
      if (that.data.fujinMd[index].SCCode == md.SCCode && that.data.fujinMd[index].mdcode == md.mdcode) {
        cunindex = index;
        break;
      }
    }
    if (cunindex > -1) {
      zj.splice(0, 0, e.currentTarget.dataset.item);
      zj.splice(5, 1);
      wx.setStorageSync('ZJMenDian', zj);
      that.setData({
        ZuiXinMd: zj
      });
      wx.navigateBack({
        delta: 1
      })

    }
    else
    {
      wx.setStorageSync('ZJMenDian', zj);
      that.setData({
        ZuiXinMd: zj
      });
    }

    
    //wx.getStorageSync(KEY)
    console.log(zj) ;

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    var that = this;
    let zj = wx.getStorageSync("ZJMenDian");
    wx.request({
      url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx', //请求地址
      data: { //发送给后台的数据
        s: new Date().toLocaleString(),
        SoRunType: "GetMDInfo",
      },
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: "GET", //get为默认方法/POST
      success: function(res) {
        //console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        //如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
        //that.setData({
        //  logs: res.data.result
        //})
        //对json进行降序排序函数

        for (var o in res.data) {
          //o["ce"]="s";
          let juli = util.distance(app.globalData.Location.latitude, app.globalData.Location.longitude, res.data[o].GPSLat, res.data[o].GPSLong);
          res.data[o]["juli"] = util.distance(app.globalData.Location.latitude, app.globalData.Location.longitude, res.data[o].GPSLat, res.data[o].GPSLong);
          if (juli < 1) {
            res.data[o]["juli"] = juli * 1000;
            res.data[o]["dw"] = "m"
          } else {
            res.data[o]["juli"] = juli;
            res.data[o]["dw"] = "km"
          }
          //console.log(res.data[o].cd + "--" + o);
        }
        //console.log(app.globalData.Location);
        //console.log(res.data);
        let colId = "juli"
        var asc = function(x, y) {
          return (x[colId] > y[colId]) ? 1 : -1
        }
        let aa = res.data;
        aa.sort(asc);

        that.setData({
          ZuiXinMd: zj,
          fujinMd: aa
        });
        wx.hideLoading()
        //console.log(that.data.fujinMd);

      },
      fail: function(err) {}, //请求失败
      complete: function() {} //请求完成后执行的函数
    });


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})