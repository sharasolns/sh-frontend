import Swal from 'sweetalert2'
import apis from './ShApis.js'
import moment from 'moment'
function swalSuccess (message) {
  Swal.fire('Success!', message, 'success')
}
function swalError (message) {
  Swal.fire('Error!', message, 'error')
}

function swalHttpError (reason) {
  let error = ''
  if (typeof reason !== 'undefined') {
    if (typeof reason.response !== 'undefined') {
      let reasonString = ''
      if (typeof reason.response.data === 'string') {
        reasonString = reason.response.data
      } else {
        reasonString = JSON.stringify(reason.response.data)
      }
      error = reason.response.status + ': ' + reason.response.statusText + '<br/>' + reasonString
    } else {
      if (typeof reason !== 'string') {
        error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
      } else {
        error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
      }
    }
  } else {
    if (typeof reason !== 'string') {
      error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
    } else {
      error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
    }
  }
  Swal.fire('Error!', error, 'error')
}

function runSilentRequest (url) {
  return apis.doPost(url)
}

function setTabCounts (url) {
  apis.doGet(url).then(res => {
    Object.keys(res.data).forEach(key => {
      const elem = document.getElementById(key)
      if (elem === null) {
        return
      }
      if (typeof elem !== 'undefined') {
        let txt = elem.innerHTML
        txt = txt.split('<i class="d-none"></i>')[0]
        if (parseInt(res.data[key]) > 0) {
          elem.innerHTML = txt + '<i class="d-none"></i><sup class="rounded-circle p-1 bg-info text-white">' + res.data[key] + '</sup>'
        }
      }
      // document.getElementById(key).innerHTML res.data[key]
    })
  })
}
function formatHttpCatchError (reason) {
  console.log(reason)
  let error = ''
  if (typeof reason !== 'undefined') {
    if (typeof reason.response !== 'undefined') {
      alert('here')
      let reasonString = ''
      if (typeof reason.response.data === 'string') {
        reasonString = reason.response.data
      } else {
        reasonString = JSON.stringify(reason.response.data)
      }
      error = reason.response.status + ': ' + reason.response.statusText + '<br/>' + reasonString
    } else {
      if (typeof reason !== 'string') {
        error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
      } else {
        error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
      }
    }
  } else {
    if (typeof reason !== 'string') {
      error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
    } else {
      error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason)
    }
  }
  return error
}
function getMenuCount (url) {
  apis.doGet(url).then(res => {
    console.log(res)
  })
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  customClass: {
    popup: 'colored-toast'
  },
  iconColor: 'white',
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
function showToast (message, toastType, position) {
  if (!toastType) {
    toastType = 'success'
  }
  if(!position){
    position = window.swalPosition
  }
  Toast.mixin({
    position: position
  })
  Toast.fire({
    icon: toastType,
    title: message
  })
}

async function runPlainRequest (url, message, title, data) {
  if (typeof title === 'undefined') {
    title = null
  }
  return Swal.fire({
    title: title !== null ? title : 'Are you sure?',
    html: message,
    showCancelButton: true,
    confirmButtonColor: '#32c787',
    cancelButtonText: 'No, cancel',
    confirmButtonText: 'Yes, Proceed!',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return apis.doPost(url, data).then(function (response) {
        Swal.fire('Success!', 'Action completed successfully', 'success')
        return {
          response: response.data,
          success: true
        }
      })
        .catch(reason => {
          if (typeof reason.response === 'undefined') {
            Swal.fire('Error!', `Connection to ${url} lost`, 'error')
          } else {
            Swal.fire(`Error ${reason.response.status}`, reason.response.statusText, 'error')
          }
          return {
            success: false
          }
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
}

function formatDate(date, format) {
  if (!format) {
    format = 'lll'
  }
  return moment(date).format(format)
}

export default {
  swalSuccess,
  swalError,
  runPlainRequest,
  getMenuCount,
  setTabCounts,
  showToast,
  runSilentRequest,
  swalHttpError,
  formatHttpCatchError,
  formatDate
}
