import ShStorage from '../repo/repositories/ShStorage.js'

export default {
  install: (app, options) => {
    if(options.sessionTimeout){
      app.provide('sessionTimeout',options.sessionTimeout)
      ShStorage.setItem('sessionTimeout',options.sessionTimeout)
    }
  }
}
