import moment from 'moment'
// import apis from 'src/lib/repo/helpers/ShApis.js'
import Swal from 'sweetalert2'
import shRepo from '../helpers/ShRepo.js'
import ShRepo from '../helpers/ShRepo.js'
import ShStorage from '../repositories/ShStorage.js'
import {inject} from 'vue'
import shApis from './ShApis'

startSession()
function logoutUser(){
  const loginUrl = ShRepo.getConfig().loginUrl
  const logoutApiEndpoint = inject('logoutApiEndpoint','auth/logout')
  shApis.doPost(logoutApiEndpoint ?? 'auth/logout').then(res=>{
    ShStorage.removeItem('access_token')
    ShStorage.removeItem('user')
    ShStorage.removeItem('last_activity')
    if(window.shInterval){
      clearInterval(window.shInterval)
    }
    window.location.href = loginUrl
  }).catch(ex=>{
    ShStorage.removeItem('access_token')
    ShStorage.removeItem('user')
    if(window.shInterval){
      clearInterval(window.shInterval)
    }
    window.location.href = loginUrl
  })
  const user = ShStorage.getItem('user')
}
const checkSession = function (isCheking) {
  const timeout = ShStorage.getItem('sessionTimeout')
  const last_activity = ShStorage.getItem('last_activity')
  if (ShStorage.getItem('access_token')) {
    const pastMinutes = moment().diff(last_activity, 'minutes');
    const pastSeconds = moment().diff(last_activity, 'seconds');
    if(pastMinutes >= timeout) {
      const gracePeriod = pastSeconds - (timeout * 60)
      if (gracePeriod >= 60 ) {
        logoutUser()
      }
      else {
        if (!window.ShConfirmation)
        {
          window.ShConfirmation = shSwalLogout(30)
        }
      }
    }
  }else {
    if (window.shInterval) {
      clearInterval(window.shInterval)
    }
  }
}
async function shSwalLogout (seconds = 30) {
  let timerInterval
  return Swal.fire({
    title: 'Your session is about to Expire!',
    html: 'You will be logged out in <strong></strong> seconds due to inactivity!',
    showCancelButton: true,
    cancelButtonColor: '#32c787',
    confirmButtonColor: '#000',
    cancelButtonText: 'Stay signed in',
    confirmButtonText: 'Sign out now!',
    timer: seconds * 1000,
    allowOutsideClick: false,
    reverseButtons: true,
    showLoaderOnConfirm: true,
    didOpen(popup) {
      timerInterval = setInterval(() => {
        Swal.getHtmlContainer().querySelector('strong')
            .textContent = (Swal.getTimerLeft() / 1000)
            .toFixed(0)
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.isConfirmed) {
      logoutUser()
    } else if(result.dismiss === 'timer'){
      logoutUser()
    } else {
      window.ShConfirmation = null
      clearInterval(window.shInterval)
      const timeNow = moment().toISOString()
      ShStorage.setItem('last_activity', timeNow)
      startSession()
    }
  })
}
function startSession () {
  const timeNow = moment().toISOString()
  const accessToken = ShStorage.getItem('access_token');
  if (accessToken) {
    ShStorage.setItem('last_activity', timeNow)
    const timout =  ShStorage.getItem('sessionTimeout')
    const interval = (timout * 60 *1000) / 3;
    window.shInterval = setInterval(()=>{
      checkSession()
    },interval)
  }
}
const updateSession = () =>{
  if(!window.shInterval) {
    startSession()
  }
  const timeNow = moment().toISOString()
  ShStorage.setItem('last_activity', timeNow)
}
export default updateSession
