import /* Vue, */ { createApp } from 'vue'
import ShFrontend from './lib/plugins/ShFrontend.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap'
import router from './router.js'
const app = createApp(App)
app.use(createPinia())
app.use(ShFrontend,{
  sessionTimeout: 1,
  loginUrl: '/sh-auth',
  logoutApiEndpoint: 'auth/logout',
  router: router,
  registerTitle: 'Welcome, create a new account'
})
app.use(router)

app.mount('#main_vx_app')
