<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
</script>

<template>
<sh-tabs :tabs="[
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