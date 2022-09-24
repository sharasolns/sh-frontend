<script setup>
import {useUserStore} from '../../../repo/stores/ShUser.js'
import {ref, inject, watch} from 'vue'
import ShForm from '../../../components/ShForm.vue'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(userStore)
const section = ref('login')
const registerEndpoint = inject('registerEndpoint')
const loginEndpoint = inject('loginEndpoint')
const registrationFields = inject('registrationFields')
const registerTitle = inject('registerTitle')
const registerSubTitle = inject('registerSubTitle')
const redirectRegister = inject('redirectRegister')
const redirectLogin = inject('redirectLogin')
function goToSection(newSection){
  section.value = newSection
}
watch(user,(newUser) => {
  if(newUser.value) {
    router.push(redirectLogin)
  }
})
function loginSuccessful(res){
  userStore.setAccessToken(res.token)
  userStore.setUser()
  router.push(redirectLogin)
}
function registrationSuccessful(res){
  userStore.setAccessToken(res.token)
  userStore.setUser()
  router.push(redirectRegister)
}
</script>
<template>
  <template v-if="user">
      <div class="alert alert-info">You are signed is as <strong>{{ user.name }}</strong></div>
  </template>
  <template v-else>
    <div class="sh-login-section" v-if="section === 'login'">
      <sh-form class="sh-login-form"
          :fields="['email','password']"
          action-label="Login"
          :action="loginEndpoint"
          :success-callback="loginSuccessful"
      />
      <div class="sh-auth-footer">
        <strong class="sh-forgot-link text-primary">Forgotten password?</strong>
        <strong class="bi-dot"></strong>
        <strong @click="goToSection('register')" class="sh-register-link text-primary">Sign Up</strong>
      </div>
    </div>
    <div class="sh-register-section" v-if="section === 'register'">
      <h3 v-if="registerTitle" class="sh-register-title">{{ registerTitle }}</h3>
      <span v-if="registerSubTitle" class="sh-register-link">{{ registerSubTitle }}</span>
      <sh-form class="sh-login-form"
          :fields="registrationFields"
          action-label="Sign Up"
          :action="registerEndpoint"
          :success-callback="loginSuccessful"
      />
      <div class="sh-auth-footer">
        <strong @click="goToSection('login')" class="sh-register-link text-primary">Already have an account?</strong>
      </div>
    </div>
  </template>
</template>

<style scoped>
.sh-forgot-link, .sh-register-link{
  cursor: pointer;
}
</style>
