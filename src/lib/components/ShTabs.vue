<script setup>
import { onMounted, ref, watch } from 'vue'
import apis from '../repo/helpers/ShApis.js'
import { useRoute, useRouter } from 'vue-router'
import shRepo from '../repo/helpers/ShRepo.js'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../repo/stores/ShUser'
import { all } from 'axios'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  sharedData: {
    type: Object
  },
  activeTab: {
    type: String
  },
  tabCounts: {
    type: Object
  },
  responsive: {
    type: Object
  },
  classes: {
    type: String
  },
  classOne: {
    type: String
  },
  classTwo: {
    type: String
  }
})
const route = useRoute()
const router = useRouter()
const currentTab = ref('')
const path = ref(route.path)
const allowedTabs = ref([])
const {user} = storeToRefs(useUserStore())
onMounted(()=>{
  if(props.tabs.length === 0){
    return;
  }
  allowedTabs.value = props.tabs.filter(tab=>{
    if(typeof tab === 'object' && tab.permission){
      if(user.value && user.value.isAllowedTo(tab.permission)){
        return tab
      }
      return false
    }
    return tab
  })
  if(allowedTabs.value.length > 0){
    resetTabCounts()
    setTab(allowedTabs.value[0])
  }
})

watch(()=>props.tabCounts, () => {
  resetTabCounts()
})

watch(()=>route.path,()=>{
  const arr = route.fullPath.split('/')
  if (!tabExistsInUrl()) {
    resetTabCounts()
  }

})

watch(()=>route.path,(newPath)=>{
  path.value = newPath
})

const setTab = (tab) => {

  if (tab) {
    const label = getTabLabel(tab)
    currentTab.value = label.replace(/_/g, ' ')
  }
}
const setTabCounts = (tabCounts) => {
  console.log('Setting tab counts', tabCounts)
  if (typeof tabCounts === 'object') {
    setCounts(tabCounts)
  } else {
    apis.doGet(tabCounts).then(res => {
      setCounts(res.data)
    })
  }
}
const resetTabCounts = () => {
  const arr = route.fullPath.split('/')
  if (!tabExistsInUrl()) {
    router.replace(route.fullPath + '/tab/' + getTabKey(allowedTabs.value[0]))
  } else {
    setTab(arr[arr.length - 1])
  }
  let tbCounts = props.tabCounts
  if(!tbCounts && typeof props.tabs[0] == 'object'){
    tbCounts = props.tabs
  }
  if (props.tabCounts) {
    setTabCounts(tbCounts)
  }
}
const tabExistsInUrl = () => {
  let exists = false
  props.tabs.forEach(tab => {
    const tabKey = getTabKey(tab)
    if (route.fullPath.includes(`/${tabKey}`)) {
      exists = true
    }
  })
  return exists
}
const setCounts = (res) => {
  Object.keys(res).forEach(key => {
    console.log('Setting count for tab', key, res[key])
    let elem = document.getElementsByClassName('sh_tab_' + key)
    if (elem.length > 0) {
      elem = elem[0]
      let txt = elem.innerHTML
      txt = txt.split('<i class="d-none"></i>')[0]
      if (parseInt(res[key]) > 0) {
        elem.innerHTML = txt + '<i class="d-none"></i><sup class="sh_tab_count">' + res[key] + '</sup>'
      }
    }
  })
}

const getTabKey = (tab)=>{
  if(typeof tab === 'string') {
    return tab
  }
  return tab.name || tab.key
}

const getTabPermission = tab=>{
  if (typeof tab === 'string') {
    return ''
  }
  return tab.permission
}

const getTabLabel = tab=>{
  let label = ''
  if (typeof tab === 'string') {
    label = tab
  } else {
    label = tab.label || tab.name || tab.key
  }
  return label.replace(/_/g, ' ')
}
</script>
<template>
  <template v-if="allowedTabs.length > 0">
    <ul class="nav nav-tabs sh-tabs" :class="classes ?? shRepo.getShConfig('tabsClass','sh-tabs nav-tabs-bordered')">
      <li class="nav-item" v-for="tab in allowedTabs" :key="getTabKey(tab)" v-if-user-can="getTabPermission(tab)">
        <router-link @click="setTab(tab)" :active-class="'active'" class="nav-link text-capitalize"
                     :to="baseUrl+'/tab/'+getTabKey(tab)" role="tab" :class="'sh_tab_' + getTabKey(tab)">
          {{ getTabLabel(tab) }}
        </router-link>
      </li>
    </ul>
    <div class="tab-content" :class="classTwo">
      <router-view v-bind="$attrs" :currentTab="currentTab" :key="path" :sharedData="sharedData" :tabCounts="tabCounts"></router-view>
    </div>
  </template>
  <div v-else class="alert alert-warning">
    <div v-if="tabs.length">
      403 Not Allowed
    </div>
    <div v-else>
      No tabs found
    </div>
  </div>
</template>

<style scoped>

</style>
