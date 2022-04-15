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
            id: 'Tables',
            title: 'Tables',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'customer_article_summary_table',
                    title: 'Customer Article Summary Table',
                    type: 'item',
                    url: '/summarytable'
                },
                {
                    id: 'Table2',
                    title: 'Table2',
                    type: 'item',
                    url: '/table2',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
