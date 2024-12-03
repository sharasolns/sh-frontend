import TabsMain from '@/views/core/tabs/TabsMain.vue'
import TabOne from '@/views/core/tabs/tabs/TabOne.vue'

export default [
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