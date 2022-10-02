import Axios from 'axios';
import moment from 'moment';
import { inject, openBlock, createElementBlock, createElementVNode, createTextVNode, toDisplayString, createCommentVNode, withDirectives, Fragment, renderList, vModelSelect, vModelText, resolveComponent, withModifiers, createVNode, ref, onMounted, unref, normalizeClass, createBlock, resolveDynamicComponent, renderSlot, createStaticVNode, withCtx, shallowRef, computed, isRef, vModelCheckbox, watch, pushScopeId, popScopeId } from 'vue';
import NProgress from 'nprogress';
import Editor from '@tinymce/tinymce-vue';
import Swal from 'sweetalert2';
import { defineStore, storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

function setItem (key, value) {
  let toStore = value;
  if (typeof value === 'object') {
    toStore = JSON.stringify(value);
  }
  return localStorage.setItem(key, toStore)
}

function getItem (key) {
  return localStorage.getItem(key)
}
function removeItem (key) {
  return localStorage.removeItem(key)
}
var ShStorage = {
  setItem,
  getItem,
  removeItem
};

const checkSession = function (isCheking) {
  let timeout = inject('sessionTimeout');
  if(!timeout){
    timeout = 30;
  }
  const sessionStart = ShStorage.getItem('session_start');
  const started = moment(sessionStart);
  if(!sessionStart){
    ShStorage.removeItem('access_token');
    ShStorage.removeItem('user');
    return false
  }
  const pastMinutes = moment().diff(started, 'minutes');
  if(pastMinutes >= timeout) {
    ShStorage.removeItem('user');
    ShStorage.removeItem('access_token');
    return false
  }
  if (isCheking) {
    return true
  }
  const timeNow = moment().toISOString();
  ShStorage.setItem('session_start', timeNow);
  return true
};

let apiUrl = import.meta.env.VITE_APP_API_URL;
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  apiUrl = import.meta.env.VITE_APP_API_PRODUCTION_URL;
}
const axios = Axios.create({
  baseURL: apiUrl
});
function doGet (endPoint, data) {
  if(!checkSession());
  return axios.get(endPoint, {
    params: data,
    crossOrigin: true,
    headers: {
      Authorization: 'Bearer ' + ShStorage.getItem('access_token')
      // 'X-CSRF-TOKEN': 'INVALID'
    }
  })
}
function doPost (endPoint, data) {
  if(!checkSession());
  return axios.post(endPoint,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + ShStorage.getItem('access_token')
      }
    }
  )
}

var shApis = {
  doGet,
  doPost
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

var script$c = {
  name: 'ShPhone',
  props: ['modelValue', 'country_code'],
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
      flag: window.VITE_APP_HOME_URL + 'flags/ke.svg',
      appUrl: window.VITE_APP_HOME_URL
    }
  },
  updated () {
    if (!this.selectedCountry || !this.input) ;
  },
  mounted () {
    this.setSelectedCountry();
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

const _hoisted_1$c = { class: "sh-phone mb-3" };
const _hoisted_2$b = {
  key: 0,
  style: {"display":"contents"}
};
const _hoisted_3$b = ["src"];
const _hoisted_4$a = ["value"];

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$c, [
    ($data.selectedCountry)
      ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
          createElementVNode("img", { src: $data.flag }, null, 8 /* PROPS */, _hoisted_3$b),
          createTextVNode(" " + toDisplayString($data.selectedCountry.dialCode), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("select", {
      onChange: _cache[0] || (_cache[0] = (...args) => ($options.updateValue && $options.updateValue(...args))),
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.selectedCountry) = $event)),
      class: "phone-country"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.countries, (country) => {
        return (openBlock(), createElementBlock("option", {
          value: country,
          key: country.dialCode
        }, toDisplayString(country.name + '(' + country.dialCode + ')'), 9 /* TEXT, PROPS */, _hoisted_4$a))
      }), 128 /* KEYED_FRAGMENT */))
    ], 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
      [vModelSelect, $data.selectedCountry]
    ]),
    withDirectives(createElementVNode("input", {
      type: "text",
      class: "phone-number",
      "data-cy": "phone_input",
      onInput: _cache[2] || (_cache[2] = (...args) => ($options.updateValue && $options.updateValue(...args))),
      placeholder: "712345678",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (($data.input) = $event))
    }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
      [vModelText, $data.input]
    ])
  ]))
}

script$c.render = render$7;
script$c.__file = "src/lib/components/ShPhone.vue";

var script$b = {
  name: 'ShEditor',
  props: ['modelValue'],
  components: {
    editor: Editor
  },
  data () {
    return {
      editorData: this.modelValue
    }
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  created () {
    document.addEventListener('focusin', function (e) {
      const closest = e.target.closest('.tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root');
      if (closest !== null && closest !== undefined) {
        e.stopImmediatePropagation();
      }
    });
  },
  mounted () {
    this.editorData = this.modelValue;
  },
  methods: {
    updateValue: function () {
      // alert('paste')
    }
  }
};

const _hoisted_1$b = /*#__PURE__*/createElementVNode("textarea", {
  id: "tiny",
  style: {"display":"none"},
  "data-cy": "tinymce_editor"
}, null, -1 /* HOISTED */);

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_editor = resolveComponent("editor");

  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$b,
    createElementVNode("div", {
      onFocusin: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
      class: "sh-editor w-100"
    }, [
      createVNode(_component_editor, {
        class: "tinyEditor",
        "api-key": "v5otxmculqf59xfg2bqr2ucw56cbqgbqo4x9gym2kwbv1rvi",
        onInput: $options.updateValue,
        onKeyup: $options.updateValue,
        modelValue: $options.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($options.value) = $event)),
        init: {
      selector: 'textarea#tiny',
      valid_children : '+body[style],+body[script]',
      extended_valid_elements : '*[*]',
      contextmenu: false,
      plugins: 'lists link image emoticons code autolink',
      toolbar: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons code'
    }
      }, null, 8 /* PROPS */, ["onInput", "onKeyup", "modelValue"])
    ], 32 /* HYDRATE_EVENTS */)
  ], 64 /* STABLE_FRAGMENT */))
}

script$b.render = render$6;
script$b.__file = "src/lib/components/FormComponent/ShEditor.vue";

const _hoisted_1$a = {
  key: 0,
  class: "dropdown sh-suggest"
};
const _hoisted_2$a = ["id"];
const _hoisted_3$a = { class: "badge bg-secondary m-1 sh-selected-item" };
const _hoisted_4$9 = ["onClick"];
const _hoisted_5$5 = ["id"];
const _hoisted_6$4 = ["id", "aria-labelledby"];
const _hoisted_7$4 = { key: 0 };
const _hoisted_8$3 = ["onClick"];
const _hoisted_9$4 = {
  key: 1,
  class: "dropdown-item sh-suggest-no-results"
};
const _hoisted_10$3 = {
  key: 2,
  class: "dropdown-item sh-suggest-no-input"
};


var script$a = {
  __name: 'ShSuggest',
  props: ['fillSelects','modelValue'],
  emits: ['update:modelValue'],
  setup(__props, { emit }) {

const props = __props;



let id = ref(null);
ref(null);
let suggestions = ref(null);
let selectedSuggestions = ref([]);
onMounted(() => {
  id.value = 'sid' + (Math.random() + 1).toString(36).substring(7);
  resetData();
});
function resetData(){
  if(props.fillSelects.data) {
    suggestions.value = props.fillSelects.data;
  }
}
function addSuggestion(sgn){
  let selected = selectedSuggestions.value;
  if(selected.length > 0 && !props.fillSelects.allowMultiple){
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
  }  else if (!props.fillSelects.allowMultiple) {
    emit('update:modelValue', selectedItems[0].id);
  } else {
    const ids = selectedItems.map(item => {
      return item.id
    });
    emit('update:modelValue', ids);
  }
}
function removeSuggestion(sgt){
  selectedSuggestions.value  = selectedSuggestions.value.filter(selectedSgt=>{
    if(selectedSgt.id !== sgt) {
      return selectedSgt
    }
  });
  updateModelValue();
}
let searchText = ref(null);
function filterData(e){
  let dropdownElem = document.getElementById('dropwdown_section' + id.value);
  if(!dropdownElem.classList.contains('show')){
    dropdownElem.classList.add('show');
  }
  let filterValue = e.target.innerText;
  searchText.value = filterValue;
  if(props.fillSelects.data) {
    suggestions.value = props.fillSelects.data.filter(item=>{
      if(item.name.toLowerCase().includes(filterValue.toLowerCase())){
        return item
      }
    });
  } else {
    shApis.doGet(props.fillSelects.url, { all: 1,filter_value: filterValue }).then(res => {
      suggestions.value = res.data.data;
    }).catch(res => {
      console.log(res);
    });
  }
}

return (_ctx, _cache) => {
  return (unref(id))
    ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        createElementVNode("div", {
          id: unref(id),
          "data-bs-toggle": "dropdown",
          class: "form-control p-0 d-flex sh-suggest-control dropdown-toggle",
          "aria-expanded": "false"
        }, [
          createElementVNode("div", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedSuggestions), (sgt) => {
              return (openBlock(), createElementBlock("h5", _hoisted_3$a, [
                createTextVNode(toDisplayString(sgt.name) + " ", 1 /* TEXT */),
                createElementVNode("button", {
                  onClick: $event => (removeSuggestion(sgt.id)),
                  type: "button",
                  class: "btn-close border-start border-1 ms-1",
                  "aria-label": "Close"
                }, null, 8 /* PROPS */, _hoisted_4$9)
              ]))
            }), 256 /* UNKEYED_FRAGMENT */))
          ]),
          createElementVNode("div", {
            id: 'input_' + unref(id),
            contenteditable: "true",
            onClick: filterData,
            onInput: filterData,
            class: "flex-fill h-100 sh-suggestion-input"
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5$5)
        ], 8 /* PROPS */, _hoisted_2$a),
        createElementVNode("ul", {
          class: "dropdown-menu w-100",
          id: 'dropwdown_section' + unref(id),
          "aria-labelledby": unref(id)
        }, [
          (unref(suggestions) && unref(suggestions).length > 0)
            ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(suggestions), (suggestion) => {
                return (openBlock(), createElementBlock(Fragment, {
                  key: suggestion.id
                }, [
                  (suggestion.name)
                    ? (openBlock(), createElementBlock("li", _hoisted_7$4, [
                        createElementVNode("a", {
                          onClick: $event => (addSuggestion(suggestion)),
                          class: normalizeClass(["dropdown-item", unref(selectedSuggestions).includes(suggestion) ? 'active':'']),
                          href: "#"
                        }, toDisplayString(suggestion.name ?? suggestion.text), 11 /* TEXT, CLASS, PROPS */, _hoisted_8$3)
                      ]))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            : (unref(searchText))
              ? (openBlock(), createElementBlock("li", _hoisted_9$4, " No results found "))
              : (openBlock(), createElementBlock("li", _hoisted_10$3, " Type to search... "))
        ], 8 /* PROPS */, _hoisted_6$4)
      ]))
    : createCommentVNode("v-if", true)
}
}

};

