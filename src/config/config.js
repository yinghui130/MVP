import secret from '@/utils/utils'

function getConfig() {
  const axios = require('axios')
  const $ = require('jquery')
  var cf = null;
  var str = window.sessionStorage.getItem('appConfig')
  // console.log('str----\n' + str)
  if (str == null || str == '') {
    //同步方法获取
    $.ajax({
      type: "GET",
      url: "./static/serverConfig.json",
      dataType: "json",
      async: false,
      success: function (data) {
        // console.log('---ajax---')
        // console.log(data)
        cf = data;
        if (cf != null) {
          cf.dateTime = new Date()
          window.sessionStorage.setItem(
            "appConfig",
            secret.Encrypt(JSON.stringify(cf))
          );
        }
      }
    })
  } else {
    var cfStr = secret.Decrypt(str)
    cf = JSON.parse(cfStr)
  }
  /*
  //异步获取
  await axios.get('/static/serverConfig.json').then((result) => {
      console.log('liuyinghui success -------------')
      console.log(result.data);
      cf = result.data;//设置成Vue的全局属性
  }).catch((error) => {
      console.log('liuyinghui error -------------')
      console.log(error)
  })
  */
  console.log('---before return---')
  //console.log(cf)
  return cf
}
var config = getConfig()
console.log('---before export---')
//console.log(config)
export {
  config
}
//export { config }
