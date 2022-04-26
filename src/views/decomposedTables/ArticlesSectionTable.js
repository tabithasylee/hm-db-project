import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesSectionTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const tableName = 'articles_section_view';
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
                    { label: 'Section No.', value: 'section_no' },
                    { label: 'Section Name', value: 'section_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Section Table'}
            />
        </>
    );
};

ArticlesSectionTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesSectionTable;
