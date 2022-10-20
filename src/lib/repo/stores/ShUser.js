import { defineStore } from 'pinia'
import shstorage from '../repositories/ShStorage.js'
import apis from '../helpers/ShApis.js'
import moment from 'moment'
import ShStorage from '../repositories/ShStorage.js'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
    menus: [],
    loggedOut: false
  }),
  actions: {
    setUser (){
      const user = shstorage.getItem('user') ? JSON.parse(shstorage.getItem('user')) : null
      if (user) {
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = []
            if (typeof this.permissions === 'string') {
              permissions = JSON.parse(this.permissions)
            } else {
              permissions = this.permissions
            }
            return permissions.includes(slug)
          }
          return false
        }
      }
      this.user = user
      apis.doGet('auth/user').then(res => {
        const user = res.data.user
        shstorage.setItem('user',res.data.user)
        user.isAllowedTo = function (slug) {
          if (this.permissions) {
            let permissions = []
            if (typeof this.permissions === 'string') {
              permissions = JSON.parse(this.permissions)
            } else {
              permissions = this.permissions
            }
            return permissions.includes(slug)
          }
          return false
        }
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
          this.permissions = JSON.parse(this.user.permissions)
        } else {
          this.permissions = this.user.permissions
        }
      }
      const timeNow = moment().toISOString()
      ShStorage.setItem('session_start',timeNow)
    },
    signOut () {
      shstorage.setItem('user',null)
      shstorage.setItem('access_token',null)
      this.user = null
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
