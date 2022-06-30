<template>
  <form ref="ShAutoForm">
<!--    <div v-if="form_status == 1" class="alert alert-info">Processing...</div>-->
<!--    <div v-if="form_status == 2" class="alert alert-success">Success</div>-->
    <div v-if="form_status == 3" class="alert alert-danger"><i class="fa fa-warning"></i> Error</div>
    <input type="hidden" v-model="form_elements['id']">
    <div class="row">
    <div class="form-group" v-for="field in fields" :class="'col-md-' + getColumns()" :key="field">
      <label class="fg-label control-label text-capitalize control-bel col-md-12 request-form-label mb-2">{{ getLabel(field) }}</label>
       <div class="col-md-12">
         <input :data-cy="field" :placeholder="allPlaceHolders[field] ? allPlaceHolders[field] : ''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" :ref="'file_'+field" v-on:change="handleFileUpload(field)" v-if="getFieldType(field) === 'file'" type="file" class="form-control">
         <input :data-cy="field" :placeholder="allPlaceHolders[field] ? allPlaceHolders[field] : ''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'numeric'" type="number" class="form-control">
         <input :data-cy="field" :placeholder="allPlaceHolders[field] ? allPlaceHolders[field] : ''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'password'" type="password" class="form-control">
         <input :data-cy="field" :placeholder="allPlaceHolders[field] ? allPlaceHolders[field] : ''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'email'" type="email" required class="form-control">
         <input :data-cy="field" type="datetime-local" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'datepicker' && isDisabled(field) === false" class="form-control active">
         <ShPhone :country_code="country_code" :placeholder="allPlaceHolders[field] ? allPlaceHolders[field] : ''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'phone'" required class="form-control"/>
         <input :disabled="isDisabled(field)" :placeholder="field === 'phone_number' ? 'e.g 0712 345 678':''" :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'text'" type="text" class="form-control">
         <textarea :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'textarea'" class="form-control"></textarea>
         <select :name="field" @focus="removeErrors(field)" :class="form_errors[field] == null ? ' field_' + field:'is-invalid ' + field" v-model="form_elements[field]" v-if="getFieldType(field) === 'select' && selectData[field] != null" class="form-control">
           <option v-for="item in selectData[field]" :key="item.id"  :value="item.id">{{item.name}}</option>
         </select>
         <div v-if="form_errors[field] != null " class="invalid-feedback">
           {{ form_errors[field][0]  }}
         </div>
       </div>
    </div>
    </div>
    <div class="row" v-if="hasTerms">
      <h5>Confirm and Submit</h5>
      <p>By clicking submit, you agree to our <a target="_blank" href="/">terms and conditions</a> and that you have read our <a target="_blank" href="https://hauzisha.co.ke/privacy-policy">privacy policy</a></p>
    </div>
    <button data-cy="sh_form_submit" class="mb-2 form-submit-btn" :class="form_status == 1 ? getSubmitBtnClass() + ' disabled': getSubmitBtnClass()"  type="button" @click="submitForm">
      {{ action_label ? action_label:'Submit'}}
      <img v-if="form_status == 1" style="height: 1rem" class="float-left" src="/assets/img/spinner.gif">
    </button>
  </form>
