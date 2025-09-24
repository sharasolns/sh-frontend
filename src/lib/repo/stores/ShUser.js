import { defineStore } from 'pinia'
import shstorage from '../repositories/ShStorage.js'
import apis from '../helpers/ShApis.js'
import moment from 'moment'
import ShStorage from '../repositories/ShStorage.js'
import shRepo from '../helpers/ShRepo.js'
import { inject } from 'vue'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
    menus: [],
    loggedOut: false
  }),
  actions: {
    setUser (defaultEndpoint) {
      let user = null
      try {
         user = shstorage.getItem('user') ? shstorage.getItem('user') : null
      } catch (error) {
        user= null
      }
      if(typeof user !== 'object'){
        user = null
      }
      if (user ) {
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = []
            if (typeof this.permissions === 'string') {
              permissions = this.permissions
            } else {
              permissions = this.permissions
            }
            return permissions.includes(slug)
          }
          return false
        }
      }
      this.user = user
      const userEndpoint = defaultEndpoint ?? inject('userEndpoint','auth/user') ?? 'auth/user?defaults=1'

      apis.doGet(userEndpoint).then(res => {
        let user = res.data.user
        if (typeof(user) === 'undefined') {
           user = res.data
        }
        shstorage.setItem('user',user)
        user.signOut = this.signOut
        user.logout = this.signOut
        user.logOut = this.signOut
        user.isAllowedTo = function (slug) {
          if(!slug){
            return true
          }
          if (this.permissions) {
            let permissions = []
            if (typeof this.permissions === 'string') {
              permissions = this.permissions
            } else {
              permissions = this.permissions
            }
            return permissions.includes(slug)
          }
          return false
        }
        user.can = user.isAllowedTo
        this.user = user
      }).catch((reason) => {
        if (reason.response && reason.response.status) {
          if(reason.response.status === 401) {
            shstorage.setItem('user',null)
            this.user = null
          }
          this.loggedOut = true
        }
      })
      if (this.user) {
        if (typeof this.user.permissions === 'string') {
          this.permissions = this.user.permissions
        } else {
          this.permissions = this.user.permissions
        }
      }
      const timeNow = moment().toISOString()
      ShStorage.setItem('session_start',timeNow)
    },
    signOut () {
      shRepo.signOutUser()
    },
    logOut () {
      this.signOut()
    },
    getUser () {
      this.setUser()
    },
    setAccessToken (accessToken) {
      shstorage.setItem('access_token', accessToken)
      this.setUser()
    }
  },
  getters: {
    userId (state) {
      return state.user === null ? null:state.user.id
    }
  }
})
