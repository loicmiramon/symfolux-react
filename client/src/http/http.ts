import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    'Content-Type': 'application/json',
    'autorization': null,
    'refreshtoken': null
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    const refresh = localStorage.getItem('refreshtoken')

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    } 

    if (refresh) {
      config.headers.refreshtoken = `Bearer ${refresh}`
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
