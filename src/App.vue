<script setup>
import AppLayout from './views/layouts/AppLayout.vue'
import AuthLayout from './views/layouts/AuthLayout.vue'
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import { intercept } from '@/app/etc/interceptor.js'
import { useUserStore } from './lib/repo/stores/ShUser.js'



const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(() => {
  userStore.setUser()
  if(window.shAxionInstance){
    intercept(window.shAxionInstance)
  }
})
</script>

<template>
  <app-layout v-if="user"/>
  <auth-layout v-else/>
</template>

<style scoped>

</style>
