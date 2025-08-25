<script setup>
import { ref } from 'vue'
import { useStreamline } from '@iankibetsh/vue-streamline'
import { shRepo, ShTable, useAppStore } from '@iankibetsh/shframework'

const props = defineProps(['sharedData'])
const plan = ref(props.sharedData.plan)
const {getActionUrl,service} = useStreamline('billing/plans/plan-features')
</script>

<template>
  <router-link class="btn btn-primary float-end" :to="`?popup=offcanvas&side=end&component=AddPlanFeatures&id=${plan.id}&title=Add Features`"><i class="bi-plus"/> Add Feature</router-link>
    <sh-table :headers="['created_at','name',{
      label: 'Value',
      callBack: row=>{
        return row.feature_type === 'boolean' ? `<span class='badge bg-success text-white'><i class='bi-check'/> Included</span>`:row.value
      }
    },'description']" :end-point="getActionUrl('listPlanFeatures',plan.id)"
    :actions="{
      label:'&nbsp',
      actions: [
        {
          label: 'Delete',
          class: 'btn btn-sm btn-danger',
          icon :'bi-trash',
          emits: row =>shRepo.confirmAction('Are you sure?').then(res=>{
            if(res.isConfirmed){
              service.deleteFeature(row.id).then(res=>{
                shRepo.showToast('Feature deleted')
                useAppStore().refresh(700)
              })
            }
          })
        }
      ]

    }"
    />

</template>

<style scoped>

</style>
