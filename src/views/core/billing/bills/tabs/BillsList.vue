<script setup>
import {useStreamline} from '@iankibetsh/vue-streamline'
import SkeletonFull from '@/views/layouts/skeletons/SkeletonFull.vue'
import { useRoute } from 'vue-router'
import ShTable from "@/lib/components/ShTable.vue";
const route = useRoute();
const {getActionUrl, loading} = useStreamline('billing/bills/bills')

const status = route.params.status


</script>

<template>
  <SkeletonFull v-if="loading" />
  <div class="table-responsive" v-else>
    <sh-table :end-point="getActionUrl('listBills', status)"
              :headers="['id', 'amount','months', 'status',  'payment_status','from', 'to', 'created_at']"
              has-range="true"
              :actions="{
                label:'&nbsp',
                type: 'dropdown-horizontal',
                actions:[
                  {
                    label:'View',
                    url:'/billing/bills/view',
                    icon:'bi-eye',
                    class:'text-primary',
                    path:'/billing/bills/bill/{id}'

                  },
                  {
                    label:'Edit',
                    url:'/billing/bills/view',
                    icon:'bi-eye',
                    class:'text-danger',
                    emits:(row) => console.log('Edit', row)

                  },
                ]
              }"
    />
  </div>

</template>

<style scoped>

</style>
