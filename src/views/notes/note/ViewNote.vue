<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id
</script>
<template>
<h3>View Note</h3>
  <router-link :to="`/notes/note/${id}/add-comment`">Add Comment</router-link>
</template>

<style scoped>

</style>