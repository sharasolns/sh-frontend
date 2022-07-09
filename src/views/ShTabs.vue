<template>
  <div class="common_tabs">
    <ul class="nav nav-tabs mb-2" id="myTab" role="tablist">
      <li class="nav-item" v-for="tab in tabs" :key="tab">
        <router-link :active-class="'active'" class="nav-link text-capitalize"  :to="baseUrl+'/tab/'+tab" role="tab" :id="'sh_tab_' + tab">{{ tab.replace(/_/g, ' ') }}</router-link>
      </li>
    </ul>
    <div class="tab-content">
      <router-view :currentTab="currentTab" :sharedData="sharedData" :tabCounts="tabCounts"></router-view>
    </div>
  </div>
</template>
<script>
import apis from './../repo/helpers/ShApis.js'

export default {
  name: 'ShTabs',
  props: ['tabs', 'baseUrl', 'sharedData', 'tabCounts'],
  data () {
    return {
      currentTab: ''
    }
  },
  watch: {
    refreshStatus: function (state) {
      if (state === 0) {
        if (this.tabCounts) {
          this.setTabCounts(this.tabCounts)
        }
      }
    },
    tabCounts: function () {
      this.resetTabCounts()
    }
  },
  computed: {
    refreshStatus () {
    }
  },
  mounted () {
    this.resetTabCounts()
  },
  methods: {
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
        const elem = document.getElementById('sh_tab_' + key)
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
