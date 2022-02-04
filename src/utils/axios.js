import axios from 'axios';
import { TOKEN_KEY } from './auth-helper';

const configAxios = () => {
  window.axios = axios;
  window.axios.defaults.baseURL = 'http://localhost:5000';
  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  // Add a request interceptor
  window.axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      const token = window.localStorage.getItem(TOKEN_KEY);
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) =>
      // Do something with request error
      Promise.reject(error)
  );
};

export default configAxios;
