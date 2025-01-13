import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];  
    }
};

const token = localStorage.getItem('auth_token');
if (token) {
  setAuthHeader(token);
}

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
  axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
} else {
  console.warn("CSRF token not found. Ensure it's added to your HTML.");
}


export default axiosInstance;
