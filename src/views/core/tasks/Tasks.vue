<script setup>

import ShDynamicTabs from '@/lib/components/ShDynamicTabs.vue'
import ShForm from '@/lib/components/ShForm.vue'
import ShModal from '@/lib/components/ShModal.vue'
import ShTable from '@/lib/components/ShTable.vue'
import ShRange from '@/lib/components/ShRange.vue'
import shRepo from '@/lib/repo/helpers/ShRepo'
import ShModalForm from '@/lib/components/ShModalForm.vue'
import NoRecords from '@/lib/components/others/NoRecords.vue'
import TabOne from '@/tabs/TabOne.vue'
import TabTwo from '@/tabs/TabTwo.vue'
const query = `{
  tasks (id:{gt: 4}) {
      name
      description
      id
      created_at
      user_id
      state
      phone
      user {
          name
          id
      }
  }
}`
const showUser = (row)=>{
  if(!row) {
    return 'User'
  } else {
   return row.user.name
  }
}
const rangeSelected = range=>{
  console.log(range)
}

const deleteTask = item=>{
  shRepo.runPlainRequest(`tasks/delete/${item.id}`).then(res=>{
    res.isConfirmed && shRepo.showToast('Task deleted')
  })
}
const taskAdded = ()=>{
  shRepo.showToast('Task added')
}
</script>
<template>
  <a href="#exampleModal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</a>
  <sh-modal modal-id="exampleModal" modal-title="My Example Modal" :static="true">
    <h5>Model content here</h5>
  </sh-modal>

  <sh-form
      :fields="['na','state','user_id','accept','allow']"
      :action="'/tasks/store'"
      class="btn btn-info"
      :files="['state']"
      :submitBtnClass="'btn btn-danger'"
      :actionLabel="'Add Task'"
      :check-boxes="{
          allow: [
              {
                label: 'Accept',
                value: 1,
                disabled: true,
                checked: true
              },
              {
                label: 'Reject',
                value: 0
              }
          ]
      }" :radioBoxes="{
          display: 'row',
          accept: [
              {
                label: 'Accept',
                value: 1,

              },
              {
                label: 'Reject',
                value: 0
              }
          ]
      }"
      :success-callback="taskAdded"
      :fill-selects="{
          user_id: {
            url: 'tasks/lists/any?all=1',
            column: 'created_at',
            value: 'created_at',
        }
      }"
  />
  <div class="d-none">
    <sh-dynamic-tabs
        currentTab='Tab Two'
        :tabs="[
      {
    label: 'Tab One',
    component: TabOne,
    },
    {
    label: 'Tab Two',
    component: TabTwo
    }
  ]"
    /><h5>All Tasks</h5>
    <div class="card">
      <div class="card-body">
        <sh-modal-form
            :fields="['service_id','commission_type','commission']"
            :action="'/services/providers/store?user_id='"
            :fill-selects="{
                  service_id: {
                  url: '/services/list?all=1',
                  suggest: true
                 },
                 commission_type: {
                   data: [
                       {
                         id: 'fixed',
                         name: 'Fixed'
                       },
                       {
                         id: 'percentage',
                         name: 'Percentage'
                       }
                   ]
                 }

            }"
            class="btn btn-info ms-auto bi-plus"
        > Add Provider
        </sh-modal-form>
        <router-link to="/tasks/form" class="btn btn-info btn-sm"><i class="bi-plus"></i> Add Task</router-link>
        <router-link to="/tasks?popup=modal&title=New Task&comp=ShQueryForm&fields=name,email,phone&action=tasks/store" class="btn btn-info btn-sm ms-2"><i class="bi-plus"></i> PopupQuery Form</router-link>
        <sh-range @range-selected="rangeSelected"/>
        <sh-table
            :headers="['id',showUser,'name','description','phone','created_at']"
            cache-key="tasks"
            :query="query"
            :actions="{
            label: '...',
            actions: [
                {
                label: 'Edit',
                path: 'tasks/form/{id}',
                class: 'btn btn-info btn-sm',
                permission: 'tasks.edit'
              },
              {
                label: 'More',
                path: '?taskId={id}&popup=canvas&comp=ViewTask&title=View Task',
                class: 'btn btn-info btn-sm'
              },
              {
                label: 'Delete',
                icon: 'bi bi-trash',
                class: 'btn btn-outline-danger btn-sm',
                emits: deleteTask
              }
            ]
          }"
        >
        </sh-table>

        <sh-modal-form
            modal-id="addPayment"
            modal-title="Add Payment"
            :fields="['payment_account','amount', 'reference' ]"
            :required="['payment_account','amount', 'reference' ]"
            :action="`invoices/payments/store`"
            :fill-selects="{
                payment_account: {
                    url: `accounts/payment-accounts/list/any`,
                    suggests: true
                }
            }" class="btn btn-primary btn-sm me-2">
          <i class="bi bi-cash"></i>  Mark Paid  </sh-modal-form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
