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
            id: 'decomposed-articles-tables',
            title: 'Decomposed Articles Tables',
            type: 'collapse',
            icon: icons.IconKey,

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
                },
                {
                    id: 'decomposed_articles_perceived_department',
                    title: 'Articles Perceived Department Table',
                    type: 'item',
                    url: '/decomposed/articles-perceived-department'
                },
                {
                    id: 'decomposed_articles_index',
                    title: 'Articles Index Table',
                    type: 'item',
                    url: '/decomposed/articles-index'
                },
                {
                    id: 'decomposed_articles_index_group',
                    title: 'Articles Index Group Table',
                    type: 'item',
                    url: '/decomposed/articles-index-group'
                },
                {
                    id: 'decomposed_articles_section',
                    title: 'Articles Section Table',
                    type: 'item',
                    url: '/decomposed/articles-section'
                },
                {
                    id: 'decomposed_articles_garment_group',
                    title: 'Articles Garment Group Table',
                    type: 'item',
                    url: '/decomposed/articles-garment-group'
                }
            ]
        },
        {
            id: 'decomposed-transactions_table',
            title: 'Transactions View',
            type: 'item',
            url: '/decomposed/transactions-view'
        }
    ]
};

export default decomposedTables;
