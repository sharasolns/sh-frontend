<script setup>
import { ref } from 'vue'

import ShTable from '../../lib/components/ShTable.vue'
import ShModalForm from '../../lib/components/ShModalForm.vue'
import ShForm from '../../lib/components/ShForm.vue'
import shRepo from '../../lib/repo/helpers/ShRepo.js'
import ShDynamicTabs from '../..//lib/components/ShDynamicTabs.vue'
import NotesList from '../notes/NotesList.vue'
import ShModal from '../../lib/components/ShModal.vue'
import ShModalBtn from '../../lib/components/ShModalBtn.vue'
import ShCanvas from '../../lib/components/ShCanvas.vue'
import ShCanvasBtn from '../../lib/components/ShCanvasBtn.vue'
const reload = ref(0)
const notesStored = (res)=>{
  reload.value++
  shRepo.showToast('Note saved')
}
const modalKey = ref(0)
const modalClosed = () =>{
  console.log('modal Closed')
}
const canvasClosed = () => {
  console.log('canvas closed')
}
</script>
<template>
  <h5>All Notes</h5>
  <sh-modal-btn modal-id="notesModal" class="btn btn-info"><i class="bi bi-plus"></i> Add </sh-modal-btn>
  <sh-canvas-btn canvas-id="notesCanvas" class="btn btn-info ms-2">Canvas Form</sh-canvas-btn>
  <sh-modal @modalClosed="modalClosed" modal-id="notesModal" :key="modalKey">
    <sh-form @success="modalKey++" :fields="['title','note']" action="notes/store" :success-callback="notesStored" class="btn btn-info btn-sm"><i class="bi-plus"></i> New Note</sh-form>
  </sh-modal>
  <sh-canvas @canvasClosed="canvasClosed" canvas-id="notesCanvas" canvas-title="Note Form">
    <sh-form @success="modalKey++" :fields="['title','note']" action="notes/store" :success-callback="notesStored" class="btn btn-info btn-sm"><i class="bi-plus"></i> New Note</sh-form>
  </sh-canvas>
<sh-dynamic-tabs
    :key="reload"
:tabs="[
    {
      label: 'Active',
      component: NotesList,
      tabCount: 34
    }
]"
/>
</template>
<style>

</style>