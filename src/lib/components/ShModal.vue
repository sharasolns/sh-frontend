<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['modalClosed'])
const props = defineProps({
  modalId: {
    required: true,
    type: String
  },
  modalTitle: {
    type: String
  },
  modalSize: {
    type: String
  }
})
onMounted(()=>{
  const modal = document.getElementById(props.modalId)
  modal.addEventListener('hidden.bs.modal', event => {
    event.target.id == props.modalId && emit('modalClosed')
  })
})
</script>
<template>
  <div class="modal fade" :id="modalId" aria-hidden="true">
    <div class="modal-dialog" :class="`modal-${modalSize}`">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ modalTitle }}</h3>
          <button class="btn btn-danger btn-sm" data-bs-dismiss="modal" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="section">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
