import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://your-laravel-backend-url/api',
});

export default axiosInstance;
