import /* Vue, */ { createApp } from 'vue'
import ShFrontend from './lib/plugins/ShFrontend.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap'
import router from './etc/router.js'
// import SampleComponent from './views/autoform/SampleComponent.vue'
import PhoneInput from './components/form-components/PhoneInput.vue'
import PasswordInput from './components/form-components/PasswordInput.vue'
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
  // select: SampleComponent
}
app.use(ShFrontend,{
  sessionTimeout: 400,
  loginUrl: '/sh-auth',
  logoutApiEndpoint: 'auth/logout',
  router: router,
  registerTitle: 'Welcome, create a new account',
  tablePaginationStyle: 'table',
  tablePerPage: 5,
  shFormElementClasses,
  shFormComponents
})
app.use(router)

app.mount('#main_vx_app')
