<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps(['modelValue', 'isInvalid', 'label', 'class', 'icon', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'clearValidationErrors'])
const inputModel = ref(null)

const modelValueUpdated = (e) => {
  emit('clearValidationErrors')
  emit('update:modelValue', inputModel.value)
}

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

onMounted(() => {
  if (props.modelValue) {
    inputModel.value = props.modelValue
  } else {
    const today = new Date()
    inputModel.value = formatDate(today)
    emit('update:modelValue', inputModel.value)
  }
})

</script>

<template>
  <div class="new-form-container-plus-icon">
    <span class="new-form-input-icon" v-if="icon">
      <i :class="icon"></i>
    </span>
    <input
      type="date"
      v-model="inputModel"
      :placeholder="placeholder"
      @change="modelValueUpdated"
      class="form-control">
  </div>
</template>
