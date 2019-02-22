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
  }
}