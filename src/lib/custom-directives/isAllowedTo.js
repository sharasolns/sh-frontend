import { storeToRefs } from 'pinia'
import { useUserStore } from '../repo/stores/ShUser.js'


export default {
    mounted(el, binding) {
        const {user} = storeToRefs(useUserStore())
        if(!user.value.isAllowedTo(binding.value)){
            // delete element
            el.remove()
        }
    }
};
