<script setup>
import {onMounted, ref} from 'vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const accepted = ref(null)
onMounted(()=>{
  emits('update:modelValue',false)
})
const termsClicked = ()=>{
  setTimeout(()=>{
    emits('update:modelValue',accepted.value)
  },200)
}
</script>
<template>
  <div>
    <h4>{{ modelValue }}</h4>
    <input :value="true" @click="termsClicked" v-model="accepted" type="checkbox"> Accept terms
  </div>
</template>
