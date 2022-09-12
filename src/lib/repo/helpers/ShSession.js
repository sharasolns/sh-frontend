import moment from 'moment'
import ShStorage from '../repositories/ShStorage.js'
import {inject} from 'vue'



const checkSession = function (isCheking) {
  let timeout = inject('sessionTimeout')
  if(!timeout){
    timeout = 30
  }
  const sessionStart = ShStorage.getItem('session_start')
  const started = moment(sessionStart)
  if(!sessionStart){
    ShStorage.removeItem('access_token')
    return false
  }
  const pastMinutes = moment().diff(started, 'minutes')
  if(pastMinutes >= timeout) {
    ShStorage.removeItem('access_token')
    return false
  }
  if (isCheking) {
    return true
  }
  const timeNow = moment().toISOString()
  ShStorage.setItem('session_start', timeNow)
  return true
}
export default checkSession
