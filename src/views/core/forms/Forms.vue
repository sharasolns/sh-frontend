<script setup>

import { ShAutoForm } from '@'

const fields = [
  {
    name: 'name',
    type: 'suggest',
    allowUserInput: true,
    url: 'tasks/list'
    // data: [
    //   {id: 1, name: 'John Doe'},
    //   {id: 2, name: 'Jane Doe'},
    //   {id: 3, name: 'John Smith'},
    //   {id: 4, name: 'Jane Smith'},
    //   {id: 5, name: 'John Johnson'},
    //   {id: 6, name: 'Jane Johnson'},
    //   {id: 7, name: 'John Brown'},
    //   {id: 8, name: 'Jane Brown'},
    //   {id: 9, name: 'John White'},
    //   {id: 10, name: 'Jane White'},
    // ]
  },
  {
    field: 'user_id',
    type: 'hidden'
  }
]

const recaptcha = data=>{
  console.log(data)
  console.log('Recaptcha')
  return true
}
</script>

<template>
<div class="row">
  <div class="col-md-4 pe-1">
    <div class="card">
      <div class="card-body">
        <h5>Sh Suggest Test</h5>
        <sh-auto-form :pre-submit-callback="recaptcha" :fields="fields" />
      </div>
    </div>
  </div>
</div>
</template>