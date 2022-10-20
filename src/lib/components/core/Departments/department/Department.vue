<script setup>
import {useRoute} from 'vue-router'
import {onMounted, ref, computed} from 'vue'
import {useUserStore} from '../../../../../lib/repo/stores/ShUser.js'
import {storeToRefs} from 'pinia'
import ShTable from '../../../../../lib/components/ShTable.vue'
import ShModal from '../../../../../lib/components/ShModal.vue'
import ShForm from '../../../../../lib/components/ShForm.vue'
import ShCanvas from '../../../../../lib/components/ShCanvas.vue'
import shApis from '../../../../../lib/repo/helpers/ShApis.js'
import shRepo from '../../../../../lib/repo/helpers/ShRepo.js'
const route = useRoute()
const id = ref(route.params.id)
let department = ref(null)
let permissionCanvasBtn = ref(null)
let reload = ref(1)
let module = ref(null)
let modulePermissions = ref(null)
let selectedPermissions = ref([])
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

onMounted(() => {
getDepartment()
})

let getModule = computed(()=>{
  return module.value
})



function moduleAdded () {
  shRepo.showToast('module added successfully', 'success')
  reload.value++
}
function showModule (module) {
  if (module) {
    return '<span class="text-capitalize">' + module.module.replace('_', ' ') + '</span>'
  }
  return 'Module'
}
function deletePermission (module) {
  shRepo.runPlainRequest('admin/departments/department/delete-department/' + module.id).then((res) => {
    if (res.isConfirmed) {
      reload.value++
      // shRepo.showToast('module removed successfully', 'success')
    }
  })
}
function viewPermissions(rModule) {
  module.value = null
  permissionCanvasBtn.value.click()
  modulePermissions.value = null
  selectedPermissions.value = []
  shApis.doGet('admin/departments/department/get-module-permissions/' + rModule.module).then(res => {
    modulePermissions.value = res.data.permissions
    module.value = rModule
    if (rModule.permissions) {
      selectedPermissions.value = JSON.parse(rModule.permissions)
    }
    console.log(module.value)
  }).catch(ex => {
    console.log(ex)
    // helpers.showToast('An error occurred while fetching permissions')
  })
}
function getDepartment() {
  shApis.doGet('admin/departments/department/' + id.value).then(res => {
    department.value = res.data.department
  }).catch(ex => {
    console.log(ex)
  })
}
function getPermissionLeft (menu) {
  const len = menu.split('.').length * 2
  if (len > 5) {
    return 5
  }
  return len
}
function getPermissionLabel(menu) {
  const arr = menu.split('.')
  return arr[arr.length - 1].replace(/_/g, ' ')
}
function submitPermissions() {
  const data = {
    permissions: selectedPermissions.value
  }
  shApis.doPost('admin/departments/department/permissions/' + getModule.value.id, data)
      .then(res => {
        reload.value++
        shRepo.showToast('Permissions updated', 'success')
      })
}
</script>
<template>
  <template v-if="department">
    <div class="card sh-department-view shadow">
      <div class="card-body">
        <a href="#addModule" class="btn btn-info btn-sm" data-bs-toggle="modal"><i class="bi-plus"></i> ADD Module</a>
        <h5>Department #{{department.id}} - {{ department.name }} Allowed Modules</h5>
        <sh-table :actions="{
      label: 'Actions',
      actions: [
        {
          label: 'Permissions',
          emits: viewPermissions,
          class: 'btn btn-success btn-sm'
        },
        {
          label: 'Delete',
          emits: deletePermission,
          class: 'btn btn-danger mx-2 btn-sm'
        }
      ]
    }" :reload="reload" :headers="['id',showModule,'created_at']" :end-point="'admin/departments/department/list-modules/' + id"></sh-table>
        <sh-modal modal-id="addModule" modal-title="Add Module Department">
          <sh-form :reload-select-items="reload" :success-callback="moduleAdded" :fill-selects="{
        permission_module: {
          url: 'admin/departments/department/list-pending-modules/' + id,
          suggests: true
        }
      }" :fields="['permission_module']" :action="'admin/departments/department/add-module/' + id"></sh-form>
        </sh-modal>
        <a href="#permissionsCanvas" class="d-none" ref="permissionCanvasBtn" data-bs-toggle="offcanvas"></a>
        <sh-canvas canvas-id="permissionsCanvas" position="end enlarged" canvas-title="Module Permissions">
          <template v-if="getModule">
            <h5 class="text-primary text-capitalize">Permissions for {{ getModule.module }}</h5>
            <template v-for="permission in modulePermissions" :key="permission">
              <div class="list-group p-0">
                <label class="list-group-item pb-0 text-capitalize" :class="'ms-' + getPermissionLeft(permission)">
                  <input type="checkbox" v-model="selectedPermissions" :value="permission">
                  {{ getPermissionLabel(permission) }}
                </label>
              </div>
            </template>
            <button @click="submitPermissions" class="btn btn-info"><i class="fa fa-save"></i> Submit</button>
          </template>
        </sh-canvas>
      </div>
    </div>
  </template>
</template>

<style scoped>

</style>
