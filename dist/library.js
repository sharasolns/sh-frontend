'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var moment = require('moment');
var Swal = require('sweetalert2');
var bootstrap = require('bootstrap');
var NProgress = require('nprogress');
var vue = require('vue');
var _ = require('lodash');
var pinia = require('pinia');
var vueRouter = require('vue-router');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var Swal__default = /*#__PURE__*/_interopDefaultLegacy(Swal);
var NProgress__default = /*#__PURE__*/_interopDefaultLegacy(NProgress);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

function setItem (key, value) {
  let toStore = value;
  if (typeof value === 'object') {
    toStore = JSON.stringify(value);
  }
  return localStorage.setItem(key, toStore)
}

function getItem (key) {
  try {
   return  JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key)
  }
}
function removeItem (key) {
  return localStorage.removeItem(key)
}
var ShStorage = {
  setItem,
  getItem,
  removeItem
};

function swalSuccess(message){
    Swal__default["default"].fire('Success!', message, 'success');
}

function swalError(message){
    Swal__default["default"].fire('Error!', message, 'error');
}

function swalHttpError(reason){
    let error = '';
    if (typeof reason !== 'undefined') {
        if (typeof reason.response !== 'undefined') {
            let reasonString = '';
            if (typeof reason.response.data === 'string') {
                reasonString = reason.response.data;
            } else {
                reasonString = JSON.stringify(reason.response.data);
            }
            error = reason.response.status + ': ' + reason.response.statusText + '<br/>' + reasonString;
        } else {
            if (typeof reason !== 'string') {
                error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
            } else {
                error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
            }
        }
    } else {
        if (typeof reason !== 'string') {
            error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
        } else {
            error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
        }
    }
    Swal__default["default"].fire('Error!', error, 'error');
}

function runSilentRequest(url){
    return shApis.doPost(url)
}

function setTabCounts(url){
    shApis.doGet(url).then(res => {
        Object.keys(res.data).forEach(key => {
            const elem = document.getElementById(key);
            if (elem === null) {
                return
            }
            if (typeof elem !== 'undefined') {
                let txt = elem.innerHTML;
                txt = txt.split('<i class="d-none"></i>')[0];
                if (parseInt(res.data[key]) > 0) {
                    elem.innerHTML = txt + '<i class="d-none"></i><sup class="rounded-circle p-1 bg-info text-white">' + res.data[key] + '</sup>';
                }
            }
            // document.getElementById(key).innerHTML res.data[key]
        });
    });
}

function formatHttpCatchError(reason){
    console.log(reason);
    let error = '';
    if (typeof reason !== 'undefined') {
        if (typeof reason.response !== 'undefined') {
            alert('here');
            let reasonString = '';
            if (typeof reason.response.data === 'string') {
                reasonString = reason.response.data;
            } else {
                reasonString = JSON.stringify(reason.response.data);
            }
            error = reason.response.status + ': ' + reason.response.statusText + '<br/>' + reasonString;
        } else {
            if (typeof reason !== 'string') {
                error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
            } else {
                error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
            }
        }
    } else {
        if (typeof reason !== 'string') {
            error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
        } else {
            error = 'A Unexpected script error occurred<br/>' + JSON.stringify(reason);
        }
    }
    return error
}

function getMenuCount(url){
    shApis.doGet(url).then(res => {
        console.log(res);
    });
}

const signOutUser = () => {
    const loginUrl = getShConfig('loginUrl', 'auth/login');
    const logoutApiEndPoint = getShConfig('logoutApiEndpoint', 'auth/logout');
    console.log(loginUrl, logoutApiEndPoint);
    shApis.doPost(logoutApiEndPoint).then(res => {
        ShStorage.removeItem('access_token');
        ShStorage.removeItem('user');
        ShStorage.removeItem('last_activity');
        window.location.href = loginUrl;
    }).catch(ex => {
        ShStorage.removeItem('access_token');
        ShStorage.removeItem('user');
        ShStorage.removeItem('last_activity');
        window.location.href = loginUrl;
    });
};


function getShConfig(key = null, def = ''){

    const config = ShStorage.getItem('ShConfig') ?? {};
    if (key) {
        return config[key] ?? def
    }
    return config
}

function showToast(message, toastType, config){
    const mixinConfig = {
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
            toast.addEventListener('mouseenter', Swal__default["default"].stopTimer);
            toast.addEventListener('mouseleave', Swal__default["default"].resumeTimer);
        }
    };
    if (!toastType) {
        toastType = 'success';
    }
    if (config) {
        Object.keys(config).map(key =>{
            let newKey = key;
            if(key === 'duration'){
                newKey = 'timer';
            }
            if(key === 'timeout'){
                newKey = 'timer';
            }
            mixinConfig[newKey] = config[key];
        });
    }
    // console.log(mixinConfig)
    const Toast = Swal__default["default"].mixin(mixinConfig);
    // Toast.mixin({
    //   position: 'top'
    // })
    Toast.fire({
        icon: toastType,
        title: message,
        postion: 'bottom'
    });
}

async function runPlainRequest(url, message, title, data){
    if (typeof title === 'undefined') {
        title = null;
    }
    return Swal__default["default"].fire({
        title: title !== null ? title : 'Are you sure?',
        html: message,
        showCancelButton: true,
        confirmButtonColor: '#32c787',
        cancelButtonText: 'No, cancel',
        confirmButtonText: 'Yes, Proceed!',
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return shApis.doPost(url, data).then(function (response){
                return {
                    response: response.data,
                    success: true
                }
            })
                .catch(error => {
                    return {
                        success: false,
                        error: error,
                        message: error.message
                    }
                })
        },
        allowOutsideClick: () => !Swal__default["default"].isLoading()
    })
}

function formatDate(date, format){
    if (!format) {
        format = 'lll';
    }
    return moment__default["default"](date).format(format)
}

function formatNumber(amount, decimalPoints = 0){
    return numberFormat(amount, decimalPoints)
}

function numberFormat(amount, decimalPoints = 0){
    let formatted = parseFloat(amount).toFixed(decimalPoints);
    formatted = new Intl.NumberFormat().format(formatted);
    const formattedArr = formatted.split('.');
    return decimalPoints === 0 ? formattedArr[0] : formattedArr[0] + '.' + (formattedArr[1] || '0').padEnd(decimalPoints, 0)
}

const showModal = modalId => {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
};

const hideModal = modalId => {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.hide();
};

var shRepo = {
    swalSuccess,
    swalError,
    runPlainRequest,
    getMenuCount,
    setTabCounts,
    getShConfig,
    showToast,
    runSilentRequest,
    swalHttpError,
    formatHttpCatchError,
    formatDate,
    numberFormat,
    formatNumber,
    signOutUser,
    showModal,
    hideModal
};

startSession();
function logoutUser(){
  if(!sessionRestored()){
    shRepo.signOutUser();
  } else {
    console.log('session has been restored in another tab');
  }
}
function sessionRestored(){
  const timeout = ShStorage.getItem('sessionTimeout') * 60;
  const last_activity = ShStorage.getItem('last_activity');
  const pastSeconds = moment__default["default"]().diff(last_activity, 'seconds');
  if(!ShStorage.getItem('access_token'))
    return false
  return pastSeconds < timeout
}
const checkSession = function (isCheking) {
  const timeout = ShStorage.getItem('sessionTimeout');
  const last_activity = ShStorage.getItem('last_activity');
  if (ShStorage.getItem('access_token')) {
    const pastMinutes = moment__default["default"]().diff(last_activity, 'minutes');
    const pastSeconds = moment__default["default"]().diff(last_activity, 'seconds');
    if(pastMinutes >= timeout) {
      const gracePeriod = pastSeconds - (timeout * 60);
      if (gracePeriod >= 60 ) {
        logoutUser();
      }
      else {
        if (!window.ShConfirmation)
        {
          window.ShConfirmation = shSwalLogout(30);
        }
      }
    }
  }else {
    if (window.shInterval) {
      clearInterval(window.shInterval);
    }
  }
};
async function shSwalLogout (seconds = 30) {
  let timerInterval;
  return Swal__default["default"].fire({
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
        Swal__default["default"].getHtmlContainer().querySelector('strong')
            .textContent = (Swal__default["default"].getTimerLeft() / 1000)
            .toFixed(0);
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.isConfirmed) {
      logoutUser();
    } else if(result.dismiss === 'timer'){
      logoutUser();
    } else {
      window.ShConfirmation = null;
      clearInterval(window.shInterval);
      const timeNow = moment__default["default"]().toISOString();
      ShStorage.setItem('last_activity', timeNow);
      startSession();
    }
  })
}
function startSession () {
  const timeNow = moment__default["default"]().toISOString();
  const accessToken = ShStorage.getItem('access_token');
  if (accessToken) {
    ShStorage.setItem('last_activity', timeNow);
    const timout =  ShStorage.getItem('sessionTimeout');
    const interval = (timout * 60 *1000) / 3;
    window.shInterval = setInterval(()=>{
      checkSession();
    },interval);
  }
}
const updateSession = () =>{
  if(!window.shInterval) {
    startSession();
  }
  const timeNow = moment__default["default"]().toISOString();
  ShStorage.setItem('last_activity', timeNow);
};

const graphQlEndpoint = 'sh-ql';
let apiUrl = undefined.VITE_APP_API_URL;
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  const productionUrl = undefined.VITE_APP_API_PRODUCTION_URL;
  if(productionUrl){
    apiUrl = productionUrl;
  }
}

const axios = Axios__default["default"].create({
  baseURL: apiUrl
});
window.shAxionInstance = axios;
function doGet (endPoint, data,extraConfig) {
  updateSession();
  let config = {
    headers: {
      Authorization: 'Bearer ' + ShStorage.getItem('access_token')
    }
  };
    if (extraConfig) {
        Object.assign(config, extraConfig);
    }
  return axios.get(endPoint, {
    params: data,
    crossOrigin: true,
    ...config
  })
}
function doPost (endPoint, data, extraConfig) {
  updateSession();
  const config = {
    headers: {
      Authorization: 'Bearer ' + ShStorage.getItem('access_token')
    }
  };
    if (extraConfig) {
        Object.assign(config, extraConfig);
    }
  return axios.post(endPoint,
    data,
    config
  )
}
function graphQlQuery(query) {
  const data = {
    query
  };
  return doGet(graphQlEndpoint,data)
}
function graphQlMutate(mutation) {
  const data = {
    query: `mutation ${mutation}`
  };
  return doPost(graphQlEndpoint,data)
}

var shApis = {
  doGet,
  doPost,
  graphQlQuery,
  graphQlMutate
};

