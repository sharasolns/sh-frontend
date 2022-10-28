import Axios from 'axios'
import shstorage from '../repositories/ShStorage.js'
import ShSession from './ShSession.js'

let apiUrl = import.meta.env.VITE_APP_API_URL
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  const productionUrl = import.meta.env.VITE_APP_API_PRODUCTION_URL
  if(productionUrl){
    apiUrl = productionUrl
  }
}

const axios = Axios.create({
  baseURL: apiUrl
})
function doGet (endPoint, data) {
  if(!ShSession()){
    // window.location.reload()
  }
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
  if(!ShSession()){
    // window.location.reload()
  }
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
