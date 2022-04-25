// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'search',
            title: 'Search',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'customer_article_summary_table',
                    title: 'Customer Article Summary',
                    type: 'item',
                    url: '/article-summary'
                },
                {
                    id: 'customer_transactions_table',
                    title: 'Customer Transactions',
                    type: 'item',
                    url: '/customer-transactions'
                }
            ]
        }
    ]
};

export default pages;
