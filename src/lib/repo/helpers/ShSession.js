import moment from 'moment'
import ShStorage from '../repositories/ShStorage.js'
import {inject} from 'vue'
import shApis from './ShApis'


function logoutUser(){
  // let logoutUrl = inject()
  const logoutApiEndpoint = inject('logoutApiEndpoint','auth/logout')
  shApis.doPost(logoutApiEndpoint ?? 'auth/logout').then(res=>{
    ShStorage.removeItem('access_token')
    ShStorage.removeItem('user')
    // const loginUrl = inject('loginUrl','/login')
    window.location.href = '/login'
  }).catch(ex=>{
    const loginUrl = inject('loginUrl','/login')
    ShStorage.removeItem('access_token')
    ShStorage.removeItem('user')
    window.location.href = '/login'
  })
  const user = JSON.parse(ShStorage.getItem('user'))
}
const checkSession = function (isCheking) {
  let timeout = inject('sessionTimeout')
  if(!timeout){
    timeout = 30
  } else {
    timeout = parseFloat(timeout)
  }
  if(window.shLogoutTimeout){
    clearTimeout(window.shLogoutTimeout)
  }

  if(ShStorage.getItem('access_token')){
    const timeOutSession = setTimeout(()=>{
      if(ShStorage.getItem('access_token')){
        logoutUser()
      }
    }, timeout * 60 * 1000)
    window.shLogoutTimeout = timeOutSession
  }

  // const sessionStart = ShStorage.getItem('session_start')
  // const started = moment(sessionStart)
  // if(!sessionStart){
  //   ShStorage.removeItem('access_token')
  //   ShStorage.removeItem('user')
  //   return false
  // }
  // const pastMinutes = moment().diff(started, 'minutes')
  // if(pastMinutes >= timeout) {
  //   ShStorage.removeItem('user')
  //   ShStorage.removeItem('access_token')
  //   return false
  // }
  // if (isCheking) {
  //   return true
  // }
  // const timeNow = moment().toISOString()
  // ShStorage.setItem('session_start', timeNow)
  // return true
}
export default checkSession
