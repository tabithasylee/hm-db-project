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
