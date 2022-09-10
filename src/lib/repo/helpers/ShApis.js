import Axios from 'axios'
import ShSession from '../repositories/ShSession.js'
import shstorage from '../repositories/ShStorage.js'
import shSession from '../repositories/ShSession.js'
let apiUrl = import.meta.env.VITE_APP_API_URL
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  apiUrl = import.meta.env.VITE_APP_API_PRODUCTION_URL
}
const axios = Axios.create({
  baseURL: apiUrl
})
function doGet (endPoint, data) {
  shSession.shSetSessionChecker()
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
  shSession.shSetSessionChecker()
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
