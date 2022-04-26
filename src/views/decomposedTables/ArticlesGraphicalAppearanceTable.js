import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as React from 'react';

import DecomposedTable from './DecomposedTable';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesGraphicalAppearanceTable = ({ isLoading }) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getTableData = async () => {
            console.log('trying to fetch');
            const response = await fetch(`http://localhost:5000/decomposed/articlesgraphicalappearance`);
            const data = await response.json();
            setTableData(data);
        };
        getTableData();
    }, []);

    return (
        <>
            <DecomposedTable
                headers={[
                    { label: 'Graphical Appearance No.', value: 'graphical_appearance_no' },
                    { label: 'Graphical Appearance Name', value: 'graphical_appearance_name' }
                ]}
                isLoading={isLoading}
                tableData={tableData}
                title={'Articles Graphical Appearance Table'}
            />
        </>
    );
};

ArticlesGraphicalAppearanceTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesGraphicalAppearanceTable;
