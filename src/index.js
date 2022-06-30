import ShForm from './views/ShForm.vue'
import ShCanvas from './views/ShCanvas.vue'
import ShModal from './views/ShModal.vue'
import ShPhone from './views/ShPhone.vue'
import ShTable from './views/ShTable.vue'
import ShTabs from './views/ShTabs.vue'
import { useUserStore } from './repo/stores/ShUser.js'
import shApis from './repo/helpers/ShApis.js'
import shRepo from './repo/helpers/ShRepo.js'
import shStorage from './repo/repositories/ShStorage.js'

export {
  ShForm,
  ShCanvas,
  ShModal,
  ShPhone,
  ShTable,
  ShTabs,
  useUserStore,
    shRepo,
    shApis,
    shStorage
}
