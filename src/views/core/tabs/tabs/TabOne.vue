<script setup>
const props = defineProps({
  tabCounts: {
    type: Object,
    default: ()=>({})
  }
})
</script>

<template>
{{ tabCounts }}
</template>

<style scoped>

</style>