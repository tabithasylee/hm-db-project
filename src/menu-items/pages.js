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
                    id: 'table1',
                    title: 'Table1',
                    type: 'item',
                    url: '/table1',
                    target: true
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
