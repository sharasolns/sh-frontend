<script setup>
import ShSilentAction from '../lib/components/ShSilentAction.vue'
import shRepo from '../lib/repo/helpers/ShRepo.js'
import ShConfirmAction from '../lib/components/ShConfirmAction.vue'
function actionSuccessful(){
  shRepo.showToast('Action successful','success')
}
function actionFailed(){
  shRepo.showToast('Action failed','error')
}

function actionCanceled(){
  shRepo.showToast('Action canceled','info')
}
</script>
<template>
  <h4>Actions</h4>

  <div class="row">
    <div class="hstack">
      <div class="col-md-4">
        <div class="card shadow m-1">
          <div class="card-body">
            <h5 class="card-title">sh-silent-action</h5>
            <p>
              This makes a http request in the background and emits <strong class="badge bg-info">actionSuccessful</strong>, <strong class="badge bg-info">actionFailed</strong> events.<br/>
              Check example below.
            </p>
            <sh-silent-action @actionSuccessful="actionSuccessful" @actionFailed="actionFailed" url="auth/user" method="GET" class="btn btn-info btn-sm">Dispatch <i class="bi bi-arrow-right"/></sh-silent-action>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow m-1">
          <div class="card-body">
            <h5 class="card-title">sh-confirm-action</h5>
            <p>
              This makes a http request but requests user confirmation using swal and emits  <strong class="badge bg-info">actionSuccessful</strong>, <strong class="badge bg-info">actionFailed</strong> or <strong class="badge bg-info">actionCanceled</strong>.<br/>
              Check example below.
            </p>
            <sh-confirm-action @actionCanceled="actionCanceled" @actionSuccessful="actionSuccessful" @actionFailed="actionFailed" url="auth/user" method="GET" class="btn btn-danger btn-sm"><i class="bi bi-trash"/> Delete</sh-confirm-action>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
<style scoped>

</style>
