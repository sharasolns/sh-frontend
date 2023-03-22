<script setup>
import { useRoute } from 'vue-router'
import ShAutoForm from './ShAutoForm.vue'
const route = useRoute()

const fields = route.query.fields.split(',')
const action = route.query.action
</script>
<template>
<sh-auto-form :fields="fields" :action="action"/>
</template>

<style scoped>

</style>