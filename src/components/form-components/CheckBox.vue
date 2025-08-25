<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps(['modelValue', 'isInvalid', 'label', 'class', 'icon', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'clearValidationErrors'])
const inputModel = ref(null)

const modelValueUpdated = (e) => {
  emit('clearValidationErrors')
  emit('update:modelValue', inputModel.value)
}
onMounted(() => {
  inputModel.value = props.modelValue === 1 || props.modelValue === true;
})


const isChecked = computed(() => {
  return inputModel.value === 1 || inputModel.value === true;

})


</script>

<template>
  <div class="form-check d-inline">
    <input type="checkbox" style="" :checked="isChecked" v-model="inputModel" :placeholder="placeholder"
           @change="modelValueUpdated" @keydown="modelValueUpdated" @updated="modelValueUpdated"
           class="form-check-input">
  </div>
</template>
<style scoped>
.form-check-input {
  margin: 0.2em 1em 0 0.3em !important;
}

.register-form .form-check-input[type=checkbox] {
  margin-top: .3em !important;
}
</style>