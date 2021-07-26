import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem('token')

    config.headers = {
      Authorization: `Bearer ${token}`,
    }
    return config
  },
  error => {
    Promise.reject(error)
  },
)

export default api
