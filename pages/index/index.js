// pages/index/index.js

const app = getApp();
Page({

  data: {
    phSystemInfo: app.globalData.phSystemInfo,
    avatarUrl: "../../resource/img/user-unlogin.png",
    userinfo:{},
    mdinfo:{}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    let mdlist = wx.getStorageSync("ZJMenDian");
    //console.log(mdlist.length)
    let md 
    if(mdlist.length==0)
    {
      wx.navigateTo({
        url: '../MenDian/MenDian?id=1'
      })
    }
    else
    {
      md = mdlist[0]
      app.globalData.SCInfo = md;
      //console.log(app.globalData.SCInfo)
      that.setData({
        mdinfo: md
      });
    }
    
    wx.removeTabBarBadge({
      index: 0
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        //console.log(res);
        app.globalData.Location = res
        //this.setData({
        //  location: res,
        //})
        // console.log(app.globalData.location);
      },
    })
    
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

              avatarUrl : App.userinfo.avatarUrl
              //console.log(res)
         }
        }
            
      });

    let toParse = (obj) => {
      //console.log(obj)
      for (let i in obj) {
        if (Array.isArray(obj[i])) {
          //console.log(obj[i])
          obj[i] = obj[i]
          //obj[i] = JSON.parse(obj[i])
          toParse(obj[i])
        }
      }
      return obj
    }
    wx.onSocketMessage(function (res) { // 监听WebSocket 接受到服务器的消息事件
      let data = JSON.parse(res.data) // 反正就是根据服务器端返回的信息做处理
      if (Object.keys(data).length > 0 && data.hasOwnProperty('M') && data.M.length > 0) {
        //console.log(data)
        for (let i = 0; i < data.M.length; i++) {
          let result = toParse(data.M[i])
          switch (result.M) {
            case 'LoginSuccessNotice': // 事件标识符
              
              
                //console.log(result.A[0])
                //wx.showToast({
                //  title: result.A[0],
                //  icon: 'success',
                //  duration: 2000
                //})
              
              
              /*
                if (result.A.type === 1) {
                  wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: result.A.message,
                    icon: 'none',
                    duration: 2000
                  })
                  
                }*/
              break;
            case 'ReceiveOwnCid': // 事件标识符
              //console.log(result.A[0])
              break;
            case 'shelptoscanMsg': // 事件标识符
              let ss = JSON.parse(result.A[0])
              if (ss.MsgType === "ChuChangState") { 
                app.globalData.scanddid.ddid = ss.DDID;
                wx.navigateBack({
                  delta: 1
                })
                
              }
              //console.log(result.A[0])
              break;
              /*
            case 'receiveMsg':
              
                wx.showToast({
                  title: "用户消息",
                  icon: 'success',
                  duration: 2000
                })
              
              break;
              */
            /*
          case 'ReceiveOwnCid':
          if (ss.MsgType === "ChuChangState")
              {}
            if (result.A.type === 1) {
              wx.showToast({
                title: '连接成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: result.A.message,
                icon: 'none',
                duration: 2000
              })
            }
            */
          }
        }
      }
    });


    //avatarUrl: app.userinfo.avatarUrl
  },
  //登录获取code
  login: function () {
    wx.navigateTo({
      url: '../MenDian/MenDian?id=1'
    })
  },
  Scan: function () {
    let that = this; 
    //console.log(that.data.mdinfo)
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['EAN_13'],
      success(res) {
        
        console.log(that.data.mdinfo)
        if(res!=null)
        {
          console.log(res)
          wx.request({
            url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx',
            data: {//发送给后台的数据
              s: new Date().toLocaleString,
              SoRunType: "GetShangPinInfo",
              sc: that.data.mdinfo.SCCode,
              md: that.data.mdinfo.mdcode,
              path: that.data.mdinfo.Kuming,
              tm: res.result
            },
            header: {//请求头
              "Content-Type": "applciation/json"
            },
            method: "GET",//get为默认方法/POST
            success: function (data) {
              if(data.data.state=="ok")
              {
                app.globalData.saoobj = {
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
                wx.switchTab({
                  url: '../ScanGo/ScanGo'
                })
                //console.log(data.data.DPInfo)
              }
              else
              {
                wx.showToast({
                  title: data.data.msg,//提示文字
                  duration: 2000,//显示时长
                  mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon: 'none', //图标，支持"success"、"loading"  
                  success: function () { },//接口调用成功
                  fail: function () { },  //接口调用失败的回调函数  
                  complete: function () { } //接口调用结束的回调函数  
                })

              }
              //console.log(data)
            }
          })
        }


      }
    })
    
   
    
    
    
  }
  /*
  ,
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  }
*/




})


