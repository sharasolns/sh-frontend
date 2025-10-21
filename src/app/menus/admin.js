export default [
    {
        slug: 'departments',
        type: 'single',
        label: 'Departments',
        icon: 'bi-grid',
        path: '/sh-departments',
    },
    {
        slug: 'tasks',
        type: 'single',
        label: 'Tasks',
        icon: 'bi-activity',
        path: '/tasks',
    },
    {
        slug: 'notes',
        type: 'single',
        label: 'Notes',
        icon: 'bi-list',
        path: '/notes',
    },
    {
        slug: 'notes',
        type: 'single',
        label: 'Forms',
        icon: 'bi-list',
        path: '/forms',
    },
    {
        slug: 'notes',
        type: 'single',
        label: 'Tabs',
        icon: 'bi-list',
        path: '/tabs',
    }, {
        slug: 'notes',
        type: 'single',
        label: 'Dynamic Tabs',
        icon: 'bi-list',
        path: '/dynamic-tabs',
    },
    {
        path: '/billing',
        label: 'Billing',
        icon: 'bi-wallet2',
        permission: 'billing',
        type: 'many',
        children: [
            {
                path: '/billing/bills',
                label: 'Bills',
                permission: 'bills',
                type:'single',
            },
            {
                path: '/billing/payments',
                label: 'All Payments',
                permission: 'payments',
                type:'single',
            },
            {
                path: '/billing/plans',
                label: 'Plans',
                permission: 'plans',
                type:'single',
            },
            {
                path: '/billing/features',
                label: 'Billing Features',
                permission: 'features',
                type:'single',
            },
            {
                path: '/billing/payment-methods',
                label: 'Payment Methods',
                permission: 'payment_methods',
                type:'single',
            }
        ]
    },
]