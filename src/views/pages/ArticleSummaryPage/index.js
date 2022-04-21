import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import ArticleSummaryTable from './ArticleSummaryTable';
import AttributeDropdown from './AttributeDropdown';
import TableSearchBar from '../TableSearchBar';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ArticleSummaryPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [customerId, setCustomerId] = useState('');
    const [attribute, setAttribute] = useState('');
    const [tableData, setTableData] = useState({ attribute: '', data: [] });

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(customerId);
    }, [customerId]);

    useEffect(() => {
        console.log(attribute);
    }, [attribute]);

    const handleSearchBtnClick = () => {
        const getTableData = async () => {
            console.log('trying to fetch search results');
            const response = await fetch(`http://localhost:5000/articlesummary?customerId=${customerId}&attribute=${attribute}`);
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
                        <Typography variant="h4" sx={{ paddingLeft: 2 }}>
                            Customer Id
                        </Typography>
                        <TableSearchBar setCustomerId={setCustomerId} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <AttributeDropdown setAttribute={setAttribute} />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" color="secondary" variant="contained" onClick={handleSearchBtnClick}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <ArticleSummaryTable isLoading={isLoading} attributeName={tableData.attribute} tableData={tableData.data} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ArticleSummaryPage;
