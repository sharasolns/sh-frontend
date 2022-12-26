<script setup>
const props = defineProps({
  modalId: {
    required: true
  }
})
</script>
<template>
  <a :href="`#${modalId}`" data-bs-toggle="modal">
    <slot/>
  </a>
</template>