const countries = [
  {
    name: 'Afghanistan',
    dialCode: '+93',
    isoCode: 'AF',
    flag: 'https://www.countryflags.io/AF/flat/64.png'
  },
  {
    name: 'Aland Islands',
    dialCode: '+358',
    isoCode: 'AX',
    flag: 'https://www.countryflags.io/AX/flat/64.png'
  },
  {
    name: 'Albania',
    dialCode: '+355',
    isoCode: 'AL',
    flag: 'https://www.countryflags.io/AL/flat/64.png'
  },
  {
    name: 'Algeria',
    dialCode: '+213',
    isoCode: 'DZ',
    flag: 'https://www.countryflags.io/DZ/flat/64.png'
  },
  {
    name: 'AmericanSamoa',
    dialCode: '+1684',
    isoCode: 'AS',
    flag: 'https://www.countryflags.io/AS/flat/64.png'
  },
  {
    name: 'Andorra',
    dialCode: '+376',
    isoCode: 'AD',
    flag: 'https://www.countryflags.io/AD/flat/64.png'
  },
  {
    name: 'Angola',
    dialCode: '+244',
    isoCode: 'AO',
    flag: 'https://www.countryflags.io/AO/flat/64.png'
  },
  {
    name: 'Anguilla',
    dialCode: '+1264',
    isoCode: 'AI',
    flag: 'https://www.countryflags.io/AI/flat/64.png'
  },
  {
    name: 'Antarctica',
    dialCode: '+672',
    isoCode: 'AQ',
    flag: 'https://www.countryflags.io/AQ/flat/64.png'
  },
  {
    name: 'Antigua and Barbuda',
    dialCode: '+1268',
    isoCode: 'AG',
    flag: 'https://www.countryflags.io/AG/flat/64.png'
  },
  {
    name: 'Argentina',
    dialCode: '+54',
    isoCode: 'AR',
    flag: 'https://www.countryflags.io/AR/flat/64.png'
  },
  {
    name: 'Armenia',
    dialCode: '+374',
    isoCode: 'AM',
    flag: 'https://www.countryflags.io/AM/flat/64.png'
  },
  {
    name: 'Aruba',
    dialCode: '+297',
    isoCode: 'AW',
    flag: 'https://www.countryflags.io/AW/flat/64.png'
  },
  {
    name: 'Ascension Island',
    dialCode: '+247',
    isoCode: 'AC',
    flag: 'https://cdn.kcak11.com/flags/AC_64.png'
  },
  {
    name: 'Australia',
    dialCode: '+61',
    isoCode: 'AU',
    flag: 'https://www.countryflags.io/AU/flat/64.png'
  },
  {
    name: 'Austria',
    dialCode: '+43',
    isoCode: 'AT',
    flag: 'https://www.countryflags.io/AT/flat/64.png'
  },
  {
    name: 'Azerbaijan',
    dialCode: '+994',
    isoCode: 'AZ',
    flag: 'https://www.countryflags.io/AZ/flat/64.png'
  },
  {
    name: 'Bahamas',
    dialCode: '+1242',
    isoCode: 'BS',
    flag: 'https://www.countryflags.io/BS/flat/64.png'
  },
  {
    name: 'Bahrain',
    dialCode: '+973',
    isoCode: 'BH',
    flag: 'https://www.countryflags.io/BH/flat/64.png'
  },
  {
    name: 'Bangladesh',
    dialCode: '+880',
    isoCode: 'BD',
    flag: 'https://www.countryflags.io/BD/flat/64.png'
  },
  {
    name: 'Barbados',
    dialCode: '+1246',
    isoCode: 'BB',
    flag: 'https://www.countryflags.io/BB/flat/64.png'
  },
  {
    name: 'Belarus',
    dialCode: '+375',
    isoCode: 'BY',
    flag: 'https://www.countryflags.io/BY/flat/64.png'
  },
  {
    name: 'Belgium',
    dialCode: '+32',
    isoCode: 'BE',
    flag: 'https://www.countryflags.io/BE/flat/64.png'
  },
  {
    name: 'Belize',
    dialCode: '+501',
    isoCode: 'BZ',
    flag: 'https://www.countryflags.io/BZ/flat/64.png'
  },
  {
    name: 'Benin',
    dialCode: '+229',
    isoCode: 'BJ',
    flag: 'https://www.countryflags.io/BJ/flat/64.png'
  },
  {
    name: 'Bermuda',
    dialCode: '+1441',
    isoCode: 'BM',
    flag: 'https://www.countryflags.io/BM/flat/64.png'
  },
  {
    name: 'Bhutan',
    dialCode: '+975',
    isoCode: 'BT',
    flag: 'https://www.countryflags.io/BT/flat/64.png'
  },
  {
    name: 'Bolivia',
    dialCode: '+591',
    isoCode: 'BO',
    flag: 'https://www.countryflags.io/BO/flat/64.png'
  },
  {
    name: 'Bosnia and Herzegovina',
    dialCode: '+387',
    isoCode: 'BA',
    flag: 'https://www.countryflags.io/BA/flat/64.png'
  },
  {
    name: 'Botswana',
    dialCode: '+267',
    isoCode: 'BW',
    flag: 'https://www.countryflags.io/BW/flat/64.png'
  },
  {
    name: 'Brazil',
    dialCode: '+55',
    isoCode: 'BR',
    flag: 'https://www.countryflags.io/BR/flat/64.png'
  },
  {
    name: 'British Indian Ocean Territory',
    dialCode: '+246',
    isoCode: 'IO',
    flag: 'https://www.countryflags.io/IO/flat/64.png'
  },
  {
    name: 'Brunei Darussalam',
    dialCode: '+673',
    isoCode: 'BN',
    flag: 'https://www.countryflags.io/BN/flat/64.png'
  },
  {
    name: 'Bulgaria',
    dialCode: '+359',
    isoCode: 'BG',
    flag: 'https://www.countryflags.io/BG/flat/64.png'
  },
  {
    name: 'Burkina Faso',
    dialCode: '+226',
    isoCode: 'BF',
    flag: 'https://www.countryflags.io/BF/flat/64.png'
  },
  {
    name: 'Burundi',
    dialCode: '+257',
    isoCode: 'BI',
    flag: 'https://www.countryflags.io/BI/flat/64.png'
  },
  {
    name: 'Cambodia',
    dialCode: '+855',
    isoCode: 'KH',
    flag: 'https://www.countryflags.io/KH/flat/64.png'
  },
  {
    name: 'Cameroon',
    dialCode: '+237',
    isoCode: 'CM',
    flag: 'https://www.countryflags.io/CM/flat/64.png'
  },
  {
    name: 'Canada',
    dialCode: '+1',
    isoCode: 'CA',
    flag: 'https://www.countryflags.io/CA/flat/64.png'
  },
  {
    name: 'Cape Verde',
    dialCode: '+238',
    isoCode: 'CV',
    flag: 'https://www.countryflags.io/CV/flat/64.png'
  },
  {
    name: 'Cayman Islands',
    dialCode: '+1345',
    isoCode: 'KY',
    flag: 'https://www.countryflags.io/KY/flat/64.png'
  },
  {
    name: 'Central African Republic',
    dialCode: '+236',
    isoCode: 'CF',
    flag: 'https://www.countryflags.io/CF/flat/64.png'
  },
  {
    name: 'Chad',
    dialCode: '+235',
    isoCode: 'TD',
    flag: 'https://www.countryflags.io/TD/flat/64.png'
  },
  {
    name: 'Chile',
    dialCode: '+56',
    isoCode: 'CL',
    flag: 'https://www.countryflags.io/CL/flat/64.png'
  },
  {
    name: 'China',
    dialCode: '+86',
    isoCode: 'CN',
    flag: 'https://www.countryflags.io/CN/flat/64.png'
  },
  {
    name: 'Christmas Island',
    dialCode: '+61',
    isoCode: 'CX',
    flag: 'https://www.countryflags.io/CX/flat/64.png'
  },
  {
    name: 'Cocos (Keeling) Islands',
    dialCode: '+61',
    isoCode: 'CC',
    flag: 'https://www.countryflags.io/CC/flat/64.png'
  },
  {
    name: 'Colombia',
    dialCode: '+57',
    isoCode: 'CO',
    flag: 'https://www.countryflags.io/CO/flat/64.png'
  },
  {
    name: 'Comoros',
    dialCode: '+269',
    isoCode: 'KM',
    flag: 'https://www.countryflags.io/KM/flat/64.png'
  },
  {
    name: 'Congo',
    dialCode: '+242',
    isoCode: 'CG',
    flag: 'https://www.countryflags.io/CG/flat/64.png'
  },
  {
    name: 'Cook Islands',
    dialCode: '+682',
    isoCode: 'CK',
    flag: 'https://www.countryflags.io/CK/flat/64.png'
  },
  {
    name: 'Costa Rica',
    dialCode: '+506',
    isoCode: 'CR',
    flag: 'https://www.countryflags.io/CR/flat/64.png'
  },
  {
    name: 'Croatia',
    dialCode: '+385',
    isoCode: 'HR',
    flag: 'https://www.countryflags.io/HR/flat/64.png'
  },
  {
    name: 'Cuba',
    dialCode: '+53',
    isoCode: 'CU',
    flag: 'https://www.countryflags.io/CU/flat/64.png'
  },
  {
    name: 'Cyprus',
    dialCode: '+357',
    isoCode: 'CY',
    flag: 'https://www.countryflags.io/CY/flat/64.png'
  },
  {
    name: 'Czech Republic',
    dialCode: '+420',
    isoCode: 'CZ',
    flag: 'https://www.countryflags.io/CZ/flat/64.png'
  },
  {
    name: 'Democratic Republic of the Congo',
    dialCode: '+243',
    isoCode: 'CD',
    flag: 'https://www.countryflags.io/CD/flat/64.png'
  },
  {
    name: 'Denmark',
    dialCode: '+45',
    isoCode: 'DK',
    flag: 'https://www.countryflags.io/DK/flat/64.png'
  },
  {
    name: 'Djibouti',
    dialCode: '+253',
    isoCode: 'DJ',
    flag: 'https://www.countryflags.io/DJ/flat/64.png'
  },
  {
    name: 'Dominica',
    dialCode: '+1767',
    isoCode: 'DM',
    flag: 'https://www.countryflags.io/DM/flat/64.png'
  },
  {
    name: 'Dominican Republic',
    dialCode: '+1849',
    isoCode: 'DO',
    flag: 'https://www.countryflags.io/DO/flat/64.png'
  },
  {
    name: 'Ecuador',
    dialCode: '+593',
    isoCode: 'EC',
    flag: 'https://www.countryflags.io/EC/flat/64.png'
  },
  {
    name: 'Egypt',
    dialCode: '+20',
    isoCode: 'EG',
    flag: 'https://www.countryflags.io/EG/flat/64.png'
  },
  {
    name: 'El Salvador',
    dialCode: '+503',
    isoCode: 'SV',
    flag: 'https://www.countryflags.io/SV/flat/64.png'
  },
  {
    name: 'Equatorial Guinea',
    dialCode: '+240',
    isoCode: 'GQ',
    flag: 'https://www.countryflags.io/GQ/flat/64.png'
  },
  {
    name: 'Eritrea',
    dialCode: '+291',
    isoCode: 'ER',
    flag: 'https://www.countryflags.io/ER/flat/64.png'
  },
  {
    name: 'Estonia',
    dialCode: '+372',
    isoCode: 'EE',
    flag: 'https://www.countryflags.io/EE/flat/64.png'
  },
  {
    name: 'Eswatini',
    dialCode: '+268',
    isoCode: 'SZ',
    flag: 'https://www.countryflags.io/SZ/flat/64.png'
  },
  {
    name: 'Ethiopia',
    dialCode: '+251',
    isoCode: 'ET',
    flag: 'https://www.countryflags.io/ET/flat/64.png'
  },
  {
    name: 'Falkland Islands (Malvinas)',
    dialCode: '+500',
    isoCode: 'FK',
    flag: 'https://www.countryflags.io/FK/flat/64.png'
  },
  {
    name: 'Faroe Islands',
    dialCode: '+298',
    isoCode: 'FO',
    flag: 'https://www.countryflags.io/FO/flat/64.png'
  },
  {
    name: 'Fiji',
    dialCode: '+679',
    isoCode: 'FJ',
    flag: 'https://www.countryflags.io/FJ/flat/64.png'
  },
  {
    name: 'Finland',
    dialCode: '+358',
    isoCode: 'FI',
    flag: 'https://www.countryflags.io/FI/flat/64.png'
  },
  {
    name: 'France',
    dialCode: '+33',
    isoCode: 'FR',
    flag: 'https://www.countryflags.io/FR/flat/64.png'
  },
  {
    name: 'French Guiana',
    dialCode: '+594',
    isoCode: 'GF',
    flag: 'https://www.countryflags.io/GF/flat/64.png'
  },
  {
    name: 'French Polynesia',
    dialCode: '+689',
    isoCode: 'PF',
    flag: 'https://www.countryflags.io/PF/flat/64.png'
  },
  {
    name: 'Gabon',
    dialCode: '+241',
    isoCode: 'GA',
    flag: 'https://www.countryflags.io/GA/flat/64.png'
  },
  {
    name: 'Gambia',
    dialCode: '+220',
    isoCode: 'GM',
    flag: 'https://www.countryflags.io/GM/flat/64.png'
  },
  {
    name: 'Georgia',
    dialCode: '+995',
    isoCode: 'GE',
    flag: 'https://www.countryflags.io/GE/flat/64.png'
  },
  {
    name: 'Germany',
    dialCode: '+49',
    isoCode: 'DE',
    flag: 'https://www.countryflags.io/DE/flat/64.png'
  },
  {
    name: 'Ghana',
    dialCode: '+233',
    isoCode: 'GH',
    flag: 'https://www.countryflags.io/GH/flat/64.png'
  },
  {
    name: 'Gibraltar',
    dialCode: '+350',
    isoCode: 'GI',
    flag: 'https://www.countryflags.io/GI/flat/64.png'
  },
  {
    name: 'Greece',
    dialCode: '+30',
    isoCode: 'GR',
    flag: 'https://www.countryflags.io/GR/flat/64.png'
  },
  {
    name: 'Greenland',
    dialCode: '+299',
    isoCode: 'GL',
    flag: 'https://www.countryflags.io/GL/flat/64.png'
  },
  {
    name: 'Grenada',
    dialCode: '+1473',
    isoCode: 'GD',
    flag: 'https://www.countryflags.io/GD/flat/64.png'
  },
  {
    name: 'Guadeloupe',
    dialCode: '+590',
    isoCode: 'GP',
    flag: 'https://www.countryflags.io/GP/flat/64.png'
  },
  {
    name: 'Guam',
    dialCode: '+1671',
    isoCode: 'GU',
    flag: 'https://www.countryflags.io/GU/flat/64.png'
  },
  {
    name: 'Guatemala',
    dialCode: '+502',
    isoCode: 'GT',
    flag: 'https://www.countryflags.io/GT/flat/64.png'
  },
  {
    name: 'Guernsey',
    dialCode: '+44',
    isoCode: 'GG',
    flag: 'https://www.countryflags.io/GG/flat/64.png'
  },
  {
    name: 'Guinea',
    dialCode: '+224',
    isoCode: 'GN',
    flag: 'https://www.countryflags.io/GN/flat/64.png'
  },
  {
    name: 'Guinea-Bissau',
    dialCode: '+245',
    isoCode: 'GW',
    flag: 'https://www.countryflags.io/GW/flat/64.png'
  },
  {
    name: 'Guyana',
    dialCode: '+592',
    isoCode: 'GY',
    flag: 'https://www.countryflags.io/GY/flat/64.png'
  },
  {
    name: 'Haiti',
    dialCode: '+509',
    isoCode: 'HT',
    flag: 'https://www.countryflags.io/HT/flat/64.png'
  },
  {
    name: 'Holy See (Vatican City State)',
    dialCode: '+379',
    isoCode: 'VA',
    flag: 'https://www.countryflags.io/VA/flat/64.png'
  },
  {
    name: 'Honduras',
    dialCode: '+504',
    isoCode: 'HN',
    flag: 'https://www.countryflags.io/HN/flat/64.png'
  },
  {
    name: 'Hong Kong',
    dialCode: '+852',
    isoCode: 'HK',
    flag: 'https://www.countryflags.io/HK/flat/64.png'
  },
  {
    name: 'Hungary',
    dialCode: '+36',
    isoCode: 'HU',
    flag: 'https://www.countryflags.io/HU/flat/64.png'
  },
  {
    name: 'Iceland',
    dialCode: '+354',
    isoCode: 'IS',
    flag: 'https://www.countryflags.io/IS/flat/64.png'
  },
  {
    name: 'India',
    dialCode: '+91',
    isoCode: 'IN',
    flag: 'https://www.countryflags.io/IN/flat/64.png'
  },
  {
    name: 'Indonesia',
    dialCode: '+62',
    isoCode: 'ID',
    flag: 'https://www.countryflags.io/ID/flat/64.png'
  },
  {
    name: 'Iran',
    dialCode: '+98',
    isoCode: 'IR',
    flag: 'https://www.countryflags.io/IR/flat/64.png'
  },
  {
    name: 'Iraq',
    dialCode: '+964',
    isoCode: 'IQ',
    flag: 'https://www.countryflags.io/IQ/flat/64.png'
  },
  {
    name: 'Ireland',
    dialCode: '+353',
    isoCode: 'IE',
    flag: 'https://www.countryflags.io/IE/flat/64.png'
  },
  {
    name: 'Isle of Man',
    dialCode: '+44',
    isoCode: 'IM',
    flag: 'https://www.countryflags.io/IM/flat/64.png'
  },
  {
    name: 'Israel',
    dialCode: '+972',
    isoCode: 'IL',
    flag: 'https://www.countryflags.io/IL/flat/64.png'
  },
  {
    name: 'Italy',
    dialCode: '+39',
    isoCode: 'IT',
    flag: 'https://www.countryflags.io/IT/flat/64.png'
  },
  {
    name: 'Ivory Coast / Cote d\'Ivoire',
    dialCode: '+225',
    isoCode: 'CI',
    flag: 'https://www.countryflags.io/CI/flat/64.png'
  },
  {
    name: 'Jamaica',
    dialCode: '+1876',
    isoCode: 'JM',
    flag: 'https://www.countryflags.io/JM/flat/64.png'
  },
  {
    name: 'Japan',
    dialCode: '+81',
    isoCode: 'JP',
    flag: 'https://www.countryflags.io/JP/flat/64.png'
  },
  {
    name: 'Jersey',
    dialCode: '+44',
    isoCode: 'JE',
    flag: 'https://www.countryflags.io/JE/flat/64.png'
  },
  {
    name: 'Jordan',
    dialCode: '+962',
    isoCode: 'JO',
    flag: 'https://www.countryflags.io/JO/flat/64.png'
  },
  {
    name: 'Kazakhstan',
    dialCode: '+77',
    isoCode: 'KZ',
    flag: 'https://www.countryflags.io/KZ/flat/64.png'
  },
  {
    name: 'Kenya',
    dialCode: '+254',
    isoCode: 'KE',
    flag: 'https://www.countryflags.io/KE/flat/64.png'
  },
  {
    name: 'Kiribati',
    dialCode: '+686',
    isoCode: 'KI',
    flag: 'https://www.countryflags.io/KI/flat/64.png'
  },
  {
    name: 'Korea, Democratic People\'s Republic of Korea',
    dialCode: '+850',
    isoCode: 'KP',
    flag: 'https://www.countryflags.io/KP/flat/64.png'
  },
  {
    name: 'Korea, Republic of South Korea',
    dialCode: '+82',
    isoCode: 'KR',
    flag: 'https://www.countryflags.io/KR/flat/64.png'
  },
  {
    name: 'Kosovo',
    dialCode: '+383',
    isoCode: 'XK',
    flag: 'https://www.countryflags.io/XK/flat/64.png'
  },
  {
    name: 'Kuwait',
    dialCode: '+965',
    isoCode: 'KW',
    flag: 'https://www.countryflags.io/KW/flat/64.png'
  },
  {
    name: 'Kyrgyzstan',
    dialCode: '+996',
    isoCode: 'KG',
    flag: 'https://www.countryflags.io/KG/flat/64.png'
  },
  {
    name: 'Laos',
    dialCode: '+856',
    isoCode: 'LA',
    flag: 'https://www.countryflags.io/LA/flat/64.png'
  },
  {
    name: 'Latvia',
    dialCode: '+371',
    isoCode: 'LV',
    flag: 'https://www.countryflags.io/LV/flat/64.png'
  },
  {
    name: 'Lebanon',
    dialCode: '+961',
    isoCode: 'LB',
    flag: 'https://www.countryflags.io/LB/flat/64.png'
  },
  {
    name: 'Lesotho',
    dialCode: '+266',
    isoCode: 'LS',
    flag: 'https://www.countryflags.io/LS/flat/64.png'
  },
  {
    name: 'Liberia',
    dialCode: '+231',
    isoCode: 'LR',
    flag: 'https://www.countryflags.io/LR/flat/64.png'
  },
  {
    name: 'Libya',
    dialCode: '+218',
    isoCode: 'LY',
    flag: 'https://www.countryflags.io/LY/flat/64.png'
  },
  {
    name: 'Liechtenstein',
    dialCode: '+423',
    isoCode: 'LI',
    flag: 'https://www.countryflags.io/LI/flat/64.png'
  },
  {
    name: 'Lithuania',
    dialCode: '+370',
    isoCode: 'LT',
    flag: 'https://www.countryflags.io/LT/flat/64.png'
  },
  {
    name: 'Luxembourg',
    dialCode: '+352',
    isoCode: 'LU',
    flag: 'https://www.countryflags.io/LU/flat/64.png'
  },
  {
    name: 'Macau',
    dialCode: '+853',
    isoCode: 'MO',
    flag: 'https://www.countryflags.io/MO/flat/64.png'
  },
  {
    name: 'Madagascar',
    dialCode: '+261',
    isoCode: 'MG',
    flag: 'https://www.countryflags.io/MG/flat/64.png'
  },
  {
    name: 'Malawi',
    dialCode: '+265',
    isoCode: 'MW',
    flag: 'https://www.countryflags.io/MW/flat/64.png'
  },
  {
    name: 'Malaysia',
    dialCode: '+60',
    isoCode: 'MY',
    flag: 'https://www.countryflags.io/MY/flat/64.png'
  },
  {
    name: 'Maldives',
    dialCode: '+960',
    isoCode: 'MV',
    flag: 'https://www.countryflags.io/MV/flat/64.png'
  },
  {
    name: 'Mali',
    dialCode: '+223',
    isoCode: 'ML',
    flag: 'https://www.countryflags.io/ML/flat/64.png'
  },
  {
    name: 'Malta',
    dialCode: '+356',
    isoCode: 'MT',
    flag: 'https://www.countryflags.io/MT/flat/64.png'
  },
  {
    name: 'Marshall Islands',
    dialCode: '+692',
    isoCode: 'MH',
    flag: 'https://www.countryflags.io/MH/flat/64.png'
  },
  {
    name: 'Martinique',
    dialCode: '+596',
    isoCode: 'MQ',
    flag: 'https://www.countryflags.io/MQ/flat/64.png'
  },
  {
    name: 'Mauritania',
    dialCode: '+222',
    isoCode: 'MR',
    flag: 'https://www.countryflags.io/MR/flat/64.png'
  },
  {
    name: 'Mauritius',
    dialCode: '+230',
    isoCode: 'MU',
    flag: 'https://www.countryflags.io/MU/flat/64.png'
  },
  {
    name: 'Mayotte',
    dialCode: '+262',
    isoCode: 'YT',
    flag: 'https://www.countryflags.io/YT/flat/64.png'
  },
  {
    name: 'Mexico',
    dialCode: '+52',
    isoCode: 'MX',
    flag: 'https://www.countryflags.io/MX/flat/64.png'
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    dialCode: '+691',
    isoCode: 'FM',
    flag: 'https://www.countryflags.io/FM/flat/64.png'
  },
  {
    name: 'Moldova',
    dialCode: '+373',
    isoCode: 'MD',
    flag: 'https://www.countryflags.io/MD/flat/64.png'
  },
  {
    name: 'Monaco',
    dialCode: '+377',
    isoCode: 'MC',
    flag: 'https://www.countryflags.io/MC/flat/64.png'
  },
  {
    name: 'Mongolia',
    dialCode: '+976',
    isoCode: 'MN',
    flag: 'https://www.countryflags.io/MN/flat/64.png'
  },
  {
    name: 'Montenegro',
    dialCode: '+382',
    isoCode: 'ME',
    flag: 'https://www.countryflags.io/ME/flat/64.png'
  },
  {
    name: 'Montserrat',
    dialCode: '+1664',
    isoCode: 'MS',
    flag: 'https://www.countryflags.io/MS/flat/64.png'
  },
  {
    name: 'Morocco',
    dialCode: '+212',
    isoCode: 'MA',
    flag: 'https://www.countryflags.io/MA/flat/64.png'
  },
  {
    name: 'Mozambique',
    dialCode: '+258',
    isoCode: 'MZ',
    flag: 'https://www.countryflags.io/MZ/flat/64.png'
  },
  {
    name: 'Myanmar',
    dialCode: '+95',
    isoCode: 'MM',
    flag: 'https://www.countryflags.io/MM/flat/64.png'
  },
  {
    name: 'Namibia',
    dialCode: '+264',
    isoCode: 'NA',
    flag: 'https://www.countryflags.io/NA/flat/64.png'
  },
  {
    name: 'Nauru',
    dialCode: '+674',
    isoCode: 'NR',
    flag: 'https://www.countryflags.io/NR/flat/64.png'
  },
  {
    name: 'Nepal',
    dialCode: '+977',
    isoCode: 'NP',
    flag: 'https://www.countryflags.io/NP/flat/64.png'
  },
  {
    name: 'Netherlands',
    dialCode: '+31',
    isoCode: 'NL',
    flag: 'https://www.countryflags.io/NL/flat/64.png'
  },
  {
    name: 'Netherlands Antilles',
    dialCode: '+599',
    isoCode: 'AN',
    flag: 'https://www.countryflags.io/AN/flat/64.png'
  },
  {
    name: 'New Caledonia',
    dialCode: '+687',
    isoCode: 'NC',
    flag: 'https://www.countryflags.io/NC/flat/64.png'
  },
  {
    name: 'New Zealand',
    dialCode: '+64',
    isoCode: 'NZ',
    flag: 'https://www.countryflags.io/NZ/flat/64.png'
  },
  {
    name: 'Nicaragua',
    dialCode: '+505',
    isoCode: 'NI',
    flag: 'https://www.countryflags.io/NI/flat/64.png'
  },
  {
    name: 'Niger',
    dialCode: '+227',
    isoCode: 'NE',
    flag: 'https://www.countryflags.io/NE/flat/64.png'
  },
  {
    name: 'Nigeria',
    dialCode: '+234',
    isoCode: 'NG',
    flag: 'https://www.countryflags.io/NG/flat/64.png'
  },
  {
    name: 'Niue',
    dialCode: '+683',
    isoCode: 'NU',
    flag: 'https://www.countryflags.io/NU/flat/64.png'
  },
  {
    name: 'Norfolk Island',
    dialCode: '+672',
    isoCode: 'NF',
    flag: 'https://www.countryflags.io/NF/flat/64.png'
  },
  {
    name: 'North Macedonia',
    dialCode: '+389',
    isoCode: 'MK',
    flag: 'https://www.countryflags.io/MK/flat/64.png'
  },
  {
    name: 'Northern Mariana Islands',
    dialCode: '+1670',
    isoCode: 'MP',
    flag: 'https://www.countryflags.io/MP/flat/64.png'
  },
  {
    name: 'Norway',
    dialCode: '+47',
    isoCode: 'NO',
    flag: 'https://www.countryflags.io/NO/flat/64.png'
  },
  {
    name: 'Oman',
    dialCode: '+968',
    isoCode: 'OM',
    flag: 'https://www.countryflags.io/OM/flat/64.png'
  },
  {
    name: 'Pakistan',
    dialCode: '+92',
    isoCode: 'PK',
    flag: 'https://www.countryflags.io/PK/flat/64.png'
  },
  {
    name: 'Palau',
    dialCode: '+680',
    isoCode: 'PW',
    flag: 'https://www.countryflags.io/PW/flat/64.png'
  },
  {
    name: 'Palestine',
    dialCode: '+970',
    isoCode: 'PS',
    flag: 'https://www.countryflags.io/PS/flat/64.png'
  },
  {
    name: 'Panama',
    dialCode: '+507',
    isoCode: 'PA',
    flag: 'https://www.countryflags.io/PA/flat/64.png'
  },
  {
    name: 'Papua New Guinea',
    dialCode: '+675',
    isoCode: 'PG',
    flag: 'https://www.countryflags.io/PG/flat/64.png'
  },
  {
    name: 'Paraguay',
    dialCode: '+595',
    isoCode: 'PY',
    flag: 'https://www.countryflags.io/PY/flat/64.png'
  },
  {
    name: 'Peru',
    dialCode: '+51',
    isoCode: 'PE',
    flag: 'https://www.countryflags.io/PE/flat/64.png'
  },
  {
    name: 'Philippines',
    dialCode: '+63',
    isoCode: 'PH',
    flag: 'https://www.countryflags.io/PH/flat/64.png'
  },
  {
    name: 'Pitcairn',
    dialCode: '+872',
    isoCode: 'PN',
    flag: 'https://www.countryflags.io/PN/flat/64.png'
  },
  {
    name: 'Poland',
    dialCode: '+48',
    isoCode: 'PL',
    flag: 'https://www.countryflags.io/PL/flat/64.png'
  },
  {
    name: 'Portugal',
    dialCode: '+351',
    isoCode: 'PT',
    flag: 'https://www.countryflags.io/PT/flat/64.png'
  },
  {
    name: 'Puerto Rico',
    dialCode: '+1939',
    isoCode: 'PR',
    flag: 'https://www.countryflags.io/PR/flat/64.png'
  },
  {
    name: 'Qatar',
    dialCode: '+974',
    isoCode: 'QA',
    flag: 'https://www.countryflags.io/QA/flat/64.png'
  },
  {
    name: 'Reunion',
    dialCode: '+262',
    isoCode: 'RE',
    flag: 'https://www.countryflags.io/RE/flat/64.png'
  },
  {
    name: 'Romania',
    dialCode: '+40',
    isoCode: 'RO',
    flag: 'https://www.countryflags.io/RO/flat/64.png'
  },
  {
    name: 'Russia',
    dialCode: '+7',
    isoCode: 'RU',
    flag: 'https://www.countryflags.io/RU/flat/64.png'
  },
  {
    name: 'Rwanda',
    dialCode: '+250',
    isoCode: 'RW',
    flag: 'https://www.countryflags.io/RW/flat/64.png'
  },
  {
    name: 'Saint Barthelemy',
    dialCode: '+590',
    isoCode: 'BL',
    flag: 'https://www.countryflags.io/BL/flat/64.png'
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dialCode: '+290',
    isoCode: 'SH',
    flag: 'https://www.countryflags.io/SH/flat/64.png'
  },
  {
    name: 'Saint Kitts and Nevis',
    dialCode: '+1869',
    isoCode: 'KN',
    flag: 'https://www.countryflags.io/KN/flat/64.png'
  },
  {
    name: 'Saint Lucia',
    dialCode: '+1758',
    isoCode: 'LC',
    flag: 'https://www.countryflags.io/LC/flat/64.png'
  },
  {
    name: 'Saint Martin',
    dialCode: '+590',
    isoCode: 'MF',
    flag: 'https://www.countryflags.io/MF/flat/64.png'
  },
  {
    name: 'Saint Pierre and Miquelon',
    dialCode: '+508',
    isoCode: 'PM',
    flag: 'https://www.countryflags.io/PM/flat/64.png'
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dialCode: '+1784',
    isoCode: 'VC',
    flag: 'https://www.countryflags.io/VC/flat/64.png'
  },
  {
    name: 'Samoa',
    dialCode: '+685',
    isoCode: 'WS',
    flag: 'https://www.countryflags.io/WS/flat/64.png'
  },
  {
    name: 'San Marino',
    dialCode: '+378',
    isoCode: 'SM',
    flag: 'https://www.countryflags.io/SM/flat/64.png'
  },
  {
    name: 'Sao Tome and Principe',
    dialCode: '+239',
    isoCode: 'ST',
    flag: 'https://www.countryflags.io/ST/flat/64.png'
  },
  {
    name: 'Saudi Arabia',
    dialCode: '+966',
    isoCode: 'SA',
    flag: 'https://www.countryflags.io/SA/flat/64.png'
  },
  {
    name: 'Senegal',
    dialCode: '+221',
    isoCode: 'SN',
    flag: 'https://www.countryflags.io/SN/flat/64.png'
  },
  {
    name: 'Serbia',
    dialCode: '+381',
    isoCode: 'RS',
    flag: 'https://www.countryflags.io/RS/flat/64.png'
  },
  {
    name: 'Seychelles',
    dialCode: '+248',
    isoCode: 'SC',
    flag: 'https://www.countryflags.io/SC/flat/64.png'
  },
  {
    name: 'Sierra Leone',
    dialCode: '+232',
    isoCode: 'SL',
    flag: 'https://www.countryflags.io/SL/flat/64.png'
  },
  {
    name: 'Singapore',
    dialCode: '+65',
    isoCode: 'SG',
    flag: 'https://www.countryflags.io/SG/flat/64.png'
  },
  {
    name: 'Sint Maarten',
    dialCode: '+1721',
    isoCode: 'SX',
    flag: 'https://www.countryflags.io/SX/flat/64.png'
  },
  {
    name: 'Slovakia',
    dialCode: '+421',
    isoCode: 'SK',
    flag: 'https://www.countryflags.io/SK/flat/64.png'
  },
  {
    name: 'Slovenia',
    dialCode: '+386',
    isoCode: 'SI',
    flag: 'https://www.countryflags.io/SI/flat/64.png'
  },
  {
    name: 'Solomon Islands',
    dialCode: '+677',
    isoCode: 'SB',
    flag: 'https://www.countryflags.io/SB/flat/64.png'
  },
  {
    name: 'Somalia',
    dialCode: '+252',
    isoCode: 'SO',
    flag: 'https://www.countryflags.io/SO/flat/64.png'
  },
  {
    name: 'South Africa',
    dialCode: '+27',
    isoCode: 'ZA',
    flag: 'https://www.countryflags.io/ZA/flat/64.png'
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dialCode: '+500',
    isoCode: 'GS',
    flag: 'https://www.countryflags.io/GS/flat/64.png'
  },
  {
    name: 'South Sudan',
    dialCode: '+211',
    isoCode: 'SS',
    flag: 'https://www.countryflags.io/SS/flat/64.png'
  },
  {
    name: 'Spain',
    dialCode: '+34',
    isoCode: 'ES',
    flag: 'https://www.countryflags.io/ES/flat/64.png'
  },
  {
    name: 'Sri Lanka',
    dialCode: '+94',
    isoCode: 'LK',
    flag: 'https://www.countryflags.io/LK/flat/64.png'
  },
  {
    name: 'Sudan',
    dialCode: '+249',
    isoCode: 'SD',
    flag: 'https://www.countryflags.io/SD/flat/64.png'
  },
  {
    name: 'Suriname',
    dialCode: '+597',
    isoCode: 'SR',
    flag: 'https://www.countryflags.io/SR/flat/64.png'
  },
  {
    name: 'Svalbard and Jan Mayen',
    dialCode: '+47',
    isoCode: 'SJ',
    flag: 'https://www.countryflags.io/SJ/flat/64.png'
  },
  {
    name: 'Sweden',
    dialCode: '+46',
    isoCode: 'SE',
    flag: 'https://www.countryflags.io/SE/flat/64.png'
  },
  {
    name: 'Switzerland',
    dialCode: '+41',
    isoCode: 'CH',
    flag: 'https://www.countryflags.io/CH/flat/64.png'
  },
  {
    name: 'Syrian Arab Republic',
    dialCode: '+963',
    isoCode: 'SY',
    flag: 'https://www.countryflags.io/SY/flat/64.png'
  },
  {
    name: 'Taiwan',
    dialCode: '+886',
    isoCode: 'TW',
    flag: 'https://www.countryflags.io/TW/flat/64.png'
  },
  {
    name: 'Tajikistan',
    dialCode: '+992',
    isoCode: 'TJ',
    flag: 'https://www.countryflags.io/TJ/flat/64.png'
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    dialCode: '+255',
    isoCode: 'TZ',
    flag: 'https://www.countryflags.io/TZ/flat/64.png'
  },
  {
    name: 'Thailand',
    dialCode: '+66',
    isoCode: 'TH',
    flag: 'https://www.countryflags.io/TH/flat/64.png'
  },
  {
    name: 'Timor-Leste',
    dialCode: '+670',
    isoCode: 'TL',
    flag: 'https://www.countryflags.io/TL/flat/64.png'
  },
  {
    name: 'Togo',
    dialCode: '+228',
    isoCode: 'TG',
    flag: 'https://www.countryflags.io/TG/flat/64.png'
  },
  {
    name: 'Tokelau',
    dialCode: '+690',
    isoCode: 'TK',
    flag: 'https://www.countryflags.io/TK/flat/64.png'
  },
  {
    name: 'Tonga',
    dialCode: '+676',
    isoCode: 'TO',
    flag: 'https://www.countryflags.io/TO/flat/64.png'
  },
  {
    name: 'Trinidad and Tobago',
    dialCode: '+1868',
    isoCode: 'TT',
    flag: 'https://www.countryflags.io/TT/flat/64.png'
  },
  {
    name: 'Tunisia',
    dialCode: '+216',
    isoCode: 'TN',
    flag: 'https://www.countryflags.io/TN/flat/64.png'
  },
  {
    name: 'Turkey',
    dialCode: '+90',
    isoCode: 'TR',
    flag: 'https://www.countryflags.io/TR/flat/64.png'
  },
  {
    name: 'Turkmenistan',
    dialCode: '+993',
    isoCode: 'TM',
    flag: 'https://www.countryflags.io/TM/flat/64.png'
  },
  {
    name: 'Turks and Caicos Islands',
    dialCode: '+1649',
    isoCode: 'TC',
    flag: 'https://www.countryflags.io/TC/flat/64.png'
  },
  {
    name: 'Tuvalu',
    dialCode: '+688',
    isoCode: 'TV',
    flag: 'https://www.countryflags.io/TV/flat/64.png'
  },
  {
    name: 'Uganda',
    dialCode: '+256',
    isoCode: 'UG',
    flag: 'https://www.countryflags.io/UG/flat/64.png'
  },
  {
    name: 'Ukraine',
    dialCode: '+380',
    isoCode: 'UA',
    flag: 'https://www.countryflags.io/UA/flat/64.png'
  },
  {
    name: 'United Arab Emirates',
    dialCode: '+971',
    isoCode: 'AE',
    flag: 'https://www.countryflags.io/AE/flat/64.png'
  },
  {
    name: 'United Kingdom',
    dialCode: '+44',
    isoCode: 'GB',
    flag: 'https://www.countryflags.io/GB/flat/64.png'
  },
  {
    name: 'United States',
    dialCode: '+1',
    isoCode: 'US',
    flag: 'https://www.countryflags.io/US/flat/64.png'
  },
  {
    name: 'Uruguay',
    dialCode: '+598',
    isoCode: 'UY',
    flag: 'https://www.countryflags.io/UY/flat/64.png'
  },
  {
    name: 'Uzbekistan',
    dialCode: '+998',
    isoCode: 'UZ',
    flag: 'https://www.countryflags.io/UZ/flat/64.png'
  },
  {
    name: 'Vanuatu',
    dialCode: '+678',
    isoCode: 'VU',
    flag: 'https://www.countryflags.io/VU/flat/64.png'
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    dialCode: '+58',
    isoCode: 'VE',
    flag: 'https://www.countryflags.io/VE/flat/64.png'
  },
  {
    name: 'Vietnam',
    dialCode: '+84',
    isoCode: 'VN',
    flag: 'https://www.countryflags.io/VN/flat/64.png'
  },
  {
    name: 'Virgin Islands, British',
    dialCode: '+1284',
    isoCode: 'VG',
    flag: 'https://www.countryflags.io/VG/flat/64.png'
  },
  {
    name: 'Virgin Islands, U.S.',
    dialCode: '+1340',
    isoCode: 'VI',
    flag: 'https://www.countryflags.io/VI/flat/64.png'
  },
  {
    name: 'Wallis and Futuna',
    dialCode: '+681',
    isoCode: 'WF',
    flag: 'https://www.countryflags.io/WF/flat/64.png'
  },
  {
    name: 'Yemen',
    dialCode: '+967',
    isoCode: 'YE',
    flag: 'https://www.countryflags.io/YE/flat/64.png'
  },
  {
    name: 'Zambia',
    dialCode: '+260',
    isoCode: 'ZM',
    flag: 'https://www.countryflags.io/ZM/flat/64.png'
  },
  {
    name: 'Zimbabwe',
    dialCode: '+263',
    isoCode: 'ZW',
    flag: 'https://www.countryflags.io/ZW/flat/64.png'
  }
];

