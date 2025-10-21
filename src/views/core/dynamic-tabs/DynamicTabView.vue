<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const route = useRoute()
const props = defineProps({
  tab: {
    type: Object,
    default: null
  }
})
const currentTab = computed(() => route.query.tab)
</script>

<template>
Tab Dynamic View - Current Tab: {{ tab }}
  {{ $attrs }}
</template>

<style scoped>

</style>