<script setup>
import { ref } from 'vue'

import ShTable from '../../lib/components/ShTable.vue'
import ShModalForm from '../../lib/components/ShModalForm.vue'
import shRepo from '../../lib/repo/helpers/ShRepo.js'
import ShDynamicTabs from '../..//lib/components/ShDynamicTabs.vue'
import NotesList from '../notes/NotesList.vue'
const reload = ref(0)
const notesStored = (res)=>{
  reload.value++
  shRepo.showToast('Note saved')
}
</script>
<template>
  <h5>All Notes</h5>
  <sh-modal-form :fields="['title','note']" action="notes/store" :success-callback="notesStored" class="btn btn-info btn-sm"><i class="bi-plus"></i> New Note</sh-modal-form>
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