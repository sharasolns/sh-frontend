<template>
  <template v-if="allowedTabs.length > 0">
    <ul class="nav nav-tabs sh-tabs" :class="classes ?? shRepo.getShConfig('tabsClass','sh-tabs nav-tabs-bordered')">
      <li
          class="nav-item"
          v-for="tab in allowedTabs"
          :key="getTabKey(tab)"
          v-if-user-can="getTabPermission(tab)"
      >
        <router-link
            @click="setTab(tab)"
            :active-class="'active'"
            class="nav-link text-capitalize"
            :to="baseUrl + '/tab/' + getTabKey(tab)"
            role="tab"
            :class="'sh_tab_' + getTabKey(tab)"
        >
          {{ getTabLabel(tab) }}
          <sup class="sh_tab_count" v-if="counts[getTabKey(tab)] && counts[getTabKey(tab)] > 0">
            {{ counts[getTabKey(tab)] }}
          </sup>
        </router-link>
      </li>
    </ul>

    <div class="tab-content" :class="classTwo">
      <router-view
          v-bind="$attrs"
          :currentTab="currentTab"
          :key="path"
          :sharedData="sharedData"
          :tabCounts="counts"
      />
    </div>
  </template>

  <div v-else class="alert alert-warning">
    <div v-if="tabs.length">403 Not Allowed</div>
    <div v-else>No tabs found</div>
  </div>
</template>

<script setup>
/**
 * ShTabs.vue — reactive tabs with optional counts (object, URL, or tabs[].count)
 */
import { onMounted, ref, watch } from 'vue'
import apis from '../repo/helpers/ShApis.js'
import { useRoute, useRouter } from 'vue-router'
import shRepo from '../repo/helpers/ShRepo.js'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../repo/stores/ShUser'

const props = defineProps({
  tabs: { type: Array, required: true },
  baseUrl: { type: String, required: true },
  sharedData: { type: Object },
  activeTab: { type: String },
  // Accept object (key->count) or URL string to fetch counts.
  tabCounts: { type: [Object, String] },
  responsive: { type: Object },
  classes: { type: String },
  classOne: { type: String },
  classTwo: { type: String }
})

const route = useRoute()
const router = useRouter()
const currentTab = ref('')
const path = ref(route.path)
const allowedTabs = ref([])
const counts = ref({}) // { [tabKey]: number }
const { user } = storeToRefs(useUserStore())

/* ---------- utils ---------- */
const getTabKey = (tab) => (typeof tab === 'string' ? tab : tab.name || tab.key)
const getTabPermission = (tab) => (typeof tab === 'string' ? '' : tab.permission)
const getTabLabel = (tab) => {
  const label = typeof tab === 'string' ? tab : (tab.label || tab.name || tab.key)
  return label.replace(/_/g, ' ')
}

const normalizeCounts = (src) => {
  const out = {}
  if (!src) return out
  // If string: it's an endpoint; signal fetch needed by returning null
  if (typeof src === 'string') return null
  // If array (tabs), read .count where present
  if (Array.isArray(src)) {
    for (const t of src) {
      if (typeof t === 'object' && Number.isFinite(t?.count)) {
        out[getTabKey(t)] = Number(t.count)
      }
    }
    return out
  }
  // Plain object { key: number }
  for (const [k, v] of Object.entries(src)) {
    if (Number.isFinite(+v)) out[k] = +v
  }
  return out
}

const setTab = (tabish) => {
  if (!tabish) return
  const label = getTabLabel(tabish)
  currentTab.value = label
}

const fetchAndSetCounts = async (endpointOrObj) => {
  const normalized = normalizeCounts(endpointOrObj)
  if (normalized) {
    counts.value = normalized
    return
  }
  // Must be string endpoint
  try {
    const res = await apis.doGet(endpointOrObj)
    counts.value = normalizeCounts(res?.data) ?? {}
  } catch (e) {
    console.error('Failed to load tab counts', e)
    counts.value = {}
  }
}

const tabExistsInUrl = () => {
  const seg = route.params?.tab
  if (!seg) return false
  return allowedTabs.value.some(t => getTabKey(t) === seg)
}

const ensureUrlHasTab = () => {
  if (!allowedTabs.value.length) return
  if (!tabExistsInUrl()) {
    router.replace(props.baseUrl + '/tab/' + getTabKey(allowedTabs.value[0]))
  }
}

const resetTabCounts = async () => {
  ensureUrlHasTab()
  const curKeyFromUrl = route.params?.tab
  setTab(curKeyFromUrl || allowedTabs.value[0])

  // Prefer explicit prop; otherwise fallback to tabs[].count
  const sourceCounts = props.tabCounts ?? props.tabs
  await fetchAndSetCounts(sourceCounts)
}

/* ---------- lifecycle ---------- */
onMounted(() => {
  if (!props.tabs.length) return

  // permission filtering
  allowedTabs.value = props.tabs.filter(tab => {
    if (typeof tab === 'object' && tab.permission) {
      return user.value && user.value.isAllowedTo(tab.permission)
    }
    return true
  })

  if (allowedTabs.value.length) {
    resetTabCounts()
  }
})

/* ---------- watchers ---------- */
watch(() => props.tabCounts, () => {
  fetchAndSetCounts(props.tabCounts ?? props.tabs)
})

watch(() => route.params?.tab, () => {
  setTab(route.params?.tab)
  path.value = route.path
})

watch(() => route.path, (newPath) => {
  path.value = newPath
})
</script>

<style scoped>
/* Optional: tweak badge appearance */
.sh_tab_count {
  margin-left: .35rem;
  font-weight: 600;
}
</style>
