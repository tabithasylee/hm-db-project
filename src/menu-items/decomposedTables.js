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

const decomposedTables = {
    id: 'decomposedTables',
    title: 'Decomposed Tables',
    type: 'group',
    children: [
        {
            id: 'decomposed_articles_product_type',
            title: 'Articles Product Type Table',
            type: 'item',
            url: '/decomposed/articles-product-type'
        }
        // {
        //     id: 'decomposed-customer',
        //     title: 'Insert Customer',
        //     type: 'item',
        //     url: '/decomposed/customer'
        // }
    ]
};

export default decomposedTables;
