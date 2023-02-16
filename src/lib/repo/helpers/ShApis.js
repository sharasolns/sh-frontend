import Axios from 'axios'
import shstorage from '../repositories/ShStorage.js'
import ShSession from './ShSession.js'
const graphQlEndpoint = 'sh-ql'
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
window.shAxionInstance = axios
function doGet (endPoint, data) {
  ShSession()
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
  ShSession()
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
function graphQlQuery(query) {
  const data = {
    query
  }
  return doGet(graphQlEndpoint,data)
}
function graphQlMutate(mutation) {
  const data = {
    query: `mutation ${mutation}`
  }
  return doPost(graphQlEndpoint,data)
}

export default {
  doGet,
  doPost,
  graphQlQuery,
  graphQlMutate
}
