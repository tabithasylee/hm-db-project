import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { gridSpacing } from 'store/constant';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ArticleTransactionsTable = ({ isLoading, tableData }) => {
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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Article Transactions Table</Typography>
                                    </Grid>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>index</TableCell>
                                                    <TableCell align="right">date</TableCell>
                                                    <TableCell align="right">customer id</TableCell>
                                                    <TableCell align="right">product name</TableCell>
                                                    <TableCell align="right">price</TableCell>
                                                    <TableCell align="right">detailed description</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tableData.map((row, index) => (
                                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row">
                                                            {index}
                                                        </TableCell>
                                                        <TableCell align="right">{row.t_dat}</TableCell>
                                                        <TableCell align="right">{row.customer_id}</TableCell>
                                                        <TableCell align="right">{row.prod_name}</TableCell>
                                                        <TableCell align="right">{row.price}</TableCell>
                                                        <TableCell align="right">{row.detail_desc}</TableCell>
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

ArticleTransactionsTable.propTypes = {
    isLoading: PropTypes.bool,
    tableData: PropTypes.array
};

export default ArticleTransactionsTable;
