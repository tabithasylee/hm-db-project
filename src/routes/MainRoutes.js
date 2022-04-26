import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// pages routing
const ArticleSummaryPage = Loadable(lazy(() => import('views/search/ArticleSummaryPage')));
const CustomerTransactionsPage = Loadable(lazy(() => import('views/search/CustomerTransactionsPage')));
const DemographicComparisonPage = Loadable(lazy(() => import('views/search/DemographicComparisonPage')));
const ArticleTransactionsPage = Loadable(lazy(() => import('views/search/ArticleTransactionsPage')));

// edit routing
const InsertArticlePage = Loadable(lazy(() => import('views/edit/Insert/InsertArticlePage')));
const InsertCustomerPage = Loadable(lazy(() => import('views/edit/Insert/InsertCustomerPage')));
const InsertTransactionPage = Loadable(lazy(() => import('views/edit/Insert/InsertTransactionPage')));
const UpdateArticlePage = Loadable(lazy(() => import('views/edit/Update/UpdateArticlePage')));
const UpdateCustomerPage = Loadable(lazy(() => import('views/edit/Update/UpdateCustomerPage')));
const UpdateTransactionPage = Loadable(lazy(() => import('views/edit/Update/UpdateTransactionPage')));

// decomposed tables routing
const ArticlesProductTypeTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesProductTypeTable')));
const ArticlesGraphicalAppearanceTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesGraphicalAppearanceTable')));
const ArticlesColourGroupTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesColourGroupTable')));
const ArticlesPerceivedColourValueTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesPerceivedColourValueTable')));
const ArticlesPerceivedColourMasterTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesPerceivedColourMasterTable')));
const ArticlesPerceivedDepartmentTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesPerceivedDepartmentTable')));
const ArticlesIndexTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesIndexTable')));
const ArticlesIndexGroupTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesIndexGroupTable')));
const ArticlesSectionTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesSectionTable')));
const ArticlesGarmentGroupTable = Loadable(lazy(() => import('views/decomposedTables/ArticlesGarmentGroupTable')));
const TransactionsViewTable = Loadable(lazy(() => import('views/decomposedTables/TransactionsViewTable')));

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
            path: '/decomposed/articles-perceived-colour-value',
            element: <ArticlesPerceivedColourValueTable />
        },
        {
            path: '/decomposed/articles-perceived-colour-master',
            element: <ArticlesPerceivedColourMasterTable />
        },
        {
            path: '/decomposed/articles-perceived-department',
            element: <ArticlesPerceivedDepartmentTable />
        },
        {
            path: '/decomposed/articles-index',
            element: <ArticlesIndexTable />
        },
        {
            path: '/decomposed/articles-index-group',
            element: <ArticlesIndexGroupTable />
        },
        {
            path: '/decomposed/articles-section',
            element: <ArticlesSectionTable />
        },
        {
            path: '/decomposed/articles-garment-group',
            element: <ArticlesGarmentGroupTable />
        },
        {
            path: '/decomposed/transactions-view',
            element: <TransactionsViewTable />
        }
    ]
};

export default MainRoutes;
