import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import utils from '../utils/index.js';
import qs from 'qs';
  
axios.defaults.baseURL = 'https://www.easy-mock.com';//局域网
// axios.defaults.baseURL = 'http://172.16.10.252:7000/mockjsdata/19/';//开发
 

axios.defaults.timeout = 20000;   

axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

var loading;
axios.interceptors.request.use(config => {
  let sessionId = sessionStorage.getItem('sessionId') || 'adsadsasasasd';
  let sessionPwd = sessionStorage.getItem('sessionPwd') || 'qewqeqeqeqwqe';
  let receiveData = config.data;
  receiveData.sessionId = sessionId;
  receiveData.sessionPwd = sessionPwd;
  if(config.method == 'post'){
    var sentData = qs.stringify(utils.encryptData(receiveData));
  }else{
    var sentData = utils.encryptData(receiveData);
  }
  config.data = sentData;
    return config;
});

axios.interceptors.response.use(
  res => {
    if (res.status != '200') {
      Message.error({duration:1000,message:'响应失败'})
      setTimeout(()=>{
        Message.closeAll();
      },1000)
      return Promise.reject(res);
    }
    return res;
  },
  err => {
    Message.error({duration:1000,message:'网络异常'})
    return Promise.reject(err);
  }
);

export default axios;