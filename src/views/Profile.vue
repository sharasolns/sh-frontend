<script setup>
import ShRepo from '../lib/repo/helpers/ShRepo.js'
import { useUserStore } from '../lib/repo/stores/ShUser.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(useUserStore())

</script>
<template>
  <h3>My Profile</h3>
  <h3>{{ user }}</h3>
</template>
