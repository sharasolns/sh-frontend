<script setup>
import ShForm from '../../../components/ShForm.vue'
import ShModalForm from '../../../components/ShModalForm.vue'
import ShCardLayout from '../../../components/ShCardLayout.vue'
import {useUserStore} from '../../../repo/stores/ShUser.js'
import shRepo from '../../../repo/helpers/ShRepo.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const detailsUpdated= (res) => {
  shRepo.showToast('Your ' + res +' updated successfully', 'success')
}
const showProfilePicture = (photo) => {
  return import.meta.env.VITE_APP_HOME_URL + photo
}
const UserdetailsColumns = [
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'phone',
    label: 'Phone'
  }
]

</script>

<template>
  <sh-card-layout>
    <div class="container">
      <div class="row">
        <div class="col-md-6" v-if="user">
          <sh-card-layout>
            <h5 class="card-title">Details</h5>
            <table class="table">
              <tbody>
              <tr v-for="column in UserdetailsColumns" :key="column.name">
                <td>{{ column.label }}</td>
                <td>{{ user[column.name] }}</td>
              </tr>
              </tbody>
            </table>
            <div class="card-footer">
              <sh-modal-form
                  :current-data="user"
                  v-if="user"
                  modal-title="Edit Details"
                  class="btn btn-primary  my-2"
                  action="auth/user"
                  @success="detailsUpdated('details')"
                  :fields="['name','email','phone']"
              >
                <i class="bi-pen"></i> Edit Details</sh-modal-form>
              <sh-modal-form
                  v-if="user"
                  modal-title="Update Password"
                  class="btn btn-info ms-2  my-2"
                  action="auth/reset"
                  @success="detailsUpdated('password')"
                  :fields="[
                         {
                          field:'old_password',
                          type: 'password',
                          },
                          {
                          field:'new_password',
                          type: 'password',
                          },
                            {
                          field:'new_password_confirmation',
                          type: 'password',
                          }
                    ]"

              >
                  <i class="bi-key"></i> Change Password</sh-modal-form>
            </div>
          </sh-card-layout>
        </div>
        <div class="col-md-6">
          <sh-card-layout>
            <sh-modal-form
                modal-title="Edit Profile Image"
                class="btn btn-info btn-sm float-end my-2"
                :action="'auth/profile-picture'"
                @success="detailsUpdated('profile picture')"
                :files="[]"
                :fields="[{
                          field:'profile_picture',
                          type: 'file',
                          }]">
              <i class="bi-pen"></i>
            </sh-modal-form>
            <div>
                  <h5 class="card-title">Profile Picture</h5>
                  <img :src="showProfilePicture(user?.profile_picture)"
                       class="img-fluid" alt="profie-picture"
                       style="width: 100%;
                           height: 330px;" />
            </div>
          </sh-card-layout>
        </div>
      </div>
    </div>
  </sh-card-layout>
</template>
<style scoped>

</style>
