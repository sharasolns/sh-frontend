<script setup>
import {ShDynamicTabs} from '@iankibetsh/shframework'
import BillingFeaturesList from '@/views/core/billing/plans/features/tabs/BillingFeaturesList.vue'
import FeatureCategoriesList from '@/views/core/billing/plans/features/tabs/FeatureCategoriesList.vue'

</script>

<template>
  <div>
    <sh-dynamic-tabs
      :tabs="[
        {
          label:'Billing Features',
          component: BillingFeaturesList
        },
        {
          label: 'Feature Categories',
          component: FeatureCategoriesList
        }
        ]"
      />

  </div>
</template>

<style scoped>

</style>
