import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import DemographicComparisonTable from './DemographicComparisonTable';
import DemographicDropdown from './DemographicDropdown';
import TableSearchBar from '../TableSearchBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const DemographicComparisonPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [productId, setProductId] = useState('');
    const [attribute, setAttribute] = useState('active');
    const [tableData, setTableData] = useState({ attribute: '', data: [] });

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(attribute);
    }, [attribute]);

    const handleSearchBtnClick = () => {
        const getTableData = async () => {
            console.log('trying to fetch search results');
            const response = await fetch(`http://localhost:5000/demographiccomparison?productId=${productId}&attribute=${attribute}`);
            const data = await response.json();
            setTableData({ attribute: attribute, data: data[0] });
        };
        getTableData();
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="body" sx={{ paddingLeft: 2 }}>
                            For a specific article, view the aggregate of the demographic of the customer that purchased that item. For
                            example, view which age group is most likely to buy a strap top.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h4" sx={{ paddingLeft: 2 }}>
                            Product Id
                        </Typography>
                        <TableSearchBar setState={setProductId} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DemographicDropdown setAttribute={setAttribute} attribute={attribute} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <DemographicComparisonTable isLoading={isLoading} attributeName={tableData.attribute} tableData={tableData.data} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DemographicComparisonPage;
