<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import shApis from '../../../../repo/helpers/ShApis.js'
import ShSilentAction from '../../../ShSilentAction.vue'
import { useUserStore } from '../../../../repo/stores/ShUser.js'

const emit = defineEmits(['success'])

const userStore =useUserStore()

const route = useRoute()
const permissions = ['invoices','tasks','paymnents']
const modules = ref([])
const selectedModule = ref('tasks')
const modulePermissions = ref(null)

const selectedPermissions = ref([])
const permissionsChanged = ref(false)
const departmentId = route.params.id
const department = ref(null)
const departmentModules = ref([])
const setModule = module=>{
  (selectedModule.value !== module) && (selectedModule.value = module) && getModulePermissions()
}
onMounted(() => {
  getDepartmentModules()
})
const getDepartmentModules = ()=>{
  shApis.doGet(`admin/departments/department/list-all-modules/admin/${departmentId}`).then(res=>{
    modules.value = res.data.modules
    department.value = res.data.department
    departmentModules.value = res.data.departmentModules
    selectedModule.value = res.data.modules[0]
    getModulePermissions()
  })
}
const loading = ref(false)
const getModulePermissions = () => {
  loading.value = true
  modulePermissions.value = null
  shApis.doGet(`admin/departments/department/get-module-permissions/${selectedModule.value}?department_id=${departmentId}`).then(res=>{
    loading.value = false
    modulePermissions.value = reformatModulePermissions(res.data.permissions)
    selectedPermissions.value = res.data.selectedPermissions ?? []
    permissionsChanged.value = false
  })
}
const permissionsUpdated = (res)=>{
  userStore.setUser()
  emit('success')
  departmentModules.value = res.data.departmentModules
}
function reformatModulePermissions(mPs){
let mpModules = {}
  mPs.map(mp=>{
    const arr = mp.split('.')
    const key = arr[0]
    if(typeof mpModules[key] == 'undefined'){
      mpModules[key]=[]
    }
    mpModules[key].push(mp)
  })
  return mpModules
}
const setPermissionsChanged = ()=>{
  permissionsChanged.value = true
  return true
}
const checkAllPermissions = ()=>{
  if(selectedPermissions.value.length > 0) {
    selectedPermissions.value = []
  } else {
    departmentModules.value.push(selectedModule)
    console.log(modulePermissions.value)
    const all = modulePermissions.value
    Object.keys(all).map(key=>{
      all[key].map(permission=>{
        selectedPermissions.value.push(permission)
      })
    })
  }
  permissionsChanged.value = true
}
const getLabel = permission => {
  const arr = permission.split('.')
  return arr[arr.length - 1].replaceAll('_',' ')
}
const getPermissionStyle = permission => {
  return {
    paddingLeft: `${(permission.split('.').length-1) * 20}px`
  }
}
</script>
<template>
  <div class="row permissions-main d-flex">
      <div id="permissions-nav" class="col-md-3 d-flex align-items-center py-4">
        <ul class="d-flex flex-column w-100 px-2">
          <li v-for="module in modules" :class="selectedModule === module && 'active'" :key="selectedModule">
            <input :checked="departmentModules.includes(module)" @click="checkAllPermissions" :disabled="selectedModule !== module" type="checkbox">
            <label class="text-capitalize" @click="setModule(module)"> {{  module.replaceAll('_',' ')  }}</label>
          </li>
        </ul>
      </div>
      <div id="permissions-content" class="col-md-9 py-4 px-4">
        <div class="p-2 rounded-2 bg-white h-100">
          <div class="alert alert-info" v-if="loading">
            loading ...
          </div>
          <div v-else>
            <div class="row row-cols-3">
              <div class="col" v-for="permissions in modulePermissions">
                <label @click="setPermissionsChanged" class="text-capitalize list-group-item pb-1 text-capitalize" v-for="permission in permissions" :style="getPermissionStyle(permission)">
                  <input v-model="selectedPermissions" :value="permission" type="checkbox"> {{ getLabel(permission) }}
                </label>
              </div>
            </div>
            <div class="w-100 row" v-if="permissionsChanged">
              <div class="col-md-3">
                <sh-silent-action @success="permissionsUpdated" :url="`admin/departments/department/permissions/${departmentId}/${selectedModule}`" :data="{permissions: selectedPermissions}" class="btn btn-primary d-block"><i class="bi-check"></i> Save</sh-silent-action>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
.permissions-main {
  background: #edeff2;
}
.permissions-main div#permissions-nav {
  padding: 0;
}
.permissions-main div#permissions-nav ul {
  padding-left: 0;
  max-height: 400px;
  overflow-y: auto;
}
.permissions-main div#permissions-nav ul li.active {
  border-right: none !important;
  position: relative;
  top: 0;
  left: 0;
  background: #88b3b370;
  border-radius: 10px;
}
.permissions-main div#permissions-nav ul li {
  list-style: none;
  padding-inline-start: 10px;
  display: flex;
  gap: 5px;
}
.permissions-main div#permissions-nav ul li label {
  padding: 8px 0;
  cursor: pointer;
  height: 100%;
  flex-grow: 1;
}
</style>