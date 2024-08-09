import { defineStore } from 'pinia'

export const useAppStore = defineStore('sh-app',{
    state: ()=>{
        return {
            refreshKey: 0,
            appData: {}
        }
    },
    actions: {
        refreshPage (timeout=0) {
            setTimeout(()=>{
                this.refreshKey++
            },timeout)

            return true
        },
        refresh (timeout=0) {
            this.refreshPage(timeout)
        },
        reload () {
            this.refreshKey++
            return true
        }
    }
})