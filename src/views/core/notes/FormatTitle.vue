<script setup>
const props = defineProps(['item','column'])
const emits = defineEmits(['rowSelected'])


</script>

<template>
  <h3><input @click="emits('rowSelected',item)" type="checkbox"/> {{ column }}</h3>
</template>

<style scoped>

</style>