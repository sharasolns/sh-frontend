<template>
  <div class="modal fade" tabindex="-1" v-bind:id="modal_id" data-focus="false" aria-hidden="true">
    <div class="modal-dialog" :class="`modal-${modal_size}`">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ modal_title }}</h3>
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
  props: ['modal_title', 'modal_id', 'modal_size'],
  components: {

  }
}
</script>
