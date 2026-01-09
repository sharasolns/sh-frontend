<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import countries from '../../repo/helpers/countries.js';
import ShApis from '../../repo/helpers/ShApis.js'
const props = defineProps({
  modelValue: String,
  country_code: String,
  disabled: Boolean
});
const countryCode = ref(props.country_code || 'KE');
const emit = defineEmits(['update:modelValue']);
const input = ref(props.modelValue);
const countriesList = ref(countries);
const selectedCountry = ref({
  name: 'Kenya',
  dialCode: '+254',
  isoCode: 'KE',
  flag: 'https://www.countryflags.io/KE/flat/64.png'
});
const flag = computed(()=> {
      const homeUrl = import.meta.env.VITE_APP_HOME_URL ?? '/'
      if (selectedCountry.value) {
        return homeUrl + 'flags/' + selectedCountry.value.isoCode.toLowerCase() + '.svg';
      }
    }
)
const appUrl = import.meta.env.VITE_APP_HOME_URL;

const updateValue = () => {
  let phone = input.value || '';
  phone = phone.replace(/^0/, '');
  if (selectedCountry.value) {
    phone = selectedCountry.value.dialCode + phone;
  }
  emit('update:modelValue', phone);
  // flag.value = appUrl + 'flags/' + selectedCountry.value.isoCode.toLowerCase() + '.svg';
};

const setSelectedCountry = () => {
  input.value = props.modelValue;
  const country = countriesList.value.find(country => country.isoCode === countryCode.value.toUpperCase());
  if (country) {
    selectedCountry.value = country;
    if (input.value) {
      if (!input.value.includes('+')) {
        input.value = '+' + input.value;
      }
      // flag.value = appUrl + 'flags/' + country.isoCode.toLowerCase() + '.svg';
      input.value = input.value.replace(country.dialCode, '').replace(/:/g, '');
    }
  }
};

watch(() => props.modelValue, (newVal) => {
  if (!input.value) {
    input.value = newVal.replace('+254', '').replace('+1', '');
  }
});

onMounted(() => {
  getCountryCodeFromBackend()
});

const getCountryCodeFromBackend = ()=>{
  if(!props.modelValue){
    ShApis.doGet('sh-country-code').then(response=>{
      if(response.data && response.data.countryCode){
        countryCode.value = response.data.countryCode;
      }
    }).finally(()=>{
      setSelectedCountry();
    })
  }
}
</script>
<template>
    <div class="sh-phone mb-3 form-control" style="display: flex;">
      <div v-if="selectedCountry" style="display: contents;">
        <img :src="flag" :alt="selectedCountry.name + ' flag'">
        {{ selectedCountry.dialCode }}
      </div>
      <select @change="updateValue" v-model="selectedCountry" class="phone-country">
        <option v-for="country in countries" :value="country" :key="country.dialCode">{{ country.name + '(' + country.dialCode + ')' }}</option>
      </select>
      <input type="text" class="phone-number" :disabled="disabled" data-cy="phone_input" @input="updateValue" placeholder="712345678" v-model="input">
    </div>
</template>

<style>
.sh-phone{
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 0.25rem;
}
.phone-country{
  width: 2rem;
  border: none;
  align-self: center;
  outline: none !important;
  padding: 0.4rem;
  border-right: 1px solid #0003;
}
.phone-number{
  width: calc(100% - 2.2rem);
  border: none;
  align-self: center;
  outline: none;
  margin-bottom: 0;
  padding: 0.4rem;
}
.sh-phone img{
  padding: 0.125rem;
  width: 2rem;
  height: 2rem;
}
.phone-number::placeholder{
  font-weight: 300;
  opacity: 0.5;
}
</style>
