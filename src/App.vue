<script setup>
import {inject} from 'vue'
const timeOut = inject('sessionTimeout')
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ShFrontend</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
<!--      <div class="collapse navbar-collapse" id="navbarText">-->
<!--        <ul class="navbar-nav me-auto mb-2 mx-md-auto mb-lg-0">-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link active" aria-current="page" href="#">Github</a>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>
  </nav>
  <div class="row">
    <div class="offcanvas-sm offcanvas-start col-md-3 col-12" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="dropdown-menu show h-100 border-0">
          <li>
            <router-link class="dropdown-item" to="/forms">Forms</router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/tables">Tables</router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/dynamic-tabs">Sh Dynamic Tabs</router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/actions">Actions</router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="/profile">Profile</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9 col-12">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
</style>
