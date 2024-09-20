<script setup>
import {ref, onMounted } from 'vue'
import shApis from './../../../repo/helpers/ShApis.js'
import ShTable from './../../../components/ShTable.vue'
import ShModal from './../../../components/ShModal.vue'
import ShForm from './../../../components/ShForm.vue'
import shRepo from './../../../repo/helpers/ShRepo.js'

import {Modal} from 'bootstrap'

let permissions = ref([])
let reload = ref(0)

function departmentAdded (response) {
  shRepo.showToast('Department saved')
  reload.value += 1
}

const department = ref(null)
const editDepartment = dept=>{
department.value = dept
  if(dept) {
    new Modal(document.getElementById('sh_department_modal'),{}).show()
  }
}
</script>
<template>
  <h5>Departments</h5>
        <div class="card sh-departments-card shadow">
          <div class="card-body">
            <a @click="editDepartment(null)" data-bs-toggle="modal" ref="addDeptBtn" href="#sh_department_modal" class="btn btn-info btn-sm"><i class="fa fa-plus"></i> ADD DEPARTMENT</a>
            <sh-table :reload="reload" :headers="['id','name','description', 'created_at']" end-point="sh-departments/list" :actions="{
      label: 'Action',
      actions: [
        {
          label: 'Edit',
          emits: editDepartment,
          class: 'btn btn-warning bi-pen btn-sm me-1'
        },
        {
          label: 'Permissions',
          path: '/sh-departments/manage-permissions/{id}',
          class: 'btn btn-info bi-lock btn-sm'
        }
      ]
    }"></sh-table>
            <sh-modal modal-id="sh_department_modal" modal-title="Department Form">
              <sh-form success-callback="departmentAdded" :current-data="department" @departmentAdded="departmentAdded" action="sh-departments" :fields="['name','description']"></sh-form>
            </sh-modal>
          </div>
        </div>
</template>
