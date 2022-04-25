// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| EDIT MENU ITEMS ||============================== //

const edit = {
    id: 'edit-tables',
    title: 'Edit Tables',
    type: 'group',
    children: [
        {
            id: 'insert',
            title: 'Insert',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'insert-article',
                    title: 'Insert Article',
                    type: 'item',
                    url: '/insert/article'
                },
                {
                    id: 'insert-customer',
                    title: 'Insert Customer',
                    type: 'item',
                    url: '/insert/customer'
                },
                {
                    id: 'insert-transaction',
                    title: 'Insert Transaction',
                    type: 'item',
                    url: '/insert/transaction'
                },
                {
                    id: 'util-typography',
                    title: 'Typography',
                    type: 'item',
                    url: '/utils/util-typography',
                    icon: icons.IconTypography,
                    breadcrumbs: false
                },
                {
                    id: 'util-color',
                    title: 'Color',
                    type: 'item',
                    url: '/utils/util-color',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: 'util-shadow',
                    title: 'Shadow',
                    type: 'item',
                    url: '/utils/util-shadow',
                    icon: icons.IconShadow,
                    breadcrumbs: false
                },
                {
                    id: 'icons',
                    title: 'Icons',
                    type: 'collapse',
                    icon: icons.IconWindmill,
                    children: [
                        {
                            id: 'tabler-icons',
                            title: 'Tabler Icons',
                            type: 'item',
                            url: '/icons/tabler-icons',
                            breadcrumbs: false
                        },
                        {
                            id: 'material-icons',
                            title: 'Material Icons',
                            type: 'item',
                            url: '/icons/material-icons',
                            breadcrumbs: false
                        }
                    ]
                }
            ]
        },
        {
            id: 'update',
            title: 'Update',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'update-article',
                    title: 'Update Article',
                    type: 'item',
                    url: '/update/article'
                },
                {
                    id: 'update-customer',
                    title: 'Update Customer',
                    type: 'item',
                    url: '/update/customer'
                },
                {
                    id: 'update-transaction',
                    title: 'Update Transaction',
                    type: 'item',
                    url: '/update/transaction'
                }
            ]
        }
    ]
};

export default edit;