var script$w = {
  name: 'PhoneInput',
  props: ['modelValue', 'country_code','disabled'],
  data () {
    return {
      input: this.modelValue,
      countries: countries,
      selectedCountry: {
        name: 'Kenya',
        dialCode: '+254',
        isoCode: 'KE',
        flag: 'https://www.countryflags.io/KE/flat/64.png'
      },
      flag: undefined.VITE_APP_HOME_URL + 'flags/ke.svg',
      appUrl: undefined.VITE_APP_HOME_URL
    }
  },
  updated () {
    if (!this.selectedCountry || !this.input) ;
  },
  mounted () {
    this.setSelectedCountry();
  },
  watch: {
    modelValue: function(newVal){
      if(!this.input){
        let phone = newVal.replace('+254','');
        this.input = phone.replace('+1','');
      }
    }
  },
  methods: {
    updateValue: function () {
      let phone = this.input;
      phone = '-' + phone;
      phone = phone.replace('-0', '');
      phone = phone.replace('-', '');
      // this.input = phone
      if (this.selectedCountry) {
        phone = this.selectedCountry.dialCode + '' + phone;
      }
      this.$emit('update:modelValue', phone);
      this.flag = this.appUrl + 'flags/' + this.selectedCountry.isoCode.toLowerCase() + '.svg';
    },
    setSelectedCountry: function () {
      let countryCode = 'KE';
      if (this.country_code) {
        countryCode = this.country_code;
      }
      this.input = this.modelValue;
      const country = this.countries.find(function (country) {
        if (countryCode.toUpperCase() === country.isoCode) {
          return country
        }
      }, this);
      if (this.input) {
        if (!this.input.includes('+')) {
          this.input = '+' + this.input;
        }
        this.flag = this.appUrl + 'flags/' + country.isoCode.toLowerCase() + '.svg';
        this.input = this.input.replace(country.dialCode, '');
        this.input = this.input.replace(':', '');
        this.input = this.input.replace(':', '');
        this.input = this.input.replace(':', '');
        this.selectedCountry = country;
      }
    }
  }
};

const _hoisted_1$o = { class: "sh-phone mb-3" };
const _hoisted_2$e = {
  key: 0,
  style: {"display":"contents"}
};
const _hoisted_3$d = ["src"];
const _hoisted_4$d = ["value"];
const _hoisted_5$b = ["disabled"];

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$o, [
    ($data.selectedCountry)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$e, [
          vue.createElementVNode("img", { src: $data.flag }, null, 8 /* PROPS */, _hoisted_3$d),
          vue.createTextVNode(" " + vue.toDisplayString($data.selectedCountry.dialCode), 1 /* TEXT */)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.withDirectives(vue.createElementVNode("select", {
      onChange: _cache[0] || (_cache[0] = (...args) => ($options.updateValue && $options.updateValue(...args))),
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.selectedCountry) = $event)),
      class: "phone-country"
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.countries, (country) => {
        return (vue.openBlock(), vue.createElementBlock("option", {
          value: country,
          key: country.dialCode
        }, vue.toDisplayString(country.name + '(' + country.dialCode + ')'), 9 /* TEXT, PROPS */, _hoisted_4$d))
      }), 128 /* KEYED_FRAGMENT */))
    ], 544 /* NEED_HYDRATION, NEED_PATCH */), [
      [vue.vModelSelect, $data.selectedCountry]
    ]),
    vue.withDirectives(vue.createElementVNode("input", {
      type: "number",
      class: "phone-number",
      disabled: $props.disabled,
      "data-cy": "phone_input",
      onInput: _cache[2] || (_cache[2] = (...args) => ($options.updateValue && $options.updateValue(...args))),
      placeholder: "712345678",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (($data.input) = $event))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_5$b), [
      [vue.vModelText, $data.input]
    ])
  ]))
}

script$w.render = render$3;
script$w.__file = "src/lib/components/form-components/PhoneInput.vue";

const _hoisted_1$n = {
  key: 0,
  class: "dropdown sh-suggest"
};
const _hoisted_2$d = ["id"];
const _hoisted_3$c = { class: "sh-suggestions-holder" };
const _hoisted_4$c = { class: "badge bg-secondary m-1 sh-selected-item" };
const _hoisted_5$a = ["onClick"];
const _hoisted_6$9 = ["id"];
const _hoisted_7$8 = ["id", "aria-labelledby"];
const _hoisted_8$7 = ["onClick"];
const _hoisted_9$7 = {
  key: 1,
  class: "dropdown-item sh-suggest-no-results"
};
const _hoisted_10$7 = {
  key: 2,
  class: "dropdown-item sh-suggest-no-input"
};


var script$v = {
  __name: 'ShSuggest',
  props: ['data','allowMultiple','url','modelValue','optionTemplate'],
  emits: ['update:modelValue'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
let id = vue.ref(null);
vue.ref(null);
let suggestions = vue.ref(null);
let selectedSuggestions = vue.ref([]);
vue.onMounted(() => {
  id.value = 'sid' + (Math.random() + 1).toString(36).substring(7);
  resetData();
  if(props.url){
    fetchRemoteData();
  } else {
    initializeExisting();
  }
});
function resetData(){
  const data = props.data;
  if(data) {
    suggestions.value = data;
  }
}
function addSuggestion(sgn){
  let selected = selectedSuggestions.value;
  if(selected.length > 0 && !props.allowMultiple){
    selected = [];
  }
  if(!selected.includes(sgn)){
    selected.push(sgn);
    selectedSuggestions.value = selected;
  }
  updateModelValue();
  document.getElementById('input_' + id.value).innerHTML = '';
}
function updateModelValue(){
  let selectedItems = selectedSuggestions.value;
  if(selectedItems.length === 0) {
    emit('update:modelValue', null);
  }  else if (!props.allowMultiple) {
    emit('update:modelValue', selectedItems[0].id);
  } else {
    const ids = selectedItems.map(item => {
      return item.id
    });
    emit('update:modelValue', ids);
  }
  hideDropDown();
}
function removeSuggestion(sgt){
  selectedSuggestions.value  = selectedSuggestions.value.filter(selectedSgt=>{
    if(selectedSgt.id !== sgt) {
      return selectedSgt
    }
  });
  updateModelValue();
}
let searchText = vue.ref(null);
function filterData(e){
  showDropDown();
  let filterValue = e.target.innerText;
  searchText.value = filterValue;
  if (props.url) {
    fetchRemoteData();
  } else if(props.data) {
    suggestions.value = props.data.filter(item=>{
      if(item.name.toLowerCase().includes(filterValue.toLowerCase())){
        return item
      }
    });
  } else {
    console.log("Error: no data or url provided");
  }
}

const fetchRemoteData = ()=>{
  const data = {
    all: 1,
    filter_value: searchText.value,
  };
  shApis.doGet(props.url, data).then(res => {
    suggestions.value = res.data.data ?? res.data;
    initializeExisting(props.modelValue);
  }).catch(res => {
    console.log(res);
  });
};

const showDropDown = ()=>{
  let dropdownElem = document.getElementById('dropwdown_section' + id.value);
  if(!dropdownElem.classList.contains('show')){
    dropdownElem.classList.add('show');
  }
};
const hideDropDown = ()=>{
  let dropdownElem = document.getElementById('dropwdown_section' + id.value);
  if(dropdownElem.classList.contains('show')){
    dropdownElem.classList.remove('show');
  }
};

const initializeExisting = (currentValue)=>{
  if(currentValue && suggestions.value){
    if(props.allowMultiple){
      let selected = [];
      currentValue.forEach(id=>{
        let found = suggestions.value.find(sgt=>{
          return sgt.id === id
        });
        if(found){
          selected.push(found);
        }
      });
      selectedSuggestions.value = selected;
    } else {
      let found = suggestions.value.find(sgt=>{
        return sgt.id === currentValue
      });
      if(found){
        selectedSuggestions.value = [found];
      }
    }
  }
};
vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    initializeExisting(newValue);
  }
});

return (_ctx, _cache) => {
  return (vue.unref(id))
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$n, [
        vue.createElementVNode("div", {
          id: vue.unref(id),
          "data-bs-toggle": "dropdown",
          class: "p-0 d-flex sh-suggest-control dropdown-toggle",
          "aria-expanded": "false"
        }, [
          vue.createElementVNode("div", _hoisted_3$c, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(selectedSuggestions), (sgt) => {
              return (vue.openBlock(), vue.createElementBlock("h5", _hoisted_4$c, [
                vue.createTextVNode(vue.toDisplayString(sgt.name) + " ", 1 /* TEXT */),
                vue.createElementVNode("button", {
                  onClick: $event => (removeSuggestion(sgt.id)),
                  type: "button",
                  class: "btn-close border-start border-1 ms-1",
                  "aria-label": "Close"
                }, null, 8 /* PROPS */, _hoisted_5$a)
              ]))
            }), 256 /* UNKEYED_FRAGMENT */))
          ]),
          vue.createElementVNode("div", {
            id: 'input_' + vue.unref(id),
            contenteditable: "true",
            onInput: filterData,
            onChange: filterData,
            class: "flex-fill h-100 sh-suggestion-input"
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_6$9)
        ], 8 /* PROPS */, _hoisted_2$d),
        vue.createElementVNode("ul", {
          class: "dropdown-menu w-100",
          id: 'dropwdown_section' + vue.unref(id),
          "aria-labelledby": vue.unref(id)
        }, [
          (vue.unref(suggestions) && vue.unref(suggestions).length > 0)
            ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(suggestions), (suggestion) => {
                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: suggestion.id
                }, [
                  (suggestion.name)
                    ? (vue.openBlock(), vue.createElementBlock("li", {
                        key: 0,
                        onClick: $event => (addSuggestion(suggestion))
                      }, [
                        (__props.optionTemplate)
                          ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.optionTemplate), {
                              key: 0,
                              option: suggestion
                            }, null, 8 /* PROPS */, ["option"]))
                          : (vue.openBlock(), vue.createElementBlock("span", {
                              key: 1,
                              style: {"cursor":"pointer"},
                              class: vue.normalizeClass(["dropdown-item", vue.unref(selectedSuggestions).includes(suggestion) ? 'active':'']),
                              href: "#"
                            }, vue.toDisplayString(suggestion.name ?? suggestion.text), 3 /* TEXT, CLASS */))
                      ], 8 /* PROPS */, _hoisted_8$7))
                    : vue.createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            : (vue.unref(searchText))
              ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_9$7, " No results found "))
              : (vue.openBlock(), vue.createElementBlock("li", _hoisted_10$7, " Type to search... "))
        ], 8 /* PROPS */, _hoisted_7$8)
      ]))
    : vue.createCommentVNode("v-if", true)
}
}

};

script$v.__scopeId = "data-v-71cc9569";
script$v.__file = "src/lib/components/form-components/ShSuggest.vue";

var script$u = {
  name: 'ShForm',
  components: {
    PhoneInput: script$w,
    ShSuggest: script$v,
    ShPhone: script$w
  },
  props: [
      'action',
    'classes',
    'hasTerms',
    'country_code',
    'submitBtnClass',
      'retainModal',
    'fields',
    'columns', 'placeholders', 'field_permissions', 'retainDataAfterSubmission',
    'currentData', 'actionLabel', 'fillSelects', 'phones', 'successCallback',
    'failedCallback', 'labels', 'editors',
    'datePickers',
      'textAreas',
      'files',
      'phones',
      'numbers',
      'customComponent',
      'successMessage'
  ],
  data: function () {
    return {
      form_elements: {},
      errorStatusCode: 0,
      errorText: null,
      form_errors: {},
      form_status: 0,
      error_res: null,
      form_files: {},
      exiting_fields: [],
      selectData: {},
      users: [],
      allPlaceHolders: {},
      user: null,
      allLabels: {},
      suggests: []
    }
  },
  methods: {
    getSubmitBtnClass: function () {
      const btnClass = this.submitBtnClass;
      if (!btnClass) {
        return 'btn btn-primary mt-2'
      } else {
        return btnClass
      }
    },
    getColumns: function () {
      let cols = parseFloat(this.columns);
      if (!cols) {
        cols = 1;
      }
      const allowedColumns = [1, 2, 3, 4, 6, 12];
      if (!allowedColumns.includes(cols)) {
        return '12'
      } else {
        return 12 / parseFloat(cols)
      }
    },
    getFieldType: function (field) {
      if(this.customComponent && this.customComponent[field]){
        return 'component'
      }
      if(this.suggests && this.suggests[field]){
        // alert('found')
        return 'suggest'
      }
      if(this.editors && this.editors.includes(field)){
        return 'editor'
      }
      if(this.textAreas && this.textAreas.includes(field)){
        return 'textarea'
      }
      if(this.datePickers && this.datePickers.includes(field)){
        return 'datepicker'
      }
      if(this.numbers && this.numbers.includes(field)){
        return 'numeric'
      }
      if(this.files && this.files.includes(field)){
        return 'file'
      }
      if(this.fillSelects && this.fillSelects[field]){
        return 'select';
      }
      const textareas = ['message', 'meta_description', 'comment', 'call_response', 'comments', 'description'];
      const selects = ['gender', 'payment_method', 'allow_view_mode', 'reasons_name', 'has_free_tier', 'payment_period', 'role', 'register_as', 'account_type'];
      const numbers = ['age'];
      const datePickers = ['free_tier_days', 'recurring_date', 'date', 'paid_at'];
      let realEditors = ['html_content', 'listing_description', 'mail', 'comment'];
      const mapLocations = ['building_location'];
      const phones = ['phone'];
      if (this.selectData[field]) {
        return 'select'
      }
      if (field === 'email') {
        return 'email'
      }
      if (field.includes('password')) {
        return 'password'
      }
      if (textareas.includes(field)) {
        return 'textarea'
      }
      if (phones.includes(field)) {
        return 'phone'
      }
      if (mapLocations.includes(field)) {
        return 'location'
      }
      if (realEditors.includes(field)) {
        return 'editor'
      }
      if (numbers.includes(field)) {
        // alert('found')
        return 'numeric'
      }
      if (datePickers.includes(field)) {
        return 'datepicker'
      }
      if (selects.includes(field)) {
        return 'select'
      }
      if (typeof this.files === 'array' && this.files.includes(field)) {
        return 'file'
      }
      return 'text'
    },
    getLabel: function (field) {
      if (field in this.allLabels) {
        return this.allLabels[field]
      } else {
        return field.replace(/_/g, ' ')
      }
    },
    isDisabled: function (field) {
      if (typeof this.field_permissions === 'undefined') {
        return false
      }
      if (typeof this.user.isAllowedTo !== 'undefined') {
        return !this.user.isAllowedTo(this.field_permissions[field])
      }
      return true
    },
    validateEssentials: function () {
      if (this.fields.includes('password_confirmation')) {
        if (!this.form_elements.password) {
          this.form_errors = {
            password: ['Password field is required']
          };
          return false
        } else
        if (this.form_elements.password !== this.form_elements.password_confirmation) {
          this.form_errors = {
            password: ['Password confirmation does not match']
          };
          return false
        }
      }
    },
    hideError: function (){
      this.form_status = 0;
    },
    closeModal: function () {
      document.body.style = '';
      setTimeout(() => {
        const form = this.$refs.ShAutoForm;
        if(form){
          const modal = form.closest('.modal-dialog');
          if(modal){
            const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]');
            closeBtn && closeBtn.click();
          }
        } else {
          //form was mysteriously unmounted! try remove any modal backdrop if possible
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if(modalBackdrop) {
            if(!document.querySelector('.modal.show')){
              modalBackdrop.remove();
            }
          }
        }
        this.form_status = 0;
      }, 1500);
    },
    submitForm: async function () {
      this.errorText = null;
      // return false;
      // if (!this.validateEssentials()) {
      //   return false
      // }
      NProgress__default["default"].start();
      this.form_status = 1;
      const data = new FormData();
      console.log(this.form_elements);
      Object.keys(this.form_elements).forEach(key => {
        if (typeof this.form_elements[key] === 'object') {
          data.append(key, JSON.stringify(this.form_elements[key]));
        } else if (typeof this.form_elements[key] !== 'undefined') { data.append(key, this.form_elements[key]); }
      });
      Object.keys(this.form_files).forEach(key => {
        data.append(key, this.form_files[key].value);
      });
      shApis.doPost(this.action, data).then(res => {
        // console.log(res)
        this.form_status = 2;
        Object.keys(this.form_elements).forEach(key => {
          this.form_errors[key] = null;
          if (!this.retainDataAfterSubmission) {
            this.form_elements[key] = '';
          }
        });
        Object.keys(this.form_files).forEach(key => {
          this.form_errors[key] = null;
        });
        this.$emit('formSubmitted',res.data);
        this.$emit('success',res.data);
        if(this.successMessage){
          shRepo.showToast(this.successMessage);
        }
        if (this.successCallback) {
          if (typeof this.successCallback === 'function') {
            this.successCallback(res.data);
          } else {
            this.$emit(this.successCallback, res.data);
          }
        }
        this.$emit('success',res.data);
        NProgress__default["default"].done();
        if (!this.retainModal) {
          this.closeModal();
        }
      }).catch((reason, data) => {
        NProgress__default["default"].done();
        this.form_status = 3;
        if (typeof reason !== 'undefined') {
          if (typeof reason.response !== 'undefined') {
            this.setErrors(reason.response, reason.message);
          } else {
            console.log('catch error');
            console.log(reason);
          }
        } else {
          console.log(reason);
        }
      });
      return false
    },
    removeErrors: function (field) {
      this.form_errors[field] = null;
      this.form_status = 0;
    },
    setErrors: function (reason, message) {
      console.log(reason,message);
      if (reason.status === 422) { // change this to 422 validation error response as received from laravel
        this.form_errors = reason.data.errors;
        this.errorText = 'Fill all the details correctly';
      } else {
        this.errorText = message;
      }
    },
    handleFileUpload: function (key) {
      this.form_files[key].value = event.target.files[0];
    },
    setCurrentData: function () {
      this.exiting_fields = [];
      if (this.currentData) {
        this.exiting_fields = this.currentData;
      }
      this.form_elements.id = this.exiting_fields.id;
      this.fields.forEach(field => {
        if (this.getFieldType(field) === 'file') {
          this.form_files[field] = { key: 'file', value: null };
        } else {
          if (this.exiting_fields[field] !== null) {
            this.form_elements[field] = this.exiting_fields[field];
          } else {
            this.form_elements[field] = '';
          }
        }
        this.form_errors[field] = null;
      });
    }
  },
  mounted: async function () {
    const selectData = {};
    if (this.fillSelects) {
      Object.keys(this.fillSelects).forEach(key => {
        if(this.fillSelects[key].suggest || this.fillSelects[key].suggests) {
          if (!this.suggests) {
            this.suggests = [];
          }
          this.suggests[key] = this.fillSelects[key];
        } else if (this.fillSelects[key].data) {
          this.selectData[key] = this.fillSelects[key].data;
        } else {
          shApis.doGet(this.fillSelects[key].url, { all: 1 }).then(res => {
            this.selectData[key] = res.data.data ?? res.data;
          }).catch(res => {
            console.log(res);
          });
        }
      });
      console.log(selectData);
    }
  },
  created: function () {
    console.log('created');
    if (this.labels) {
      this.allLabels = this.labels;
    }
    this.setCurrentData();
    if (this.placeholders) {
      this.allPlaceHolders = this.placeholders;
    }
  },
  watch: {
    currentData: function () {
      this.setCurrentData();
    }
  }
};

const _hoisted_1$m = /*#__PURE__*/vue.createElementVNode("h5", { class: "d-none" }, null, -1 /* HOISTED */);
const _hoisted_2$c = {
  ref: "ShAutoForm",
  class: "sh-form"
};
const _hoisted_3$b = {
  key: 0,
  class: "alert alert-danger alert-dismissible fade show sh-form-submission-error",
  role: "alert"
};
const _hoisted_4$b = /*#__PURE__*/vue.createElementVNode("i", { class: "bi-exclamation-triangle-fill me-1" }, null, -1 /* HOISTED */);
const _hoisted_5$9 = { key: 0 };
const _hoisted_6$8 = { key: 1 };
const _hoisted_7$7 = { class: "row" };
const _hoisted_8$6 = { class: "fg-label control-label text-capitalize control-bel col-md-12 request-form-label mb-2" };
const _hoisted_9$6 = { class: "col-md-12" };
const _hoisted_10$6 = ["data-cy", "placeholder", "name", "onFocus", "onChange"];
const _hoisted_11$6 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_12$4 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_13$4 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_14$4 = ["data-cy", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_15$3 = ["disabled", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_16$3 = ["name", "onFocus", "onUpdate:modelValue"];
const _hoisted_17$3 = ["name", "onFocus", "onUpdate:modelValue"];
const _hoisted_18$3 = ["value"];
const _hoisted_19$1 = {
  key: 11,
  class: "invalid-feedback"
};
const _hoisted_20$1 = {
  key: 1,
  class: "row"
};
const _hoisted_21$1 = /*#__PURE__*/vue.createElementVNode("h5", null, "Confirm and Submit", -1 /* HOISTED */);
const _hoisted_22$1 = /*#__PURE__*/vue.createElementVNode("p", null, [
  /*#__PURE__*/vue.createTextVNode("By clicking submit, you agree to our "),
  /*#__PURE__*/vue.createElementVNode("a", {
    target: "_blank",
    href: "/"
  }, "terms and conditions"),
  /*#__PURE__*/vue.createTextVNode(" and that you have read our "),
  /*#__PURE__*/vue.createElementVNode("a", {
    target: "_blank",
    href: "https://hauzisha.co.ke/privacy-policy"
  }, "privacy policy")
], -1 /* HOISTED */);
const _hoisted_23$1 = [
  _hoisted_21$1,
  _hoisted_22$1
];
const _hoisted_24$1 = /*#__PURE__*/vue.createElementVNode("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_phone_input = vue.resolveComponent("phone-input");
  const _component_ShSuggest = vue.resolveComponent("ShSuggest");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    _hoisted_1$m,
    vue.createElementVNode("form", _hoisted_2$c, [
      vue.createCommentVNode("    <div v-if=\"form_status == 1\" class=\"alert alert-info\">Processing...</div>"),
      vue.createCommentVNode("    <div v-if=\"form_status == 2\" class=\"alert alert-success\">Success</div>"),
      (_ctx.form_status == 3)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$b, [
            _hoisted_4$b,
            (_ctx.errorText)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$9, vue.toDisplayString(_ctx.errorText), 1 /* TEXT */))
              : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$8, "Unexpected Error Occurred")),
            vue.createCommentVNode("      <button @click=\"hideError\" type=\"button\" class=\"btn-close\" aria-label=\"Close\"></button>")
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createElementVNode("input", {
        type: "hidden",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.form_elements['id']) = $event))
      }, null, 512 /* NEED_PATCH */), [
        [vue.vModelText, _ctx.form_elements['id']]
      ]),
      vue.createElementVNode("div", _hoisted_7$7, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.fields, (field) => {
          return (vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(["form-group", 'col-md-' + $options.getColumns()]),
            key: field
          }, [
            vue.createElementVNode("label", _hoisted_8$6, vue.toDisplayString($options.getLabel(field)), 1 /* TEXT */),
            vue.createElementVNode("div", _hoisted_9$6, [
              ($options.getFieldType(field) === 'component')
                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.customComponent[field]), {
                    key: 0,
                    "data-cy": field,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    modelValue: _ctx.form_elements[field],
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                  }, null, 40 /* PROPS, NEED_HYDRATION */, ["data-cy", "placeholder", "name", "onFocus", "class", "modelValue", "onUpdate:modelValue"]))
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'file')
                ? (vue.openBlock(), vue.createElementBlock("input", {
                    key: 1,
                    "data-cy": field,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    ref_for: true,
                    ref: 'file_'+field,
                    onChange: $event => ($options.handleFileUpload(field)),
                    type: "file"
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_10$6))
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'numeric')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 2,
                    "data-cy": field,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    type: "number"
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_11$6)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'password')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 3,
                    "data-cy": field,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    type: "password"
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_12$4)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'email')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 4,
                    "data-cy": field,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    type: "email",
                    required: ""
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_13$4)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'datepicker' && $options.isDisabled(field) === false)
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 5,
                    "data-cy": field,
                    type: "datetime-local",
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control active"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_14$4)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'phone')
                ? (vue.openBlock(), vue.createBlock(_component_phone_input, {
                    key: 6,
                    country_code: $props.country_code,
                    placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    modelValue: _ctx.form_elements[field],
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    required: ""
                  }, null, 8 /* PROPS */, ["country_code", "placeholder", "name", "onFocus", "class", "modelValue", "onUpdate:modelValue"]))
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'suggest')
                ? (vue.openBlock(), vue.createBlock(_component_ShSuggest, {
                    key: 7,
                    "select-data": _ctx.selectData[field],
                    "fill-selects": $props.fillSelects[field],
                    class: vue.normalizeClass(_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field),
                    modelValue: _ctx.form_elements[field],
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    url: _ctx.suggests[field].url ?? false,
                    data: _ctx.suggests[field].data ?? false
                  }, null, 8 /* PROPS */, ["select-data", "fill-selects", "class", "modelValue", "onUpdate:modelValue", "url", "data"]))
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'text')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                    key: 8,
                    disabled: $options.isDisabled(field),
                    placeholder: field === 'phone_number' ? 'e.g 0712 345 678':'',
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                    type: "text"
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_15$3)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'textarea')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
                    key: 9,
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                  }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_16$3)), [
                    [vue.vModelText, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              ($options.getFieldType(field) === 'select')
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
                    key: 10,
                    name: field,
                    onFocus: $event => ($options.removeErrors(field)),
                    class: vue.normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                    "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.selectData[field], (item) => {
                      return (vue.openBlock(), vue.createElementBlock("option", {
                        key: item.id,
                        value: item.id
                      }, vue.toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_18$3))
                    }), 128 /* KEYED_FRAGMENT */))
                  ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_17$3)), [
                    [vue.vModelSelect, _ctx.form_elements[field]]
                  ])
                : vue.createCommentVNode("v-if", true),
              (_ctx.form_errors[field] != null )
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_19$1, vue.toDisplayString(_ctx.form_errors[field][0]), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true)
            ])
          ], 2 /* CLASS */))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      ($props.hasTerms)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_20$1, [..._hoisted_23$1]))
        : vue.createCommentVNode("v-if", true),
      (_ctx.form_status == 1)
        ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 2,
            class: vue.normalizeClass(["btn btn-primary", $options.getSubmitBtnClass()]),
            type: "button",
            disabled: ""
          }, [
            _hoisted_24$1,
            vue.createTextVNode(" Processing... ")
          ], 2 /* CLASS */))
        : (vue.openBlock(), vue.createElementBlock("button", {
            key: 3,
            "data-cy": "sh_form_submit",
            class: vue.normalizeClass(["mb-2 form-submit-btn", $options.getSubmitBtnClass()]),
            type: "button",
            onClick: _cache[1] || (_cache[1] = (...args) => ($options.submitForm && $options.submitForm(...args)))
          }, vue.toDisplayString($props.actionLabel ? $props.actionLabel:'Submit'), 3 /* TEXT, CLASS */))
    ], 512 /* NEED_PATCH */)
  ], 64 /* STABLE_FRAGMENT */))
}

