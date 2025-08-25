<script setup>
import { ref, useId } from 'vue'
import { ShModalForm, shRepo, ShTable, useAppStore, useUserStore } from '@iankibetsh/shframework'
import { useStreamline } from '@iankibetsh/vue-streamline'
import { storeToRefs } from 'pinia'
import CardLayout from '@/views/layouts/CardLayout.vue'

const {getActionUrl, service} = useStreamline('billing/features/features')
const billingFeature = ref(null)
const storeFeatureModalId = useId();
const appStore = useAppStore()
const userStore = useUserStore()
const {user} = storeToRefs(userStore)

const billingFeatureStored = (res) => {
  shRepo.showToast(res.message, 'success', );
  appStore.refresh(2000)
}
const deleteBillingFeature = billingFeature => {
  shRepo.confirmAction('Do you want to delete this feature?').then(res =>{
    if(res.isConfirmed){
      service.deleteFeatureCategory(billingFeature.id).then((res) => {
        shRepo.showToast('Feature deleted successfully', 'success')
        appStore.refresh(2000)
      })
    }
  })
}
const editBillingFeature = (row) => {
  billingFeature.value = row
  if (billingFeature.value) {
    shRepo.showModal(storeFeatureModalId)
  }
}

const fields = [
  {
    name: 'name',
    label: 'Name',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
  }
]

</script>

<template>
  <CardLayout>
    <main  class="">
      <sh-modal-form
        :modal-id="storeFeatureModalId"
        modal-title="Feature Categories Form "
        :fields="fields"
        :current-data="billingFeature"
        :action="getActionUrl('storeFeatureCategory')"
        :successCallback="billingFeatureStored"
        class="btn btn-primary btn-sm mb-2"
      >
        <i class="bi bi-plus-circle"></i>
        ADD FEATURE CATEGORY
      </sh-modal-form>
      <div class="table-responsive ">
        <sh-table
          :disable-mobile-responsive="true"
          pagination-style="loadMore"
          :hide-search="true"
          :end-point="getActionUrl('listFeatureCategories')"
          :headers="[
        'id',
        'name',
        'description',
      ]"
          :actions="{
          label:'&nbsp',
          icon: 'bi bi-three-dots',
          type:'dropdown-horizontal',
          actions: [
            {
              label: 'Edit',
              icon: 'bi bi-pencil-square',
              permission: 'billing.feature_categories.add',
              emits: editBillingFeature
            },
            {
              label:'Delete',
              icon: 'bi bi-trash',
              permission: 'billing.feature_categories.delete',
              emits: deleteBillingFeature
            }
          ]
        }"
        >
        </sh-table>
      </div>
    </main>
  </CardLayout>

</template>

<style scoped>

</style>
