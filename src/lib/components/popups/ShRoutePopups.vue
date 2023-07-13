<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref, markRaw } from 'vue'
import { Modal, Offcanvas } from 'bootstrap'
import _ from 'lodash'
import ShModal from '../ShModal.vue'
import ShCanvas from '../ShCanvas.vue'

const route = useRoute()
const popUp = ref(route.meta.popUp)
const modalId = _.uniqueId('modal_')
const canvasId = _.uniqueId('canvas_')
const componentView = ref(null)
const parent = ref(null)
const router = useRouter()
const position = ref(null)
const size = ref(null)
const title = ref(null)
const popups = []
const popupPaths = []
watch(() => route.meta, meta => {
  popUp.value = meta.popUp ?? meta.popup
  if (popUp.value) {
    // popups.push(meta)
    // !popupPaths.includes(route.path) && popupPaths.push(route.path) && popups.push(meta)
    position.value = meta.position ?? meta.side
    size.value = meta.size
    title.value = meta.title
    componentView.value = markRaw(route.matched[route.matched.length - 1].components.default)
    setTimeout(() => {
      initPopup()
    }, 100)
  } else {
    //no pop up, check if we have any unclosed backdrop
    setTimeout(() => {
      closeOrphanedBackdrops()
    }, 500)
  }
})
const closeOrphanedBackdrops = () => {
  const offCanvasBackdrop = document.querySelector('.offcanvas-backdrop')
  if (offCanvasBackdrop) {
    if (!document.querySelector('.offcanvas.show')) {
      offCanvasBackdrop.remove()
    }
  }
  const modalBackdrop = document.querySelector('.modal-backdrop')
  if (modalBackdrop) {
    if (!document.querySelector('.modal.show')) {
      modalBackdrop.remove()
    }
  }
}
const initPopup = () => {
  if (popUp.value === 'modal') {
    // modalButton.value.click()
    const modal = document.getElementById(modalId)
    const bsModal = new Modal(modal, {})
    bsModal.show()
    modal.addEventListener('hidden.bs.modal', event => {
      event.target.id === modalId && goBack()
    })
  } else if (['offcanvas', 'canvas', 'offCanvas'].includes(popUp.value)) {
    const offCanvas = document.getElementById(canvasId)
    const bsOffCanvas = new Offcanvas(offCanvas, {})
    bsOffCanvas.show()
    offCanvas.addEventListener('hidden.bs.offcanvas', event => {
      event.target.id === canvasId && goBack()
    })
  }
}
const goBack = () => {
  if (route.matched.length) {
    let backUrl = route.matched[route.matched.length - 2].path
    const params = route.params
    Object.keys(params).map(key => backUrl = backUrl.replace(`:${key}`,params[key]))
    router.push(backUrl)
  }
}
</script>
<template>
  <a data-bs-toggle="offcanvas" :href="'#' + canvasId" shallowRef="canvasButton" class="d-none">Open Modal</a>
  <template v-if="popUp === 'modal'">
    <sh-modal :modal-title="title" :modal-id="modalId" :modal-size="size" data-bs-backdrop="static" data-bs-keyboard="false">
      <component :is="componentView"/>
    </sh-modal>
  </template>
  <template v-if="['offcanvas','canvas','offCanvas'].includes(popUp)">
    <sh-canvas :canvas-id="canvasId" :canvas-title="title" :canvas-size="size" :position="position">
      <component :is="componentView"/>
    </sh-canvas>
  </template>
</template>

<style scoped>

</style>