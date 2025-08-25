<script setup>
import { ref } from 'vue'
import CardLayout from '@/views/layouts/CardLayout.vue'
import { shRepo } from '@iankibetsh/shframework'

const props = defineProps(['sharedData'])
const plan = ref(props.sharedData.plan)
</script>

<template>
  <CardLayout>
    <div class="table-responsive" v-if="plan">
      <h5>Plan Overview</h5>
      <p class="mb-2">Plan Name: {{ plan.name }}</p>
      <p class="mb-2">Plan Type: {{ plan.plan_type }}</p>
      <p class="mb-2">Plan Create At: {{ shRepo.formatDate(plan.created_at) }}</p>
      <p class="mb-2">Is Popular : {{ plan.is_popular ? 'yes' :'no' }}</p>
      <p class="mb-2">Amount : {{ shRepo.formatNumber(plan.amount) }}</p>
    </div>

  </CardLayout>
</template>

<style scoped>

</style>
