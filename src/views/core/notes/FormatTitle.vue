<script setup>
const props = defineProps(['item'])
const emits = defineEmits(['rowSelected'])


</script>

<template>
  <h3><input @click="emits('rowSelected',item)" type="checkbox"/></h3>
</template>

<style scoped>

</style>