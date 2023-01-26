<script setup>
import {useRoute, useRouter} from 'vue-router'
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import { useUserStore } from '../../lib/repo/stores/ShUser.js'

const userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()

onMounted(async ()=>{
  await userStore.setUser()
  if(route.path !== '/sh-auth' && !user.value){
    router.push('/sh-auth')
  }
})
</script>
<template>
  <main>
    <div class="container">
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <router-link to="/" class="logos d-flex align-items-center w-auto">
                  <img src="@/assets/logo.png" style="height: 50px !important;" alt="">
                </router-link>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <router-view/>
                  </div>
                </div>
              </div>

              <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
<!--                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>-->
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
  </main><!-- End #main -->
</template>

<style scoped>

</style>