script$u.render = render$2;
script$u.__file = "src/lib/components/ShForm.vue";

var script$t = {
  __name: 'EmailInput',
  props: ['modelValue','label'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});
vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});

return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    type: "email",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$t.__file = "src/lib/components/form-components/EmailInput.vue";

const _hoisted_1$l = ["min", "max"];


var script$s = {
  __name: 'NumberInput',
  props: ['modelValue','label','min','max'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});
vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});

return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    min: __props.min,
    max: __props.max,
    type: "number",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1$l)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$s.__file = "src/lib/components/form-components/NumberInput.vue";

var script$r = {
  __name: 'TextInput',
  props: ['modelValue','label','isInvalid'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});

vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});


return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    type: "text",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$r.__file = "src/lib/components/form-components/TextInput.vue";

var script$q = {
  __name: 'TextAreaInput',
  props: ['modelValue','label'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});
vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});

return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
    type: "text",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$q.__file = "src/lib/components/form-components/TextAreaInput.vue";

const _hoisted_1$k = ["value"];


var script$p = {
  __name: 'SelectInput',
  props: ['modelValue','label','url','required','options','dataUrl','data'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);
const selectOptions = vue.ref(null);
const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  console.log(props);
  props.modelValue && (inputModel.value = props.modelValue);
  const options = props.data ?? props.options;
  if(options){
    selectOptions.value = options.map(item=>{
      return {
        id: typeof item.id !== 'undefined' ? item.id : item.key ? item.key : item.value ? item.value:item.name ? item.name:item.label,
        name: item.label ? item.label : item.name ? item.name : item.value ? item.value:item.id ? item.id:item.option
      }
    });
  } else if (props.dataUrl || props.url) {
    shApis.doGet(props.dataUrl ??  props.url,{all:1}).then(res=>{
      selectOptions.value = res.data.map(item=>{
        return {
          id: item.id ? item.id : item.key ? item.key : item.value ? item.value:item.name ? item.name:item.label,
          name: item.label ? item.label : item.name ? item.name : item.value ? item.value:item.id ? item.id:item.option
        }
      });
    }).catch(ex=>{
      console.log(ex);
    });
  }
});
vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});

return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(selectOptions.value, (option) => {
      return (vue.openBlock(), vue.createElementBlock("option", {
        key: option.id,
        value: option.id
      }, vue.toDisplayString(option.name), 9 /* TEXT, PROPS */, _hoisted_1$k))
    }), 128 /* KEYED_FRAGMENT */))
  ], 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelSelect, inputModel.value]
  ])
}
}

};

script$p.__file = "src/lib/components/form-components/SelectInput.vue";

var script$o = {
  __name: 'PasswordInput',
  props: ['modelValue','label'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});


return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    type: "password",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$o.__file = "src/lib/components/form-components/PasswordInput.vue";

var script$n = {
  __name: 'DateInput',
  props: ['modelValue','label','isInvalid'],
  emits: ['update:modelValue','clearValidationErrors'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const inputModel = vue.ref(null);

const modelValueUpdated = (e) => {
  emit('clearValidationErrors');
  emit('update:modelValue',inputModel);
};
vue.onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue);
});

vue.watch(()=>props.modelValue, (newValue)=>{
  if(newValue) {
    inputModel.value = newValue;
  }
});


return (_ctx, _cache) => {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
    type: "datetime-local",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((inputModel).value = $event)),
    onChange: modelValueUpdated,
    onKeydown: modelValueUpdated,
    onUpdated: modelValueUpdated
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [
    [vue.vModelText, inputModel.value]
  ])
}
}

};

script$n.__file = "src/lib/components/form-components/DateInput.vue";

const _hoisted_1$j = /*#__PURE__*/vue.createElementVNode("div", null, null, -1 /* HOISTED */);
const _hoisted_2$b = ["onUpdate:modelValue"];
const _hoisted_3$a = ["innerHTML"];
const _hoisted_4$a = {
  key: 0,
  class: "text-danger sh-required"
};
const _hoisted_5$8 = ["innerHTML"];
const _hoisted_6$7 = {
  key: 2,
  class: "form-notch"
};
const _hoisted_7$6 = /*#__PURE__*/vue.createElementVNode("div", { class: "form-notch-leading" }, null, -1 /* HOISTED */);
const _hoisted_8$5 = /*#__PURE__*/vue.createElementVNode("div", { class: "form-notch-middle" }, null, -1 /* HOISTED */);
const _hoisted_9$5 = /*#__PURE__*/vue.createElementVNode("div", { class: "form-notch-trailing" }, null, -1 /* HOISTED */);
const _hoisted_10$5 = [
  _hoisted_7$6,
  _hoisted_8$5,
  _hoisted_9$5
];
const _hoisted_11$5 = ["innerHTML"];
const _hoisted_12$3 = ["disabled"];
const _hoisted_13$3 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
const _hoisted_14$3 = { key: 1 };


var script$m = {
  __name: 'ShAutoForm',
  props: [
  'action', 'successCallback', 'retainDataAfterSubmission',
  'successMessage', 'fields', 'customComponents', 'placeHolders',
  'formClasses',
  'helperTexts', 'labels', 'data',
  'fillSelects',
  'formClass',
  'actionLabel',
  'textAreas',
  'currentData',
  'emails',
  'phones', 'numbers', 'selects', 'dates', 'gqlMutation',
    'required'
],
  emits: ['success','preSubmit', 'fieldChanged', 'formSubmitted', 'formError'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const formFields = vue.ref([]);
const getFieldComponent = (fieldObj) => {
  if (fieldObj.component) {
    return fieldObj.component
  }
  const field = fieldObj.field ?? fieldObj.name;
  const defaultTextareas = ['message', 'meta_description', 'comment', 'call_response', 'comments', 'description'];
  const defaultNumbers = ['age'];
  const defaultDates = ['free_tier_days', 'recurring_date', 'date', 'paid_at'];
  const passwords = ['password', 'password_confirmation', 'pin'];
  const defaultPhones = ['phone'];
  const defaultEmails = ['email'];
  const formComponents = vue.inject('formComponents');
  const TextComponent = formComponents.text ?? script$r;
  const TextAreaComponent = formComponents.textArea ?? script$q;
  const EmailComponent = formComponents.email ?? script$t;
  const PhoneComponent = formComponents.phone ?? script$w;
  const NumberComponent = formComponents.number ?? script$s;
  const SelectComponent = formComponents.select ?? script$p;
  const PasswordComponent = formComponents.password ?? script$o;
  if (props.customComponents && props.customComponents[field]) {
    return props.customComponents[field]
  }
  if (props.fillSelects && props.fillSelects[field]) {
    Object.assign(fieldObj, props.fillSelects[field]);
    if (fieldObj.suggests || fieldObj.suggest) {
      fieldObj.type = 'suggests';
    } else {
      fieldObj.type = 'select';
    }
  }
  if(fieldObj.suggests || fieldObj.suggest){
    fieldObj.type = 'suggests';
  }

  if (fieldObj.type) {
    if (fieldObj.type === 'suggest' || fieldObj.type === 'suggests') {
      return script$v
    }
    return fieldObj.type === 'number' ? NumberComponent : fieldObj.type === 'textarea' ? TextAreaComponent : fieldObj.type === 'email' ? EmailComponent : fieldObj.type === 'phone' ? PhoneComponent : fieldObj.type === 'password' ? PasswordComponent : fieldObj.type === 'select' ? SelectComponent : TextComponent
  } else if (passwords.includes(field)) {
    return PasswordComponent
  } else if ((props.textAreas && props.textAreas.includes(field)) || defaultTextareas.includes(field)) {
    return formComponents.textArea ?? script$q
  } else if ((props.emails && props.emails.includes(field)) || defaultEmails.includes(field)) {
    return formComponents.email ?? script$t
  } else if ((props.phones && props.phones.includes(field)) || defaultPhones.includes(field)) {
    return formComponents.phone ?? script$w
  } else if ((props.numbers && props.numbers.includes(field)) || defaultNumbers.includes(field)) {
    return formComponents.number ?? script$s
  }
  // else
  // if((props.selects && props.selects.includes(field)) || defaultSelects.includes(field)){
  //   return formComponents.select ?? SelectInput
  // } else
  if((props.dates && props.dates.includes(field)) || defaultDates.includes(field)){
    return formComponents.date ?? script$n
  }
  return formComponents.text ?? script$r
};
const shFormElementClasses = vue.ref(null);
shFormElementClasses.value = vue.inject('shFormElementClasses');
const shAutoForm = vue.ref(null);
const closeModal = e => {
  setTimeout(() => {
    const modal = shAutoForm.value.closest('.modal-dialog');
    if (modal) {
      const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]');
      closeBtn && closeBtn.click();
    }
  }, 1500);
};
const getLabel = field => (props.labels && (props.labels[field] !== undefined)) ? props.labels[field] : ___default["default"].startCase(___default["default"].camelCase(field));
const getComponentClass = field => validationErrors.value[field] ? getElementClass('formControl') + ' is-invalid' : getElementClass('formControl');
const getHelperText = field => (props.helperTexts && props.helperTexts[field]) ? props.helperTexts[field] : false;
const getElementClass = section => (props.formClasses && props.formClasses[section]) ? props.formClasses[section] : shFormElementClasses.value[section] ?? ___default["default"].snakeCase(section).replace(/_/gi, '-');
const getPlaceholder = field => (props.placeHolders && props.placeHolders[field]) && props.placeHolders[field];
const fieldChanged = field => {
  delete validationErrors.value[field];
  emit('fieldChanged', field, formFields.value.filter(f => f.field === field)[0].value);
};
const getComponentProps = field => {
  const newField = {...field};
  delete newField.component;
  delete newField.value;
  return newField
};
const isFloating = getElementClass('formGroup').includes('form-floating');
const loading = vue.ref(false);
const submitBtn = vue.ref(false);
const validationErrors = vue.ref({});
const formError = vue.ref(null);
const submitForm = e => {
  submitBtnWidth.value = submitBtn.value.getBoundingClientRect().width + 'px !important';
  validationErrors.value = {};
  e.preventDefault();
  loading.value = true;
  const data = {};
  formFields.value.map(field => {
    data[field.field] = field.value;
  });
  if (props.gqlMutation) {
    let args = `(`;
    let selectFields = Object.keys(data);
    selectFields.forEach(key => {
      if (data[key]) {
        args += `${key}: "${data[key]}",`;
      }
    });
    args += `)`;
    args = args.replace(',)', ')');
    if (args == '()') {
      args = '';
    }
    emit('preSubmit', data);
    const mutation = `{\n${props.gqlMutation} ${args} {\n${selectFields.join(`\n`)}\n}\n}`;
    shApis.graphQlMutate(mutation).then(res => handleSuccessRequest(res)).catch(reason => handlefailedRequest(reason));
  } else {
    shApis.doPost(props.action, data).then(res => handleSuccessRequest(res)).catch(reason => handlefailedRequest(reason));
  }
  return false
};

const handleSuccessRequest = res => {
  loading.value = false;
  emit('formSubmitted', res.data);
  emit('success', res.data);
  props.successMessage && shRepo.showToast(props.successMessage);
  props.successCallback && props.successCallback(res.data);
  !props.retainDataAfterSubmission && formFields.value.map(field => field.value = null);
  closeModal();
};

const handlefailedRequest = reason => {
  loading.value = false;
  const httpStatus = reason.response ? reason.response.status : 0;
  formError.value = httpStatus === 422 ? formError.value = null : reason.message ?? null;
  let httpErrors = {};
  httpStatus === 422 && typeof reason.response.data.errors === 'object' && (httpErrors = reason.response.data.errors);
  if (httpErrors && reason.response) {
    Object.keys(httpErrors).map(key => validationErrors.value[key] = typeof httpErrors[key] === 'string' ? httpErrors[key] : httpErrors[key][0]);
  }
  (httpStatus !== 422 && formError.value) && shRepo.showToast(formError.value, 'error');
  validationErrors.value;
};
const submitBtnWidth = vue.ref(null);
const setExistingData = (existingData) => {
  console.log(existingData,props);
  if (existingData) {
    const newFields = formFields.value.map(fl => {
      if (existingData[fl.field]) {
        fl.value = existingData[fl.field];
      }
      return fl
      // console.log(fl)
      // console.log(field, existingData)
      // existingData[field.field] && (field.value = existingData[field.field])
    });
    formFields.value = null;
    formFields.value = newFields;
  }
};
vue.watch(() => props.currentData, (newData) => {
  setExistingData(newData);
});
vue.onMounted((ev) => {
  console.log(props);
  props.fields && props.fields.map(field => {
    let fieldObj = {};
    if (typeof field === 'object') {
      fieldObj = {...field};
      fieldObj.field = fieldObj.field ?? fieldObj.name;
      // fieldObj.label && getLabel(fieldObj.field)
      fieldObj.helper = fieldObj.helperText ?? fieldObj.helper;
      // !fieldObj.helper && fieldObj.helperText ? fieldObj.helper = fieldObj.helperText : fieldObj.helper = getHelperText(fieldObj.field)
      // fieldObj.helperText === undefined && ()
      fieldObj.label = fieldObj.label ?? getLabel(fieldObj.field ?? fieldObj.name);
      // fieldObj.placeholder && fieldObj.placeHolder && getPlaceholder(fieldObj.field)
      fieldObj.value = null;
    } else {
      fieldObj = {
        field: field, label: getLabel(field),
        helper: getHelperText(field),
        placeholder: getPlaceholder(field),
        value: null
      };

      if(props.fillSelects && props.fillSelects[fieldObj.field]){
        Object.assign(fieldObj, props.fillSelects[fieldObj.field]);
      }
    }
    if(props.required && props.required.includes(fieldObj.field)){
      fieldObj.required = true;
    }
    formFields.value.push(fieldObj);
    formFields.value.push({
      field: 'id',
      type: 'hidden'
      // label: 'IF'
    });
  });
  setExistingData(props.currentData);
});


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    _hoisted_1$j,
    vue.createElementVNode("form", {
      class: vue.normalizeClass([__props.formClass, "sh-auto-form"]),
      ref_key: "shAutoForm",
      ref: shAutoForm,
      onSubmit: _cache[0] || (_cache[0] = e => submitForm(e))
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(formFields.value, (field, index) => {
        return (vue.openBlock(), vue.createElementBlock("div", {
          key: field,
          class: vue.normalizeClass(getElementClass('formGroup'))
        }, [
          (field.type === 'hidden')
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                key: 0,
                type: "hidden",
                "onUpdate:modelValue": $event => ((formFields.value[index].value) = $event)
              }, null, 8 /* PROPS */, _hoisted_2$b)), [
                [vue.vModelText, formFields.value[index].value]
              ])
            : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                (!vue.unref(isFloating) && field.label)
                  ? (vue.openBlock(), vue.createElementBlock("label", {
                      key: 0,
                      class: vue.normalizeClass(getElementClass('formLabel'))
                    }, [
                      vue.createElementVNode("span", {
                        innerHTML: field.label,
                        class: "sh-label"
                      }, null, 8 /* PROPS */, _hoisted_3$a),
                      (field.required)
                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$a, "*"))
                        : vue.createCommentVNode("v-if", true)
                    ], 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(getFieldComponent(field)), vue.mergeProps(getComponentProps(field), {
                  isInvalid: typeof validationErrors.value[field.field] !== 'undefined',
                  onClick: $event => (fieldChanged(field.field)),
                  "onUpdate:modelValue": [$event => (fieldChanged(field.field)), $event => ((formFields.value[index].value) = $event)],
                  modelValue: formFields.value[index].value,
                  class: getComponentClass(field.field)
                }), null, 16 /* FULL_PROPS */, ["isInvalid", "onClick", "onUpdate:modelValue", "modelValue", "class"])),
                (vue.unref(isFloating) && field.label)
                  ? (vue.openBlock(), vue.createElementBlock("label", {
                      key: 1,
                      class: vue.normalizeClass(getElementClass('formLabel')),
                      innerHTML: field.label
                    }, null, 10 /* CLASS, PROPS */, _hoisted_5$8))
                  : vue.createCommentVNode("v-if", true),
                (vue.unref(isFloating))
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6$7, [..._hoisted_10$5]))
                  : vue.createCommentVNode("v-if", true),
                (field.helper)
                  ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 3,
                      class: vue.normalizeClass(getElementClass('helperText')),
                      innerHTML: field.helper
                    }, null, 10 /* CLASS, PROPS */, _hoisted_11$5))
                  : vue.createCommentVNode("v-if", true),
                (validationErrors.value[field.field])
                  ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 4,
                      class: vue.normalizeClass(getElementClass('invalidFeedback'))
                    }, vue.toDisplayString(validationErrors.value[field.field]), 3 /* TEXT, CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ], 64 /* STABLE_FRAGMENT */))
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */)),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(getElementClass('formGroup'))
      }, [
        vue.createElementVNode("button", {
          style: vue.normalizeStyle({width: submitBtnWidth.value}),
          ref_key: "submitBtn",
          ref: submitBtn,
          disabled: loading.value,
          class: vue.normalizeClass(getElementClass('actionBtn'))
        }, [
          (loading.value)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_13$3))
            : vue.createCommentVNode("v-if", true),
          (!loading.value)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14$3, "Submit"))
            : vue.createCommentVNode("v-if", true)
        ], 14 /* CLASS, STYLE, PROPS */, _hoisted_12$3)
      ], 2 /* CLASS */),
      vue.renderSlot(_ctx.$slots, "default")
    ], 34 /* CLASS, NEED_HYDRATION */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$m.__file = "src/lib/components/ShAutoForm.vue";

const _hoisted_1$i = /*#__PURE__*/vue.createElementVNode("h5", { class: "d-none" }, "To prevent default class", -1 /* HOISTED */);
const _hoisted_2$a = { class: "dropdown" };

