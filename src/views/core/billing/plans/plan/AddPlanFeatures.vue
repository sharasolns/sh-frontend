<script setup>
import { useRoute } from 'vue-router'
import {ShSilentAction,ShDropDownForm} from '@iankibetsh/shframework'
import { useStreamline } from '@iankibetsh/vue-streamline'
import SkeletonFull from '@/views/layouts/skeletons/SkeletonFull.vue'
import { useAppStore } from '@iankibetsh/shframework'

const route = useRoute()

const planId = route.query.id

const {loading, getActionUrl,props} = useStreamline('billing/plans/plan-features',planId)
</script>

<template>
<skeleton-full v-if="loading && !props.availableFeatures"></skeleton-full>
  <div v-else>
    <ul class="list-group">
      <li class="list-group-item d-flex" v-for="feature in props.availableFeatures" :key="feature.id">
        <strong class="bi-dash"/>
        <span class="flex-fill mx-2" :title="feature.description">{{ feature.name }}</span>
        <sh-silent-action v-if="feature.feature_type === 'boolean'" @success="()=>useAppStore().refresh(2000)" :url="getActionUrl('addFeature',planId,feature.id)" class="btn btn-sm btn-primary">Add</sh-silent-action>
        <sh-drop-down-form v-else @success="useAppStore().refresh(2000)" :fields="['value']" :action="getActionUrl('addFeature',planId,feature.id)" class="btn btn-sm btn-primary">Add</sh-drop-down-form>
      </li>
    </ul>
  </div>
  <div class="alert alert-info mt-2" v-if="!loading && props.availableFeatures.length == 0">
    <p>All features have been added to this plan</p>
  </div>
</template>

<style scoped>

</style>
