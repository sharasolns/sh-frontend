<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
</script>

<template>
<sh-tabs :tabs="[{
  key: 'tab_one',
  permission: 'notesss'
},'tab_two','tab_three']" :base-url="`/tabs`"/>
</template>

<style scoped>

</style>