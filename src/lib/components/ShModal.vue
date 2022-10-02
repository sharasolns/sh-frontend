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
<script>
export default {
  name: 'ShModal',
  props: ['modalTitle', 'modalId', 'modalSize'],
  components: {
  }
}
</script>
