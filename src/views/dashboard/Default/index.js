import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TransactionsTable from './TransactionsTable';
import ArticlesTable from './ArticlesTable';
import CustomersTable from './CustomersTable';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {/* <Grid item xs={12} md={12}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <TransactionsTable isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomersTable isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ArticlesTable isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
