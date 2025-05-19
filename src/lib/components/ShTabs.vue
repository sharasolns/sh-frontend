<script setup>
import { onMounted, ref, watch } from 'vue'
import apis from '../repo/helpers/ShApis.js'
import { useRoute, useRouter } from 'vue-router'
import shRepo from '../repo/helpers/ShRepo.js'

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

onMounted(()=>{
  resetTabCounts()
  setTab(props.tabs[0])
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
    currentTab.value = tab.replace(/_/g, ' ')
  }
}
const setTabCounts = (tabCounts) => {
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
    router.replace(route.fullPath + '/tab/' + props.tabs[0])
  } else {
    currentTab.value = arr[arr.length - 1]
  }
  if (props.tabCounts) {
    setTabCounts(props.tabCounts)
  }
}
const tabExistsInUrl = () => {
  let exists = false
  props.tabs.forEach(tab => {
    if (route.fullPath.includes(`/${tab}`)) {
      exists = true
    }
  })
  return exists
}
const setCounts = (res) => {
  Object.keys(res).forEach(key => {
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
const activetab = (tab) => {
  if (props.activeTab) {
    return props.activeTab === tab ? 'active' : 'active'
  }
}
</script>
<template>
  <ul class="nav nav-tabs sh-tabs" :class="classes ?? shRepo.getShConfig('tabsClass','sh-tabs nav-tabs-bordered')">
    <li class="nav-item" v-for="tab in tabs" :key="tab">
      <router-link @click="setTab(tab)" :active-class="'active'" class="nav-link text-capitalize"
                   :to="baseUrl+'/tab/'+tab" role="tab" :class="'sh_tab_' + tab">
        {{ tab.replace(/_/g, ' ') }}
      </router-link>
    </li>
  </ul>
  <div class="tab-content" :class="classTwo">
    <router-view v-bind="$attrs" :currentTab="currentTab" :key="path" :sharedData="sharedData" :tabCounts="tabCounts"></router-view>
  </div>
</template>

<style scoped>

</style>
