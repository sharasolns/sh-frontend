<script setup>
//
import ShDropDownForm from '../lib/components/ShDropDownForm.vue'
import ShModalForm from '../lib/components/ShModalForm.vue'
import ShSilentAction from '../lib/components/ShSilentAction.vue'
import shRepo from '../lib/repo/helpers/ShRepo.js'
import ShConfirmAction from '../lib/components/ShConfirmAction.vue'
import ShTable from '../lib/components/ShTable.vue'
import Permissions from '../views/permissions/Permissions.vue'
import Terms from '../views/Terms.vue'

const title = 'Sh Dropdown Form'
const actionFailed = () => {
  shRepo.showToast('Action failed', 'error')
}

function actionCanceled () {
  shRepo.showToast('Action canceled', 'info')
}

function actionSuccess (res) {
  // console.log(res)
  shRepo.showToast('Verification email sent successfully, please check your email, ps: check also spam', 'success', 'top-left')
}
</script>
<template>
  <h5>Summary</h5>
  <div class="row">
    <div class="col-md-12">
      <div class="vstack">
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <div class="d-flex">
                <h6>{{ title }}</h6>
                <sh-drop-down-form custom-component="{}" :fields="['title','terms']" class="float-end" action="tasks/edit-title"
                                   :current-data="{title: title}"><i class="bi-pen"></i></sh-drop-down-form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title">Sh Modal Form</h6>
              <sh-modal-form :custom-component="{
                terms: Terms
              }" :fields="['name','email','terms']" submit-btn-class="btn btn-danger" action-label="Verify"
                             action="auth/register" class="btn btn-info">Add User
              </sh-modal-form>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title">Verify your email</h6>
              <p>Please check your email then click verify</p>
              <small>Did not recieve an email?
                <sh-silent-action @actionSuccessful="actionSuccess" @actionFailed="actionFailed" method="GET"
                                  url="auth/user">Resend verification code
                </sh-silent-action>
              </small>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title">Terminate Account</h6>
              <sh-confirm-action class="btn btn-danger badge" @actionCanceled="actionCanceled"
                                 @actionFailed="actionFailed" loading-message="Ok" url="user/account/deactivate">Ok
              </sh-confirm-action>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title">Departments</h6>
              <sh-table
                  :headers="['name','description']"
                  end-point="admin/departments/list"
                  :actions="{
                label: '',
                actions: [
                {
                  label: 'View',
                  canvasPosition: 'start',
                  canvasTitle: 'View Department',
                  canvasId: 'randomId',
                  canvasSize: 'lg',
                  canvasComponent: Permissions,
                  class: 'btn btn-info btn-sm',
                  icon: 'bi-plus',
                }
                ]
              }"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title"></h6>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title"></h6>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title"></h6>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title"></h6>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card m-1 shadow">
            <div class="card-body">
              <h6 class="card-title"></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