script$a.__scopeId = "data-v-5b767123";
script$a.__file = "src/lib/components/FormComponent/ShSuggest.vue";

var script$9 = {
  name: 'ShForm',
  components: {
    ShSuggest: script$a,
    ShEditor: script$b,
    ShPhone: script$c
  },
  props: [
      'action',
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
      'customComponent'
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
      if(this.suggests && this.suggests.includes(field)){
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
        if (form) {
          const modal = form.closest('.modal.show');
          if (modal) {
            modal.click();
          }
        } else {
          const backdrops = document.getElementsByClassName('modal-backdrop fade show');
          if (backdrops.length > 0) {
            backdrops[0].remove();
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
      NProgress.start();
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
        if (this.successCallback) {
          if (typeof this.successCallback === 'function') {
            this.successCallback(res.data);
          } else {
            this.$emit(this.successCallback, res.data);
          }
        }
        NProgress.done();
        if (!this.retain_modal_after_submission) {
          this.closeModal();
        }
      }).catch((reason, data) => {
        NProgress.done();
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
          this.suggests.push(key);
        } else if (this.fillSelects[key].data) {
          selectData[key] = this.fillSelects[key].data;
          this.selectData = selectData;
          console.log(this.selectData);
        } else {
          shApis.doGet(this.fillSelects[key].url, { all: 1 }).then(res => {
            // selectData[key] = res.data
            // console.log(res)
            this.selectData[key] = res.data.data;
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

const _hoisted_1$9 = {
  ref: "ShAutoForm",
  class: "sh-form"
};
const _hoisted_2$9 = {
  key: 0,
  class: "alert alert-danger alert-dismissible fade show sh-form-submission-error",
  role: "alert"
};
const _hoisted_3$9 = /*#__PURE__*/createElementVNode("i", { class: "bi-exclamation-triangle-fill me-1" }, null, -1 /* HOISTED */);
const _hoisted_4$8 = { key: 0 };
const _hoisted_5$4 = { key: 1 };
const _hoisted_6$3 = { class: "row" };
const _hoisted_7$3 = { class: "fg-label control-label text-capitalize control-bel col-md-12 request-form-label mb-2" };
const _hoisted_8$2 = { class: "col-md-12" };
const _hoisted_9$3 = ["data-cy", "placeholder", "name", "onFocus", "onChange"];
const _hoisted_10$2 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_11$2 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_12$2 = ["data-cy", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_13$2 = ["data-cy", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_14$2 = ["disabled", "placeholder", "name", "onFocus", "onUpdate:modelValue"];
const _hoisted_15$2 = ["name", "onFocus", "onUpdate:modelValue"];
const _hoisted_16$2 = ["name", "onFocus", "onUpdate:modelValue"];
const _hoisted_17$2 = ["value"];
const _hoisted_18$2 = {
  key: 12,
  class: "invalid-feedback"
};
const _hoisted_19$2 = {
  key: 1,
  class: "row"
};
const _hoisted_20$2 = /*#__PURE__*/createElementVNode("h5", null, "Confirm and Submit", -1 /* HOISTED */);
const _hoisted_21$2 = /*#__PURE__*/createElementVNode("p", null, [
  /*#__PURE__*/createTextVNode("By clicking submit, you agree to our "),
  /*#__PURE__*/createElementVNode("a", {
    target: "_blank",
    href: "/"
  }, "terms and conditions"),
  /*#__PURE__*/createTextVNode(" and that you have read our "),
  /*#__PURE__*/createElementVNode("a", {
    target: "_blank",
    href: "https://hauzisha.co.ke/privacy-policy"
  }, "privacy policy")
], -1 /* HOISTED */);
const _hoisted_22$2 = [
  _hoisted_20$2,
  _hoisted_21$2
];
const _hoisted_23$1 = /*#__PURE__*/createElementVNode("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ShPhone = resolveComponent("ShPhone");
  const _component_ShSuggest = resolveComponent("ShSuggest");
  const _component_ShEditor = resolveComponent("ShEditor");

  return (openBlock(), createElementBlock("form", _hoisted_1$9, [
    createCommentVNode("    <div v-if=\"form_status == 1\" class=\"alert alert-info\">Processing...</div>"),
    createCommentVNode("    <div v-if=\"form_status == 2\" class=\"alert alert-success\">Success</div>"),
    (_ctx.form_status == 3)
      ? (openBlock(), createElementBlock("div", _hoisted_2$9, [
          _hoisted_3$9,
          (_ctx.errorText)
            ? (openBlock(), createElementBlock("span", _hoisted_4$8, toDisplayString(_ctx.errorText), 1 /* TEXT */))
            : (openBlock(), createElementBlock("span", _hoisted_5$4, "Unexpected Error Occurred")),
          createCommentVNode("      <button @click=\"hideError\" type=\"button\" class=\"btn-close\" aria-label=\"Close\"></button>")
        ]))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("input", {
      type: "hidden",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.form_elements['id']) = $event))
    }, null, 512 /* NEED_PATCH */), [
      [vModelText, _ctx.form_elements['id']]
    ]),
    createElementVNode("div", _hoisted_6$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.fields, (field) => {
        return (openBlock(), createElementBlock("div", {
          class: normalizeClass(["form-group", 'col-md-' + $options.getColumns()]),
          key: field
        }, [
          createElementVNode("label", _hoisted_7$3, toDisplayString($options.getLabel(field)), 1 /* TEXT */),
          createElementVNode("div", _hoisted_8$2, [
            ($options.getFieldType(field) === 'component')
              ? (openBlock(), createBlock(resolveDynamicComponent($props.customComponent[field]), {
                  key: 0,
                  "data-cy": field,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  modelValue: _ctx.form_elements[field],
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["data-cy", "placeholder", "name", "onFocus", "class", "modelValue", "onUpdate:modelValue"]))
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'file')
              ? (openBlock(), createElementBlock("input", {
                  key: 1,
                  "data-cy": field,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  ref_for: true,
                  ref: 'file_'+field,
                  onChange: $event => ($options.handleFileUpload(field)),
                  type: "file"
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_9$3))
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'numeric')
              ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 2,
                  "data-cy": field,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                  type: "number"
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_10$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'password')
              ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 3,
                  "data-cy": field,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                  type: "password"
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_11$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'email')
              ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 4,
                  "data-cy": field,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                  type: "email",
                  required: ""
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_12$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'datepicker' && $options.isDisabled(field) === false)
              ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 5,
                  "data-cy": field,
                  type: "datetime-local",
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control active"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_13$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'phone')
              ? (openBlock(), createBlock(_component_ShPhone, {
                  key: 6,
                  country_code: $props.country_code,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  modelValue: _ctx.form_elements[field],
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                  required: ""
                }, null, 8 /* PROPS */, ["country_code", "placeholder", "name", "onFocus", "class", "modelValue", "onUpdate:modelValue"]))
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'suggest')
              ? (openBlock(), createBlock(_component_ShSuggest, {
                  key: 7,
                  "select-data": _ctx.selectData[field],
                  "fill-selects": $props.fillSelects[field],
                  class: normalizeClass(_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field),
                  modelValue: _ctx.form_elements[field],
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, null, 8 /* PROPS */, ["select-data", "fill-selects", "class", "modelValue", "onUpdate:modelValue"]))
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'editor')
              ? (openBlock(), createBlock(_component_ShEditor, {
                  key: 8,
                  placeholder: _ctx.allPlaceHolders[field] ? _ctx.allPlaceHolders[field] : '',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  modelValue: _ctx.form_elements[field],
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, null, 8 /* PROPS */, ["placeholder", "name", "onFocus", "class", "modelValue", "onUpdate:modelValue"]))
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'text')
              ? withDirectives((openBlock(), createElementBlock("input", {
                  key: 9,
                  disabled: $options.isDisabled(field),
                  placeholder: field === 'phone_number' ? 'e.g 0712 345 678':'',
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event),
                  type: "text"
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_14$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'textarea')
              ? withDirectives((openBlock(), createElementBlock("textarea", {
                  key: 10,
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_15$2)), [
                  [vModelText, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            ($options.getFieldType(field) === 'select' && _ctx.selectData[field] != null)
              ? withDirectives((openBlock(), createElementBlock("select", {
                  key: 11,
                  name: field,
                  onFocus: $event => ($options.removeErrors(field)),
                  class: normalizeClass([_ctx.form_errors[field] == null ? ' field_' + field:'is-invalid ' + field, "form-control"]),
                  "onUpdate:modelValue": $event => ((_ctx.form_elements[field]) = $event)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.selectData[field], (item) => {
                    return (openBlock(), createElementBlock("option", {
                      key: item.id,
                      value: item.id
                    }, toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_17$2))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_16$2)), [
                  [vModelSelect, _ctx.form_elements[field]]
                ])
              : createCommentVNode("v-if", true),
            (_ctx.form_errors[field] != null )
              ? (openBlock(), createElementBlock("div", _hoisted_18$2, toDisplayString(_ctx.form_errors[field][0]), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    ($props.hasTerms)
      ? (openBlock(), createElementBlock("div", _hoisted_19$2, _hoisted_22$2))
      : createCommentVNode("v-if", true),
    (_ctx.form_status == 1)
      ? (openBlock(), createElementBlock("button", {
          key: 2,
          class: normalizeClass(["btn btn-primary", $options.getSubmitBtnClass()]),
          type: "button",
          disabled: ""
        }, [
          _hoisted_23$1,
          createTextVNode(" Processing... ")
        ], 2 /* CLASS */))
      : (openBlock(), createElementBlock("button", {
          key: 3,
          "data-cy": "sh_form_submit",
          class: normalizeClass(["mb-2 form-submit-btn", $options.getSubmitBtnClass()]),
          type: "button",
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.submitForm && $options.submitForm(...args)))
        }, toDisplayString($props.actionLabel ? $props.actionLabel:'Submit'), 3 /* TEXT, CLASS */))
  ], 512 /* NEED_PATCH */))
}

script$9.render = render$5;
script$9.__file = "src/lib/components/ShForm.vue";

var script$8 = {
  name: 'ShCanvas',
  props: ['canvasTitle', 'canvasId', 'position','canvasSize'],
  components: {
  },
  data () {
    return {
      side: this.position === undefined ? 'offcanvas-start' : 'offcanvas-' + this.position
    }
  },
  methods: {
    offcanvasClosed: function () {
      this.$emit('offcanvasClosed');
    }
  }
};

const _hoisted_1$8 = ["id"];
const _hoisted_2$8 = { class: "offcanvas-header" };
const _hoisted_3$8 = {
  class: "offcanvas-title",
  id: "offcanvasScrollingLabel"
};
const _hoisted_4$7 = { class: "offcanvas-body" };

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["offcanvas", $data.side +' '+ $props.canvasSize + '']),
    "data-bs-scroll": "true",
    tabindex: "-1",
    id: $props.canvasId,
    "aria-labelledby": "offcanvasScrollingLabel"
  }, [
    createElementVNode("div", _hoisted_2$8, [
      createElementVNode("h5", _hoisted_3$8, toDisplayString($props.canvasTitle), 1 /* TEXT */),
      createElementVNode("button", {
        type: "button",
        ref: "closecanvas",
        onClick: _cache[0] || (_cache[0] = (...args) => ($options.offcanvasClosed && $options.offcanvasClosed(...args))),
        class: "btn-close text-reset",
        "data-bs-dismiss": "offcanvas",
        "aria-label": "Close"
      }, null, 512 /* NEED_PATCH */)
    ]),
    createElementVNode("div", _hoisted_4$7, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10 /* CLASS, PROPS */, _hoisted_1$8))
}

script$8.render = render$4;
script$8.__file = "src/lib/components/ShCanvas.vue";

var script$7 = {
  name: 'ShModal',
  props: ['modalTitle', 'modalId', 'modalSize'],
  components: {
  }
};

const _hoisted_1$7 = ["id"];
const _hoisted_2$7 = { class: "modal-content" };
const _hoisted_3$7 = { class: "modal-header" };
const _hoisted_4$6 = { class: "modal-title" };
const _hoisted_5$3 = /*#__PURE__*/createElementVNode("button", {
  class: "btn btn-danger btn-sm",
  "data-bs-dismiss": "modal",
  "data-dismiss": "modal"
}, "×", -1 /* HOISTED */);
const _hoisted_6$2 = { class: "modal-body" };
const _hoisted_7$2 = { class: "section" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: "modal fade",
    id: $props.modalId,
    "aria-hidden": "true"
  }, [
    createElementVNode("div", {
      class: normalizeClass(["modal-dialog", `modal-${$props.modalSize}`])
    }, [
      createElementVNode("div", _hoisted_2$7, [
        createElementVNode("div", _hoisted_3$7, [
          createElementVNode("h3", _hoisted_4$6, toDisplayString($props.modalTitle), 1 /* TEXT */),
          _hoisted_5$3
        ]),
        createElementVNode("div", _hoisted_6$2, [
          createElementVNode("div", _hoisted_7$2, [
            renderSlot(_ctx.$slots, "default")
          ])
        ])
      ])
    ], 2 /* CLASS */)
  ], 8 /* PROPS */, _hoisted_1$7))
}

script$7.render = render$3;
script$7.__file = "src/lib/components/ShModal.vue";

var script$6 = {
  name: 'Pagination',
  props: ['pagination_data', 'loadMore', 'hideCount', 'hideLoadMore'],
  data () {
    return {
      current_page: this.pagination_data.current,
      per_page: this.pagination_data.per_page,
      loadingMore: 0
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

const _hoisted_1$6 = { key: 0 };
const _hoisted_2$6 = { class: "record_count_body mb-3" };
const _hoisted_3$6 = /*#__PURE__*/createElementVNode("span", { class: "per_page_show" }, "Showing", -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createStaticVNode("<option value=\"10\">10</option><option value=\"25\">25</option><option value=\"50\">50</option><option value=\"100\">100</option><option value=\"200\">200</option>", 5);
const _hoisted_9$2 = [
  _hoisted_4$5
];
const _hoisted_10$1 = { class: "record_counts" };
const _hoisted_11$1 = {
  key: 0,
  "aria-label": "Page navigation"
};
const _hoisted_12$1 = { class: "pagination" };
const _hoisted_13$1 = {
  key: 0,
  class: "page-link"
};
const _hoisted_14$1 = {
  key: 1,
  class: "page-link"
};
const _hoisted_15$1 = ["onClick"];
const _hoisted_16$1 = { key: 1 };
const _hoisted_17$1 = {
  key: 0,
  class: "text-center"
};
const _hoisted_18$1 = /*#__PURE__*/createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, null, -1 /* HOISTED */);
const _hoisted_19$1 = [
  _hoisted_18$1
];
const _hoisted_20$1 = {
  key: 1,
  class: "text-center"
};
const _hoisted_21$1 = { class: "per_page_show" };
const _hoisted_22$1 = {
  key: 2,
  class: "text-center"
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (!$props.loadMore)
    ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
        createElementVNode("div", _hoisted_2$6, [
          _hoisted_3$6,
          createTextVNode("  "),
          withDirectives(createElementVNode("select", {
            class: "select_per_page",
            onChange: _cache[0] || (_cache[0] = (...args) => ($options.changePerPage && $options.changePerPage(...args))),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.per_page) = $event))
          }, _hoisted_9$2, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
            [vModelSelect, $data.per_page]
          ]),
          createElementVNode("span", _hoisted_10$1, " of " + toDisplayString($props.pagination_data.record_count) + " items", 1 /* TEXT */)
        ]),
        ($props.pagination_data != null)
          ? (openBlock(), createElementBlock("nav", _hoisted_11$1, [
              createElementVNode("ul", _hoisted_12$1, [
                createElementVNode("li", {
                  class: normalizeClass([$options.getActivePage === 1 ? 'disabled' : '' , "page-item"])
                }, [
                  createElementVNode("a", {
                    onClick: _cache[2] || (_cache[2] = $event => ($options.changeTableKey('page',$options.getActivePage - 1))),
                    class: "page-link"
                  }, "«")
                ], 2 /* CLASS */),
                (openBlock(true), createElementBlock(Fragment, null, renderList($options.getPages, (page) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass(["page-item", $options.getActivePage === page ? 'active':'']),
                    key: page
                  }, [
                    ($options.getActivePage === page)
                      ? (openBlock(), createElementBlock("a", _hoisted_13$1, toDisplayString(page), 1 /* TEXT */))
                      : (['..','...'].includes(page))
                        ? (openBlock(), createElementBlock("a", _hoisted_14$1, toDisplayString(page), 1 /* TEXT */))
                        : (openBlock(), createElementBlock("a", {
                            key: 2,
                            onClick: $event => ($options.changeTableKey('page',page)),
                            class: "page-link"
                          }, toDisplayString(page), 9 /* TEXT, PROPS */, _hoisted_15$1))
                  ], 2 /* CLASS */))
                }), 128 /* KEYED_FRAGMENT */)),
                createElementVNode("li", {
                  class: normalizeClass([$options.getActivePage === this.pagination_data.end ? 'disabled' : '' , "page-item"])
                }, [
                  createElementVNode("a", {
                    onClick: _cache[3] || (_cache[3] = $event => ($options.changeTableKey('page',$options.getActivePage + 1))),
                    class: "page-link"
                  }, "»")
                ], 2 /* CLASS */)
              ])
            ]))
          : createCommentVNode("v-if", true)
      ]))
    : (openBlock(), createElementBlock("div", _hoisted_16$1, [
        (this.pagination_data.loading === 1)
          ? (openBlock(), createElementBlock("div", _hoisted_17$1, _hoisted_19$1))
          : createCommentVNode("v-if", true),
        (!$props.hideCount)
          ? (openBlock(), createElementBlock("div", _hoisted_20$1, [
              createElementVNode("span", _hoisted_21$1, "Showing " + toDisplayString($props.pagination_data.displayCount) + " of " + toDisplayString($props.pagination_data.record_count) + " items", 1 /* TEXT */)
            ]))
          : createCommentVNode("v-if", true),
        (this.pagination_data.loading !== 1 && $props.pagination_data.displayCount < $props.pagination_data.record_count && !$props.hideLoadMore)
          ? (openBlock(), createElementBlock("div", _hoisted_22$1, [
              createElementVNode("button", {
                class: "btn btn-sm btn-primary mt-1",
                onClick: _cache[4] || (_cache[4] = (...args) => ($options.loadMoreRecords && $options.loadMoreRecords(...args)))
              }, "Load More")
            ]))
          : createCommentVNode("v-if", true)
      ]))
}

script$6.render = render$2;
script$6.__file = "src/lib/components/list_templates/Pagination.vue";

function swalSuccess (message) {
  Swal.fire('Success!', message, 'success');
}
function swalError (message) {
  Swal.fire('Error!', message, 'error');
}

function swalHttpError (reason) {
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
  Swal.fire('Error!', error, 'error');
}

function runSilentRequest (url) {
  return shApis.doPost(url)
}

function setTabCounts (url) {
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
function formatHttpCatchError (reason) {
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
function getMenuCount (url) {
  shApis.doGet(url).then(res => {
    console.log(res);
  });
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
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});
function showToast (message, toastType, position) {
  if (!toastType) {
    toastType = 'success';
  }
  if(!position){
    position = window.swalPosition;
  }
  Toast.mixin({
    position: position
  });
  Toast.fire({
    icon: toastType,
    title: message
  });
}

async function runPlainRequest (url, message, title, data) {
  if (typeof title === 'undefined') {
    title = null;
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
      return shApis.doPost(url, data).then(function (response) {
        Swal.fire('Success!', 'Action completed successfully', 'success');
        return {
          response: response.data,
          success: true
        }
      })
        .catch(reason => {
          if (typeof reason.response === 'undefined') {
            Swal.fire('Error!', `Connection to ${url} lost`, 'error');
          } else {
            Swal.fire(`Error ${reason.response.status}`, reason.response.statusText, 'error');
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
    format = 'lll';
  }
  return moment(date).format(format)
}

var shRepo = {
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
};

var script$5 = {
  name: 'sh-table',
  props: ['endPoint', 'headers', 'pageCount', 'actions', 'hideCount', 'hideLoadMore', 'links', 'reload', 'hideSearch', 'sharedData', 'searchPlaceholder', 'event', 'displayMore', 'displayMoreBtnClass', 'moreDetailsColumns', 'moreDetailsFields', 'hasDownload', 'downloadFields', 'tableHover'],
  inject: ['channel'],
  data () {
    return {
      order_by: '',
      order_method: '',
      per_page: this.pageCount ? this.pageCount : 30,
      page: 1,
      filter_value: '',
      loading: 'loading',
      loading_error: '',
      records: [],
      total: 0,
      pagination_data: null,
      moreDetailsId: null,
      moreDetailsModel: null,
      downloading: false,
      appUrl: window.VITE_APP_API_URL,
      hasCanvas: 0,
      selectedRecord: null
    }
  },
  mounted () {
    if (this.event) ;
    if(this.actions && this.actions.actions){
      this.actions.actions.forEach(action => {
        if(action.canvasComponent){
          this.hasCanvas = true;
        }
      });
    }
  },
  methods: {
    newRecordAdded: function (ev) {
      const record = ev.log;
      if (record.user) {
        record.user = record.user.name;
      }
      this.records.unshift(record);
      console.log(event, record);
    },
    rowSelected: function (row) {
      this.selectedRecord = row;
      this.$emit('rowSelected', row);
    },
    changeKey: function (key, value) {
      this[key] = value;
      if (key === 'order_by') {
        this.order_method = (this.order_method === 'desc') ? 'asc' : 'desc';
      }
      if (key === 'per_page') {
        this.page = 1;
      }
      this.reloadData();
    },
    getLinkClass: function (config) {
      console.log(config);
      if (typeof config === 'object') {
        return config.class
      }
      return ''
    },
    reloadNotifications: function () {
      this.reloadData();
    },
    replaceActionUrl: function (path, obj) {
      if (path) {
        var matches = path.match(/\{(.*?)\}/g);
        matches.forEach(key => {
          key = key.replace('{', '');
          key = key.replace('}', '');
          path = path.replace(`{${key}}`, obj[key]);
        });
        return path
      }
      return ''
    },
    doEmitAction: function (action, data) {
      if (typeof action === 'function') {
        action(data);
      } else {
        this.$emit(action, data);
      }
    },
    getFieldType: function (field) {
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
    replaceLinkUrl: function (path, obj) {
      if (typeof path === 'object') {
        path = path.link;
      }
      var matches = path.match(/\{(.*?)\}/g);
      matches.forEach(key => {
        key = key.replace('{', '');
        key = key.replace('}', '');
        path = path.replace(`{${key}}`, obj[key]);
      });
      return path
    },
    formatDate: function (date) {
      return moment(date).format('lll')
    },
    setMoreDetailsModel: function (row) {
      this.moreDetailsModel = null;
      this.moreDetailsModel = row;
    },
    loadMoreRecords: function () {
      this.reloadData(this.page + 1, 1);
    },
    exportData: function (template) {
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
        console.log(reason);
        this.downloading = false;
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText}`;
        shRepo.swalError('Error', error);
      });
    },
    reloadData: function (page, append) {
      if (typeof page !== 'undefined') { this.page = page; }
      if (!append) {
        this.loading = 'loading';
      }
      const data = {
        order_by: this.order_by,
        order_method: this.order_method,
        per_page: this.per_page,
        page: this.page,
        filter_value: this.filter_value
      };
      if (this.pagination_data) {
        this.pagination_data.loading = 1;
      }
      shApis.doGet(this.endPoint, data).then(req => {
        this.loading = 'done';
        const response = req.data.data;
        this.pagination_data = {
          current: response.current_page,
          start: response.from,
          end: response.last_page,
          record_count: response.total,
          per_page: response.per_page,
          loading: 0,
          displayCount: response.total > response.per_page ? response.per_page : response.total
        };
        if (append) {
          this.records.push(...response.data);
          let totalShown = response.total > response.per_page ? response.per_page * response.current_page : response.total;
          if (totalShown > response.total) {
            totalShown = response.total;
          }
          this.pagination_data.displayCount = totalShown;
          const scrollingElement = (document.scrollingElement || document.body);
          scrollingElement.scrollTop = scrollingElement.scrollHeight;
          // const all = []
          // console.log(all.push(response.data))
          // console.log(this.records, response.data)
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
    reload () {
      this.reloadData();
    }
  },
  created () {
    this.reloadData();
  },
  components: {
    ShCanvas: script$8,
    pagination: script$6
  },
  computed: {
    windowWidth: function () {
      return window.innerWidth
    },
    user () {
      return null
    },
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    hasRecordsSlot () {
      return !!this.$slots.records
    }
  }
};

const _hoisted_1$5 = { class: "auto-table mt-2" };
const _hoisted_2$5 = {
  key: 0,
  class: "col-md-4 mb-2"
};
const _hoisted_3$5 = ["disabled"];
const _hoisted_4$4 = /*#__PURE__*/createElementVNode("i", { class: "bi-download" }, null, -1 /* HOISTED */);
const _hoisted_5$2 = /*#__PURE__*/createElementVNode("span", {
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);
const _hoisted_6$1 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1 /* HOISTED */);
const _hoisted_7$1 = {
  key: 1,
  class: "row"
};
const _hoisted_8$1 = { class: "col-12 mb-3" };
const _hoisted_9$1 = { class: "sh-search-bar" };
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = {
  key: 0,
  class: "text-center"
};
const _hoisted_12 = /*#__PURE__*/createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, [
  /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...")
], -1 /* HOISTED */);
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = {
  key: 1,
  class: "alert alert-danger"
};
const _hoisted_15 = { colspan: 2 };
const _hoisted_16 = {
  key: 0,
  class: "text-center"
};
const _hoisted_17 = /*#__PURE__*/createElementVNode("div", {
  class: "spinner-border",
  role: "status"
}, [
  /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...")
], -1 /* HOISTED */);
const _hoisted_18 = [
  _hoisted_17
];
const _hoisted_19 = {
  key: 1,
  class: "alert alert-danger"
};
const _hoisted_20 = { colspan: 2 };
const _hoisted_21 = { class: "sh-thead" };
const _hoisted_22 = ["onClick"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["onClick"];
const _hoisted_25 = {
  key: 0,
  class: "text-capitalize"
};
const _hoisted_26 = { class: "sh-tbody" };
const _hoisted_27 = {
  key: 0,
  class: "text-center"
};
const _hoisted_28 = ["colspan"];
const _hoisted_29 = /*#__PURE__*/createElementVNode("div", { class: "text-center" }, [
  /*#__PURE__*/createElementVNode("div", {
    class: "spinner-border",
    role: "status"
  }, [
    /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...")
  ])
], -1 /* HOISTED */);
const _hoisted_30 = [
  _hoisted_29
];
const _hoisted_31 = {
  key: 1,
  class: "text-center alert alert-danger"
};
const _hoisted_32 = ["colspan"];
const _hoisted_33 = {
  key: 2,
  class: "text-center alert alert-info no_records"
};
const _hoisted_34 = ["colspan"];
const _hoisted_35 = /*#__PURE__*/createElementVNode("i", { class: "bi-info-circle" }, null, -1 /* HOISTED */);
const _hoisted_36 = ["onClick"];
const _hoisted_37 = { key: 1 };
const _hoisted_38 = {
  key: 2,
  class: "text-success fw-bold"
};
const _hoisted_39 = { key: 3 };
const _hoisted_40 = ["innerHTML"];
const _hoisted_41 = ["innerHTML"];
const _hoisted_42 = ["innerHTML"];
const _hoisted_43 = {
  key: 0,
  style: {"white-space":"nowrap"}
};
const _hoisted_44 = ["href"];
const _hoisted_45 = ["title", "onClick"];
const _hoisted_46 = { key: 5 };
const _hoisted_47 = {
  key: 0,
  class: "text-center"
};
const _hoisted_48 = /*#__PURE__*/createElementVNode("div", { class: "text-center" }, [
  /*#__PURE__*/createElementVNode("div", {
    class: "spinner-border",
    role: "status"
  }, [
    /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...")
  ])
], -1 /* HOISTED */);
const _hoisted_49 = [
  _hoisted_48
];
const _hoisted_50 = { key: 1 };
const _hoisted_51 = {
  key: 2,
  class: "mobile-list-items"
};
const _hoisted_52 = ["onClick"];
const _hoisted_53 = {
  key: 0,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_54 = {
  key: 1,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_55 = {
  key: 2,
  class: "mb-1 font-weight-bold text-capitalize profile-form-title"
};
const _hoisted_56 = { key: 1 };
const _hoisted_57 = {
  key: 2,
  class: "text-primary fw-bold"
};
const _hoisted_58 = ["innerHTML"];
const _hoisted_59 = ["innerHTML"];
const _hoisted_60 = ["innerHTML"];
const _hoisted_61 = /*#__PURE__*/createElementVNode("hr", { class: "my-2" }, null, -1 /* HOISTED */);
const _hoisted_62 = { key: 0 };
const _hoisted_63 = ["href"];
const _hoisted_64 = ["title", "onClick"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_pagination = resolveComponent("pagination");
  const _component_sh_canvas = resolveComponent("sh-canvas");

  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    ($props.hasDownload)
      ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
          createElementVNode("button", {
            disabled: $data.downloading,
            class: "btn btn-warning btn-sm",
            onClick: _cache[0] || (_cache[0] = $event => ($options.exportData()))
          }, [
            (!$data.downloading)
              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  _hoisted_4$4,
                  createTextVNode(" Export ")
                ], 64 /* STABLE_FRAGMENT */))
              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  _hoisted_5$2,
                  _hoisted_6$1
                ], 64 /* STABLE_FRAGMENT */))
          ], 8 /* PROPS */, _hoisted_3$5)
        ]))
      : createCommentVNode("v-if", true),
    (!$props.hideSearch)
      ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
          createElementVNode("div", _hoisted_8$1, [
            createElementVNode("div", _hoisted_9$1, [
              withDirectives(createElementVNode("input", {
                type: "search",
                onChange: _cache[1] || (_cache[1] = $event => ($options.reloadData(1))),
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.filter_value) = $event)),
                placeholder: $props.searchPlaceholder ? $props.searchPlaceholder : 'Search',
                class: "form-control sh-search-input"
              }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_10), [
                [vModelText, $data.filter_value]
              ])
            ])
          ])
        ]))
      : createCommentVNode("v-if", true),
    ($options.hasDefaultSlot)
      ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          ($data.loading === 'loading')
            ? (openBlock(), createElementBlock("div", _hoisted_11, _hoisted_13))
            : ($data.loading === 'error')
              ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  createElementVNode("span", _hoisted_15, toDisplayString($data.loading_error), 1 /* TEXT */)
                ]))
              : createCommentVNode("v-if", true),
          ($data.loading === 'done')
            ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList($data.records, (record) => {
                return renderSlot(_ctx.$slots, "default", {
                  key: record.id,
                  record: record
                })
              }), 128 /* KEYED_FRAGMENT */))
            : createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      : createCommentVNode("v-if", true),
    ($options.hasRecordsSlot)
      ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          ($data.loading === 'loading')
            ? (openBlock(), createElementBlock("div", _hoisted_16, _hoisted_18))
            : ($data.loading === 'error')
              ? (openBlock(), createElementBlock("div", _hoisted_19, [
                  createElementVNode("span", _hoisted_20, toDisplayString($data.loading_error), 1 /* TEXT */)
                ]))
              : createCommentVNode("v-if", true),
          ($data.loading === 'done')
            ? renderSlot(_ctx.$slots, "records", {
                key: 2,
                records: $data.records
              })
            : createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      : ($options.windowWidth > 700)
        ? (openBlock(), createElementBlock("table", {
            key: 4,
            class: normalizeClass(["table sh-table", $props.tableHover ? 'table-hover':''])
          }, [
            createElementVNode("thead", _hoisted_21, [
              createElementVNode("tr", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (title) => {
                  return (openBlock(), createElementBlock("th", {
                    key: title[0]
                  }, [
                    (typeof title === 'string')
                      ? (openBlock(), createElementBlock("a", {
                          key: 0,
                          class: "text-capitalize",
                          onClick: $event => ($options.changeKey('order_by',title))
                        }, toDisplayString(title.replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_22))
                      : (typeof title === 'function')
                        ? (openBlock(), createElementBlock("a", {
                            key: 1,
                            class: "text-capitalize",
                            onClick: $event => ($options.changeKey('order_by',title))
                          }, toDisplayString(title(null).replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_23))
                        : (openBlock(), createElementBlock("a", {
                            key: 2,
                            class: "text-capitalize",
                            onClick: $event => ($options.changeKey('order_by',title[0]))
                          }, toDisplayString(title[1].replace(/_/g, ' ')), 9 /* TEXT, PROPS */, _hoisted_24))
                  ]))
                }), 128 /* KEYED_FRAGMENT */)),
                ($props.actions)
                  ? (openBlock(), createElementBlock("th", _hoisted_25, toDisplayString($props.actions.label), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ])
            ]),
            createElementVNode("tbody", _hoisted_26, [
              ($data.loading === 'loading')
                ? (openBlock(), createElementBlock("tr", _hoisted_27, [
                    createElementVNode("td", {
                      colspan: $props.headers.length
                    }, _hoisted_30, 8 /* PROPS */, _hoisted_28)
                  ]))
                : ($data.loading === 'error')
                  ? (openBlock(), createElementBlock("tr", _hoisted_31, [
                      createElementVNode("td", {
                        colspan: $props.headers.length
                      }, toDisplayString($data.loading_error), 9 /* TEXT, PROPS */, _hoisted_32)
                    ]))
                  : ($data.records.length === 0)
                    ? (openBlock(), createElementBlock("tr", _hoisted_33, [
                        createElementVNode("td", {
                          colspan: $props.actions ? $props.headers.length + 1 : $props.headers.length
                        }, [
                          _hoisted_35,
                          createTextVNode(" No records found ")
                        ], 8 /* PROPS */, _hoisted_34)
                      ]))
                    : ($data.loading === 'done')
                      ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList($data.records, (record, index) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: record.id,
                            class: normalizeClass(record.class),
                            onClick: $event => ($options.rowSelected(record))
                          }, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (key) => {
                              return (openBlock(), createElementBlock("td", {
                                key: key[0]
                              }, [
                                (typeof key === 'string' && $props.links && $props.links[key])
                                  ? (openBlock(), createBlock(_component_router_link, {
                                      key: 0,
                                      to: $options.replaceLinkUrl($props.links[key],record),
                                      class: normalizeClass($options.getLinkClass($props.links[key])),
                                      innerHTML: record[key]
                                    }, null, 8 /* PROPS */, ["to", "class", "innerHTML"]))
                                  : ($options.getFieldType(key) === 'numeric')
                                    ? (openBlock(), createElementBlock("span", _hoisted_37, toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                    : ($options.getFieldType(key) === 'money')
                                      ? (openBlock(), createElementBlock("span", _hoisted_38, toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                      : ($options.getFieldType(key) === 'date')
                                        ? (openBlock(), createElementBlock("span", _hoisted_39, toDisplayString($options.formatDate(record[key])), 1 /* TEXT */))
                                        : (typeof key === 'string')
                                          ? (openBlock(), createElementBlock("span", {
                                              key: 4,
                                              innerHTML: record[key]
                                            }, null, 8 /* PROPS */, _hoisted_40))
                                          : (typeof key === 'function')
                                            ? (openBlock(), createElementBlock("span", {
                                                key: 5,
                                                innerHTML: key(record, index)
                                              }, null, 8 /* PROPS */, _hoisted_41))
                                            : (openBlock(), createElementBlock("span", {
                                                key: 6,
                                                innerHTML: record[key[0]]
                                              }, null, 8 /* PROPS */, _hoisted_42))
                              ]))
                            }), 128 /* KEYED_FRAGMENT */)),
                            ($props.actions)
                              ? (openBlock(), createElementBlock("td", _hoisted_43, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.actions.actions, (act) => {
                                    return (openBlock(), createElementBlock(Fragment, {
                                      key: act.path
                                    }, [
                                      (!act.permission || $options.user.isAllowedTo(act.permission))
                                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                            (!act.validator || act.validator(record))
                                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                                  (act.canvasId)
                                                    ? (openBlock(), createElementBlock("a", {
                                                        key: 0,
                                                        href: '#' + act.canvasId,
                                                        "data-bs-toggle": "offcanvas",
                                                        class: normalizeClass(act.class)
                                                      }, [
                                                        (act.icon)
                                                          ? (openBlock(), createElementBlock("span", {
                                                              key: 0,
                                                              class: normalizeClass(act.icon)
                                                            }, null, 2 /* CLASS */))
                                                          : createCommentVNode("v-if", true),
                                                        createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                      ], 10 /* CLASS, PROPS */, _hoisted_44))
                                                    : (act.emits)
                                                      ? (openBlock(), createElementBlock("button", {
                                                          key: 1,
                                                          title: act.title,
                                                          class: normalizeClass(act.class ? act.class:'btn btn-default'),
                                                          onClick: $event => ($options.doEmitAction(act.emits,record))
                                                        }, [
                                                          (act.icon)
                                                            ? (openBlock(), createElementBlock("span", {
                                                                key: 0,
                                                                class: normalizeClass(act.icon)
                                                              }, null, 2 /* CLASS */))
                                                            : createCommentVNode("v-if", true),
                                                          createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                        ], 10 /* CLASS, PROPS */, _hoisted_45))
                                                      : (!act.emits)
                                                        ? (openBlock(), createBlock(_component_router_link, {
                                                            key: 2,
                                                            title: act.title,
                                                            to: $options.replaceActionUrl(act.path,record),
                                                            class: normalizeClass(act.class)
                                                          }, {
                                                            default: withCtx(() => [
                                                              (act.icon)
                                                                ? (openBlock(), createElementBlock("span", {
                                                                    key: 0,
                                                                    class: normalizeClass(act.icon)
                                                                  }, null, 2 /* CLASS */))
                                                                : createCommentVNode("v-if", true),
                                                              createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                            ]),
                                                            _: 2 /* DYNAMIC */
                                                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to", "class"]))
                                                        : createCommentVNode("v-if", true)
                                                ], 64 /* STABLE_FRAGMENT */))
                                              : createCommentVNode("v-if", true)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : createCommentVNode("v-if", true)
                                    ], 64 /* STABLE_FRAGMENT */))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              : createCommentVNode("v-if", true)
                          ], 10 /* CLASS, PROPS */, _hoisted_36))
                        }), 128 /* KEYED_FRAGMENT */))
                      : createCommentVNode("v-if", true)
            ])
          ], 2 /* CLASS */))
        : (openBlock(), createElementBlock("div", _hoisted_46, [
            ($data.loading === 'loading')
              ? (openBlock(), createElementBlock("div", _hoisted_47, _hoisted_49))
              : ($data.loading === 'error')
                ? (openBlock(), createElementBlock("div", _hoisted_50, [
                    createElementVNode("span", null, toDisplayString($data.loading_error), 1 /* TEXT */)
                  ]))
                : ($data.loading === 'done')
                  ? (openBlock(), createElementBlock("div", _hoisted_51, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($data.records, (record, index) => {
                        return (openBlock(), createElementBlock(Fragment, {
                          key: record.id
                        }, [
                          createElementVNode("h3", null, toDisplayString(_ctx.mobile_view), 1 /* TEXT */),
                          createElementVNode("div", {
                            class: "single-mobile-req bg-light p-3",
                            onClick: $event => ($options.rowSelected(record))
                          }, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList($props.headers, (key) => {
                              return (openBlock(), createElementBlock(Fragment, {
                                key: key[0]
                              }, [
                                (typeof key === 'string' )
                                  ? (openBlock(), createElementBlock("p", _hoisted_53, toDisplayString(key.replace(/_/g, ' ')), 1 /* TEXT */))
                                  : (typeof key === 'function')
                                    ? (openBlock(), createElementBlock("p", _hoisted_54, toDisplayString(key(null).replace(/_/g, ' ')), 1 /* TEXT */))
                                    : (openBlock(), createElementBlock("p", _hoisted_55, toDisplayString(key[1].replace(/_/g, ' ')), 1 /* TEXT */)),
                                createElementVNode("span", null, [
                                  (typeof key === 'string' && $props.links && $props.links[key])
                                    ? (openBlock(), createBlock(_component_router_link, {
                                        key: 0,
                                        to: $options.replaceLinkUrl($props.links[key],record),
                                        class: normalizeClass($options.getLinkClass($props.links[key])),
                                        innerHTML: record[key]
                                      }, null, 8 /* PROPS */, ["to", "class", "innerHTML"]))
                                    : ($options.getFieldType(key) === 'numeric')
                                      ? (openBlock(), createElementBlock("span", _hoisted_56, toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                      : ($options.getFieldType(key) === 'money')
                                        ? (openBlock(), createElementBlock("span", _hoisted_57, "KES " + toDisplayString(Intl.NumberFormat().format(record[key])), 1 /* TEXT */))
                                        : (typeof key    === 'string')
                                          ? (openBlock(), createElementBlock("span", {
                                              key: 3,
                                              innerHTML: record[key]
                                            }, null, 8 /* PROPS */, _hoisted_58))
                                          : (typeof key === 'function')
                                            ? (openBlock(), createElementBlock("span", {
                                                key: 4,
                                                innerHTML: key(record, index )
                                              }, null, 8 /* PROPS */, _hoisted_59))
                                            : (openBlock(), createElementBlock("span", {
                                                key: 5,
                                                innerHTML: record[key[0]]
                                              }, null, 8 /* PROPS */, _hoisted_60))
                                ]),
                                _hoisted_61
                              ], 64 /* STABLE_FRAGMENT */))
                            }), 128 /* KEYED_FRAGMENT */)),
                            ($props.actions)
                              ? (openBlock(), createElementBlock("div", _hoisted_62, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList($props.actions.actions, (act) => {
                                    return (openBlock(), createElementBlock(Fragment, {
                                      key: act.path
                                    }, [
                                      (!act.permission || $options.user.isAllowedTo(act.permission))
                                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                            (!act.validator || act.validator(record))
                                              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                                  (act.canvasId)
                                                    ? (openBlock(), createElementBlock("a", {
                                                        key: 0,
                                                        href: '#' + act.canvasId,
                                                        "data-bs-toggle": "offcanvas",
                                                        class: normalizeClass(act.class)
                                                      }, [
                                                        (act.icon)
                                                          ? (openBlock(), createElementBlock("span", {
                                                              key: 0,
                                                              class: normalizeClass(act.icon)
                                                            }, null, 2 /* CLASS */))
                                                          : createCommentVNode("v-if", true),
                                                        createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                      ], 10 /* CLASS, PROPS */, _hoisted_63))
                                                    : (act.emits)
                                                      ? (openBlock(), createElementBlock("button", {
                                                          key: 1,
                                                          title: act.title,
                                                          class: normalizeClass(act.class ? act.class:'btn btn-default'),
                                                          onClick: $event => ($options.doEmitAction(act.emits,record))
                                                        }, [
                                                          (act.icon)
                                                            ? (openBlock(), createElementBlock("span", {
                                                                key: 0,
                                                                class: normalizeClass(act.icon)
                                                              }, null, 2 /* CLASS */))
                                                            : createCommentVNode("v-if", true),
                                                          createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                        ], 10 /* CLASS, PROPS */, _hoisted_64))
                                                      : (!act.emits)
                                                        ? (openBlock(), createBlock(_component_router_link, {
                                                            key: 2,
                                                            title: act.title,
                                                            to: $options.replaceActionUrl(act.path,record),
                                                            class: normalizeClass(act.class)
                                                          }, {
                                                            default: withCtx(() => [
                                                              (act.icon)
                                                                ? (openBlock(), createElementBlock("span", {
                                                                    key: 0,
                                                                    class: normalizeClass(act.icon)
                                                                  }, null, 2 /* CLASS */))
                                                                : createCommentVNode("v-if", true),
                                                              createTextVNode(" " + toDisplayString(act.label), 1 /* TEXT */)
                                                            ]),
                                                            _: 2 /* DYNAMIC */
                                                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "to", "class"]))
                                                        : createCommentVNode("v-if", true)
                                                ], 64 /* STABLE_FRAGMENT */))
                                              : createCommentVNode("v-if", true)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : createCommentVNode("v-if", true)
                                    ], 64 /* STABLE_FRAGMENT */))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ]))
                              : createCommentVNode("v-if", true)
                          ], 8 /* PROPS */, _hoisted_52)
                        ], 64 /* STABLE_FRAGMENT */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : createCommentVNode("v-if", true)
          ])),
    ($data.pagination_data)
      ? (openBlock(), createBlock(_component_pagination, {
          key: 6,
          onLoadMoreRecords: $options.loadMoreRecords,
          "hide-load-more": $props.hideLoadMore,
          "hide-count": $props.hideCount,
          pagination_data: $data.pagination_data,
          onChangeKey: $options.changeKey,
          "load-more": "1"
        }, null, 8 /* PROPS */, ["onLoadMoreRecords", "hide-load-more", "hide-count", "pagination_data", "onChangeKey"]))
      : createCommentVNode("v-if", true),
    ($props.actions)
      ? (openBlock(true), createElementBlock(Fragment, { key: 7 }, renderList($props.actions.actions, (action) => {
          return (openBlock(), createElementBlock(Fragment, {
            key: action.label
          }, [
            (action.canvasId)
              ? (openBlock(), createBlock(_component_sh_canvas, {
                  key: 0,
                  position: action.canvasPosition,
                  "canvas-size": action.canvasSize,
                  "canvas-title": action.canvasTitle,
                  "canvas-id": action.canvasId,
                  onOffcanvasClosed: _cache[3] || (_cache[3] = $event => ($options.rowSelected(null)))
                }, {
                  default: withCtx(() => [
                    ($data.selectedRecord)
                      ? (openBlock(), createBlock(resolveDynamicComponent(action.canvasComponent), {
                          key: 0,
                          record: $data.selectedRecord
                        }, null, 8 /* PROPS */, ["record"]))
                      : createCommentVNode("v-if", true)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["position", "canvas-size", "canvas-title", "canvas-id"]))
              : createCommentVNode("v-if", true)
          ], 64 /* STABLE_FRAGMENT */))
        }), 128 /* KEYED_FRAGMENT */))
      : createCommentVNode("v-if", true)
  ]))
}

script$5.render = render$1;
script$5.__file = "src/lib/components/ShTable.vue";

var script$4 = {
  name: 'ShTabs',
  props: ['tabs', 'baseUrl', 'sharedData', 'tabCounts', 'responsive'],
  data () {
    return {
      currentTab: '',
      generatedId: null,
      isResponsive: typeof this.responsive !== 'undefined'
    }
  },
  watch: {
    refreshStatus: function (state) {
      if (state === 0) {
        if (this.tabCounts) {
          this.setTabCounts(this.tabCounts);
        }
      }
    },
    tabCounts: function () {
      this.resetTabCounts();
    }
  },
  computed: {
    refreshStatus () {
    }
  },
  mounted () {
    this.generatedId =  'tab' + Math.random().toString(36).slice(2);
    this.resetTabCounts();
    this.setTab(this.tabs[0]);
  },
  methods: {
    setTab: function(tab){
      if(tab){
        this.currentTab = tab.replace(/_/g, ' ');
      }
    },
    setTabCounts: function (tabCounts) {
      if (typeof tabCounts === 'object') {
        this.setCounts(tabCounts);
      } else {
        shApis.doGet(tabCounts).then(res => {
          this.setCounts(res.data);
        });
      }
    },
    resetTabCounts: function () {
      const arr = this.$route.fullPath.split('/');
      if (!this.tabExistsInUrl()) {
        this.$router.push(this.$route.fullPath + '/tab/' + this.tabs[0]);
      } else {
        this.currentTab = arr[arr.length - 1];
      }
      if (this.tabCounts) {
        this.setTabCounts(this.tabCounts);
      }
    },
    tabExistsInUrl: function () {
      let exists = false;
      this.tabs.forEach(tab => {
        if (this.$route.fullPath.includes(tab)) {
          exists = true;
        }
      });
      return exists
    },
    setCounts: function (res) {
      Object.keys(res).forEach(key => {
        let elem = document.getElementsByClassName('sh_tab_' + key);
        if (elem) {
          let txt = elem.innerHTML;
          txt = txt.split('<i class="d-none"></i>')[0];
          if (parseInt(res[key]) > 0) {
            elem.innerHTML = txt + '<i class="d-none"></i><sup class="sh_tab_count">' + res[key] + '</sup>';
          }
        }
      });
    }
  }
};

const _hoisted_1$4 = {
  key: 0,
  class: "navbar navbar-expand-lg sh-horizontal-tabs"
};
const _hoisted_2$4 = ["data-bs-target"];
const _hoisted_3$4 = /*#__PURE__*/createElementVNode("i", { class: "bi-chevron-right float-end" }, null, -1 /* HOISTED */);
const _hoisted_4$3 = ["id"];
const _hoisted_5$1 = { class: "tab-content" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createElementBlock(Fragment, null, [
    ($data.generatedId)
      ? (openBlock(), createElementBlock("nav", _hoisted_1$4, [
          ($data.isResponsive)
            ? (openBlock(), createElementBlock("a", {
                key: 0,
                href: "#",
                class: "form-control navbar-toggler text-capitalize",
                "data-bs-toggle": "collapse",
                "data-bs-target": '#' + $data.generatedId,
                "aria-controls": "navbarNav",
                "aria-expanded": "false",
                "aria-label": "Toggle navigation"
              }, [
                createTextVNode(toDisplayString($data.currentTab) + " ", 1 /* TEXT */),
                _hoisted_3$4
              ], 8 /* PROPS */, _hoisted_2$4))
            : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: normalizeClass($data.isResponsive ? 'collapse navbar-collapse':''),
            id: $data.generatedId
          }, [
            createElementVNode("ul", {
              class: normalizeClass($data.isResponsive ? 'navbar-nav nav':'nav')
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($props.tabs, (tab) => {
                return (openBlock(), createElementBlock("li", {
                  class: "nav-item",
                  key: tab
                }, [
                  createVNode(_component_router_link, {
                    onClick: $event => ($options.setTab(tab)),
                    "active-class": 'active',
                    class: normalizeClass(["nav-link text-capitalize", 'sh_tab_' + tab]),
                    to: $props.baseUrl+'/tab/'+tab,
                    role: "tab"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(tab.replace(/_/g, ' ')), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick", "to", "class"])
                ]))
              }), 128 /* KEYED_FRAGMENT */))
            ], 2 /* CLASS */)
          ], 10 /* CLASS, PROPS */, _hoisted_4$3)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_5$1, [
      createVNode(_component_router_view, {
        currentTab: $data.currentTab,
        sharedData: $props.sharedData,
        tabCounts: $props.tabCounts
      }, null, 8 /* PROPS */, ["currentTab", "sharedData", "tabCounts"])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script$4.render = render;
script$4.__file = "src/lib/components/ShTabs.vue";

const _hoisted_1$3 = {
  class: "nav nav-tabs",
  role: "tablist"
};
const _hoisted_2$3 = {
  class: "nav-item",
  role: "presentation"
};
const _hoisted_3$3 = ["onClick"];
const _hoisted_4$2 = { class: "tab-content" };

var script$3 = {
  __name: 'ShDynamicTabs',
  props: ['tabs'],
  setup(__props) {

const props = __props;


const tabs = props.tabs;
let currentTab = shallowRef(null);
const generatedId = ref(null);
ref(null);
onMounted(()=>{
  generatedId.value =  'tab' + Math.random().toString(36).slice(2);
  if(tabs.length > 0) {
    currentTab.value = tabs[0];
  }
});

function setTab(tab){
  currentTab.value = tab;
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createElementVNode("ul", _hoisted_1$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tabs), (tab) => {
        return (openBlock(), createElementBlock("li", _hoisted_2$3, [
          createElementVNode("button", {
            onClick: $event => (setTab(tab)),
            class: normalizeClass(["nav-link", unref(currentTab) === tab ? 'active':''])
          }, toDisplayString(tab.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_3$3)
        ]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ]),
    createElementVNode("div", _hoisted_4$2, [
      (unref(currentTab))
        ? (openBlock(), createBlock(resolveDynamicComponent(unref(currentTab).component), { key: 0 }))
        : createCommentVNode("v-if", true)
    ])
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$3.__file = "src/lib/components/ShDynamicTabs.vue";

const useUserStore = defineStore('user-store', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
    menus: [],
    loggedOut: false
  }),
  actions: {
    setUser (){
      const user = ShStorage.getItem('user') ? JSON.parse(ShStorage.getItem('user')) : null;
      if (user) {
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = [];
            if (typeof this.permissions === 'string') {
              permissions = JSON.parse(this.permissions);
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
        const user = res.data;
        ShStorage.setItem('user',res.data);
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = [];
            if (typeof this.permissions === 'string') {
              permissions = JSON.parse(this.permissions);
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
          this.permissions = JSON.parse(this.user.permissions);
        } else {
          this.permissions = this.user.permissions;
        }
      }
      const timeNow = moment().toISOString();
      ShStorage.setItem('session_start',timeNow);
    },
    signOut () {
      ShStorage.setItem('user',null);
      ShStorage.setItem('access_token',null);
      this.user = null;
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

const _hoisted_1$2 = /*#__PURE__*/createElementVNode("h5", null, "Departments", -1 /* HOISTED */);
const _hoisted_2$2 = {
  "data-bs-toggle": "modal",
  ref: "addDeptBtn",
  href: "#sh-department_modal",
  class: "btn btn-info btn-sm"
};
const _hoisted_3$2 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-plus" }, null, -1 /* HOISTED */);


var script$2 = {
  __name: 'Departments',
  setup(__props) {

ref(null);
let allPermissions = ref([]);
ref([]);
let reload = ref(0);
ref(null);

onMounted(() => {
  shApis.doGet('admin/departments/all-permissions').then(res => {
    allPermissions.value = res.data;
  });
});

function departmentAdded (response) {
  shRepo.showToast('Department added');
  reload.value += 1;
}

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$2,
    createElementVNode("a", _hoisted_2$2, [
      _hoisted_3$2,
      createTextVNode(" ADD DEPARTMENT")
    ], 512 /* NEED_PATCH */),
    createVNode(script$5, {
      headers: ['id','name','description', 'created_at'],
      "end-point": "admin/departments/list",
      actions: {
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          path: '/sh-departments/permissions/{id}',
          class: 'btn btn-info bi-lock btn-sm'
        }
      ]
    }
    }),
    createVNode(script$7, {
      "modal-id": "sh-department_modal",
      "modal-title": "Department Form"
    }, {
      default: withCtx(() => [
        createVNode(script$9, {
          "success-callback": "departmentAdded",
          onDepartmentAdded: departmentAdded,
          action: "admin/departments/store",
          fields: ['name','description']
        })
      ]),
      _: 1 /* STABLE */
    })
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$2.__file = "src/lib/components/core/Departments/Departments.vue";

const _hoisted_1$1 = /*#__PURE__*/createElementVNode("a", {
  href: "#addModule",
  class: "btn btn-info btn-sm",
  "data-bs-toggle": "modal"
}, [
  /*#__PURE__*/createElementVNode("i", { class: "bi-plus" }),
  /*#__PURE__*/createTextVNode(" ADD Module")
], -1 /* HOISTED */);
const _hoisted_2$1 = { class: "text-primary text-capitalize" };
const _hoisted_3$1 = ["value"];
const _hoisted_4$1 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-save" }, null, -1 /* HOISTED */);

var script$1 = {
  __name: 'Department',
  setup(__props) {

const route = useRoute();
const id = ref(route.params.id);
let department = ref(null);
let permissionCanvasBtn = ref(null);
let reload = ref(1);
let module = ref(null);
let modulePermissions = ref(null);
let selectedPermissions = ref([]);
const userStore = useUserStore();

storeToRefs(userStore);

onMounted(() => {
getDepartment();
});

let getModule = computed(()=>{
  return module.value
});



function moduleAdded () {
  shRepo.showToast('module added successfully', 'success');
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
      selectedPermissions.value = JSON.parse(rModule.permissions);
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
        shRepo.showToast('Permissions updated', 'success');
      });
}

return (_ctx, _cache) => {
  return (unref(department))
    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        _hoisted_1$1,
        createElementVNode("h5", null, "Department #" + toDisplayString(unref(department).id) + " - " + toDisplayString(unref(department).name) + " Allowed Modules", 1 /* TEXT */),
        createVNode(script$5, {
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
          reload: unref(reload),
          headers: ['id',showModule,'created_at'],
          "end-point": 'admin/departments/department/list-modules/' + id.value
        }, null, 8 /* PROPS */, ["actions", "reload", "headers", "end-point"]),
        createVNode(script$7, {
          "modal-id": "addModule",
          "modal-title": "Add Module Department"
        }, {
          default: withCtx(() => [
            createVNode(script$9, {
              "reload-select-items": unref(reload),
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
        createElementVNode("a", {
          href: "#permissionsCanvas",
          class: "d-none",
          ref_key: "permissionCanvasBtn",
          ref: permissionCanvasBtn,
          "data-bs-toggle": "offcanvas"
        }, null, 512 /* NEED_PATCH */),
        createVNode(script$8, {
          "canvas-id": "permissionsCanvas",
          position: "end enlarged",
          "canvas-title": "Module Permissions"
        }, {
          default: withCtx(() => [
            (unref(getModule))
              ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("h5", _hoisted_2$1, "Permissions for " + toDisplayString(unref(getModule).module), 1 /* TEXT */),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(modulePermissions), (permission) => {
                    return (openBlock(), createElementBlock("div", {
                      key: permission,
                      class: "list-group p-0"
                    }, [
                      createElementVNode("label", {
                        class: normalizeClass(["list-group-item pb-0 text-capitalize", 'ms-' + getPermissionLeft(permission)])
                      }, [
                        withDirectives(createElementVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(selectedPermissions) ? (selectedPermissions).value = $event : selectedPermissions = $event)),
                          value: permission
                        }, null, 8 /* PROPS */, _hoisted_3$1), [
                          [vModelCheckbox, unref(selectedPermissions)]
                        ]),
                        createTextVNode(" " + toDisplayString(getPermissionLabel(permission)), 1 /* TEXT */)
                      ], 2 /* CLASS */)
                    ]))
                  }), 128 /* KEYED_FRAGMENT */)),
                  createElementVNode("button", {
                    onClick: submitPermissions,
                    class: "btn btn-info"
                  }, [
                    _hoisted_4$1,
                    createTextVNode(" Submit")
                  ])
                ], 64 /* STABLE_FRAGMENT */))
              : createCommentVNode("v-if", true)
          ]),
          _: 1 /* STABLE */
        })
      ], 64 /* STABLE_FRAGMENT */))
    : createCommentVNode("v-if", true)
}
}

};

script$1.__file = "src/lib/components/core/Departments/department/Department.vue";

const _withScopeId = n => (pushScopeId("data-v-2911509a"),n=n(),popScopeId(),n);
const _hoisted_1 = {
  key: 0,
  class: "alert alert-info"
};
const _hoisted_2 = {
  key: 0,
  class: "sh-login-section"
};
const _hoisted_3 = { class: "sh-auth-footer" };
const _hoisted_4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("strong", { class: "sh-forgot-link text-primary" }, "Forgotten password?", -1 /* HOISTED */));
const _hoisted_5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("strong", { class: "bi-dot" }, null, -1 /* HOISTED */));
const _hoisted_6 = {
  key: 1,
  class: "sh-register-section"
};
const _hoisted_7 = {
  key: 0,
  class: "sh-register-title"
};
const _hoisted_8 = {
  key: 1,
  class: "sh-register-link"
};
const _hoisted_9 = { class: "sh-auth-footer" };

var script = {
  __name: 'ShAuth',
  setup(__props) {

const router = useRouter();
const userStore = useUserStore();
userStore.setUser();
const {user} = storeToRefs(userStore);
const section = ref('login');
const registerEndpoint = inject('registerEndpoint');
const loginEndpoint = inject('loginEndpoint');
const registrationFields = inject('registrationFields');
const registerTitle = inject('registerTitle');
const registerSubTitle = inject('registerSubTitle');
inject('redirectRegister');
const redirectLogin = inject('redirectLogin');
function goToSection(newSection){
  section.value = newSection;
}
watch(user,(newUser) => {
  if(newUser.value) {
    router.push(redirectLogin);
  }
});
function loginSuccessful(res){
  userStore.setAccessToken(res.token);
  userStore.setUser();
  router.push(redirectLogin);
}

return (_ctx, _cache) => {
  return (unref(user))
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createTextVNode("You are signed is as "),
        createElementVNode("strong", null, toDisplayString(unref(user).name), 1 /* TEXT */)
      ]))
    : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        (section.value === 'login')
          ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createVNode(script$9, {
                class: "sh-login-form",
                fields: ['email','password'],
                "action-label": "Login",
                action: unref(loginEndpoint),
                "success-callback": loginSuccessful
              }, null, 8 /* PROPS */, ["action"]),
              createElementVNode("div", _hoisted_3, [
                _hoisted_4,
                _hoisted_5,
                createElementVNode("strong", {
                  onClick: _cache[0] || (_cache[0] = $event => (goToSection('register'))),
                  class: "sh-register-link text-primary"
                }, "Sign Up")
              ])
            ]))
          : createCommentVNode("v-if", true),
        (section.value === 'register')
          ? (openBlock(), createElementBlock("div", _hoisted_6, [
              (unref(registerTitle))
                ? (openBlock(), createElementBlock("h3", _hoisted_7, toDisplayString(unref(registerTitle)), 1 /* TEXT */))
                : createCommentVNode("v-if", true),
              (unref(registerSubTitle))
                ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(unref(registerSubTitle)), 1 /* TEXT */))
                : createCommentVNode("v-if", true),
              createVNode(script$9, {
                class: "sh-login-form",
                fields: unref(registrationFields),
                "action-label": "Sign Up",
                action: unref(registerEndpoint),
                "success-callback": loginSuccessful
              }, null, 8 /* PROPS */, ["fields", "action"]),
              createElementVNode("div", _hoisted_9, [
                createElementVNode("strong", {
                  onClick: _cache[1] || (_cache[1] = $event => (goToSection('login'))),
                  class: "sh-register-link text-primary"
                }, "Already have an account?")
              ])
            ]))
          : createCommentVNode("v-if", true)
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
    const swalPosition = options.swalPosition ?? 'top-end';
    const loginEndpoint = options.loginEndpoint ?? 'auth/login';
    const registerEndpoint = options.registerEndpoint ?? 'auth/register';
    const registerTitle = options.registerTitle ?? 'Create a new account';
    const registerSubTitle = options.registerSubTitle ?? `It's quick and easy`;
    const redirectLogin = options.redirectLogin ?? `/`;
    const redirectRegister = options.redirectRegister ?? `/`;
    const registrationFields = options.registrationFields ?? ['name','email','phone','password','password_confirmation'];
    const AuthComponent = options.authComponent ?? script;
    app.provide('loginEndpoint',loginEndpoint);
    app.provide('registerEndpoint', registerEndpoint);
    app.provide('registrationFields', registrationFields);
    app.provide('registerTitle', registerTitle);
    app.provide('registerSubTitle', registerSubTitle);
    app.provide('redirectLogin', redirectLogin);
    app.provide('redirectRegister', redirectRegister);
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
    }
  }
};

export { script$8 as ShCanvas, script$3 as ShDynamicTabs, script$9 as ShForm, ShFrontend, script$7 as ShModal, script$c as ShPhone, script$5 as ShTable, script$4 as ShTabs, shApis, shRepo, ShStorage as shStorage, useUserStore };
