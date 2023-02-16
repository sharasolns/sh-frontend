<template>
    <div class="sh-phone mb-3">
      <div v-if="selectedCountry" style="display: contents;">
        <img :src="flag">
        {{ selectedCountry.dialCode }}
      </div>
      <select @change="updateValue" v-model="selectedCountry" class="phone-country">
        <option v-for="country in countries" :value="country" :key="country.dialCode">{{ country.name + '(' + country.dialCode + ')' }}</option>
      </select>
      <input type="text" class="phone-number" data-cy="phone_input" @input="updateValue" placeholder="712345678" v-model="input">
    </div>
</template>

<script>
import countries from '../../repo/helpers/countries.js'
export default {
  name: 'PhoneInput',
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
      flag: import.meta.env.VITE_APP_HOME_URL + 'flags/ke.svg',
      appUrl: import.meta.env.VITE_APP_HOME_URL
    }
  },
  updated () {
    if (!this.selectedCountry || !this.input) {
      // this.setSelectedCountry()
    }
  },
  mounted () {
    this.setSelectedCountry()
  },
  watch: {
    modelValue: function(newVal){
      if(!this.input){
        let phone = newVal.replace('+254','')
        this.input = phone.replace('+1','')
      }
    }
  },
  methods: {
    updateValue: function () {
      let phone = this.input
      phone = '-' + phone
      phone = phone.replace('-0', '')
      phone = phone.replace('-', '')
      // this.input = phone
      if (this.selectedCountry) {
        phone = this.selectedCountry.dialCode + '' + phone
      }
      this.$emit('update:modelValue', phone)
      this.flag = this.appUrl + 'flags/' + this.selectedCountry.isoCode.toLowerCase() + '.svg'
    },
    setSelectedCountry: function () {
      let countryCode = 'KE'
      if (this.country_code) {
        countryCode = this.country_code
      }
      this.input = this.modelValue
      const country = this.countries.find(function (country) {
        if (countryCode.toUpperCase() === country.isoCode) {
          return country
        }
      }, this)
      if (this.input) {
        if (!this.input.includes('+')) {
          this.input = '+' + this.input
        }
        this.flag = this.appUrl + 'flags/' + country.isoCode.toLowerCase() + '.svg'
        this.input = this.input.replace(country.dialCode, '')
        this.input = this.input.replace(':', '')
        this.input = this.input.replace(':', '')
        this.input = this.input.replace(':', '')
        this.selectedCountry = country
      }
    }
  }
}
</script>

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