var script$l = {
  __name: 'ShDropDownForm',
  props: ['action',
  'classes',
  'hasTerms',
  'country_code',
  'submitBtnClass',
  'fields',
  'columns', 'placeholders', 'field_permissions', 'retainDataAfterSubmission',
  'currentData', 'actionLabel', 'fillSelects', 'phones', 'successCallback',
  'failedCallback', 'labels', 'editors',
  'datePickers',
  'textAreas',
  'files',
  'phones',
  'numbers',
  'customComponent','modalTitle','class'],
  setup(__props) {

const props = __props;

vue.ref(props);
let btnClass=props.class;
const dropdownId = 'rand' + (Math.random() + 1).toString(36).substring(2);


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    _hoisted_1$i,
    vue.createElementVNode("div", _hoisted_2$a, [
      vue.createElementVNode("a", {
        class: vue.normalizeClass(vue.unref(btnClass)),
        href: "#",
        role: "button",
        id: dropdownId,
        "data-bs-toggle": "dropdown",
        "data-bs-auto-close": "outside",
        "aria-expanded": "false"
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2 /* CLASS */),
      vue.createElementVNode("div", {
        class: "dropdown-menu px-2 py-1",
        "aria-labelledby": dropdownId
      }, [
        vue.createVNode(script$u, vue.normalizeProps(vue.guardReactiveProps(props)), null, 16 /* FULL_PROPS */)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$l.__file = "src/lib/components/ShDropDownForm.vue";

const _hoisted_1$h = ["id"];
const _hoisted_2$9 = { class: "modal-content sh-modal-content" };
const _hoisted_3$9 = { class: "modal-header" };
const _hoisted_4$9 = { class: "modal-title flex-fill" };
const _hoisted_5$7 = /*#__PURE__*/vue.createElementVNode("button", {
  class: "btn btn-danger btn-sm",
  "data-bs-dismiss": "modal",
  "data-dismiss": "modal"
}, "×", -1 /* HOISTED */);
const _hoisted_6$6 = { class: "modal-body" };
const _hoisted_7$5 = { class: "section" };


var script$k = {
  __name: 'ShModal',
  props: {
    modalId: {
        required: true,
        type: String
    },
    modalTitle: {
        type: String
    },
    modalSize: {
        type: String
    },
    Static: {
        type: Boolean,
        default: false
    },
    bsKeyboard: {
        type: Boolean,
        default: true
    }
},
  emits: ['modalClosed'],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const props = __props;
vue.onMounted(() => {
    const modal = document.getElementById(props.modalId);
    modal.addEventListener('hidden.bs.modal', event => {
        event.target.id == props.modalId && emit('modalClosed');
    });
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: "modal sh-modal fade",
    id: __props.modalId,
    "aria-hidden": "true"
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(["modal-dialog sh-modal-dialog", `modal-${__props.modalSize}`])
    }, [
      vue.createElementVNode("div", _hoisted_2$9, [
        vue.createElementVNode("div", _hoisted_3$9, [
          vue.createElementVNode("h3", _hoisted_4$9, vue.toDisplayString(__props.modalTitle), 1 /* TEXT */),
          _hoisted_5$7
        ]),
        vue.createElementVNode("div", _hoisted_6$6, [
          vue.createElementVNode("div", _hoisted_7$5, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ])
      ])
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$h))
}
}

};

script$k.__file = "src/lib/components/ShModal.vue";

const _hoisted_1$g = ["href"];

var script$j = {
  __name: 'ShModalForm',
  props: ['action',
  'classes',
  'hasTerms',
  'country_code',
  'submitBtnClass',
  'fields',
  'columns', 'placeholders', 'field_permissions', 'retainDataAfterSubmission',
  'currentData', 'actionLabel', 'fillSelects', 'phones', 'successCallback',
  'failedCallback', 'labels', 'editors',
  'datePickers',
  'required',
  'textAreas',
  'files',
  'phones',
  'numbers',
  'customComponent','modalTitle','class','successMessage', 'modalId'],
  emits: ['success','fieldChanged','formSubmitted','formError','modalId'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
vue.ref(props);
let btnClass=props.class;
const realModalId = props.modalId ?? 'rand' + (Math.random() + 1).toString(36).substring(2);
const success = (res)=>{
  emit('success',res);
};
vue.onMounted(()=>{
  emit('modalId',realModalId);
});

const fieldChanged = (field, value)=>{
  emit('fieldChanged',field, value);
};

const formSubmitted = (res)=>{
  emit('formSubmitted',res);
};

const formError = (res)=>{
  emit('formError',res);
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("a", {
      class: vue.normalizeClass(vue.unref(btnClass)),
      href: '#' + vue.unref(realModalId),
      "data-bs-toggle": "modal"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 10 /* CLASS, PROPS */, _hoisted_1$g),
    vue.createVNode(script$k, {
      "modal-id": vue.unref(realModalId),
      "modal-title": __props.modalTitle
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(), vue.createBlock(script$m, vue.mergeProps({
          onSuccess: success,
          onFieldChanged: fieldChanged,
          onFormSubmitted: formSubmitted,
          onFormError: formError,
          key: JSON.stringify(__props.currentData ?? {})
        }, props), null, 16 /* FULL_PROPS */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modal-id", "modal-title"])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$j.__file = "src/lib/components/ShModalForm.vue";

const _hoisted_1$f = ["href"];

var script$i = {
  __name: 'ShModalFormAuto',
  props: ['action',
  'classes',
  'hasTerms',
  'country_code',
  'submitBtnClass',
  'fields',
  'columns', 'placeholders', 'field_permissions', 'retainDataAfterSubmission',
  'currentData', 'actionLabel', 'fillSelects', 'phones', 'successCallback',
  'failedCallback', 'labels', 'editors',
  'datePickers',
  'textAreas',
  'files',
  'phones',
  'numbers',
  'customComponent','modalTitle','class','successMessage'],
  emits: ['success'],
  setup(__props, { emit: __emit }) {

const props = __props;
const emit = __emit;
const formProps = vue.ref(props);
let btnClass=props.class;
const modalId = 'rand' + (Math.random() + 1).toString(36).substring(2);
const success = (res)=>{
  emit('success',res);
};
delete formProps.class;

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("a", {
      class: vue.normalizeClass(vue.unref(btnClass)),
      href: '#' + modalId,
      "data-bs-toggle": "modal"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 10 /* CLASS, PROPS */, _hoisted_1$f),
    vue.createVNode(script$k, {
      "modal-id": modalId,
      "modal-title": __props.modalTitle
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(script$m, vue.mergeProps({ onSuccess: success }, props), null, 16 /* FULL_PROPS */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modal-title"])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$i.__file = "src/lib/components/ShModalFormAuto.vue";

const _hoisted_1$e = ["id"];
const _hoisted_2$8 = { class: "offcanvas-header" };
const _hoisted_3$8 = {
  class: "offcanvas-title",
  id: "offcanvasScrollingLabel"
};
const _hoisted_4$8 = { class: "offcanvas-body" };

var script$h = {
  __name: 'ShCanvas',
  props: {
  canvasId: {
    required: true,
    type: String
  },
  canvasTitle: {
    type: String
  },
  position: {
    type: String
  },
  canvasSize: {
    type: String
  },
  side: {
    type: String
  }
},
  emits: ['canvasClosed'],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const props = __props;
const pos = vue.ref(props.position ?? props.side);
const canvasSide = vue.ref(pos.value ?  `offcanvas-${pos.value}` : 'offcanvas-start');

vue.onMounted(()=>{
  const canvas = document.getElementById(props.canvasId);
  canvas && canvas.addEventListener('hidden.bs.offcanvas', event => {
    event.target.id === props.canvasId && emit('canvasClosed');
  });
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["offcanvas", canvasSide.value +' '+ __props.canvasSize + '']),
    "data-bs-scroll": "true",
    tabindex: "-1",
    id: __props.canvasId,
    "aria-labelledby": "offcanvasScrollingLabel"
  }, [
    vue.createElementVNode("div", _hoisted_2$8, [
      vue.createElementVNode("h5", _hoisted_3$8, vue.toDisplayString(__props.canvasTitle), 1 /* TEXT */),
      vue.createElementVNode("button", {
        type: "button",
        ref: "closecanvas",
        onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.offcanvasClosed && _ctx.offcanvasClosed(...args))),
        class: "btn-close text-reset",
        "data-bs-dismiss": "offcanvas",
        "aria-label": "Close"
      }, null, 512 /* NEED_PATCH */)
    ]),
    vue.createElementVNode("div", _hoisted_4$8, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1$e))
}
}

};

script$h.__file = "src/lib/components/ShCanvas.vue";

const _hoisted_1$d = { class: "callout callout-info" };

function render$1(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$d, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      vue.createTextVNode(" No records found ")
    ])
  ]))
}

const script$g = {};

script$g.render = render$1;
script$g.__scopeId = "data-v-55cf77fb";
script$g.__file = "src/lib/components/others/NoRecords.vue";

const useUserStore = pinia.defineStore('user-store', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
    menus: [],
    loggedOut: false
  }),
  actions: {
    setUser (){
      let user = null;
      try {
         user = ShStorage.getItem('user') ? ShStorage.getItem('user') : null;
      } catch (error) {
        user= null;
      }
      if (user) {
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = [];
            if (typeof this.permissions === 'string') {
              permissions = this.permissions;
            } else {
              permissions = this.permissions;
            }
            return permissions.includes(slug)
          }
          return false
        };
      }
      this.user = user;
      shApis.doGet('auth/user').then(res => {
        let user = res.data.user;
        if (typeof(user) === 'undefined') {
           user = res.data;
        }
        ShStorage.setItem('user',user);
        user.signOut = this.signOut;
        user.logout = this.signOut;
        user.logOut = this.signOut;
        user.isAllowedTo = function (slug) {
          if(!slug){
            return true
          }
          if (this.permissions) {
            let permissions = [];
            if (typeof this.permissions === 'string') {
              permissions = this.permissions;
            } else {
              permissions = this.permissions;
            }
            return permissions.includes(slug)
          }
          return false
        };
        this.user = user;
      }).catch((reason) => {
        if (reason.response && reason.response.status) {
          if(reason.response.status === 401) {
            ShStorage.setItem('user',null);
            this.user = null;
          }
          this.loggedOut = true;
        }
      });
      if (this.user) {
        if (typeof this.user.permissions === 'string') {
          this.permissions = this.user.permissions;
        } else {
          this.permissions = this.user.permissions;
        }
      }
      const timeNow = moment__default["default"]().toISOString();
      ShStorage.setItem('session_start',timeNow);
    },
    signOut () {
      shRepo.signOutUser();
    },
    logOut () {
      this.signOut();
    },
    getUser () {
      this.setUser();
    },
    setAccessToken (accessToken) {
      ShStorage.setItem('access_token', accessToken);
      this.setUser();
    }
  },
  getters: {
    userId (state) {
      return state.user === null ? null:state.user.id
    }
  }
});

var script$f = {
  name: 'Pagination',
  props: ['pagination_data', 'loadMore', 'hideCount', 'hideLoadMore', 'paginationStyle','perPage'],
  data () {
    return {
      current_page: this.pagination_data.current,
      per_page: this.pagination_data.per_page,
      loadingMore: 0,
      pageOptions: [10,25,50,100,200,400]
    }
  },
  mounted(){
    if(!this.pageOptions.includes(this.perPage)){
      const recordCount = this.pagination_data.record_count;
      recordCount > 0 && recordCount < this.perPage && this.pageOptions.push(recordCount);
      recordCount > 0 && recordCount >= this.perPage && this.pageOptions.push(this.perPage);
    }
  },
  methods: {
    changeTableKey: function (key, value) {
      this.$emit('changeKey', key, value);
    },
    changePerPage: function () {
      this.$emit('changeKey', 'per_page', this.per_page);
    },
    loadMoreRecords: function () {
      this.$emit('loadMoreRecords', 'now');
    }
  },
  computed: {
    getActivePage: function () {
      return this.pagination_data.current
    },
    getPerPage: function () {
      return this.per_page
    },
    getPages: function () {
      const pages = this.pagination_data.end;
      const current = this.pagination_data.current;
      var displayPages = [];
      if (pages < 13) {
        return this.pagination_data.end
      } else {
        if (current < 7) {
          for (let i = 1; i < 9; i++) {
            displayPages.push(i);
          }
          displayPages.push('...');
          displayPages.push(pages - 1);
          displayPages.push(pages);
          return displayPages
        } else if ((pages - current) < 6) {
          displayPages.push(1);
          displayPages.push(2);
          displayPages.push('...');
          var max = pages - 9;
          let l = 1;
          for (let i = pages; i > max; i--) {
            displayPages.push(max + l);
            l++;
          }
          return displayPages
        } else {
          displayPages.push(1);
          displayPages.push(2);
          displayPages.push('...');
          for (let i = current - 3; i < current + 4; i++) {
            displayPages.push(i);
          }
          displayPages.push('..');
          displayPages.push(pages - 1);
          displayPages.push(pages);
          return displayPages
        }
      }
    }
  }
};

const _hoisted_1$c = { key: 0 };
const _hoisted_2$7 = { class: "record_count_body mb-3" };
const _hoisted_3$7 = /*#__PURE__*/vue.createElementVNode("span", { class: "per_page_show" }, "Showing", -1 /* HOISTED */);
const _hoisted_4$7 = ["value"];
const _hoisted_5$6 = { class: "record_counts" };
const _hoisted_6$5 = {
  key: 0,
  "aria-label": "Page navigation"
};
const _hoisted_7$4 = { class: "pagination" };
const _hoisted_8$4 = {
  key: 0,
  class: "page-link"
};
const _hoisted_9$4 = {
  key: 1,
  class: "page-link"
};
const _hoisted_10$4 = ["onClick"];
const _hoisted_11$4 = { key: 1 };
const _hoisted_12$2 = {
  key: 0,
  class: "text-center"
};
const _hoisted_13$2 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, null, -1 /* HOISTED */);
const _hoisted_14$2 = [
  _hoisted_13$2
];
const _hoisted_15$2 = {
  key: 1,
  class: "text-center"
};
const _hoisted_16$2 = { class: "per_page_show" };
const _hoisted_17$2 = {
  key: 2,
  class: "text-center"
};
const _hoisted_18$2 = {
  key: 1,
  class: "spinner-border"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.paginationStyle !== 'loadMore')
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
        vue.createElementVNode("div", _hoisted_2$7, [
          _hoisted_3$7,
          vue.createTextVNode("  "),
          vue.withDirectives(vue.createElementVNode("select", {
            class: "select_per_page",
            onChange: _cache[0] || (_cache[0] = (...args) => ($options.changePerPage && $options.changePerPage(...args))),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.per_page) = $event))
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.pageOptions, (option) => {
              return (vue.openBlock(), vue.createElementBlock("option", { value: option }, vue.toDisplayString(option), 9 /* TEXT, PROPS */, _hoisted_4$7))
            }), 256 /* UNKEYED_FRAGMENT */))
          ], 544 /* NEED_HYDRATION, NEED_PATCH */), [
            [vue.vModelSelect, $data.per_page]
          ]),
          vue.createElementVNode("span", _hoisted_5$6, " of " + vue.toDisplayString($props.pagination_data.record_count) + " items", 1 /* TEXT */)
        ]),
        ($props.pagination_data != null)
          ? (vue.openBlock(), vue.createElementBlock("nav", _hoisted_6$5, [
              vue.createElementVNode("ul", _hoisted_7$4, [
                vue.createElementVNode("li", {
                  class: vue.normalizeClass([$options.getActivePage === 1 ? 'disabled' : '' , "page-item"])
                }, [
                  vue.createElementVNode("a", {
                    onClick: _cache[2] || (_cache[2] = $event => ($options.changeTableKey('page',$options.getActivePage - 1))),
                    class: "page-link"
                  }, "«")
                ], 2 /* CLASS */),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getPages, (page) => {
                  return (vue.openBlock(), vue.createElementBlock("li", {
                    class: vue.normalizeClass(["page-item", $options.getActivePage === page ? 'active':'']),
                    key: page
                  }, [
                    ($options.getActivePage === page)
                      ? (vue.openBlock(), vue.createElementBlock("a", _hoisted_8$4, vue.toDisplayString(page), 1 /* TEXT */))
                      : (['..','...'].includes(page))
                        ? (vue.openBlock(), vue.createElementBlock("a", _hoisted_9$4, vue.toDisplayString(page), 1 /* TEXT */))
                        : (vue.openBlock(), vue.createElementBlock("a", {
                            key: 2,
                            onClick: $event => ($options.changeTableKey('page',page)),
                            class: "page-link"
                          }, vue.toDisplayString(page), 9 /* TEXT, PROPS */, _hoisted_10$4))
                  ], 2 /* CLASS */))
                }), 128 /* KEYED_FRAGMENT */)),
                vue.createElementVNode("li", {
                  class: vue.normalizeClass([$options.getActivePage === this.pagination_data.end ? 'disabled' : '' , "page-item"])
                }, [
                  vue.createElementVNode("a", {
                    onClick: _cache[3] || (_cache[3] = $event => ($options.changeTableKey('page',$options.getActivePage + 1))),
                    class: "page-link"
                  }, "»")
                ], 2 /* CLASS */)
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ]))
    : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$4, [
        (this.pagination_data.loading === 1 && $props.loadMore && $props.hideLoadMore)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$2, [..._hoisted_14$2]))
          : vue.createCommentVNode("v-if", true),
        (!$props.hideCount)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_15$2, [
              vue.createElementVNode("span", _hoisted_16$2, "Showing " + vue.toDisplayString($props.pagination_data.displayCount) + " of " + vue.toDisplayString($props.pagination_data.record_count) + " items", 1 /* TEXT */)
            ]))
          : vue.createCommentVNode("v-if", true),
        ($props.pagination_data.displayCount < $props.pagination_data.record_count && !$props.hideLoadMore)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17$2, [
              (this.pagination_data.loading !== 1)
                ? (vue.openBlock(), vue.createElementBlock("button", {
                    key: 0,
                    class: "btn btn-sm btn-primary mt-1",
                    onClick: _cache[4] || (_cache[4] = (...args) => ($options.loadMoreRecords && $options.loadMoreRecords(...args)))
                  }, " Load More "))
                : (vue.openBlock(), vue.createElementBlock("span", _hoisted_18$2))
            ]))
          : vue.createCommentVNode("v-if", true)
      ]))
}

script$f.render = render;
script$f.__file = "src/lib/components/list_templates/Pagination.vue";

const _hoisted_1$b = /*#__PURE__*/vue.createElementVNode("span", {
  class: "spinner-border spinner-border-sm me-1",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);


var script$e = {
  __name: 'ShConfirmAction',
  props: {
  data: Object,
  title: String,
  message: String,
  url: {
    type: String,
    required: true
  },
  loadingMessage: {
    type: String,
    default: 'Processing'
  },
  successMessage: {
    type: String,
    default: 'Action Successful'
  },
  failMessage: {
    type: String,
    default: 'Action failed'
  }
},
  emits: ['actionSuccessful', 'actionFailed','success','actionCanceled'],
  setup(__props, { emit: __emit }) {

const props = __props;

const processing = vue.ref(false);
const emit = __emit;
const actionSuccessful = (res)=>{
  processing.value = false;
  res.actionType = 'silentAction';
  emit('actionSuccessful',res);
  emit('success',res);
  shRepo.showToast(res.message ?? props.successMessage);
};

const actionFailed = reason =>{
  console.log(reason);
  processing.value = false;
  reason.actionType = 'silentAction';
  emit('actionFailed', reason);
  shRepo.showToast(reason.value.error.message ?? props.failMessage,'error');
};
function runAction () {
  processing.value = true;
  shRepo.runPlainRequest(props.url, props.message, props.title, props.data).then(res => {
    if(res.isConfirmed){
      const value = res.value;
      if(value.success){
        actionSuccessful(res.value.response);
      } else {
        actionFailed(res);
      }
    } else {
      emit('actionCanceled');
      processing.value = false;
    }
  }).catch(ex => {
    actionFailed(ex);
  });
}

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("a", {
    class: vue.normalizeClass(processing.value ? 'disabled':''),
    onClick: runAction
  }, [
    (processing.value)
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          _hoisted_1$b,
          vue.createElementVNode("span", null, vue.toDisplayString(__props.loadingMessage), 1 /* TEXT */)
        ], 64 /* STABLE_FRAGMENT */))
      : vue.createCommentVNode("v-if", true),
    (!processing.value)
      ? vue.renderSlot(_ctx.$slots, "default", { key: 1 })
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

};

script$e.__file = "src/lib/components/ShConfirmAction.vue";

const _hoisted_1$a = /*#__PURE__*/vue.createElementVNode("span", {
  class: "spinner-border spinner-border-sm me-1",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);

var script$d = {
  __name: 'ShSilentAction',
  props: {
  data: Object,
  loadingMessage: {
    type: String,
    default: 'Processing'
  },
  successMessage: {
    type: String,
    default: 'Action Successful'
  },
  failMessage: {
    type: String,
    default: 'Action failed'
  },
  method: {
    type: String,
    default: 'POST'
  },
  url: {
    type: String,
    required: true
  },
  disableSuccessMessage: {
    type: Boolean
  }
},
  emits: ['actionSuccessful','actionFailed','success'],
  setup(__props, { emit: __emit }) {

const props = __props;
const processing = vue.ref(false);
const emit = __emit;
const actionSuccessful = (res)=>{
  processing.value = false;
  res.actionType = 'silentAction';
  console.log(res.data,props.successMessage);
  emit('actionSuccessful',res);
  emit('success',res);
  if(!props.disableSuccessMessage) {
    shRepo.showToast(res.data.message ?? props.successMessage);
  }
};

const actionFailed = reason =>{
  processing.value = false;
  console.log(reason);
  shRepo.showToast('Failed');
  reason.actionType = 'silentAction';
  emit('actionFailed', reason);
  shRepo.showToast(reason.message ?? props.failMessage,'error');
};
function runAction(){
  processing.value = true;
  if(props.method === 'POST'){
    shApis.doPost(props.url,props.data).then(res=>{
      actionSuccessful(res);
    }).catch(reason=>{
      actionFailed(reason);
    });
  }
  if(props.method === 'GET'){
    shApis.doGet(props.url,props.data).then(res=>{
      actionSuccessful(res);
    }).catch(reason=>{
      actionFailed(reason);
    });
  }
}

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("a", {
    class: vue.normalizeClass(processing.value ? 'disabled':''),
    onClick: runAction
  }, [
    (processing.value)
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          _hoisted_1$a,
          vue.createElementVNode("span", null, vue.toDisplayString(__props.loadingMessage), 1 /* TEXT */)
        ], 64 /* STABLE_FRAGMENT */))
      : vue.createCommentVNode("v-if", true),
    (!processing.value)
      ? vue.renderSlot(_ctx.$slots, "default", { key: 1 })
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}
}

};

script$d.__file = "src/lib/components/ShSilentAction.vue";

const _hoisted_1$9 = { class: "sh-range" };
const _hoisted_2$6 = { class: "dropdown" };
const _hoisted_3$6 = {
  class: "form-control dropdown-toggle",
  href: "#",
  role: "button",
  id: "dropdownMenuLink",
  "data-bs-toggle": "dropdown",
  "aria-expanded": "false"
};
const _hoisted_4$6 = /*#__PURE__*/vue.createElementVNode("i", { class: "bi-calendar text-dark" }, null, -1 /* HOISTED */);
const _hoisted_5$5 = ["innerHTML"];
const _hoisted_6$4 = {
  class: "dropdown-menu sh-range-dropdown",
  "aria-labelledby": "dropdownMenuLink"
};
const _hoisted_7$3 = { class: "sh-range-preset" };
const _hoisted_8$3 = ["onClick"];
const _hoisted_9$3 = { class: "border-top" };
const _hoisted_10$3 = { class: "dropdown-item d-flex flex-column" };
const _hoisted_11$3 = /*#__PURE__*/vue.createElementVNode("span", null, "Custom", -1 /* HOISTED */);



var script$c = {
  __name: 'ShRange',
  props: {
  start: {
    type: Number,
    default: 2021
  },
  selected: {
    type: String,
    default: shRepo.getShConfig('defaultRange', 'This Month')
  }
},
  emits: ['rangeSelected'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const selectedDate = vue.ref(null);
const rangeLabel = vue.ref(null);
vue.ref(false);
const customFrom = vue.ref(null);
const customTo = vue.ref(null);

const applyCustom = ()=>{
  const date = [moment__default["default"](customFrom.value),moment__default["default"](customTo.value)];
  setDate(date,'Custom');
};

const dates = vue.ref([
  {
    label: 'Today',
    value: [moment__default["default"](), moment__default["default"]()]
  },
  {
    label: 'Yesterday',
    value: [moment__default["default"]().subtract(1, 'days'), moment__default["default"]()]
  },
    {
    label: '7 Days',
    value: [moment__default["default"]().subtract(7, 'days'), moment__default["default"]()]
  },
  {
    label: 'This week',
    value: [moment__default["default"]().subtract(1, 'week').startOf('week'), moment__default["default"]().subtract(1, 'week').endOf('week')]
  },
  {
    label: 'This Month',
    value: [moment__default["default"]().startOf('month'), moment__default["default"]()]
  },
  {
    label: 'Last Month',
    value: [moment__default["default"]().subtract(1, 'month').startOf('month'), moment__default["default"]().subtract(1, 'month').endOf('month')]
  },
  {
    label: 'Last 30 days',
    value: [moment__default["default"]().subtract(30, 'days'), moment__default["default"]()]
  },
  {
    label: 'Last 60 days',
    value: [moment__default["default"]().subtract(60, 'days'), moment__default["default"]()]
  },
  {
    label: 'Last 90 days',
    value: [moment__default["default"]().subtract(90, 'days'), moment__default["default"]()]
  },
    {
        label: 'This Year',
        value: [moment__default["default"]().startOf('year'), moment__default["default"]()]
    },
  {
    label: '1 Year',
    value: [moment__default["default"]().subtract(12, 'months'), moment__default["default"]()]
  },
  {
    label: 'All Time',
    value: [moment__default["default"]('@/2021').startOf('year'), moment__default["default"]()]
  }
]);
const  setDate =  (date, label) => {
  selectedDate.value = date;
  rangeLabel.value = '<strong>' + label + '</strong><small>(' + date[0].format('MMMM D, YYYY') + ' - ' + date[1].format('MMMM D, YYYY') + ')</small>';
  const from = date[0];
  const to = date[1];
  const period = label.toString().toLowerCase().replaceAll(' ','_');
  emit('rangeSelected', {
    from: from,
    to: to,
    period: period,
    query: `from=${from.format('L')}&to=${to.format('L')}&period=${period}`
  });
};
vue.onMounted(() => {
  let end = parseInt(moment__default["default"]().format('Y'));
  while (end >= props.start) {
    dates.value.push({
      label: end,
      value: [moment__default["default"]('@/' + end).startOf('year'), moment__default["default"]('@/' + end).endOf('year')]
    });
    end--;
  }

  dates.value.map(date=>{
    (`${date.label}`.toLowerCase() === props.selected.toLowerCase()) && setDate(date.value, date.label);
  });
});

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$9, [
    vue.createElementVNode("div", _hoisted_2$6, [
      vue.createElementVNode("div", _hoisted_3$6, [
        _hoisted_4$6,
        vue.createTextVNode(),
        vue.createElementVNode("span", { innerHTML: rangeLabel.value }, null, 8 /* PROPS */, _hoisted_5$5)
      ]),
      vue.createElementVNode("div", _hoisted_6$4, [
        vue.createElementVNode("ul", _hoisted_7$3, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(dates.value, (date) => {
            return (vue.openBlock(), vue.createElementBlock("li", {
              key: date.label,
              onClick: $event => (setDate(date.value, date.label))
            }, [
              vue.createElementVNode("a", {
                class: vue.normalizeClass(["dropdown-item", date.value === selectedDate.value ? 'active' : '']),
                href: "#"
              }, vue.toDisplayString(date.label), 3 /* TEXT, CLASS */)
            ], 8 /* PROPS */, _hoisted_8$3))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        vue.createElementVNode("ul", null, [
          vue.createElementVNode("li", _hoisted_9$3, [
            vue.createElementVNode("div", _hoisted_10$3, [
              _hoisted_11$3,
              vue.createElementVNode("div", null, [
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((customFrom).value = $event)),
                  type: "date"
                }, null, 512 /* NEED_PATCH */), [
                  [vue.vModelText, customFrom.value]
                ]),
                vue.withDirectives(vue.createElementVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((customTo).value = $event)),
                  type: "date"
                }, null, 512 /* NEED_PATCH */), [
                  [vue.vModelText, customTo.value]
                ])
              ]),
              (customFrom.value && customTo.value)
                ? (vue.openBlock(), vue.createElementBlock("button", {
                    key: 0,
                    class: "btn btn-sm btn-info mt-1",
                    onClick: applyCustom
                  }, "Apply"))
                : vue.createCommentVNode("v-if", true)
            ])
          ])
        ])
      ])
    ])
  ]))
}
}

};

script$c.__file = "src/lib/components/ShRange.vue";

