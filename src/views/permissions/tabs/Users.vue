<script setup>
import ShTable from '../../../lib/components/ShTable.vue'
import ShModalForm from '../../../lib/components/ShModalForm.vue'
import ShDropDownForm from '../../../lib/components/ShDropDownForm.vue'

const props = defineProps(['department'])
</script>
<template>
  <h6>Users in <span class="text-info">{{ department.name }}</span></h6>
  <sh-drop-down-form :fields="['name','email']" action="members/store" class="btn btn-info"><i class="bi-plus"></i> Add User</sh-drop-down-form>
  <sh-table
  :headers="['id','name']"
  end-point="members/list/any"
  />
</template>
