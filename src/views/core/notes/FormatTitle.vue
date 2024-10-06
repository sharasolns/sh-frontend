<script setup>
const props = defineProps(['item','label'])
const emits = defineEmits(['rowSelected'])


</script>

<template>
  <h3><input @click="emits('rowSelected',item)" type="checkbox"/> {{ label }}</h3>
</template>

<style scoped>

</style>