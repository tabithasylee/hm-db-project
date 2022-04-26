import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesIndexTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_index_view';
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
                    { label: 'Index Code', value: 'index_code' },
                    { label: 'Index Name', value: 'index_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Index Table'}
            />
        </>
    );
};

ArticlesIndexTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesIndexTable;
