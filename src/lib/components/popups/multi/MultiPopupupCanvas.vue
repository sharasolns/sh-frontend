<template>
  <!-- First Offcanvas -->
  <div
      v-if="canvasId"
      class="offcanvas offcanvas-end"
      :data-bs-scroll="scrollable ? 'true' : 'false'"
      tabindex="-1"
      :id="canvasId"
      aria-labelledby="offcanvasLabel"
      ref="offcanvas1"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasLabel">{{ canvasTitle }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>

  <!-- Second Offcanvas -->
  <div
      v-if="secondId"
      class="offcanvas offcanvas-end"
      :data-bs-scroll="secondScrollable ? 'true' : 'false'"
      tabindex="-1"
      :id="secondId"
      aria-labelledby="offcanvasLabel"
      ref="offcanvas2"
      style="z-index: 1061;"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{{ secondTitle }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot name="secondCanvas"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { Offcanvas } from 'bootstrap';

const emit = defineEmits(['canvasClosed']);
const props = defineProps({
  canvasId: {
    required: true,
    type: String,
  },
  canvasTitle: {
    type: String,
    default: 'Offcanvas Title',
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  secondId: {
    type: String,
    default: null, // Optional second canvas ID
  },
  secondTitle: {
    type: String,
    default: null, // Optional second canvas title
  },
  secondScrollable: {
    type: Boolean,
    default: false, // Optional second canvas scrollable
  },
});

const offcanvas1 = ref(null);
const offcanvas2 = ref(null);

onMounted(async () => {
  await nextTick(); // Wait for DOM updates

  const firstOffcanvas = new Offcanvas(offcanvas1.value);
  const secondOffcanvas = new Offcanvas(offcanvas2.value);

  // Event listener for opening the second offcanvas
  if (props.secondId) {
    const openSecondCanvasButton = document.getElementById('openSecondCanvas');
    if (openSecondCanvasButton) {
      openSecondCanvasButton.addEventListener('click', () => {
        offcanvas1.value.classList.add('offcanvas-full', 'blurred'); // Blur and resize first offcanvas
        secondOffcanvas.show(); // Show the second offcanvas
      });
    }

    // Event listener for clicking outside the second offcanvas
    const handleOutsideClick = (event) => {
      if (offcanvas2.value && !offcanvas2.value.contains(event.target)) {
        secondOffcanvas.hide(); // Hide the second offcanvas if clicked outside
      }
    };

    // Add click event listener
    document.addEventListener('mousedown', handleOutsideClick);

    // Reset the first offcanvas when the second is closed
    offcanvas2.value.addEventListener('hidden.bs.offcanvas', () => {
      offcanvas1.value.classList.remove('offcanvas-full', 'blurred'); // Remove blur effect
    });

    // Cleanup event listener on unmount
    onUnmounted(() => {
      document.removeEventListener('mousedown', handleOutsideClick);
    });
  }
});
</script>

<style>
/* Full-width and blur effect for the first offcanvas */
.blurred {
  filter: blur(1px);
  width: 100% !important;
  background-color: #000;
}
@media (min-width: 768px) {
  #offcanvas1 {
    width: 60%;
    opacity: 1; /* Make sure the opacity for the first offcanvas remains 1 initially */
  }

  #offcanvas2 {
    width: 50%;
  }

  .offcanvas-full {
    width: 65% !important;
    opacity: 0.7; /* Set opacity to make the first offcanvas more visible */
  }
}

@media (max-width: 768px) {
  .offcanvas-full {
    width: 95% !important;
    opacity: 10
  }
}
</style>