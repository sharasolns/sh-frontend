<script setup>
import moment from 'moment'
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
const showCustom = ref(false)

const dates = ref([
  {
    label: 'Today',
    value: [moment(), moment()]
  },
  {
    label: '7 Days',
    value: [moment().subtract(7, 'days'), moment()]
  },
  {
    label: 'This week',
    value: [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')]
  },
  {
    label: 'This Month',
    value: [moment().startOf('month'), moment()]
  },
  {
    label: 'Last Month',
    value: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  {
    label: '1 Month',
    value: [moment().subtract(29, 'days'), moment()]
  },
  {
    label: '1 Year',
    value: [moment().subtract(12, 'months'), moment()]
  },
  {
    label: 'All Time',
    value: [moment('@/2021').startOf('year'), moment()]
  }
])
const  setDate =  (date, label) => {
  selectedDate.value = date
  rangeLabel.value = '<strong>' + label + '</strong><small>(' + date[0].format('MMMM D, YYYY') + ' - ' + date[1].format('MMMM D, YYYY') + ')</small>'
  const from = date[0].format('L')
  const to = date[1].format('L')
  const period = label.toString().toLowerCase().replaceAll(' ','_')
  emit('rangeSelected', {
    from: from,
    to: to,
    period: period,
    query: `from=${from}&to=${to}&period=${period}`
  })
}
onMounted(() => {
  let end = parseInt(moment().format('Y'))
  while (end >= props.start) {
    dates.value.push({
      label: end,
      value: [moment('@/' + end).startOf('year'), moment('@/' + end).endOf('year')]
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
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li v-for="date in dates" :key="date.label" @click="setDate(date.value, date.label)">
          <a class="dropdown-item"
             :class="date.value === selectedDate ? 'active' : ''"
             href="#">{{
              date.label
            }}</a>
        </li>
<!--        <li>-->
<!--          <div class="dropdown-item">-->
<!--            <div @clik="showCustom = true">Custom</div>-->
<!--            <div v-if="showCustom">-->
<!--              <input type="date">-->
<!--              <input type="date">-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>