const _hoisted_1$8 = { class: "auto-table mt-2" };
const _hoisted_2$5 = {
  key: 0,
  class: "col-md-4 mb-2"
};
const _hoisted_3$5 = ["disabled"];
const _hoisted_4$5 = /*#__PURE__*/vue.createElementVNode("i", { class: "bi-download" }, null, -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/vue.createElementVNode("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1 /* HOISTED */);
const _hoisted_7$2 = {
  key: 1,
  class: "row"
};
const _hoisted_8$2 = { class: "col-12 mb-3 d-flex justify-content-between flex-column flex-md-row flex-lg-row" };
const _hoisted_9$2 = ["placeholder"];
const _hoisted_10$2 = {
  key: 0,
  class: "input-group-text exact_checkbox"
};
const _hoisted_11$2 = /*#__PURE__*/vue.createElementVNode("span", { class: "ms-1" }, "Exact", -1 /* HOISTED */);
const _hoisted_12$1 = {
  key: 0,
  class: "sh-range-selector"
};
const _hoisted_13$1 = {
  key: 0,
  class: "text-center"
};
const _hoisted_14$1 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, [
  /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...")
], -1 /* HOISTED */);
const _hoisted_15$1 = [
  _hoisted_14$1
];
const _hoisted_16$1 = {
  key: 1,
  class: "alert alert-danger"
};
const _hoisted_17$1 = {
  key: 0,
  class: "text-center"
};
const _hoisted_18$1 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, [
  /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...")
], -1 /* HOISTED */);
const _hoisted_19 = [
  _hoisted_18$1
];
const _hoisted_20 = {
  key: 1,
  class: "alert alert-danger error-loading"
};
const _hoisted_21 = /*#__PURE__*/vue.createElementVNode("i", { class: "bi-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_22 = { class: "sh-thead" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["onClick"];
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  key: 0,
  class: "text-capitalize"
};
const _hoisted_27 = { class: "sh-tbody" };
const _hoisted_28 = {
  key: 0,
  class: "text-center"
};
const _hoisted_29 = ["colspan"];
const _hoisted_30 = /*#__PURE__*/vue.createElementVNode("div", { class: "text-center" }, [
  /*#__PURE__*/vue.createElementVNode("div", {
    class: "spinner-border",
    role: "status"
  }, [
    /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...")
  ])
], -1 /* HOISTED */);
const _hoisted_31 = [
  _hoisted_30
];
const _hoisted_32 = {
  key: 1,
  class: "text-center alert alert-danger"
};
const _hoisted_33 = ["colspan"];
const _hoisted_34 = {
  key: 2,
  class: "text-center alert alert-info no_records"
};
const _hoisted_35 = ["colspan"];
const _hoisted_36 = /*#__PURE__*/vue.createElementVNode("i", { class: "bi-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_37 = ["onClick"];
const _hoisted_38 = { key: 1 };
const _hoisted_39 = {
  key: 2,
  class: "text-success fw-bold"
};
const _hoisted_40 = { key: 3 };
const _hoisted_41 = ["innerHTML"];
const _hoisted_42 = ["innerHTML"];
const _hoisted_43 = ["innerHTML"];
const _hoisted_44 = {
  key: 0,
  style: {"white-space":"nowrap"}
};
const _hoisted_45 = ["href"];
const _hoisted_46 = ["title", "onClick"];
const _hoisted_47 = { key: 5 };
const _hoisted_48 = {
  key: 0,
  class: "text-center"
};
const _hoisted_49 = /*#__PURE__*/vue.createElementVNode("div", { class: "text-center" }, [
  /*#__PURE__*/vue.createElementVNode("div", {
    class: "spinner-border",
    role: "status"
  }, [
    /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...")
  ])
], -1 /* HOISTED */);
const _hoisted_50 = [
  _hoisted_49
];
const _hoisted_51 = { key: 1 };
const _hoisted_52 = {
  key: 2,
  class: "mobile-list-items"
};
const _hoisted_53 = ["onClick"];
const _hoisted_54 = {
  key: 0,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_55 = {
  key: 1,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_56 = {
  key: 2,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_57 = { key: 1 };
const _hoisted_58 = {
  key: 2,
  class: "text-primary fw-bold"
};
const _hoisted_59 = { key: 3 };
const _hoisted_60 = ["innerHTML"];
const _hoisted_61 = ["innerHTML"];
const _hoisted_62 = ["innerHTML"];
const _hoisted_63 = /*#__PURE__*/vue.createElementVNode("hr", { class: "my-2" }, null, -1 /* HOISTED */);
const _hoisted_64 = { key: 0 };
const _hoisted_65 = ["href"];
const _hoisted_66 = ["title", "onClick"];

const __default__ = {
  name: 'sh-table',
  props: ['endPoint', 'headers', 'cacheKey', 'query', 'pageCount', 'actions', 'hideCount', 'hideLoadMore', 'links', 'reload', 'hideSearch', 'sharedData', 'searchPlaceholder', 'event', 'displayMore', 'displayMoreBtnClass', 'moreDetailsColumns', 'moreDetailsFields', 'hasDownload', 'downloadFields', 'tableHover', 'hideIds', 'paginationStyle', 'hasRange','noRecordsMessage'],
  data(){
    return {
      order_by: '',
      order_method: '',
      per_page: this.pageCount ?? shRepo.getShConfig('tablePerPage', 10),
      page: 1,
      exactMatch: false,
      filter_value: '',
      loading: 'loading',
      loading_error: '',
      records: null,
      total: 0,
      pagination_data: null,
      moreDetailsId: null,
      moreDetailsModel: null,
      downloading: false,
      appUrl: window.VITE_APP_API_URL,
      hasCanvas: 0,
      selectedRecord: null,
      timeOut: null,
      tableHeaders: [],
      pageStyle: this.paginationStyle ?? shRepo.getShConfig('tablePaginationStyle', 'loadMore'),
      range: null,
      from: null,
      to: null,
      period: null
    }
  },
  mounted(){
    if (this.headers) {
      this.tableHeaders = this.headers;
    }

    if (this.actions && this.actions.actions) {
      this.actions.actions.forEach(action => {
        if (action.canvasComponent) {
          this.hasCanvas = true;
        }
      });
    }
    if (this.cacheKey) {
      this.setCachedData();
    }
    this.reloadData();
  },
  methods: {
    rangeChanged: function (newRange){
      this.range = newRange;
      this.from = newRange.from.format('L');
      this.to = newRange.to.format('L');
      this.period = newRange.period;
      this.reloadData();
    },
    userTyping: function (){
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      const self = this;
      this.timeOut = setTimeout(() => {
        self.reloadData(1);
      }, 800);
    },
    cleanCanvasProps: function (actions){
      let replaced = actions;
      replaced.class = null;
      return replaced
    },
    newRecordAdded: function (ev){
      const record = ev.log;
      if (record.user) {
        record.user = record.user.name;
      }
      this.records.unshift(record);
    },
    canvasClosed: function (){
      this.selectedRecord = null;
    },
    rowSelected: function (row){
      this.selectedRecord = null;
      setTimeout(() => {
        this.selectedRecord = row;
        this.$emit('rowSelected', row);
      }, 100);
    },
    changeKey: function (key, value){
      this[key] = value;
      if (key === 'order_by') {
        this.order_method = (this.order_method === 'desc') ? 'asc' : 'desc';
      }
      if (key === 'per_page') {
        this.page = 1;
      }
      this.reloadData();
    },
    getLinkClass: function (config){
      if (typeof config === 'object') {
        return config.class
      }
      return ''
    },
    reloadNotifications: function (){
      this.reloadData();
    },
    replaceActionUrl: function (path, obj){
      if (path) {
        var matches = path.match(/\{(.*?)\}/g);
        try {
          matches.forEach(key => {
            key = key.replace('{', '');
            key = key.replace('}', '');
            path = path.replace(`{${key}}`, obj[key]);
          });
          return path
        } catch (e) {
          return path
        }
      }
      return ''
    },
    doEmitAction: function (action, data){
      if (typeof action === 'function') {
        action(data);
      } else {
        this.$emit(action, data);
      }
    },
    getFieldType: function (field){
      const numbers = ['age', 'interest_rate_pa'];
      const moneys = ['amount', 'paid_amount', 'total_paid', 'total', 'monthly_fee', 'share_cost', 'min_contribution', 'min_membership_contribution'];
      const dates = ['invoice_date', 'free_tier_days', 'updated_at', 'created_at', 'end_time'];
      if (numbers.includes(field)) {
        return 'numeric'
      }
      if (moneys.includes(field)) {
        return 'money'
      }
      if (dates.includes(field)) {
        return 'date'
      }
      return 'string'
    },
    replaceLinkUrl: function (path, obj){
      if (typeof path === 'object') {
       // check path,link or url
        if (path.link) {
          path = path.link;
        } else if (path.url) {
          path = path.url;
        } else if(path.path){
          path = path.path;
        } else {
          path = '';
        }
      }
      var matches = path.match(/\{(.*?)\}/g);
      matches && matches.forEach(key => {
        key = key.replace('{', '');
        key = key.replace('}', '');
        path = path.replace(`{${key}}`, obj[key]);
      });
      return path
    },
    formatDate: function (date){
      return moment__default["default"](date).format('lll')
    },
    setMoreDetailsModel: function (row){
      this.moreDetailsModel = null;
      this.moreDetailsModel = row;
    },
    loadMoreRecords: function (){
      this.reloadData(this.page + 1, 1);
    },
    exportData: function (template){
      this.downloading = true;
      const headers = [];
      const fields = this.downloadFields ? this.downloadFields : this.headers;
      fields.forEach(header => {
        if (typeof header === 'string') {
          headers.push(header);
        }
      });
      const data = {
        titles: headers,
        export: 1
      };
      shApis.doPost(this.endPoint, data).then(res => {
        this.downloading = false;
        if (res.data.file) {
          const url = this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name;
          window.location.href = url;
          // window.open('https://facebook.com')
          // window.open(this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name, '_blank').focus()
        }
      }).catch(reason => {
        this.downloading = false;
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText}`;
        shRepo.swalError('Error', error);
      });
    },
    setCachedData: function (){
      if (this.cacheKey) {
        this.records = ShStorage.getItem('sh_table_cache_' + this.cacheKey, null);
      }
    },
    reloadData: function (page, append){
      if (typeof page !== 'undefined') {
        this.page = page;
      }
      if (this.cacheKey && this.records !== null) {
        this.loading = 'done';
      } else if (!append) {
        this.loading = 'loading';
      }
      const data = {
        order_by: this.order_by,
        order_method: this.order_method,
        per_page: this.per_page,
        page: this.page,
        filter_value: this.filter_value,
        paginated: true,
        from: this.from,
        to: this.to,
        period: this.period,
        exact: this.exactMatch
      };
      if (this.pagination_data) {
        this.pagination_data.loading = 1;
      }
      let endPoint = this.endPoint;
      if (!this.endPoint && this.query) {
        //send ql query
        endPoint = 'sh-ql';
        data.query = this.query;
      }
      shApis.doGet(endPoint, data).then(req => {
        this.$emit('dataReloaded', this.pagination_data);
        this.loading = 'done';
        const response = req.data.data;
        this.$emit('dataLoaded', response);
        if (this.page < 2 && this.cacheKey) {
          ShStorage.setItem('sh_table_cache_' + this.cacheKey, response.data);
        }
        this.pagination_data = {
          current: response.current_page,
          start: response.from,
          end: response.last_page,
          record_count: response.total,
          per_page: response.per_page,
          loading: 0,
          displayCount: response.total > response.per_page ? response.per_page : response.total
        };
        if (!this.headers && response.total > 0) {
          this.tableHeaders = Object.keys(response.data[0]);
        }
        if (append) {
          this.records.push(...response.data);
          let totalShown = response.total > response.per_page ? response.per_page * response.current_page : response.total;
          if (totalShown > response.total) {
            totalShown = response.total;
          }
          this.pagination_data.displayCount = totalShown;
          const scrollingElement = (document.scrollingElement || document.body);
          scrollingElement.scrollTop = scrollingElement.scrollHeight;
        } else {
          this.records = response.data;
        }
      }).catch(reason => {
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText} (${this.endPoint})`;
        this.loading_error = error;
        this.loading = 'error';
      });
    }
  },
  watch: {
    hideIds: {
      handler(newValue){
        this.records = this.records.filter(record => !newValue.includes(record.id) && record);
      },
      deep: true
    },
    reload(){
      this.reloadData();
    },
    endPoint(){
      this.reloadData();
    }
  },
  components: {
    ShRange: script$c,
    ShSilentAction: script$d,
    ShConfirmAction: script$e,
    ShCanvas: script$h,
    pagination: script$f
  },
  computed: {
    windowWidth: function (){
      return window.innerWidth
    },
    user(){
      return null
    },
    hasDefaultSlot(){
      return !!this.$slots.default
    },
    hasRecordsSlot(){
      return !!this.$slots.records
    }
  }
};


var script$b = /*#__PURE__*/Object.assign(__default__, {
  setup(__props) {

const noRecordsComponent = vue.inject('noRecordsComponent', script$g);

const {user} = pinia.storeToRefs(useUserStore());

return (_ctx, _cache) => {
  const _component_router_link = vue.resolveComponent("router-link");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
    (__props.hasDownload)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$5, [
          vue.createElementVNode("button", {
            disabled: _ctx.downloading,
            class: "btn btn-warning btn-sm",
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.exportData()))
          }, [
            (!_ctx.downloading)
              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  _hoisted_4$5,
                  vue.createTextVNode(" Export ")
                ], 64 /* STABLE_FRAGMENT */))
              : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  _hoisted_5$4,
                  _hoisted_6$3
                ], 64 /* STABLE_FRAGMENT */))
          ], 8 /* PROPS */, _hoisted_3$5)
        ]))
      : vue.createCommentVNode("v-if", true),
    (!__props.hideSearch)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$2, [
          vue.createElementVNode("div", _hoisted_8$2, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["sh-search-bar input-group", __props.hasRange ? 'me-2':''])
            }, [
              vue.withDirectives(vue.createElementVNode("input", {
                onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.userTyping && _ctx.userTyping(...args))),
                onKeyup: _cache[2] || (_cache[2] = (...args) => (_ctx.userTyping && _ctx.userTyping(...args))),
                type: "search",
                onChange: _cache[3] || (_cache[3] = $event => (_ctx.reloadData(1))),
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.filter_value) = $event)),
                placeholder: __props.searchPlaceholder ? __props.searchPlaceholder : 'Search',
                class: "form-control sh-search-input"
              }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_9$2), [
                [vue.vModelText, _ctx.filter_value]
              ]),
              (_ctx.filter_value.length > 1)
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10$2, [
                    vue.withDirectives(vue.createElementVNode("input", {
                      onChange: _cache[5] || (_cache[5] = (...args) => (_ctx.reloadData && _ctx.reloadData(...args))),
                      value: true,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.exactMatch) = $event)),
                      type: "checkbox"
                    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [
                      [vue.vModelCheckbox, _ctx.exactMatch]
                    ]),
                    _hoisted_11$2
                  ]))
                : vue.createCommentVNode("v-if", true)
            ], 2 /* CLASS */),
            (__props.hasRange)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12$1, [
                  vue.createVNode(script$c, { onRangeSelected: _ctx.rangeChanged }, null, 8 /* PROPS */, ["onRangeSelected"])
                ]))
              : vue.createCommentVNode("v-if", true)
          ])
        ]))
      : vue.createCommentVNode("v-if", true),
    (_ctx.hasDefaultSlot)
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
          (_ctx.loading === 'loading')
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$1, [..._hoisted_15$1]))
            : (_ctx.loading === 'error')
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16$1, [
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.loading_error), 1 /* TEXT */)
                ]))
              : vue.createCommentVNode("v-if", true),
          (_ctx.loading === 'done')
            ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 2 }, vue.renderList(_ctx.records, (record) => {
                return vue.renderSlot(_ctx.$slots, "default", {
                  key: record.id,
                  record: record
                })
              }), 128 /* KEYED_FRAGMENT */))
            : vue.createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      : (_ctx.hasRecordsSlot)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
            (_ctx.loading === 'loading' && !__props.cacheKey)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17$1, [..._hoisted_19]))
              : (_ctx.loading === 'error' && !__props.cacheKey)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_20, [
                    vue.createElementVNode("span", null, vue.toDisplayString(_ctx.loading_error), 1 /* TEXT */)
                  ]))
                : vue.createCommentVNode("v-if", true),
            (_ctx.loading === 'done' || __props.cacheKey)
              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                  (!_ctx.records || _ctx.records.length === 0)
                    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(noRecordsComponent)), { key: 0 }, {
                        default: vue.withCtx(() => [
                          _hoisted_21,
                          vue.createTextVNode(" " + vue.toDisplayString(__props.noRecordsMessage ?? 'No records found'), 1 /* TEXT */)
                        ]),
                        _: 1 /* STABLE */
                      }))
                    : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "records", { records: _ctx.records })
                ], 64 /* STABLE_FRAGMENT */))
              : vue.createCommentVNode("v-if", true)
          ], 64 /* STABLE_FRAGMENT */))
        : (_ctx.windowWidth > 700)
          ? (vue.openBlock(), vue.createElementBlock("table", {
              key: 4,
              class: vue.normalizeClass(["table sh-table", __props.tableHover ? 'table-hover':''])
            }, [
              vue.createElementVNode("thead", _hoisted_22, [
                vue.createElementVNode("tr", null, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.tableHeaders, (title) => {
                    return (vue.openBlock(), vue.createElementBlock("th", { key: title }, [
                      (typeof title === 'string')
                        ? (vue.openBlock(), vue.createElementBlock("a", {
                            key: 0,
                            class: "text-capitalize",
                            onClick: $event => (_ctx.changeKey('order_by',title))
                          }, vue.toDisplayString(title.replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_23))
                        : (typeof title === 'function')
                          ? (vue.openBlock(), vue.createElementBlock("a", {
                              key: 1,
                              class: "text-capitalize",
                              onClick: $event => (_ctx.changeKey('order_by',title(null)))
                            }, vue.toDisplayString(title(null).replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_24))
                          : (typeof title !== 'undefined')
                            ? (vue.openBlock(), vue.createElementBlock("a", {
                                key: 2,
                                class: "text-capitalize",
                                onClick: $event => (_ctx.changeKey('order_by',title))
                              }, vue.toDisplayString(title.replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_25))
                            : vue.createCommentVNode("v-if", true)
                    ]))
                  }), 128 /* KEYED_FRAGMENT */)),
                  (__props.actions)
                    ? (vue.openBlock(), vue.createElementBlock("th", _hoisted_26, vue.toDisplayString(__props.actions.label), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
                ])
              ]),
              vue.createElementVNode("tbody", _hoisted_27, [
                (_ctx.loading === 'loading')
                  ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_28, [
                      vue.createElementVNode("td", {
                        colspan: _ctx.tableHeaders.length
                      }, [..._hoisted_31], 8 /* PROPS */, _hoisted_29)
                    ]))
                  : (_ctx.loading === 'error')
                    ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_32, [
                        vue.createElementVNode("td", {
                          colspan: _ctx.tableHeaders.length
                        }, vue.toDisplayString(_ctx.loading_error), 9 /* TEXT, PROPS */, _hoisted_33)
                      ]))
                    : (_ctx.records.length === 0)
                      ? (vue.openBlock(), vue.createElementBlock("tr", _hoisted_34, [
                          vue.createElementVNode("td", {
                            colspan: __props.actions ? _ctx.tableHeaders.length + 1 : _ctx.tableHeaders.length
                          }, [
                            _hoisted_36,
                            vue.createTextVNode(" No records found ")
                          ], 8 /* PROPS */, _hoisted_35)
                        ]))
                      : (_ctx.loading === 'done')
                        ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 3 }, vue.renderList(_ctx.records, (record, index) => {
                            return (vue.openBlock(), vue.createElementBlock("tr", {
                              key: record.id,
                              class: vue.normalizeClass(record.class),
                              onClick: $event => (_ctx.rowSelected(record))
                            }, [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.tableHeaders, (key) => {
                                return (vue.openBlock(), vue.createElementBlock("td", { key: key }, [
                                  (typeof key === 'string' && __props.links && __props.links[key])
                                    ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                                        key: 0,
                                        target: __props.links[key].target ? '_blank':'',
                                        to: _ctx.replaceLinkUrl(__props.links[key],record),
                                        class: vue.normalizeClass(_ctx.getLinkClass(__props.links[key])),
                                        innerHTML: record[key]
                                      }, null, 8 /* PROPS */, ["target", "to", "class", "innerHTML"]))
                                    : (_ctx.getFieldType(key) === 'numeric')
                                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_38, vue.toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                      : (_ctx.getFieldType(key) === 'money')
                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_39, vue.toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                        : (_ctx.getFieldType(key) === 'date')
                                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_40, vue.toDisplayString(_ctx.formatDate(record[key])), 1 /* TEXT */))
                                          : (typeof key === 'string')
                                            ? (vue.openBlock(), vue.createElementBlock("span", {
                                                key: 4,
                                                innerHTML: record[key]
                                              }, null, 8 /* PROPS */, _hoisted_41))
                                            : (typeof key === 'function')
                                              ? (vue.openBlock(), vue.createElementBlock("span", {
                                                  key: 5,
                                                  innerHTML: key(record, index)
                                                }, null, 8 /* PROPS */, _hoisted_42))
                                              : (vue.openBlock(), vue.createElementBlock("span", {
                                                  key: 6,
                                                  innerHTML: record[key[0]]
                                                }, null, 8 /* PROPS */, _hoisted_43))
                                ]))
                              }), 128 /* KEYED_FRAGMENT */)),
                              (__props.actions)
                                ? (vue.openBlock(), vue.createElementBlock("td", _hoisted_44, [
                                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.actions.actions, (act) => {
                                      return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                        key: act.path
                                      }, [
                                        (!act.permission || vue.unref(user).isAllowedTo(act.permission))
                                          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                              (!act.validator || act.validator(record))
                                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                                    (['confirmAction','confirmaction','confirm-action','confirm'].includes(act.type))
                                                      ? (vue.openBlock(), vue.createBlock(script$e, {
                                                          key: 0,
                                                          onActionSuccessful: $event => (_ctx.doEmitAction('actionSuccessful',record)),
                                                          onActionFailed: $event => (_ctx.doEmitAction('actionFailed',record)),
                                                          onActionCanceled: $event => (_ctx.doEmitAction('actionCanceled',record)),
                                                          "loading-message": act.label,
                                                          class: vue.normalizeClass(act.class),
                                                          url: _ctx.replaceActionUrl(act.url,record)
                                                        }, {
                                                          default: vue.withCtx(() => [
                                                            (act.icon)
                                                              ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                  key: 0,
                                                                  class: vue.normalizeClass(act.icon)
                                                                }, null, 2 /* CLASS */))
                                                              : vue.createCommentVNode("v-if", true),
                                                            vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                          ]),
                                                          _: 2 /* DYNAMIC */
                                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onActionSuccessful", "onActionFailed", "onActionCanceled", "loading-message", "class", "url"]))
                                                      : (['silentAction','silentaction','silent-action','silent'].includes(act.type))
                                                        ? (vue.openBlock(), vue.createBlock(script$d, {
                                                            key: 1,
                                                            onActionSuccessful: $event => (_ctx.doEmitAction('actionSuccessful',record)),
                                                            onActionFailed: $event => (_ctx.doEmitAction('actionFailed',record)),
                                                            onActionCanceled: $event => (_ctx.doEmitAction('actionCanceled',record)),
                                                            "loading-message": act.label,
                                                            class: vue.normalizeClass(act.class),
                                                            url: _ctx.replaceActionUrl(act.url,record)
                                                          }, {
                                                            default: vue.withCtx(() => [
                                                              (act.icon)
                                                                ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                    key: 0,
                                                                    class: vue.normalizeClass(act.icon)
                                                                  }, null, 2 /* CLASS */))
                                                                : vue.createCommentVNode("v-if", true),
                                                              vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                            ]),
                                                            _: 2 /* DYNAMIC */
                                                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onActionSuccessful", "onActionFailed", "onActionCanceled", "loading-message", "class", "url"]))
                                                        : (act.canvasId || act.type === 'offcanvas')
                                                          ? (vue.openBlock(), vue.createElementBlock("a", {
                                                              key: 2,
                                                              href: '#' + act.canvasId,
                                                              "data-bs-toggle": "offcanvas",
                                                              class: vue.normalizeClass(act.class)
                                                            }, [
                                                              (act.icon)
                                                                ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                    key: 0,
                                                                    class: vue.normalizeClass(act.icon)
                                                                  }, null, 2 /* CLASS */))
                                                                : vue.createCommentVNode("v-if", true),
                                                              vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                            ], 10 /* CLASS, PROPS */, _hoisted_45))
                                                          : (act.emits)
                                                            ? (vue.openBlock(), vue.createElementBlock("button", {
                                                                key: 3,
                                                                title: act.title,
                                                                class: vue.normalizeClass(act.class ? act.class:'btn btn-default'),
                                                                onClick: $event => (_ctx.doEmitAction(act.emits,record))
                                                              }, [
                                                                (act.icon)
                                                                  ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                      key: 0,
                                                                      class: vue.normalizeClass(act.icon)
                                                                    }, null, 2 /* CLASS */))
                                                                  : vue.createCommentVNode("v-if", true),
                                                                vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                              ], 10 /* CLASS, PROPS */, _hoisted_46))
                                                            : (!act.emits)
                                                              ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                                                                  key: 4,
                                                                  title: act.title,
                                                                  to: _ctx.replaceActionUrl(act.path,record),
                                                                  class: vue.normalizeClass(act.class)
                                                                }, {
                                                                  default: vue.withCtx(() => [
                                                                    (act.icon)
                                                                      ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                          key: 0,
                                                                          class: vue.normalizeClass(act.icon)
                                                                        }, null, 2 /* CLASS */))
                                                                      : vue.createCommentVNode("v-if", true),
                                                                    vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                                  ]),
                                                                  _: 2 /* DYNAMIC */
                                                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to", "class"]))
                                                              : vue.createCommentVNode("v-if", true)
                                                  ], 64 /* STABLE_FRAGMENT */))
                                                : vue.createCommentVNode("v-if", true)
                                            ], 64 /* STABLE_FRAGMENT */))
                                          : vue.createCommentVNode("v-if", true)
                                      ], 64 /* STABLE_FRAGMENT */))
                                    }), 128 /* KEYED_FRAGMENT */))
                                  ]))
                                : vue.createCommentVNode("v-if", true)
                            ], 10 /* CLASS, PROPS */, _hoisted_37))
                          }), 128 /* KEYED_FRAGMENT */))
                        : vue.createCommentVNode("v-if", true)
              ])
            ], 2 /* CLASS */))
          : (vue.openBlock(), vue.createElementBlock("div", _hoisted_47, [
              (_ctx.loading === 'loading')
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_48, [..._hoisted_50]))
                : (_ctx.loading === 'error')
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_51, [
                      vue.createElementVNode("span", null, vue.toDisplayString(_ctx.loading_error), 1 /* TEXT */)
                    ]))
                  : (_ctx.loading === 'done')
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_52, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.records, (record, index) => {
                          return (vue.openBlock(), vue.createElementBlock("div", {
                            key: record.id,
                            class: "single-mobile-req bg-light p-3",
                            onClick: $event => (_ctx.rowSelected(record))
                          }, [
                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.tableHeaders, (key) => {
                              return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                key: key[0]
                              }, [
                                (typeof key === 'string' )
                                  ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_54, vue.toDisplayString(key.replace(/_/g, ' ')), 1 /* TEXT */))
                                  : (typeof key === 'function')
                                    ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_55, vue.toDisplayString(key(null).replace(/_/g, ' ')), 1 /* TEXT */))
                                    : (vue.openBlock(), vue.createElementBlock("p", _hoisted_56, vue.toDisplayString(key[1].replace(/_/g, ' ')), 1 /* TEXT */)),
                                vue.createElementVNode("span", null, [
                                  (typeof key === 'string' && __props.links && __props.links[key])
                                    ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                                        key: 0,
                                        to: _ctx.replaceLinkUrl(__props.links[key],record),
                                        class: vue.normalizeClass(_ctx.getLinkClass(__props.links[key])),
                                        innerHTML: record[key]
                                      }, null, 8 /* PROPS */, ["to", "class", "innerHTML"]))
                                    : (_ctx.getFieldType(key) === 'numeric')
                                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_57, vue.toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                      : (_ctx.getFieldType(key) === 'money')
                                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_58, "KES " + vue.toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                        : (_ctx.getFieldType(key) === 'date')
                                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_59, vue.toDisplayString(_ctx.formatDate(record[key])), 1 /* TEXT */))
                                          : (typeof key    === 'string')
                                            ? (vue.openBlock(), vue.createElementBlock("span", {
                                                key: 4,
                                                innerHTML: record[key]
                                              }, null, 8 /* PROPS */, _hoisted_60))
                                            : (typeof key === 'function')
                                              ? (vue.openBlock(), vue.createElementBlock("span", {
                                                  key: 5,
                                                  innerHTML: key(record, index )
                                                }, null, 8 /* PROPS */, _hoisted_61))
                                              : (vue.openBlock(), vue.createElementBlock("span", {
                                                  key: 6,
                                                  innerHTML: record[key[0]]
                                                }, null, 8 /* PROPS */, _hoisted_62))
                                ]),
                                _hoisted_63
                              ], 64 /* STABLE_FRAGMENT */))
                            }), 128 /* KEYED_FRAGMENT */)),
                            (__props.actions)
                              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_64, [
                                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.actions.actions, (act) => {
                                    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                      key: act.path
                                    }, [
                                      (!act.permission || vue.unref(user).isAllowedTo(act.permission))
                                        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                            (!act.validator || act.validator(record))
                                              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                                  (act.canvasId)
                                                    ? (vue.openBlock(), vue.createElementBlock("a", {
                                                        key: 0,
                                                        href: '#' + act.canvasId,
                                                        "data-bs-toggle": "offcanvas",
                                                        class: vue.normalizeClass(act.class)
                                                      }, [
                                                        (act.icon)
                                                          ? (vue.openBlock(), vue.createElementBlock("span", {
                                                              key: 0,
                                                              class: vue.normalizeClass(act.icon)
                                                            }, null, 2 /* CLASS */))
                                                          : vue.createCommentVNode("v-if", true),
                                                        vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                      ], 10 /* CLASS, PROPS */, _hoisted_65))
                                                    : (act.emits)
                                                      ? (vue.openBlock(), vue.createElementBlock("button", {
                                                          key: 1,
                                                          title: act.title,
                                                          class: vue.normalizeClass(act.class ? act.class:'btn btn-default'),
                                                          onClick: $event => (_ctx.doEmitAction(act.emits,record))
                                                        }, [
                                                          (act.icon)
                                                            ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                key: 0,
                                                                class: vue.normalizeClass(act.icon)
                                                              }, null, 2 /* CLASS */))
                                                            : vue.createCommentVNode("v-if", true),
                                                          vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                        ], 10 /* CLASS, PROPS */, _hoisted_66))
                                                      : (!act.emits)
                                                        ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                                                            key: 2,
                                                            title: act.title,
                                                            to: _ctx.replaceActionUrl(act.path,record),
                                                            class: vue.normalizeClass(act.class)
                                                          }, {
                                                            default: vue.withCtx(() => [
                                                              (act.icon)
                                                                ? (vue.openBlock(), vue.createElementBlock("span", {
                                                                    key: 0,
                                                                    class: vue.normalizeClass(act.icon)
                                                                  }, null, 2 /* CLASS */))
                                                                : vue.createCommentVNode("v-if", true),
                                                              vue.createTextVNode(" " + vue.toDisplayString(act.label), 1 /* TEXT */)
                                                            ]),
                                                            _: 2 /* DYNAMIC */
                                                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to", "class"]))
                                                        : vue.createCommentVNode("v-if", true)
                                                ], 64 /* STABLE_FRAGMENT */))
                                              : vue.createCommentVNode("v-if", true)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : vue.createCommentVNode("v-if", true)
                                    ], 64 /* STABLE_FRAGMENT */))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              : vue.createCommentVNode("v-if", true)
                          ], 8 /* PROPS */, _hoisted_53))
                        }), 128 /* KEYED_FRAGMENT */))
                      ]))
                    : vue.createCommentVNode("v-if", true)
            ])),
    (_ctx.pagination_data)
      ? (vue.openBlock(), vue.createBlock(script$f, {
          key: 6,
          onLoadMoreRecords: _ctx.loadMoreRecords,
          "hide-load-more": __props.hideLoadMore,
          "per-page": _ctx.per_page,
          "hide-count": __props.hideCount,
          pagination_data: _ctx.pagination_data,
          onChangeKey: _ctx.changeKey,
          "pagination-style": _ctx.pageStyle
        }, null, 8 /* PROPS */, ["onLoadMoreRecords", "hide-load-more", "per-page", "hide-count", "pagination_data", "onChangeKey", "pagination-style"]))
      : vue.createCommentVNode("v-if", true),
    (__props.actions)
      ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 7 }, vue.renderList(__props.actions.actions, (action) => {
          return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: action.label
          }, [
            (action.canvasId)
              ? (vue.openBlock(), vue.createBlock(script$h, {
                  key: 0,
                  onOffcanvasClosed: _ctx.canvasClosed,
                  position: action.canvasPosition,
                  "canvas-size": action.canvasSize,
                  "canvas-title": action.canvasTitle,
                  "canvas-id": action.canvasId
                }, {
                  default: vue.withCtx(() => [
                    (_ctx.selectedRecord)
                      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(action.canvasComponent), vue.mergeProps({
                          key: 0,
                          onRecordUpdated: _ctx.reloadData
                        }, _ctx.cleanCanvasProps(action), { record: _ctx.selectedRecord }), null, 16 /* FULL_PROPS */, ["onRecordUpdated", "record"]))
                      : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onOffcanvasClosed", "position", "canvas-size", "canvas-title", "canvas-id"]))
              : vue.createCommentVNode("v-if", true)
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      : vue.createCommentVNode("v-if", true)
  ]))
}
}

});

