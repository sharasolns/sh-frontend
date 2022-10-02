<template>
  <div class="offcanvas" :class="side +' '+ canvasSize + ''" data-bs-scroll="true" tabindex="-1" v-bind:id="canvasId" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">{{ canvasTitle}}</h5>
      <button type="button" ref="closecanvas" @click="offcanvasClosed" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShCanvas',
  props: ['canvasTitle', 'canvasId', 'position','canvasSize'],
  components: {
  },
  data () {
    return {
      side: this.position === undefined ? 'offcanvas-start' : 'offcanvas-' + this.position
    }
  },
  methods: {
    offcanvasClosed: function () {
      this.$emit('offcanvasClosed')
    }
  }
}
</script>
