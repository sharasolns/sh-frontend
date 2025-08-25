<script setup>
import { storeToRefs } from 'pinia'
import { ShConfirmAction, useAppStore } from '@iankibetsh/shframework'
const emits = defineEmits(['success'])
const inputModel = defineModel();
import ShowLoading from '@/components/ShowLoading.vue'

const props = defineProps({
  modelId: {
    type: Number,
    required: true
  },
  autoLoad: {
    type: Boolean,
    default: true
  }
})


import { useStreamline } from '@iankibetsh/vue-streamline'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { shApis, shRepo, useUserStore } from '@iankibetsh/shframework'

const {loading,getActionUrl, service} = useStreamline('tickets/ticket/ticketFiles',props.modelId)

const input = useTemplateRef('fileInput')

const files = ref([])
const filesLoaded = ref(false)
const uploading = ref(false)

watch(()=>loading.value, val=>{
  if(!val && !filesLoaded.value && props.modelId){
    loadFiles()
    filesLoaded.value = true
  }
})

onMounted(()=>{
  if(props.modelId && props.autoLoad){
    loadFiles()
  }
})

const loadFiles = ()=>{
  service.getFiles(props.modelId).then(res=>{
    files.value = res
    files.value = files.value.map(file=> {
      file.uploadStatus = 'uploaded'
      return file
    })
  })
  filesLoaded.value = true
}
const fileSelected = e=>{
  const selectedFiles = e.target.files
  for(let i=0; i<selectedFiles.length; i++){
    const file = selectedFiles[i]
    file.uploadStatus = 'uploading'
    const index = files.value.length
    files.value.push(file)
    uploadFile(file,index)
  }

}
const uploadFile = (file,index)=>{
  const formData = new FormData()
  formData.append('file', file)
  if(props.modelId){
    formData.append('modelId', props.modelId)
  }
  shApis.doPost(user.value ? getActionUrl('uploadFile'):'upload-file',formData).then(res=>{
    files.value.splice(index,1)
    const uploaded = res.data
    uploaded.uploadStatus = 'uploaded'
    files.value.push(res.data)
    inputModel.value = files
    emits('success',uploaded)
    shRepo.showToast('File uploaded','info')
  }).catch(e=>{
    files.value[index].uploadStatus = 'failed'
    shRepo.showToast(e.message,'error')
  })
}

const handleFileDrop = e=>{
  e.preventDefault()
  const files = e.dataTransfer.files
  for(let i=0; i<files.length; i++){
    fileSelected({target:{files:[files[i]]}})
  }
}

const {user} = storeToRefs(useUserStore())
</script>

<template>
  <div  @dragover.prevent @drop="handleFileDrop" style="border-style: dot-dash" class="border py-2 rounded d-flex d-flex flex-column align-items-center">
    <span>Drop files here or click to upload</span>
    <input ref="fileInput" type="file" multiple @change="fileSelected" class="form-control d-none" accept="*/*"/>
    <button type="button" @click="input.click()" class="btn btn-outline-primary mt-2"><i class="bi-upload"/> Upload</button>
  </div>
  <show-loading v-if="loading"/>
  <ul v-else-if="files.length > 0" class="list-group">
    <li class="list-group-item d-flex gap-2" v-for="file in files" :key="file.id">
      <span class="text-success bi-check-all" v-if="file.uploadStatus == 'uploaded'"></span>
      <span v-else class="text-danger bi-x-lg"/>
      <i :class="`bi-filetype-` + file.ext +' fs-4'"/>
      <a :href="file.url" :download="file.name" class="flex-fill">{{ file.name }}
        <i v-if="file.uploadStatus == 'uploading'" class="spinner-border spinner-border-sm"/>
      </a>

      <select name="" id="" class="form-select file-upload-select">
        <option value="">Instructions</option>
      </select>
      <span class="text-muted">{{ file.formatted_size }}</span>
      <template v-if="user && user.isAllowedTo('orders.order.delete_order_file')">
        <sh-confirm-action class="text-danger" @success="res=>{
          shRepo.showToast('File deleted')
          useAppStore().refresh(2000)
        }" :url="getActionUrl('deleteFile', file.id)">
          <i class="bi-trash"/>
        </sh-confirm-action>
      </template>
    </li>
  </ul>
  <p v-else class="text-muted">No files uploaded</p>
</template>

<style scoped>

</style>