script$b.__file = "src/lib/components/ShTable.vue";

var script$a = {
  __name: 'ShTabs',
  props: {
  tabs: {
    type: Array,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  sharedData: {
    type: Object
  },
  tabCounts: {
    type: Object
  },
  responsive: {
    type: Object
  },
  classes: {
    type: String
  },
  classOne: {
    type: String
  },
  classTwo: {
    type: String
  }
},
  setup(__props) {

const props = __props;
const route = vueRouter.useRoute();
const router = vueRouter.useRouter();
const currentTab = vue.ref('');
const path = vue.ref(route.path);

vue.onMounted(()=>{
  resetTabCounts();
  setTab(props.tabs[0]);
});

vue.watch(()=>props.tabCounts, () => {
  resetTabCounts();
});

vue.watch(()=>route.path,(newPath)=>{
  path.value = newPath;
});

const setTab = (tab) => {
  if (tab) {
    currentTab.value = tab.replace(/_/g, ' ');
  }
};
const setTabCounts = (tabCounts) => {
  if (typeof tabCounts === 'object') {
    setCounts(tabCounts);
  } else {
    shApis.doGet(tabCounts).then(res => {
      setCounts(res.data);
    });
  }
};
const resetTabCounts = () => {
  const arr = route.fullPath.split('/');
  if (!tabExistsInUrl()) {
    router.push(route.fullPath + '/tab/' + props.tabs[0]);
  } else {
    currentTab.value = arr[arr.length - 1];
  }
  if (props.tabCounts) {
    setTabCounts(props.tabCounts);
  }
};
const tabExistsInUrl = () => {
  let exists = false;
  props.tabs.forEach(tab => {
    if (route.fullPath.includes(`/${tab}`)) {
      exists = true;
    }
  });
  return exists
};
const setCounts = (res) => {
  Object.keys(res).forEach(key => {
    let elem = document.getElementsByClassName('sh_tab_' + key);
    if (elem.length > 0) {
      elem = elem[0];
      let txt = elem.innerHTML;
      txt = txt.split('<i class="d-none"></i>')[0];
      if (parseInt(res[key]) > 0) {
        elem.innerHTML = txt + '<i class="d-none"></i><sup class="sh_tab_count">' + res[key] + '</sup>';
      }
    }
  });
};

return (_ctx, _cache) => {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_router_view = vue.resolveComponent("router-view");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("ul", {
      class: vue.normalizeClass(["nav nav-tabs sh-tabs", __props.classes ?? vue.unref(shRepo).getShConfig('tabsClass','sh-tabs nav-tabs-bordered')])
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.tabs, (tab) => {
        return (vue.openBlock(), vue.createElementBlock("li", {
          class: "nav-item",
          key: tab
        }, [
          vue.createVNode(_component_router_link, {
            onClick: $event => (setTab(tab)),
            "active-class": 'active',
            class: vue.normalizeClass(["nav-link text-capitalize", 'sh_tab_' + tab]),
            to: __props.baseUrl+'/tab/'+tab,
            role: "tab"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(tab.replace(/_/g, ' ')), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick", "to", "class"])
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ], 2 /* CLASS */),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(["tab-content", __props.classTwo])
    }, [
      (vue.openBlock(), vue.createBlock(_component_router_view, {
        currentTab: currentTab.value,
        key: path.value,
        sharedData: __props.sharedData,
        tabCounts: __props.tabCounts
      }, null, 8 /* PROPS */, ["currentTab", "sharedData", "tabCounts"]))
    ], 2 /* CLASS */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$a.__file = "src/lib/components/ShTabs.vue";

const _hoisted_1$7 = {
  class: "nav-item",
  role: "presentation"
};
const _hoisted_2$4 = ["onClick"];
const _hoisted_3$4 = /*#__PURE__*/vue.createElementVNode("i", { class: "d-none" }, null, -1 /* HOISTED */);
const _hoisted_4$4 = { class: "sh_tab_count" };
const _hoisted_5$3 = { class: "tab-content" };

var script$9 = {
  __name: 'ShDynamicTabs',
  props: ['tabs','data','classes'],
  setup(__props) {

const props = __props;
const tabs = props.tabs;
let currentTab = vue.shallowRef(null);
const generatedId = vue.ref(null);
vue.ref(null);
vue.onMounted(()=>{
  generatedId.value =  'tab' + Math.random().toString(36).slice(2);
  if(tabs.length > 0) {
    currentTab.value = tabs[0];
  }
});

function setTab(tab){
  currentTab.value = tab;
}

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("ul", {
      class: vue.normalizeClass(["nav nav-tabs", vue.unref(shRepo).getShConfig('tabsClass','sh-tabs nav-tabs-bordered') + __props.classes]),
      role: "tablist"
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(tabs), (tab) => {
        return (vue.openBlock(), vue.createElementBlock("li", _hoisted_1$7, [
          vue.createElementVNode("button", {
            onClick: $event => (setTab(tab)),
            class: vue.normalizeClass(["nav-link", vue.unref(currentTab) === tab ? 'active':''])
          }, [
            vue.createTextVNode(vue.toDisplayString(tab.label) + " ", 1 /* TEXT */),
            (tab.count || tab.tabCount)
              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  _hoisted_3$4,
                  vue.createElementVNode("sup", _hoisted_4$4, vue.toDisplayString(tab.count ?? tab.tabCount), 1 /* TEXT */)
                ], 64 /* STABLE_FRAGMENT */))
              : vue.createCommentVNode("v-if", true)
          ], 10 /* CLASS, PROPS */, _hoisted_2$4)
        ]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ], 2 /* CLASS */),
    vue.createElementVNode("div", _hoisted_5$3, [
      (vue.unref(currentTab))
        ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(currentTab).component), vue.normalizeProps(vue.mergeProps({ key: 0 }, vue.unref(currentTab))), null, 16 /* FULL_PROPS */))
        : vue.createCommentVNode("v-if", true)
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$9.__file = "src/lib/components/ShDynamicTabs.vue";

const _hoisted_1$6 = ["href"];


var script$8 = {
  __name: 'ShModalBtn',
  props: {
  modalId: {
    required: true
  }
},
  setup(__props) {

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("a", {
    href: `#${__props.modalId}`,
    "data-bs-toggle": "modal"
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1$6))
}
}

};

script$8.__file = "src/lib/components/ShModalBtn.vue";

const _hoisted_1$5 = ["href"];


var script$7 = {
  __name: 'ShCanvasBtn',
  props: {
  canvasId: {
    required: true,
    type: String
  }
},
  setup(__props) {

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("a", {
    href: `#${__props.canvasId}`,
    "data-bs-toggle": "offcanvas"
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1$5))
}
}

};

script$7.__file = "src/lib/components/ShCanvasBtn.vue";

const _withScopeId$1 = n => (vue.pushScopeId("data-v-0d4fa0ac"),n=n(),vue.popScopeId(),n);
const _hoisted_1$4 = { class: "row permissions-main d-flex" };
const _hoisted_2$3 = {
  id: "permissions-nav",
  class: "col-md-3 d-flex align-items-center py-4"
};
const _hoisted_3$3 = {
  key: 0,
  class: "mx-auto"
};
const _hoisted_4$3 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/vue.createElementVNode("span", { class: "spinner-grow mx-auto" }, null, -1 /* HOISTED */));
const _hoisted_5$2 = [
  _hoisted_4$3
];
const _hoisted_6$2 = {
  key: 1,
  class: "d-flex flex-column w-100 px-2"
};
const _hoisted_7$1 = ["checked", "onClick", "disabled"];
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = {
  id: "permissions-content",
  class: "col-md-9 py-4 px-4"
};
const _hoisted_10$1 = { class: "p-2 rounded-2 bg-white h-100" };
const _hoisted_11$1 = {
  key: 0,
  class: "alert alert-info"
};
const _hoisted_12 = { key: 1 };
const _hoisted_13 = { class: "row row-cols-3" };
const _hoisted_14 = { class: "col" };
const _hoisted_15 = ["value"];
const _hoisted_16 = {
  key: 0,
  class: "w-100 row"
};
const _hoisted_17 = { class: "col-md-3" };
const _hoisted_18 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/vue.createElementVNode("i", { class: "bi-check" }, null, -1 /* HOISTED */));


var script$6 = {
  __name: 'ManagePermissions',
  emits: ['success'],
  setup(__props, { emit: __emit }) {

const emit = __emit;

const userStore =useUserStore();

const route = vueRouter.useRoute();
const modules = vue.ref([]);
const selectedModule = vue.ref('tasks');
const modulePermissions = vue.ref(null);

const selectedPermissions = vue.ref([]);
const permissionsChanged = vue.ref(false);
const departmentId = route.params.id;
const department = vue.ref(null);
const departmentModules = vue.ref([]);
const setModule = module=>{
  (selectedModule.value !== module) && (selectedModule.value = module) && getModulePermissions();
};
vue.onMounted(() => {
  getDepartmentModules();
});
const loadingModules = vue.ref(false);
const getDepartmentModules = ()=>{
  loadingModules.value = true;
  shApis.doGet(`sh-departments/department/list-all-modules/sh-departments/${departmentId}`).then(res=>{
    loadingModules.value = false;
    modules.value = res.data.modules;
    department.value = res.data.department;
    departmentModules.value = res.data.departmentModules;
    selectedModule.value = res.data.modules[0];
    getModulePermissions();
  }).catch(ex=>{
    loadingModules.value = false;
    // console.log(ex)
    shRepo.showToast(ex.message, 'error');
  });
};
const loading = vue.ref(false);
const getModulePermissions = () => {
  loading.value = true;
  modulePermissions.value = null;
  shApis.doGet(`sh-departments/department/get-module-permissions/${selectedModule.value}?department_id=${departmentId}`).then(res=>{
    loading.value = false;
    modulePermissions.value = reformatModulePermissions(res.data.permissions);
    selectedPermissions.value = res.data.selectedPermissions ?? [];
    permissionsChanged.value = false;
  }).catch(ex=>{
    console.log(ex);
    loading.value = false;
    shRepo.showToast(ex.message, 'error');
  });
};
const permissionsUpdated = (res)=>{
  userStore.setUser();
  emit('success');
  departmentModules.value = res.data.departmentModules;
};
function reformatModulePermissions(mPs){
let mpModules = {};
  mPs.map(mp=>{
    const arr = mp.split('.');
    const key = arr[0];
    if(typeof mpModules[key] == 'undefined'){
      mpModules[key]=[];
    }
    mpModules[key].push(mp);
  });
  return mpModules
}
const setPermissionsChanged = ()=>{
  permissionsChanged.value = true;
  return true
};
const checkAllPermissions = (module)=>{
  if(selectedPermissions.value.length > 0) {
    selectedPermissions.value = [];
  } else {
    departmentModules.value.push(selectedModule);
    console.log(modulePermissions.value);
    const all = modulePermissions.value;
    Object.keys(all).map(key=>{
      all[key].map(permission=>{
        selectedPermissions.value.push(permission);
      });
    });
    selectedPermissions.value.push(module);
  }
  permissionsChanged.value = true;
};
const getLabel = permission => {
  const arr = permission.split('.');
  return arr[arr.length - 1].replaceAll('_',' ')
};
const getPermissionStyle = permission => {
  return {
    paddingLeft: `${(permission.split('.').length-1) * 20}px`
  }
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
    vue.createElementVNode("div", _hoisted_2$3, [
      (loadingModules.value)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$3, [..._hoisted_5$2]))
        : (vue.openBlock(), vue.createElementBlock("ul", _hoisted_6$2, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(modules.value, (module) => {
              return (vue.openBlock(), vue.createElementBlock("li", {
                class: vue.normalizeClass(selectedModule.value === module && 'active'),
                key: selectedModule.value
              }, [
                vue.createElementVNode("input", {
                  checked: departmentModules.value.includes(module),
                  onClick: $event => (checkAllPermissions(module)),
                  disabled: selectedModule.value !== module,
                  type: "checkbox"
                }, null, 8 /* PROPS */, _hoisted_7$1),
                vue.createElementVNode("label", {
                  class: "text-capitalize",
                  onClick: $event => (setModule(module))
                }, vue.toDisplayString(module.replaceAll('_',' ')), 9 /* TEXT, PROPS */, _hoisted_8$1)
              ], 2 /* CLASS */))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
    ]),
    vue.createElementVNode("div", _hoisted_9$1, [
      vue.createElementVNode("div", _hoisted_10$1, [
        (loading.value)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, " loading ... "))
          : (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [
              vue.createElementVNode("div", _hoisted_13, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(modulePermissions.value, (permissions) => {
                  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(permissions, (permission) => {
                      return (vue.openBlock(), vue.createElementBlock("label", {
                        onClick: setPermissionsChanged,
                        class: "text-capitalize list-group-item pb-1 text-capitalize",
                        style: vue.normalizeStyle(getPermissionStyle(permission))
                      }, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((selectedPermissions).value = $event)),
                          value: permission,
                          type: "checkbox"
                        }, null, 8 /* PROPS */, _hoisted_15), [
                          [vue.vModelCheckbox, selectedPermissions.value]
                        ]),
                        vue.createTextVNode(" " + vue.toDisplayString(getLabel(permission)), 1 /* TEXT */)
                      ], 4 /* STYLE */))
                    }), 256 /* UNKEYED_FRAGMENT */))
                  ]))
                }), 256 /* UNKEYED_FRAGMENT */))
              ]),
              (permissionsChanged.value)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, [
                    vue.createElementVNode("div", _hoisted_17, [
                      vue.createVNode(script$d, {
                        onSuccess: permissionsUpdated,
                        url: `sh-departments/department/permissions/${vue.unref(departmentId)}/${selectedModule.value}`,
                        data: {permissions: selectedPermissions.value},
                        class: "btn btn-primary d-block"
                      }, {
                        default: vue.withCtx(() => [
                          _hoisted_18,
                          vue.createTextVNode(" Save")
                        ]),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["url", "data"])
                    ])
                  ]))
                : vue.createCommentVNode("v-if", true)
            ]))
      ])
    ])
  ]))
}
}

};

script$6.__scopeId = "data-v-0d4fa0ac";
script$6.__file = "src/lib/components/core/Departments/department/ManagePermissions.vue";

const useAppStore = pinia.defineStore('sh-app',{
    state: ()=>{
        return {
            refreshKey: 0,
            appData: {}
        }
    },
    actions: {
        refreshPage () {
            this.refreshKey++;
            return true
        },
        refresh () {
            this.refreshKey++;
            return true
        },
        reload () {
            this.refreshKey++;
            return true
        }
    }
});

const _hoisted_1$3 = ["href"];

