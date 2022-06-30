<template>
  <div class="offcanvas" :class="side" data-bs-scroll="true" tabindex="-1" v-bind:id="canvas_id" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">{{ canvas_title}}</h5>
      <button type="button" ref="closecanvas" @click="modalClosed" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShCanvas',
  props: ['canvas_title', 'canvas_id', 'position'],
  components: {
  },
  data () {
    return {
      side: this.position === undefined ? 'offcanvas-bottom' : 'offcanvas-' + this.position
    }
  },
  methods: {
    modalClosed: function () {
      this.$emit('modalClosed')
    }
  }
}
</script>
