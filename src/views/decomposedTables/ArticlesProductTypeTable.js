import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import DecomposedTable from './DecomposedTable';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticlesProductTypeTable = ({ isLoading }) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getAllArticles = async () => {
            console.log('trying to fetch');
            const response = await fetch(`http://localhost:5000/decomposed/articlesproducttype`);
            const data = await response.json();
            setArticles(data);
        };
        getAllArticles();
        console.log(articles);
    }, []);

    return (
        <>
            <DecomposedTable
                headers={[
                    { label: 'Product Type No.', value: 'product_type_no' },
                    { label: 'Product Type Name', value: 'product_type_name' },
                    { label: 'Product Group Name', value: 'product_group_name' }
                ]}
                isLoading={isLoading}
                articles={articles}
                title={'Articles Product Type Table'}
            />
        </>
    );
};

ArticlesProductTypeTable.propTypes = {
    isLoading: PropTypes.bool
};

export default ArticlesProductTypeTable;
