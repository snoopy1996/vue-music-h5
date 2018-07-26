/**
 * @author : 忍把浮名换此生
 * @e-mail : 2295161275@qq.com
 * @create date : 2017-12-17 15:40
 * @description :
 */
import axios from 'axios';

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.baseURL = 'https://localhost';
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.xhrFields = {
      withCredentials: true
    };
    config.headers.Origin = 'http://172.16.32.130:8080';
    // if (localStorage.token) {
    //   config.headers.Authorization = `Bearer ${localStorage.token}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      console.log('非正常响应', response);
    } else {
      return response;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
