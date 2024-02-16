<script setup>
import {onMounted, ref} from 'vue'
import ShApis from '../../repo/helpers/ShApis.js'

const props = defineProps(['data','allowMultiple','url','modelValue'])
const emit = defineEmits(['update:modelValue'])
let id = ref(null)
let filterValue = ref(null)
let suggestions = ref(null)
let selectedSuggestions = ref([])
onMounted(() => {
  id.value = 'sid' + (Math.random() + 1).toString(36).substring(7)
  resetData()
  if(props.url){
    fetchRemoteData()
  } else {
    initializeExisting()
  }
})
function resetData(){
  const data = props.data
  if(data) {
    suggestions.value = data
  }
}
function addSuggestion(sgn){
  let selected = selectedSuggestions.value
  if(selected.length > 0 && !props.allowMultiple){
    selected = []
  }
  if(!selected.includes(sgn)){
    selected.push(sgn)
    selectedSuggestions.value = selected
  }
  updateModelValue()
  document.getElementById('input_' + id.value).innerHTML = ''
}
function updateModelValue(){
  let selectedItems = selectedSuggestions.value
  if(selectedItems.length === 0) {
    emit('update:modelValue', null)
  }  else if (!props.allowMultiple) {
    emit('update:modelValue', selectedItems[0].id)
  } else {
    const ids = selectedItems.map(item => {
      return item.id
    })
    emit('update:modelValue', ids)
  }
  hideDropDown()
}
function removeSuggestion(sgt){
  selectedSuggestions.value  = selectedSuggestions.value.filter(selectedSgt=>{
    if(selectedSgt.id !== sgt) {
      return selectedSgt
    }
  })
  updateModelValue()
}
let searchText = ref(null)
function filterData(e){
  showDropDown()
  let filterValue = e.target.innerText
  searchText.value = filterValue
  if (props.url) {
    fetchRemoteData()
  } else if(props.data) {
    suggestions.value = props.data.filter(item=>{
      if(item.name.toLowerCase().includes(filterValue.toLowerCase())){
        return item
      }
    })
  } else {
    console.log("Error: no data or url provided");
  }
}

const fetchRemoteData = ()=>{
  const data = {
    all: 1,
    filter_value: searchText.value,
  }
  ShApis.doGet(props.url, data).then(res => {
    suggestions.value = res.data.data ?? res.data
    initializeExisting()
  }).catch(res => {
    console.log(res)
  })
}

const showDropDown = ()=>{
  let dropdownElem = document.getElementById('dropwdown_section' + id.value)
  if(!dropdownElem.classList.contains('show')){
    dropdownElem.classList.add('show')
  }
}
const hideDropDown = ()=>{
  let dropdownElem = document.getElementById('dropwdown_section' + id.value)
  if(dropdownElem.classList.contains('show')){
    dropdownElem.classList.remove('show')
  }
}

const initializeExisting = ()=>{
  console.log(props)
  if(props.modelValue && suggestions.value){
    if(props.allowMultiple){
      let selected = []
      props.modelValue.forEach(id=>{
        let found = suggestions.value.find(sgt=>{
          return sgt.id === id
        })
        if(found){
          selected.push(found)
        }
      })
      selectedSuggestions.value = selected
    } else {
      let found = suggestions.value.find(sgt=>{
        return sgt.id === props.modelValue
      })
      if(found){
        selectedSuggestions.value = [found]
      }
    }
  }
}
</script>
<template>
  <div class="dropdown sh-suggest" v-if="id">
    <div :id="id" data-bs-toggle="dropdown" class="form-control p-0 d-flex sh-suggest-control dropdown-toggle" aria-expanded="false">
      <div>
        <h5 class="badge bg-secondary m-1 sh-selected-item" v-for="sgt in selectedSuggestions">
          {{ sgt.name }}
          <button @click="removeSuggestion(sgt.id)" type="button" class="btn-close border-start border-1 ms-1" aria-label="Close"></button>
        </h5>
      </div>
      <div :id="'input_' + id" contenteditable="true" @input="filterData" @change="filterData" class="flex-fill h-100 sh-suggestion-input"></div>
    </div>
    <ul class="dropdown-menu w-100" :id="'dropwdown_section' + id" :aria-labelledby="id">
      <template v-if="suggestions && suggestions.length > 0" v-for="suggestion in suggestions" :key="suggestion.id">
        <li v-if="suggestion.name">
          <span style="cursor: pointer;" @click="addSuggestion(suggestion)" class="dropdown-item" :class="selectedSuggestions.includes(suggestion) ? 'active':''" href="#">{{ suggestion.name ?? suggestion.text }}</span>
        </li>
      </template>
      <li v-else-if="searchText" class="dropdown-item sh-suggest-no-results">
        No results found
      </li>
      <li v-else class="dropdown-item sh-suggest-no-input">
        Type to search...
      </li>
    </ul>
  </div>
</template>
<style type="text/css" scoped>
.sh-selected-item{
  line-height: unset!important;
}
.sh-suggestion-input{
  padding: 0.375rem 0.75rem;
}
.sh-suggest{
  margin-bottom: 1rem;
}
.sh-suggest-control::after{
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0.255em;
}
</style>
