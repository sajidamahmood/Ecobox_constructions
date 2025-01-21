import axios from 'axios';


/*console.log("Enviroment Variables:",import.meta.env);*/

const axiosInstance = axios.create({

  baseURL: import.meta.env.VITE_API_BASE_URL ||'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true
  },
});

console.log("API Base URL:");

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
