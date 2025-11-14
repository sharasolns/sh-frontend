<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import shRepo from '../repo/helpers/ShRepo.js'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../repo/stores/ShUser'

// const props = defineProps(['tabs', 'data', 'classes', 'currentTab', 'component', 'baseUrl', 'defaultComponent','addTabQuery'])
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  classes: {
    type: String,
    default: ''
  },
  currentTab: {
    type: String,
    default: null
  },
  component: {
    type: Object,
    default: null
  },
  baseUrl: {
    type: String,
    default: null
  },
  defaultComponent: {
    type: Object,
    default: () => ({ template: '<div></div>' })
  },
  addTabQuery: {
    type: Boolean,
    default: false
  },
  tabCounts: {
    type: Object,
    default: () => ({})
  }
})
const {user} = storeToRefs(useUserStore())
const route = useRoute()
const router = useRouter()
const formattedTabs = computed(() => {
  if (!props.tabs || props.tabs.length === 0) {
    return []
  }
  return props.tabs.filter(tab => {
    let newTab = tab
    if (typeof tab === 'string') {
      newTab = {key: tab, label: tab.replace(/_/g, ' ')}
    }
    if (typeof tab === 'function') {
      newTab = tab(props.data)
    }
    if(newTab.validator){
      if(!newTab.validator()){
        return false
      }
    }
    if(newTab.permission){
      if(!user.value || !user.value.isAllowedTo(newTab.permission)){
        return false
      }
    }
    console.log(newTab)
    // check if there are tabCounts for this tab
    // const tabKey = getTabKey(newTab)
    // if (!newTab.count && props.tabCounts && props.tabCounts[tabKey] !== undefined) {
    //   newTab.count = props.tabCounts[tabKey]
    // }
    return newTab
  })
})
const tabsBaseUrl = props.baseUrl ?? route.path
let currentTab = shallowRef(null)
const generatedId = ref(null)
const isResponsive = ref(null)
onMounted(() => {
  generatedId.value = 'tab' + Math.random().toString(36).slice(2)
  if (formattedTabs.value.length > 0) {
    if (props.currentTab) {
      currentTab.value = formattedTabs.value.find(tab => tab.label === props.currentTab)
    } else {
      currentTab.value = formattedTabs.value[0]
    }
    const tabParam = route.query.tab
    if (tabParam) {
      const tabFromParam = formattedTabs.value.find(tab => getTabKey(tab) === tabParam)
      if (tabFromParam) {
        currentTab.value = tabFromParam
      }
    } else if(currentTab.value && props.addTabQuery) {
      router.replace({path: tabsBaseUrl, query: {...route.query, tab: getTabKey(currentTab.value)}})
    }

  }
})

function setTab(tab) {
  currentTab.value = tab
}

const getTabKey = (tab) => {
  return tab.key ?? tab.label.replace(/\s+/g, '_').toLowerCase()
}

</script>
<template>
  <ul class="nav nav-tabs nav-tabs-bordered" role="tablist"
      :class="shRepo.getShConfig('tabsClass','sh-tabs nav-tabs-bordered') + classes">
    <li class="nav-item" role="presentation" v-for="tab in formattedTabs">
      <button v-if="!addTabQuery" @click="setTab(tab)" class="nav-link" :class="currentTab === tab ? 'active':''">
        {{ tab.label }}
        <template v-if="tab.count || tab.tabCount">
          <i class="d-none"></i><sup class="sh_tab_count">{{ tab.count ?? tab.tabCount }}</sup>
        </template>
      </button>
      <router-link v-else :to="`${tabsBaseUrl}?tab=${getTabKey(tab)}`" @click="setTab(tab)" class="nav-link"
                   :class="currentTab === tab ? 'active':''">
        {{ tab.label }}
        <template v-if="tab.count || tab.tabCount">
          <i class="d-none"></i><sup class="sh_tab_count">{{ tab.count ?? tab.tabCount }}</sup>
        </template>
      </router-link>
    </li>
  </ul>
  <div class="tab-content">
    <template v-if="currentTab">
      <component :key="getTabKey(currentTab)" v-bind="{...$attrs, ...currentTab}" :is="currentTab.component ?? defaultComponent"/>
    </template>
  </div>
</template>
<style scoped>
</style>

