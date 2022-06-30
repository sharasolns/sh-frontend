<template>
<div class="auto-table mt-2">
  <div class="col-md-4 mb-2" v-if="hasDownload">
    <button :disabled="downloading" class="btn btn-warning btn-sm" @click="exportData()">
      <template v-if="!downloading">
        <i class="bi-download"></i> Export
      </template>
      <template v-else>
        <img v-if="downloading" style="height: 1rem" class="float-start" src="/assets/img/spinner.gif">
        Exporting ...
      </template>
    </button>
  </div>
  <div class="row" v-if="!hideSearch">
    <div class="col-12 mb-3">
      <div class="sh-search-bar">
        <input type="text" v-on:change="reloadData(1)" v-model="filter_value" :placeholder="searchPlaceholder ? searchPlaceholder : 'Search'" class="form-control sh-search-input">
        <span class="sh-search-icon">
          <i class="bi bi-search mb-0"></i>
        </span>
      </div>
    </div>
  </div>
    <table class="table" v-if="windowWidth > 700">
      <thead>
      <tr>
        <th v-for="title in headers" :key="title[0]">
          <a class="text-capitalize"  v-on:click="changeKey('order_by',title)" v-if="typeof title === 'string'">{{ title.replace(/_/g, ' ') }}</a>
          <a class="text-capitalize"  v-on:click="changeKey('order_by',title)" v-else-if="typeof title === 'function'">{{  title(null).replace(/_/g, ' ') }}</a>
          <a class="text-capitalize" v-else v-on:click="changeKey('order_by',title[0])" >{{ title[1].replace(/_/g, ' ') }}</a>
        </th>
        <th v-if="actions" class="text-capitalize">
          {{ actions.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-center" v-if="loading === 'loading'">
        <td :colspan="headers.length">
          <img src="/assets/img/loading.gif">
        </td>
      </tr>
      <tr class="text-center alert alert-danger" v-else-if="loading === 'error'">
        <td :colspan="headers.length">
          {{ loading_error }}
        </td>
      </tr>
      <tr class="text-center alert alert-info no_records" v-else-if="records.length === 0">
        <td :colspan="actions ? headers.length + 1 : headers.length">
          <i class="bi-info-circle"></i> No records found
        </td>
      </tr>
      <tr v-else-if="loading === 'done'" v-for="(record, index) in records" :key="record.id" :class="record.class" @click="rowSelected(record)">
        <td v-for="key in headers" :key="key[0]">
          <router-link v-if="typeof key === 'string' && links && links[key]" :to="replaceLinkUrl(links[key],record)" :class="getLinkClass(links[key])" v-html="record[key]"></router-link>
          <span v-else-if="getFieldType(key) === 'numeric'">{{ Intl.NumberFormat().format(record[key]) }}</span>
          <span  v-else-if="getFieldType(key) === 'money'" class="text-success fw-bold">{{ Intl.NumberFormat().format(record[key]) }}</span>
          <span v-else-if="getFieldType(key) === 'date'">{{  formatDate(record[key]) }}</span>
          <span v-else-if="typeof key === 'string'" v-html="record[key]"></span>
          <span v-else-if="typeof key === 'function'" v-html="key(record, index)"></span>
          <span v-else v-html="record[key[0]]"></span>
        </td>
        <td v-if="actions" style="white-space:nowrap;">
          <template v-for="act in actions.actions" :key="act.path">
            <template v-if="!act.permission || user.isAllowedTo(act.permission)">
              <template v-if="!act.validator || act.validator(record)">
                <button :title="act.title"  :class="act.class ? act.class:'btn btn-default'" v-if="act.emits" @click="doEmitAction(act.emits,record)">
                  {{ act.label }}
                </button>
                <router-link v-if="!act.emits" :title="act.title"  :to="replaceActionUrl(act.path,record)" :class="act.class">
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
      <span :colspan="2">
        <img src="/assets/img/loading.gif">
      </span>
      </div>
      <div v-else-if="loading === 'error'">
      <span :colspan="2">
        {{ loading_error }}
      </span>
      </div>
      <div class="mobile-list-items" v-else-if="loading === 'done'">
        <template v-for="(record,index) in records" :key="record.id">
          <h3>{{ mobile_view }}</h3>
          <div class="single-mobile-req bg-light p-3" @click="rowSelected(record)">
            <template v-for="key in headers" :key="key[0]">
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-if="typeof key === 'string' ">{{ key.replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-else-if="typeof key === 'function'">{{ key(null).replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-else>{{ key[1].replace(/_/g, ' ') }}</p>
              <span>
                <router-link v-if="typeof key === 'string' && links && links[key]" :to="replaceLinkUrl(links[key],record)" :class="getLinkClass(links[key])" v-html="record[key]"></router-link>
                <span v-else-if="getFieldType(key) === 'numeric'">{{ Intl.NumberFormat().format(record[key]) }}</span>
                <span v-else-if="getFieldType(key) === 'money'" class="text-primary fw-bold">KES {{ Intl.NumberFormat().format(record[key]) }}</span>
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
                    <button :title="act.title"  :class="act.class ? act.class:'btn btn-default'" v-if="act.emits" @click="doEmitAction(act.emits,record)">
                      {{ act.label }}
                    </button>
                    <router-link v-if="!act.emits" :title="act.title"  :to="replaceActionUrl(act.path,record)" :class="act.class">
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
<pagination v-if="pagination_data" @loadMoreRecords="loadMoreRecords" :hide-load-more="hideLoadMore" :hide-count="hideCount" :pagination_data="pagination_data" v-on:changeKey="changeKey" load-more="1"></pagination>
</div>
</template>
<script>
import apis from './../repo/helpers/apis'
import pagination from './list_templates/Pagination.vue'
import moment from 'moment'
import helpers from './../repo/helpers/helpers.js'
export default {
  name: 'sh-table',
  props: ['end_point', 'headers', 'pageCount', 'actions', 'hideCount', 'hideLoadMore', 'links', 'reload', 'mobile_view', 'hideSearch', 'custom_template', 'sharedData', 'searchPlaceholder', 'event', 'displayMore', 'displayMoreBtnClass', 'moreDetailsColumns', 'moreDetailsFields', 'hasDownload', 'downloadFields'],
  inject: ['channel', 'global'],
  data () {
    return {
      order_by: '',
      order_method: '',
      per_page: this.pageCount ? this.pageCount : 30,
      page: 1,
      filter_value: '',
      loading: 'loading',
      loading_error: '',
      records: [],
      total: 0,
      pagination_data: null,
      moreDetailsId: null,
      moreDetailsModel: null,
      downloading: false,
      appUrl: window.VITE_APP_API_URL
    }
  },
  mounted () {
    if (this.event) {
      // this.channel.listen(this.event, this.newRecordAdded)
    }
  },
  methods: {
    newRecordAdded: function (ev) {
      const record = ev.log
      if (record.user) {
        record.user = record.user.name
      }
      this.records.unshift(record)
      console.log(event, record)
    },
    rowSelected: function (row) {
      this.$emit('rowSelected', row)
    },
    changeKey: function (key, value) {
      this[key] = value
      if (key === 'order_by') {
        this.order_method = (this.order_method === 'desc') ? 'asc' : 'desc'
      }
      if (key === 'per_page') {
        this.page = 1
      }
      this.reloadData()
    },
    getLinkClass: function (config) {
      console.log(config)
      if (typeof config === 'object') {
        return config.class
      }
      return ''
    },
    reloadNotifications: function () {
      this.reloadData()
    },
    replaceActionUrl: function (path, obj) {
      if (path) {
        var matches = path.match(/\{(.*?)\}/g)
        matches.forEach(key => {
          key = key.replace('{', '')
          key = key.replace('}', '')
          path = path.replace(`{${key}}`, obj[key])
        })
        return path
      }
      return ''
    },
    doEmitAction: function (action, data) {
      if (typeof action === 'function') {
        action(data)
      } else {
        this.$emit(action, data)
      }
    },
    getFieldType: function (field) {
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
    replaceLinkUrl: function (path, obj) {
      if (typeof path === 'object') {
        path = path.link
      }
      var matches = path.match(/\{(.*?)\}/g)
      matches.forEach(key => {
        key = key.replace('{', '')
        key = key.replace('}', '')
        path = path.replace(`{${key}}`, obj[key])
      })
      return path
    },
    formatDate: function (date) {
      return moment(date).format('lll')
    },
    setMoreDetailsModel: function (row) {
      this.moreDetailsModel = null
      this.moreDetailsModel = row
    },
    loadMoreRecords: function () {
      this.reloadData(this.page + 1, 1)
    },
    exportData: function (template) {
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
      apis.doPost(this.end_point, data).then(res => {
        this.downloading = false
        if (res.data.file) {
          const url = this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name;
          window.location.href = url
          // window.open('https://facebook.com')
          // window.open(this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name, '_blank').focus()
        }
      }).catch(reason => {
        console.log(reason)
        this.downloading = false
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText}`
        helpers.swalError('Error', error)
      })
    },
    reloadData: function (page, append) {
      if (typeof page !== 'undefined') { this.page = page }
      if (!append) {
        this.loading = 'loading'
      }
      const data = {
        order_by: this.order_by,
        order_method: this.order_method,
        per_page: this.per_page,
        page: this.page,
        filter_value: this.filter_value
      }
      if (this.pagination_data) {
        this.pagination_data.loading = 1
      }
      apis.doGet(this.end_point, data).then(req => {
        this.loading = 'done'
        const response = req.data.data
        this.pagination_data = {
          current: response.current_page,
          start: response.from,
          end: response.last_page,
          record_count: response.total,
          per_page: response.per_page,
          loading: 0,
          displayCount: response.total > response.per_page ? response.per_page : response.total
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
          // const all = []
          // console.log(all.push(response.data))
          // console.log(this.records, response.data)
        } else {
          this.records = response.data
        }
      }).catch(reason => {
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText} (${this.end_point})`
        this.loading_error = error
        this.loading = 'error'
      })
    }
  },
  watch: {
    reload () {
      this.reloadData()
    }
  },
  created () {
    this.reloadData()
  },
  components: {
    pagination
  },
  computed: {
    windowWidth: function () {
      return window.innerWidth
    },
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    user () {
      return this.global.state.user
    }
  }
}
</script>
<style scoped>
.single-mobile-req{
  border: 1px solid #eeeeee;
  border-radius: 0.25rem;
  margin: 0.125rem 0;
  box-shadow: 0 2px 8px #00000011;
  background-color: white !important;
  margin-bottom: 1.5rem;
}
.hauzisha-search-bar{
  max-width: 25rem;
}
.submitted_count{
  position: relative;
  font-size: 1rem !important;
  text-decoration: none;
  background-color: #1e8449;
  padding: 0.5rem 0.75rem;
  font-weight: bold;
  line-height: 1rem;
  display: inline-block;
  color: white;
  text-align: center !important;
  margin: 0.125rem;
  border-radius: 0.25rem;
}
/*.submitted_count:before{*/
/*  content: "";*/
/*  position: absolute;*/
/*  inset: -8px;*/
/*  background-color: #1e8449;*/
/*  z-index: -1;*/
/*  border-radius: 50%;*/
/*}*/
table.table{
  color: unset !important;
  border-radius: 0.25rem !important;
  text-decoration: none !important;
  transition: 0.5s all ease;
  box-shadow: 0 3px 5px #0002;
  width: 100%;
  font-size: 0.9rem !important;
}
thead,tbody{
  border-radius: inherit;
}
thead th{
  background-color: var(--s-primary);
}
thead th:first-child{
  background-color: var(--s-primary);
  border-radius: 0.25rem 0 0 0 !important;
}
thead th:last-child{
  background-color: var(--s-primary);
  border-radius: 0 0.25rem 0 0 !important;
}
thead *{
  color: white !important;
  text-decoration: none !important;
  font-weight: 400;
}
tr,td,th{
  border-bottom: none !important;
}
td:first-child,th:first-child{
  border-left: 1px solid #00000006 !important;
}
tr:nth-child(even){
  background-color: #2540a211;
}
tr:last-child{
  border-bottom: none !important;
}
td:nth-child(even){
  border-left: 1px solid #2540a244;
  border-right: 1px solid #2540a244;
}
td:not(:last-child),th:not(:last-child),td:not(:first-child),th:not(:first-child){
  max-width: 25rem !important;
}
th:nth-child(even){
  border-left: 1px solid #fff4;
  border-right: 1px solid #fff4;
}
th:last-child,td:last-child{
  border-right: 1px solid #00000006 !important;
}
.has-response {
  background-color: rgb(252 243 207);
  /*color: green;*/
}
 .action_icon{
   background-position: center;
   background-size: cover;
   height: 30px;
   width: 30px;
 }
.action_icon:hover {
  border: 1px solid blue;
}
.sh-search-bar{
  position: relative;
  height: 3rem;
  padding: 0;
  display: flex;
  align-items: center;
}
.sh-search-bar .sh-search-input{
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  box-shadow: none;
  outline: none;
  border: 1px solid #ced0d4;
  border-radius: 1.5rem;
  max-width: 25rem;
  margin-bottom: 0;
}
.sh-search-bar .sh-search-icon{
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: grey;
  font-size: 1rem;
  pointer-events: none;
  padding: 0;
}
.sh-search-bar .sh-search-icon i{
  padding: 0;
  margin-bottom: 0;
}
.sh-search-bar .sh-search-input:focus{
  border: 1px solid #076dfb;
}
.sh-search-bar .sh-search-input:focus + .sh-search-icon{
  color: #076dfb;
}
.sh-search-bar .sh-search-input::placeholder{
  font-size: 1.1rem;
  font-weight: 300;
  opacity: 0.8;
  text-transform: capitalize;
}
</style>
