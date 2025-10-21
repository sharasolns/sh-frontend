import TabsMain from '@/views/core/tabs/TabsMain.vue'
import TabOne from '@/views/core/tabs/tabs/TabOne.vue'
import DynamicTabs from '@/views/core/dynamic-tabs/DynamicTabs.vue'

export default [
    {
        path: '/dynamic-tabs',
        component:DynamicTabs,
    },
    {
        path: '/tabs',
        component:TabsMain,
        children:[
            {
                path: 'tab/:tab',
                component: TabOne
            }
        ]
    }
]