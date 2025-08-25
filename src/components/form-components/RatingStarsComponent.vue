<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps(['modelValue', 'isInvalid', 'label', 'class', 'icon', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'clearValidationErrors'])

const inputModel = ref(0) // 0 means no rating yet

const setRating = (value) => {
  inputModel.value = value
  emit('clearValidationErrors')
  emit('update:modelValue', value)
}

onMounted(() => {
  inputModel.value = props.modelValue || 0
})

watch(() => props.modelValue, (newVal) => {
  inputModel.value = newVal
})
</script>

<template>
  <div class="star-rating d-flex align-items-center gap-4">
    <span v-if="icon" class="new-form-input-icon shadow">
      <i :class="icon" class="shadow"></i>
    </span>

    <div class="stars d-flex gap-3">
      <span
        v-for="star in 5"
        :key="star"
        @click="setRating(star)"
        class="star"
        :class="{ active: inputModel >= star }"
        role="button"
      >★</span>
    </div>
  </div>
  <p class="text-danger mb-1" v-if="isInvalid">Please select a rating</p>
  <p class="mb-1" v-if="inputModel">Selected Stars {{ inputModel}}</p>

</template>

<style scoped>
.star {
  font-size: 28px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
.star.active {
  color: #ffc107; /* gold */
}
</style>
