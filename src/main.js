import /* Vue, */ { createApp } from 'vue'
import ShFrontend from './lib/plugins/ShFrontend.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './etc/router.js'
import TextInput from './lib/components/form-components/TextInput.vue'
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
  // email: SampleComponent,
  // textArea: SampleComponent,
  // number: SampleComponent,
  // select: SampleComponent
}
app.use(ShFrontend,{
  sessionTimeout: 400,
  loginUrl: '/sh-auth',
  logoutApiEndpoint: 'auth/logout',
  router: router,
  registerTitle: 'Welcome, create a new account',
  formTextInput: TextInput,
  shFormElementClasses,
  shFormComponents
})
app.use(router)

app.mount('#main_vx_app')
