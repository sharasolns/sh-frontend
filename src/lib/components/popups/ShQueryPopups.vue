<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { Modal, Offcanvas } from 'bootstrap'
import _ from 'lodash'

import ShModal from '../ShModal.vue'
import ShCanvas from '../ShCanvas.vue'
import ShQueryForm from '../ShQueryForm.vue'

const route = useRoute()
const popUp = ref(route.query.popUp)
const modalId = _.uniqueId('modal_')
const canvasId = _.uniqueId('canvas_')
let popupComponent = ref(null)
const parent = ref(null)
const router = useRouter()
const position = ref(null)
const size = ref(null)
const title = ref(null)
const popups = []
const popupPaths = []
const AsyncComp =ref(null)

import { useAppStore } from './../../repo/stores/ShApp.js'
import { storeToRefs } from 'pinia'
const {refreshKey} = storeToRefs(useAppStore())

watch(() => route.query.popup, pop => {
  popUp.value = pop
  position.value = route.query.position ?? route.query.side
  size.value = route.query.size
  title.value = route.query.title
  let queryComponent = route.query.comp ?? route.query.component
  if(queryComponent && ['shqueryform','queryform'].includes(queryComponent.toLowerCase())) {
    queryComponent = ShQueryForm
  }
  popupComponent.value = queryComponent
  if (popUp.value) {
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
    let backUrl = route.path
    const params = route.query
      let query = '?'
      // console.log(params)
    Object.keys(params).map(key => {
        const removeKeys = ['popup','comp','component']
        if(!removeKeys.includes(key)) {
            query += `${key}=${params[key]}&`
        }
    })
      console.log(query)
    router.push(backUrl + query)
  }
}
</script>
<template>
  <template v-if="popUp === 'modal'">
    <sh-modal :modal-title="title" data-bs-backdrop="static" data-bs-keyboard="false" :modal-id="modalId" :modal-size="size">
      <component :key="refreshKey" :is="popupComponent"/>
    </sh-modal>
  </template>
  <template v-if="['offcanvas','canvas','offCanvas'].includes(popUp)">
    <sh-canvas :canvas-title="title" :key="size + position" :canvas-id="canvasId" :canvas-size="size" :position="position">
      <component :key="refreshKey" :is="popupComponent"/>
    </sh-canvas>
  </template>
</template>

<style scoped>

</style>
