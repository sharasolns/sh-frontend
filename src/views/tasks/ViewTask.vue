<script setup>
const props = defineProps(['record'])
const emit = defineEmits(['recordUpdated'])
const markUpdated = ()=>{
  emit('recordUpdated',props.record)
}
</script>
<template>
<div>{{ record }}</div>
  <button class="btn btn-info" @click="markUpdated">Mark Updated</button>
</template>


<style scoped>

</style>