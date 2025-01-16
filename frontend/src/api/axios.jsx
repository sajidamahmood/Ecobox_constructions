import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});


console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);


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
console.log("CSRF Token:", csrfToken); // Make sure it's not null or undefined


export default axiosInstance;
