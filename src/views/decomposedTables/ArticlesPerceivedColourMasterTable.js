import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesPerceivedColourMasterTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_perceived_colour_master_view';
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
                    { label: 'Perceived Colour Master Id', value: 'perceived_colour_master_id' },
                    { label: 'Perceived Colour Master Name', value: 'perceived_colour_master_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Perceived Colour Master Table'}
            />
        </>
    );
};

ArticlesPerceivedColourMasterTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesPerceivedColourMasterTable;
