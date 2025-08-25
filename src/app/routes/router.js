import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../views/Home.vue'
import tasks from '@/app/routes/tasks/tasks.js'
import notes from "@/app/routes/notes/notes";
import Forms from '@/views/core/forms/Forms.vue'
import tabsRoute from '@/app/routes/tabs/tabs.route'
import BillingMain from '@/views/core/billing/BillingMain.vue'
import PlansList from '@/views/core/billing/plans/PlansList.vue'
import FeaturesList from '@/views/core/billing/plans/features/FeaturesList.vue'
import PaymentMethodsList from '@/views/core/billing/paymentMethods/PaymentMethodsList.vue'
import BillsMain from '@/views/core/billing/bills/BillsMain.vue'
import BillsList from '@/views/core/billing/bills/tabs/BillsList.vue'

import PaymentsList from '@/views/core/billing/payments/PaymentsList.vue'
let routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/forms',
    component: Forms
  },
    {
        path: '/billing',
        component: BillingMain,
        children:[
            {
                path:'bills',
                component: BillsMain,
                children: [
                    {
                        path:'tab/:status',
                        component: BillsList
                    }
                ]
            },
            {
                path:'plans',
                component: PlansList,
            },
            {
                path:'payments',
                component: PaymentsList,
            },
            {
                path:'features',
                component: FeaturesList
            },
            {
                path:'payment-methods',
                component: PaymentMethodsList
            }

        ]
    },
]
routes = routes.concat(tasks,notes,tabsRoute)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
