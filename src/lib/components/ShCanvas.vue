<script setup>
import { onMounted, ref } from 'vue'
const emit = defineEmits(['canvasClosed'])
const props = defineProps({
  canvasId: {
    required: true,
    type: String
  },
  canvasTitle: {
    type: String
  },
  position: {
    type: String
  },
  canvasSize: {
    type: String
  },
  side: {
    type: String
  }
})
const pos = ref(props.position ?? props.side)
const canvasSide = ref(pos.value ?  `offcanvas-${pos.value}` : 'offcanvas-start')

onMounted(()=>{
  const canvas = document.getElementById(props.canvasId)
  canvas.addEventListener('hidden.bs.offcanvas', event => {
    event.target.id === props.canvasId && emit('canvasClosed')
  })
})
</script>
<template>
  <div class="offcanvas" :class="canvasSide +' '+ canvasSize + ''" data-bs-scroll="true" tabindex="-1" :id="canvasId" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">{{ canvasTitle}}</h5>
      <button type="button" ref="closecanvas" @click="offcanvasClosed" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>
</template>
