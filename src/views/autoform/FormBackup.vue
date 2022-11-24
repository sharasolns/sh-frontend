
const f = ref(null)
const l = ref(null)
const h = ref(null)
onMounted(() => {
f.value = props.fields
l.value = props.labels
h.value = props.helperTexts

data && data.map(obj => {
obj.field && f.value.push(obj.field)
obj.field && f.value.push(obj.field)
obj.field && f.value.push(obj.field)
})
})