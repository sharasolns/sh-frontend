<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
import { ref } from 'vue'
const tabCounts = ref({
  // active_tasks: 133
})
</script>

<template>
<sh-tabs :tab-counts="tabCounts" :tabs="[
    {
     key: 'active_tasks',
     label: 'All Active Tasks',
     count: 12
    }
]"
         :base-url="`/tabs`"/>
</template>

<style scoped>

</style>