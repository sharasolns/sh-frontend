<script setup>
import { Modal, Offcanvas } from 'bootstrap'
import { defineAsyncComponent, ref, watch } from 'vue'
import _ from 'lodash'
import PopupLoading from './etc/PopupLoading.vue'
import ErrorLoadingPopup from './etc/ErrorLoadingPopup.vue'
import ShCanvas from '../ShCanvas.vue'
import ShModal from '../ShModal.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const popUp = ref(route.meta.popUp)
const modalId = _.uniqueId('modal_')
const canvasId = _.uniqueId('canvas_')
let PopupComponent = ref(null)
const parent = ref(null)
const router = useRouter()
const position = ref(null)
const size = ref(null)
const popups = []
const popupPaths = []
const AsyncComp =ref(null)
watch(() => route.query.popup, pop => {
  popUp.value = pop
  position.value = route.query.position ?? route.query.side
  size.value = route.query.size
  if (popUp.value) {
    loadPopupComponent()
    setTimeout(() => {
      initPopup()
    }, 100)
  } else {
    //no pop up, check if we have any unclosed backdrop
    setTimeout(() => {
      closeOrphanedBackdrops()
    }, 100)
  }
})
const loadPopupComponent = ()=>{
  const component =  route.query.comp || ''
  PopupComponent.value = defineAsyncComponent({
    // the loader function
    loader: () => import(`../../../views/popups/${component}Popup.vue`),

    // A component to use while the async component is loading
    loadingComponent: PopupLoading,
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,

    // A component to use if the load fails
    errorComponent: ErrorLoadingPopup,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 3000
  })
}
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
    let backUrl = route.path
    // const params = route.params
    // Object.keys(params).map(key => backUrl = backUrl.replace(`:${key}`,params[key]))
    router.push(backUrl)
  }
}
</script>
<template>
  <template v-if="popUp === 'modal'">
    <sh-modal :modal-id="modalId" :modal-size="size">
      <popup-component/>
    </sh-modal>
  </template>
  <template v-if="['offcanvas','canvas','offCanvas'].includes(popUp)">
    <sh-canvas :canvas-id="canvasId" :canvas-size="size" :position="position">
      <popup-component/>
      <async-comp/>
    </sh-canvas>
  </template>
</template>

<style scoped>

</style>
