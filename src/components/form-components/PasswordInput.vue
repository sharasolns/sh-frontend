<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['modelValue','label','class','icon','placeholder', 'isInvalid', 'errors'])
const emit = defineEmits(['update:modelValue','clearValidationErrors'])
const inputModel = ref(null)

const modelValueUpdated = (e) => {
  emit('clearValidationErrors')
  emit('update:modelValue',inputModel)
}
onMounted(()=>{
  props.modelValue && (inputModel.value = props.modelValue)
})
let inputType = ref("password");
function togglePassword(){
  console.log(inputType)
  if(inputType.value === "password"){
    inputType.value = "text";
  }else{
    inputType.value = "password";
  }
}

</script>

<template>
  <div class="new-form-container-plus-icon">
    <span class="new-form-input-icon" v-if="icon"><i :class="icon"></i> </span>
    <input :type="inputType" v-model="inputModel" :placeholder="placeholder" @change="modelValueUpdated" @keydown="modelValueUpdated" @updated="modelValueUpdated" class="form-control" :class="{'is-invalid': isInvalid}">
    <span class="password-show-icon"  @click="togglePassword">
      <i class="bi bi-eye-slash" v-if="inputType === 'text'"></i>
      <i class="bi bi-eye" v-else></i>
    </span>
  </div>
</template>
