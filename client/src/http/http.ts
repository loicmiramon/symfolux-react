import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    'Content-Type': 'application/json',
    'autorization': null,
    'refreshToken': null
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    } 

    if (refreshToken) {
      config.headers.refreshToken = `Bearer ${refreshToken}`
    }

    return config
  },

  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
