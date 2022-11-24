import ShStorage from '../repo/repositories/ShStorage.js'
import Departments from '../components/core/Departments/Departments.vue'
import Department from '../components/core/Departments/department/Department.vue'
import ShAuth from '../components/core/auth/ShAuth.vue'
import TextInput from '../components/form-components/TextInput.vue'
const ShFrontend = {
  install: (app, options) => {
    if(options.sessionTimeout){
      app.provide('sessionTimeout',options.sessionTimeout)
      ShStorage.setItem('sessionTimeout',options.sessionTimeout)
    }
    const shFormElements = options.shFormElementClasses ?? {}

    const defaultFormElementClasses = {
      formGroup: shFormElements.formGroup ?? 'mb-2',
      formLabel: shFormElements.formLabel ?? 'form-label',
      helperText: shFormElements.helperText ?? 'form-text',
      actionBtn: shFormElements.actionBtn ?? 'btn btn-primary'
    }
    const swalPosition = options.swalPosition ?? 'top-end'
    const loginEndpoint = options.loginEndpoint ?? 'auth/login'
    const registerEndpoint = options.registerEndpoint ?? 'auth/register'
    const registerTitle = options.registerTitle ?? 'Create a new account'
    const registerSubTitle = options.registerSubTitle ?? `It's quick and easy`
    const logoutApiEndpoint = options.logoutApiEndpoint ?? `auth/logout`
    const formTextInput = options.formTextInput ?? TextInput
    const loginUrl = options.loginUrl ?? `/login`
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
    app.provide('logoutApiEndpoint', logoutApiEndpoint)
    app.provide('formTextInput', formTextInput)
    app.provide('loginUrl', loginUrl)
    app.provide('shFormElementClasses',defaultFormElementClasses)
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
    //filter unwanted config items from options to be put in local storage
    const removeKeys = ['formTextInput','router','shFormElementClasses']
    const allowKeys = []
    Object.keys(options).map(key=> ((typeof options[key] !== 'string' && !allowKeys.includes(key)) || removeKeys.includes(key)) && delete options[key])

    ShStorage.setItem('ShConfig',options)
  }
}
export default ShFrontend
