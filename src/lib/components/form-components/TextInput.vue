<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const inputModel = ref(null)

const modelValueUpdated = (e) => {
  emit('update:modelValue',inputModel)
}
onMounted(()=>{
  inputModel.value = props.modelValue
})

</script>

<template>
  <input type="text" v-model="inputModel" @change="modelValueUpdated" @keydown="modelValue" @updated="modelValueUpdated">
</template>