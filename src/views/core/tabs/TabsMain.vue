<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
import { ref } from 'vue'

const tabCounts = ref()

setTimeout(()=>{
  tabCounts.value = {
    active_tasks: 25
  }
},2000)
</script>

<template>
<sh-tabs :tab-counts="tabCounts" :tabs="[
    {
     key: 'active_tasks',
     label: 'All Active Tasks',
     count: 12,
     validator: ()=>true
    }
]"
         :base-url="`/tabs`"/>
</template>

<style scoped>

</style>