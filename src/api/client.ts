import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    console.log(localStorage.getItem('token'), 'totktktoktotk');
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
client.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default client;
