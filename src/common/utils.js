export default{

  isPhoneNumb (phone) {
    let exp = /^1[3|4|5|7|8|9][0-9]{9}$/
    if( exp.test(phone) ) {
      return true
    }
    return false
  }

}