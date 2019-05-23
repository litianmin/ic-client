export default{

  isPhoneNumb (phone) {
    let exp = /^1[3|4|5|7|8|9][0-9]{9}$/
    if( exp.test(phone) ) {
      return true
    }
    return false
  },

  cookieObj: {
    // setCookie("name","hayden","s20")
    getCookie (name) {    //读取cookies 
      let reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      let arr = document.cookie.match(reg)
      if (arr)
          return unescape(arr[2]); 
      else 
          return null; 
    },
  //删除cookies 
    delCookie (name) { 
      let exp = new Date(); 
      exp.setTime(exp.getTime() - 1); 
      let cval=this.getCookie(name); 
      if(cval != null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    }, 
    // 设置cookie
    setCookie (name, value, time) { 
      let strsec = this.getsec(time); 
      let exp = new Date();
      let thisDomain = document.domain 
      exp.setTime(exp.getTime() + strsec*1); 
      document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + `;path=/;domain=${thisDomain}`; 
    }, 
    getsec (str) {  
      let str1=str.substring(1,str.length)*1; 
      let str2=str.substring(0,1); 
      if (str2=="s") { 
        return str1*1000; 
      } else if (str2=="h") { 
        return str1*60*60*1000; 
      } else if (str2=="d") { 
        return str1*24*60*60*1000; 
      } 
    } 
  },

  // 判断是否为微信浏览器 还是 普通浏览器
  isWxBrowser () {
    let ua = window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true
    }
    return false
  },

  strTrim (s) {
    return s.replace(/(^\s*)|(\s*$)/g, "")
  },
  // 转换时间格式
  getDateDiff (time, isUnix) {

    let publishTime = 0
    if(isUnix === false) {
      publishTime = Date.parse(time.replace(/-/gi,"/")) / 1000
    }
    let d_seconds = 0
    let d_minutes = 0
    let d_hours = 0
    let d_days = 0
    let timeNow = parseInt(new Date().getTime()/1000)
    let d = 0

    let date = new Date(publishTime*1000)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    let H = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    //小于10的在前面补0
    // if (M < 10) {
    //     M = '0' + M
    // }
    // if (D < 10) {
    //     D = '0' + D
    // }
    if (H < 10) {
        H = '0' + H
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }

    d = timeNow - publishTime
    d_days = parseInt(d / 86400)
    d_hours = parseInt(d / 3600)
    d_minutes = parseInt(d / 60)
    d_seconds = parseInt(d)

    if(d_days > 0 && d_days < 3) {
      return d_days + '天前'
    }

    if(d_days <= 0 && d_hours > 0) {
      return d_hours + '小时前'
    }

    if(d_hours <= 0 && d_minutes > 0) {
      return d_minutes + '分钟前'
    }

    if(d_seconds < 60) {
      if (d_seconds <= 0) {
        return '刚刚发表'
      }
      return d_seconds + '秒前'
    }

    if(d_days >= 3 && d_days < 30) {
      return `${M}月${D}日 ${H}:${m}`
    }

    if(d_days >= 30) {
      return `${Y}年${M}月${D}日 ${H}:${m}`
    }
  },

}