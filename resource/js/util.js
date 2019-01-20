

//输入时间转换
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//输入时间和输出形式
function formattime(number, format) {
  if (number != null) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];//
    var returnArr = [];


    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));


    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    //format.replace(/\//g,'-');
    return format.replace(/\//g, '-');
  } else {
    return number;
  }
}

//formatNumber函数，数字格式
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断输入的手机号是否正确。
function regexConfig() {
  var reg = {
    phone: /^1(3|4|5|7|8)\d{9}$/  //手机号匹配规则
  }
  return reg;
}

// 去前后空格  
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//判断是否为数字
function isNumber(str) {
  var n = Number(str);
  if (!isNaN(n)) {
    return true;
  } else {
    return false;
  }
}

//判断是否对象
function isObj(obj) {
  if (typeof obj == "object") {
    return true;
  } else {
    return false;
  }
}

//判断是否为空
function emptyFun(obj) {
  var obj = obj;
  if (obj == "" || obj == null || obj == undefined || obj == "null" || obj == "undefined") {
    return true;
  } else {
    return false;
  }
}

//获取地址栏参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

//转换时间格式 eg:1972-10-26
function getLocalTime(nS) {
  var now = new Date(nS);
  if (!now) {
    return 0;
  } else {
    var year = now.getFullYear();//年
    var month = now.getMonth() + 1;//月
    var date = now.getDate();//日
    var hour = now.getHours();//时
    var minute = now.getMinutes();//分
    var second = now.getSeconds();//秒
    return year + "-" + month + "-" + date;
  }
}

//数组去重
Array.prototype.unique1 = function () {
  var res = [this[0]];
  for (var i = 1; i < this.length; i++) {
    var repeat = false;
    for (var j = 0; j < res.length; j++) {
      if (this[i] == res[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(this[i]);
    }
  }
  return res;
}

//校验是否全由数字组成 
function isDigit(s) {
  var patrn = /^[0-9]{1,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
function isRegisterUserName(s) {
  var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验用户姓名：只能输入1-30个以字母开头的字串 
function isTrueName(s) {
  var patrn = /^[a-zA-Z]{1,30}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验密码：只能输入6-20个字母、数字、下划线 
function isPasswd(s) {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-” 
function isTel(s) {
  //var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/; 
  var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  if (!patrn.exec(s)) return false
  return true
}

//检测IP地址
function isIP(s) {
  var patrn = /^[0-9.]{1,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

//转换时间  eg：1972/10/26 上午3:21
function getLocalTime(nS) {
  if (!nS) {
    return 0;
  } else {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
}

//对象排序
//var dic = { x: 2, z: 1, y: 3 };//输出   {z:1，x:2，y:3}
//var sdic = Object.keys(dic).sort(function (a, b) { return dic[a] - dic[b] });
//for (ki in sdic) {
//  console.log(sdic[ki] + ":" + dic[sdic[ki]] + ",");
//}

// js sort方法根据数组中对象的某一个属性值进行排序
function keysrt(key, desc) {
  return function (a, b) {
    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  }
}
//使用：
//　　var ary = [{ id: 1, name: "b" }, { id: 2, name: "b" }];
//　　ary.sort(keysrt('name', true));


//校验手机号码：必须以数字开头，除数字外，可含有“-”
function isMobil(s) {
  var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验邮政编码 
function isPostalCode(s) {
  　　var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
  　　if (!patrn.exec(s)) return false
  　　return true
}

//校验搜索关键字 
function isSearch(s) {
  var patrn = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;\'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;\'\,.<>?]{0,19}$/;
  if (!patrn.exec(s)) return false
  return true
} 

//计算两点的举例
function distance (la1, lo1, la2, lo2) {
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137;//地球半径
  s = Math.round(s * 10000) / 10000;
  return s
  // console.log("计算结果",s)
}



module.exports = {
  formatTime: formatTime,
  isSearch: isSearch,
  distance: distance,
}