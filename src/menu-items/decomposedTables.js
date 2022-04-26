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
        },
        {
            id: 'decomposed_articles_graphical_appearance',
            title: 'Articles Graphical Appearance Table',
            type: 'item',
            url: '/decomposed/articles-graphical-appearance'
        },
        {
            id: 'decomposed_articles_colour_group',
            title: 'Articles Colour Group Table',
            type: 'item',
            url: '/decomposed/articles-colour-group'
        },
        {
            id: 'decomposed_articles_perceived_colour_value',
            title: 'Articles Perceived Colour Value Table',
            type: 'item',
            url: '/decomposed/articles-perceived-colour-value'
        },
        {
            id: 'decomposed_articles_perceived_colour_master',
            title: 'Articles Perceived Colour Master Table',
            type: 'item',
            url: '/decomposed/articles-perceived-colour-master'
        }
    ]
};

export default decomposedTables;
