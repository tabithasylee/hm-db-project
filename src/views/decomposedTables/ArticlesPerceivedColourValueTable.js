import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesPerceivedColourValueTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_perceived_colour_value_view';
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
                    { label: 'Perceived Colour Value Id', value: 'perceived_colour_value_id' },
                    { label: 'Perceived Colour Value Name', value: 'perceived_colour_value_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Perceived Colour Value Table'}
            />
        </>
    );
};

ArticlesPerceivedColourValueTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesPerceivedColourValueTable;
