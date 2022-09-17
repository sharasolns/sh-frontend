import ShStorage from '../repo/repositories/ShStorage.js'
import Departments from '../components/core/Departments/Departments.vue'
import Department from '../components/core/Departments/department/Department.vue'
const ShFrontend = {
  install: (app, options) => {
    if(options.sessionTimeout){
      app.provide('sessionTimeout',options.sessionTimeout)
      ShStorage.setItem('sessionTimeout',options.sessionTimeout)
    }
    if(options.router) {
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
