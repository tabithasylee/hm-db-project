import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import CustomerTransactionsTable from './CustomerTransactionsTable';
import TableSearchBar from '../TableSearchBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const CustomerTransactionsPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [customerId, setCustomerId] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(customerId);
    }, [customerId]);

    const handleSearchBtnClick = () => {
        const getTableData = async () => {
            console.log('trying to fetch search results');
            const response = await fetch(`http://localhost:5000/transactionsummary?customerId=${customerId}`);
            const data = await response.json();
            setTableData(data[0]);
        };
        getTableData();
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" sx={{ paddingLeft: 2 }}>
                            Customer Id
                        </Typography>
                        <TableSearchBar setCustomerId={setCustomerId} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomerTransactionsTable isLoading={isLoading} tableData={tableData} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerTransactionsPage;
