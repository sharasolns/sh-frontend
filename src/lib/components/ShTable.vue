<script setup>
import { inject } from 'vue'
import NoRecords from './others/NoRecords.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from './../repo/stores/ShUser.js'
const noRecordsComponent = inject('noRecordsComponent', NoRecords)

const {user} = storeToRefs(useUserStore())
</script>
<template>
  <div class="auto-table mt-2">
    <div class="col-md-4 mb-2" v-if="hasDownload">
      <button :disabled="downloading" class="btn btn-warning btn-sm" @click="exportData()">
        <template v-if="!downloading">
          <i class="bi-download"></i> Export
        </template>
        <template v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
        </template>
      </button>
    </div>
    <div class="row" v-if="!hideSearch">
      <div class="col-12 mb-3 d-flex justify-content-start">
        <div v-if="hasRange" class="sh-range-selector">
          <sh-range @range-selected="rangeChanged"/>
        </div>
        <div class="sh-search-bar input-group" :class="hasRange ? 'ms-2':''">
          <input @keydown="userTyping" @keyup="userTyping" type="search" v-on:change="reloadData(1)"
                 v-model="filter_value"
                 :placeholder="searchPlaceholder ? searchPlaceholder : 'Search'"
                 class="form-control sh-search-input">
          <span class="input-group-text exact_checkbox" v-if="filter_value.length > 1">
                    <input @change="reloadData" :value="true" v-model="exactMatch" type="checkbox"/><span class="ms-1">Exact</span>
                  </span>
        </div>
      </div>
    </div>
    <template v-if="hasDefaultSlot">
      <div class="text-center" v-if="loading === 'loading'">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="loading === 'error'" class="alert alert-danger">
      <span>
        {{ loading_error }}
      </span>
      </div>
      <template v-if="loading === 'done'">
        <template v-for="record in records" :key="record.id">
          <slot :record="record"></slot>
        </template>
      </template>
    </template>
    <template v-else-if="hasRecordsSlot">
      <div class="text-center" v-if="loading === 'loading' && !cacheKey">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="loading === 'error' && !cacheKey" class="alert alert-danger error-loading">
      <span>
        {{ loading_error }}
      </span>
      </div>
      <template v-if="loading === 'done' || cacheKey">
        <component :is="noRecordsComponent" v-if="!records || records.length === 0">
          <i class="bi-info-circle"></i> {{ noRecordsMessage ?? 'No records found' }}
        </component>
        <slot name="records" :records="records"></slot>
      </template>
    </template>
    <table class="table sh-table" :class="tableHover ? 'table-hover':''" v-else-if="windowWidth > 700">
      <thead class="sh-thead">
      <tr>
        <th v-for="title in tableHeaders" :key="title">
          <a class="text-capitalize" v-on:click="changeKey('order_by',title)"
             v-if="typeof title === 'string'">{{ title.replace(/_/g, ' ') }}</a>
          <a class="text-capitalize" v-on:click="changeKey('order_by',title(null))"
             v-else-if="typeof title === 'function'">{{ title(null).replace(/_/g, ' ') }}</a>
          <a class="text-capitalize" v-else-if="typeof title !== 'undefined'"
             v-on:click="changeKey('order_by',title)">{{ title.replace(/_/g, ' ') }}</a>
        </th>
        <th v-if="actions" class="text-capitalize">
          {{ actions.label }}
        </th>
      </tr>
      </thead>
      <tbody class="sh-tbody">
      <tr class="text-center" v-if="loading === 'loading'">
        <td :colspan="tableHeaders.length">
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </td>
      </tr>
      <tr class="text-center alert alert-danger" v-else-if="loading === 'error'">
        <td :colspan="tableHeaders.length">
          {{ loading_error }}
        </td>
      </tr>
      <tr class="text-center alert alert-info no_records" v-else-if="records.length === 0">
        <td :colspan="actions ? tableHeaders.length + 1 : tableHeaders.length">
          <i class="bi-info-circle"></i> No records found
        </td>
      </tr>
      <tr v-else-if="loading === 'done'" v-for="(record, index) in records" :key="record.id" :class="record.class"
          @click="rowSelected(record)">
        <td v-for="key in tableHeaders" :key="key">
          <router-link v-if="typeof key === 'string' && links && links[key]"
                       :target="links[key].target ? '_blank':''" :to="replaceLinkUrl(links[key],record)"
                       :class="getLinkClass(links[key])" v-html="record[key]"></router-link>
          <span v-else-if="getFieldType(key) === 'numeric'">{{
              Intl.NumberFormat().format(record[key])
            }}</span>
          <span v-else-if="getFieldType(key) === 'money'"
                class="text-success fw-bold">{{ Intl.NumberFormat().format(record[key]) }}</span>
          <span v-else-if="getFieldType(key) === 'date'">{{ formatDate(record[key]) }}</span>
          <span v-else-if="typeof key === 'string'" v-html="record[key]"></span>
          <span v-else-if="typeof key === 'function'" v-html="key(record, index)"></span>
          <span v-else v-html="record[key[0]]"></span>
        </td>
        <td v-if="actions" style="white-space:nowrap;">
          <template v-for="act in actions.actions" :key="act.path">
            <template v-if="!act.permission || user.isAllowedTo(act.permission)">
              <template v-if="!act.validator || act.validator(record)">
                <sh-confirm-action
                    v-if="['confirmAction','confirmaction','confirm-action','confirm'].includes(act.type)"
                    @actionSuccessful="doEmitAction('actionSuccessful',record)"
                    @actionFailed="doEmitAction('actionFailed',record)"
                    @actionCanceled="doEmitAction('actionCanceled',record)"
                    :loading-message="act.label"
                    :class="act.class" :url="replaceActionUrl(act.url,record)">
                  <span v-if="act.icon" :class="act.icon"></span>
                  {{ act.label }}
                </sh-confirm-action>
                <sh-silent-action
                    v-else-if="['silentAction','silentaction','silent-action','silent'].includes(act.type)"
                    @actionSuccessful="doEmitAction('actionSuccessful',record)"
                    @actionFailed="doEmitAction('actionFailed',record)"
                    @actionCanceled="doEmitAction('actionCanceled',record)"
                    :loading-message="act.label"
                    :class="act.class" :url="replaceActionUrl(act.url,record)">
                  <span v-if="act.icon" :class="act.icon"></span>
                  {{ act.label }}
                </sh-silent-action>
                <a v-else-if="act.canvasId || act.type === 'offcanvas'" :href="'#' + act.canvasId"
                   data-bs-toggle="offcanvas" :class="act.class">
                  <span v-if="act.icon" :class="act.icon"></span>
                  {{ act.label }}
                </a>
                <button :title="act.title" :class="act.class ? act.class:'btn btn-default'"
                        v-else-if="act.emits"
                        @click="doEmitAction(act.emits,record)">
                  <span v-if="act.icon" :class="act.icon"></span>
                  {{ act.label }}
                </button>
                <router-link v-else-if="!act.emits" :title="act.title"
                             :to="replaceActionUrl(act.path,record)"
                             :class="act.class">
                  <span v-if="act.icon" :class="act.icon"></span>
                  {{ act.label }}
                </router-link>
              </template>
            </template>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="text-center" v-if="loading === 'loading'">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else-if="loading === 'error'">
      <span>
        {{ loading_error }}
      </span>
      </div>
      <div class="mobile-list-items" v-else-if="loading === 'done'">
        <template v-for="(record,index) in records" :key="record.id">
          <div class="single-mobile-req bg-light p-3" @click="rowSelected(record)">
            <template v-for="key in tableHeaders" :key="key[0]">
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title"
                 v-if="typeof key === 'string' ">
                {{ key.replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title"
                 v-else-if="typeof key === 'function'">
                {{ key(null).replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-else>{{
                  key[1].replace(/_/g, ' ')
                }}</p>
              <span>
                <router-link v-if="typeof key === 'string' && links && links[key]"
                             :to="replaceLinkUrl(links[key],record)" :class="getLinkClass(links[key])"
                             v-html="record[key]"></router-link>
                <span v-else-if="getFieldType(key) === 'numeric'">{{ Intl.NumberFormat().format(record[key]) }}</span>
                <span v-else-if="getFieldType(key) === 'money'"
                      class="text-primary fw-bold">KES {{ Intl.NumberFormat().format(record[key]) }}</span>
                <span v-else-if="getFieldType(key) === 'date'">{{ formatDate(record[key]) }}</span>
                <span v-else-if="typeof key    === 'string'" v-html="record[key]"></span>
                <span v-else-if="typeof key === 'function'" v-html="key(record, index )"></span>
                <span v-else v-html="record[key[0]]"></span>
              </span>
              <hr class="my-2">
            </template>
            <div v-if="actions">
              <template v-for="act in actions.actions" :key="act.path">
                <template v-if="!act.permission || user.isAllowedTo(act.permission)">
                  <template v-if="!act.validator || act.validator(record)">
                    <a v-if="act.canvasId" :href="'#' + act.canvasId" data-bs-toggle="offcanvas"
                       :class="act.class">
                      <span v-if="act.icon" :class="act.icon"></span>
                      {{ act.label }}
                    </a>
                    <button :title="act.title" :class="act.class ? act.class:'btn btn-default'"
                            v-else-if="act.emits"
                            @click="doEmitAction(act.emits,record)">
                      <span v-if="act.icon" :class="act.icon"></span>
                      {{ act.label }}
                    </button>
                    <router-link v-else-if="!act.emits" :title="act.title"
                                 :to="replaceActionUrl(act.path,record)"
                                 :class="act.class">
                      <span v-if="act.icon" :class="act.icon"></span>
                      {{ act.label }}
                    </router-link>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
    <pagination v-if="pagination_data" @loadMoreRecords="loadMoreRecords" :hide-load-more="hideLoadMore"
                :per-page="per_page"
                :hide-count="hideCount" :pagination_data="pagination_data" v-on:changeKey="changeKey"
                :pagination-style="pageStyle"></pagination>
    <template v-if="actions">
      <template v-for="action in actions.actions" :key="action.label">
        <sh-canvas @offcanvasClosed="canvasClosed" v-if="action.canvasId" :position="action.canvasPosition"
                   :canvas-size="action.canvasSize" :canvas-title="action.canvasTitle"
                   :canvas-id="action.canvasId">
          <component @recordUpdated="reloadData" v-if="selectedRecord" v-bind="cleanCanvasProps(action)"
                     :record="selectedRecord"
                     :is="action.canvasComponent"/>
        </sh-canvas>
      </template>
    </template>
  </div>
</template>
<script>
import apis from '../repo/helpers/ShApis.js'
import pagination from './list_templates/Pagination.vue'
import moment from 'moment'
import helpers from '../repo/helpers/ShRepo.js'
import shRepo from '../repo/helpers/ShRepo.js'
import ShCanvas from './ShCanvas.vue'
import ShConfirmAction from './ShConfirmAction.vue'
import ShSilentAction from './ShSilentAction.vue'
import ShRange from './ShRange.vue'
import shStorage from '../repo/repositories/ShStorage'

export default {
  name: 'sh-table',
  props: ['endPoint', 'headers', 'cacheKey', 'query', 'pageCount', 'actions', 'hideCount', 'hideLoadMore', 'links', 'reload', 'hideSearch', 'sharedData', 'searchPlaceholder', 'event', 'displayMore', 'displayMoreBtnClass', 'moreDetailsColumns', 'moreDetailsFields', 'hasDownload', 'downloadFields', 'tableHover', 'hideIds', 'paginationStyle', 'hasRange','noRecordsMessage'],
  data(){
    return {
      order_by: '',
      order_method: '',
      per_page: this.pageCount ?? shRepo.getShConfig('tablePerPage', 10),
      page: 1,
      exactMatch: false,
      filter_value: '',
      loading: 'loading',
      loading_error: '',
      records: null,
      total: 0,
      pagination_data: null,
      moreDetailsId: null,
      moreDetailsModel: null,
      downloading: false,
      appUrl: window.VITE_APP_API_URL,
      hasCanvas: 0,
      selectedRecord: null,
      timeOut: null,
      tableHeaders: [],
      pageStyle: this.paginationStyle ?? shRepo.getShConfig('tablePaginationStyle', 'loadMore'),
      range: null,
      from: null,
      to: null,
      period: null
    }
  },
  mounted(){
    if (this.headers) {
      this.tableHeaders = this.headers
    }

    if (this.actions && this.actions.actions) {
      this.actions.actions.forEach(action => {
        if (action.canvasComponent) {
          this.hasCanvas = true
        }
      })
    }
    if (this.cacheKey) {
      this.setCachedData()
    }
    this.reloadData()
  },
  methods: {
    rangeChanged: function (newRange){
      this.range = newRange
      this.from = newRange.from.format('L')
      this.to = newRange.to.format('L')
      this.period = newRange.period
      this.reloadData()
    },
    userTyping: function (){
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      const self = this
      this.timeOut = setTimeout(() => {
        self.reloadData(1)
      }, 800)
    },
    cleanCanvasProps: function (actions){
      let replaced = actions
      replaced.class = null
      return replaced
    },
    newRecordAdded: function (ev){
      const record = ev.log
      if (record.user) {
        record.user = record.user.name
      }
      this.records.unshift(record)
    },
    canvasClosed: function (){
      this.selectedRecord = null
    },
    rowSelected: function (row){
      this.selectedRecord = null
      const self = this
      setTimeout(() => {
        this.selectedRecord = row
        this.$emit('rowSelected', row)
      }, 100)
    },
    changeKey: function (key, value){
      this[key] = value
      if (key === 'order_by') {
        this.order_method = (this.order_method === 'desc') ? 'asc' : 'desc'
      }
      if (key === 'per_page') {
        this.page = 1
      }
      this.reloadData()
    },
    getLinkClass: function (config){
      if (typeof config === 'object') {
        return config.class
      }
      return ''
    },
    reloadNotifications: function (){
      this.reloadData()
    },
    replaceActionUrl: function (path, obj){
      if (path) {
        var matches = path.match(/\{(.*?)\}/g)
        try {
          matches.forEach(key => {
            key = key.replace('{', '')
            key = key.replace('}', '')
            path = path.replace(`{${key}}`, obj[key])
          })
          return path
        } catch (e) {
          return path
        }
      }
      return ''
    },
    doEmitAction: function (action, data){
      if (typeof action === 'function') {
        action(data)
      } else {
        this.$emit(action, data)
      }
    },
    getFieldType: function (field){
      const numbers = ['age', 'interest_rate_pa']
      const moneys = ['amount', 'paid_amount', 'total_paid', 'total', 'monthly_fee', 'share_cost', 'min_contribution', 'min_membership_contribution']
      const dates = ['invoice_date', 'free_tier_days', 'updated_at', 'created_at', 'end_time']
      if (numbers.includes(field)) {
        return 'numeric'
      }
      if (moneys.includes(field)) {
        return 'money'
      }
      if (dates.includes(field)) {
        return 'date'
      }
      return 'string'
    },
    replaceLinkUrl: function (path, obj){
      if (typeof path === 'object') {
        path = path.link ?? path.url
      }
      var matches = path.match(/\{(.*?)\}/g)
      matches && matches.forEach(key => {
        key = key.replace('{', '')
        key = key.replace('}', '')
        path = path.replace(`{${key}}`, obj[key])
      })
      return path
    },
    formatDate: function (date){
      return moment(date).format('lll')
    },
    setMoreDetailsModel: function (row){
      this.moreDetailsModel = null
      this.moreDetailsModel = row
    },
    loadMoreRecords: function (){
      this.reloadData(this.page + 1, 1)
    },
    exportData: function (template){
      this.downloading = true
      const headers = []
      const fields = this.downloadFields ? this.downloadFields : this.headers
      fields.forEach(header => {
        if (typeof header === 'string') {
          headers.push(header)
        }
      })
      const data = {
        titles: headers,
        export: 1
      }
      apis.doPost(this.endPoint, data).then(res => {
        this.downloading = false
        if (res.data.file) {
          const url = this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name;
          window.location.href = url
          // window.open('https://facebook.com')
          // window.open(this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name, '_blank').focus()
        }
      }).catch(reason => {
        this.downloading = false
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText}`
        helpers.swalError('Error', error)
      })
    },
    setCachedData: function (){
      if (this.cacheKey) {
        this.records = shStorage.getItem('sh_table_cache_' + this.cacheKey, null)
      }
    },
    reloadData: function (page, append){
      if (typeof page !== 'undefined') {
        this.page = page
      }
      if (this.cacheKey && this.records !== null) {
        this.loading = 'done'
      } else if (!append) {
        this.loading = 'loading'
      }
      const data = {
        order_by: this.order_by,
        order_method: this.order_method,
        per_page: this.per_page,
        page: this.page,
        filter_value: this.filter_value,
        paginated: true,
        from: this.from,
        to: this.to,
        period: this.period,
        exact: this.exactMatch
      }
      if (this.pagination_data) {
        this.pagination_data.loading = 1
      }
      let endPoint = this.endPoint
      if (!this.endPoint && this.query) {
        //send ql query
        endPoint = 'sh-ql'
        data.query = this.query
      }
      apis.doGet(endPoint, data).then(req => {
        this.loading = 'done'
        const response = req.data.data
        this.$emit('dataLoaded', response)
        if (this.page < 2 && this.cacheKey) {
          shStorage.setItem('sh_table_cache_' + this.cacheKey, response.data)
        }
        this.pagination_data = {
          current: response.current_page,
          start: response.from,
          end: response.last_page,
          record_count: response.total,
          per_page: response.per_page,
          loading: 0,
          displayCount: response.total > response.per_page ? response.per_page : response.total
        }
        if (!this.headers && response.total > 0) {
          this.tableHeaders = Object.keys(response.data[0])
        }
        if (append) {
          this.records.push(...response.data)
          let totalShown = response.total > response.per_page ? response.per_page * response.current_page : response.total
          if (totalShown > response.total) {
            totalShown = response.total
          }
          this.pagination_data.displayCount = totalShown
          const scrollingElement = (document.scrollingElement || document.body)
          scrollingElement.scrollTop = scrollingElement.scrollHeight
        } else {
          this.records = response.data
        }
      }).catch(reason => {
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText} (${this.endPoint})`
        this.loading_error = error
        this.loading = 'error'
      })
    }
  },
  watch: {
    hideIds: {
      handler(newValue){
        this.records = this.records.filter(record => !newValue.includes(record.id) && record)
      },
      deep: true
    },
    reload(){
      this.reloadData()
    },
    endPoint(){
      this.reloadData()
    }
  },
  components: {
    ShRange,
    ShSilentAction,
    ShConfirmAction,
    ShCanvas,
    pagination
  },
  computed: {
    windowWidth: function (){
      return window.innerWidth
    },
    user(){
      return null
    },
    hasDefaultSlot(){
      return !!this.$slots.default
    },
    hasRecordsSlot(){
      return !!this.$slots.records
    }
  }
}
</script>
<style>
.colored-toast.swal2-icon-success {
  background-color: #a5dc86 !important;
}

.colored-toast.swal2-icon-error {
  background-color: #f27474 !important;
}

.colored-toast.swal2-icon-warning {
  background-color: #f8bb86 !important;
}

.colored-toast.swal2-icon-info {
  background-color: #3fc3ee !important;
}

.colored-toast.swal2-icon-question {
  background-color: #87adbd !important;
}

.colored-toast .swal2-title {
  color: white;
}

.colored-toast .swal2-close {
  color: white;
}

.colored-toast .swal2-html-container {
  color: white;
}
</style>
