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
function doGet (endPoint, data,extraConfig) {
  ShSession()
  let config = {
    headers: {
      Authorization: 'Bearer ' + shstorage.getItem('access_token')
    }
  }
    if (extraConfig) {
        Object.assign(config, extraConfig)
    }
  return axios.get(endPoint, {
    params: data,
    crossOrigin: true,
    ...config
  })
}
function doPost (endPoint, data, extraConfig) {
  ShSession()
  const freeEndpoints = [
    'auth/register/client',
    'auth/login'
  ]
  const config = {
    headers: {
      Authorization: 'Bearer ' + shstorage.getItem('access_token')
    }
  }
    if (extraConfig) {
        Object.assign(config, extraConfig)
    }
  return axios.post(endPoint,
    data,
    config
  )
}
function doDelete (endPoint, data, extraConfig) {
  ShSession()
  const config = {
    headers: {
      Authorization: 'Bearer ' + shstorage.getItem('access_token')
    }
  }
    if (extraConfig) {
        Object.assign(config, extraConfig)
    }
  return axios.delete(endPoint,
    data,
    config
  )
}
function doPut (endPoint, data, extraConfig) {
    ShSession()
    const config = {
        headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
        }
    }
        if (extraConfig) {
            Object.assign(config, extraConfig)
        }
    return axios.put(endPoint,
        data,
        config
    )

}
function doPatch (endPoint, data, extraConfig) {
    ShSession()
    const config = {
        headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
        }
    }
        if (extraConfig) {
            Object.assign(config, extraConfig)
        }
    return axios.patch(endPoint,
        data,
        config
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
    doDelete,
    doPut,
    doPatch,
  graphQlMutate
}
