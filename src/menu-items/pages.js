// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'search-tables',
    title: 'Search Tables',
    caption: 'get aggregate and analytic details',
    type: 'group',
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
        },
        {
            id: 'article_demographic_comparison_table',
            title: 'Article Demographic Comparison',
            type: 'item',
            url: '/demographic-comparison'
        },
        {
            id: 'article_transactions_table',
            title: 'Article Transactions',
            type: 'item',
            url: '/article-transactions'
        }
    ]
};

export default pages;
