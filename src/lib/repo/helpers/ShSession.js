import { DateTime } from 'luxon'
import Swal from 'sweetalert2'
import shRepo from '../helpers/ShRepo.js'
import ShStorage from '../repositories/ShStorage.js'

startSession()
function logoutUser(){
  if(!sessionRestored()){
    shRepo.signOutUser()
  } else {
    console.log('session has been restored in another tab')
  }
}
function sessionRestored(){
  const timeout = ShStorage.getItem('sessionTimeout') * 60
  const last_activity = ShStorage.getItem('last_activity')
  const pastSeconds = DateTime.now().diff(DateTime.fromISO(last_activity), 'seconds').seconds;
  if(!ShStorage.getItem('access_token'))
    return false
  return pastSeconds < timeout
}
const checkSession = function (isCheking) {
  const timeout = ShStorage.getItem('sessionTimeout')
  const last_activity = ShStorage.getItem('last_activity')
  if (ShStorage.getItem('access_token')) {
    const pastMinutes = DateTime.now().diff(DateTime.fromISO(last_activity), 'minutes').minutes;
    const pastSeconds = DateTime.now().diff(DateTime.fromISO(last_activity), 'seconds').seconds;
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
        // if(sessionRestored() && ShStorage.getItem('access_token')){
        //   console.log('swal closed by session restored')
        //   Swal.close()
        // }
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
      const timeNow = DateTime.now().toISO()
      ShStorage.setItem('last_activity', timeNow)
      startSession()
    }
  })
}
function startSession () {
  const timeNow = DateTime.now().toISO()
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
  const timeNow = DateTime.now().toISO()
  ShStorage.setItem('last_activity', timeNow)
}
export default updateSession
