import Axios from 'axios'
import shstorage from '../repositories/shstorage.js'
let apiUrl = window.VITE_APP_API_URL
if (process.env.NODE_ENV === 'production') {
  apiUrl = window.VITE_APP_API_PRODUCTION_URL
}
const axios = Axios.create({
  baseURL: apiUrl
})
function doGet (endPoint, data) {
  return axios.get(endPoint, {
    params: data,
    crossOrigin: true,
    headers: {
      Authorization: 'Bearer ' + shstorage.getItem('access_token')
      // 'X-CSRF-TOKEN': 'INVALID'
    }
  })
}
function doPost (endPoint, data) {
  const freeEndpoints = [
    'auth/register/client',
    'auth/login'
  ]
  return axios.post(endPoint,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
      }
    }
  )
}

export default {
  doGet,
  doPost
}
