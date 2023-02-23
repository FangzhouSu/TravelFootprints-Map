import axios from 'axios';
import { message } from 'antd';

// todo: 暂时启动本地服务
axios.defaults.baseURL = 'http://127.0.0.1:7002';
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    message.error('服务端异常！');
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    // if (res.data.msg) console.log(res.data.msg);
    if (res.data.code == 401) {
      window.location.href = '/login';
    }
    if (res.data.code == 413) {
      message.error('图片不得超过 50kb');
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default axios;
