import { storeToRefs } from 'pinia';
import { useUserStore } from '../repo/stores/ShUser.js';

export default {
    mounted(el, binding) {
        const { user } = storeToRefs(useUserStore());
        el.permission = binding.value;
        if (!user.value.isAllowedTo(binding.value)) {
            // store a reference to the parent node and next sibling
            el.parentNodeRef = el.parentNode;
            el.nextSiblingRef = el.nextSibling;
            // create a comment node
            el.commentNode = document.createComment(`v-if-user-can`);
            // replace element with comment node
            el.parentNode.replaceChild(el.commentNode, el);
        }
    },
    updated(el, binding) {
        const { user } = storeToRefs(useUserStore());
        if (!user.value.isAllowedTo(binding.value)) {
            // if the element is not already replaced, replace it with comment node
            if (el.parentNode) {
                el.parentNodeRef = el.parentNode;
                el.nextSiblingRef = el.nextSibling;
                if (!el.commentNode) {
                    el.commentNode = document.createComment(`v-if-user-can`);
                }
                el.parentNode.replaceChild(el.commentNode, el);
            }
        } else {
            // if the comment node is present, replace it with the original element
            if (el.commentNode && el.parentNodeRef) {
                if (el.nextSiblingRef) {
                    el.parentNodeRef.insertBefore(el, el.nextSiblingRef);
                } else {
                    el.parentNodeRef.appendChild(el);
                }
                // remove the comment node from the parent node
                el.parentNodeRef.removeChild(el.commentNode);
                // remove the reference to the comment node
                el.commentNode = null;
            }
        }
    }
};
