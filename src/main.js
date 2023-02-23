import /* Vue, */ { createApp } from 'vue'
import ShFrontend from './lib/plugins/ShFrontend.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import router from './app/routes/router.js'

import './views/assets/main.css'


// import SampleComponent from './views/autoform/SampleComponent.vue'
import PhoneInput from './views/components/form-components/PhoneInput.vue'
import PasswordInput from './views/components/form-components/PasswordInput.vue'
import ViewTaskPopup from '@/views/popups/ViewTaskPopup.vue'
const app = createApp(App)
app.use(createPinia())
const shFormElementClasses = {
  formGroup: 'mb-2',
  formLabel: 'form-label',
  helperText: 'form-text',
  actionBtn: 'btn btn-primary',
  formErrorTitle: 'alert alert-danger',
  invalidFeedback: 'invalid-feedback',
  formControl: 'form-control'
}
const shFormComponents = {
  // text: SampleComponent,
  // phone: SampleComponent,
  // email: SampleComponent,
  // textArea: SampleComponent,
  // number: SampleComponent,
  password: PasswordInput,
}
app.use(ShFrontend,{
  sessionTimeout: 400,
  defaultRange: 'This Month',
  loginUrl: '/sh-auth',
  logoutApiEndpoint: 'auth/logout',
  router: router,
  registerTitle: 'Welcome, create a new account',
  tablePaginationStyle: 'pages',
  tablePerPage: 10,
  shFormElementClasses,
  toastTimer: 4000,
  shFormComponents
})

//popups
app.component('ViewTask', ViewTaskPopup)
app.use(router)

app.mount('#main_vx_app')
