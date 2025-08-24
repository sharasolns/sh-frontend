<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
</script>

<template>
<sh-tabs :tabs="[
    {
     key: 'active_tasks',
     permission: 'tasks.active',
     label: 'All Active Tasks'
    }
]"
         :base-url="`/tabs`"/>
</template>

<style scoped>

</style>