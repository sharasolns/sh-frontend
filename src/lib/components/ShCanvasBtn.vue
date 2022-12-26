<script setup>
const props = defineProps({
  canvasId: {
    required: true,
    type: String
  }
})
</script>
<template>
  <a :href="`#${canvasId}`" data-bs-toggle="offcanvas">
    <slot/>
  </a>
</template>

<style scoped>

</style>