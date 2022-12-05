<script setup>
import {ref, onMounted } from 'vue'
import shApis from './../../../repo/helpers/ShApis.js'
import ShTable from './../../../components/ShTable.vue'
import ShModal from './../../../components/ShModal.vue'
import ShForm from './../../../components/ShForm.vue'
import shRepo from './../../../repo/helpers/ShRepo.js'

let editingDepartment = ref(null)
let allPermissions = ref([])
let permissions = ref([])
let reload = ref(0)
let permissionsModalBtn = ref(null)

onMounted(() => {
  shApis.doGet('admin/departments/all-permissions').then(res => {
    allPermissions.value = res.data
  })
})

function departmentAdded (response) {
  shRepo.showToast('Department added')
  reload.value += 1
}
</script>
<template>
  <h5>Departments</h5>
        <div class="card sh-departments-card shadow">
          <div class="card-body">
            <a data-bs-toggle="modal" ref="addDeptBtn" href="#sh-department_modal" class="btn btn-info btn-sm"><i class="fa fa-plus"></i> ADD DEPARTMENT</a>
            <sh-table :headers="['id','name','description', 'created_at']" end-point="admin/departments/list" :actions="{
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          path: '/sh-departments/manage-permissions/{id}',
          class: 'btn btn-info bi-lock btn-sm'
        }
      ]
    }"></sh-table>
            <sh-modal modal-id="sh-department_modal" modal-title="Department Form">
              <sh-form success-callback="departmentAdded" @departmentAdded="departmentAdded" action="admin/departments/store" :fields="['name','description']"></sh-form>
            </sh-modal>
          </div>
        </div>
</template>
