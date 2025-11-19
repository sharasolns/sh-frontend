<script setup>
import { DateTime } from 'luxon'
import shRepo from '../repo/helpers/ShRepo.js'
import { onMounted, ref } from 'vue'


const props = defineProps({
  start: {
    type: Number,
    default: 2021
  },
  selected: {
    type: String,
    default: shRepo.getShConfig('defaultRange', 'This Month')
  }
})

const emit = defineEmits(['rangeSelected'])

const selectedDate = ref(null)
const rangeLabel = ref(null)
const customFrom = ref(null)
const customTo = ref(null)

const applyCustom = () => {
  const date = [
    customFrom.value ? DateTime.fromISO(customFrom.value) : DateTime.now(),
    customTo.value ? DateTime.fromISO(customTo.value) : DateTime.now()
  ]
  setDate(date, 'Custom')
}

const dates = ref([
  {
    label: 'Today',
    value: [DateTime.now().startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'Yesterday',
    value: [
      DateTime.now().minus({ days: 1 }).startOf('day'),
      DateTime.now().minus({ days: 1 }).endOf('day')
    ]
  },
  {
    label: '7 Days',
    value: [DateTime.now().minus({ days: 7 }).startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'This week',
    value: [
      DateTime.now().startOf('week'),
      DateTime.now().endOf('week')
    ]
  },
  {
    label: 'This Month',
    value: [DateTime.now().startOf('month'), DateTime.now().endOf('day')]
  },
  {
    label: 'Last Month',
    value: [
      DateTime.now().minus({ months: 1 }).startOf('month'),
      DateTime.now().minus({ months: 1 }).endOf('month')
    ]
  },
  {
    label: 'Last 30 days',
    value: [DateTime.now().minus({ days: 30 }).startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'Last 60 days',
    value: [DateTime.now().minus({ days: 60 }).startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'Last 90 days',
    value: [DateTime.now().minus({ days: 90 }).startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'This Year',
    value: [DateTime.now().startOf('year'), DateTime.now().endOf('day')]
  },
  {
    label: '1 Year',
    value: [DateTime.now().minus({ months: 12 }).startOf('day'), DateTime.now().endOf('day')]
  },
  {
    label: 'All Time',
    value: [DateTime.fromObject({ year: 2018 }).startOf('year'), DateTime.now().endOf('day')]
  }
])
const  setDate =  (date, label) => {
  selectedDate.value = date
  rangeLabel.value = '<strong>' + label + '</strong><small>(' + date[0].toFormat('MMMM d, yyyy') + ' - ' + date[1].toFormat('MMMM d, yyyy') + ')</small>'
  const from = date[0]
  const to = date[1]
  const period = label.toString().toLowerCase().replaceAll(' ','_')
  emit('rangeSelected', {
    from: from,
    to: to,
    period: period,
    query: `from=${from.toFormat('MM/dd/yyyy')}&to=${to.toFormat('MM/dd/yyyy')}&period=${period}`
  })
}
onMounted(() => {
  let end = parseInt(DateTime.now().toFormat('yyyy'))
  while (end >= props.start) {
    dates.value.push({
      label: end,
      value: [
        DateTime.fromObject({ year: end }).startOf('year'),
        DateTime.fromObject({ year: end }).endOf('year')
      ]
    })
    end--
  }

  dates.value.map(date=>{
    (`${date.label}`.toLowerCase() === props.selected.toLowerCase()) && setDate(date.value, date.label)
  })
})
</script>
<template>
  <div class="sh-range">
    <div class="dropdown">
      <div class="form-control dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
           aria-expanded="false">
        <i class="bi-calendar text-dark"></i> <span v-html="rangeLabel"></span>
      </div>
      <div class="dropdown-menu sh-range-dropdown" aria-labelledby="dropdownMenuLink">
          <ul class="sh-range-preset">
              <li v-for="date in dates" :key="date.label" @click="setDate(date.value, date.label)">
                  <a class="dropdown-item"
                     :class="date.value === selectedDate ? 'active' : ''"
                     href="#">{{
                      date.label
                      }}</a>
              </li>
          </ul>
          <ul>
              <li class="border-top">
                  <div class="dropdown-item d-flex flex-column">
                      <span>Custom</span>
                      <div>
                          <input v-model="customFrom" type="date">
                          <input v-model="customTo" type="date">
                      </div>
                      <button v-if="customFrom && customTo" class="btn btn-sm btn-info mt-1" @click="applyCustom">Apply</button>
                  </div>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
