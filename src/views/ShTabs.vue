<template>
  <div class="common_tabs">
    <ul class="nav nav-tabs mb-2" id="myTab" role="tablist">
      <li class="nav-item" v-for="tab in tabs" :key="tab">
        <router-link :active-class="'active'" class="nav-link text-capitalize"  :to="base_url+'/tab/'+tab" role="tab" :id="'sh_tab_' + tab">{{ tab.replace(/_/g, ' ') }}</router-link>
      </li>
    </ul>
    <div class="tab-content">
      <router-view :current_tab="currentTab" :shared_data="shared_data" :tab_counts="tab_counts"></router-view>
    </div>
  </div>
</template>
<script>
import apis from './../repo/helpers/apis'

export default {
  name: 'ShTabs',
  props: ['tabs', 'base_url', 'shared_data', 'tab_counts'],
  inject: ['global'],
  data () {
    return {
      currentTab: ''
    }
  },
  watch: {
    refreshStatus: function (state) {
      if (state === 0) {
        if (this.tab_counts) {
          this.setTabCounts(this.tab_counts)
        }
      }
    },
    tab_counts: function () {
      this.resetTabCounts()
    }
  },
  computed: {
    refreshStatus () {
      return this.global.state.refetch
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
      if (this.tab_counts) {
        this.setTabCounts(this.tab_counts)
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
.nav.nav-tabs .nav-item .nav-link{
  color: unset;
  border: none!important;
  padding: .75rem 1rem;
  margin: 0;
  font-size: 1.25rem;
}
.active.nav-link {
  /*color: #8b8f9a !important;*/
  color: var(--s-primary) !important;
  background-color: transparent !important;
  border-color: #dee2e6 #dee2e6 #fff;
}
.active.nav-link{
  position: relative;
}
.nav.nav-tabs .nav-item .active.nav-link:before {
  content: "";
  width: 100%;
  height: 2px;
  /*background-color: #ffc107;*/
  background-color: var(--s-primary);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
