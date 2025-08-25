<script setup>
import {useStreamline} from '@iankibetsh/vue-streamline'
import { ShModalForm, useAppStore, ShTable, shRepo } from '@iankibetsh/shframework'
import { ref, useId } from 'vue'

const {getActionUrl, service} = useStreamline('billing/paymentMethods/paymentMethods')
const paymentMethod = ref(null)
const methodModalId = useId();

const editPaymentMethod = (row) => {
  paymentMethod.value = row
  if (paymentMethod.value) {
    shRepo.showModal(methodModalId)
  }
}

</script>

<template>
  <sh-modal-form
    class="btn btn-primary btn-sm"
    modal-title="Payment Method Form"
    :current-data="paymentMethod"
    :modal-id="methodModalId"
    :action="getActionUrl('addPaymentMethod')"
    :fields="['name','description', 'public_key','secret_key','pass_key','image']"
    @success="useAppStore().refresh(2000)"
    ><i class="bi bi-plus-lg"></i> ADD PAYMENT METHOD</sh-modal-form>

  <div class="table-responsive">
    <sh-table
      :end-point="getActionUrl('listPaymentMethods')"
      :headers="['id','name','order','description','public_key','secret_key','pass_key','image']"
      :actions="{
        label:'&nbsp',
        actions: [
          {
            label: 'Edit',
            class: 'btn btn-sm btn-primary me-1',
            icon :'bi-pencil',
            emits: editPaymentMethod,
          },
          {
            label: 'Delete',
            class: 'btn btn-sm btn-danger',
            icon :'bi-trash',
            emits: row =>shRepo.confirmAction('Are you sure?').then(res=>{
              if(res.isConfirmed){
                service.deletePaymentMethod(row.id).then(res=>{
                  shRepo.showToast('Payment Method deleted')
                  useAppStore().refresh(700)
                })
              }
            })
          }
        ]
      }"

    />
  </div>


</template>

<style scoped>

</style>