var script$5 = {
  __name: 'ShRoutePopups',
  setup(__props) {

const {refreshKey} = pinia.storeToRefs(useAppStore());
const route = vueRouter.useRoute();
const popUp = vue.ref(route.meta.popUp);
const modalId = ___default["default"].uniqueId('modal_');
const canvasId = ___default["default"].uniqueId('canvas_');
const componentView = vue.ref(null);
vue.ref(null);
const router = vueRouter.useRouter();
const position = vue.ref(null);
const size = vue.ref(null);
const title = vue.ref(null);
vue.watch(() => route.meta, meta => {
  popUp.value = meta.popUp ?? meta.popup;
  if (popUp.value) {
    // popups.push(meta)
    // !popupPaths.includes(route.path) && popupPaths.push(route.path) && popups.push(meta)
    position.value = meta.position ?? meta.side;
    size.value = meta.size;
    title.value = meta.title;
    componentView.value = vue.markRaw(route.matched[route.matched.length - 1].components.default);
    setTimeout(() => {
      initPopup();
    }, 100);
  } else {
    //no pop up, check if we have any unclosed backdrop
    setTimeout(() => {
      closeOrphanedBackdrops();
    }, 500);
  }
});
const closeOrphanedBackdrops = () => {
  const offCanvasBackdrop = document.querySelector('.offcanvas-backdrop');
  if (offCanvasBackdrop) {
    if (!document.querySelector('.offcanvas.show')) {
      offCanvasBackdrop.remove();
    }
  }
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) {
    if (!document.querySelector('.modal.show')) {
      modalBackdrop.remove();
    }
  }
};
const initPopup = () => {
  if (popUp.value === 'modal') {
    // modalButton.value.click()
    const modal = document.getElementById(modalId);
    const bsModal = new bootstrap.Modal(modal, {});
    bsModal.show();
    modal.addEventListener('hidden.bs.modal', event => {
      event.target.id === modalId && goBack();
    });
  } else if (['offcanvas', 'canvas', 'offCanvas'].includes(popUp.value)) {
    const offCanvas = document.getElementById(canvasId);
    const bsOffCanvas = new bootstrap.Offcanvas(offCanvas, {});
    bsOffCanvas.show();
    offCanvas.addEventListener('hidden.bs.offcanvas', event => {
      event.target.id === canvasId && goBack();
    });
  }
};
const goBack = () => {
  if (route.matched.length) {
    let backUrl = route.matched[route.matched.length - 2].path;
    const params = route.params;
    Object.keys(params).map(key => backUrl = backUrl.replace(`:${key}`,params[key]));
    router.push(backUrl);
  }
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("a", {
      "data-bs-toggle": "offcanvas",
      href: '#' + vue.unref(canvasId),
      shallowRef: "canvasButton",
      class: "d-none"
    }, "Open Modal", 8 /* PROPS */, _hoisted_1$3),
    (popUp.value === 'modal')
      ? (vue.openBlock(), vue.createBlock(script$k, {
          key: 0,
          "modal-title": title.value,
          "modal-id": vue.unref(modalId),
          "modal-size": size.value,
          "data-bs-backdrop": "static",
          "data-bs-keyboard": "false"
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(componentView.value), { key: vue.unref(refreshKey) }))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modal-title", "modal-id", "modal-size"]))
      : vue.createCommentVNode("v-if", true),
    (['offcanvas','canvas','offCanvas'].includes(popUp.value))
      ? (vue.openBlock(), vue.createBlock(script$h, {
          key: 1,
          "canvas-id": vue.unref(canvasId),
          "canvas-title": title.value,
          "canvas-size": size.value,
          position: position.value
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(componentView.value), { key: vue.unref(refreshKey) }))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["canvas-id", "canvas-title", "canvas-size", "position"]))
      : vue.createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$5.__file = "src/lib/components/popups/ShRoutePopups.vue";

var script$4 = {
  __name: 'ShQueryForm',
  setup(__props) {

const route = vueRouter.useRoute();

const fields = route.query.fields.split(',');
const action = route.query.action;

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createBlock(script$m, {
    fields: vue.unref(fields),
    action: vue.unref(action)
  }, null, 8 /* PROPS */, ["fields", "action"]))
}
}

};

script$4.__file = "src/lib/components/ShQueryForm.vue";

var script$3 = {
  __name: 'ShQueryPopups',
  setup(__props) {

const route = vueRouter.useRoute();
const popUp = vue.ref(route.query.popUp);
const modalId = ___default["default"].uniqueId('modal_');
const canvasId = ___default["default"].uniqueId('canvas_');
let popupComponent = vue.ref(null);
vue.ref(null);
const router = vueRouter.useRouter();
const position = vue.ref(null);
const size = vue.ref(null);
const title = vue.ref(null);
vue.ref(null);

const {refreshKey} = pinia.storeToRefs(useAppStore());

vue.watch(() => route.query.popup, pop => {
  popUp.value = pop;
  position.value = route.query.position ?? route.query.side;
  size.value = route.query.size;
  title.value = route.query.title;
  let queryComponent = route.query.comp ?? route.query.component;
  if(queryComponent && ['shqueryform','queryform'].includes(queryComponent.toLowerCase())) {
    queryComponent = script$4;
  }
  popupComponent.value = queryComponent;
  if (popUp.value) {
    setTimeout(() => {
      initPopup();
    }, 100);
  } else {
    //no pop up, check if we have any unclosed backdrop
    setTimeout(() => {
      closeOrphanedBackdrops();
    }, 500);
  }
});

const closeOrphanedBackdrops = () => {
  const offCanvasBackdrop = document.querySelector('.offcanvas-backdrop');
  if (offCanvasBackdrop) {
    if (!document.querySelector('.offcanvas.show')) {
      offCanvasBackdrop.remove();
    }
  }
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) {
    if (!document.querySelector('.modal.show')) {
      modalBackdrop.remove();
    }
  }
};
const initPopup = () => {
  if (popUp.value === 'modal') {
    // modalButton.value.click()
    const modal = document.getElementById(modalId);
    const bsModal = new bootstrap.Modal(modal, {});
    bsModal.show();
    modal.addEventListener('hidden.bs.modal', event => {
      event.target.id === modalId && goBack();
    });
  } else if (['offcanvas', 'canvas', 'offCanvas'].includes(popUp.value)) {
    const offCanvas = document.getElementById(canvasId);
    const bsOffCanvas = new bootstrap.Offcanvas(offCanvas, {});
    bsOffCanvas.show();
    offCanvas.addEventListener('hidden.bs.offcanvas', event => {
      event.target.id === canvasId && goBack();
    });
  }
};
const goBack = () => {
  if (route.matched.length) {
    let backUrl = route.path;
    const params = route.query;
      let query = '?';
      // console.log(params)
    Object.keys(params).map(key => {
        const removeKeys = ['popup','comp','component'];
        if(!removeKeys.includes(key)) {
            query += `${key}=${params[key]}&`;
        }
    });
      console.log(query);
    router.push(backUrl + query);
  }
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    (popUp.value === 'modal')
      ? (vue.openBlock(), vue.createBlock(script$k, {
          key: 0,
          "modal-title": title.value,
          "data-bs-backdrop": "static",
          "data-bs-keyboard": "false",
          "modal-id": vue.unref(modalId),
          "modal-size": size.value
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(popupComponent)), { key: vue.unref(refreshKey) }))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modal-title", "modal-id", "modal-size"]))
      : vue.createCommentVNode("v-if", true),
    (['offcanvas','canvas','offCanvas'].includes(popUp.value))
      ? (vue.openBlock(), vue.createBlock(script$h, {
          "canvas-title": title.value,
          key: size.value + position.value,
          "canvas-id": vue.unref(canvasId),
          "canvas-size": size.value,
          position: position.value
        }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(popupComponent)), { key: vue.unref(refreshKey) }))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["canvas-title", "canvas-id", "canvas-size", "position"]))
      : vue.createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$3.__file = "src/lib/components/popups/ShQueryPopups.vue";

const _hoisted_1$2 = /*#__PURE__*/vue.createElementVNode("h5", null, "Departments", -1 /* HOISTED */);
const _hoisted_2$2 = { class: "card sh-departments-card shadow" };
const _hoisted_3$2 = { class: "card-body" };
const _hoisted_4$2 = /*#__PURE__*/vue.createElementVNode("i", { class: "fa fa-plus" }, null, -1 /* HOISTED */);


var script$2 = {
  __name: 'Departments',
  setup(__props) {

vue.ref([]);
let reload = vue.ref(0);

function departmentAdded (response) {
  shRepo.showToast('Department saved');
  reload.value += 1;
}

const department = vue.ref(null);
const editDepartment = dept=>{
department.value = dept;
  if(dept) {
    new bootstrap.Modal(document.getElementById('sh_department_modal'),{}).show();
  }
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    _hoisted_1$2,
    vue.createElementVNode("div", _hoisted_2$2, [
      vue.createElementVNode("div", _hoisted_3$2, [
        vue.createElementVNode("a", {
          onClick: _cache[0] || (_cache[0] = $event => (editDepartment(null))),
          "data-bs-toggle": "modal",
          ref: "addDeptBtn",
          href: "#sh_department_modal",
          class: "btn btn-info btn-sm"
        }, [
          _hoisted_4$2,
          vue.createTextVNode(" ADD DEPARTMENT")
        ], 512 /* NEED_PATCH */),
        vue.createVNode(script$b, {
          reload: vue.unref(reload),
          headers: ['id','name','description', 'created_at'],
          "end-point": "sh-departments/list",
          actions: {
      label: 'Action',
      actions: [
        {
          label: 'Edit',
          emits: editDepartment,
          class: 'btn btn-warning bi-pen btn-sm me-1'
        },
        {
          label: 'Permissions',
          path: '/sh-departments/manage-permissions/{id}',
          class: 'btn btn-info bi-lock btn-sm'
        }
      ]
    }
        }, null, 8 /* PROPS */, ["reload", "actions"]),
        vue.createVNode(script$k, {
          "modal-id": "sh_department_modal",
          "modal-title": "Department Form"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(script$u, {
              "success-callback": "departmentAdded",
              "current-data": department.value,
              onDepartmentAdded: departmentAdded,
              action: "admin/departments/store",
              fields: ['name','description']
            }, null, 8 /* PROPS */, ["current-data"])
          ]),
          _: 1 /* STABLE */
        })
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$2.__file = "src/lib/components/core/Departments/Departments.vue";

const _hoisted_1$1 = {
  key: 0,
  class: "card sh-department-view shadow"
};
const _hoisted_2$1 = { class: "card-body" };
const _hoisted_3$1 = /*#__PURE__*/vue.createElementVNode("a", {
  href: "#addModule",
  class: "btn btn-info btn-sm",
  "data-bs-toggle": "modal"
}, [
  /*#__PURE__*/vue.createElementVNode("i", { class: "bi-plus" }),
  /*#__PURE__*/vue.createTextVNode(" ADD Module")
], -1 /* HOISTED */);
const _hoisted_4$1 = { class: "text-primary text-capitalize" };
const _hoisted_5$1 = ["value"];
const _hoisted_6$1 = /*#__PURE__*/vue.createElementVNode("i", { class: "fa fa-save" }, null, -1 /* HOISTED */);

var script$1 = {
  __name: 'Department',
  setup(__props) {

const route = vueRouter.useRoute();
const id = vue.ref(route.params.id);
let department = vue.ref(null);
let permissionCanvasBtn = vue.ref(null);
let reload = vue.ref(1);
let module = vue.ref(null);
let modulePermissions = vue.ref(null);
let selectedPermissions = vue.ref([]);
const userStore = useUserStore();

pinia.storeToRefs(userStore);

vue.onMounted(() => {
getDepartment();
});

let getModule = vue.computed(()=>{
  return module.value
});



function moduleAdded () {
  shRepo.showToast('module added successfully', 'success');
  userStore.setUser();
  reload.value++;
}
function showModule (module) {
  if (module) {
    return '<span class="text-capitalize">' + module.module.replace('_', ' ') + '</span>'
  }
  return 'Module'
}
function deletePermission (module) {
  shRepo.runPlainRequest('admin/departments/department/delete-department/' + module.id).then((res) => {
    if (res.isConfirmed) {
      reload.value++;
      // shRepo.showToast('module removed successfully', 'success')
    }
  });
}
function viewPermissions(rModule) {
  module.value = null;
  permissionCanvasBtn.value.click();
  modulePermissions.value = null;
  selectedPermissions.value = [];
  shApis.doGet('admin/departments/department/get-module-permissions/' + rModule.module).then(res => {
    modulePermissions.value = res.data.permissions;
    module.value = rModule;
    if (rModule.permissions) {
      selectedPermissions.value = rModule.permissions;
    }
    console.log(module.value);
  }).catch(ex => {
    console.log(ex);
    // helpers.showToast('An error occurred while fetching permissions')
  });
}
function getDepartment() {
  shApis.doGet('admin/departments/department/' + id.value).then(res => {
    department.value = res.data.department;
  }).catch(ex => {
    console.log(ex);
  });
}
function getPermissionLeft (menu) {
  const len = menu.split('.').length * 2;
  if (len > 5) {
    return 5
  }
  return len
}
function getPermissionLabel(menu) {
  const arr = menu.split('.');
  return arr[arr.length - 1].replace(/_/g, ' ')
}
function submitPermissions() {
  const data = {
    permissions: selectedPermissions.value
  };
  shApis.doPost('admin/departments/department/permissions/' + getModule.value.id, data)
      .then(res => {
        reload.value++;
        userStore.setUser();
        shRepo.showToast('Permissions updated', 'success');
      });
}

return (_ctx, _cache) => {
  return (vue.unref(department))
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
        vue.createElementVNode("div", _hoisted_2$1, [
          _hoisted_3$1,
          vue.createElementVNode("h5", null, "Department #" + vue.toDisplayString(vue.unref(department).id) + " - " + vue.toDisplayString(vue.unref(department).name) + " Allowed Modules", 1 /* TEXT */),
          vue.createVNode(script$b, {
            actions: {
      label: 'Actions',
      actions: [
        {
          label: 'Permissions',
          emits: viewPermissions,
          class: 'btn btn-success btn-sm'
        },
        {
          label: 'Delete',
          emits: deletePermission,
          class: 'btn btn-danger mx-2 btn-sm'
        }
      ]
    },
            reload: vue.unref(reload),
            headers: ['id',showModule,'created_at'],
            "end-point": 'admin/departments/department/list-modules/' + id.value
          }, null, 8 /* PROPS */, ["actions", "reload", "headers", "end-point"]),
          vue.createVNode(script$k, {
            "modal-id": "addModule",
            "modal-title": "Add Module Department"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(script$u, {
                "reload-select-items": vue.unref(reload),
                "success-callback": moduleAdded,
                "fill-selects": {
        permission_module: {
          url: 'admin/departments/department/list-pending-modules/' + id.value,
          suggests: true
        }
      },
                fields: ['permission_module'],
                action: 'admin/departments/department/add-module/' + id.value
              }, null, 8 /* PROPS */, ["reload-select-items", "fill-selects", "action"])
            ]),
            _: 1 /* STABLE */
          }),
          vue.createElementVNode("a", {
            href: "#permissionsCanvas",
            class: "d-none",
            ref_key: "permissionCanvasBtn",
            ref: permissionCanvasBtn,
            "data-bs-toggle": "offcanvas"
          }, null, 512 /* NEED_PATCH */),
          vue.createVNode(script$h, {
            "canvas-id": "permissionsCanvas",
            position: "end enlarged",
            "canvas-title": "Module Permissions"
          }, {
            default: vue.withCtx(() => [
              (vue.unref(getModule))
                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    vue.createElementVNode("h5", _hoisted_4$1, "Permissions for " + vue.toDisplayString(vue.unref(getModule).module), 1 /* TEXT */),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(modulePermissions), (permission) => {
                      return (vue.openBlock(), vue.createElementBlock("div", {
                        key: permission,
                        class: "list-group p-0"
                      }, [
                        vue.createElementVNode("label", {
                          class: vue.normalizeClass(["list-group-item pb-0 text-capitalize", 'ms-' + getPermissionLeft(permission)])
                        }, [
                          vue.withDirectives(vue.createElementVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (vue.isRef(selectedPermissions) ? (selectedPermissions).value = $event : selectedPermissions = $event)),
                            value: permission
                          }, null, 8 /* PROPS */, _hoisted_5$1), [
                            [vue.vModelCheckbox, vue.unref(selectedPermissions)]
                          ]),
                          vue.createTextVNode(" " + vue.toDisplayString(getPermissionLabel(permission)), 1 /* TEXT */)
                        ], 2 /* CLASS */)
                      ]))
                    }), 128 /* KEYED_FRAGMENT */)),
                    vue.createElementVNode("button", {
                      onClick: submitPermissions,
                      class: "btn btn-info"
                    }, [
                      _hoisted_6$1,
                      vue.createTextVNode(" Submit")
                    ])
                  ], 64 /* STABLE_FRAGMENT */))
                : vue.createCommentVNode("v-if", true)
            ]),
            _: 1 /* STABLE */
          })
        ])
      ]))
    : vue.createCommentVNode("v-if", true)
}
}

};

script$1.__file = "src/lib/components/core/Departments/department/Department.vue";

const _withScopeId = n => (vue.pushScopeId("data-v-2911509a"),n=n(),vue.popScopeId(),n);
const _hoisted_1 = {
  key: 0,
  class: "alert alert-info"
};
const _hoisted_2 = {
  key: 0,
  class: "sh-forgot-section",
  style: {"min-width":"400px"}
};
const _hoisted_3 = { class: "sh-auth-footer" };
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("i", { class: "bi bi-arrow-left" }, null, -1 /* HOISTED */));
const _hoisted_5 = {
  key: 1,
  class: "sh-login-section"
};
const _hoisted_6 = { class: "sh-auth-footer" };
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("strong", { class: "bi-dot" }, null, -1 /* HOISTED */));
const _hoisted_8 = {
  key: 2,
  class: "sh-register-section"
};
const _hoisted_9 = {
  key: 0,
  class: "sh-register-title"
};
const _hoisted_10 = {
  key: 1,
  class: "sh-register-link"
};
const _hoisted_11 = { class: "sh-auth-footer" };

var script = {
  __name: 'ShAuth',
  setup(__props) {

const router = vueRouter.useRouter();
const userStore = useUserStore();
userStore.setUser();
const {user} = pinia.storeToRefs(userStore);
const section = vue.ref('login');
const registerEndpoint = vue.inject('registerEndpoint');
const forgotEndpoint = vue.inject('forgotEndpoint');
const loginEndpoint = vue.inject('loginEndpoint');
const registrationFields = vue.inject('registrationFields');
const registerTitle = vue.inject('registerTitle');
const registerSubTitle = vue.inject('registerSubTitle');
vue.inject('redirectRegister');
const redirectLogin = vue.inject('redirectLogin');
function goToSection(newSection){
  section.value = newSection;
}
vue.watch(user,(newUser) => {
  if(newUser.value && redirectLogin) {
    router.push(redirectLogin);
  }
});
vue.onMounted(()=>{
  if(user.value && redirectLogin){
    router.push(redirectLogin);
  }
});
function loginSuccessful(res){
  userStore.setAccessToken(res.token);
  userStore.setUser();
  window.location.href = redirectLogin;
}

const forgotSuccessful = ()=>{
  shRepo.showToast('Reset link sent to your email');
};

return (_ctx, _cache) => {
  return (vue.unref(user))
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createTextVNode("You are signed is as "),
        vue.createElementVNode("strong", null, vue.toDisplayString(vue.unref(user).name), 1 /* TEXT */)
      ]))
    : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        (section.value === 'forgot')
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.createVNode(script$u, {
                class: "sh-login-form",
                fields: ['email'],
                "action-label": "Send Reset Link",
                action: vue.unref(forgotEndpoint),
                "success-callback": forgotSuccessful
              }, null, 8 /* PROPS */, ["action"]),
              vue.createElementVNode("div", _hoisted_3, [
                vue.createElementVNode("strong", {
                  onClick: _cache[0] || (_cache[0] = $event => (goToSection('login'))),
                  class: "sh-register-link text-primary"
                }, [
                  _hoisted_4,
                  vue.createTextVNode(" Back to Login ")
                ])
              ])
            ]))
          : vue.createCommentVNode("v-if", true),
        (section.value === 'login')
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
              vue.createVNode(script$u, {
                class: "sh-login-form",
                fields: ['email','password'],
                "action-label": "Login",
                action: vue.unref(loginEndpoint),
                "success-callback": loginSuccessful
              }, null, 8 /* PROPS */, ["action"]),
              vue.createElementVNode("div", _hoisted_6, [
                vue.createElementVNode("strong", {
                  class: "sh-forgot-link text-primary",
                  onClick: _cache[1] || (_cache[1] = $event => (goToSection('forgot')))
                }, "Forgotten password?"),
                _hoisted_7,
                vue.createElementVNode("strong", {
                  onClick: _cache[2] || (_cache[2] = $event => (goToSection('register'))),
                  class: "sh-register-link text-primary"
                }, "Sign Up")
              ])
            ]))
          : vue.createCommentVNode("v-if", true),
        (section.value === 'register')
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
              (vue.unref(registerTitle))
                ? (vue.openBlock(), vue.createElementBlock("h3", _hoisted_9, vue.toDisplayString(vue.unref(registerTitle)), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true),
              (vue.unref(registerSubTitle))
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, vue.toDisplayString(vue.unref(registerSubTitle)), 1 /* TEXT */))
                : vue.createCommentVNode("v-if", true),
              vue.createVNode(script$u, {
                class: "sh-login-form",
                fields: vue.unref(registrationFields),
                "action-label": "Sign Up",
                action: vue.unref(registerEndpoint),
                "success-callback": loginSuccessful
              }, null, 8 /* PROPS */, ["fields", "action"]),
              vue.createElementVNode("div", _hoisted_11, [
                vue.createElementVNode("strong", {
                  onClick: _cache[3] || (_cache[3] = $event => (goToSection('login'))),
                  class: "sh-register-link text-primary"
                }, "Already have an account?")
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ], 64 /* STABLE_FRAGMENT */))
}
}

};

script.__scopeId = "data-v-2911509a";
script.__file = "src/lib/components/core/auth/ShAuth.vue";

const ShFrontend = {
  install: (app, options) => {
    if(options.sessionTimeout){
      app.provide('sessionTimeout',options.sessionTimeout);
      ShStorage.setItem('sessionTimeout',options.sessionTimeout);
    }
    const shFormElements = options.shFormElementClasses ?? {};

    const defaultFormElementClasses = {
      formGroup: shFormElements.formGroup ?? 'mb-2',
      formLabel: shFormElements.formLabel ?? 'form-label',
      helperText: shFormElements.helperText ?? 'form-text',
      actionBtn: shFormElements.actionBtn ?? 'btn btn-primary',
      formErrorTitle: shFormElements.formErrorTitle ?? 'alert alert-danger',
      invalidFeedback: shFormElements.invalidFeedback ?? 'invalid-feedback',
      formControl: shFormElements.formControl ?? 'invalid-feedback',
    };
    const swalPosition = options.swalPosition ?? 'top-end';
    const loginEndpoint = options.loginEndpoint ?? 'auth/login';
    const registerEndpoint = options.registerEndpoint ?? 'auth/register';
    const forgotEndpoint = options.forgotEndpoint ?? 'auth/forgot-password';
    const registerTitle = options.registerTitle ?? 'Create a new account';
    const registerSubTitle = options.registerSubTitle ?? `It's quick and easy`;
    const logoutApiEndpoint = options.logoutApiEndpoint ?? `auth/logout`;
    options.formTextInput ?? script$r;
    const loginUrl = options.loginUrl ?? `/login`;
    const redirectLogin = options.redirectLogin ?? `/`;
    const redirectRegister = options.redirectRegister ?? `/`;
    const noRecordsComponent = options.noRecordsComponent ?? script$g;
    const registrationFields = options.registrationFields ?? ['name','email','phone','password','password_confirmation'];
    const AuthComponent = options.authComponent ?? script;
    app.provide('loginEndpoint',loginEndpoint);
    app.provide('registerEndpoint', registerEndpoint);
    app.provide('registrationFields', registrationFields);
    app.provide('registerTitle', registerTitle);
    app.provide('registerSubTitle', registerSubTitle);
    app.provide('redirectLogin', redirectLogin);
    app.provide('redirectRegister', redirectRegister);
    app.provide('logoutApiEndpoint', logoutApiEndpoint);
    app.provide('formComponents', options.shFormComponents ?? {});
    app.provide('loginUrl', loginUrl);
    app.provide('shFormElementClasses',defaultFormElementClasses);
    app.provide('noRecordsComponent',noRecordsComponent);
    app.provide('forgotEndpoint',forgotEndpoint);
    window.swalPosition = swalPosition;
    if(options.router) {
      options.router.addRoute({
        path: '/sh-auth',
        component: AuthComponent
      });
      options.router.addRoute({
        path: '/sh-departments',
        component: script$2
      });
      options.router.addRoute({
        path: '/sh-departments/permissions/:id',
        component: script$1
      });
      options.router.addRoute({
        path: '/sh-departments/manage-permissions/:id',
        component: script$6
      });
    }
    //filter unwanted config items from options to be put in local storage
    const removeKeys = ['formTextInput','router','shFormElementClasses'];
    const allowKeys = [];
    Object.keys(options).map(key=> ((!['string','integer','number'].includes(typeof options[key]) && !allowKeys.includes(key)) || removeKeys.includes(key)) && delete options[key]);

    ShStorage.setItem('ShConfig',options);
  }
};

const query = async qlQuery => {
    const result = await shApis.graphQlQuery(qlQuery);
    return result.data
};
const mutate = async mutation => {
    const result = await shApis.graphQlMutate(mutation);
    return result.data
};
var shGql = {
    query,
    mutate
};

exports.Countries = countries;
exports.ManagePermissions = script$6;
exports.ShAutoForm = script$m;
exports.ShCanvas = script$h;
exports.ShCanvasBtn = script$7;
exports.ShConfirmAction = script$e;
exports.ShDropDownForm = script$l;
exports.ShDynamicTabs = script$9;
exports.ShForm = script$u;
exports.ShFrontend = ShFrontend;
exports.ShModal = script$k;
exports.ShModalBtn = script$8;
exports.ShModalForm = script$j;
exports.ShModalFormAuto = script$i;
exports.ShPhone = script$w;
exports.ShQueryPopups = script$3;
exports.ShRange = script$c;
exports.ShRoutePopups = script$5;
exports.ShSilentAction = script$d;
exports.ShSuggest = script$v;
exports.ShTable = script$b;
exports.ShTabs = script$a;
exports.shApis = shApis;
exports.shGql = shGql;
exports.shRepo = shRepo;
exports.shStorage = ShStorage;
exports.useAppStore = useAppStore;
exports.useUserStore = useUserStore;
