import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const TransactionsViewTable = () => {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'transaction_view';
            const response = await fetch(`http://localhost:5000/decomposed?tableName=${tableName}`);
            const data = await response.json();
            setTableData(data);
        };
        getTableData().then(() => setLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <DecomposedTable
                    headers={[
                        { label: 'Transaction Date', value: 't_dat' },
                        { label: 'Customer Id', value: 'customer_id' },
                        { label: 'Price', value: 'price' },
                        { label: 'Article Id', value: 'article_id' },
                        { label: 'Product Code', value: 'product_code' },
                        { label: 'Product Name', value: 'prod_name' },
                        { label: 'Product Type Name', value: 'product_type_name' },
                        { label: 'Product Group Name', value: 'product_group_name' },
                        { label: 'Graphical Appearance Name', value: 'graphical_appearance_name' },
                        { label: 'Colour Group Name', value: 'colour_group_name' },
                        { label: 'Perceived Colour Value Name', value: 'perceived_colour_value_name' },
                        { label: 'Perceived Colour Master Name', value: 'perceived_colour_master_name' },
                        { label: 'Department Name', value: 'department_name' },
                        { label: 'Index Name', value: 'index_name' },
                        { label: 'Index Group Nam   e', value: 'index_group_name' },
                        { label: 'Section Name', value: 'section_name' },
                        { label: 'Garment Group Name', value: 'garment_group_name' },
                        { label: 'Detailed Description', value: 'detail_desc' }
                    ]}
                    isLoading={isLoading}
                    tableData={tableData}
                    title={'Transactions View Table'}
                />
            )}
        </>
    );
};

export default TransactionsViewTable;
