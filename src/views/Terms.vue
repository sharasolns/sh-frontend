<script setup>
import {onMounted, ref} from 'vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const accepted = ref(null)
onMounted(()=>{
  emits('update:modelValue',false)
})
const termsClicked = ()=>{
  emits('update:modelValue',accepted.value)
}
</script>
<template>
  <div>
    <h4>{{ modelValue }}</h4>
    <input :value="true" @change="termsClicked" v-model="accepted" type="checkbox"> Accept terms
  </div>
</template>
