<script setup>
import { ShTabs } from '@iankibetsh/shframework'
import {useStreamline} from '@iankibetsh/vue-streamline'
import { useRoute } from 'vue-router'
import SkeletonFull from '@/views/layouts/skeletons/SkeletonFull.vue'
import { ref, watch } from 'vue'

const route = useRoute();
const planId = route.params.id
const {props, loading} = useStreamline('billing/plans/plans', planId)
const plan = ref(null);

watch(() => props.plan, () => {
  if(props.plan){
    plan.value = props.plan
  }
})

</script>

<template>

  <div v-if="loading">
    <SkeletonFull/>
  </div>
  <div v-else>
        <sh-tabs
          :tabs="['overview','features']"
          :base-url="`/billing/plans/plan/${planId}`"
          :shared-data="{plan}"
          :active-tab="features"
        />
  </div>
</template>

<style scoped>

</style>
