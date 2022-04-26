import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesColourGroupTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_colour_group_view';
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
                    { label: 'Colour Group Code', value: 'colour_group_code' },
                    { label: 'Colour Group Name', value: 'colour_group_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Colour Group Table'}
            />
        </>
    );
};

ArticlesColourGroupTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesColourGroupTable;