</template>
<script>
import apis from './../repo/helpers/apis'
import NProgress from 'nprogress'
import ShPhone from './ShPhone.vue'
export default {
  name: 'ShForm',
  inject: ['global'],
  components: {
    ShPhone
  },
  props: ['action', 'classes', 'hasTerms', 'country_code', 'submit_btn_class', 'fields', 'columns', 'placeholders', 'field_permissions', 'retain_data_after_submission', 'current_data', 'action_label', 'fill_selects', 'phones', 'success_callback', 'failed_callback', 'labels'],
  data: function () {
    return {
      form_elements: {},
      form_errors: {},
      form_status: 0,
      error_res: null,
      form_files: {},
      exiting_fields: [],
      selectData: {},
      users: [],
      allPlaceHolders: {},
      user: this.global.state.user,
      allLabels: {}
    }
  },
  computed: {
    currentData () {
      return this.current_data
    }
  },
  methods: {
    getSubmitBtnClass: function () {
      const btnClass = this.submit_btn_class
      if (!btnClass) {
        return 'btn btn-primary mt-2'
      } else {
        return btnClass
      }
    },
    getColumns: function () {
      let cols = parseFloat(this.columns)
      if (!cols) {
        cols = 1
      }
      const allowedColumns = [1, 2, 3, 4, 6, 12]
      if (!allowedColumns.includes(cols)) {
        return '12'
      } else {
        return 12 / parseFloat(cols)
      }
    },
    getFieldType: function (field) {
      const textareas = ['message', 'meta_description', 'comment', 'call_response', 'comments', 'description']
      const selects = ['gender', 'payment_method', 'allow_view_mode', 'reasons_name', 'has_free_tier', 'payment_period', 'role', 'register_as', 'account_type']
      const numbers = ['age']
      const datePickers = ['free_tier_days', 'recurring_date', 'date', 'paid_at']
      const editors = ['html_content', 'listing_description', 'mail']
      const mapLocations = ['building_location']
      const files = ['file', 'logo']
      const phones = ['phone']
      if (field.includes('_id') || this.selectData[field]) {
        return 'select'
      }
      if (field === 'email') {
        return 'email'
      }
      if (field.includes('password')) {
        return 'password'
      }
      if (field.includes('file')) {
        return 'file'
      }
      if (textareas.includes(field)) {
        return 'textarea'
      }
      if (phones.includes(field)) {
        return 'phone'
      }
      if (mapLocations.includes(field)) {
        return 'location'
      }
      if (editors.includes(field)) {
        return 'editor'
      }
      if (numbers.includes(field)) {
        // alert('found')
        return 'numeric'
      }
      if (datePickers.includes(field)) {
        return 'datepicker'
      }
      if (selects.includes(field)) {
        return 'select'
      }
      if (files.includes(field)) {
        return 'file'
      }
      return 'text'
    },
    getLabel: function (field) {
      if (field in this.allLabels) {
        return this.allLabels[field]
      } else {
        return field.replace(/_/g, ' ')
      }
    },
    isDisabled: function (field) {
      if (typeof this.field_permissions === 'undefined') {
        return false
      }
      if (typeof this.user.isAllowedTo !== 'undefined') {
        return !this.user.isAllowedTo(this.field_permissions[field])
      }
      return true
    },
    validateEssentials: function () {
      if (this.fields.includes('password_confirmation')) {
        if (!this.form_elements.password) {
          this.form_errors = {
            password: ['Password field is required']
          }
          return false
        } else
        if (this.form_elements.password !== this.form_elements.password_confirmation) {
          this.form_errors = {
            password: ['Password confirmation does not match']
          }
          return false
        }
      }
    },
    closeModal: function () {
      document.body.style = ''
      setTimeout(() => {
        const form = this.$refs.ShAutoForm
        if (form) {
          const modal = form.closest('.modal.show')
          if (modal) {
            modal.click()
          }
        } else {
          const backdrops = document.getElementsByClassName('modal-backdrop fade show')
          if (backdrops.length > 0) {
            backdrops[0].remove()
          }
        }
        this.form_status = 0
      }, 1500)
    },
    submitForm: async function () {
      // return false;
      // if (!this.validateEssentials()) {
      //   return false
      // }
      NProgress.start()
      this.form_status = 1
      const data = new FormData()
      console.log(this.form_elements)
      Object.keys(this.form_elements).forEach(key => {
        if (typeof this.form_elements[key] === 'object') {
          data.append(key, JSON.stringify(this.form_elements[key]))
        } else if (typeof this.form_elements[key] !== 'undefined') { data.append(key, this.form_elements[key]) }
      })
      Object.keys(this.form_files).forEach(key => {
        data.append(key, this.form_files[key].value)
      })
      apis.doPost(this.action, data).then(res => {
        // console.log(res)
        this.form_status = 2
        Object.keys(this.form_elements).forEach(key => {
          this.form_errors[key] = null
          if (!this.retain_data_after_submission) {
            this.form_elements[key] = ''
          }
        })
        Object.keys(this.form_files).forEach(key => {
          this.form_errors[key] = null
        })
        if (this.success_callback) {
          if (typeof this.success_callback === 'function') {
            this.success_callback(res.data)
          } else {
            this.$emit(this.success_callback, res.data)
          }
        }
        NProgress.done()
        if (!this.retain_modal_after_submission) {
          this.closeModal()
        }
      }).catch((reason, data) => {
        NProgress.done()
        this.form_status = 3
        if (typeof reason !== 'undefined') {
          if (typeof reason.response !== 'undefined') {
            this.setErrors(reason.response)
          } else {
            console.log('catch error')
            console.log(reason)
          }
        } else {
          console.log(reason)
        }
      })
      return false
    },
    removeErrors: function (field) {
      this.form_errors[field] = null
      this.form_status = 0
    },
    setErrors: function (reason) {
      console.log(reason)
      if (reason.status === 422) { // change this to 422 validation error response as received from laravel
        this.form_errors = reason.data.errors
      }
    },
    handleFileUpload: function (key) {
      this.form_files[key].value = event.target.files[0]
    },
    setCurrentData: function () {
      this.exiting_fields = []
      if (this.currentData) {
        this.exiting_fields = this.currentData
      }
      this.form_elements.id = this.exiting_fields.id
      this.fields.forEach(field => {
        if (this.getFieldType(field) === 'file') {
          this.form_files[field] = { key: 'file', value: null }
        } else {
          if (this.exiting_fields[field] !== null) {
            this.form_elements[field] = this.exiting_fields[field]
          } else {
            this.form_elements[field] = ''
          }
        }
        this.form_errors[field] = null
      })
    }
  },
  mounted: async function () {
    const selectData = {}
    if (this.fill_selects) {
      Object.keys(this.fill_selects).forEach(key => {
        if (this.fill_selects[key].data) {
          selectData[key] = this.fill_selects[key].data
          this.selectData = selectData
          console.log(this.selectData)
        } else {
          apis.doGet(this.fill_selects[key].url, { all: 1 }).then(res => {
            // selectData[key] = res.data
            // console.log(res)
            this.selectData[key] = res.data.data
          }).catch(res => {
            console.log(res)
          })
        }
      })
      console.log(selectData)
    }
  },
  created: function () {
    console.log('created')
    if (this.labels) {
      this.allLabels = this.labels
    }
    this.setCurrentData()
    if (this.placeholders) {
      this.allPlaceHolders = this.placeholders
    }
  },
  watch: {
    currentData: function () {
      this.setCurrentData()
    }
  }
}
</script>
