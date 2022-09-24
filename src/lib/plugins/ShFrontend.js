import ShStorage from '../repo/repositories/ShStorage.js'
import Departments from '../components/core/Departments/Departments.vue'
import Department from '../components/core/Departments/department/Department.vue'
import ShAuth from '../components/core/auth/ShAuth.vue'
const ShFrontend = {
  install: (app, options) => {
    if(options.sessionTimeout){
      app.provide('sessionTimeout',options.sessionTimeout)
      ShStorage.setItem('sessionTimeout',options.sessionTimeout)
    }
    const swalPosition = options.swalPosition ?? 'top-end'
    const loginEndpoint = options.loginEndpoint ?? 'auth/login'
    const registerEndpoint = options.registerEndpoint ?? 'auth/register'
    const registerTitle = options.registerTitle ?? 'Create a new account'
    const registerSubTitle = options.registerSubTitle ?? `It's quick and easy`
    const redirectLogin = options.redirectLogin ?? `/`
    const redirectRegister = options.redirectRegister ?? `/`
    const registrationFields = options.registrationFields ?? ['name','email','phone','password','password_confirmation']
    const AuthComponent = options.authComponent ?? ShAuth
    app.provide('loginEndpoint',loginEndpoint)
    app.provide('registerEndpoint', registerEndpoint)
    app.provide('registrationFields', registrationFields)
    app.provide('registerTitle', registerTitle)
    app.provide('registerSubTitle', registerSubTitle)
    app.provide('redirectLogin', redirectLogin)
    app.provide('redirectRegister', redirectRegister)
    window.swalPosition = swalPosition
    if(options.router) {
      options.router.addRoute({
        path: '/sh-auth',
        component: AuthComponent
      })
      options.router.addRoute({
        path: '/sh-departments',
        component: Departments
      })
      options.router.addRoute({
        path: '/sh-departments/permissions/:id',
        component: Department
      })
    }
  }
}
export default ShFrontend
