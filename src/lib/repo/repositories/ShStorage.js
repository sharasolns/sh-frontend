function setItem (key, value) {
  let toStore = value
  if (typeof value === 'object') {
    toStore = JSON.stringify(value)
  }
  return localStorage.setItem(key, toStore)
}

function getItem (key) {
  try {
   return  JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key)
  }
}
function removeItem (key) {
  return localStorage.removeItem(key)
}
export default {
  setItem,
  getItem,
  removeItem
}
