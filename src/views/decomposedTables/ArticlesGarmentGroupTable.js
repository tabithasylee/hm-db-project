import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesGarmentGroupTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_garment_group_view';
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
                    { label: 'Garment Group No.', value: 'garment_group_no' },
                    { label: 'Garment Group Name', value: 'garment_group_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Garment Group Table'}
            />
        </>
    );
};

ArticlesGarmentGroupTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesGarmentGroupTable;
