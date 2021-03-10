import axios from 'axios';

const service = axios.create({
      baseURL: "/api",
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

export class HttpUtil {
    static get(url, params = {}) {
      return service.get(url, {
        params
      });
    }
  
    static post(url, body) {
      return service.post(url, body);
    }
  
    static postPage(url, body) {
      return service.post(url, body);
    }
  
    static put(url, body) {
      return service.put(url, body);
    }
  }
