<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import shApis from '../../../../repo/helpers/ShApis.js'
const route = useRoute()
const tabs = ref(null)
const activeTab = ref(0)
const permissions = ['invoices','tasks','paymnents']
const modules = ref([])
const selectedModule = ref('tasks')
const modulePermissions = ref(null)
const setModule = module=>{
  selectedModule.value = module
  getModulePermissions()
}
onMounted(() => {
  console.log(tabs.value.querySelectorAll('li'))
  getDepartmentModules()
})
const getDepartmentModules = ()=>{
  shApis.doGet(`admin/departments/department/list-modules/${route.params.id}?all=1`).then(res=>{
    modules.value = res.data.data
    selectedModule.value = res.data.data[0]
    getModulePermissions()
  })
}
const loading = ref(false)
const getModulePermissions = () => {
  loading.value = true
  modulePermissions.value = null
  shApis.doGet(`admin/departments/department/get-module-permissions/${selectedModule.value.module}`).then(res=>{
    loading.value = false
    modulePermissions.value = reformatModulePermissions(res.data.permissions)
  })
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
</script>
<template>
  <div class="row permissions-main d-flex">
      <div id="permissions-nav" class="col-md-2 shadow d-flex align-items-center">
        <ul ref="tabs" class="d-flex flex-column w-100">
          <li v-for="module in modules" :class="selectedModule.id === module.id && 'active'" :key="module.id">
            <input type="checkbox">
            <label class="text-capitalize" @click="setModule(module)"> {{  module.module.replaceAll('_',' ')  }}</label>
          </li>
        </ul>
      </div>
      <div id="permissions-content" class="col-md-10">
        <div class="alert alert-info" v-if="loading">
          loading ...
        </div>
        <div v-else class="d-flex justify-content-evenly">
          <div class="col-md-3 list-group" v-for="permissions in modulePermissions">
            <label class="p-2 text-capitalize list-group-item pb-0 text-capitalize" v-for="permission in permissions">
              <input type="checkbox"> {{ permission }}
            </label>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
.permissions-main{
  background: #edeff2;
  div#permissions-nav{
    padding: 0;
    ul {
      padding-left: 0;
      li.active {
        border-right: none !important;
        position: relative;
        top: 0;
        left: 0;
        background: white;

        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 0px;
          //border-right: #edeff2 solid 30px;
          border-top: transparent solid 20px;
          border-bottom: transparent solid 20px;
        }
      }
      li {
        list-style: none;
        border: solid 1px #ccc;
        padding-left: 3px;
        display: flex;
        gap: 5px;
        label {
          padding: 8px 0;
          cursor: pointer;
          height: 100%;
          flex-grow: 1;
        }
      }
    }
  }
  div#permissions-content {
    background: white;
    //border: #bec7d3 2px solid;
  }
}
</style>