import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// pages routing
const ArticleSummaryPage = Loadable(lazy(() => import('views/pages/ArticleSummaryPage')));
const CustomerTransactionsPage = Loadable(lazy(() => import('views/pages/CustomerTransactionsPage')));
const DemographicComparisonPage = Loadable(lazy(() => import('views/pages/DemographicComparisonPage')));
const ArticleTransactionsPage = Loadable(lazy(() => import('views/pages/ArticleTransactionsPage')));

// edit routing
const InsertArticlePage = Loadable(lazy(() => import('views/utilities/Insert/InsertArticlePage')));
const InsertCustomerPage = Loadable(lazy(() => import('views/utilities/Insert/InsertCustomerPage')));
const InsertTransactionPage = Loadable(lazy(() => import('views/utilities/Insert/InsertTransactionPage')));
const UpdateArticlePage = Loadable(lazy(() => import('views/utilities/Update/UpdateArticlePage')));
const UpdateCustomerPage = Loadable(lazy(() => import('views/utilities/Update/UpdateCustomerPage')));
const UpdateTransactionPage = Loadable(lazy(() => import('views/utilities/Update/UpdateTransactionPage')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// decomposed tables routing
const ArticlesProductTypeTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesProductTypeTable')));
const ArticlesGraphicalAppearanceTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesGraphicalAppearanceTable')));
const ArticlesColourGroupTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesColourGroup')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/article-summary',
            element: <ArticleSummaryPage />
        },
        {
            path: '/customer-transactions',
            element: <CustomerTransactionsPage />
        },
        {
            path: '/demographic-comparison',
            element: <DemographicComparisonPage />
        },
        {
            path: '/article-transactions',
            element: <ArticleTransactionsPage />
        },
        {
            path: '/insert/article',
            element: <InsertArticlePage />
        },
        {
            path: '/insert/customer',
            element: <InsertCustomerPage />
        },
        {
            path: '/insert/transaction',
            element: <InsertTransactionPage />
        },
        {
            path: '/update/article',
            element: <UpdateArticlePage />
        },
        {
            path: '/update/customer',
            element: <UpdateCustomerPage />
        },
        {
            path: '/update/transaction',
            element: <UpdateTransactionPage />
        },
        {
            path: '/decomposed/articles-product-type',
            element: <ArticlesProductTypeTable />
        },
        {
            path: '/decomposed/articles-graphical-appearance',
            element: <ArticlesGraphicalAppearanceTable />
        },
        {
            path: '/decomposed/articles-colour-group',
            element: <ArticlesColourGroupTable />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
