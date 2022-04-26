import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesPerceivedDepartmentTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_perceived_department_view';
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
                    { label: 'Department No.', value: 'department_no' },
                    { label: 'Department Name', value: 'department_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Perceived Department Table'}
            />
        </>
    );
};

ArticlesPerceivedDepartmentTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesPerceivedDepartmentTable;
