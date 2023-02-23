import { defineStore } from 'pinia'

export const useAppStore = defineStore('sh-app',{
    state: ()=>{
        return {
            refreshKey: 0,
            appData: {}
        }
    },
    actions: {
        refreshPage () {
            this.refreshKey++
            return true
        },
        refresh () {
            this.refreshKey++
            return true
        },
        reload () {
            this.refreshKey++
            return true
        }
    }
})