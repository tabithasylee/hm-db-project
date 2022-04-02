import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

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

const CustomersTable = ({ isLoading }) => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const getAllCustomers = async () => {
            console.log('trying to fetch');
            const response = await fetch(`http://localhost:5000/customers`);
            const data = await response.json();
            setCustomers(data);
        };
        getAllCustomers();
        console.log(customers);
    }, []);

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Customers Table</Typography>
                                    </Grid>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Index</TableCell>
                                                    <TableCell align="right">customer id</TableCell>
                                                    <TableCell align="right">club_member_status</TableCell>
                                                    <TableCell align="right">fashion_news_frequency</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {customers.map((customer, index) => (
                                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row">
                                                            {index}
                                                        </TableCell>
                                                        <TableCell align="right">{customer.customer_id}</TableCell>
                                                        <TableCell align="right">{customer.club_member_status}</TableCell>
                                                        <TableCell align="right">{customer.fashion_news_frequency}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

CustomersTable.propTypes = {
    isLoading: PropTypes.bool
};

export default CustomersTable;
