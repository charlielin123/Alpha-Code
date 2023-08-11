// 封裝axios
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BACKEND_URL, // 基础请求地址
  timeout: 20000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json'
  }
});

// 创建请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = localStorage.getItem('token'); // 请求头携带 token

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// http.interceptors.response.use(
//   (response) => {
//     return response.data;
//   }
// )

export default http;
