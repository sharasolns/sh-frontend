<template>
  <ul class="nav nav-tabs sh-tabs" :class="classes">
    <li class="nav-item" v-for="tab in tabs" :key="tab">
      <router-link @click="setTab(tab)" :active-class="'active'" class="nav-link text-capitalize"
                   :to="baseUrl+'/tab/'+tab" role="tab" :class="'sh_tab_' + tab">{{ tab.replace(/_/g, ' ') }}
      </router-link>
    </li>
  </ul>
  <div class="tab-content" :class="classTwo">
    <router-view :currentTab="currentTab" :sharedData="sharedData" :tabCounts="tabCounts"></router-view>
  </div>
</template>
<script>
import apis from '../repo/helpers/ShApis.js'

export default {
  name: 'ShTabs',
  props: ['tabs', 'baseUrl', 'sharedData', 'tabCounts', 'responsive','classOne','classTwo','classes'],
  data () {
    return {
      currentTab: '',
      generatedId: null,
      isResponsive: typeof this.responsive !== 'undefined'
    }
  },
  watch: {
    tabCounts: function () {
      this.resetTabCounts()
    }
  },
  computed: {
  },
  mounted () {
    this.generatedId = 'tab' + Math.random().toString(36).slice(2)
    this.resetTabCounts()
    this.setTab(this.tabs[0])
  },
  methods: {
    setTab: function (tab) {
      if (tab) {
        this.currentTab = tab.replace(/_/g, ' ')
      }
    },
    setTabCounts: function (tabCounts) {
      if (typeof tabCounts === 'object') {
        this.setCounts(tabCounts)
      } else {
        apis.doGet(tabCounts).then(res => {
          this.setCounts(res.data)
        })
      }
    },
    resetTabCounts: function () {
      const arr = this.$route.fullPath.split('/')
      if (!this.tabExistsInUrl()) {
        this.$router.push(this.$route.fullPath + '/tab/' + this.tabs[0])
      } else {
        this.currentTab = arr[arr.length - 1]
      }
      if (this.tabCounts) {
        this.setTabCounts(this.tabCounts)
      }
    },
    tabExistsInUrl: function () {
      let exists = false
      this.tabs.forEach(tab => {
        if (this.$route.fullPath.includes(tab)) {
          exists = true
        }
      })
      return exists
    },
    setCounts: function (res) {
      Object.keys(res).forEach(key => {
        let elem = document.getElementsByClassName('sh_tab_' + key)
        if (elem) {
          let txt = elem.innerHTML
          txt = txt.split('<i class="d-none"></i>')[0]
          if (parseInt(res[key]) > 0) {
            elem.innerHTML = txt + '<i class="d-none"></i><sup class="sh_tab_count">' + res[key] + '</sup>'
          }
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
