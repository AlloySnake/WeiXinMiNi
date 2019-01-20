// pages/ChuChang/ChuChang.js
// 将 dist 目录下，weapp.qrcode.esm.js 复制到项目目录中
import drawQrcode from '../../resource/js/weapp.qrcode.min.js'
//import JQ from '../../resource/js/jquery-1.6.4.min.js'
//import signalR from '../../resource/js/miniProgramSignalr.js'
//var Hub = require("../../resource/js/miniProgramSignalr.js")
//var Hub = require("../../resource/js/jquery.signalR-2.4.0.min.js")
///引入这个类库
var signalR = require('../../resource/js/signalR.js')

var Fly = require("../../resource/js/wx.js") //wx.js为您下载的源码文件
var fly = new Fly;
var app = getApp();

var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;

var centendata = [];
const protocal = {
  protocol: "json",
  version: 1
};
var ConnectionToken
var token = '';
var isConnection = false

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var timestamp = Date.parse(new Date());
    //timestamp = timestamp / 1000; 
    //console.log(timestamp)



    
    




    ///实例化一个对象
    //let _client = new signalR.signalR();
    //_client.connection("wss://api.sorun.cc/soRunHub", this.callMethods);
/*
    
    var url = "https://api.sorun.cc/soRunHub"
    var queryString = { clientProtocol: "2.0", _: timestamp }

var wsurl="";

var aaa="";


    var negotiateUrl = url + "/negotiate";
    if (queryString) {
      for (var query in queryString) {
        negotiateUrl += (negotiateUrl.indexOf("?") < 0 ? "?" : "&") + (`${query}=` + encodeURIComponent(queryString[query]));
      }
    }

    wx.request({
      url: negotiateUrl,
      method: "post",
      async: false,
      success: res => {
        console.log(res.data)
        this.negotiateResponse = res.data;
        console.log(res)
        wsurl=negotiateUrl.replace("/negotiate", "/connect");
        wsurl += (wsurl.indexOf("?") < 0 ? "?" : "&") + ("transport=webSockets&connectionToken=" + encodeURIComponent(this.negotiateResponse.ConnectionToken) + "&connectionData=" + encodeURIComponent('[{ "name": "sorunmesshub" }]')+"&tid=5");
        wsurl = wsurl.replace(/^http/, "ws");
        console.log( wsurl);
        /*
        wx.request({
          url: wsurl,
          method: "post",
          async: false,
          success: res => {

console.log(res);
          }
        });

        ///实例化一个对象
        let _client = new signalR.signalR();
        _client.connection(wsurl, this.callMethods);
        //建立连接
        ////wx.connectSocket({
        //  url: wsurl,
        //})
       

      },
      fail: res => {
        console.error(`requrst ${url} error : ${res}`);
        return;
      }
    });
    console.log('ss'+wsurl);
    */

/*
    //连接成功
    wx.onSocketOpen(function () {
      console.log("sdfsdfsdf");
      wx.sendSocketMessage({
        data: "asdsadasdasdasd",
      })
    })
    //接收数据
    wx.onSocketMessage(function (data) {
      var objData = JSON.parse(data.data);
      console.log(objData);
      
    })
*/
   /*
    this.hubConnect = new Hub.HubConnection();
    this.hubConnect.start("https://api.sorun.cc/soRunHub", { clientProtocol: "2.0", _: timestamp});
    this.hubConnect.onOpen = res => {
      console.log(res)
      console.log("成功开启连接")
    }
    this.hubConnect.on("LoginSuccessNotice", res => {
      wx.showModal({
        title: '系统消息',
        content: res,
      })
    })

    this.hubConnect.on("ReceiveOwnCid", res => {
      centendata.push({
        content: res.msg,
        time: new Date().toLocaleString(),
        head_owner: res.avatar,
        is_show_right: 0
      });
      this.setData({
        centendata: centendata
      })
    })
*/
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: options.ddcode + '$' + app.globalData.ConnectionId
    })
    //console.log(options.ddcode + '$' + app.globalData.ConnectionId)
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
    //console.log(options)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
callMethods(methods, args) {
    console.log(methods, args);
    let self = this;
    let arg = args[0];
    switch (methods) {
      case 'receiveMsg':
        self.receiveMsg(arg.message);
        break;
    }
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