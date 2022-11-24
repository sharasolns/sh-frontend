<script setup>
import { inject, onMounted, watch } from 'vue'
import {useUserStore} from '../../lib/repo/stores/ShUser'
const userStore = useUserStore()

const {user} = storeToRefs(userStore)
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import menus from '@/etc/menus'
const route = useRoute()
const router = useRouter()
const menuItems = menus
watch(()=>user.value,()=>{
redirectUser()
})
onMounted(()=>{
  redirectUser()
})
const redirectUser = ()=>{
  console.log(route.path)
  // if(!user.value && route.path !== '/sh-auth'){
  //   router.push('/sh-auth')
  // } else if (user.value && route.path === '/sh-auth'){
  //   router.push('/')
  // }
}
</script>
<template>
  <div class="container-fluid container">
    <div class="row">
      <div class="col-md-6 mt-3 mx-auto" v-if="!user">
        <div class="card shadow">
          <div class="card-body">
            <RouterView/>
          </div>
        </div>
      </div>
      <div class="col-md-12" v-else>
        <div class="card shadow mt-2">
          <div class="card-header">
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul class="navbar-nav">
                    <template v-for="menuItem in menuItems" :key="menuItem.slug">
                      <li class="nav-item" v-if="menuItem.type == 'single' && user.isAllowedTo(menuItem.slug)">
                        <router-link class="nav-link" :to="menuItem.path" aria-current="page" href="#">
                          <i :class="`${menuItem.icon}`"/>
                          {{  menuItem.label  }}
                        </router-link>
                      </li>
                    </template>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{  user.name }}
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="user.logout" href="#">Logout</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div class="card-body">
            <RouterView/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>