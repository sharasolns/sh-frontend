<script setup>
import {ShTabs} from '@iankibetsh/shframework'
import { onMounted, ref, watch } from 'vue'
import {useStreamline} from '@iankibetsh/vue-streamline'
import SkeletonFull from '@/views/layouts/skeletons/SkeletonFull.vue'
import { useRoute } from 'vue-router'

const {getActionUrl, service, loading, props} = useStreamline('billing/bills/bills')
const route = useRoute();

const status = route.query.status

const tabs = ref([])
const tabCounts = ref([])
const backendTabs = ref({})

watch(props.tabs, ()=>{
  if(props.tabs){
    tabs.value = props.tabs
  }
})


const getTabs = async ()=>{
  backendTabs.value = await service.getBilliTabs()
  const filteredTabs = Object.keys(backendTabs.value).filter(
    (key) => backendTabs.value[key] > 0
  )
  tabs.value = filteredTabs

  tabCounts.value = filteredTabs.reduce((counts, tab) => {
    counts[tab] = backendTabs.value[tab];
    return counts;
  }, {});


}
onMounted(()=>{
  getTabs()
})
</script>

<template>
  <SkeletonFull v-if="loading" />
  <div v-else>
    <div v-if="tabs.length >0">
      <sh-tabs
        :tabs="tabs"
        :base-url="`/billing/bills`"
        :tab-counts="tabCounts"
      />
    </div>
    <div class="alert alert-info">
      No bills found
    </div>
  </div>
</template>

<style scoped>

</style>
