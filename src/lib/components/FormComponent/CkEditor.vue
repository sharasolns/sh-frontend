<script setup>
//
import {onMounted} from 'vue'

const props = defineProps(['fillSelects','modelValue'])
const emit = defineEmits(['update:modelValue'])
onMounted(()=>{
  createEditor()
})
function createEditor(){
window.ClassicEditor
    .create( document.querySelector( '#editor' ) )
    .catch( error => {
      console.error( error );
    } );
}
</script>
<template>
  <div id="editor"></div>
</template>

<style scoped>

</style>
