// pages/ScanGo/ScanGo.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mdinfo: {},
    scinfo: app.globalData.SCInfo,
    phInfo: app.globalData.phSystemInfo,
    heji:{"num":0,"sum":0},
    gdList:[],
    goodsList: [
    ]

  },
  hejifun: function (obj) {
    
    let num = 0
    let sum = 0

    for (let i = 0; i < obj.length; i++) {
      num++;
      sum = parseFloat(sum) + (parseFloat(obj[i].number) * parseFloat(obj[i].price));
    }
    //console.log("--" + sum)
    return { "num": num, "sum": sum };
    //this.data.heji= {num:num,sum:sum}
     /*
    data.heji.num = num;
    */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this;
    let gdList=[];
    //console.log(app.globalData.SCInfo)
    wx.request({
      url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
      data: {//发送给后台的数据
        s: new Date().toLocaleString,
        SoRunType: "GetGuDingPinInfo",
        sc: app.globalData.SCInfo.SCCode,
        md: app.globalData.SCInfo.mdcode,
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        //console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          let obj = {
            "spid": res.data[i].DP_Code,
            "sptm": res.data[i].DP_TMCode,
            "title": res.data[i].DP_Name,
            "price": res.data[i].DP_Price,
            "number": 1,
            "tmxs": 1,
            "danwei": res.data[i].DP_DanWei,
            "hyprice": res.data[i].DP_Price,
            "cxstate": 0,
            "cxprice": res.data[i].DP_Price,
            "lnum1": 0,
            "ljia1": 0,
            "lnum2": 0,
            "ljia2": 0,
            "lnum3": 0,
            "ljia3": 0,
            "xiaoshou30": 99999,
            "isSend": "蜂鸟配送",
            "activity": "新用户下单立减14",
            "url": "../MenDianList/MenDianList?id=1",
            "imgUrl": "",
            "selected": true
          }
          gdList.splice(0, 0, obj);
        }

        that.setData({
          gdList
        });

      }


    })


    //console.log(app.globalData.SCInfo)
    //console.log(app.globalData.userinfo)
    if (app.globalData.saoobj!=null)
    {

    }
    /*
    wx.request({
      url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
      data: {//发送给后台的数据
        s: new Date().toLocaleString,
        SoRunType: "GetShangPinInfo",
        sc: that.data.scinfo.SCCode,
        md: that.data.scinfo.mdcode,
        path: that.data.scinfo.Kuming,
        tm: res.result
        //tm: "6921665707940"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (data) {
        if (data.data.state == "ok") {
          let obj = {
            "spid": data.data.DPInfo.DP_Code,
            "sptm": data.data.DPInfo.DP_TMCode,
            "title": data.data.DPInfo.DP_Name,
            "price": data.data.DPInfo.DP_Price,
            "number": data.data.DPInfo.Num,
            "tmxs": data.data.DPInfo.DP_TMXiShu,
            "danwei": data.data.DPInfo.DP_DanWei,
            "hyprice": data.data.DPInfo.DP_HYPrice,
            "cxstate": data.data.DPInfo.DP_CXState,
            "cxprice": data.data.DPInfo.DP_CXPrice,
            "lnum1": data.data.DPInfo.ShuLiang1,
            "ljia1": data.data.DPInfo.ShouJia1,
            "lnum2": data.data.DPInfo.ShuLiang2,
            "ljia2": data.data.DPInfo.ShouJia2,
            "lnum3": data.data.DPInfo.ShuLiang3,
            "ljia3": data.data.DPInfo.ShouJia3,
            "xiaoshou30": data.data.DPInfo.xiaoshou30,
            "isSend": "蜂鸟配送",
            "activity": "新用户下单立减14",
            "url": "../MenDianList/MenDianList?id=1",
            "imgUrl": "",
            "selected": true
          }
          let goodsList = that.data.goodsList;
          let spny = false;
          for (let i = 0; i < goodsList.length; i++) {
            if (goodsList[i].spid == obj.spid) {
              goodsList[i].number = parseFloat(goodsList[i].number) + parseFloat(obj.number);
              spny = true;
            }
          }
          if (spny == false) {
            goodsList.splice(0, 0, obj);
          }

          let heji = that.hejifun(goodsList);
          that.setData({
            heji,
            goodsList,
            top: 0

          })
          //app.globalData.saoobj=null;

          console.log(data.data.DPInfo)
        }
        else {

          wx.showModal({

            content: data.data.msg,
            confirmText: "确定",
            showCancel: false,
            //cancelText: "取消",
            success: function (res) {
              //console.log(res);

            }
          });


        }
        console.log(data)
      }
    })
*/


    //console.log(that.data.scinfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 删除列表项
   */
  shanchu: function(e) {
    var xxx = parseInt(e.currentTarget.dataset.index);
    var aa = this.data.goodsList;
    aa.splice(xxx, 1);
    this.setData({
      goodsList: aa
    });
    //console.log(xxx);
  },
  add: function(e) {
    var that = this;
    //console.log(e.currentTarget.dataset.item)
    let obj = e.currentTarget.dataset.item;
    let goodsList = that.data.goodsList;
    let spny = false;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].spid == obj.spid) {
        goodsList[i].number += obj.number;
        spny = true;
      }
    }
    if (spny == false) {
      goodsList.splice(0, 0, obj);
    }


    //goodsList.splice(0, 0, obj);
    let heji = this.hejifun(goodsList);
    that.setData({
      goodsList,
      top: 0,
      heji
    })
    //console.log(goodsList);
  },
  bindMinus: function (e) {
    let that=this;
    let xxx = parseInt(e.currentTarget.dataset.index);
    let goodsList = that.data.goodsList;
    let heji;
    if (goodsList[xxx].number>1)
    {
      goodsList[xxx].number--;
      //console.log(goodsList[e.currentTarget.dataset.index].number);
      heji = this.hejifun(goodsList);
      that.setData({
        heji,
        goodsList

      });
    }
    else{

      wx.showModal({

        content: '你确定要删除此商品？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            //console.log('用户点击主操作')
            goodsList.splice(xxx, 1);
            heji = that.hejifun(goodsList);
            that.setData({
              heji,
              goodsList

            });
          } else {
            //console.log('用户点击辅助操作')
          }
        }
      });
      
    }
    
   
    //console.log(goodsList);
  }, 
  bindPlus: function (e) {
    let that = this;
    let goodsList = that.data.goodsList;
    goodsList[e.currentTarget.dataset.index].number++;
    //console.log(goodsList[e.currentTarget.dataset.index].number);
    let heji = this.hejifun(goodsList);
    that.setData({
      heji,
      goodsList

    })

  }, 
  checkboxChange: function (e) {
    var xxx = e.detail.value;
    console.log(xxx);
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    //console.log(app.globalData.SCInfo)
    this.setData({
      scinfo: app.globalData.SCInfo,
      phInfo: app.globalData.phSystemInfo,
      top: 0
    });
    //console.log(app.globalData.saoobj);
    if (app.globalData.saoobj!=null)
    {
      //var that = this;
      let a = app.globalData.saoobj;
      let goodsList = that.data.goodsList;

      let spny = false;
      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].spid == a.spid) {
          goodsList[i].number = parseFloat(goodsList[i].number) + parseFloat(a.number);
          spny = true;
        }
      }
      if (spny == false) {
        goodsList.splice(0, 0, a);
      }
      //console.log(a)
      //console.log(goodsList)
      //goodsList.splice(0, 0, a);
      let heji = this.hejifun(goodsList);
      that.setData({
        heji,
        goodsList,
        top: 0
      });
      app.globalData.saoobj=null;
    }
    
  },
  Scan: function () {
    var that = this;

    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        //console.log( res)
        if (res != null) {
          wx.request({
            url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
            data: {//发送给后台的数据
              s: new Date().toLocaleString,
              SoRunType: "GetShangPinInfo",
              sc: that.data.scinfo.SCCode,
              md: that.data.scinfo.mdcode,
              path: that.data.scinfo.Kuming,
              tm: res.result
              //tm: "6921665707940"
            },
            header: {//请求头
              "Content-Type": "applciation/json"
            },
            method: "GET",//get为默认方法/POST
            success: function (data) {
              if (data.data.state == "ok") {
                let obj = {
                  "spid": data.data.DPInfo.DP_Code,
                  "sptm": data.data.DPInfo.DP_TMCode,
                  "title": data.data.DPInfo.DP_Name,
                  "price": data.data.DPInfo.DP_Price,
                  "number": data.data.DPInfo.Num,
                  "tmxs": data.data.DPInfo.DP_TMXiShu,
                  "danwei": data.data.DPInfo.DP_DanWei,
                  "hyprice": data.data.DPInfo.DP_HYPrice,
                  "cxstate": data.data.DPInfo.DP_CXState,
                  "cxprice": data.data.DPInfo.DP_CXPrice,
                  "lnum1": data.data.DPInfo.ShuLiang1,
                  "ljia1": data.data.DPInfo.ShouJia1,
                  "lnum2": data.data.DPInfo.ShuLiang2,
                  "ljia2": data.data.DPInfo.ShouJia2,
                  "lnum3": data.data.DPInfo.ShuLiang3,
                  "ljia3": data.data.DPInfo.ShouJia3,
                  "xiaoshou30": data.data.DPInfo.xiaoshou30,
                  "DP_DZCCode": data.data.DPInfo.DP_DZCCode,
                  "DP_JiZhong": data.data.DPInfo.DP_JiZhong,
                  "DP_BaoZhiQi": data.data.DPInfo.DP_BaoZhiQi,
                  "isSend": "蜂鸟配送",
                  "activity": "新用户下单立减14",
                  "url": "../MenDianList/MenDianList?id=1",
                  "imgUrl": "",
                  "selected": true
                }
                let goodsList = that.data.goodsList;
                let spny = false;
                for (let i = 0; i < goodsList.length; i++) {
                  if (goodsList[i].spid == obj.spid) {
                    goodsList[i].number = parseFloat(goodsList[i].number) + parseFloat(obj.number);
                    spny = true;
                  }
                }
                if (spny == false) {
                  goodsList.splice(0, 0, obj);
                }

                let heji = that.hejifun(goodsList);
                that.setData({
                  heji,
                  goodsList,
                  top: 0

                })
                //app.globalData.saoobj=null;

                console.log(data.data.DPInfo)
              }
              else {

                wx.showModal({

                  content: data.data.msg,
                  confirmText: "确定",
                  showCancel: false,
                  //cancelText: "取消",
                  success: function (res) {
                    //console.log(res);
                   
                  }
                });
                

              }
              //console.log(data)
            }
          })
        }


      }
    })




  /*
    let obj = {
      "spid": "100025",
      "sptm": "100025",
      "title": "大号购物袋",
      "price": "0.5",
      "number": 1,
      "tmxs": 1,
      "danwei": "个",
      "hyprice": "0.5",
      "cxstate": "0",
      "cxprice": "0.5",
      "lnum1": "0",
      "ljia1": "0",
      "lnum2": "0",
      "ljia2": "0",
      "lnum3": "0",
      "ljia3": "0",
      "xiaoshou30": "9999",
      "isSend": "蜂鸟配送",
      "activity": "新用户下单立减14",
      "url": "../MenDianList/MenDianList?id=1",
      "imgUrl": "",
      "selected": true
    };
    let goodsList = that.data.goodsList;
let spny=false;
    for (let i = 0; i < goodsList.length; i++)
    {
      if (goodsList[i].spid == obj.spid)
      {
        goodsList[i].number += obj.number;
        spny=true;
      }
    }
    if (spny == false)
    {
      goodsList.splice(0, 0, obj);
    }
    
    let heji = this.hejifun(goodsList);
    that.setData({
      heji,
      goodsList,
      top: 0

    })
    */
    /*
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {

        console.log(res)
      }
    })
   */



  },
  qingkong:function()
  {
    let that=this;
    let goodsList;
    let heji;
    if (that.data.goodsList.length>0)
    {
    wx.showModal({

      content: '你确定清空购物车？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        //console.log(res);
        if (res.confirm) {
          //console.log('用户点击主操作')
          goodsList=[];
          heji = that.hejifun(goodsList);
          that.setData({
            heji,
            goodsList

          });
        } 
      }
    });
    }
  },
  jiesuan:function(){
    let that=this;
    let goodsList;
    let heji;
    console.log(that.data.heji.sum * 100)
    wx.request({
      url: 'https://weixin.sorun.cc/weixin/wxPay.ashx',
      data: {//发送给后台的数据
        s: new Date().toLocaleString,
        SoRunType: "WxPay",
        openid: wx.getStorageSync("openid"),
        // SubMchId: "1489534262",
        // SubAppId: "wx8a9fe50daf460cad",
        SubMchId: that.data.scinfo.SubMchId,
        SubAppId: that.data.scinfo.SubAppId,
        LSName: that.data.scinfo.MDName,
        total_fee: Math.round(that.data.heji.sum*100)
        // total_fee: "1"

        //tm: "6921665707940"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (data) {
        let paydata = data.data;
        console.log(data.data)
        /*
        wx.request({
          url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
          data: {
            s: new Date().toLocaleString,
            SoRunType: "InsertOrder",
            sccode: app.globalData.SCInfo.SCCode,
            mdcode: app.globalData.SCInfo.mdcode,
            opid: "sdfsdfsdfsdf",
            subid: "3434324232",
            ordid: "WSSgfsf34324234324324",
            jine: 234,
            goodsList: JSON.stringify(that.data.goodsList),
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",//get为默认方法/POST
          success: function (res) {
            //console.log('sssssssssssss')
            //console.log(res)
            if (res.data.state=="ok")
            {
              goodsList = [];
              heji = that.hejifun(goodsList);
              that.setData({
                heji,
                goodsList

              });
            }
            else
            {
              //console.log(res)
              wx.showModal({
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  //if (res.confirm) {
                  //  console.log('用户点击确定')
                  //}
                }
              });
            }
          }
        })
*/
        
        wx.requestPayment({
          timeStamp: paydata.timeStamp,
          nonceStr: paydata.nonceStr,
          package: paydata.package,
          signType: 'MD5',
          paySign: paydata.paySign,
          success(res) { 

            wx.request({
              url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
              data:{
                s: new Date().toLocaleString,
                SoRunType: "InsertOrder",
                sccode: that.data.scinfo.SCCode,
                mdcode: that.data.scinfo.mdcode,
                opid: wx.getStorageSync("openid"),
                subid: paydata.sub_mch_id,
                ordid: paydata.orderID,
                jine: that.data.heji.sum,
                goodsList: JSON.stringify(that.data.goodsList),
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",//get为默认方法/POST
              success:function(res)
              {
                goodsList = [];
                heji = that.hejifun(goodsList);
                that.setData({
                  heji,
                  goodsList

                });
              }
            })

            
            //console.log(res)
          },
          fail(res) { console.log(res) }
        });
        
      }
    })


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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})