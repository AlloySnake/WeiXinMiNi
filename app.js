var util = require("/resource/js/util.js");
//app.js
var Fly = require("/resource/js/wx.js") //wx.js为您下载的源码文件
var fly = new Fly;
var ConnectionToken
var token = '';
var isConnection = false
App({
  globalData:{
    userinfo: {},
    SCInfo: { sccode: 'LTKELCS',scname:'临洮凯尔亮生活超市'},
    phSystemInfo: {},
    saoobj: null,
    Location:null,
    ConnectionId:null,
    scanddid:{ddid:'',index:-1}

  },

  onLaunch: function (options) {




    wx.login({
     
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'https://weixin.sorun.cc/weixin/weixinAPI.ashx', //接口地址
          data: {
            SoRunType: "Getopenid",
            code: res.code
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            //console.log(res)
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('session_key', res.data.session_key)
            wx.setStorageSync('sessiondate', util.formatTime(new Date))
            
            if (wx.getStorageSync("ZJMenDian")=="")
            {
              let a=[];
              wx.setStorageSync('ZJMenDian', a);
            }
            //this.xopenid=res.data.openid
            //app.xopenid = res.data.openid
            //console.log(res)
            //console.log(wx.getStorageSync('sessiondate'))
          }
        })
      }
    })

    //var that = this; 
    //wx.hideTabBar();
    wx.getSystemInfo({
      success: res => {
        
        this.globalData.phSystemInfo = res;
        //console.log(this.globalData.phSystemInfo);
      },
    })

    /*
        if (!wx.cloud) {
          console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
          wx.cloud.init({
            traceUser: true,
          })
        }
    
        this.globalData = {}*/
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    let that = this;
    fly.get('https://api.sorun.cc/soRunHub/negotiate', {
      clientProtocol: 2.0,
      connectionData: JSON.stringify([{
        "name": "sorunmesshub"
      }]), // hub类的名称
      _: +new Date(), // 时间戳
      //token: token // 这个token是我们与后端定义的一个标识，根据实际情况设置
    }).then((res) => {
      ConnectionToken = res.data.ConnectionToken
      that.globalData.ConnectionId = res.data.ConnectionId;
      //console.log(res.data)
      wx.connectSocket({
        url: `wss://api.sorun.cc/soRunHub/connect?transport=webSockets&clientProtocol=2.0&connectionToken=${encodeURIComponent(res.data.ConnectionToken)}&connectionData=${encodeURIComponent('[{"name": "sorunmesshub" }]')}`
      })
    }) // 注意一下这里的connectionToken和connectionData都需要encodeURIComponent

    wx.onSocketOpen((data) => { // 监听WebSocket 连接打开事件
      fly.get('https://api.sorun.cc/soRunHub/start', {  // 发送start请求
        clientProtocol: 2.0,
        connectionData: JSON.stringify([{
          "name": "sorunmesshub"
        }]),
        _: +new Date(),
        //token: token,
        connectionToken: ConnectionToken,
        transport: 'serverSentEvents'
      }).then(() => {
        isConnection = true
        //wx.sendSocketMessage({ // 通过 WebSocket 连接发送数据
        //  data: JSON.stringify({
        //    "H": "sorunmesshub",
        //    "M": "abc", // 给服务器触发方法
        //    "A": ["111"] // 这里就是看自身情况设置了，要数组形式
        //  })
        //})

      })
    })

    wx.onSocketError((res) => {
      console.log('WebSocket连接打开失败')
      this.reconnect()
    })
    wx.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
      this.reconnect()
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.closeSocket();
  }

})
