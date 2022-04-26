import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesIndexGroupTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_index_group_view';
            const response = await fetch(`http://localhost:5000/decomposed?tableName=${tableName}`);
            const data = await response.json();
            setTableData(data);
        };
        getTableData();
    }, []);

    return (
        <>
            <DecomposedTable
                headers={[
                    { label: 'Index Group No.', value: 'index_group_no' },
                    { label: 'Index Group Name', value: 'index_group_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Index Group Table'}
            />
        </>
    );
};

ArticlesIndexGroupTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesIndexGroupTable;
