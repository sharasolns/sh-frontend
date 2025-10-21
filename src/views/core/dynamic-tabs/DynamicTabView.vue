<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const tab = computed(() => route.query.tab)
</script>

<template>
Tab Dynamic View - Current Tab: {{ tab }}
</template>

<style scoped>

</style>