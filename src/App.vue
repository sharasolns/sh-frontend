<script setup>
import { inject, onMounted } from 'vue'
import { useUserStore } from './lib/repo/stores/ShUser'

const userStore = useUserStore()

const {user} = storeToRefs(userStore)
import MainLayout from './views/layouts/MainLayout.vue'
import { storeToRefs } from 'pinia'
import { intercept } from './etc/interceptor.js'
onMounted(()=>{
  userStore.setUser()
})
const timeOut = inject('sessionTimeout')
if(window.shAxionInstance){
  intercept(window.shAxionInstance)
}
</script>
<template>
  <MainLayout/>
</template>

<style>
.sh-search-bar{
  align-content: end;
  align-items: end;
}
.sh-search-input{
  max-width: 45%;
}
</style>
