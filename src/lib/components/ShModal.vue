<script setup>
import {computed, onMounted} from 'vue'

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
    },
    static: {
        type: Boolean,
        default: false
    },
    bsKeyboard: {
        type: Boolean,
        default: true
    },
    centered: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    const modal = document.getElementById(props.modalId)
    modal && modal.addEventListener('hidden.bs.modal', event => {
        event.target.id == props.modalId && emit('modalClosed')
    })
})
const modalClasses = computed(() => {
    let classes = 'modal-dialog'
    if (props.modalSize) {
        classes += ' modal-' + props.modalSize
    }
    if (props.centered) {
        classes += ' modal-dialog-centered'
    }
    return classes
})
</script>
<template>
    <div class="modal fade" :id="modalId" aria-hidden="true" :data-bs-backdrop="static? 'static': 'none'">
        <div class="modal-dialog"  :class="modalClasses"  >
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title flex-fill">{{ modalTitle }}</h3>
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
